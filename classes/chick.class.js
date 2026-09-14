/**
 * Ein kleines, laufendes Küken-Gegnerobjekt (schneller, aber weniger Energie als Chicken).
 * @extends MovableObject
 */
class Chick extends MovableObject {
    /** @type {number} Feste Y-Position (steht auf dem Boden). */
    y = 375;

    /** @type {number} Höhe in Pixel. */
    height = 40;

    /** @type {number} Breite in Pixel. */
    width = 40;

    /** @type {number} Energie/Lebenspunkte des Kükens. */
    energy = 100;

    /** @type {number} Zeitstempel (ms) des Todeszeitpunkts, 0 solange lebend. */
    deadTime = 0;

    /** @type {string[]} Bildpfade der Lauf-Animation. */
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    /** @type {string[]} Bildpfad(e) der Tod-Animation. */
    IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    /**
     * Hitbox-Offsets des Kükens.
     * @type {{top: number, right: number, bottom: number, left: number}}
     */
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };

    /**
     * @param {number} baseX - Basis-X-Position; die tatsächliche Position erhält
     *                          zusätzlich einen Zufallsversatz von 0-80px.
     */
    constructor(baseX) {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.x = baseX + Math.random() * 80;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 0.8 + Math.random() * 0.25;
    }

    /**
     * Startet Bewegung (Laufen nach links, solange lebend) und die passende
     * Animation (Lauf- bzw. Tod-Animation).
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
     * Spielt den Sound, der beim Tod dieses Gegnertyps abgespielt wird.
     * @returns {void}
     */
    playHurtSound() {
        Sound.playSound(Sound.CHICK_DEAD);
    }
}
