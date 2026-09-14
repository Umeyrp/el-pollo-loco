/**
 * Eine vom Charakter geworfene Flasche. Fliegt mit fester Beschleunigung
 * im Bogen und wechselt beim Bodenkontakt (oder Gegnertreffer) in die
 * "Splash"-Animation.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /** @type {string[]} Bildpfade der Flugrotation der Flasche. */
    IMAGES_FLYING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    /** @type {string[]} Bildpfade der Zerplatz-Animation der Flasche. */
    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    /**
     * Hitbox-Offsets der Flasche.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10,
    };

    /** @type {number} Fallbeschleunigung der Flasche (überschreibt MovableObject-Wert). */
    acceleration = 1.6;

    /** @type {number} Anfangsgeschwindigkeit nach oben beim Wurf. */
    speedY = 25;

    /** @type {boolean} Ob die Flasche bereits aufgeschlagen ist / zerplatzt (Splash-Animation). */
    splashed = false;

    /**
     * @param {number} x - Startposition X (in der Regel Position des Charakters).
     * @param {number} y - Startposition Y (in der Regel Position des Charakters).
     * @param {boolean} otherDirection - Wurfrichtung: true = nach links, false = nach rechts.
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;
        this.applyGravity();
        this.throw();
        this.animate();
        this.checkThrownBottlesHitGround();
    }

    /**
     * Prüft fortlaufend, ob die Flasche den Boden erreicht hat, und markiert
     * sie in diesem Fall als "splashed" sowie spielt den Aufprall-Sound.
     * @returns {void}
     */
    checkThrownBottlesHitGround() {
        setInterval(() => {
            if (!this.splashed && this.y >= 300) {
                this.splashed = true;
                Sound.playSound(Sound.BOTTLE_HIT);
            }
        }, 1000 / 25);
    }

    /**
     * Spielt je nach Zustand (fliegend oder zerplatzt) die passende Animation.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (!this.splashed) {
                this.playAnimation(this.IMAGES_FLYING);
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 1000 / 15);
    }

    /**
     * Bewegt die Flasche horizontal in die Wurfrichtung.
     * @returns {void}
     */
    throw() {
        setInterval(() => {
            this.x += this.otherDirection ? -18 : 18;
        }, 1000 / 30);
    }
}
