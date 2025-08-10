class World {
    charakter = new Character();
    level = createLevel1();
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


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
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
        this.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
            this.endboss = enemy;
        }
        });
    }

    restartLevel() {
        clearInterval(this.gameInterval);
        this.charakter = new Character();
        this.charakter.world = this;
        this.level = createLevel1();
        this.throwableObjects = [];
        this.gameOverTriggered = false;
        this.endScreen = null;
        this.setWorld();
        this.healthBar.setPercentage(this.charakter.energy);
        this.coinBar.setPercentage(0);
        this.poisonBar.setPercentage(0);
        if (this.endboss) {
            this.endbossHealthBar.setPercentage(this.endboss.energy);
        }
        this.start();
    }

    run() {
        if(this.gameInterval) clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => {
            this.collisionManager.update();
            this.checkThrowObjects();
            this.throwableObjects.forEach(obj => obj.update());
            this.level.enemies = this.level.enemies.filter(enemy => !enemy.readyToRemove);
            if (this.endboss) {
            this.endbossHealthBar.setPercentage(this.endboss.energy);
                if (this.endboss.energy <= 0 && !this.gameOverTriggered) {
                    this.gameOverTriggered = true;
                    setTimeout(() => {
                        this.endScreen = new EndScreen("win", () => {
                            this.restartLevel();
                        });
                    }, 3000);
                }
            }
            if (this.charakter.isDead() && !this.gameOverTriggered) {
                this.gameOverTriggered = true;
                setTimeout(() => {
                    this.endScreen = new EndScreen("lose", () => {
                        this.restartLevel();
                    });
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
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        if (this.endboss && this.endboss.endBossShow) {
        this.drawFlippedHealthBar(this.endbossHealthBar);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.light);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.charakter)
        this.ctx.translate(-this.camera_x, 0);
        if (this.endScreen) {
            this.endScreen.draw(this.ctx);
        }

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
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
            if(enemy.animate) {
                enemy.animate();
            }
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
}