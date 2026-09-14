/**
 * A normal-sized, walking chicken enemy.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    /** @type {number} Fixed Y position (standing on the ground). */
    y = 370;

    /** @type {number} Height in pixels. */
    height = 60;

    /** @type {number} Width in pixels. */
    width = 80;

    /** @type {number} Energy/health points of the chicken. */
    energy = 200;

    /** @type {number} Timestamp (ms) of the time of death; 0 while alive. */
    deadTime = 0;

    /** @type {string[]} Image paths for the walking animation. */
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    /** @type {string[]} Image path(s) for the death animation. */
    IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    /**
     * Hitbox offsets for the chicken.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };

    /**
     * @param {number} baseX - Base X position; the actual position also receives
     *                          a random offset of 0–80px.
     */
    constructor(baseX) {
        super().loadImage(
            "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        );
        this.x = baseX + Math.random() * 80;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.speed = 0.35 + Math.random() * 0.25;
    }

    /**
     * Starts movement (walking left while alive) and the appropriate animation
     * (walking or death animation).
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
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    /**
     * Plays the sound used when this enemy type dies.
     * @returns {void}
     */
    playHurtSound() {
        Sound.playSound(Sound.CHICKEN_DEAD);
    }
}
