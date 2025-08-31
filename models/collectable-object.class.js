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

        this.setupCollectable(type, customWidth, customHeight);
        this.animate(this.animSpeed);
    }

    /**
     * Initializes the final collectable object.
     * @param {'coin'|'poison'|'poison-dark'} type - Collectables
     * @param {number} customWidth - custom width
     * @param {number} customHeight - custom height
     */
    setupCollectable(type, customWidth, customHeight) {
        this.loadImagesByType(type);
        if (customWidth) this.width = customWidth;
        if (customHeight) this.height = customHeight;
    }

    /**
     * Loads images with custom dimension
     * @param {'coin'|'poison'|'poison-dark'} type - Collectables
     * @returns 
     */
    loadImagesByType(type) {
        let typeMap = {
            'coin': { w: 40, h: 40, imgs: this.IMAGES_COINS },
            'poison': { w: 50, h: 60, imgs: this.IMAGES_POISON },
            'poison-dark': { w: 35, h: 45, imgs: this.IMAGES_POISON_DARK }
        };
        let finalImg = typeMap[type];
        if (!finalImg) return;

        this.setDimensions(finalImg.w, finalImg.h);
        this.setupAnimation(finalImg.imgs);
    }

    /**
     * Sets dimensions of collectable item
     * @param {number} w - Width
     * @param {number} h - Height
     */
    setDimensions(w, h) {
        this.width = w;
        this.height = h;
    }

    /**
     * Prepares animation by loading images
     * @param {string[]} images - Array of image paths
     */
    setupAnimation(images) {
        this.loadImage(images[0]);
        this.loadImages(images);
        this.animationImages = images;
    }

    /**
     * Starts animation
     * @param {number} intervalTime - Interval in ms for frame switching
     */
    animate(intervalTime = 200) {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.animationImages);
        }, intervalTime);
    }
}