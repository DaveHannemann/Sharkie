class Character extends MovableObject {
    x = 0;
    y = 100;
    width = 150;
    height = 150;
    speed = 5;

    offSet = {
    top : 35,
    bottom : 70,
    left : 25,
    right : 40
    };

    IMAGES_SWIMMING = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_FIN_SLAP = [
        '../img/1.Sharkie/4.Attack/Fin slap/1.png',
        '../img/1.Sharkie/4.Attack/Fin slap/2.png',
        '../img/1.Sharkie/4.Attack/Fin slap/3.png',
        '../img/1.Sharkie/4.Attack/Fin slap/4.png',
        '../img/1.Sharkie/4.Attack/Fin slap/5.png',
        '../img/1.Sharkie/4.Attack/Fin slap/6.png',
        '../img/1.Sharkie/4.Attack/Fin slap/7.png',
        '../img/1.Sharkie/4.Attack/Fin slap/8.png',
    ]
    world;

    constructor(){
        super().loadImage('../img/1.Sharkie/3.Swim/3.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_FIN_SLAP);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
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
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 175);

        setInterval(() => {
        if (this.world.keyboard.SPACE) {
            this.playAnimation(this.IMAGES_FIN_SLAP);
            }
        }, 1000 / 15);
    }
    
    jump(){

    }
}