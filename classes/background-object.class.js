/**
 * Represents a static background-layer image (e.g., sky, mountains, or ground).
 * It is typically instantiated several times side by side to tile the level
 * background seamlessly (parallax layer).
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** @type {number} Width of the background image in pixels. */
    width = 720;

    /** @type {number} Height of the background image in pixels. */
    height = 480;

    /**
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Initial horizontal position of the layer.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
