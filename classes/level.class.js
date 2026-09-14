/**
 * Combines all objects in a game level: enemies, clouds, background objects,
 * thrown bottles, and collectable objects.
 */
class Level {
    /** @type {MovableObject[]} All enemies in the level (Chicken, Chick, Endboss). */
    enemies;

    /** @type {Cloud[]} All cloud objects in the level. */
    clouds;

    /** @type {BackgroundObject[]} All background-layer objects in the level. */
    backgroundObjects;

    /** @type {ThrowableObject[]} Bottles currently flying after being thrown by the character. */
    thrownBottles;

    /** @type {CollectableObject[]} Collectable objects (coins and bottles) in the level. */
    collectableObjects;

    /** @type {number} X position at which the level is considered complete. */
    level_end_x = 1500;

    /**
     * @param {MovableObject[]} enemies - Enemies in the level.
     * @param {Cloud[]} clouds - Cloud objects in the level.
     * @param {BackgroundObject[]} backgroundObjects - Background-layer objects.
     * @param {ThrowableObject[]} thrownBottles - Initial (usually empty) list of thrown bottles.
     * @param {CollectableObject[]} collectableObjects - Collectable objects in the level.
     */
    constructor(
        enemies,
        clouds,
        backgroundObjects,
        thrownBottles,
        collectableObjects,
    ) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.thrownBottles = thrownBottles;
        this.collectableObjects = collectableObjects;
    }
}
