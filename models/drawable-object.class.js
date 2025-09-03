class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 175;
    width = 150;
    height = 150;

    /**
     * Loads image.
     * @param {string} path - path of image 
     */
    loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    }

    /**
     * Loads images to cache
     * @param {string[]} arr - list of image paths 
     */
    loadImages(arr) {
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
    }

    /**
     * draws imgs on canvas
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas 
     * @returns 
     */
    draw(ctx) {
        if (!this.img || !this.img.complete || this.img.naturalWidth === 0) {
        return;
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}