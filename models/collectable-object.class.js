class CollectableObject extends MovableObject{
   
    
    IMAGES_COINS = [
        '../img/4. Marcadores/1. Coins/1.png',
        '../img/4. Marcadores/1. Coins/2.png',
        '../img/4. Marcadores/1. Coins/3.png',
        '../img/4. Marcadores/1. Coins/4.png'
    ];

    IMAGES_POISON = [
        '../img/4. Marcadores/Posión/Animada/1.png',
        '../img/4. Marcadores/Posión/Animada/2.png',
        '../img/4. Marcadores/Posión/Animada/3.png',
        '../img/4. Marcadores/Posión/Animada/4.png',
        '../img/4. Marcadores/Posión/Animada/5.png',
        '../img/4. Marcadores/Posión/Animada/6.png',
        '../img/4. Marcadores/Posión/Animada/7.png',
        '../img/4. Marcadores/Posión/Animada/8.png'
    ];

    IMAGES_POISON_DARK = [
        'img/4. Marcadores/Posión/Dark - Left.png',
        'img/4. Marcadores/Posión/Dark - Right.png'
    ];

    constructor(type = 'coin', x = 500, y = 300, animSpeed = 200, customWidth = null, customHeight = null, value = 10) {
        super();
        this.x = x;
        this.y = y;
        this.animSpeed = animSpeed;
        this.value = value;
        this.loadImagesByType(type);

        if (customWidth) this.width = customWidth;
        if (customHeight) this.height = customHeight;
        this.animate(this.animSpeed);
    }

    loadImagesByType(type) {
        if (type === 'coin') {
            this.width = 40;
            this.height = 40;
            this.loadImage(this.IMAGES_COINS[0]);
            this.loadImages(this.IMAGES_COINS);
            this.animationImages = this.IMAGES_COINS;
        } else if (type === 'poison') {
            this.width = 50;
            this.height = 60;
            this.loadImage(this.IMAGES_POISON[0]);
            this.loadImages(this.IMAGES_POISON);
            this.animationImages = this.IMAGES_POISON;
        } else if (type === 'poison-dark') {
            this.width = 35;
            this.height = 45;
            this.loadImage(this.IMAGES_POISON_DARK[0]);
            this.loadImages(this.IMAGES_POISON_DARK);
            this.animationImages = this.IMAGES_POISON_DARK;
        }
    }

    animate(intervalTime = 200) {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.animationImages);
        }, intervalTime);
    }
}