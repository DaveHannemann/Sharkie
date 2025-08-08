class JellyFish extends MovableObject {
  width = 50;
  height = 50;

  IMAGES_JELLYFISH_POISON_PURPLE = [
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png"
  ];

  IMAGES_JELLYFISH_POISON_YELLOW = [
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "../img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"
  ];

  IMAGES_JELLYFISH_ELECTRO_GREEN = [
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png"
  ];

  IMAGES_JELLYFISH_ELECTRO_PINK = [
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "../img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  constructor(
    type = "poison",
    color = "purple",
    x = 650,
    y = Math.random() * 400,
    speed = 0.2 + Math.random() * 0.4
  ) {
    super();
    this.x = x;
    this.y = y;
    this.speed = speed;

    this.baseY = y;
    this.waveAmplitude = 25;
    this.waveFrequency = 0.1;
    this.waveOffset = Math.random() * Math.PI * 2;

    this.loadImagesJellyFishType(type, color);
  }

  loadImagesJellyFishType(type, color) {
    if (type === "poison" && color === "purple") {
      this.loadImage(this.IMAGES_JELLYFISH_POISON_PURPLE[0]);
      this.loadImages(this.IMAGES_JELLYFISH_POISON_PURPLE);
      this.animationImages = this.IMAGES_JELLYFISH_POISON_PURPLE;
    } else if (type === "poison" && color === "yellow") {
      this.loadImage(this.IMAGES_JELLYFISH_POISON_YELLOW[0]);
      this.loadImages(this.IMAGES_JELLYFISH_POISON_YELLOW);
      this.animationImages = this.IMAGES_JELLYFISH_POISON_YELLOW;
    } else if (type === "electro" && color === "green") {
      this.loadImage(this.IMAGES_JELLYFISH_ELECTRO_GREEN[0]);
      this.loadImages(this.IMAGES_JELLYFISH_ELECTRO_GREEN);
      this.animationImages = this.IMAGES_JELLYFISH_ELECTRO_GREEN;
    } else if (type === "electro" && color === "pink") {
      this.loadImage(this.IMAGES_JELLYFISH_ELECTRO_PINK[0]);
      this.loadImages(this.IMAGES_JELLYFISH_ELECTRO_PINK);
      this.animationImages = this.IMAGES_JELLYFISH_ELECTRO_PINK;
    }
  }

  animate() {
    setInterval(() => {
      this.x -= this.speed;
      this.y = this.baseY + Math.sin(this.x * this.waveFrequency + this.waveOffset) * this.waveAmplitude;
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(this.animationImages);
    }, 175);
  }
}