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
     * @param {string|null} type - type of hit (electro or poison) 
     */
    hit(type = null) {
        let hitTimer = new Date().getTime();

        if(!this.lastHit || hitTimer -this.lastHit >= 1000) {
            this.energy -= 10;
                if(this.energy < 0) {
                    this.energy = 0;
                }
            this.lastHit = hitTimer;
            if (type) {
                this.lastHitType = type;
            }
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
     * Plays animation Sequence, the stops
     * @param {string[]} images - Array of imgs path 
     * @param {number} intervalTime - Delay between frames
     */
    playAnimationSequence(images, intervalTime) {
        let frameIndex = 0;
        let animationInterval = setInterval(() => {
            this.playAnimationOnce(images, frameIndex);
            frameIndex++;
            if (frameIndex >= images.length) {
                clearInterval(animationInterval);
            }
        }, intervalTime);
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