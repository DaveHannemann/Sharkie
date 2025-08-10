class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 175;
    width = 150;
    height = 150;

    loadImage(path) {
    this.img = new Image();
    this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        if (!this.img || !this.img.complete || this.img.naturalWidth === 0) {
        return;
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {          
        if(this instanceof Character || this instanceof Fish  || this instanceof Endboss || this instanceof CollectableObject || this instanceof JellyFish) {
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        let hitbox = this.getHitbox();
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'green';
        ctx.rect(
            hitbox.left,
            hitbox.top,
            hitbox.right - hitbox.left,
            hitbox.bottom - hitbox.top
        );
        ctx.stroke();
        }
    }
}