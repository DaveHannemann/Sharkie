class ThrowableObject extends MovableObject{

    height = 30;
    width = 30;
    speedX = 7;
    type = 'normal';


    constructor(x, y, type = 'normal') {
        super();
        this.x = x;
        this.y = y - 15;
        this.type = type;

        if (this.type === 'poison') {
            this.loadImage('../img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        } else {
            this.loadImage('../img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        }
    }

    /**
     * Updates position of throwable object
     */
    update() {
        this.x += this.speedX;
    }
}