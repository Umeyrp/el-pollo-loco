class Bottle extends CollectableObject {
    offset = {
        top: 15,
        right: 15,
        bottom: 10,
        left: 35
    }
    y = 345;
    height = 80;
    width = 80;

    constructor(baseX) {
        super(baseX);
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    }
}