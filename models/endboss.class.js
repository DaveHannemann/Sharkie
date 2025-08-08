class Endboss extends MovableObject {
    energy = 100;
    width = 200;
    height = 400;
    y = -100;
    isDead = false;

    offSet = {
    top : 80,
    bottom : 200,
    left : 15,
    right : 10
    };

    hadFirstContact = false;
    endBossShow = false;
    isAttacking = false;
    attackCD = false;

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

constructor(){
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_ENTRANCE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_ATTACKING)

    this.x = 99999;
    this.speedY = 1.5;      // Bewegungsgeschwindigkeit vertikal
    this.movingDown = true; // Start-Richtung
}

animate() {
    let i = 0;

    setInterval(() => {
        if (!this.endBossShow && world.charakter.x > 2600) {
            this.endBossShow = true;
            this.hadFirstContact = true;
            this.x = 3250;
            let entranceInterval = setInterval(() => {
                if (i < this.IMAGES_ENTRANCE.length) {
                    this.playAnimationOnce(this.IMAGES_ENTRANCE, i);
                    i++;
                } else {
                    clearInterval(entranceInterval);
                    setInterval(() => {
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
    let minY = -180;  // oberer Rand
    let maxY = 150; // unterer Rand

    setInterval(() => {
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
        setInterval(() => {
            if (this.attackCD) return;

            if (Math.random() < 0.5) { // 20% Chance alle 2 Sekunden
                this.attack();
            }
        }, 2000);
    }

attack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    this.attackCD = true;

    let startX = this.x;
    let swimDistance = 300;     // normale Schwimmphase
    let attackDistance = 150;   // Animationsphase
    let attackSpeed = 8;

    // -------- PHASE 1: normales Schwimmen --------
    let swimFrames = [...this.IMAGES_SWIMMING];
    let swimFrameIndex = 0;
    let swimTicks = 0;
    let swimFrameRate = 6; // alle 6 Ticks neues Bild (≈10 FPS bei 60 FPS Bewegung)

    let swimInterval = setInterval(() => {
        this.x -= attackSpeed;

        // Animation nur alle swimFrameRate Ticks wechseln
        if (swimTicks % swimFrameRate === 0) {
            this.img = this.imageCache[swimFrames[swimFrameIndex]];
            swimFrameIndex = (swimFrameIndex + 1) % swimFrames.length;
        }
        swimTicks++;

        if (this.x <= startX - swimDistance) {
            clearInterval(swimInterval);
            startAttackPhase();
        }
    }, 1000 / 60);

    // -------- PHASE 2: Angriff + Animation --------
    const startAttackPhase = () => {
        let attackFrames = [...this.IMAGES_ATTACKING];
        let frameIndex = 0;
        let frameChangeRate = Math.ceil((attackDistance / attackSpeed) / attackFrames.length);
        let ticks = 0;

        let attackInterval = setInterval(() => {
            this.x -= attackSpeed;

            if (ticks % frameChangeRate === 0 && frameIndex < attackFrames.length) {
                this.img = this.imageCache[attackFrames[frameIndex]];
                frameIndex++;
            }
            ticks++;

            if (this.x <= startX - swimDistance - attackDistance) {
                clearInterval(attackInterval);
                this.img = this.imageCache[this.IMAGES_SWIMMING[0]];
                returnToStart();
            }
        }, 1000 / 60);
    };

    // -------- Rückbewegung --------
    const returnToStart = () => {
        let backInterval = setInterval(() => {
            this.x += attackSpeed / 2;
            if (this.x >= startX) {
                this.x = startX;
                clearInterval(backInterval);
                this.isAttacking = false;
                setTimeout(() => this.attackCD = false, 2000);
            }
        }, 1000 / 60);
    };
}

}