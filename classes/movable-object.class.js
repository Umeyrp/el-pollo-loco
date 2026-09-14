/**
 * Extends DrawableObject with movement, physics (gravity), collision detection,
 * and the generic hit mechanism (taking damage).
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** @type {number} Movement speed in pixels per frame. */
    speed = 0.15;

    /** @type {boolean} Whether the object is drawn mirrored horizontally (facing left). */
    otherDirection = false;

    /** @type {number} Current vertical speed (for jumping/falling). */
    speedY = 0;

    /** @type {number} Value by which gravity reduces speedY per tick. */
    acceleration = 2.5;

    /** @type {number} Timestamp (ms) of the last received hit, for the hurt cooldown. */
    lastHit = 0;

    /**
     * Starts a recurring gravity simulation (60 times per second).
     * Raises or lowers the object based on speedY and acceleration.
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this instanceof Character && this.y - this.speedY > 155) {
                    this.y = this.GROUND_Y;
                } else {
                    this.y -= this.speedY;
                }
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 60);
    }

    /**
     * Checks whether the object is above the ground.
     * ThrowableObject is always considered above the ground (it continually flies/falls).
     * @returns {boolean} true if the object is in the air.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < this.GROUND_Y;
    }

    /**
     * Sets the current image based on the animation frame index and increments the counter.
     * @param {string[]} images - Array of animation image paths.
     * @returns {number} The index of the frame actually displayed.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        return i;
    }

    /**
     * Triggers a jump by setting the vertical speed.
     * @returns {void}
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Moves the object right by "speed".
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object left by "speed".
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Checks whether this object collides with another MovableObject, taking
     * hitbox offsets into account.
     * @param {MovableObject} mo - The other object to check against.
     * @returns {boolean} true if the hitboxes overlap.
     */
    isColliding(mo) {
        return (
            this.x +
                this.offset.left +
                this.width -
                this.offset.right -
                this.offset.left >
                mo.x + mo.offset.left &&
            this.y +
                this.offset.top +
                this.height -
                this.offset.top -
                this.offset.bottom >
                mo.y + mo.offset.top &&
            this.x + this.offset.left <
                mo.x +
                    mo.offset.left +
                    mo.width -
                    mo.offset.left -
                    mo.offset.right &&
            this.y + this.offset.top <
                mo.y +
                    mo.offset.top +
                    mo.height -
                    mo.offset.top -
                    mo.offset.bottom
        );
    }

    /**
     * Damages the object if the hurt cooldown (350ms) has elapsed.
     * Plays the hurt sound and explicitly sets energy to 0 on death.
     * @param {number} damage - Amount of damage to subtract.
     * @returns {void}
     */
    hit(damage) {
        if (Date.now() - this.lastHit < 350) return;
        this.lastHit = Date.now();
        if (!this.isDead()) {
            this.playHurtSound();
            this.energy -= damage;
            if (this.isDead()) {
                this.deadTime = Date.now();
                this.energy = 0;
            }
        }
    }

    /**
     * Checks whether the last hit occurred less than 0.5 seconds ago.
     * @returns {boolean} true while the hurt animation should be shown.
     */
    isHurt() {
        let timepassed = Date.now() - this.lastHit;
        let seconds = timepassed / 1000;
        return seconds < 0.5;
    }

    /**
     * Checks whether the object's energy is depleted.
     * @returns {boolean} true if energy is less than or equal to 0.
     */
    isDead() {
        return this.energy <= 0;
    }
}
