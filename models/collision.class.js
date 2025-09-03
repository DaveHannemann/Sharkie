class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  /**
   * Updates all collisions.
   */
  update() {
    this.checkEnemyCollisions();
    this.checkCollectableCollisions();
    this.checkThrowableCollisions();
    this.checkFinSlapCollisions();
  }

  /**
   * Checks collisions for character with enemies.
   */
  checkEnemyCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (!this.shouldProcessEnemyCollision(enemy)) return;
      this.applyEnemyCollisionDamage(enemy);
      this.world.healthBar.setPercentage(this.world.charakter.energy);
    });
  }

  /**
   * Checks if enemy collision should be processed.
   * @param {MovableObject} enemy - Enemy
   * @returns {boolean} for the collision to be processed or not
   */
  shouldProcessEnemyCollision(enemy) {
    if (!this.world.charakter.isColliding(enemy)) return false;
    if (enemy instanceof JellyFish && (enemy.isDead || enemy.readyToRemove)) return false;
    if (this.world.charakter.finSlapped) return false;
    return enemy instanceof Fish || enemy instanceof JellyFish || enemy instanceof Endboss;
  }

  /**
   * Applies damage to char.
   * @param {MovableObject} enemy - Enemy 
   */
  applyEnemyCollisionDamage(enemy) {
    if (enemy instanceof Endboss) {
        this.world.charakter.hit(this.calcBossDamage());
    } else if (enemy instanceof JellyFish || (enemy instanceof Fish && enemy.state === "bubbleswim")) {
        this.world.charakter.hit(10);
    } else if (enemy instanceof Fish) {
        this.world.charakter.hit(5);
    } else {
        this.world.charakter.hit("default");
    }
  }

  /**
   * Boss damage by level.
   * @returns {number} damage to char
   */
  calcBossDamage() {
    switch (this.world.currentLevelNumber) {
      case 1: return 10;
      case 2: return 20;
      case 3: return 30;
      default: return 10;
    }
  }

  /**
   * Checks if char collects item.
   */
  checkCollectableCollisions() {
    this.world.level.collectables.forEach((item, index) => {
      if (!this.world.charakter.isColliding(item)) return;
      this.applyCollectableEffect(item);
      this.world.level.collectables.splice(index, 1);
    });
  }

  /**
   * Updates status bars and plays sounds.
   * @param {CollectableObject} item - Item 
   */
  applyCollectableEffect(item) {
    if (item.animationImages === item.IMAGES_COINS) {
      audioManager.playSFX('coin');
      this.world.coinBar.setPercentage(this.world.coinBar.percentage + item.value);
    } else if (item.animationImages === item.IMAGES_POISON) {
      audioManager.playSFX('poison');
      this.world.poisonBar.setPercentage(this.world.poisonBar.percentage + item.value);
    }
  }

  /**
   * Checks collisions between bubble and enemies.
   */
  checkThrowableCollisions() {
    this.world.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.world.level.enemies.forEach((enemy) => {
        if (!bubble.isColliding(enemy)) return;
        this.applyThrowableEffect(bubble, enemy);
        this.world.throwableObjects.splice(bubbleIndex, 1);
      });
    });
  }

  /**
   * Applies bubble effects on enemy.
   * @param {ThrowableObject} bubble - Bubble
   * @param {MovableObject} enemy - Enemy
   */
  applyThrowableEffect(bubble, enemy) {
    if (enemy instanceof Fish) this.handleFishBubble(enemy);
    if (enemy instanceof JellyFish && !enemy.isDead) enemy.die();
    if (enemy instanceof Endboss) enemy.takeDamage(this.calcBossHit(bubble));
  }

  /**
   * handles fish transformation if hit by bubble
   * @param {Fish} enemy - Fish enemy 
   */
  handleFishBubble(enemy) {
    if (enemy.state !== "bubbleswim" && enemy.state !== "transition") {
      enemy.state = "transition";
      setTimeout(() => enemy.state = "bubbleswim", 1000);
    }
  }

  /**
   * Calculates damage to endboss based on level and type
   * @param {ThrowableObject} bubble - Bubble
   * @returns {number} Damage
   */
  calcBossHit(bubble) {
    let baseDamage;
    switch (this.world.currentLevelNumber) {
      case 1: baseDamage = 20; break;
      case 2: baseDamage = 15; break;
      case 3: baseDamage = 10; break;
      default: baseDamage = 20;
    }
    return bubble.type === 'poison' ? baseDamage + 5 : baseDamage;
  }

  /**
   * Checks collisions for fin slaps.
   * @returns {void}
   */
  checkFinSlapCollisions() {
    if (!this.world.charakter.finSlapped) return;
    this.world.level.enemies.forEach((enemy, index) => {
      if (this.shouldFinSlapKill(enemy)) {
        this.killFishWithFinSlap(enemy, index);
      }
    });
  }

  /**
   * Checks if a fish can be fin slapped
   * @param {MovableObject} enemy - Enemy 
   * @returns {boolean} if the fish could be killed
   */
  shouldFinSlapKill(enemy) {
    return enemy instanceof Fish &&
           enemy.state === "bubbleswim" &&
           this.world.charakter.isColliding(enemy);
  }

  /**
   * Death "animation" of a killed fish
   * @param {Fish} enemy - Fish enemy 
   * @param {number} index - index of enemies array
   */
  killFishWithFinSlap(enemy, index) {
    enemy.setState("dead");
    enemy.floatInterval = setInterval(() => enemy.y -= 4, 1000 / 60);
    setTimeout(() => {
      clearInterval(enemy.floatInterval);
      this.world.level.enemies.splice(index, 1);
    }, 2000);
  }
}
