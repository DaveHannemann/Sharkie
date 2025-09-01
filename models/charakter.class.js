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

    world;
    offSet = {top : 35, bottom : 70, left : 30, right : 40};

    IMAGES_IDLE = [
        '../img/1.Sharkie/1.IDLE/1.png',
        '../img/1.Sharkie/1.IDLE/2.png',
        '../img/1.Sharkie/1.IDLE/3.png',
        '../img/1.Sharkie/1.IDLE/4.png',
        '../img/1.Sharkie/1.IDLE/5.png',
        '../img/1.Sharkie/1.IDLE/6.png',
        '../img/1.Sharkie/1.IDLE/7.png',
        '../img/1.Sharkie/1.IDLE/8.png',
        '../img/1.Sharkie/1.IDLE/9.png',
        '../img/1.Sharkie/1.IDLE/10.png',
        '../img/1.Sharkie/1.IDLE/11.png',
        '../img/1.Sharkie/1.IDLE/12.png',
        '../img/1.Sharkie/1.IDLE/13.png',
        '../img/1.Sharkie/1.IDLE/14.png',
        '../img/1.Sharkie/1.IDLE/15.png',
        '../img/1.Sharkie/1.IDLE/16.png',
        '../img/1.Sharkie/1.IDLE/17.png',
        '../img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/i2.png',
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png',
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png',
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png',
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png',
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png',
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png'
    ]

    IMAGES_SWIMMING = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_HURT_POISONED = [
        '../img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ];

    IMAGES_HURT_SHOCKED = [
        '../img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        '../img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        '../img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];

    IMAGES_DEAD_POISON = [
        '../img/1.Sharkie/6.dead/1.Poisoned/1.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/2.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/3.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/4.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/5.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/6.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/7.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/8.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/9.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/10.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/11.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];

    IMAGES_DEAD_SHOCKED = [
        '../img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ]

    IMAGES_FIN_SLAP = [
        '../img/1.Sharkie/4.Attack/Fin slap/1.png',
        '../img/1.Sharkie/4.Attack/Fin slap/2.png',
        '../img/1.Sharkie/4.Attack/Fin slap/3.png',
        '../img/1.Sharkie/4.Attack/Fin slap/4.png',
        '../img/1.Sharkie/4.Attack/Fin slap/5.png',
        '../img/1.Sharkie/4.Attack/Fin slap/6.png',
        '../img/1.Sharkie/4.Attack/Fin slap/7.png',
        '../img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];

    IMAGES_BUBBLE_ATTACK = [
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];

    IMAGES_BUBBLE_POISON_ATTACK = [
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        '../img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];

    constructor(){
        super().loadImage('../img/1.Sharkie/3.Swim/3.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FIN_SLAP);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_DEAD_SHOCKED);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_SHOCKED);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_BUBBLE_POISON_ATTACK);

        this.startAnimationLoops();
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
     * Handles animation based on state.
     * @returns {void}
     */
    handleAnimation() {
        if (!this.world) return;
        if (this.isDead()) return this.playDeathAnimation();
        if (this.isHurt()) return this.playHurtAnimation();
        this.isPlayingHurtSound = false;
        const moving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;
        if (moving) return this.playMovingAnimation();        
        const idleTime = Date.now() - this.lastKeyPressed;
        if (idleTime > 10000) return this.playLongIdleAnimation();
        this.playAnimation(this.IMAGES_IDLE);
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
        this.playAnimation(this.IMAGES_SWIMMING);
    }

    /**
     * Plays long idle Animation and starts snoring.
     */
    playLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        if (!this.snoringPlaying && this.world && !this.world.endScreen) {
            audioManager.playSFX('snoring');
            this.snoringPlaying = true;
        }
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
     * Executes bubble attack if possible.
     * @returns {void}
     */
    bubbleAttack() {
        if (this.bubbleAttacking || !this.world || this.otherDirection || this.world.endboss?.energy <= 0 ) return;
        this.bubbleAttacking = true;
        const usePoison = this.poisonBubblesUnlocked && this.world.poisonBar.percentage > 0;
        const anim = usePoison ? this.IMAGES_BUBBLE_POISON_ATTACK : this.IMAGES_BUBBLE_ATTACK;
        audioManager.playSFX('bubble');
        this.playAnimationSequence(anim, 60);
        const startX = this.getBubbleStartX();
        setTimeout(() => {
            if (!this.world) return;
            const type = usePoison ? 'poison' : 'normal';
            this.world.throwableObjects.push(new ThrowableObject(startX, this.y + 100, type, 1));
            if (usePoison) this.world.poisonBar.setPercentage(Math.max(this.world.poisonBar.percentage - 10, 0));
            this.bubbleAttacking = false;
        }, anim.length * 60);
    }

    /**
     * Calculates X position where bubble will spawn.
     * @returns {number} Bubble start X position
     */
    getBubbleStartX() {
        const levelEndX = this.world.level.level_end_x;
        const atBossArea = this.x >= levelEndX;
        if (atBossArea) return this.x + this.width;
            const movingRight = this.world.keyboard.RIGHT;
            const offset = movingRight ? 100 : -20;
            return this.x + this.width + offset;
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