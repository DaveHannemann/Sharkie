class StatusBar extends DrawableObject {

x = -40;
y = -5;
height = 40;
width = 150;

IMAGES_HEALTH_BAR = [
    '../img/4. Marcadores/Purple/0_ .png',
    '../img/4. Marcadores/Purple/20__1.png',
    '../img/4. Marcadores/Purple/40_ .png',
    '../img/4. Marcadores/Purple/60_ .png',
    '../img/4. Marcadores/Purple/80_ .png',
    '../img/4. Marcadores/Purple/100_ .png',
]

IMAGES_COIN_BAR = [
    '../img/4. Marcadores/Purple/0_ _1.png',
    '../img/4. Marcadores/Purple/20_ .png',
    '../img/4. Marcadores/Purple/40_ _1.png',
    '../img/4. Marcadores/Purple/60_ _1.png',
    '../img/4. Marcadores/Purple/80_ _1.png',
    '../img/4. Marcadores/Purple/100_ _1.png',
]

IMAGES_POISON_BAR =[
    '../img/4. Marcadores/Purple/0_.png',
    '../img/4. Marcadores/Purple/20_.png',
    '../img/4. Marcadores/Purple/40_.png',
    '../img/4. Marcadores/Purple/60_.png',
    '../img/4. Marcadores/Purple/80_.png',
    '../img/4. Marcadores/Purple/100_.png'
    ]

percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.setPercentage(100);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let imgPath = this.IMAGES_HEALTH_BAR[this.statusbarImageIndex()];
        this.img = this.imageCache[imgPath];
    }

    statusbarImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}