class Fish extends MovableObject {
  x = 650;
  width = 50;
  height = 25;
  type;
  state = "normal";
  energy = 10;
  isDead = false;

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


  constructor(type, x, y, speed) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.loadImagesFishType(type);
    this.setState("normal");
    this.animate();
  }

    loadImagesFishType(type) {
        if (type === "easy") this.IMAGES_FISH = this.IMAGES_FISH_EASY;
        if (type === "medium") this.IMAGES_FISH = this.IMAGES_FISH_MEDIUM;
        if (type === "hard") this.IMAGES_FISH = this.IMAGES_FISH_HARD;
        this.loadImages(this.IMAGES_FISH);
        this.animationImages = this.IMAGES_FISH;
    }

      getTransitionImages() {
  if(this.type === "easy") return this.IMAGES_FISH_EASY_TRANSITION;
  if(this.type === "medium") return this.IMAGES_FISH_MEDIUM_TRANSITION;
  if(this.type === "hard") return this.IMAGES_FISH_HARD_TRANSITION;
  return [];
}

  getBubbleSwimImages() {
    if(this.type === "easy") return this.IMAGES_FISH_EASY_BUBBLESWIM;
    if(this.type === "medium") return this.IMAGES_FISH_MEDIUM_BUBBLESWIM;
    if(this.type === "hard") return this.IMAGES_FISH_HARD_BUBBLESWIM;
    return [];
  }

  getDeadImages() {
      if (this.type === "easy") return this.IMAGES_FISH_EASY_DEAD;
      if (this.type === "medium") return this.IMAGES_FISH_MEDIUM_DEAD;
      if (this.type === "hard") return this.IMAGES_FISH_HARD_DEAD;
      return [];
  }

      setState(newState) {
        this.state = newState;
        this.currentFrame = 0;

        if (newState === "normal") {
            this.loadImagesFishType(this.type);
        } else if (newState === "transition") {
            this.animationImages = this.getTransitionImages();
            this.loadImages(this.animationImages);
        } else if (newState === "bubbleswim") {
            this.energy = 20;
            this.animationImages = this.getBubbleSwimImages();
            this.loadImages(this.animationImages);
        } else if (newState === "dead") {
            this.animationImages = this.getDeadImages();
            this.loadImages(this.animationImages);
        }
    }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

        setInterval(() => {
            if (this.state === "transition") {
                this.playAnimation(this.animationImages);
                this.currentFrame++;
                if (this.currentFrame >= this.animationImages.length) {
                    this.setState("bubbleswim");
                }
            } else {
                this.playAnimation(this.animationImages);
            }
        }, 175);
  }


}
