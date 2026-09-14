/**
 * Base class for collectable objects in the level (coins and bottles).
 * @extends DrawableObject
 */
class CollectableObject extends DrawableObject {
    /**
     * Hitbox offsets relative to x/y/width/height for more precise collision detection.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10,
    };

    /**
     * Sets the X position based on an optional base position plus a random offset,
     * so objects do not overlap exactly.
     * @param {number} [baseX] - Base X position. If omitted, a random value
     *                            between 300 and 900 is used.
     */
    constructor(baseX) {
        super();
        this.x =
            baseX !== undefined
                ? baseX + Math.random() * 100
                : 300 + Math.random() * 600;
    }
}
