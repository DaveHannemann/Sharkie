let canvas;
let ctx;
let startScreen;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    startScreen = new StartScreen();
    drawStartScreenLoop();
    
    canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvas.clientWidth;
    const scaleY = canvas.height / canvas.clientHeight;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;


    if (startScreen.isButtonClicked('start', mouseX, mouseY)) {
        startScreen.stopButtonAnimation();
        startGame();
    }

    if (startScreen.isButtonClicked('fullscreen', mouseX, mouseY)) {
        toggleFullScreen(canvas);
    }
    });

    document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        resetCanvasSize(canvas);
    } else {
        scaleCanvasToFit(canvas);
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