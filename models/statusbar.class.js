class StatusBar extends DrawableObject {

height = 40;
width = 150;
percentage = 100;

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
    '../img/4. Marcadores/Purple/100__1.png',
]

IMAGES_POISON_BAR =[
    '../img/4. Marcadores/Purple/0_.png',
    '../img/4. Marcadores/Purple/20_.png',
    '../img/4. Marcadores/Purple/40_.png',
    '../img/4. Marcadores/Purple/60_.png',
    '../img/4. Marcadores/Purple/80_.png',
    '../img/4. Marcadores/Purple/100_.png'
    ]

    constructor(type = 'health', x = 10, y = -5, startPercentage = null) {
        super();
        this.x = x;
        this.y = y;
        this.setStatusBarType(type);

        if (startPercentage != null) {
            this.setPercentage(startPercentage);
        } else if (type === 'health') {
            this.setPercentage(100);
        } else {
            this.setPercentage(0);
        }
    }

    setStatusBarType(type) {
        this.type = type;

        if (type === 'health'){
            this.images = this.IMAGES_HEALTH_BAR;
        } else if (type === 'coin') {
            this.images = this.IMAGES_COIN_BAR;
        } else if (type === 'poison') {
            this.images = this.IMAGES_POISON_BAR;
        }
        this.loadImages(this.images);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let index = this.statusbarImageIndex();
        let imgPath = this.images[index];
        this.img = this.imageCache[imgPath];
    }

    statusbarImageIndex() {
        if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}