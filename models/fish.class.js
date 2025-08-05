class Fish extends MovableObject {

    x = 650;
    width = 50;
    height = 25;

    offSet = {
    top : 5,
    bottom : 0,
    left : 0,
    right : 0
    };

    IMAGES_SWIMMING = [
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ]

    constructor(){
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);

        this.y = 0 + Math.random() * 480;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        setInterval(() =>{
        this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
        this.playAnimation(this.IMAGES_SWIMMING)  
        }, 175);
    }

}