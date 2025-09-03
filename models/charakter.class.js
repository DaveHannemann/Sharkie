class Character extends MovableObject {
    x = 50;
    y = 100;
    width = 150;
    height = 150;
    speed = 5;
    energy = 100;
    lastKeyPressed = Date.now();
    intervals = [];
    snoringPlaying = false;
    finSlapped = false;
    spacePressedLog = false;
    deadAnimationPlayed = false;
    floatUpActive = false;
    bubbleAttacking = false;
    poisonBubblesUnlocked = false;
    isPlayingHurtSound = false;
    longIdlePlayedOnce = false;
    longIdleRepeatStartIndex = 10;
    longIdleFrameIndex = 0;

    world;
    offSet = {top : 35, bottom : 70, left : 30, right : 40};

    constructor(){
        super().loadImage('../img/1.Sharkie/3.Swim/3.png');
        this.IMAGES_IDLE = this.createImagePaths('../img/1.Sharkie/1.IDLE', 18);
        this.IMAGES_LONG_IDLE = this.createImagePaths('img/1.Sharkie/2.Long_IDLE', 14, 'li');
        this.IMAGES_SWIMMING = this.createImagePaths('../img/1.Sharkie/3.Swim', 6);
        this.IMAGES_HURT_POISONED = this.createImagePaths('../img/1.Sharkie/5.Hurt/1.Poisoned', 4);
        this.IMAGES_HURT_SHOCKED = this.createImagePaths('../img/1.Sharkie/5.Hurt/2.Electric shock', 3);
        this.IMAGES_DEAD_POISON = this.createImagePaths('../img/1.Sharkie/6.dead/1.Poisoned', 12);
        this.IMAGES_DEAD_SHOCKED = this.createImagePaths('../img/1.Sharkie/6.dead/2.Electro_shock', 10);
        this.IMAGES_FIN_SLAP = this.createImagePaths('../img/1.Sharkie/4.Attack/Fin slap', 8);
        this.IMAGES_BUBBLE_ATTACK = this.createImagePaths('../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)', 8);
        this.IMAGES_BUBBLE_POISON_ATTACK = this.createImagePaths('../img/1.Sharkie/4.Attack/Bubble trap/For Whale', 8);

        [
            this.IMAGES_SWIMMING,
            this.IMAGES_FIN_SLAP,
            this.IMAGES_DEAD_POISON,
            this.IMAGES_DEAD_SHOCKED,
            this.IMAGES_HURT_POISONED,
            this.IMAGES_HURT_SHOCKED,
            this.IMAGES_IDLE,
            this.IMAGES_LONG_IDLE,
            this.IMAGES_BUBBLE_ATTACK,
            this.IMAGES_BUBBLE_POISON_ATTACK
        ].forEach(arr => this.loadImages(arr));

        this.startAnimationLoops();
    }

    /**
     * Helper to generate image paths
     * @param {string} basePath - Folder path
     * @param {number} count - Number of images
     * @param {string} prefix - Optional prefix
     * @param {string} suffix - Optional suffix
     * @returns {string[]} Array of paths
     */
    createImagePaths(basePath, count, prefix = '', suffix = '.png') {
        return Array.from({ length: count }, (_, i) => `${basePath}/${prefix}${i + 1}${suffix}`);
    }

    /**
     * Starts core update loops.
     */
    startAnimationLoops() {
        this.intervals.push(this.createInterval(() => this.handleMovement(), 1000/60));
        this.intervals.push(this.createInterval(() => this.handleAnimation(), 175));
        this.intervals.push(this.createInterval(() => this.handleAttacks(), 1000/60));
        }

    /**
     * Creates an interval and returns its ID.
     * @param {Function} fn - Function to call every interval
     * @param {number} ms - Interval in milliseconds
     * @returns {number} Interval ID
     */
    createInterval(fn, ms) {
        const id = setInterval(fn, ms);
        return id;
    }

    /**
     * Handles movement and camera updates.
     * @returns {void}
     */
    handleMovement() {
        if (!this.world || this.isDead()) return this.handleDeathMovement();
        this.handleHorizontalMovement();
        this.handleVerticalMovement();
        this.updateCamera();
    }

    /**
     * Horizontal movement logic.
     */
    handleHorizontalMovement() {
        const levelEndX = this.world.level.level_end_x;
        if (this.x < levelEndX) {
            if (this.world.keyboard.RIGHT) {
                this.moveRight();
                this.otherDirection = false;
            } else if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        } else {
            this.reachLevelEnd(levelEndX);
        }
    }

    /**
     * Vertical movement logic.
     */
    handleVerticalMovement() {
        if (this.world.keyboard.UP && this.y > this.world.level.level_end_top) {
            this.y -= this.speed;
        }
        if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_bottom) {
            this.y += this.speed;
        }
    }

    /**
     * Holds position at the Endboss and unlocks specified bubbles.
     * @param {number} levelEndX - x pos of endstage 
     */
    reachLevelEnd(levelEndX) {
        this.x = levelEndX;
        this.poisonBubblesUnlocked = true;
        this.otherDirection = false;
    }

    /**
     * Updates camera fixed on char.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 50;
    }

    /**
     * Updates characters animation, state and input
     * @returns {void}
     */
    handleAnimation() {
        if (!this.world) return;
        if (this.anyKeyPressed()) {
            this.lastKeyPressed = Date.now();
            this.stopSnoringIfActive();
        }
        if (this.isDead()) return this.playDeathAnimation();
        if (this.isHurt()) return this.playHurtAnimation();
        if (this.isMoving()) return this.playMovingAnimation();
        if (Date.now() - this.lastKeyPressed > 10000) return this.playLongIdleAnimation();
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Checks if any relevant key is currently pressed.
     * @returns {boolean} True if key is pressed
     */
    anyKeyPressed() {
        const k = this.world.keyboard;
        return k.RIGHT || k.LEFT || k.UP || k.DOWN || k.SPACE || k.D;
    }

    /**
     * Checks character movement
     * @returns {boolean} True if keys are pressed
     */
    isMoving() {
        const k = this.world.keyboard;
        return k.RIGHT || k.LEFT || k.UP || k.DOWN;
    }

    /**
     * Stops snoring if active
     */
    stopSnoringIfActive() {
        if (this.snoringPlaying) {
            audioManager.stopSFX('snoring');
            this.snoringPlaying = false;
        }
    }

    /**
     * Handles attack input fin slap.
     */
    handleAttacks() {
        if (!this.isDead() && this.world.keyboard.SPACE && !this.spacePressedLog) this.finSlap();
        this.spacePressedLog = this.world.keyboard.SPACE;
    }

    /**
     * Stops all intervals and snoring.
     */
    stopAllIntervals() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
        if (this.snoringPlaying) audioManager.stopSFX('snoring');
        this.snoringPlaying = false;
    }

    /**
     * Handles death of char specified by last hit.
     */
    handleDeathMovement() {
        if (!this.floatUpActive) this.floatUpActive = true;
        if (this.lastHitType === "poison" || this.lastHitType === "default") {
            if (this.y > -50) this.y -= 1;
        } else if (this.lastHitType === "electro") {
            if (this.y < 300) this.y += 1;
        }
    }

    /**
     * Plays death animation and sound.
     */
    playDeathAnimation() {
        if (!this.deadAnimationPlayed) {
            this.deadAnimationPlayed = true;
            audioManager.playSFX('char_dead');
            const anim = this.lastHitType === "electro" ? this.IMAGES_DEAD_SHOCKED : this.IMAGES_DEAD_POISON;
            this.playAnimationSequence(anim, 150);
        }
    }

    /**
     * Plays hurt animation and sound.
     */
    playHurtAnimation() {
        if (!this.isPlayingHurtSound) {
            const sound = this.lastHitType === "electro" ? 'shocked' : 'poisoned';
            audioManager.playSFX(sound);
            this.isPlayingHurtSound = true;
        }
        const anim = this.lastHitType === "electro" ? this.IMAGES_HURT_SHOCKED : this.IMAGES_HURT_POISONED;
        this.playAnimation(anim);
    }

    /**
     * Plays swimming animation and stops snoring if active.
     */
    playMovingAnimation() {
        if (this.snoringPlaying) {
            audioManager.stopSFX('snoring');
            this.snoringPlaying = false;
        }
        if (this.world && this.world.endScreen) return;
        this.lastKeyPressed = Date.now();
        this.longIdlePlayedOnce = false;
        this.longIdleFrameIndex = 0;
        this.playAnimation(this.IMAGES_SWIMMING);
    }

    /**
     * Plays long idle Animation and starts snoring.
     */
    playLongIdleAnimation() {
        if (!this.world || this.world.startScreen || this.world.endScreen) return;
        this.updateLongIdleFrame(this.IMAGES_LONG_IDLE, this.longIdleRepeatStartIndex);
        this.playAnimationOnce(this.IMAGES_LONG_IDLE, this.longIdleFrameIndex);
        if (!this.snoringPlaying) this.startSnoring();
    }

    /**
     * Handles the long idle animation whether full or the endloop
     * @param {string[]} images - Array of imgs 
     * @param {number} repeatStart - Index to start repeating the animation
     */
    updateLongIdleFrame(images, repeatStart) {
        if (!this.longIdlePlayedOnce) {
            this.longIdleFrameIndex++;
            if (this.longIdleFrameIndex >= images.length) {
                this.longIdlePlayedOnce = true;
                this.longIdleFrameIndex = repeatStart;
            }
        } else {
            this.longIdleFrameIndex++;
            if (this.longIdleFrameIndex >= images.length) this.longIdleFrameIndex = repeatStart;
        }
    }

    /**
     * Starts snoring if necessary
     */
    startSnoring() {
        audioManager.playSFX('snoring');
        this.snoringPlaying = true;
    }

    /**
     * Executes a fin slap.
     * @returns {void}
     */
    finSlap() {
        if (this.finSlapped) return;
        this.finSlapped = true;
        audioManager.playSFX('slap');
        this.animateMovement(30, 50, this.otherDirection, progress => 
            Math.sin(progress * Math.PI)
        , () => this.finSlapped = false);
        this.playAnimationSequence(this.IMAGES_FIN_SLAP, 60);
    }


    /**
     * Returns the X coordinate where a bubble should spawn.
     * @returns {number|null} X position for bubble spawn or null if invalid
     */
    getBubbleStartX() {
        if (this.otherDirection) return null;
        return this.x + this.width - this.offSet.right;
    }

    /**
     * Returns the Y coordinate where a bubble should spawn.
     * @returns {number} Y position for bubble spawn
     */
    getBubbleStartY() {
        return this.y + this.height - this.offSet.bottom;
    }

    /**
     * Initiates a bubble attack if possible.
     * @returns {void}
     */
    bubbleAttack() {
        if (this.bubbleAttacking || !this.world || this.otherDirection || this.world.endboss?.energy <= 0) return;
        this.bubbleAttacking = true;
        const usePoison = this.poisonBubblesUnlocked && this.world.poisonBar.percentage > 0;
        const anim = usePoison ? this.IMAGES_BUBBLE_POISON_ATTACK : this.IMAGES_BUBBLE_ATTACK;
        audioManager.playSFX('bubble');
        this.playAnimationSequence(anim, 60, () => {
            if (!this.world) return;
            const spawnX = this.x + this.width - this.offSet.right;
            const spawnY = this.y + this.height - this.offSet.bottom;
            const type = usePoison ? 'poison' : 'normal';
            this.world.throwableObjects.push(new ThrowableObject(spawnX, spawnY, type, 1));
            if (usePoison) this.world.poisonBar.setPercentage(Math.max(this.world.poisonBar.percentage - 10, 0));
            this.bubbleAttacking = false;
        });
    }

    /**
     * Animates a custom movement with easing.
     * @param {number} frames - Number of animation frames
     * @param {number} maxX - Maximum X
     * @param {boolean} reverse - Move other direction if true
     * @param {function(number): number} progressFn - Function that returns progress multiplier based on frame
     * @param {function(): void} [onComplete] - Callback when finished
     */
    animateMovement(frames, maxX, reverse, progressFn, onComplete) {
        const startX = this.x;
        let frame = 0;
        const direction = reverse ? -1 : 1;
        const interval = setInterval(() => {
            this.x = Math.round(startX + progressFn(frame / frames) * maxX * direction);
            if (++frame > frames) {
                clearInterval(interval);
                this.x = startX;
                onComplete?.();
            }
        }, 500 / frames);
    }
}