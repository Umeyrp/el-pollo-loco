class Character extends MovableObject {
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];

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

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

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

    height = 280;
    y = 155;
    GROUND_Y = 155;
    world;
    energy = 100;
    MAX_ENERGY = 100;
    bottles = 0;
    coins = 0;
    offset = {
        top: 115,
        right: 20,
        bottom: 10,
        left: 20,
    };
    isWalking;
    isSleeping = false;
    sleepingFrameIndex = 0;
    lastSleepingFrameTime = 0;
    statusInterval;
    buttonsInterval;

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

    animate() {
        this.checkButtonInterval();
        this.checkStatusInterval();
    }

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

    getMaxReachableX() {
        const endboss = this.world.endboss;
        if (endboss && !endboss.isDead()) {
            return Math.min(this.world.level.level_end_x, endboss.x - 40);
        }
        return this.world.level.level_end_x;
    }

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

    resetStatus() {
        this.resetSleepingState();
        this.stopWalkingSound();
    }

    stopWalkingSound() {
        if (this.isWalking) {
            Sound.CHARACTER_WALK.pause();
            this.isWalking = false;
        }
    }

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

    resetSleepingState() {
        Sound.CHARACTER_SNORE.pause();
        this.isSleeping = false;
        this.sleepingFrameIndex = 0;
        this.lastSleepingFrameTime = 0;
    }

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

    setCharacterAsleep() {
        if (!this.isSleeping) {
            this.isSleeping = true;
            this.sleepingFrameIndex = 0;
            this.lastSleepingFrameTime = Date.now();
            this.loadImage(this.IMAGES_SLEEPING[0]);
            return;
        }
    }

    jumpOnEnemy(enemy) {
        enemy.hit(100);
    }

    bottleHitEnemy(enemy) {
        enemy.hit(150);
    }

    playHurtSound() {
        Sound.playSound(Sound.CHARACTER_HURT);
    }
}
