/**
 * Controls the game world, including the character, enemies,
 * collisions, objects and rendering.
 */
class World {
    character = new Character();
    level = createLevel();
    endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    endbossHealthbarRevealed = false;

    /** @type {boolean} Whether a win/lose outro sequence is currently playing. */
    outroActive = false;

    /** @type {"win"|"lose"|null} Type of the currently playing outro. */
    outroType = null;

    /** @type {MovableObject|null} The entity (character or endboss) the outro focuses on. */
    outroSubject = null;

    /** @type {number} Timestamp (ms) when the current outro started. */
    outroStartTime = 0;

    /** @type {number} Total duration (ms) of the current outro sequence. */
    outroDuration = 0;

    healthBarCharacter = new HealthBar(
        this.character.energy,
        this.character.MAX_ENERGY,
    );

    healthBarEndboss = new HealthBar(
        this.endboss.energy,
        this.endboss.MAX_ENERGY,
        450,
        0,
        HealthBar.IMAGES_ENDBOSS,
    );

    coinBar = new CoinBar(START_COINS, MAX_COINS);
    bottleBar = new BottleBar(this.character.bottles, MAX_BOTTLES);

    /**
     * Initializes the game world and starts the game loop.
     *
     * @param {HTMLCanvasElement} canvas - Canvas used to render the game.
     * @param {Keyboard} keyboard - Keyboard input handler.
     */
    constructor(canvas, keyboard) {
        Sound.playSound(Sound.BACKGROUND_MUSIC);
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawWorld();
        this.linkWorldToCharacter();
        this.run();
    }

    /**
     * Starts the game loop and regularly checks the game state.
     */
    run() {
        setInterval(() => {
            this.checkGameOver();
            this.checkWin();
            this.checkCollisions();
            this.removeOutOfWindowBottles();
            if (!this.outroActive) {
                this.removeDeadEnemies();
            }
        }, 1000 / 60);
    }

    /**
     * Checks all types of collisions in the game.
     */
    checkCollisions() {
        this.checkCharacterEnemyCollisions();
        this.checkBottleCollisions();
        this.checkCollectableCollisions();
    }

    /**
     * Removes a bottle shortly after it hits an enemy.
     *
     * @param {number} bottleIndex - Index of the bottle to remove.
     */
    removeHitBottles(bottleIndex) {
        setTimeout(() => {
            this.level.thrownBottles.splice(bottleIndex, 1);
        }, 100);
    }

    /**
     * Displays endboss healthbar on sight
     */
    isEndbossVisible() {
        const canvasWidth = 720;
        const screenX = this.endboss.x + this.camera_x;
        return screenX + this.endboss.width > 0 && screenX < canvasWidth;
    }

    /**
     * Removes bottles that have left the playable area.
     */
    removeOutOfWindowBottles() {
        this.level.thrownBottles = this.level.thrownBottles.filter((bottle) => {
            return bottle.y <= 500;
        });
    }

    /**
     * Removes enemies that have been dead for more than 300 milliseconds.
     */
    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter((enemy) => {
            if (!enemy.isDead()) {
                return true;
            }
            return Date.now() - enemy.deadTime < 300;
        });
    }

    /**
     * Checks whether the character collides with an enemy and responds accordingly.
     *
     * @returns {void}
     */
    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (
                    !(enemy instanceof Endboss) &&
                    this.character.isAboveGround() &&
                    this.character.speedY < 0
                ) {
                    this.character.jumpOnEnemy(enemy);
                    let enemyTopHitbox = enemy.y + enemy.offset.top;
                    this.character.y =
                        enemyTopHitbox -
                        this.character.height +
                        this.character.offset.bottom;
                    this.character.jump();
                } else {
                    this.character.hit(20);
                    this.healthBarCharacter.setPercentage(
                        this.character.energy,
                    );
                }
            }
        });
    }

    /**
     * Checks whether thrown bottles hit any enemies.
     */
    checkBottleCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.level.thrownBottles.forEach((bottle, index) => {
                if (!bottle.splashed && bottle.isColliding(enemy)) {
                    Sound.playSound(Sound.BOTTLE_HIT);
                    bottle.splashed = true;
                    this.character.bottleHitEnemy(enemy);

                    if (enemy instanceof Endboss) {
                        this.healthBarEndboss.setPercentage(
                            this.endboss.energy,
                        );
                    }

                    this.removeHitBottles(index);
                }
            });
        });
    }

    /**
     * Checks whether the character collects coins or bottles.
     */
    checkCollectableCollisions() {
        this.level.collectableObjects.forEach((object, index) => {
            if (this.character.isColliding(object)) {
                if (object instanceof Coin) {
                    Sound.playSound(Sound.COLLECT_COIN);
                    this.level.collectableObjects.splice(index, 1);
                    this.character.coins += 1;
                    this.coinBar.setPercentage(this.character.coins);
                } else {
                    if (this.character.bottles < 5) {
                        Sound.playSound(Sound.COLLECT_BOTTLE);
                        this.level.collectableObjects.splice(index, 1);
                        this.character.bottles += 1;
                        this.bottleBar.setPercentage(this.character.bottles);
                    }
                }
            }
        });
    }

    /**
     * Gives the character access to the current game world.
     */
    linkWorldToCharacter() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Draws a moving object on the canvas and handles its direction.
     * While an outro sequence is active, the outro subject (dying character
     * or defeated endboss) is drawn spinning around its own center instead.
     *
     * @param {MovableObject} movingObject - Object to draw.
     */
    addToMap(movingObject) {
        if (this.outroActive && movingObject === this.outroSubject) {
            this.drawWithSpin(this.ctx, movingObject, this.computeSpinAngle());
            return;
        }

        if (movingObject.otherDirection) {
            this.flipImage(movingObject);
        }

        movingObject.draw(this.ctx);
        movingObject.drawFrame(this.ctx);

        if (movingObject.otherDirection) {
            this.flipImageBack(movingObject);
        }
    }

    /**
     * Draws multiple objects on the canvas.
     *
     * @param {MovableObject[]} objects - Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    /**
     * Clears and redraws the complete game world every animation frame.
     */
    drawWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.outroActive) {
            this.applyOutroZoom(this.ctx, this.getOutroProgress());
        }

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        // ----- Fixed Objects here ---- //
        this.addToMap(this.healthBarCharacter);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        if (this.isEndbossVisible()) {
            this.endbossHealthbarRevealed = true;
        }
        if (this.endbossHealthbarRevealed) {
            this.addToMap(this.healthBarEndboss);
        }
        // ----- Fixed Objects here ---- //

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.level.thrownBottles);

        this.ctx.translate(-this.camera_x, 0);

        if (this.outroActive) {
            const progress = this.getOutroProgress();
            this.applySlowMotion(progress);
            this.drawVignette(this.ctx, progress, this.outroType);
            this.ctx.restore();
        }

        let self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    /**
     * Flips a moving object horizontally before drawing it.
     *
     * @param {MovableObject} movingObject - Object to flip.
     */
    flipImage(movingObject) {
        this.ctx.save();
        this.ctx.translate(movingObject.width, 0);
        this.ctx.scale(-1, 1);
        movingObject.x = movingObject.x * -1;
    }

    /**
     * Restores the canvas after drawing a flipped object.
     *
     * @param {MovableObject} movingObject - Object that was flipped.
     */
    flipImageBack(movingObject) {
        movingObject.x = movingObject.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks whether the character has died and, if so, starts the losing
     * outro sequence exactly once.
     */
    checkGameOver() {
        if (this.character.isDead() && !this.outroActive) {
            this.startOutro("lose", this.character);
        }
    }

    /**
     * Checks whether the endboss has died and, if so, starts the winning
     * outro sequence exactly once.
     */
    checkWin() {
        if (this.endboss.isDead() && !this.outroActive) {
            this.startOutro("win", this.endboss);
        }
    }

    /**
     * Starts the win/lose outro sequence: freezes input/camera, spins the
     * subject, slows everything else down and fades in a vignette, then
     * shows the matching end screen once the sequence is over.
     *
     * @param {"win"|"lose"} type - Which outro to play.
     * @param {MovableObject} subject - The character (lose) or endboss (win)
     *                                   the camera/spin focuses on.
     * @returns {void}
     */
    startOutro(type, subject) {
        this.outroActive = true;
        this.outroType = type;
        this.outroSubject = subject;
        this.outroStartTime = Date.now();
        this.outroDuration = type === "lose" ? 2600 : 2200;
        Sound.stopAllSounds();

        if (type === "lose") {
            Sound.playSound(Sound.GAME_OVER);
        } else {
            Sound.playSound(Sound.GAME_WON);
        }

        setTimeout(() => {
            if (type === "lose") {
                showGameoverScreen();
            } else {
                showWinScreen();
            }
            clearAllIntervals();
        }, this.outroDuration);
    }

    /**
     * Current progress of the running outro sequence.
     * @returns {number} Value between 0 and 1 (0 = just started, 1 = finished).
     */
    getOutroProgress() {
        if (!this.outroActive) return 0;
        const elapsed = Date.now() - this.outroStartTime;
        return Math.min(elapsed / this.outroDuration, 1);
    }

    /**
     * Computes the current rotation (in degrees) of the outro subject: it
     * spins fast at first and eases into its final resting rotation.
     * @returns {number}
     */
    computeSpinAngle() {
        const progress = this.getOutroProgress();
        const totalRotations = this.outroType === "lose" ? 4 : 2.5;
        const eased = 1 - Math.pow(1 - progress, 3);
        return totalRotations * 360 * eased;
    }

    /**
     * Gradually slows down all enemies, clouds and flying bottles while the
     * outro is playing, creating a real slow-motion effect (not just visual).
     * @param {number} progress - Outro progress between 0 and 1.
     * @returns {void}
     */
    applySlowMotion(progress) {
        const scale = Math.max(1 - progress, 0.05);
        const objects = [
            ...this.level.enemies,
            ...this.level.clouds,
            ...this.level.thrownBottles,
        ];
        objects.forEach((object) => {
            if (object.baseSpeed === undefined) {
                object.baseSpeed = object.speed;
            }
            object.speed = object.baseSpeed * scale;
        });
    }

    /**
     * Applies a slow cinematic zoom towards the outro subject. Must always
     * be paired with a matching ctx.restore() once the frame is fully drawn.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} progress
     * @returns {void}
     */
    applyOutroZoom(ctx, progress) {
        const eased = 1 - Math.pow(1 - progress, 2);
        const scale = 1 + 0.18 * eased;
        const px =
            this.outroSubject.x + this.outroSubject.width / 2 + this.camera_x;
        const py = this.outroSubject.y + this.outroSubject.height / 2;

        ctx.save();
        ctx.translate(px, py);
        ctx.scale(scale, scale);
        ctx.translate(-px, -py);
    }

    /**
     * Draws a colored vignette over the whole canvas whose intensity grows
     * with the outro progress: reddish/dark when losing, warm/golden with a
     * final flash when winning.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} progress
     * @param {"win"|"lose"} type
     * @returns {void}
     */
    drawVignette(ctx, progress, type) {
        const w = 720;
        const h = 480;
        const cx = w / 2;
        const cy = h / 2;
        const maxRadius = Math.hypot(cx, cy);

        ctx.save();
        const gradient = ctx.createRadialGradient(
            cx,
            cy,
            maxRadius * (0.15 + 0.1 * progress),
            cx,
            cy,
            maxRadius,
        );

        if (type === "lose") {
            gradient.addColorStop(0, "rgba(20,0,0,0)");
            gradient.addColorStop(1, `rgba(15,0,0,${0.15 + 0.7 * progress})`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
        } else {
            gradient.addColorStop(0, `rgba(255,230,140,${0.25 * progress})`);
            gradient.addColorStop(1, `rgba(40,20,0,${0.1 + 0.55 * progress})`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);

            if (progress > 0.7) {
                const flash = (progress - 0.7) / 0.3;
                ctx.fillStyle = `rgba(255,255,220,${0.5 * flash})`;
                ctx.fillRect(0, 0, w, h);
            }
        }
        ctx.restore();
    }

    /**
     * Draws the outro subject (dying character or endboss) rotating around
     * its own center — used during the win/lose sequence.
     * @param {CanvasRenderingContext2D} ctx
     * @param {MovableObject} object
     * @param {number} angleDeg
     * @returns {void}
     */
    drawWithSpin(ctx, object, angleDeg) {
        const cx = object.x + object.width / 2;
        const cy = object.y + object.height / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((angleDeg * Math.PI) / 180);
        ctx.translate(-cx, -cy);

        if (object.otherDirection) {
            this.flipImage(object);
        }
        object.draw(ctx);
        object.drawFrame(ctx);
        if (object.otherDirection) {
            this.flipImageBack(object);
        }

        ctx.restore();
    }
}
