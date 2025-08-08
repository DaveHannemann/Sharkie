let level1 = new Level([
        new Fish('easy', 700, 200, 0.3),
        new Fish('medium', 1000, 100, 0.5),
        new Fish('hard', 1400, 300, 0.6),
        new JellyFish('electro', 'green', 900, 250, 0.4),
        new JellyFish('poison', 'purple', 1500, 250, 0.4),
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
        new CollectableObject('coin', 800, 200, 800),
        new CollectableObject('coin', 1200, 150, 800),
        new CollectableObject('poison', 1600, 300, 300)
    ]
);

