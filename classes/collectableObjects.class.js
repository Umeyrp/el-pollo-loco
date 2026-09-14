class CollectableObject extends DrawableObject {
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10
    }

    constructor(baseX) {
        super();
        this.x = baseX !== undefined ? baseX + Math.random() * 100 : 300 + Math.random() * 600;
    }
}