class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    lastHit = 0;
    lastHitType = null;

    offSet = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    };

    /**
     * Returns current hitbox of object
     * @returns {{left: number, right: number, top: number, bottom: number}} The hitbox boundaries.
     */
    getHitbox() {
    return {
        left: this.x + this.offSet.right,
        right: this.x + this.width - this.offSet.left,
        top: this.y + this.offSet.bottom,
        bottom: this.y + this.height - this.offSet.top
    };
    }

    /**
     * Checks for collision
     * @param {MovableObject} movableObject - object to check collision against 
     * @returns {boolean} True if colliding
     */
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

    /**
     * Applies damage to object, has a timer to prevent multiple hits directly
     * @param {number} damage - Damage value
     * @param {string} [type="default"] - Type of hit (electro, poison, default) 
     */
    hit(damage = 10, type = "default") {
        const now = Date.now();
        if (!this.lastHit || now - this.lastHit >= 1000) {
            this.energy -= damage;
            if (this.energy < 0) this.energy = 0;
            this.lastHit = now;
            this.lastHitType = type;
            this.isPlayingHurtSound = false;
        }
    }

    /**
     * Checks if object is hurt
     * @returns {boolean} True if hurt
     */
    isHurt() {
        let timeSinceHit = new Date().getTime() - this.lastHit;
        timeSinceHit = timeSinceHit / 1000;
        return timeSinceHit < 1;
    }

    /**
     * Checks if object is dead
     * @returns {boolean} True if dead
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Plays animation by going through given imgs array
     * @param {string[]} images - Array of imgs path 
     * @returns {void}
     */
    playAnimation(images) {
        if (!images || images.length === 0) return;
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation sequence frame by frame
     * @param {string[]} images - Array of image paths
     * @param {number} interval - Time per frame in ms
     * @param {function} [onComplete] - Optional callback after last frame
     */
    playAnimationSequence(images, interval, onComplete) {
        let frameIndex = 0;
        const animInterval = setInterval(() => {
            const img = new Image();
            img.src = images[frameIndex];
            this.img = img;
            frameIndex++;
            if (frameIndex >= images.length) {
                clearInterval(animInterval);
                if (onComplete) onComplete();
            }
        }, interval);
    }


    /**
     * Plays animation once
     * @param {string[]} images - Array of imgs path  
     * @param {number} frameIndex - frame index to display
     */
    playAnimationOnce(images, frameIndex) {
        if (frameIndex < images.length){
            let path = images[frameIndex];
            this.img = this.imageCache[path];
        }

    }

    /**
     * Moves object to the right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves object to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }
}