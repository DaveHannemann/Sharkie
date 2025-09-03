class StartScreen extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    buttonInterval;
    backgroundObjects = [];
    statusBars = [];
    animatedButtons = [];
    collectables = [];
    onlyStartScreenObjects = [];
    buttonsActive = true;

    constructor() {
        super();
        this.initBackground();
        this.initStatusBars();
        this.initCollectables();
        this.initButtons();
        this.startButtonAnimation();
    }

    /**
     * Initializes background
     */
    initBackground() {
        this.backgroundObjects = [
            new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 0),
            new BackgroundObject('../img/3. Background/Layers/1. Light/1.png', 0)
        ];
        this.backgroundObjects.forEach(obj => this.loadImage(obj.img.src));
    }

    /**
     * Initializes status bars
     */
    initStatusBars() {
        this.statusBars = [
            new StatusBar('health', 10, 40, 100),
            new StatusBar('coin', 10, 70, 100),
            new StatusBar('poison', 10, 10, 100)
        ];
    }

    /**
     * Initializes collectables
     */
    initCollectables() {
        this.collectables = [
            new CollectableObject('coin', 230, 325, 800),
            new CollectableObject('coin', 270, 270, 800),
            new CollectableObject('coin', 320, 220, 800),
            new CollectableObject('coin', 380, 220, 800),
            new CollectableObject('coin', 430, 270, 800),
            new CollectableObject('coin', 470, 325, 800),
            new CollectableObject('poison', 10, 9, 300, 30, 40),
            new CollectableObject('poison-dark', 230, 370, 1000, 60, 60)
        ];
        this.collectables.forEach(obj => {
            obj.animate();
            if (obj.animationImages === obj.IMAGES_POISON) {
                obj.width = 30;
                obj.height = 40;
            }
        });
    }

    /**
     * Initializes buttons
     */
    initButtons() {
        this.animatedButtons = [
            { name: 'start', x: 280, y: 325, width: 180, height: 40, currentIndex: 0, images: [
                '../img/6.Botones/Start/1.png','../img/6.Botones/Start/2.png',
                '../img/6.Botones/Start/3.png','../img/6.Botones/Start/4.png'] },
            { name: 'fullscreen', x: 580, y: 10, width: 130, height: 40, currentIndex: 0, images: [
                '../img/6.Botones/Full Screen/Mesa de trabajo 6.png',
                '../img/6.Botones/Full Screen/Mesa de trabajo 7.png',
                '../img/6.Botones/Full Screen/Mesa de trabajo 8.png',
                '../img/6.Botones/Full Screen/Mesa de trabajo 9.png'] },
            { name: 'howto', x: 260, y: -20, width: 190, height: 120, currentIndex: 0,
                images: ['../img/6.Botones/floss.png'], isStatic: true, text: 'How to',
                hitboxOffset: { top: 40, left: 60, right: 60, bottom: 40 } },
            { name: 'mute', x: 200, y: 10, width: 30, height: 30,
                currentIndex: audioManager.muted ? 1 : 0,
                images: ['../img/6.Botones/sounds_on.png','../img/6.Botones/sounds_off.png'],
                isStatic: true },
            { name: 'impressum', x: 600, y: 440, width: 100, height: 30,
            images: [], isStatic: true, text: 'Impressum',
                hitboxOffset: { top: 0, left: 0, right: 0, bottom: 0 } }    
        ];
        this.animatedButtons.forEach(btn => this.loadImages(btn.images));
    }

    /**
     * Starts animation of buttons
     */
    startButtonAnimation() {
        this.buttonInterval = setInterval(() => {
            this.animatedButtons.forEach(btn => {
                if (!btn.isStatic) {
                    btn.currentIndex = (btn.currentIndex + 1) % btn.images.length;
                }
            });
        }, 300);
    }

    /**
     * Stops animation of buttons
     */
    stopButtonAnimation() {
        clearInterval(this.buttonInterval);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas 
     */
    draw(ctx) {
        this.drawBackground(ctx);
        this.drawStatusBars(ctx);
        this.drawCollectables(ctx);
        this.drawButtons(ctx);
    }

    /**
     * Draws background
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas 
     */
    drawBackground(ctx) {
        this.backgroundObjects.forEach(obj => obj.draw(ctx));
    }

    /**
     * Draws status bars
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas 
     */
    drawStatusBars(ctx) {
        this.statusBars.forEach(bar => bar.draw(ctx));
    }

    /**
     * Draws collectables
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas 
     */
    drawCollectables(ctx) {
        this.collectables.forEach(obj => obj.draw(ctx));
    }

    /**
     * Draws buttons
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas 
     */
    drawButtons(ctx) {
        this.animatedButtons.forEach(btn => {
            if (btn.images.length > 0) {
                let img = this.imageCache[btn.images[btn.currentIndex]];
                if (img) ctx.drawImage(img, btn.x, btn.y, btn.width, btn.height);
            }
            if (btn.text) this.drawButtonText(ctx, btn);
        });
    }

    /**
     * Draws text near a button
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas 
     * @param {Object} btn - Button
     */
    drawButtonText(ctx, btn) {
        ctx.font = '16px luckiestGuy-Regular';
        ctx.fillStyle = 'yellow';
        ctx.textAlign = 'center';
        ctx.fillText(btn.text, btn.x + btn.width / 2, btn.y + btn.height / 2 + 7);
    }

    /**
     * Disable buttons
     */
    disableButtons() {
        this.buttonsActive = false;
    }

    /**
     * Checks if a button is clicked
     * @param {string} name - Name of button
     * @param {number} mouseX - X coordinate
     * @param {number} mouseY - Y coordinate
     * @returns {boolean} True if clicked
     */
    isButtonClicked(name, mouseX, mouseY) {
        if (!this.buttonsActive) return false;
        let btn = this.animatedButtons.find(b => b.name === name);
        return btn ? this.isInsideButton(btn, mouseX, mouseY) : false;
    }

    /**
     * Checks if mouse is over button
     * @param {number} mouseX - X coordinate
     * @param {number} mouseY - Y coordinate
     * @returns {boolean} True if it is over the button
     */
    isMouseOverButton(mouseX, mouseY) {
        if (!this.buttonsActive) return false;
        return this.animatedButtons.some(btn => this.isInsideButton(btn, mouseX, mouseY));
    }

    /**
     * Checks if mouse is inside a button
     * @param {Object} btn - Button 
     * @param {number} mouseX - X coordinate
     * @param {number} mouseY - Y coordinate
     * @returns {boolean} True if inside the button
     */
    isInsideButton(btn, mouseX, mouseY) {
        let offset = btn.hitboxOffset || { top: 0, left: 0, right: 0, bottom: 0 };
        let x1 = btn.x + offset.left;
        let y1 = btn.y + offset.top;
        let x2 = btn.x + btn.width - offset.right;
        let y2 = btn.y + btn.height - offset.bottom;
        return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
    }

    /**
     * Shows or hides the "How To" button
     * @param {boolean} visible - True to show
     */
    toggleHowToButton(visible) {
        let idx = this.animatedButtons.findIndex(b => b.name === 'howto');
        if (!visible && idx !== -1) {
            let removed = this.animatedButtons.splice(idx, 1)[0];
            this.onlyStartScreenObjects.push(removed);
        }
        if (visible) {
            let stored = this.onlyStartScreenObjects.find(b => b.name === 'howto');
            if (stored && !this.animatedButtons.some(b => b.name === 'howto')) {
                this.animatedButtons.push(stored);
                this.onlyStartScreenObjects =
                    this.onlyStartScreenObjects.filter(b => b.name !== 'howto');
            }
        }
    }
}