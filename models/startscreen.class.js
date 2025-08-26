class StartScreen extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    buttonInterval;
    backgroundObjects = [];
    statusBars = [];
    animatedButtons = [];
    collectables = [];
    onlyStartScreenObjects = [];
    buttonsActive = true;

    constructor(){
        super();
    this.backgroundObjects = [
        new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/1. Light/1.png', 0)
        ]

        this.backgroundObjects.forEach(obj => this.loadImage(obj.img.src));

        this.statusBars = [
        new StatusBar('health', 10 , 40, 100),
        new StatusBar('coin', 10 , 70, 100),
        new StatusBar('poison', 10 , 10, 100),
        ];

        this.collectables = [
            new CollectableObject('coin', 230, 325, 800),
            new CollectableObject('coin', 270, 270, 800),
            new CollectableObject('coin', 320, 220, 800),
            new CollectableObject('coin', 380, 220, 800),
            new CollectableObject('coin', 430, 270, 800),
            new CollectableObject('coin', 470, 325, 800),
            new CollectableObject('poison', 10, 9, 300, 30, 40),
            new CollectableObject('poison-dark', 230, 370, 1000, 60, 60)
        ];

        this.collectables.forEach(obj => {
    obj.animate();

    if (obj.animationImages === obj.IMAGES_POISON) {
        obj.width = 30;
        obj.height = 40;
    }
});

        this.animatedButtons = [
            {
                name: 'start',
                x: 280,
                y: 325,
                width: 180,
                height: 40,
                currentIndex: 0,
                images: [
                    '../img/6.Botones/Start/1.png',
                    '../img/6.Botones/Start/2.png',
                    '../img/6.Botones/Start/3.png',
                    '../img/6.Botones/Start/4.png'
                ]
            },
            {
                name: 'fullscreen',
                x: 580,
                y: 10,
                width: 130,
                height: 40,
                currentIndex: 0,
                images: [
                    '../img/6.Botones/Full Screen/Mesa de trabajo 6.png',
                    '../img/6.Botones/Full Screen/Mesa de trabajo 7.png',
                    '../img/6.Botones/Full Screen/Mesa de trabajo 8.png',
                    '../img/6.Botones/Full Screen/Mesa de trabajo 9.png'
                ]
            },
            {
                name: 'howto',
                x: 260,
                y: -20,
                width: 190,
                height: 120,
                currentIndex: 0,
                images: ['../img/6.Botones/floss.png'],
                isStatic: true,
                text: 'How to',
                hitboxOffset: {
                top: 40,
                left: 60,
                right: 60,
                bottom: 40
                }
            },
            // {
            //     name: 'mute',
            //     x: 200,
            //     y: 10,
            //     width: 30,
            //     height: 30,
            //     currentIndex: 0,
            //     images: [
            //         '../img/6.Botones/sounds_on.png',
            //         '../img/6.Botones/sounds_off.png'
            //     ],
            //     isStatic: true
            // }
        ];

        this.animatedButtons.forEach(button => {
            this.loadImages(button.images);
        });

        this.startButtonAnimation();
    }

    startButtonAnimation() {
        this.buttonInterval = setInterval(() => {
            this.animatedButtons.forEach(button => {
            // if (!button.isStatic) {
                button.currentIndex = (button.currentIndex + 1) % button.images.length;
            // }
            });
        }, 300);
    }

    stopButtonAnimation() {
        clearInterval(this.buttonInterval);
    }

    draw(ctx) {

    this.backgroundObjects.forEach(obj => {
        obj.draw(ctx);
    });
    
    this.statusBars.forEach(bar => {
    bar.draw(ctx);
    });

    this.collectables.forEach(obj => obj.draw(ctx));

    this.animatedButtons.forEach(button => {
        let img = this.imageCache[button.images[button.currentIndex]];
        if (img) {
            ctx.drawImage(img, button.x, button.y, button.width, button.height);
            if (button.text) {
                ctx.font = '16px luckiestGuy-Regular';
                ctx.fillStyle = 'yellow';
                ctx.textAlign = 'center';
                ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
            }
        }
    });
}

    disableButtons() {
        this.buttonsActive = false;
    }

    isButtonClicked(name, mouseX, mouseY) {
        if (!this.buttonsActive) return false;
        let btn = this.animatedButtons.find(b => b.name === name);
        if (!btn) return false;
        return mouseX >= btn.x &&
               mouseX <= btn.x + btn.width &&
               mouseY >= btn.y &&
               mouseY <= btn.y + btn.height;
    }

    isMouseOverButton(mouseX, mouseY) {
        if (!this.buttonsActive) return false;
    return this.animatedButtons.some(button => {
        let offset = button.hitboxOffset || { top: 0, left: 0, right: 0, bottom: 0 };
        let x1 = button.x + offset.left;
        let y1 = button.y + offset.top;
        let x2 = button.x + button.width - offset.right;
        let y2 = button.y + button.height - offset.bottom;

        return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
    });
    }

    toggleHowToButton(visible) {
        let index = this.animatedButtons.findIndex(b => b.name === 'howto');
        if (!visible && index !== -1) {
                let removedButton = this.animatedButtons.splice(index, 1)[0];
                this.onlyStartScreenObjects.push(removedButton);
            }
        if (visible) {
            let alreadyThere = this.animatedButtons.some(b => b.name === 'howto');
            let stored = this.onlyStartScreenObjects.find(b => b.name === 'howto');

            if (!alreadyThere && stored) {
                this.animatedButtons.push(stored);
                this.onlyStartScreenObjects = this.onlyStartScreenObjects.filter(b => b.name !== 'howto');
            }
        }
    }


}