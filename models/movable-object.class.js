class MovableObject{
    x = 0;
    y = 175;
    img;
    width = 150;
    height = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    offSet = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    };



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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {  
        
        if(this instanceof Character || this instanceof Fish) {
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

    getHitbox() {
    return {
        left: this.x + this.offSet.right,
        right: this.x + this.width - this.offSet.left,
        top: this.y + this.offSet.bottom,
        bottom: this.y + this.height - this.offSet.top
    };
    }

    // character.isColliding(fish);
    isColliding(movableObject) {
        let a = this.getHitbox();
        let b = movableObject.getHitbox();
        return (
            a.left < b.right &&
            a.top < b.bottom &&
            a.right > b.left &&
            a.bottom > b.top
        );
    }

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_SWIMMING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}