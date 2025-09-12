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
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

    IMAGES_FISH_EASY_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
  ];

    IMAGES_FISH_EASY_BUBBLESWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",
  ];

    IMAGES_FISH_EASY_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png"
  ];


  IMAGES_FISH_MEDIUM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
  ];

      IMAGES_FISH_MEDIUM_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
  ];

      IMAGES_FISH_MEDIUM_BUBBLESWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",
  ];

    IMAGES_FISH_MEDIUM_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png"
  ];


  IMAGES_FISH_HARD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

      IMAGES_FISH_HARD_TRANSITION = [
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];

      IMAGES_FISH_HARD_BUBBLESWIM = [
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",
  ];

    IMAGES_FISH_HARD_DEAD = [
    "img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png"
  ];


  constructor(type, x, y, speed) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.initFish();
  }

  /**
   * Initializes fish by loading images and animate
   */
  initFish() {
    this.loadImagesFishType(this.type);
    this.setState("normal");
    this.animate();
  }

  /**
   * Loads images of the fish based on type
   * @param {string} type - type of fish
   */
  loadImagesFishType(type) {
    const typeMap = {
      easy: this.IMAGES_FISH_EASY,
      medium: this.IMAGES_FISH_MEDIUM,
      hard: this.IMAGES_FISH_HARD,
    };
    this.IMAGES_FISH = typeMap[type];
    this.loadImages(this.IMAGES_FISH);
    this.animationImages = this.IMAGES_FISH;
  }

  /**
   * Sets the current state and updates images
   * @param {string} newState - new state after bubble or fin slap
   */
  setState(newState) {
    this.state = newState;
    this.currentFrame = 0;
    const stateMap = {
      normal: () => this.loadImagesFishType(this.type),
      transition: () => this.loadAnimation(this.getTransitionImages()),
      bubbleswim: () => this.enableBubbleSwim(),
      dead: () => this.loadAnimation(this.getDeadImages()),
    };
    stateMap[newState]?.();
  }

  /**
   * Loads set of animation imgs
   * @param {string[]} images - images to load
   */
  loadAnimation(images) {
    this.animationImages = images;
    this.loadImages(images);
  }

  /**
   * Enables bubble swim mode with new animation
   */
  enableBubbleSwim() {
    this.energy = 20;
    this.loadAnimation(this.getBubbleSwimImages());
  }

  /**
   * Starts movement and animation
   */
  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
    setInterval(() => this.animateState(), 175);
  }

  /**
   * Handles transition from normal to bubbleswim
   */
  animateState() {
    this.playAnimation(this.animationImages);
    if (this.state === "transition") {
      this.currentFrame++;
      if (this.currentFrame >= this.animationImages.length) {
        this.setState("bubbleswim");
      }
    }
  }

  /**
   * Returns transition imgs
   * @returns {string[]} Transition imgs
   */
  getTransitionImages() {
    return {
      easy: this.IMAGES_FISH_EASY_TRANSITION,
      medium: this.IMAGES_FISH_MEDIUM_TRANSITION,
      hard: this.IMAGES_FISH_HARD_TRANSITION,
    }[this.type] || [];
  }

  /**
   * Returns bubble swim imgs
   * @returns {string[]} Bubble swim imgs
   */
  getBubbleSwimImages() {
    return {
      easy: this.IMAGES_FISH_EASY_BUBBLESWIM,
      medium: this.IMAGES_FISH_MEDIUM_BUBBLESWIM,
      hard: this.IMAGES_FISH_HARD_BUBBLESWIM,
    }[this.type] || [];
  }

  /**
   * Returns dead images
   * @returns {string[]} Dead imgs
   */
  getDeadImages() {
    return {
      easy: this.IMAGES_FISH_EASY_DEAD,
      medium: this.IMAGES_FISH_MEDIUM_DEAD,
      hard: this.IMAGES_FISH_HARD_DEAD,
    }[this.type] || [];
  }
}