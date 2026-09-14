/**
 * A bottle thrown by the character. It flies in an arc with constant
 * acceleration and switches to the
 * splash animation when it touches the ground or hits an enemy.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /** @type {string[]} Image paths for the bottle's flying rotation. */
    IMAGES_FLYING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    /** @type {string[]} Image paths for the bottle's splash animation. */
    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    /**
     * Hitbox offsets for the bottle.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10,
    };

    /** @type {number} Bottle falling acceleration (overrides the MovableObject value). */
    acceleration = 1.6;

    /** @type {number} Initial upward speed when thrown. */
    speedY = 25;

    /** @type {boolean} Whether the bottle has already hit something or splashed (splash animation). */
    splashed = false;

    /**
     * @param {number} x - Initial X position (usually the character's position).
     * @param {number} y - Initial Y position (usually the character's position).
     * @param {boolean} otherDirection - Throw direction: true = left, false = right.
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
     * Continuously checks whether the bottle has reached the ground and, when
     * it has, marks it as "splashed" and plays the impact sound.
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
     * Plays the appropriate animation based on the state (flying or splashed).
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
     * Moves the bottle horizontally in the throw direction.
     * @returns {void}
     */
    throw() {
        setInterval(() => {
            this.x += this.otherDirection ? -18 : 18;
        }, 1000 / 30);
    }
}
