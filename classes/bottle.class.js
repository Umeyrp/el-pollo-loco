/**
 * Eine auf dem Boden liegende, einsammelbare Salsa-Flasche.
 * @extends CollectableObject
 */
class Bottle extends CollectableObject {
    /**
     * Hitbox-Offsets der liegenden Flasche.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 15,
        right: 15,
        bottom: 10,
        left: 35,
    };

    /** @type {number} Feste Y-Position (liegt am Boden). */
    y = 345;

    /** @type {number} Höhe der Flasche in Pixel. */
    height = 80;

    /** @type {number} Breite der Flasche in Pixel. */
    width = 80;

    /**
     * @param {number} [baseX] - Basis-X-Position (siehe CollectableObject).
     */
    constructor(baseX) {
        super(baseX);
        this.loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    }
}
