class ThrowableObject extends MovableObject{

    height = 30;
    width = 30;


    constructor(x, y) {
        super().loadImage('../img/1.Sharkie/4.Attack/Bubble trap/Bubble.png')
        this.x = x;
        this.y = y - 15;
        this.spitBubble();
    }

    spitBubble() {
        setInterval(() => {
            this.x += 4;
        }, 1000 / 60);
    }
}