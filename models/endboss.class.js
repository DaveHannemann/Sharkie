class Endboss extends MovableObject {
    world;
    energy = 100;
    width = 200;
    height = 400;
    y = -100;
    isDead = false;

    offSet = {
    top : 80,
    bottom : 150,
    left : 15,
    right : 10
    };

    hadFirstContact = false;
    endBossShow = false;
    isAttacking = false;
    attackCD = false;
    isDeadAnimationPlaying = false;

    mainInterval;
    entranceInterval;
    swimmingInterval;
    movementInterval;
    attackInterval;
    swimAttackInterval;
    attackAttackInterval;
    returnAttackInterval;

IMAGES_ENTRANCE = [
    '../img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
    '../img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
]

IMAGES_SWIMMING = [
    './img/2.Enemy/3 Final Enemy/2.floating/1.png',
    './img/2.Enemy/3 Final Enemy/2.floating/2.png',
    './img/2.Enemy/3 Final Enemy/2.floating/3.png',
    './img/2.Enemy/3 Final Enemy/2.floating/4.png',
    './img/2.Enemy/3 Final Enemy/2.floating/5.png',
    './img/2.Enemy/3 Final Enemy/2.floating/6.png',
    './img/2.Enemy/3 Final Enemy/2.floating/7.png',
    './img/2.Enemy/3 Final Enemy/2.floating/8.png',
    './img/2.Enemy/3 Final Enemy/2.floating/9.png',
    './img/2.Enemy/3 Final Enemy/2.floating/10.png',
    './img/2.Enemy/3 Final Enemy/2.floating/11.png',
    './img/2.Enemy/3 Final Enemy/2.floating/12.png',
    './img/2.Enemy/3 Final Enemy/2.floating/13.png'
];

IMAGES_ATTACKING = [
    '../img/2.Enemy/3 Final Enemy/Attack/1.png',
    '../img/2.Enemy/3 Final Enemy/Attack/2.png',
    '../img/2.Enemy/3 Final Enemy/Attack/3.png',
    '../img/2.Enemy/3 Final Enemy/Attack/4.png',
    '../img/2.Enemy/3 Final Enemy/Attack/5.png',
    '../img/2.Enemy/3 Final Enemy/Attack/6.png'
];

IMAGES_HURT = [
    '../img/2.Enemy/3 Final Enemy/Hurt/1.png',
    '../img/2.Enemy/3 Final Enemy/Hurt/2.png',
    '../img/2.Enemy/3 Final Enemy/Hurt/3.png',
    '../img/2.Enemy/3 Final Enemy/Hurt/4.png'
];

IMAGES_DEAD = [
    '../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
    '../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
    '../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
    '../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
    '../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
    '../img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
];

constructor(world){
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_ENTRANCE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    if (world) {
        this.world = world;
    }
    this.x = 99999;
    this.speedY = 1.5;
    this.movingDown = true;
}

    animate() {
        if (this.mainInterval) return;
        let i = 0;

        this.mainInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(this.mainInterval);
                audioManager.stopMusic('endboss');
                return;
            }
            if (!this.endBossShow && this.world && this.world.charakter && this.world.charakter.x > 2600) {
                this.endBossShow = true;
                this.hadFirstContact = true;
                this.x = 3250;
                audioManager.stopMusic('main');
                audioManager.playMusic('endboss');

                this.entranceInterval = setInterval(() => {
                    if (i < this.IMAGES_ENTRANCE.length) {
                        this.playAnimationOnce(this.IMAGES_ENTRANCE, i);
                        i++;
                    } else {
                        clearInterval(this.entranceInterval);

                        this.swimmingInterval = setInterval(() => {
                            if (this.isDead) {
                                clearInterval(this.swimmingInterval);
                                return;
                            }
                            this.playAnimation(this.IMAGES_SWIMMING);
                        }, 175);

                        this.startMovement();
                        this.startRandomAttacks();
                    }
                }, 175);
            }
        }, 1000 / 60);
    }

    startMovement() {
        let minY = -180;
        let maxY = 150;

        this.movementInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(this.movementInterval);
                return;
            }
            if (this.isAttacking) return;

            if (this.movingDown) {
                this.y += this.speedY;
                if (this.y > maxY) this.movingDown = false;
            } else {
                this.y -= this.speedY;
                if (this.y < minY) this.movingDown = true;
            }
        }, 1000 / 60);
    }

startRandomAttacks() {
    let attackChance;
    let attackIntervalTime;
    switch(this.world.currentLevelNumber) {
        case 1: 
            attackChance = 0.5;
            attackIntervalTime = 2000;
            break;
        case 2:
            attackChance = 0.65;
            attackIntervalTime = 1700;
            break;
        case 3:
            attackChance = 0.8;
            attackIntervalTime = 1400;
            break;
        default:
            attackChance = 0.5;
            attackIntervalTime = 2000;
    }
    this.attackInterval = setInterval(() => {
        if (this.isDead) {
            clearInterval(this.attackInterval);
            return;
        }
        if (this.attackCD) return;

        if (Math.random() < attackChance) {
            this.attack();
        }
    }, attackIntervalTime);
}

attack() {
    if (this.isDead) return; 
    if (this.isAttacking) return;
    this.isAttacking = true;
    this.attackCD = true;

    let startX = this.x;
    let swimDistance = 300;
    let attackDistance = 150; 
    let attackSpeed = 8;
    let swimFrames = [...this.IMAGES_SWIMMING];
    let swimFrameIndex = 0;
    let swimTicks = 0;
    let swimFrameRate = 6;

    this.swimAttackInterval = setInterval(() => {
        if (this.isDead) {
            clearInterval(this.swimAttackInterval);
            return;
        }
        this.x -= attackSpeed;
        if (swimTicks % swimFrameRate === 0) {
            this.img = this.imageCache[swimFrames[swimFrameIndex]];
            swimFrameIndex = (swimFrameIndex + 1) % swimFrames.length;
        }
        swimTicks++;

        if (this.x <= startX - swimDistance) {
            clearInterval(this.swimAttackInterval);
            startAttackPhase();
        }
    }, 1000 / 60);
    const startAttackPhase = () => {
        let attackFrames = [...this.IMAGES_ATTACKING];
        let frameIndex = 0;
        let frameChangeRate = Math.ceil((attackDistance / attackSpeed) / attackFrames.length);
        let ticks = 0;

        this.attackAttackInterval = setInterval(() => {
            this.x -= attackSpeed;

            if (ticks % frameChangeRate === 0 && frameIndex < attackFrames.length) {
                this.img = this.imageCache[attackFrames[frameIndex]];
                if (frameIndex === 0) {
                audioManager.playSFX('boss_attack');
                }
                frameIndex++;
            }
            ticks++;

            if (this.x <= startX - swimDistance - attackDistance) {
                clearInterval(this.attackAttackInterval);
                this.img = this.imageCache[this.IMAGES_SWIMMING[0]];
                returnToStart();
            }
        }, 1000 / 60);
    };
    const returnToStart = () => {
        this.returnAttackInterval = setInterval(() => {
            this.x += attackSpeed / 2;
            if (this.x >= startX) {
                this.x = startX;
                clearInterval(this.returnAttackInterval);
                this.isAttacking = false;
                setTimeout(() => this.attackCD = false, 2000);
            }
        }, 1000 / 60);
    };
}

takeDamage(amount) {
    if (this.isAttacking || this.isHurtAnimationPlaying || this.isDeadAnimationPlaying) return;

    this.energy -= amount;
    if (this.energy < 0) {
        this.energy = 0;
        this.die();
    } else {
        this.isHurtAnimationPlaying = true;
        this.pauseAllActions();

        this.playAnimationSequence(this.IMAGES_HURT, 150);
        audioManager.playSFX('poisoned');

        setTimeout(() => {
            this.isHurtAnimationPlaying = false;
            this.resumeAllActions();
        }, this.IMAGES_HURT.length * 150 + 500);
    }
}

pauseAllActions() {
    this.wasAttackingBeforePause = this.isAttacking;
    this.isAttacking = false;
    this.attackCD = true;
    this.speedYBackup = this.speedY;
    this.speedY = 0;
    this.pausedX = this.x;
}

resumeAllActions() {
    this.x = this.pausedX || this.x;
    this.speedY = this.speedYBackup || 1.5;
    this.attackCD = false;
    if (this.wasAttackingBeforePause) {
        this.attack();
    }
}

die() {
    this.isDead = true;
    this.isDeadAnimationPlaying = true;
    this.pauseAllActions();
    clearInterval(this.mainInterval);
    clearInterval(this.entranceInterval);
    clearInterval(this.swimmingInterval);
    clearInterval(this.movementInterval);
    clearInterval(this.attackInterval);
    this.playAnimationSequence(this.IMAGES_DEAD, 150);
    audioManager.playSFX('boss_dead');
    setTimeout(() => {
        this.isDeadAnimationPlaying = false;
        this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
    }, this.IMAGES_DEAD.length * 150);
}

stopAllIntervals() {
    clearInterval(this.mainInterval);
    clearInterval(this.entranceInterval);
    clearInterval(this.swimmingInterval);
    clearInterval(this.movementInterval);
    clearInterval(this.attackInterval);
    clearInterval(this.swimAttackInterval);
    clearInterval(this.attackAttackInterval);
    clearInterval(this.returnAttackInterval);
}

reset() {
    this.stopAllIntervals();
    this.mainInterval = null;
    this.energy = 100;
    this.isDead = false;
    this.isDeadAnimationPlaying = false;
    this.isHurtAnimationPlaying = false;
    this.isAttacking = false;
    this.attackCD = false;
    this.endBossShow = false;
    this.hadFirstContact = false;
    this.x = 99999;
    this.y = -100;
    this.speedY = 1.5;
    this.movingDown = true;
    this.img = this.imageCache[this.IMAGES_SWIMMING[0]];
}

}