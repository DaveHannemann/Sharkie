class StartScreen extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    buttonInterval;
    animatedButtons = [];

    constructor(){
        super();
        this.loadImage('../img/4. Marcadores/op d1.png')
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
                    'img/6.Botones/Full Screen/Mesa de trabajo 6.png',
                    'img/6.Botones/Full Screen/Mesa de trabajo 7.png',
                    'img/6.Botones/Full Screen/Mesa de trabajo 8.png',
                    'img/6.Botones/Full Screen/Mesa de trabajo 9.png'
                ]
            }
        ];

        this.animatedButtons.forEach(button => {
            this.loadImages(button.images);
        });

        this.startButtonAnimation();
    }

    startButtonAnimation() {
        this.buttonInterval = setInterval(() => {
            this.animatedButtons.forEach(button => {
                button.currentIndex = (button.currentIndex + 1) % button.images.length;
            });
        }, 300);
    }

    stopButtonAnimation() {
        clearInterval(this.buttonInterval);
    }

    draw(ctx) {
        super.draw(ctx);
        this.animatedButtons.forEach(button => {
            let img = this.imageCache[button.images[button.currentIndex]];
            if (img) {
                ctx.drawImage(img, button.x, button.y, button.width, button.height);
            }
        });
    }

    isButtonClicked(name, mouseX, mouseY) {
        const btn = this.animatedButtons.find(b => b.name === name);
        if (!btn) return false;
        return mouseX >= btn.x &&
               mouseX <= btn.x + btn.width &&
               mouseY >= btn.y &&
               mouseY <= btn.y + btn.height;
    }
}