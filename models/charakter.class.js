class Character extends MovableObject {
    x = 50;
    y = 100;
    width = 150;
    height = 150;
    speed = 5;
    energy = 100;
    lastKeyPressed = new Date().getTime();
    finSlapped = false;
    spacePressedLog = false;
    deadAnimationPlayed = false;
    floatUpActive = false;
    bubbleAttacking = false;
    poisonBubblesUnlocked = false;
    isPlayingHurtSound = false;
    intervals = [];

    offSet = {
    top : 35,
    bottom : 70,
    left : 25,
    right : 40
    };

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

    world;

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

        this.lastKeyPressed = new Date().getTime();
        this.snoringPlaying = false;

        this.startAnimationLoops();
    }

    startAnimationLoops() {
        let moveInterval = setInterval(() => {
            if(!this.world) return;

            if(this.isDead()) {
                if (!this.floatUpActive) this.floatUpActive = true;
                if(this.lastHitType === "poison" || this.lastHitType === "default") {
                    if (this.y > -50) this.y -= 1;
                } else if (this.lastHitType === "electro") {
                    if (this.y < 300) this.y += 1;
                }
                return;
            }

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0 && this.x < this.world.level.level_end_x) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && this.y > this.world.level.level_end_top) this.y -= this.speed;
            if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_bottom) this.y += this.speed;
            if (this.x >= this.world.level.level_end_x) this.poisonBubbleUnlocked = true;

            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);
        this.intervals.push(moveInterval);

        let animInterval = setInterval(() => {
            if(!this.world) return;
            if(this.isDead()) {
                if (!this.deadAnimationPlayed) {
                    this.deadAnimationPlayed = true;
                    audioManager.playSFX('char_dead');
                    if (this.lastHitType === "poison") this.playAnimationSequence(this.IMAGES_DEAD_POISON, 150);
                    else if (this.lastHitType === "electro") this.playAnimationSequence(this.IMAGES_DEAD_SHOCKED, 150);
                    else this.playAnimationSequence(this.IMAGES_DEAD_POISON, 150);
                }
            } else if (this.isHurt()) {
                this.handleHurtSound();
                if (this.lastHitType === "poison") this.playAnimation(this.IMAGES_HURT_POISONED);
                else if (this.lastHitType === "electro") this.playAnimation(this.IMAGES_HURT_SHOCKED);
                else this.playAnimation(this.IMAGES_HURT_POISONED);
            } else {
                this.isPlayingHurtSound = false;
        let isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN;

        if (isMoving) {
            if (this.snoringPlaying) {
                audioManager.stopSFX('snoring');
                this.snoringPlaying = false;
            }
            this.lastKeyPressed = new Date().getTime();
            this.playAnimation(this.IMAGES_SWIMMING);
        } else {
            let idleTime = new Date().getTime() - this.lastKeyPressed;
            if (idleTime > 10000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                if (!this.snoringPlaying) {
                    audioManager.playSFX('snoring');
                    this.snoringPlaying = true;
                }
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }
    }        
        }, 175);
        this.intervals.push(animInterval);

        let attackInterval = setInterval(() => {
            if (!this.isDead()) {
                if (this.world.keyboard.SPACE && !this.spacePressedLog && this.x < this.world.level.level_end_x) {
                    this.finSlap();
                }
                this.spacePressedLog = this.world.keyboard.SPACE;
            }
        }, 1000 / 60);
        this.intervals.push(attackInterval);
    }

stopAllIntervals() {
    this.intervals.forEach(i => clearInterval(i));
    this.intervals = [];
    if (this.snoringPlaying) {
        audioManager.stopSFX('snoring');
        this.snoringPlaying = false;
    }
}
    
    finSlap(){
        if(this.finSlapped) return;
        this.finSlapped = true;
        audioManager.playSFX('slap');
        let startingX = this.x;
        let totalSlap = 500;
        let frames = 30;
        let slapDuration = totalSlap /frames;
        let maxSlapToX = 50;
        let movementFrame = 0;
        let directionFactor = this.otherDirection ? -1 : 1;

        this.currentFrame = 0;
        
        let moveInterval = setInterval(() => {
            let progress = movementFrame / frames;
            let slapToX = Math.sin(progress * Math.PI) * maxSlapToX * directionFactor;
            this.x = Math.round(startingX + slapToX);

            movementFrame++;
            if (movementFrame > frames) {
                clearInterval(moveInterval);
                this.x = startingX;
                this.finSlapped = false;
            }
        }, slapDuration);
        this.playAnimationSequence(this.IMAGES_FIN_SLAP, 60);
    }

    bubbleAttack() {
        if (this.bubbleAttacking) return;
        this.bubbleAttacking = true;
        let usePoison = this.poisonBubbleUnlocked && this.world.poisonBar.percentage > 0;
        audioManager.playSFX('bubble');
        if (usePoison) {
            this.playAnimationSequence(this.IMAGES_BUBBLE_POISON_ATTACK, 60);
        } else {
            this.playAnimationSequence(this.IMAGES_BUBBLE_ATTACK, 60);
        }
        setTimeout(() => {
            if (this.world) {
                let type = usePoison ? 'poison' : 'normal';
                let bubble = new ThrowableObject(this.x + 100, this.y + 100, type);
                this.world.throwableObjects.push(bubble);
                if (type === 'poison') {
                    this.world.poisonBar.setPercentage(Math.max(this.world.poisonBar.percentage - 10, 0));
                }
            }
            this.bubbleAttacking = false;
        }, (this.world.poisonBar.percentage > 0 ? this.IMAGES_BUBBLE_POISON_ATTACK.length : this.IMAGES_BUBBLE_ATTACK.length) * 60);
    }

    handleHurtSound() {
        if (!this.isPlayingHurtSound) {
            if (this.lastHitType === "poison") audioManager.playSFX('poisoned');
            else if (this.lastHitType === "electro") audioManager.playSFX('shocked');
            else audioManager.playSFX('poisoned');

            this.isPlayingHurtSound = true;
        }
    }
}