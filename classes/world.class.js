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

    healthBarCharacter = new HealthBar(
        this.character.energy,
        this.character.MAX_ENERGY,
    );

    healthBarEndboss = new HealthBar(
        this.endboss.energy,
        this.endboss.MAX_ENERGY,
        this.endboss.x + 55,
        undefined,
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
            this.moveEndbossHealthbar();
            this.checkCollisions();
            this.removeOutOfWindowBottles();
            this.removeDeadEnemies();
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
     * Updates the position of the endboss health bar.
     */
    moveEndbossHealthbar() {
        this.healthBarEndboss.x = this.endboss.x + 55;
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
    }

    /**
     * Draws a moving object on the canvas and handles its direction.
     *
     * @param {MovableObject} movingObject - Object to draw.
     */
    addToMap(movingObject) {
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
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.healthBarEndboss);

        this.ctx.translate(-this.camera_x, 0);

        // ----- Fixed Objects here ---- //
        this.addToMap(this.healthBarCharacter);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        // ----- Fixed Objects here ---- //

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.thrownBottles);

        this.ctx.translate(-this.camera_x, 0);

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
     * Checks whether the character has died and shows the game-over screen.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            setTimeout(() => {
                showGameoverScreen();
                Sound.stopAllSounds();
                clearAllIntervals();
            }, 1000);
        }
    }

    /**
     * Checks whether the endboss has died and shows the win screen.
     */
    checkWin() {
        if (this.endboss.isDead()) {
            setTimeout(() => {
                showWinScreen();
                Sound.stopAllSounds();
                clearAllIntervals();
            }, 1000);
        }
    }
}
