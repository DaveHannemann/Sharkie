/**
 * Initializes all mobile controls.
 * @param {Keyboard} keyboard - global keyboard
 */
function setupMobileControls(keyboard) {
    setupJoystick(keyboard);
    setupActionButtons(keyboard);
}

/**
 * Sets up mobile joystick controls.
 */
function setupJoystick() {
    const joystick = document.getElementById('joystick');
    const stick = document.getElementById('stick');
    let centerX, centerY;
    joystick.addEventListener('touchstart', e => {
        ({ centerX, centerY } = getJoystickCenter(joystick));
    });
    joystick.addEventListener('touchmove', e => {
        e.preventDefault();
        handleJoystickMove(e, stick, centerX, centerY);
    });
    joystick.addEventListener('touchend', () => {
        resetJoystick(stick);
    });
    setupActionButtons();
}

/**
 * Calculates joystick center coordinates.
 * @param {HTMLElement} joystick - joystick 
 * @returns {{centerX:number, centerY:number}}
 */
function getJoystickCenter(joystick) {
    const rect = joystick.getBoundingClientRect();
    return {
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2
    };
}

/**
 * Handles joystick movement
 * @param {TouchEvent} e - Touch event 
 * @param {HTMLElement} stick - Stick Element
 * @param {number} centerX - Stick center X
 * @param {number} centerY - Stick center Y
 */
function handleJoystickMove(e, stick, centerX, centerY) {
    const touch = e.touches[0];
    const dx = touch.clientX - centerX;
    const dy = touch.clientY - centerY;
    const maxRadius = 40;
    const distance = Math.min(Math.hypot(dx, dy), maxRadius);
    const angle = Math.atan2(dy, dx);
    const limitedX = Math.cos(angle) * distance;
    const limitedY = Math.sin(angle) * distance;
    moveStick(stick, limitedX, limitedY);
    updateKeyboardFromStick(limitedX, limitedY, distance);
}

/**
 * Joystick visual movement
 * @param {HTMLElement} stick - Stick Element 
 * @param {number} x - Offset X
 * @param {number} y - Offset Y
 */
function moveStick(stick, x, y) {
    stick.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
}

/**
 * Updates keyboard state from joystick input.
 * @param {number} x - Movement X
 * @param {number} y - Movement Y
 * @param {number} distance - Distance center
 */
function updateKeyboardFromStick(x, y, distance) {
    keyboard.LEFT = keyboard.RIGHT = keyboard.UP = keyboard.DOWN = false;
    if (distance > 10) {
        if (x < -10) keyboard.LEFT = true;
        if (x >  10) keyboard.RIGHT = true;
        if (y < -10) keyboard.UP = true;
        if (y >  10) keyboard.DOWN = true;
    }
}

/**
 * Resets joystick to center and clears movement.
 * @param {HTMLElement} stick - Joystick 
 */
function resetJoystick(stick) {
    moveStick(stick, 0, 0);
    keyboard.LEFT = keyboard.RIGHT = keyboard.UP = keyboard.DOWN = false;
}

/**
 * Sets up action buttons for mobile version.
 */
function setupActionButtons() {
    bindTouchButton('btn-attack', 'SPACE');
    bindTouchButton('btn-throw', 'D');
}

/**
 * Binds touch button to keyboard.
 * @param {string} buttonId - Button ID
 * @param {string} keyName - Keyboard action name
 */
function bindTouchButton(buttonId, keyName) {
    const btn = document.getElementById(buttonId);
    btn.addEventListener('touchstart', e => {
        e.preventDefault();
        keyboard[keyName] = true;
    });
    btn.addEventListener('touchend', e => {
        e.preventDefault();
        keyboard[keyName] = false;
    });
}

/**
 * Shows mobile controls.
 */
function showMobileControls() {
    document.getElementById('joystick').style.display = 'block';
    document.getElementById('btn-attack').style.display = 'block';
    document.getElementById('btn-throw').style.display = 'block';
}

/**
 * Hides mobile controls.
 */
function hideMobileControls() {
    document.getElementById('joystick').style.display = 'none';
    document.getElementById('btn-attack').style.display = 'none';
    document.getElementById('btn-throw').style.display = 'none';
}