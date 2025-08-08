class Fish extends MovableObject {
  x = 650;
  width = 50;
  height = 25;

  offSet = {
    top: 5,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_FISH_EASY = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

    IMAGES_FISH_EASY_TRANSITION = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
  ];

    IMAGES_FISH_EASY_BUBBLESWIM = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
  ];

    IMAGES_FISH_EASY_DEAD = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png"
  ];


  IMAGES_FISH_MEDIUM = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
  ];

      IMAGES_FISH_MEDIUM_TRANSITION = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
  ];

      IMAGES_FISH_MEDIUM_BUBBLESWIM = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
  ];

    IMAGES_FISH_MEDIUM_DEAD = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png"
  ];


  IMAGES_FISH_HARD = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

      IMAGES_FISH_HARD_TRANSITION = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];

      IMAGES_FISH_HARD_BUBBLESWIM = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
  ];

    IMAGES_FISH_HARD_DEAD = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png"
  ];


  constructor(
    type = "easy",
    x = 650,
    y = Math.random() * 400,
    speed = 0.2 + Math.random() * 0.4
  ) {
    super();
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.loadImagesFishType(type);
  }

  loadImagesFishType(type) {
    if (type === "easy") {
      this.loadImage(this.IMAGES_FISH_EASY[0]);
      this.loadImages(this.IMAGES_FISH_EASY);
      this.animationImages = this.IMAGES_FISH_EASY;
    } else if (type === "medium") {
      this.loadImage(this.IMAGES_FISH_MEDIUM[0]);
      this.loadImages(this.IMAGES_FISH_MEDIUM);
      this.animationImages = this.IMAGES_FISH_MEDIUM;
    } else if (type === "hard") {
      this.loadImage(this.IMAGES_FISH_HARD[0]);
      this.loadImages(this.IMAGES_FISH_HARD);
      this.animationImages = this.IMAGES_FISH_HARD;
    }
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.animationImages);
    }, 175);
  }
}
