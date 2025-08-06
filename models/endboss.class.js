class Endboss extends MovableObject {

    width = 200;
    height = 400;
    y = -100;

    offSet = {
    top : 80,
    bottom : 200,
    left : 15,
    right : 10
    };

    hadFirstContact = false;

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

constructor(){
    super().loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_ENTRANCE);
    this.loadImages(this.IMAGES_SWIMMING);

    this.x = 2400;
}

    animate() {
        let i = 0;
        setInterval(() => {
            if (i < 9) {
                this.playAnimationOnce(this.IMAGES_ENTRANCE, i)  
            } else {
        this.playAnimation(this.IMAGES_SWIMMING)
            }

            i++;

            if(world.charakter.x > 1800 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 175);
    }

}