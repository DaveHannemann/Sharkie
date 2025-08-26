class HUD extends DrawableObject {
    muteButton = {
        x: 180,
        y: 10,
        width: 30,
        height: 30,
        images: [
            '../img/6.Botones/sounds_on.png',
            '../img/6.Botones/sounds_off.png'
        ],
        currentIndex: 0
    };

    constructor() {
        super();
        this.loadImages(this.muteButton.images);
    }

    draw(ctx) {
        let img = this.imageCache[this.muteButton.images[this.muteButton.currentIndex]];
        if (img) ctx.drawImage(img, this.muteButton.x, this.muteButton.y, this.muteButton.width, this.muteButton.height);
    }

    handleClick(mouseX, mouseY) {
        if (mouseX >= this.muteButton.x &&
            mouseX <= this.muteButton.x + this.muteButton.width &&
            mouseY >= this.muteButton.y &&
            mouseY <= this.muteButton.y + this.muteButton.height) {
            audioManager.toggleMute();
            this.muteButton.currentIndex = audioManager.muted ? 1 : 0;
        }
    }
}