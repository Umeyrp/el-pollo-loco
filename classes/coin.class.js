class Coin extends CollectableObject {
    offset = {
        top: 45,
        right: 45,
        bottom: 45,
        left: 45,
    };
    y = 100 + Math.random() * 210;
    height = 130;
    width = 130;

    constructor(baseX) {
        super(baseX);
        this.loadImage("img/8_coin/coin_1.png");
    }
}
