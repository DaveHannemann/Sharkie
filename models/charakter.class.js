class Character extends MovableObject {
    x = 0;
    y = 100;
    width = 150;
    height = 150;
    speed = 5;
    energy = 100;
    lastKeyPressed = new Date().getTime();
    finSlapped = false;
    spacePressedLog = false;

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

    IMAGES_HURT = [
        '../img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
    ];

    IMAGES_DEAD = [
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
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_BUBBLE_ATTACK);
        this.loadImages(this.IMAGES_BUBBLE_POISON_ATTACK);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT) {
                if (this.x > 0 && this.x < this.world.level.level_end_x) {
                this.x -= this.speed;
                this.otherDirection = true;
                }
            }
            if (this.world.keyboard.UP && this.y > this.world.level.level_end_top) {
                this.y -= this.speed;
            }
            if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_bottom) {
                this.y += this.speed;
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.lastKeyPressed = new Date().getTime();
                this.playAnimation(this.IMAGES_SWIMMING);
            } else {
                let noKeyPressed = new Date().getTime() - this.lastKeyPressed;
                if(noKeyPressed > 8000) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                } else {
                this.playAnimation(this.IMAGES_IDLE);
                }
            }        
        }, 175);

        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.spacePressedLog) {
                if (this.x < this.world.level.level_end_x) {
                    this.finSlap();
                }
            }
            this.spacePressedLog = this.world.keyboard.SPACE;
        }, 1000 / 60);
    }
    
    finSlap(){
        if(this.finSlapped) return;
        this.finSlapped = true;

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

        let animationFrames = this.IMAGES_FIN_SLAP.length;
        let animationIntervalTime = totalSlap / animationFrames;
        let animationFrame = 0;
        let animationInterval = setInterval(() => {
            this.playAnimationOnce(this.IMAGES_FIN_SLAP, animationFrame);
            animationFrame++;
            if (animationFrame >= this.IMAGES_FIN_SLAP.length) {
                clearInterval(animationInterval);
            }
        }, animationIntervalTime);
    }
}