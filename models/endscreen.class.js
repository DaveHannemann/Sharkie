class EndScreen extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    buttonInterval;
    backgroundObjects = [];
    animatedButtons = [];
    mode;
    

    constructor(mode = "win", onRetry = null, onHome = null, onNextLevel = null) {
        super();
        this.mode = mode;
        this.onRetry = onRetry;
        this.onHome = onHome;
        this.onNextLevel = onNextLevel;

        this.initBackgroundAndButtons();
        this.animatedButtons.forEach(btn => this.loadImages(btn.images));
        this.startButtonAnimation();
    }

    /**
     * Initializes background and buttons based on condition
     */
    initBackgroundAndButtons() {
        if (this.mode === "win") this.initWinScreen();
        if (this.mode === "lose") this.initLoseScreen();
    }

    /**
     * Initializes win screen
     */
    initWinScreen() {
        this.backgroundObjects = [
            new BackgroundObject('../img/6.Botones/Try again/Mesa de trabajo 1.png', 0)
        ];
        this.backgroundObjects.forEach(obj => this.loadImage(obj.img.src));

        this.animatedButtons = [
            this.createButton('win', 190, 242, 340, 80, [
                '../img/6.Botones/Tittles/You win/Recurso 20.png',
                '../img/6.Botones/Tittles/You win/Recurso 21.png',
                '../img/6.Botones/Tittles/You win/Recurso 22.png',
                '../img/6.Botones/Tittles/You win/Recurso 23.png'
            ]),
            this.createStaticButton('homescreen', 670, 10, 40, 40, ['../img/6.Botones/shell_home.png'], 'Home')
        ];
        if (this.onNextLevel) {
            this.animatedButtons.push(this.createStaticButton('nextLevel', 640, 420, 60, 60, ['../img/6.Botones/next_level.png']));
        }
    }

    /**
     * Initializes lose screen
     */
    initLoseScreen() {
        this.animatedButtons = [
            this.createButton('gameover', 270, 200, 200, 60, [
                '../img/6.Botones/Tittles/Game Over/Recurso 9.png',
                '../img/6.Botones/Tittles/Game Over/Recurso 10.png',
                '../img/6.Botones/Tittles/Game Over/Recurso 11.png',
                '../img/6.Botones/Tittles/Game Over/Recurso 12.png',
                '../img/6.Botones/Tittles/Game Over/Recurso 13.png'
            ]),
            this.createButton('retry', 280, 325, 180, 40, [
                '../img/6.Botones/Try again/Recurso 15.png',
                '../img/6.Botones/Try again/Recurso 16.png',
                '../img/6.Botones/Try again/Recurso 17.png',
                '../img/6.Botones/Try again/Recurso 18.png'
            ], { top: 0, left: 10, right: 10, bottom: 0 }),
            this.createStaticButton('homescreen', 670, 10, 40, 40, ['../img/6.Botones/shell_home.png'], 'Home')
        ];
    }

    /**
     * Creates animated button
     * @param {string} name - Unique button identifier
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} width - Button width
     * @param {number} height - Button height
     * @param {string[]} images - Image paths for animation frames
     * @param {?Object} [hitboxOffset=null] - Optional hitbox offset
     * @returns {Object} Created button
     */
    createButton(name, x, y, width, height, images, hitboxOffset = null) {
        return { name, x, y, width, height, currentIndex: 0, images, hitboxOffset };
    }

    /**
     * Creates static button
     * @param {string} name - Unique button identifier
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} width - Button width
     * @param {number} height - Button height
     * @param {string[]} images - Image paths for animation frames
     * @param {?string} [text=null] - Optional text
     * @returns {Object} Created button
     */
    createStaticButton(name, x, y, width, height, images, text = null) {
        return { name, x, y, width, height, currentIndex: 0, images, isStatic: true, text };
    }

    /**
     * Starts animation loop for animated button
     */
    startButtonAnimation() {
        this.buttonInterval = setInterval(() => {
            this.animatedButtons.forEach(btn => {
                btn.currentIndex = (btn.currentIndex + 1) % btn.images.length;
            });
        }, 300);
    }

    /**
     * Stops buttion animation loop
     */
    stopButtonAnimation() {
        clearInterval(this.buttonInterval);
    }

    /**
     * Handles click detection
     * @param {number} mouseX - X coordinate 
     * @param {number} mouseY - Y coordinate
     */
    handleClick(mouseX, mouseY) {
        const clickMap = {
            retry: this.onRetry,
            homescreen: this.onHome,
            nextLevel: this.onNextLevel
        };

        Object.entries(clickMap).forEach(([btnName, handler]) => {
            if (handler && this.isButtonClicked(btnName, mouseX, mouseY)) handler();
        });
    }

    /**
     * Renders end screen and buttons
     * @param {CanvasRenderingContext2D} ctx - Rendering context 
     */
    draw(ctx) {
        this.drawBackground(ctx);
        this.animatedButtons.forEach(btn => this.drawButton(ctx, btn));
    }

    /**
     * Renders Background
     * @param {CanvasRenderingContext2D} ctx - Rendering context 
     */
    drawBackground(ctx) {
        ctx.fillStyle = this.mode === "win" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, this.width, this.height);

        if (this.mode === "win") {
            this.backgroundObjects.forEach(obj => obj.draw(ctx));
        }
    }

    /**
     * Draws button
     * @param {CanvasRenderingContext2D} ctx - Rendering context 
     * @param {Object} btn - Button
     */
    drawButton(ctx, btn) {
        const img = this.imageCache[btn.images[btn.currentIndex]];
        if (img) ctx.drawImage(img, btn.x, btn.y, btn.width, btn.height);

        if (btn.text) {
            ctx.font = '16px luckiestGuy-Regular';
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + btn.height);
        }
    }

    /**
     * Checks if button is clicked
     * @param {string} name - Button name
     * @param {number} mouseX - X coordinate
     * @param {number} mouseY - Y coordinate
     * @returns {boolean} True if clicked
     */
    isButtonClicked(name, mouseX, mouseY) {
        const btn = this.animatedButtons.find(b => b.name === name);
        return btn ? this.isPointInsideButton(btn, mouseX, mouseY) : false;
    }

    /**
     * Checks mouse hovering
     * @param {number} mouseX - X coordinate
     * @param {number} mouseY - Y coordinate
     * @returns {boolean} True if mouse is over button
     */
    isMouseOverButton(mouseX, mouseY) {
        return this.animatedButtons.some(btn => this.isPointInsideButton(btn, mouseX, mouseY));
    }

    /**
     * Checks mouse hovering for pointer state
     * @param {number} mouseX - X coordinate
     * @param {number} mouseY - Y coordinate
     * @returns {boolean} True if over a button that should change
     */
    isPointerButtonHovered(mouseX, mouseY) {
        const pointerBtns = ['homescreen', 'nextLevel', 'retry'];
        return this.animatedButtons.some(btn =>
            pointerBtns.includes(btn.name) && this.isPointInsideButton(btn, mouseX, mouseY)
        );
    }

    /**
     * Checks if point lies inside of button
     * @param {Object} btn - Button 
     * @param {number} mouseX - X coordinate
     * @param {number} mouseY - Y coordinate
     * @returns {boolean} True if point is inside button bounds
     */
    isPointInsideButton(btn, mouseX, mouseY) {
        const offset = btn.hitboxOffset || { top: 0, left: 0, right: 0, bottom: 0 };
        const x1 = btn.x + offset.left;
        const y1 = btn.y + offset.top;
        const x2 = btn.x + btn.width - offset.right;
        const y2 = btn.y + btn.height - offset.bottom;
        return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
    }
}