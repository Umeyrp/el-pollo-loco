/**
 * The player-controlled character (Pepe). Handles movement, jumping, bottle
 * throwing, collision responses, and all animation states (walking, jumping,
 * hurt, dead, and sleeping).
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {string[]} Image paths for the walking animation. */
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];

    /** @type {string[]} Image paths for the jumping animation. */
    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    /** @type {string[]} Image paths for the death animation. */
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    /** @type {string[]} Image paths for the hurt animation. */
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

    /**
     * Image paths for the sleeping animation. The first 10 images form the
     * falling-asleep sequence; the remaining 10 loop during deep sleep
     * (see playSleepingAnimation).
     * @type {string[]}
     */
    IMAGES_SLEEPING = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    /** @type {number} Height of the character in pixels. */
    height = 280;

    /** @type {number} Current Y position. */
    y = 155;

    /** @type {number} Y position considered the ground for the character. */
    GROUND_Y = 155;

    /** @type {World} Reference to the World instance (for keyboard access, etc.), set externally. */
    world;

    /** @type {number} Current energy/health points. */
    energy = 100;

    /** @type {number} Maximum energy/health points. */
    MAX_ENERGY = 100;

    /** @type {number} Number of throwable bottles currently available. */
    bottles = 0;

    /** @type {number} Number of collected coins. */
    coins = 0;

    /**
     * Hitbox offsets for the character.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 115,
        right: 20,
        bottom: 10,
        left: 20,
    };

    /** @type {boolean} Whether the walking sound loop is currently active. */
    isWalking;

    /** @type {boolean} Whether the character is currently sleeping. */
    isSleeping = false;

    /** @type {number} Index of the current frame within IMAGES_SLEEPING. */
    sleepingFrameIndex = 0;

    /** @type {number} Timestamp (ms) of the last changed sleeping frame. */
    lastSleepingFrameTime = 0;

    /** @type {number} Interval ID for the status/animation loop (checkStatusInterval). */
    statusInterval;

    /** @type {number} Interval ID for the keyboard polling loop (checkButtonInterval). */
    buttonsInterval;

    /**
     * Loads all animation images and starts gravity as well as the input and
     * status loops.
     */
    constructor() {
        super();
        this.loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.speed = 5;
    }

    /**
     * Starts the two core loops: keyboard input and status animation.
     * @returns {void}
     */
    animate() {
        this.checkButtonInterval();
        this.checkStatusInterval();
    }

    /**
     * Polls the keyboard 60 times per second and triggers movement, jumping,
     * or bottle throwing accordingly. It also updates the camera position.
     * @returns {void}
     */
    checkButtonInterval() {
        this.buttonsInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.getMaxReachableX()) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                Sound.playSound(Sound.CHARACTER_JUMP);
                this.resetSleepingState();
            }

            if (this.world.keyboard.DOWN) {
                this.throwBottle();
                this.resetSleepingState();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Determines the maximum X position the character may reach. As long as
     * the final boss is alive, it prevents the character from walking into it
     * (limited to 40px before the final boss).
     * @returns {number} Maximum permitted X position.
     */
    getMaxReachableX() {
        const endboss = this.world.endboss;
        if (endboss && !endboss.isDead()) {
            return Math.min(this.world.level.level_end_x, endboss.x - 40);
        }
        return this.world.level.level_end_x;
    }

    /**
     * Checks the character's state 20 times per second (dead, hurt, in the
     * air, walking, or idle) and plays the matching animation or sound.
     * @returns {void}
     */
    checkStatusInterval() {
        this.statusInterval = setInterval(() => {
            if (this.isDead()) {
                this.resetStatus();
                this.playAnimation(this.IMAGES_DEAD);
                Sound.playSound(Sound.CHARACTER_DEAD);
                clearInterval(this.buttonsInterval);
                clearInterval(this.statusInterval);
            } else if (this.isHurt()) {
                this.resetSleepingState();
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.resetStatus();
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.resetSleepingState();
                this.playAnimation(this.IMAGES_WALKING);
                if (!this.isWalking) {
                    Sound.playSound(Sound.CHARACTER_WALK);
                    this.isWalking = true;
                }
            } else {
                this.stopWalkingSound();
                this.playSleepingAnimation();
            }
        }, 50);
    }

    /**
     * Resets the sleeping state and stops the walking sound. Shared helper for
     * states in which the character is definitely not sleeping or walking.
     * @returns {void}
     */
    resetStatus() {
        this.resetSleepingState();
        this.stopWalkingSound();
    }

    /**
     * Pauses the walking sound if it is currently playing.
     * @returns {void}
     */
    stopWalkingSound() {
        if (this.isWalking) {
            Sound.CHARACTER_WALK.pause();
            this.isWalking = false;
        }
    }

    /**
     * Throws a bottle if at least one is available and the throw cooldown
     * (1000ms) has elapsed. Creates a ThrowableObject, reduces the bottle
     * count, and updates the BottleBar.
     * @returns {void}
     */
    throwBottle() {
        if (this.bottles <= 0) return;
        if (Date.now() - this.lastThrow < 1000) return;
        Sound.playSound(Sound.BOTTLE_THROW);
        this.lastThrow = Date.now();
        let bottle = new ThrowableObject(
            this.x + 30,
            this.y + 150,
            this.otherDirection,
        );
        this.world.level.thrownBottles.push(bottle);
        this.bottles -= 1;
        this.world.bottleBar.setPercentage(this.bottles);
    }

    /**
     * Resets the sleeping state (e.g., on input) and pauses the snoring sound.
     * @returns {void}
     */
    resetSleepingState() {
        Sound.CHARACTER_SNORE.pause();
        this.isSleeping = false;
        this.sleepingFrameIndex = 0;
        this.lastSleepingFrameTime = 0;
    }

    /**
     * Plays the sleeping animation by showing the next frame every 1000ms.
     * Once the final 10 frames are reached, it enters an infinite loop and
     * starts the snoring sound.
     * @returns {void}
     */
    playSleepingAnimation() {
        this.setCharacterAsleep();
        const now = Date.now();
        if (now - this.lastSleepingFrameTime >= 1000) {
            this.sleepingFrameIndex++;
            const loopStart = this.IMAGES_SLEEPING.length - 10;
            if (this.sleepingFrameIndex == loopStart) {
                Sound.playSound(Sound.CHARACTER_SNORE);
            }
            if (this.sleepingFrameIndex >= this.IMAGES_SLEEPING.length) {
                this.sleepingFrameIndex = loopStart;
            }
            this.loadImage(this.IMAGES_SLEEPING[this.sleepingFrameIndex]);
            this.lastSleepingFrameTime = now;
        }
    }

    /**
     * Initializes the sleeping state once (first frame) if the character is
     * not yet marked as sleeping.
     * @returns {void}
     */
    setCharacterAsleep() {
        if (!this.isSleeping) {
            this.isSleeping = true;
            this.sleepingFrameIndex = 0;
            this.lastSleepingFrameTime = Date.now();
            this.loadImage(this.IMAGES_SLEEPING[0]);
            return;
        }
    }

    /**
     * Responds when the character jumps onto an enemy from above.
     * @param {MovableObject} enemy - The enemy that was hit.
     * @returns {void}
     */
    jumpOnEnemy(enemy) {
        enemy.hit(100);
    }

    /**
     * Responds when a thrown bottle hits an enemy.
     * @param {MovableObject} enemy - The enemy that was hit.
     * @returns {void}
     */
    bottleHitEnemy(enemy) {
        enemy.hit(150);
    }

    /**
     * Plays the sound used when the character takes damage.
     * @returns {void}
     */
    playHurtSound() {
        Sound.playSound(Sound.CHARACTER_HURT);
    }
}
