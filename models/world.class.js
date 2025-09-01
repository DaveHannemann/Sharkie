class World {
    charakter = new Character();
    level = createLevel1();
    currentLevelNumber = 1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar('health', 10 , 40);
    coinBar = new StatusBar('coin', 10 , 70);
    poisonBar = new StatusBar('poison', 10 , 10);
    throwableObjects = [];
    collisionManager;
    lastBubbleSpit = 0;
    endbossHealthBar = new StatusBar('health', 0, 0);
    gameOverTriggered = false;
    endScreen = null;
    animationFrameId = null;


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.hud = new HUD();
        this.collisionManager = new CollisionManager(this);
    }

    start() {
        this.run();
        this.draw();
        this.startEnemiesAnimation();
        this.startCollectableAnimation(); 
    }

setWorld() {
    this.charakter.world = this;
    this.endboss = this.level.enemies.find(e => e instanceof Endboss) || null;
    if (this.endboss) this.endboss.world = this;
}

restartLevel(levelNumber = this.currentLevelNumber) {
    this.stopDrawing();
    this.stopEnemiesAnimation();
    clearInterval(this.gameInterval);
    if (this.level && this.level.enemies) {
        this.level.enemies.forEach(enemy => enemy.stopAllIntervals && enemy.stopAllIntervals());
    }
    if (this.endboss) this.endboss.stopAllIntervals();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.camera_x = 0;
    this.throwableObjects = [];
    this.gameOverTriggered = false;
    this.endScreen = null;
    if (this.level) {
        this.level.backgroundObjects = [];
        this.level.collectables = [];
        this.level.enemies = [];
        this.level.light = [];
    }
    this.currentLevelNumber = levelNumber;
    this.level = this.createLevel(levelNumber);
    this.endboss = this.level.enemies.find(e => e instanceof Endboss) || null;
    if (this.endboss) this.endboss.world = this;
    if(this.charakter) this.charakter.stopAllIntervals();
    this.charakter = new Character();
    this.charakter.world = this;
    this.healthBar.setPercentage(this.charakter.energy);
    this.coinBar.setPercentage(0);
    this.poisonBar.setPercentage(0);
    if (this.endboss) this.endbossHealthBar.setPercentage(this.endboss.energy);
    this.setWorld();
    this.start();
    audioManager.playMusic('main');
}

    createLevel(levelNumber) {
    switch(levelNumber) {
        case 1: return createLevel1();
        case 2: return createLevel2();
        case 3: return createLevel3(); 
        default: return createLevel1();
    }
}

    updateSlapButtonVisibility() {
        const btnSlap = document.getElementById('btn-attack');
        if (this.endboss && this.endboss.endBossShow) {
            btnSlap.style.display = 'none';
        } 
    }

    run() {
        if(this.gameInterval) clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => {
            this.collisionManager.update();
            this.checkThrowObjects();
            this.throwableObjects.forEach(obj => obj.update());
            this.level.enemies = this.level.enemies.filter(enemy => !enemy.readyToRemove);
            this.updateSlapButtonVisibility();
            if (this.endboss) {
            this.endbossHealthBar.setPercentage(this.endboss.energy);
                if (this.endboss.energy <= 0 && !this.gameOverTriggered) {
                    this.gameOverTriggered = true;
                    hideMobileControls();
                    setTimeout(() => {
                        audioManager.stopAll();
                        audioManager.playSFX('win');
                    }, 2900);
                    setTimeout(() => {
                        this.endScreen = new EndScreen("win", 
                            () => { this.restartLevel(this.currentLevelNumber);
                                    if ('ontouchstart' in window) showMobileControls();
                             }, 
                            () => {
                                this.endScreen = null;
                                this.cleanup();
                                world = null;
                                startScreen = new StartScreen();
                                hideMobileControls();
                                drawStartScreenLoop();
                                audioManager.stopAll();
                                audioManager.playMusic('start');
                            },
                            this.currentLevelNumber < 3 
                                ? () => {                                                   
                                    this.restartLevel(this.currentLevelNumber + 1);
                                    if ('ontouchstart' in window) showMobileControls();
                                }
                                : null
                        );
                    }, 3000);
                }
            }
            if (this.charakter.isDead() && !this.gameOverTriggered) {
                this.gameOverTriggered = true;
                hideMobileControls();
                setTimeout(() => {
                audioManager.stopAll();
                audioManager.playSFX('lose');
                }, 2900);
                setTimeout(() => {
                    this.endScreen = new EndScreen("lose", 
                        () => { this.restartLevel(); 
                                if ('ontouchstart' in window) showMobileControls();
                        }, 
                        () => {
                            this.endScreen = null;
                            this.cleanup();
                            world = null;
                            startScreen = new StartScreen();
                            hideMobileControls();
                            drawStartScreenLoop();
                            audioManager.stopAll();
                            audioManager.playMusic('start');
                        }
                    );
                }, 3000);
            }
        }, 1000 / 60);
    }

    checkThrowObjects(){
        let now = Date.now();
        if(this.keyboard.D && !this.charakter.isDead() && now - this.lastBubbleSpit >= 900){
            this.charakter.bubbleAttack();
            this.lastBubbleSpit = now + this.charakter.IMAGES_BUBBLE_ATTACK.length * 60; 
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.charakter.isColliding(enemy)){
                this.charakter.hit();
                this.healthBar.setPercentage(this.charakter.energy);
                console.log('lost HP', this.charakter.energy);
            }
        });
    }

draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.light);
    this.addObjectsToMap(this.level.enemies.filter(e => !(e instanceof Endboss)));
    if (this.endboss && this.endboss.endBossShow) this.addToMap(this.endboss);
    this.addObjectsToMap(this.level.collectables);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.charakter);
    this.ctx.restore();
    this.addToMap(this.healthBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.poisonBar);
    this.hud.draw(this.ctx);
    if (this.endboss && this.endboss.endBossShow) this.drawFlippedHealthBar(this.endbossHealthBar);
    if (this.endScreen) this.endScreen.draw(this.ctx);
    this.animationFrameId = requestAnimationFrame(() => this.draw());
}

    stopDrawing() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            if (obj instanceof Endboss && !obj.endBossShow) return;
            this.addToMap(obj);
        });
    }

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawFrame(this.ctx);

        if (movableObject.otherDirection) {
            this.flipImageBack(movableObject);
        }
    }


    flipImage(movableObject){
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject){
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

startEnemiesAnimation() {
    this.level.enemies.forEach(enemy => {
        if(enemy.animate) enemy.animate();
    });
    if (this.endboss) this.endboss.animate();
}
    stopEnemiesAnimation() {
    this.level.enemies.forEach(enemy => {
        if(enemy.stopAllIntervals) enemy.stopAllIntervals();
    });
}

    startCollectableAnimation() {
        this.level.collectables.forEach(obj => {
            if(obj.animate) {
                obj.animate();
            }
        });
    }

    drawFlippedHealthBar(healthBar) {
        this.ctx.save();
        let xPos = this.canvas.width - healthBar.width - 20;
        let yPos = healthBar.y;
        this.ctx.translate(xPos + healthBar.width, yPos);
        this.ctx.scale(-1, 1);
        healthBar.draw(this.ctx);
        this.ctx.restore();
    }

    cleanup() {
    this.stopDrawing();
    clearInterval(this.gameInterval);
    if (this.endboss) {
        this.endboss.stopAllIntervals();
    }
    this.stopEnemiesAnimation();
}
}