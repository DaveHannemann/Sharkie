class MovableObject{
    x = 120;
    y = 300;
    img;
    width = 150;
    height = 100;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight () {
        console.log('Moving right');
    }

    moveLeft(){
        console.log('Moving left');
    }

}