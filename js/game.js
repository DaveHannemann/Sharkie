let canvas;
let ctx;
let startScreen;
let world;
let keyboard = new Keyboard();
let startScreenMouseMoveHandler;
let endScreenMouseMoveHandler;
let audioManager = new AudioManager();

// Musik hinzufügen
audioManager.addMusic('start', '../audio/startscreen.mp3');
audioManager.addMusic('lost', '../audio/game_lost.mp3');
audioManager.addMusic('won', '../audio/game_won.mp3');
audioManager.addMusic('main', '../audio/main.mp3', { loop: true });

// Effekte hinzufügen
audioManager.addSFX('bubble', '../audio/bubble.mp3');
audioManager.addSFX('item', '../audio/pickup.mp3');
audioManager.addSFX('poisoned', '../audio/poisoned.mp3');
audioManager.addSFX('shocked', '../audio/shocked.mp3');
audioManager.addSFX('slap', '../audio/slap.mp3');
audioManager.addSFX('char_dead', '../audio/charakter_death.mp3');
audioManager.addSFX('snoring', '../audio/snoring.mp3'); // kein Loop nötig

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    startScreen = new StartScreen();
    hideMobileControls();
    drawStartScreenLoop();
    
    canvas.addEventListener('click', function(event) {
                if (!audioManager.current) {
            audioManager.playMusic('start');
        }
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / canvas.clientWidth;
    let scaleY = canvas.height / canvas.clientHeight;

    let mouseX = (event.clientX - rect.left) * scaleX;
    let mouseY = (event.clientY - rect.top) * scaleY;

    if (world && world.endScreen) {
        world.endScreen.handleClick(mouseX, mouseY);
        return;
    }

    if (startScreen.isButtonClicked('start', mouseX, mouseY)) {
        startScreen.stopButtonAnimation();
        startGame();
    }

    if (startScreen.isButtonClicked('fullscreen', mouseX, mouseY)) {
        toggleFullScreen(canvas);
    }

    if (startScreen.isButtonClicked('howto', mouseX, mouseY)) {
        addOverlay();
    }
    if (world && world.hud) {
        world.hud.handleClick(mouseX, mouseY);
    }
    });

    document.addEventListener('fullscreenchange', () => {
    let fullScreen = !!document.fullscreenElement;

    if (fullScreen) {
        scaleCanvasToFit(canvas);
    } else {
        resetCanvasSize(canvas);
    }

    if (startScreen) {
        startScreen.toggleHowToButton(!fullScreen);
    }
    });

    canvas.addEventListener('mousemove', function(event) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / canvas.clientWidth;
    let scaleY = canvas.height / canvas.clientHeight;

    let mouseX = (event.clientX - rect.left) * scaleX;
    let mouseY = (event.clientY - rect.top) * scaleY;

    if (world && world.endScreen) {
        canvas.style.cursor = world.endScreen.isPointerButtonHovered(mouseX, mouseY) ? 'pointer' : 'default';
    } else if (startScreen) {
        canvas.style.cursor = startScreen.isMouseOverButton(mouseX, mouseY) ? 'pointer' : 'default';
    } else {
        canvas.style.cursor = 'default';
    }
    });
}

function drawStartScreenLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (startScreen) {
    startScreen.draw(ctx);
    requestAnimationFrame(drawStartScreenLoop);
    }
}

function startGame() {
    startScreen.disableButtons();
    audioManager.playMusic('main');
    world = new World(canvas, keyboard);
    world.start();
    setupJoystick();
    if ('ontouchstart' in window) {
        showMobileControls();
    }
}

function toggleFullScreen(canvas) {
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen().then(() => {
                scaleCanvasToFit(canvas);   
            });
        }
    } else {
        document.exitFullscreen().then(() => {
            resetCanvasSize(canvas);
        });
    }
}

function resetCanvasSize(canvas) {
    canvas.style.width = '720px';
    canvas.style.height = '480px';
    canvas.style.maxWidth = '';
    canvas.style.maxHeight = '';
}

function scaleCanvasToFit(canvas) {
    const vw = window.innerWidth * 0.8;
    const vh = window.innerHeight * 0.8;

    const aspectRatio = 720 / 480;
    let newWidth = vw;
    let newHeight = vw / aspectRatio;

    if (newHeight > vh) {
        newHeight = vh;
        newWidth = vh * aspectRatio;
    }

    canvas.style.width = newWidth + 'px';
    canvas.style.height = newHeight + 'px';
}

function addOverlay() {
    let addOverlayRef = document.getElementById('overlay')
    let dialogRef = document.getElementById('dialogContent')
    addOverlayRef.classList.remove('d_none');
    addOverlayRef.classList.add('show-overlay');
    dialogRef.innerHTML = renderOverlayContent();
}

function closeOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d_none');
    overlay.classList.remove('show-overlay');
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68) {
        keyboard.D = true;
    }    
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68) {
        keyboard.D = false;
    }        
});

function setupJoystick() {
    const joystick = document.getElementById('joystick');
    const stick = document.getElementById('stick');
    let centerX, centerY;

    joystick.addEventListener('touchstart', e => {
        const rect = joystick.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
    });

    joystick.addEventListener('touchmove', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - centerX;
        const dy = touch.clientY - centerY;
        const maxRadius = 40;
        const distance = Math.min(Math.hypot(dx, dy), maxRadius);
        const angle = Math.atan2(dy, dx);


        const limitedX = Math.cos(angle) * distance;
        const limitedY = Math.sin(angle) * distance;

        stick.style.transform =
            `translate(${limitedX}px, ${limitedY}px) translate(-50%, -50%)`;
        keyboard.LEFT = keyboard.RIGHT = keyboard.UP = keyboard.DOWN = false;

        if (distance > 10) {
            if (limitedX < -10) keyboard.LEFT = true;
            if (limitedX >  10) keyboard.RIGHT = true;
            if (limitedY < -10) keyboard.UP = true;
            if (limitedY >  10) keyboard.DOWN = true;
        }
    });

    joystick.addEventListener('touchend', e => {
        stick.style.transform = 'translate(-50%, -50%)';
        keyboard.LEFT = keyboard.RIGHT = keyboard.UP = keyboard.DOWN = false;
    });

    document.getElementById('btn-attack').addEventListener('touchstart', k => { k.preventDefault(); keyboard.SPACE = true; });
    document.getElementById('btn-attack').addEventListener('touchend', k => { k.preventDefault(); keyboard.SPACE = false; });
    document.getElementById('btn-throw').addEventListener('touchstart', k => { k.preventDefault(); keyboard.D = true; });
    document.getElementById('btn-throw').addEventListener('touchend', k => { k.preventDefault(); keyboard.D = false; });
}

function showMobileControls() {
    document.getElementById('joystick').style.display = 'block';
    document.getElementById('btn-attack').style.display = 'block';
    document.getElementById('btn-throw').style.display = 'block';
}

function hideMobileControls() {
    document.getElementById('joystick').style.display = 'none';
    document.getElementById('btn-attack').style.display = 'none';
    document.getElementById('btn-throw').style.display = 'none';
}