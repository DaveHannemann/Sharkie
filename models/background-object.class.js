class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
        this.imageLoaded = this.loadImageAsync(imagePath);
    }

    /**
     * Loads image asynchronously
     * @param {string} path - file path of img
     * @returns {Promise<void>} Resolves when image finishes loading.
     */
    loadImageAsync(path) {
        return new Promise((resolve) => {
            this.img = new Image();
            this.img.onload = () => resolve();
            this.img.src = path;
        });
    }
}