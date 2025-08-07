class Level {
    enemies;
    light;
    backgroundObjects;
    level_end_x = 2200;
    level_end_top = -60;
    level_end_bottom = 350;

    constructor(enemies, light, backgroundObjects, collectables = []){
        this.enemies = enemies;
        this.light = light;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
    }
}