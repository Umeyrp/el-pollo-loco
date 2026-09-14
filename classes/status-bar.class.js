/**
 * Base class for all status displays (health, coins, and bottles).
 * Selects the matching bar image based on a percentage value.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /** @type {number} Width of the status bar in pixels. */
    width = 200;

    /** @type {number} Height of the status bar in pixels. */
    height = 60;

    /** @type {number} Current status bar value (e.g., energy, coins, or bottles). */
    percentage;

    /** @type {number} Maximum value to which "percentage" refers. */
    MAX_PERCENTAGE;

    /** @type {string[]} Array of image paths for the different fill levels. */
    images;

    /** @type {number} X position of the status bar. */
    x;

    /** @type {number} Y position of the status bar. */
    y;

    /**
     * @param {string} path - Path to the image shown initially.
     * @param {number} percentage - Initial value of the status bar.
     * @param {number} MAX_PERCENTAGE - Maximum value of the status bar.
     * @param {number} x - X position.
     * @param {number} y - Y position.
     * @param {string[]} images - Image paths for the 6 fill levels (0/20/40/60/80/100).
     */
    constructor(path, percentage, MAX_PERCENTAGE, x, y, images) {
        super();
        this.images = images;
        this.loadImage(path);
        this.loadImages(this.images);
        this.y = y;
        this.x = x;
        this.percentage = percentage;
        this.MAX_PERCENTAGE = MAX_PERCENTAGE;
        this.setPercentage(percentage);
    }

    /**
     * Updates the percentage value and, if needed, switches the displayed image
     * to the matching preloaded cache entry.
     * @param {number} percentage - New value of the status bar.
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        const images = this.images;
        if (!images || images.length === 0) return;

        const index = this.resolveImageIndex();
        const path = images[index];
        const cachedImage = this.imageCache[path];
        this.img = cachedImage || this.img;

        if (!this.img) {
            this.loadImage(path);
        }
    }

    /**
     * Determines the matching image index from percentage/MAX_PERCENTAGE within
     * the "images" array (0 = empty, 5 = full).
     * @returns {number} Index between 0 and 5.
     */
    resolveImageIndex() {
        if (this.percentage >= this.MAX_PERCENTAGE) return 5;
        if (this.percentage >= this.MAX_PERCENTAGE * 0.8) return 4;
        if (this.percentage >= this.MAX_PERCENTAGE * 0.6) return 3;
        if (this.percentage >= this.MAX_PERCENTAGE * 0.4) return 2;
        if (this.percentage > this.MAX_PERCENTAGE * 0) return 1;
        return 0;
    }
}
