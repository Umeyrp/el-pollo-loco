/**
 * Die vom Spieler gesteuerte Spielfigur (Pepe). Kümmert sich um Bewegung,
 * Sprung, Flaschenwurf, Kollisionsreaktionen und alle Animationszustände
 * (Laufen, Springen, Verletzt, Tot, Schlafen).
 * @extends MovableObject
 */
class Character extends MovableObject {
    /** @type {string[]} Bildpfade der Lauf-Animation. */
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];

    /** @type {string[]} Bildpfade der Sprung-Animation. */
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

    /** @type {string[]} Bildpfade der Tod-Animation. */
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    /** @type {string[]} Bildpfade der Verletzt-Animation. */
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

    /**
     * Bildpfade der Schlaf-Animation. Die ersten 10 Bilder sind die
     * "Einschlaf"-Sequenz, die restlichen 10 Bilder werden als Loop
     * für den Tiefschlaf wiederholt (siehe playSleepingAnimation).
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

    /** @type {number} Höhe des Charakters in Pixel. */
    height = 280;

    /** @type {number} Aktuelle Y-Position. */
    y = 155;

    /** @type {number} Y-Position, die als "Boden" für den Charakter gilt. */
    GROUND_Y = 155;

    /** @type {World} Referenz auf die World-Instanz (für Keyboard-Zugriff etc.), wird von außen gesetzt. */
    world;

    /** @type {number} Aktuelle Energie/Lebenspunkte. */
    energy = 100;

    /** @type {number} Maximale Energie/Lebenspunkte. */
    MAX_ENERGY = 100;

    /** @type {number} Anzahl der aktuell verfügbaren Wurfflaschen. */
    bottles = 0;

    /** @type {number} Anzahl der gesammelten Münzen. */
    coins = 0;

    /**
     * Hitbox-Offsets des Charakters.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 115,
        right: 20,
        bottom: 10,
        left: 20,
    };

    /** @type {boolean} Ob aktuell die Lauf-Sound-Schleife aktiv ist. */
    isWalking;

    /** @type {boolean} Ob der Charakter sich aktuell im Schlaf-Zustand befindet. */
    isSleeping = false;

    /** @type {number} Index des aktuellen Frames innerhalb von IMAGES_SLEEPING. */
    sleepingFrameIndex = 0;

    /** @type {number} Zeitstempel (ms) des zuletzt gewechselten Schlaf-Frames. */
    lastSleepingFrameTime = 0;

    /** @type {number} Intervall-ID der Status-/Animationsschleife (checkStatusInterval). */
    statusInterval;

    /** @type {number} Intervall-ID der Tastatur-Abfrageschleife (checkButtonInterval). */
    buttonsInterval;

    /**
     * Lädt alle Animationsbilder, startet die Schwerkraft und die
     * Eingabe-/Statusschleifen.
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
     * Startet die beiden Kernschleifen: Tastatureingaben und Statusanimation.
     * @returns {void}
     */
    animate() {
        this.checkButtonInterval();
        this.checkStatusInterval();
    }

    /**
     * Fragt 60x pro Sekunde die Tastatur ab und löst entsprechend Bewegung,
     * Sprung oder Flaschenwurf aus. Aktualisiert außerdem die Kameraposition.
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
     * Ermittelt die maximale X-Position, die der Charakter erreichen darf.
     * Solange der Endboss lebt, wird verhindert, dass der Charakter in ihn
     * hineinläuft (Begrenzung 40px vor dem Endboss).
     * @returns {number} Maximal erlaubte X-Position.
     */
    getMaxReachableX() {
        const endboss = this.world.endboss;
        if (endboss && !endboss.isDead()) {
            return Math.min(this.world.level.level_end_x, endboss.x - 40);
        }
        return this.world.level.level_end_x;
    }

    /**
     * Fragt 20x pro Sekunde den Zustand des Charakters ab (tot, verletzt,
     * in der Luft, läuft, oder inaktiv) und spielt die jeweils passende
     * Animation bzw. den passenden Sound.
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
     * Setzt den Schlaf-Zustand zurück und stoppt den Lauf-Sound.
     * Sammel-Helfer für Zustände, in denen der Charakter definitiv nicht schläft/läuft.
     * @returns {void}
     */
    resetStatus() {
        this.resetSleepingState();
        this.stopWalkingSound();
    }

    /**
     * Pausiert den Lauf-Sound, falls er aktuell läuft.
     * @returns {void}
     */
    stopWalkingSound() {
        if (this.isWalking) {
            Sound.CHARACTER_WALK.pause();
            this.isWalking = false;
        }
    }

    /**
     * Wirft eine Flasche, sofern noch mindestens eine verfügbar ist und der
     * Wurf-Cooldown (1000ms) abgelaufen ist. Erzeugt ein ThrowableObject,
     * verringert den Flaschenbestand und aktualisiert die BottleBar.
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
     * Setzt den Schlaf-Zustand zurück (z.B. bei Eingabe) und pausiert
     * den Schnarch-Sound.
     * @returns {void}
     */
    resetSleepingState() {
        Sound.CHARACTER_SNORE.pause();
        this.isSleeping = false;
        this.sleepingFrameIndex = 0;
        this.lastSleepingFrameTime = 0;
    }

    /**
     * Spielt die Schlaf-Animation ab: Zeigt alle 1000ms den nächsten Frame.
     * Ab Erreichen der letzten 10 Frames wird in eine Endlosschleife
     * gesprungen und der Schnarch-Sound gestartet.
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
     * Initialisiert den Schlaf-Zustand einmalig (erster Frame), wenn der
     * Charakter noch nicht als schlafend markiert ist.
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
     * Reaktion, wenn der Charakter von oben auf einen Gegner springt.
     * @param {MovableObject} enemy - Der getroffene Gegner.
     * @returns {void}
     */
    jumpOnEnemy(enemy) {
        enemy.hit(100);
    }

    /**
     * Reaktion, wenn eine geworfene Flasche einen Gegner trifft.
     * @param {MovableObject} enemy - Der getroffene Gegner.
     * @returns {void}
     */
    bottleHitEnemy(enemy) {
        enemy.hit(150);
    }

    /**
     * Spielt den Sound, der abgespielt wird, wenn der Charakter Schaden nimmt.
     * @returns {void}
     */
    playHurtSound() {
        Sound.playSound(Sound.CHARACTER_HURT);
    }
}
