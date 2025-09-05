/**
 * Creates level 2 of the game.
 * Contents: Enemies, Light, Background, Collectables
 * 
 * @returns {Level} A new Level instance with:
 * - **Enemies**: Normal fishes, JellyFishes, and Endboss.
 * - **Lights**: Moving Light.
 * - **BackgroundObjects**: Background layers.
 * - **Collectables**: Coins and poison.
 */
function createLevel2() {
    return new Level(
    [
        new Fish('medium', 800, 180, 0.5),
        new Fish('medium', 1010, 360, 0.5),
        new Fish('medium', 1430, 45, 0.5),
        new Fish('medium', 1640, 270, 0.5),
        new Fish('medium', 2060, 135, 0.5),
        new Fish('medium', 2270, 225, 0.5),
        new Fish('medium', 2690, 315, 0.5),
        new Fish('hard', 2900, 90, 0.7),
        new Fish('hard', 3320, 385, 0.7),
        new JellyFish('electro', 'pink', 1220, 125, 0.5),
        new JellyFish('poison', 'yellow', 1850, 275, 0.5),
        new JellyFish('electro', 'green', 2480, 225, 0.5),
        new JellyFish('poison', 'purple', 3110, 175, 0.5),
        new JellyFish('electro', 'green', 1000, 300, 0.5),
        new JellyFish('poison', 'purple', 2000, 100, 0.5),
        new Endboss(),
    ],
    [
        new Light('../img/3. Background/Legacy/Layers/1. Light/1.png', 0),
        new Light('../img/3. Background/Legacy/Layers/1. Light/2.png', 720),
        new Light('../img/3. Background/Legacy/Layers/1. Light/1.png', 720*3),
        new Light('../img/3. Background/Legacy/Layers/1. Light/2.png', 720*4),
        new Light('../img/3. Background/Legacy/Layers/1. Light/1.png', 720*6),
        new Light('../img/3. Background/Legacy/Layers/1. Light/2.png', 720*7)
    ],
    [
        new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', -720),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D2.png', -720),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', -720),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', -720),
        new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 0),
        new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', 720),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D2.png', 720),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', 720),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', 720),
        new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 720*2),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 720*2),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 720*2),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 720*2),
        new BackgroundObject('../img/3. Background/Layers/5. Water/D2.png', 720*3),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D2.png', 720*3),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D2.png', 720*3),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D2.png', 720*3),
        new BackgroundObject('../img/3. Background/Layers/5. Water/D1.png', 720*4),
        new BackgroundObject('../img/3. Background/Layers/4.Fondo 2/D1.png', 720*4),
        new BackgroundObject('../img/3. Background/Layers/3.Fondo 1/D1.png', 720*4),
        new BackgroundObject('../img/3. Background/Layers/2. Floor/D1.png', 720*4)
    ],
    [
        new CollectableObject('coin', 250, 150, 800, null, null, 8.5),
        new CollectableObject('coin', 250*2, 300, 800, null, null, 8.5),
        new CollectableObject('coin', 250*3, 80, 800, null, null, 8.5),
        new CollectableObject('coin', 250*4, 170, 800, null, null, 8.5),
        new CollectableObject('coin', 250*5, 320, 800, null, null, 8.5),
        new CollectableObject('coin', 250*6, 90, 800, null, null, 8.5),
        new CollectableObject('coin', 250*7, 100, 800, null, null, 8.5),
        new CollectableObject('coin', 250*8, 200, 800, null, null, 8.5),
        new CollectableObject('coin', 250*9, 370, 800, null, null, 8.5),
        new CollectableObject('coin', 250*10, 110, 800, null, null, 8.5),
        new CollectableObject('poison', 800, 200, 300, null, null, 20),
        new CollectableObject('poison', 1200, 400, 300, null, null, 20),
        new CollectableObject('poison', 1600, 150, 300, null, null, 20),
        new CollectableObject('poison', 2000, 350, 300, null, null, 20),
        new CollectableObject('poison', 2400, 275, 300, null, null, 20)
    ]
);
}
