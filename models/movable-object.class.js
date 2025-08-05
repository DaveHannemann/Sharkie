class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    lastHit = 0;

    offSet = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    };

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

    hit() {
        let hitTimer = new Date().getTime();

        if(!this.lastHit || hitTimer -this.lastHit >= 1000) {
            this.energy -= 5;
                if(this.energy < 0) {
                    this.energy = 0;
                }
            this.lastHit = hitTimer;
        }
    }

    isHurt() {
        let timeSinceHit = new Date().getTime() - this.lastHit; // Difference in ms
        timeSinceHit = timeSinceHit / 1000; // Difference in s
        return timeSinceHit < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images, frameIndex) {
        if (frameIndex < images.length){
            let path = images[frameIndex];
            this.img = this.imageCache[path];
        }

    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}