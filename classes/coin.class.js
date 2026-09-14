/**
 * A collectable coin.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
    /**
     * Hitbox offsets for the coin.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 45,
        right: 45,
        bottom: 45,
        left: 45,
    };

    /** @type {number} Random Y position between 100 and 310. */
    y = 100 + Math.random() * 210;

    /** @type {number} Height of the coin in pixels. */
    height = 130;

    /** @type {number} Width of the coin in pixels. */
    width = 130;

    /**
     * @param {number} [baseX] - Base X position (see CollectableObject).
     */
    constructor(baseX) {
        super(baseX);
        this.loadImage("img/8_coin/coin_1.png");
    }
}
