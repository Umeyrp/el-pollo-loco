/**
 * A collectable salsa bottle lying on the ground.
 * @extends CollectableObject
 */
class Bottle extends CollectableObject {
    /**
     * Hitbox offsets for the bottle lying on the ground.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 15,
        right: 15,
        bottom: 10,
        left: 35,
    };

    /** @type {number} Fixed Y position (on the ground). */
    y = 345;

    /** @type {number} Height of the bottle in pixels. */
    height = 80;

    /** @type {number} Width of the bottle in pixels. */
    width = 80;

    /**
     * @param {number} [baseX] - Base X position (see CollectableObject).
     */
    constructor(baseX) {
        super(baseX);
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    }
}
