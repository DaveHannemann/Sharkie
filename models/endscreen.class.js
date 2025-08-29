class EndScreen extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    buttonInterval;
    backgroundObjects = [];
    animatedButtons = [];
    mode;
    

    constructor(mode = "win", onRetry = null, onHome = null, onNextLevel = null){
        super();
        this.mode = mode;
        this.onRetry = onRetry;
        this.onHome = onHome;
        this.onNextLevel = onNextLevel;

        if (this.mode === "win"){
                    this.backgroundObjects = [
        new BackgroundObject('../img/6.Botones/Try again/Mesa de trabajo 1.png', 0)
        ]

        this.backgroundObjects.forEach(obj => this.loadImage(obj.img.src));

        this.animatedButtons = [
            {
                name: 'win',
                x: 190,
                y: 242,
                width: 340,
                height: 80,
                currentIndex: 0,
                images: [
                    '../img/6.Botones/Tittles/You win/Recurso 20.png',
                    '../img/6.Botones/Tittles/You win/Recurso 21.png',
                    '../img/6.Botones/Tittles/You win/Recurso 22.png',
                    '../img/6.Botones/Tittles/You win/Recurso 23.png'
                ]
            },
            {
                name: 'homescreen',
                x: 670,
                y: 10,
                width: 40,
                height: 40,
                currentIndex: 0,
                images: ['../img/6.Botones/shell_home.png'],
                isStatic: true,
                text: 'Home',
            },
        ];
                    if (this.onNextLevel) {
                this.animatedButtons.push({
                    name: 'nextLevel',
                    x: 640,
                    y: 420,
                    width: 60,
                    height: 60,
                    currentIndex: 0,
                    images: ['../img/6.Botones/next_level.png'],
                    isStatic: true,
                });
            }
    }

            if (this.mode === "lose") {
            this.animatedButtons = [
                {
                    name: 'gameover',
                    x: 270, y: 200, width: 200, height: 60,
                    currentIndex: 0,
                    images: [
                        '../img/6.Botones/Tittles/Game Over/Recurso 9.png',
                        '../img/6.Botones/Tittles/Game Over/Recurso 10.png',
                        '../img/6.Botones/Tittles/Game Over/Recurso 11.png',
                        '../img/6.Botones/Tittles/Game Over/Recurso 12.png',
                        '../img/6.Botones/Tittles/Game Over/Recurso 13.png'
                    ]
                },
                {
                    name: 'retry',
                    x: 280, y: 325, width: 180, height: 40,
                    currentIndex: 0,
                    images: [
                        '../img/6.Botones/Try again/Recurso 15.png',
                        '../img/6.Botones/Try again/Recurso 16.png',
                        '../img/6.Botones/Try again/Recurso 17.png',
                        '../img/6.Botones/Try again/Recurso 18.png'
                    ],
                    hitboxOffset: {
                    top: 0,
                    left: 10,
                    right: 10,
                    bottom: 0
                    }
                },
                {
                    name: 'homescreen',
                    x: 670,
                    y: 10,
                    width: 40,
                    height: 40,
                    currentIndex: 0,
                    images: ['../img/6.Botones/shell_home.png'],
                    isStatic: true,
                    text: 'Home',
                },
            ];
        }


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

    handleClick(mouseX, mouseY) {
        if (this.isButtonClicked('retry', mouseX, mouseY)) {
            if (this.onRetry) {
                this.onRetry();
            }
        }
        if (this.isButtonClicked('homescreen', mouseX, mouseY)) {
            if (this.onHome) {
                this.onHome();
            }
        }
        if (this.isButtonClicked('nextLevel', mouseX, mouseY)) {
        if (this.onNextLevel) this.onNextLevel();
    }
    }

    stopButtonAnimation() {
        clearInterval(this.buttonInterval);
    }

    draw(ctx) {
        if (this.mode === "win") {
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fillRect(0, 0, this.width, this.height);
            this.backgroundObjects.forEach(obj => obj.draw(ctx));
        }

        if (this.mode === "lose") {
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(0, 0, this.width, this.height);
        }

        this.animatedButtons.forEach(button => {
            let img = this.imageCache[button.images[button.currentIndex]];
            if (img) {
                ctx.drawImage(img, button.x, button.y, button.width, button.height);
            }
            if (button.text) {
                ctx.font = '16px luckiestGuy-Regular';
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height);
            }
        });
    }

isButtonClicked(name, mouseX, mouseY) {
    let btn = this.animatedButtons.find(b => b.name === name);
    if (!btn) return false;

    let offset = btn.hitboxOffset || { top: 0, left: 0, right: 0, bottom: 0 };

    let x1 = btn.x + offset.left;
    let x2 = btn.x + btn.width - offset.right;
    let y1 = btn.y + offset.top;
    let y2 = btn.y + btn.height - offset.bottom;

    return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
}

    isMouseOverButton(mouseX, mouseY) {
    return this.animatedButtons.some(button => {
        let offset = button.hitboxOffset || { top: 0, left: 0, right: 0, bottom: 0 };
        let x1 = button.x + offset.left;
        let y1 = button.y + offset.top;
        let x2 = button.x + button.width - offset.right;
        let y2 = button.y + button.height - offset.bottom;

        return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
    });
    }

     isPointerButtonHovered(mouseX, mouseY) {
        let pointerButtons = ['homescreen', 'nextLevel', 'retry'];
        return this.animatedButtons.some(btn => {
            if (pointerButtons.includes(btn.name)) {
                const offset = btn.hitboxOffset || { top: 0, left: 0, right: 0, bottom: 0 };
                const x1 = btn.x + offset.left;
                const y1 = btn.y + offset.top;
                const x2 = btn.x + btn.width - offset.right;
                const y2 = btn.y + btn.height - offset.bottom;

                return mouseX >= x1 && mouseX <= x2 && mouseY >= y1 && mouseY <= y2;
            }
            return false;
        });
    }
}