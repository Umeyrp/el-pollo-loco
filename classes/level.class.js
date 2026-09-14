/**
 * Fasst alle Objekte eines Spiellevels zusammen: Gegner, Wolken,
 * Hintergrundobjekte, geworfene Flaschen und einsammelbare Objekte.
 */
class Level {
    /** @type {MovableObject[]} Alle Gegner des Levels (Chicken, Chick, Endboss). */
    enemies;

    /** @type {Cloud[]} Alle Wolken-Objekte des Levels. */
    clouds;

    /** @type {BackgroundObject[]} Alle Hintergrund-Layer-Objekte des Levels. */
    backgroundObjects;

    /** @type {ThrowableObject[]} Aktuell fliegende, vom Charakter geworfene Flaschen. */
    thrownBottles;

    /** @type {CollectableObject[]} Einsammelbare Objekte (Münzen, Flaschen) im Level. */
    collectableObjects;

    /** @type {number} X-Position, an der das Level als "beendet" gilt. */
    level_end_x = 1500;

    /**
     * @param {MovableObject[]} enemies - Gegner des Levels.
     * @param {Cloud[]} clouds - Wolken-Objekte des Levels.
     * @param {BackgroundObject[]} backgroundObjects - Hintergrund-Layer-Objekte.
     * @param {ThrowableObject[]} thrownBottles - Initiale (meist leere) Liste geworfener Flaschen.
     * @param {CollectableObject[]} collectableObjects - Einsammelbare Objekte des Levels.
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
