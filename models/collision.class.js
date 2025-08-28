class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  update() {
    this.checkEnemyCollisions();
    this.checkCollectableCollisions();
    this.checkThrowableCollisions();
    this.checkFinSlapCollisions();
  }

  checkEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (!this.world.charakter.isColliding(enemy)) return;
      if (enemy instanceof JellyFish && (enemy.isDead || enemy.readyToRemove)) return;
      if (this.world.charakter.finSlapped && enemy instanceof Fish) return;

      if (enemy.state === "bubbleswim" || enemy instanceof JellyFish || enemy instanceof Endboss) {
        if (enemy instanceof Endboss) {
          let damageToChar;
          switch (this.world.currentLevelNumber) {
            case 1: damageToChar = 10; break;
            case 2: damageToChar = 20; break;
            case 3: damageToChar = 30; break;
            default: damageToChar = 10;
          }
          this.world.charakter.hit(damageToChar);
        } else if (enemy instanceof JellyFish) {
          this.world.charakter.hit(enemy.type);
        } else {
          this.world.charakter.hit("default");
        }
        this.world.healthBar.setPercentage(this.world.charakter.energy);
      }
    });
  }

  checkCollectableCollisions() {
    this.world.level.collectables.forEach((item, index) => {
      if (this.world.charakter.isColliding(item)) {
        if (item.animationImages === item.IMAGES_COINS) {
            audioManager.playSFX('coin');
          this.world.coinBar.setPercentage(
            this.world.coinBar.percentage + item.value
          );
        } else if (item.animationImages === item.IMAGES_POISON) {
            audioManager.playSFX('poison');
          this.world.poisonBar.setPercentage(
            this.world.poisonBar.percentage + item.value
          );
        }
        this.world.level.collectables.splice(index, 1);
      }
    });
  }

  checkThrowableCollisions() {
    this.world.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.world.level.enemies.forEach((enemy) => {
        if (!bubble.isColliding(enemy)) return;

        if (enemy instanceof Fish) {
          if (enemy.state !== "bubbleswim" && enemy.state !== "transition") {
            enemy.state = "transition";
            setTimeout(() => { enemy.state = "bubbleswim"; }, 1000);
          }
        }

        if (enemy instanceof JellyFish && !enemy.isDead) {
          enemy.die();
        }

        if (enemy instanceof Endboss) {
          let damageToBoss;
          switch (this.world.currentLevelNumber) {
            case 1: damageToBoss = 20; break;
            case 2: damageToBoss = 15; break;
            case 3: damageToBoss = 10; break;
            default: damageToBoss = 20;
          }
          if (bubble.type === 'poison') damageToBoss += 5;
          enemy.takeDamage(damageToBoss);
        }
        this.world.throwableObjects.splice(bubbleIndex, 1);
      });
    });
  }

  checkFinSlapCollisions() {
    if (!this.world.charakter.finSlapped) return;
    this.world.level.enemies.forEach((enemy, index) => {
      if (
        enemy instanceof Fish &&
        enemy.state === "bubbleswim" &&
        this.world.charakter.isColliding(enemy)
      ) {
        enemy.setState("dead");

        enemy.floatInterval = setInterval(() => {
          enemy.y -= 4;
        }, 1000 / 60);
        setTimeout(() => {
          clearInterval(enemy.floatInterval);
          this.world.level.enemies.splice(index, 1);
        }, 2000);
      }
    });
  }
}
