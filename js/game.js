let canvas;
let ctx;
let startScreen;
let world;
let keyboard = new Keyboard();
let startScreenMouseMoveHandler;
let endScreenMouseMoveHandler;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    startScreen = new StartScreen();
    drawStartScreenLoop();
    
    canvas.addEventListener('click', function(event) {
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
    world = new World(canvas, keyboard);
    world.start();
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