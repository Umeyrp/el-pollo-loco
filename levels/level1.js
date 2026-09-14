function createLevel() {
    return new Level(
        [
            new Chicken(300),
            new Chicken(650),
            new Chicken(1000),
            new Chick(450),
            new Chick(800),
            new Chick(1150),
            new Chick(1400),
            new Endboss(),
        ],
        [new Cloud()],
        [
            new BackgroundObject("img/5_background/layers/air.png", -720),
            new BackgroundObject(
                "img/5_background/layers/3_third_layer/2.png",
                -720,
            ),
            new BackgroundObject(
                "img/5_background/layers/2_second_layer/2.png",
                -720,
            ),
            new BackgroundObject(
                "img/5_background/layers/1_first_layer/2.png",
                -720,
            ),
            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject(
                "img/5_background/layers/3_third_layer/1.png",
                0,
            ),
            new BackgroundObject(
                "img/5_background/layers/2_second_layer/1.png",
                0,
            ),
            new BackgroundObject(
                "img/5_background/layers/1_first_layer/1.png",
                0,
            ),
            new BackgroundObject("img/5_background/layers/air.png", 720),
            new BackgroundObject(
                "img/5_background/layers/3_third_layer/2.png",
                720,
            ),
            new BackgroundObject(
                "img/5_background/layers/2_second_layer/2.png",
                720,
            ),
            new BackgroundObject(
                "img/5_background/layers/1_first_layer/2.png",
                720,
            ),
            new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
            new BackgroundObject(
                "img/5_background/layers/3_third_layer/1.png",
                720 * 2,
            ),
            new BackgroundObject(
                "img/5_background/layers/2_second_layer/1.png",
                720 * 2,
            ),
            new BackgroundObject(
                "img/5_background/layers/1_first_layer/1.png",
                720 * 2,
            ),
            new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
            new BackgroundObject(
                "img/5_background/layers/3_third_layer/2.png",
                720 * 3,
            ),
            new BackgroundObject(
                "img/5_background/layers/2_second_layer/2.png",
                720 * 3,
            ),
            new BackgroundObject(
                "img/5_background/layers/1_first_layer/2.png",
                720 * 3,
            ),
        ],
        [
            //thrown Bottles
        ],
        [
            new Coin(150),
            new Coin(400),
            new Coin(650),
            new Coin(900),
            new Coin(1150),
            new Bottle(200),
            new Bottle(450),
            new Bottle(700),
            new Bottle(950),
            new Bottle(1100),
            new Bottle(1250),
        ],
    );
}
