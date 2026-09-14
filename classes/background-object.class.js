/**
 * Repräsentiert ein statisches Hintergrund-Layer-Bild (z.B. Himmel, Berge, Boden).
 * Wird typischerweise mehrfach nebeneinander instanziiert, um den Level-Hintergrund
 * lückenlos zu kacheln (Parallax-Layer).
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** @type {number} Breite des Hintergrundbilds in Pixel. */
    width = 720;

    /** @type {number} Höhe des Hintergrundbilds in Pixel. */
    height = 480;

    /**
     * @param {string} imagePath - Pfad zum Hintergrundbild.
     * @param {number} x - Horizontale Startposition des Layers.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
