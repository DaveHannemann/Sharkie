class World {
    charakter = new Character();
    enemies = [
        new Fish(),
        new Fish(),
        new Fish(),
    ];
    water = [
        new Water()
    ];
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }



    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.charakter.img, this.charakter.x, this.charakter.y, this.charakter.width, this.charakter.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        this.water.forEach(w => {
            this.ctx.drawImage(w.img, w.x, w.y, w.width, w.height);
        });

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }
}