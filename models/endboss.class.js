class Endboss extends MovableObject {

    width = 200;
    height = 400;
    y = -100;

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

constructor(){
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);

    this.x = 2650;
    this.animate();
}

    animate() {
        setInterval(() => {
        this.playAnimation(this.IMAGES_SWIMMING)  
        }, 175);
    }

}