/**
 * A cloud that continuously moves slowly to the left (background decoration).
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} Fixed Y position of the cloud. */
    y = 20;

    /** @type {number} Height of the cloud in pixels. */
    height = 250;

    /** @type {number} Width of the cloud in pixels. */
    width = 500;

    /** @type {number} Cloud movement speed in pixels per frame. */
    speed = 0.15;

    /**
     * Creates a cloud at a random X position and starts its movement.
     */
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Starts the cloud's animation and movement.
     * @returns {void}
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud continuously to the left (60 times per second).
     * @returns {void}
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
