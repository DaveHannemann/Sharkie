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

  IMAGES_JELLYFISH_POISON_PURPLE = [
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png"
  ];

  IMAGES_JELLYFISH_POISON_PURPLE_DEAD = [
    '../img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
  ]

  IMAGES_JELLYFISH_POISON_YELLOW = [
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"
  ];

  IMAGES_JELLYFISH_POISON_YELLOW_DEAD = [
    '../img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
  ]

  IMAGES_JELLYFISH_ELECTRO_GREEN = [
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png"
  ];

  IMAGES_JELLYFISH_ELEKTRO_GREEN_DEAD = [
    '../img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
    '../img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
    '../img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
    '../img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
  ]

  IMAGES_JELLYFISH_ELECTRO_PINK = [
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  IMAGES_JELLYFISH_ELECTRO_PINK_DEAD = [
    '../img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
    '../img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png'
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

  loadImagesByTypeAndColor(type, color) {
    if (type === "poison" && color === "purple") return this.IMAGES_JELLYFISH_POISON_PURPLE;
    if (type === "poison" && color === "yellow") return this.IMAGES_JELLYFISH_POISON_YELLOW;
    if (type === "electro" && color === "green") return this.IMAGES_JELLYFISH_ELECTRO_GREEN;
    if (type === "electro" && color === "pink") return this.IMAGES_JELLYFISH_ELECTRO_PINK;
    return [];
  }

  loadDeadImagesByTypeAndColor(type, color) {
    if (type === "poison" && color === "purple") return this.IMAGES_JELLYFISH_POISON_PURPLE_DEAD;
    if (type === "poison" && color === "yellow") return this.IMAGES_JELLYFISH_POISON_YELLOW_DEAD;
    if (type === "electro" && color === "green") return this.IMAGES_JELLYFISH_ELEKTRO_GREEN_DEAD;
    if (type === "electro" && color === "pink") return this.IMAGES_JELLYFISH_ELECTRO_PINK_DEAD;
    return [];
  }

  setState(newState) {
    this.state = newState;
    this.currentFrame = 0;

    if (this.movementInterval) {
      clearInterval(this.movementInterval);
      this.movementInterval = null;
    }
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }

    if (newState === "normal") {
      this.animationImages = this.loadImagesByTypeAndColor(this.type, this.color);
      this.loadImage(this.animationImages[0]);
      this.loadImages(this.animationImages);
      this.startNormalAnimation();
      this.isDead = false;
      this.readyToRemove = false;
    } else if (newState === "dead") {
      this.animationImages = this.loadDeadImagesByTypeAndColor(this.type, this.color);
      this.loadImage(this.animationImages[0]);
      this.loadImages(this.animationImages);
      this.isDead = true;
      this.speed = 0;
      this.startDeathAnimation(() => {
        this.readyToRemove = true;
      });
    }
  }


  startNormalAnimation() {
    this.movementInterval = setInterval(() => {
      this.x -= this.speed;
      this.y = this.baseY + Math.sin(this.x * this.waveFrequency + this.waveOffset) * this.waveAmplitude;
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      this.playAnimation(this.animationImages);
    }, 175);
  }

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

  die() {
    if (this.isDead) return;
    this.setState("dead");
  }
  
}