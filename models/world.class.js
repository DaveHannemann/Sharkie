class World {
    charakter = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar('health', 10 , 40);
    coinBar = new StatusBar('coin', 10 , 70);
    poisonBar = new StatusBar('poison', 10 , 10);
    throwableObjects = [];

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
    }

    start() {
        this.run();
        this.draw();
        this.startEnemiesAnimation();
        this.startCollectableAnimation(); 
    }

    setWorld() {
        this.charakter.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects(){
        if(this.keyboard.D){
            let bubble = new ThrowableObject(this.charakter.x + 100, this.charakter.y + 100)
            this.throwableObjects.push(bubble);
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
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.light);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.charakter)
        this.ctx.translate(-this.camera_x, 0);

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
}