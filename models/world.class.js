class World {
    charakter = new Character();
    level = createLevel1();
    currentLevelNumber = 1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar('health', 10 , 40);
    coinBar = new StatusBar('coin', 10 , 70);
    poisonBar = new StatusBar('poison', 10 , 10);
    throwableObjects = [];
    collisionManager;
    lastBubbleSpit = 0;
    endbossHealthBar = new StatusBar('health', 0, 0);
    gameOverTriggered = false;
    endScreen = null;
    animationFrameId = null;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.hud = new HUD();
        this.collisionManager = new CollisionManager(this);
        this.setWorld();
    }

    /**
     * Starts the game
     */
    async start() {
        await this.preloadBackground(this.level);
        this.run();
        this.draw();
        this.startEnemiesAnimation();
        this.startCollectableAnimation();
    }

    /**
     * Sets the world
     */
    setWorld() {
        this.charakter.world = this;
        this.endboss = this.level.enemies.find(e => e instanceof Endboss) || null;
        if (this.endboss) this.endboss.world = this;
    }

    /**
     * Reloads and starts a level
     * @param {number} [levelNumber=this.currentLevelNumber] Level number to load
     */
    restartLevel(levelNumber = this.currentLevelNumber) {
        this.stopAllWorldAnimations();
        this.resetLevelState();
        this.level = this.createLevel(levelNumber);
        this.endboss = this.level.enemies.find(e => e instanceof Endboss) || null;
        this.charakter = new Character();
        this.charakter.world = this;
        this.charakter.lastKeyPressed = Date.now();
        this.setWorld();
        this.resetBars();
        this.start();
        audioManager.playMusic('main');
    }

    /**
     * Returns level based on number
     * @param {number} levelNumber - number of level
     * @returns {Level}
     */
    createLevel(levelNumber) {
        return {1: createLevel1, 2: createLevel2, 3: createLevel3}[levelNumber]?.() || createLevel1();
    }
    
    /**
     * Updates visibility of slap button
     */
    updateSlapButtonVisibility() {
        const btn = document.getElementById('btn-attack');
        btn.style.display = (this.endboss && this.endboss.endBossShow) ? 'none' : '';
    }

    /**
     * Starts the main loop for the world
     */
    run() {
        if(this.gameInterval) clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => {
            this.collisionManager.update();
            this.checkThrowObjects();
            this.throwableObjects.forEach(o => o.update());
            this.level.enemies = this.level.enemies.filter(e => !e.readyToRemove);
            this.updateSlapButtonVisibility();
            this.updateEndboss();
            this.checkCharacterDeath();
        }, 1000 / 60);
    }

    /**
     * Checks if a bubble can be thrown
     */
    checkThrowObjects() {
        const now = Date.now();
        if(this.keyboard.D && !this.charakter.isDead() && now - this.lastBubbleSpit >= 900){
            this.charakter.bubbleAttack();
            this.lastBubbleSpit = now + this.charakter.IMAGES_BUBBLE_ATTACK.length * 60; 
        }
    }

    /**
     * Updates endboss state
     * @returns {void}
     */
    updateEndboss() {
        if (!this.endboss) return;
        this.endbossHealthBar.setPercentage(this.endboss.energy);
        if(this.endboss.energy <= 0 && !this.gameOverTriggered) this.handleGameOver("win");
    }

    /**
     * Checks if char is dead
     */
    checkCharacterDeath() {
        if(this.charakter.isDead() && !this.gameOverTriggered) this.handleGameOver("lose");
    }

    /**
     * Handles endscreen
     * @param {"win"|"lose"} type - Type of game over
     */
    handleGameOver(type) {
        this.gameOverTriggered = true;
        hideMobileControls();
        setTimeout(() => audioManager.stopAll() || audioManager.playSFX(type==="win"?"win":"lose"), 2900);
        setTimeout(() => {
            this.endScreen = new EndScreen(type,
                () => { this.restartLevel(this.currentLevelNumber); if('ontouchstart' in window) showMobileControls(); },
                () => { this.cleanupWorld(); },
                type==="win" && this.currentLevelNumber<3 ? () => { this.restartLevel(this.currentLevelNumber+1); if('ontouchstart' in window) showMobileControls(); } : null
            );
        }, 3000);
    }

    /**
     * Cleans the world if going back to start screen
     */
    cleanupWorld() {
        this.endScreen = null;
        this.cleanup();
        this.charakter?.stopAllIntervals?.();
        this.charakter.lastKeyPressed = Date.now();
        world = null;
        startScreen = new StartScreen();
        hideMobileControls();
        drawStartScreenLoop();
        audioManager.stopAll();
        audioManager.playMusic('start');
    }

    /**
     * Stops all
     */
    stopAllWorldAnimations() {
        this.stopDrawing();
        clearInterval(this.gameInterval);
        this.charakter?.stopAllIntervals?.();
        this.endboss?.stopAllIntervals?.();
        this.level?.enemies?.forEach(e => e.stopAllIntervals?.());
        this.level?.collectables?.forEach(o => o.stopAllIntervals?.());
    }

    /**
     * Resets level
     */
    resetLevelState() {
        this.camera_x = 0;
        this.throwableObjects = [];
        this.gameOverTriggered = false;
        this.endScreen = null;
        if(this.level) ["backgroundObjects","collectables","enemies","light"].forEach(k=>this.level[k]=[]);
    }

    /**
     * Resets status bars
     */
    resetBars() {
        this.healthBar.setPercentage(this.charakter.energy);
        this.coinBar.setPercentage(0);
        this.poisonBar.setPercentage(0);
        if(this.endboss) this.endbossHealthBar.setPercentage(this.endboss.energy);
    }

    /**
     * Draws all
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.drawLevelObjects();
        this.ctx.restore();
        this.drawBars();
        if (this.endScreen) this.endScreen.draw(this.ctx);
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws level objects
     */
    drawLevelObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.light);
        this.addObjectsToMap(this.level.enemies.filter(e => !(e instanceof Endboss)));
        if (this.shouldDrawEndboss()) this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.charakter);
    }

    /**
     * Draws status bars
     */
    drawBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonBar);
        this.hud.draw(this.ctx);
        if (this.shouldDrawEndboss()) this.drawFlippedHealthBar(this.endbossHealthBar);
    }

    /**
     * Returns true if endboss should be drawn
     * @returns {boolean} True if endboss should be drawn
     */
    shouldDrawEndboss() {
        return this.endboss && this.endboss.endBossShow;
    }

    /**
     * Stops drawing
     */
    stopDrawing() { 
        if(this.animationFrameId) cancelAnimationFrame(this.animationFrameId); this.animationFrameId=null; 
    }

    /**
     * Adds objects to map
     * @param {Array<MovableObject>} objects - Array of objects to draw
     */
    addObjectsToMap(objects) {
        objects.forEach(o=>{ if(!(o instanceof Endboss)||o.endBossShow)this.addToMap(o); }); 
    }

    /**
     * Draws object
     * @param {MovableObject} obj - Object to draw
     */
    addToMap(obj) {
        if(obj.otherDirection) this.flipImage(obj); 
        obj.draw(this.ctx); 
        // obj.drawFrame(this.ctx); 
        if(obj.otherDirection) this.flipImageBack(obj);
    }

    /**
     * Flips object horizontally
     * @param {MovableObject} obj - Object to flip
     */
    flipImage(obj) { 
        this.ctx.save(); 
        this.ctx.translate(obj.width,0); 
        this.ctx.scale(-1,1); 
        obj.x*=-1; 
    }

    /**
     * Flips object back to normal
     * @param {MovableObject} obj - Object to restore
     */
    flipImageBack(obj) { 
        obj.x*=-1; this.ctx.restore(); 
    }

    /**
     * Starts enemies animations
     */
    startEnemiesAnimation() {
        this.level.enemies.forEach(e=>e.animate?.()); 
        if(this.endboss)this.endboss.animate?.(); 
    }

    /**
     * Stops enemies animations
     */
    stopEnemiesAnimation() { 
        this.level.enemies.forEach(e=>e.stopAllIntervals?.()); 
        if(this.endboss)this.endboss.stopAllIntervals?.(); 
    }

    /**
     * Starts collectable animations
     */
    startCollectableAnimation() { 
        this.level.collectables.forEach(o=>o.animate?.()); 
    }

    /**
     * Draws healthbar for endboss
     * @param {StatusBar} bar - Status bar to draw
     */
    drawFlippedHealthBar(bar) { 
        this.ctx.save(); 
        let x=this.canvas.width-bar.width-20; 
        this.ctx.translate(x+bar.width,bar.y); 
        this.ctx.scale(-1,1); 
        bar.draw(this.ctx); 
        this.ctx.restore(); 
    }

    /**
     * Cleanup world; stop everything
     */
    cleanup() { 
        this.stopDrawing(); 
        clearInterval(this.gameInterval); 
        this.stopEnemiesAnimation(); 
    }

    /**
     * Preloads all background images
     * @param {Level} level - level background objects.
     * @returns {Promise<void>} Resolves when imgs loaded.
     */
    async preloadBackground(level) {
        const promises = level.backgroundObjects
            .map(bg => bg.imageLoaded)
            .filter(Boolean);
        await Promise.all(promises);
    }
}