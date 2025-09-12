class HUD extends DrawableObject {
    muteButton = {
        x: 180,
        y: 10,
        width: 30,
        height: 30,
        images: [
            'img/6.Botones/sounds_on.png',
            'img/6.Botones/sounds_off.png'
        ],
        currentIndex: audioManager.muted ? 1 : 0
    };

    constructor() {
        super();
        this.loadImages(this.muteButton.images);
    }


    /**
     * Draws the mute button
     * @param {CanvasRenderingContext2D} ctx - rendering context of canvas 
     * @returns {void}
     */
    draw(ctx) {
        let img = this.imageCache[this.muteButton.images[this.muteButton.currentIndex]];
        if (!img) return;
        ctx.drawImage(
            img,
            this.muteButton.x,
            this.muteButton.y,
            this.muteButton.width,
            this.muteButton.height
        );
    }

    /**
     * Handles mouse click on the mute button
     * @param {number} mouseX - X coordinate of click 
     * @param {number} mouseY - Y coordinate of click
     */
    handleClick(mouseX, mouseY) {
        let b = this.muteButton;
        if (mouseX >= b.x && mouseX <= b.x + b.width &&
            mouseY >= b.y && mouseY <= b.y + b.height) {
            
            audioManager.toggleMute();
            b.currentIndex = audioManager.muted ? 1 : 0;
        }
    }

    /**
     * Checks if mouse is hovering over mute button
     * @param {number} mouseX - X coordinate of click
     * @param {number} mouseY - Y coordinate of click
     * @returns {boolean} - True if mouse over mute button
     */
    isMouseOverMute(mouseX, mouseY) {
        let btn = this.muteButton;
        return (
            mouseX >= btn.x &&
            mouseX <= btn.x + btn.width &&
            mouseY >= btn.y &&
            mouseY <= btn.y + btn.height
        );
    }
}