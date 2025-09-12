class JellyFish extends MovableObject {
  width = 50;
  height = 50;
  isDead = false;
  readyToRemove = false; 
  movementInterval;
  animationInterval;
  state = "normal";
  currentFrame = 0;
  type;
  color;

  offSet = {
    top: 5,
    bottom: 5,
    left: 10,
    right: 10,
  };

  IMAGES_JELLYFISH_POISON_PURPLE = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png"
  ];

  IMAGES_JELLYFISH_POISON_PURPLE_DEAD = [
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
  ]

  IMAGES_JELLYFISH_POISON_YELLOW = [
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"
  ];

  IMAGES_JELLYFISH_POISON_YELLOW_DEAD = [
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
  ]

  IMAGES_JELLYFISH_ELECTRO_GREEN = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png"
  ];

  IMAGES_JELLYFISH_ELEKTRO_GREEN_DEAD = [
    'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
    'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
    'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
    'img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
  ]

  IMAGES_JELLYFISH_ELECTRO_PINK = [
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  IMAGES_JELLYFISH_ELECTRO_PINK_DEAD = [
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
    'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png'
  ]

  constructor(
    type = "poison",
    color = "purple",
    x = 650,
    y = Math.random() * 400,
    speed = 0.2 + Math.random() * 0.4
  ) {
    super();
    this.type = type;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.baseY = y;
    this.waveAmplitude = 25;
    this.waveFrequency = 0.1;
    this.waveOffset = Math.random() * Math.PI * 2;

    this.setState("normal");
  }

  /**
   * Loads normal images of jellyfish
   * @param {string} type - jellyfish type
   * @param {string} color - jellyfish color
   * @returns {string[]} Array of image paths
   */
  loadImagesByTypeAndColor(type, color) {
    if (type === "poison" && color === "purple") return this.IMAGES_JELLYFISH_POISON_PURPLE;
    if (type === "poison" && color === "yellow") return this.IMAGES_JELLYFISH_POISON_YELLOW;
    if (type === "electro" && color === "green") return this.IMAGES_JELLYFISH_ELECTRO_GREEN;
    if (type === "electro" && color === "pink") return this.IMAGES_JELLYFISH_ELECTRO_PINK;
    return [];
  }

  /**
   * Loads death images of jellyfish
   * @param {string} type - jellyfish type
   * @param {string} color - jellyfish color
   * @returns {string[]} Array of image paths
   */
  loadDeadImagesByTypeAndColor(type, color) {
    if (type === "poison" && color === "purple") return this.IMAGES_JELLYFISH_POISON_PURPLE_DEAD;
    if (type === "poison" && color === "yellow") return this.IMAGES_JELLYFISH_POISON_YELLOW_DEAD;
    if (type === "electro" && color === "green") return this.IMAGES_JELLYFISH_ELEKTRO_GREEN_DEAD;
    if (type === "electro" && color === "pink") return this.IMAGES_JELLYFISH_ELECTRO_PINK_DEAD;
    return [];
  }

  /**
   * Sets current state of jellyfish
   * @param {"normal"|"dead"} newState - new state for jellyfish 
   */
  setState(newState) {
    this.state = newState;
    this.currentFrame = 0;
    this.resetIntervals();
    if (newState === "normal") {
      this.applyNormalState();
    } else if (newState === "dead") {
      this.applyDeadState();
    }
  }

  /**
   * Clears all movement and animation
   */
  resetIntervals() {
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
      this.movementInterval = null;
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  /**
   * Normal state and animation
   */
  applyNormalState() {
    this.animationImages = this.loadImagesByTypeAndColor(this.type, this.color);
    this.loadImage(this.animationImages[0]);
    this.loadImages(this.animationImages);
    this.startNormalAnimation();
    this.isDead = false;
    this.readyToRemove = false;
  }

  /**
   * Death state and animation
   */
  applyDeadState() {
    this.animationImages = this.loadDeadImagesByTypeAndColor(this.type, this.color);
    this.loadImage(this.animationImages[0]);
    this.loadImages(this.animationImages);
    this.isDead = true;
    this.speed = 0;
    this.startFloatingUpwards();
    this.startDeathAnimation(() => {
    });
  }

  /**
   * Starts floating the dead Jellyfish upwards
   * @param {number} speed - speed of floating
   */
  startFloatingUpwards(speed = 1.5) {
    this.movementInterval = setInterval(() => {
      this.y -= speed;
      if (this.y + this.height < 0) {
        clearInterval(this.movementInterval);
        this.readyToRemove = true;
      }
    }, 1000 / 60);
  }

  /**
   * Normal swimming animation
   */
  startNormalAnimation() {
    this.movementInterval = setInterval(() => {
      this.x -= this.speed;
      this.y = this.baseY + Math.sin(this.x * this.waveFrequency + this.waveOffset) * this.waveAmplitude;
    }, 1000 / 60);
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.animationImages);
    }, 175);
  }

  /**
   * Plays Death animation frame by frame
   * @param {Function} onComplete - Callback when animation ends
   */
  startDeathAnimation(onComplete) {
    let frame = 0;
    this.animationInterval = setInterval(() => {
      if (frame < this.animationImages.length) {
        this.img = this.imageCache[this.animationImages[frame]];
        frame++;
      } else {
        clearInterval(this.animationInterval);
        onComplete();
      }
    }, 150);
  }

  /**
   * Kills jellyfish and sets state to "dead"
   * @returns {void}
   */
  die() {
    if (this.isDead) return;
    this.setState("dead");
  }
  
}