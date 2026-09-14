/**
 * Der Endgegner des Levels. Läuft konstant nach links, bis er stirbt.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /** @type {number} Höhe in Pixel. */
    height = 500;

    /** @type {number} Breite in Pixel. */
    width = 300;

    /** @type {number} Feste Y-Startposition. */
    y = -20;

    /** @type {number} X-Startposition am Levelende. */
    x = 1800;

    /** @type {number} Aktuelle Energie/Lebenspunkte. */
    energy = 750;

    /** @type {number} Maximale Energie/Lebenspunkte. */
    MAX_ENERGY = 750;

    /**
     * Hitbox-Offsets des Endbosses.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 90,
        right: 10,
        bottom: 20,
        left: 20,
    };

    /** @type {string[]} Bildpfade der Lauf-Animation. */
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    /** @type {string[]} Bildpfade der Verletzt-Animation. */
    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    /** @type {string[]} Bildpfade der Tod-Animation. */
    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    /**
     * Lädt alle Animationsbilder, setzt eine zufällige Laufgeschwindigkeit
     * und startet die Animation.
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
     * Startet Bewegung (Laufen nach links, solange lebend) sowie die passende
     * Animation je nach Zustand (Tod, verletzt, laufend).
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
     * Spielt den Sound, der beim Treffer/Tod des Endbosses abgespielt wird.
     * @returns {void}
     */
    playHurtSound() {
        Sound.playSound(Sound.CHICKEN_DEAD);
    }
}
