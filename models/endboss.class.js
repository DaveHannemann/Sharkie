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

    intervals = {};

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

/**
 * Starts animation for endboss.
 * @returns {void}
 */
animate() {
    if (this.intervals.main) return;
    this.intervals.main = setInterval(() => this.handleMainLoop(), 1000 / 60);
}

/**
 * Handles main loop logic and condition to meet endboss.
 * @returns {void}
 */
handleMainLoop() {
    if (this.isDead) return this.stopAllIntervals();
    if (!this.endBossShow && this.world?.charakter?.x > 2600) this.triggerEntrance();
}

/**
 * Triggers entrance animation and music for endboss.
 */
triggerEntrance() {
    this.endBossShow = true;
    this.hadFirstContact = true;
    this.x = 3250;
    audioManager.stopMusic('main');
    audioManager.playMusic('endboss');
    this.playEntranceAnimation();
}

/**
 * Plays entrance animation.
 */
playEntranceAnimation() {
    let i = 0;
    this.intervals.entrance = setInterval(() => {
        if (i < this.IMAGES_ENTRANCE.length) this.playAnimationOnce(this.IMAGES_ENTRANCE, i++);
        else {
            clearInterval(this.intervals.entrance);
            this.startSwimming();
            this.startMovement();
            this.startRandomAttacks();
        }
    }, 175);
}

/**
 * Plays swimming animation.
 */
startSwimming() {
    this.intervals.swimming = setInterval(() => {
        if (this.isDead) return clearInterval(this.intervals.swimming);
        this.playAnimation(this.IMAGES_SWIMMING);
    }, 175);
}

/**
 * Starts movement for endboss.
 */
startMovement() {
    const [minY, maxY] = [-180, 150];
    this.intervals.movement = setInterval(() => {
        if (this.isDead) return clearInterval(this.intervals.movement);
        if (this.isAttacking) return;
        this.movingDown ? this.moveDown(maxY) : this.moveUp(minY);
    }, 1000 / 60);
}

/**
 * Moves the endboss down.
 * @param {number} maxY - Max Y position
 */
moveDown(maxY) {
    this.y += this.speedY;
    if (this.y > maxY) this.movingDown = false;
}

/**
 * Moves the endboss up.
 * @param {number} minY - Min Y position 
 */
moveUp(minY) {
    this.y -= this.speedY;
    if (this.y < minY) this.movingDown = true;
}

/**
 * Starts random attacks.
 */
startRandomAttacks() {
    const { attackChance, attackIntervalTime } = this.getAttackSettings();
    this.intervals.attack = setInterval(() => {
        if (this.isDead) return clearInterval(this.intervals.attack);
        if (!this.attackCD && Math.random() < attackChance) this.attack();
    }, attackIntervalTime);
}

/**
 * Attack probability based on level.
 * @returns {{attackChance: number, attackIntervalTime: number}}
 */
getAttackSettings() {
    switch (this.world.currentLevelNumber) {
        case 2: return { attackChance: 0.55, attackIntervalTime: 1800 };
        case 3: return { attackChance: 0.6, attackIntervalTime: 1600 };
        default: return { attackChance: 0.5, attackIntervalTime: 2000 };
    }
}

/**
 * Initiates attack sequence.
 * @returns {void}
 */
attack() {
    if (this.isDead || this.isAttacking) return;
    this.isAttacking = true;
    this.attackCD = true;
    const startX = this.x;
    const swimDistance = 300, attackDistance = 150, attackSpeed = 8;
    this.performSwimPhase(startX, swimDistance, attackDistance, attackSpeed);
}

/**
 * Handles swim phase during attack
 * @param {number} startX - X position start
 * @param {number} swimDistance - swim distance
 * @param {number} attackDistance - attack distance
 * @param {number} speed - movement speed
 */
performSwimPhase(startX, swimDistance, attackDistance, speed) {
    let i = 0, ticks = 0, frames = [...this.IMAGES_SWIMMING];
    this.intervals.swimAttack = setInterval(() => {
        if (this.isDead) return clearInterval(this.intervals.swimAttack);
        this.x -= speed;
        if (ticks % 6 === 0) this.img = this.imageCache[frames[i]], i = (i + 1) % frames.length;
        ticks++;
        if (this.x <= startX - swimDistance) clearInterval(this.intervals.swimAttack), this.performAttackPhase(startX, attackDistance, speed);
    }, 1000 / 60);
}

/**
 * Handles attack phase
 * @param {number} startX - X position start
 * @param {number} distance - attack distance
 * @param {number} speed - movement speed
 */
performAttackPhase(startX, attackDistance, speed) {
    let i = 0, ticks = 0, frames = [...this.IMAGES_ATTACKING];
    const frameRate = Math.ceil(attackDistance / speed / frames.length);
    this.intervals.attackAttack = setInterval(() => {
        this.x -= speed;
        if (ticks % frameRate === 0 && i < frames.length) { this.img = this.imageCache[frames[i]]; if (i === 0) audioManager.playSFX('boss_attack'); i++; }
        ticks++;
        if (this.x <= startX - 300 - attackDistance) clearInterval(this.intervals.attackAttack), this.returnToStart(startX, speed);
    }, 1000 / 60);
}

/**
 * Returns endboss to start position after attack phase
 * @param {number} startX - X position start
 * @param {number} speed - movement speed
 */
returnToStart(startX, speed) {
    this.intervals.returnAttack = setInterval(() => {
        this.x += speed / 2;
        if (this.x >= startX) this.x = startX, clearInterval(this.intervals.returnAttack), this.isAttacking = false, setTimeout(() => this.attackCD = false, 2000);
    }, 1000 / 60);
}

/**
 * Applies damage to the boss.
 * @param {number} amount - damage taken 
 * @returns {void}
 */
takeDamage(amount) {
    if (this.isAttacking || this.isHurtAnimationPlaying || this.isDeadAnimationPlaying) return;
    this.energy -= amount;
    if (this.energy <= 0) return this.die();
    this.playHurtSequence();
}

/**
 * Plays endboss hurt animation
 */
playHurtSequence() {
    this.isHurtAnimationPlaying = true;
    this.pauseAllActions();
    this.playAnimationSequence(this.IMAGES_HURT, 150);
    audioManager.playSFX('poisoned');
    setTimeout(() => { this.isHurtAnimationPlaying = false; this.resumeAllActions(); }, this.IMAGES_HURT.length * 150 + 500);
}

/**
 * Plays endboss death animation and stops other actions
 */
die() {
    this.isDead = true;
    this.isDeadAnimationPlaying = true;
    this.pauseAllActions();
    this.stopAllIntervals();
    this.playAnimationSequence(this.IMAGES_DEAD, 150);
    audioManager.playSFX('boss_dead');
    setTimeout(() => { this.isDeadAnimationPlaying = false; this.img = this.imageCache[this.IMAGES_DEAD.at(-1)]; }, this.IMAGES_DEAD.length * 150);
}

/**
 * Pauses all actions
 */
pauseAllActions() {
    this.wasAttackingBeforePause = this.isAttacking;
    this.isAttacking = false;
    this.attackCD = true;
    this.speedYBackup = this.speedY;
    this.speedY = 0;
    this.pausedX = this.x;
}

/**
 * Resumes all actions previously paused
 */
resumeAllActions() {
    this.x = this.pausedX || this.x;
    this.speedY = this.speedYBackup || 1.5;
    this.attackCD = false;
    if (this.wasAttackingBeforePause) this.attack();
}

/**
 * Stops everything the endboss is doing
 */
stopAllIntervals() {
    Object.values(this.intervals).forEach(clearInterval);
    this.intervals = {};
}

/**
 * Resets for next level or retry
 */
reset() {
    this.stopAllIntervals();
    this.resetStatus();
    this.resetPosition();
    this.resetImage();
    this.attackCD = false;
}

/**
 * Resets flags and energy
 */
resetStatus() {
    this.energy = 100;
    this.isDead = false;
    this.isDeadAnimationPlaying = false;
    this.isHurtAnimationPlaying = false;
    this.isAttacking = false;
    this.endBossShow = false;
    this.hadFirstContact = false;
}

/**
 * Resets position and movement
 */
resetPosition() {
    this.x = 99999;
    this.y = -100;
    this.speedY = 1.5;
    this.movingDown = true;
}

/**
 * Resets image
 */
resetImage() {
    this.img = this.imageCache[this.IMAGES_SWIMMING[0]];
}

}