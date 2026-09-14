/**
 * The level's final boss. It constantly walks left until it dies.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /** @type {number} Height in pixels. */
    height = 500;

    /** @type {number} Width in pixels. */
    width = 300;

    /** @type {number} Fixed initial Y position. */
    y = -20;

    /** @type {number} Initial X position at the end of the level. */
    x = 1800;

    /** @type {number} Current energy/health points. */
    energy = 750;

    /** @type {number} Maximum energy/health points. */
    MAX_ENERGY = 750;

    /**
     * Hitbox offsets for the final boss.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 90,
        right: 10,
        bottom: 20,
        left: 20,
    };

    /** @type {string[]} Image paths for the walking animation. */
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    /** @type {string[]} Image paths for the hurt animation. */
    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    /** @type {string[]} Image paths for the death animation. */
    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    /**
     * Loads all animation images, sets a random walking speed, and starts
     * the animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.75 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Starts movement (walking left while alive) and the appropriate animation
     * for the current state (dead, hurt, or walking).
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) return;
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * Plays the sound used when the final boss is hit or dies.
     * @returns {void}
     */
    playHurtSound() {
        Sound.playSound(Sound.CHICKEN_DEAD);
    }
}
