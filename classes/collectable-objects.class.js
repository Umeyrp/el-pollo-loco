/**
 * Basisklasse für einsammelbare Objekte im Level (Münzen, Flaschen).
 * @extends DrawableObject
 */
class CollectableObject extends DrawableObject {
    /**
     * Hitbox-Offsets relativ zu x/y/width/height, für präzisere Kollisionsabfrage.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10,
    };

    /**
     * Setzt die X-Position basierend auf einer optionalen Basisposition plus
     * einem Zufallsversatz, damit Objekte nicht exakt übereinander liegen.
     * @param {number} [baseX] - Basis-X-Position. Ohne Angabe wird ein Zufallswert
     *                            zwischen 300 und 900 verwendet.
     */
    constructor(baseX) {
        super();
        this.x =
            baseX !== undefined
                ? baseX + Math.random() * 100
                : 300 + Math.random() * 600;
    }
}
