class CollisionManager {
    constructor(world) {
        this.world = world;
    }

    update() {
        this.checkEnemyCollisions();
        this.checkCollectableCollisions();
        this.checkThrowableCollisions();
    }

    checkEnemyCollisions() {
        this.world.level.enemies.forEach(enemy => {
            if (this.world.charakter.isColliding(enemy)) {
                if (enemy.state === "bubbleswim" || enemy instanceof JellyFish || enemy instanceof EndBoss) {
                this.world.charakter.hit();
                this.world.healthBar.setPercentage(this.world.charakter.energy);
                console.log('lost HP', this.world.charakter.energy);
                }
            }
        });
    }

    checkCollectableCollisions() {
        this.world.level.collectables.forEach((item, index) => {
            if (this.world.charakter.isColliding(item)) {
                if (item.animationImages === item.IMAGES_COINS) {
                    this.world.coinBar.setPercentage(this.world.coinBar.percentage + item.value);
                } else if (item.animationImages === item.IMAGES_POISON) {
                    this.world.poisonBar.setPercentage(this.world.poisonBar.percentage + item.value);
                }
                this.world.level.collectables.splice(index, 1);
            }
        });
    }

checkThrowableCollisions() {
  this.world.throwableObjects.forEach((bubble, bubbleIndex) => {
    this.world.level.enemies.forEach((enemy, enemyIndex) => {
      if (bubble.isColliding(enemy) && enemy instanceof Fish) {
        if (enemy.state !== "bubbleswim" && enemy.state !== "transition") {
          enemy.state = "transition";
          setTimeout(() => {
            enemy.state = "bubbleswim";
          }, 1000);
        }
        this.world.throwableObjects.splice(bubbleIndex, 1);
      }
    });

    if (this.world.level.boss && bubble.isColliding(this.world.level.boss)) {
      this.world.level.boss.energy -= 10;
      this.world.throwableObjects.splice(bubbleIndex, 1);
    }
  });
}
}