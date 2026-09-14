/**
 * Eine Wolke, die sich kontinuierlich langsam nach links bewegt (Hintergrund-Deko).
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} Feste Y-Position der Wolke. */
    y = 20;

    /** @type {number} Höhe der Wolke in Pixel. */
    height = 250;

    /** @type {number} Breite der Wolke in Pixel. */
    width = 500;

    /** @type {number} Bewegungsgeschwindigkeit der Wolke in Pixel pro Frame. */
    speed = 0.15;

    /**
     * Erzeugt eine Wolke an einer zufälligen X-Position und startet die Bewegung.
     */
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Startet die Animation/Bewegung der Wolke.
     * @returns {void}
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Bewegt die Wolke fortlaufend (60x pro Sekunde) nach links.
     * @returns {void}
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
