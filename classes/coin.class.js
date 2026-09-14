/**
 * Eine einsammelbare Münze.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
    /**
     * Hitbox-Offsets der Münze.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 45,
        right: 45,
        bottom: 45,
        left: 45,
    };

    /** @type {number} Zufällige Y-Position zwischen 100 und 310. */
    y = 100 + Math.random() * 210;

    /** @type {number} Höhe der Münze in Pixel. */
    height = 130;

    /** @type {number} Breite der Münze in Pixel. */
    width = 130;

    /**
     * @param {number} [baseX] - Basis-X-Position (siehe CollectableObject).
     */
    constructor(baseX) {
        super(baseX);
        this.loadImage("img/8_coin/coin_1.png");
    }
}
