let canvas;
let ctx;
let startScreen;
let world;
let keyboard = new Keyboard();
let startScreenMouseMoveHandler;
let endScreenMouseMoveHandler;
let audioManager = new AudioManager();
let mainMusicPlayed = false;

audioManager.addMusic('start', '../audio/startscreen.mp3', { loop: true, volume: 0.5 });
audioManager.addMusic('main', '../audio/main.mp3', { loop: true, volume: 0.5 });
audioManager.addMusic('endboss', '../audio/endboss_theme.mp3', { loop: true, volume: 0.5 });
audioManager.addSFX('bubble', '../audio/bubble.mp3', { volume: 0.4 });
audioManager.addSFX('coin', '../audio/pickup.mp3');
audioManager.addSFX('poison', '../audio/poisonpickup.mp3');
audioManager.addSFX('poisoned', '../audio/poisoned.mp3');
audioManager.addSFX('shocked', '../audio/shocked.mp3');
audioManager.addSFX('slap', '../audio/slap.mp3');
audioManager.addSFX('char_dead', '../audio/charakter_death.mp3');
audioManager.addSFX('snoring', '../audio/snoring.mp3', { loop: true });
audioManager.addSFX('lose', '../audio/game_lost.mp3');
audioManager.addSFX('win', '../audio/game_won.mp3');
audioManager.addSFX('boss_attack', '../audio/endboss_attack.mp3');
audioManager.addSFX('boss_dead', '../audio/endboss_death.mp3');

/**
 * Initialize the canvas, game and events.
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    startScreen = new StartScreen();
    hideMobileControls();
    drawStartScreenLoop();
    bindKeys();
    setupEventListeners();
}

/**
 * Sets up all global event listeners for canvas.
 */
function setupEventListeners() {
    canvas.addEventListener('click', onCanvasClick);
    canvas.addEventListener('mousemove', onCanvasMouseMove);
    document.addEventListener('fullscreenchange', onFullscreenChange);
}

/**
 * Handles click events on the canvas.
 * @param {MouseEvent} e - mouse-click-event 
 */
function onCanvasClick(e) {
    playStartMusicOnce();
    const { x, y } = getMousePos(e, canvas);
    handleCanvasClick(x, y);
}

/**
 * Handles mouse move events on the canvas.
 * @param {MouseEvent} e - mouse movement 
 */
function onCanvasMouseMove(e) {
    const { x, y } = getMousePos(e, canvas);
    handleMouseHover(x, y);
}

/**
 * Adjusts canvas scaling when fullscreen mode changes.
 */
function onFullscreenChange() {
    const fullScreen = !!document.fullscreenElement;
    fullScreen ? scaleCanvasToFit(canvas) : resetCanvasSize(canvas);
    startScreen?.toggleHowToButton(!fullScreen);
}

/**
 * Plays startscreen music once.
 */
function playStartMusicOnce() {
    if (!mainMusicPlayed) {
        audioManager.playMusic('start');
        mainMusicPlayed = true;
    }
}

/**
 * Gets the scaled mouse coordinates relative to the canvas.
 * @param {MouseEvent} event - mouse event
 * @param {HTMLCanvasElement} canvas - game
 * @returns {{x:number, y:number}} Mouse position on canvas.
 */
function getMousePos(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / canvas.clientWidth;
    const scaleY = canvas.height / canvas.clientHeight;
    return { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY };
}

/**
 * Handles click logic for buttons.
 * @param {number} mouseX - position mouse x
 * @param {number} mouseY - position mouse y
 * @returns {void}
 */
function handleCanvasClick(mouseX, mouseY) {
    if (world?.endScreen) return world.endScreen.handleClick(mouseX, mouseY);
    const button = getClickedButton(mouseX, mouseY);
    if (button) runButtonAction(button);

    world?.hud?.handleClick(mouseX, mouseY);
}

/**
 * Checks for a clicked button on the startscreen
 * @param {number} x - position mouse x 
 * @param {number} y - position mouse y
 * @returns {string|null} Name of clicked button or null
 */
function getClickedButton(x, y) {
    const buttons = ['mute', 'start', 'fullscreen', 'howto', 'impressum'];
    return buttons.find(name => startScreen.isButtonClicked(name, x, y)) || null;
}

/**
 * Executes action for the clicked button.
 * @param {string} name - button name 
 * @returns {void}
 */
function runButtonAction(name) {
    switch (name) {
        case 'mute':       return handleMuteButton();
        case 'start':      return handleStartButton();
        case 'fullscreen': return handleFullscreenButton();
        case 'howto':      return handleHowToButton();
        case 'impressum':  return handleImpressumButton();
    }
}

/**
 * Toggles audio mute state.
 */
function handleMuteButton() {
    audioManager.toggleMute();
    const muteBtn = startScreen.animatedButtons.find(b => b.name === 'mute');
    muteBtn.currentIndex = audioManager.muted ? 1 : 0;
}

/**
 * Handles game start button click.
 */
function handleStartButton() {
    startScreen.stopButtonAnimation();
    startGame();
}

/**
 * Handles fullscreen button click.
 */
function handleFullscreenButton() {
    toggleFullScreen(canvas);
}

/**
 * Handles "How To Play" button click.
 */
function handleHowToButton() {
    toggleOverlay(true);
}

/**
 * Handles "Impressum" button click
 */
function handleImpressumButton() {
    toggleOverlay(true, 'impressum');
}

/**
 * Changes cursor style when hovering over interactive elements.
 * @param {number} x - position mouse x 
 * @param {number} y - position mouse y
 */
function handleMouseHover(x, y) {
    if(world?.endScreen) canvas.style.cursor = world.endScreen.isPointerButtonHovered(x, y)?'pointer':'default';
    else if(world?.hud?.isMouseOverMute(x, y)) canvas.style.cursor = 'pointer';
    else canvas.style.cursor = startScreen?.isMouseOverButton(x, y)?'pointer':'default';
}

/**
 * Main start screen rendering loop.
 */
function drawStartScreenLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (startScreen) {
    startScreen.draw(ctx);
    requestAnimationFrame(drawStartScreenLoop);
    }
}

/**
 * Starts the main game world.
 */
function startGame() {
    startScreen.disableButtons();
    audioManager.playMusic('main');
    world = new World(canvas, keyboard);
    world.start();
    setupMobileControls(keyboard);
    if ('ontouchstart' in window) showMobileControls();
}

/**
 * Toggles fullscreen mode for the canvas.
 * @param {HTMLCanvasElement} canvas - game 
 */
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

/**
 * Resets canvas to default size.
 * @param {HTMLCanvasElement} canvas - game
 */
function resetCanvasSize(canvas) { setCanvasSize(canvas, 720, 480); }

/**
 * Scales canvas proportionally to fit window.
 * @param {HTMLCanvasElement} canvas - game
 */
function scaleCanvasToFit(canvas) {
    const vw = window.innerWidth*0.8, vh = window.innerHeight*0.8, aspect=720/480;
    let w=vw,h=vw/aspect; if(h>vh){ h=vh; w=vh*aspect; }
    setCanvasSize(canvas,w,h);
}

/**
 * Sets the canvas display size.
 * @param {HTMLCanvasElement} canvas - game 
 * @param {number} width - width in px
 * @param {number} height - height in px
 */
function setCanvasSize(canvas, width, height){
    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
    canvas.style.maxWidth=''; canvas.style.maxHeight='';
}

/**
 * Toggles the overlay screen.
 * @param {boolean} [show=false] - show/not show overlay
 */
function toggleOverlay(show = false, type = 'content') {
    const overlay = document.getElementById('overlay');
    const dialog = document.getElementById('dialogContent');

    if (show) {
        overlay.classList.remove('d_none');
        overlay.classList.add('show-overlay');
        if (type === 'impressum') {
            dialog.innerHTML = renderOverlayImpressum();
        } else {
            dialog.innerHTML = renderOverlayContent();
        }
    } else {
        overlay.classList.add('d_none');
        overlay.classList.remove('show-overlay');
    }
}

/**
 * Binds keys for game controls.
 */
function bindKeys() {
    const keyMap = {
        39: 'RIGHT',
        37: 'LEFT',
        38: 'UP',
        40: 'DOWN',
        32: 'SPACE',
        68: 'D'
    };

    Object.entries(keyMap).forEach(([code, key]) => {
        bindKey(parseInt(code), key);
    });
}

/**
 * Binds single key to keyboard state.
 * @param {number} keyCode 
 * @param {string} keyName 
 */
function bindKey(keyCode, keyName) {
    window.addEventListener('keydown', e => {
        if (e.keyCode === keyCode) {
            keyboard[keyName] = true;
        }
    });

    window.addEventListener('keyup', e => {
        if (e.keyCode === keyCode) {
            keyboard[keyName] = false;
        }
    });
}