class Water extends MovableObject {
    y = 0;
    width = 500;
    height = 200;

    constructor(){
        super().loadImage('../img/3. Background/Layers/5. Water/D1.png');

        this.x = Math.random() * 500;
    }

}