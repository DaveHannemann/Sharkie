class World {
    charakter = new Character();
    enemies = [
        new Fish(),
        new Fish(),
        new Fish(),
    ];
    backgroundObjects = [
        new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', 720),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D2.png', 720),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', 720),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', 720)
    ];
    light = [
        new Light('../img/3. Background/Legacy/Layers/1. Light/1.png', 0),
        new Light('../img/3. Background/Legacy/Layers/1. Light/2.png', 720)
    ]
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.charakter.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.light);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.charakter)

        this.ctx.translate(-this.camera_x, 0);


        // draw() wird immer wieder aufgerufen
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
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.x = movableObject.x * -1;
        }
        this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
        if (movableObject.otherDirection) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }
}