/**
 * Base class for all objects that can be drawn on the canvas.
 * Handles positioning, image loading, and drawing.
 */
class DrawableObject {
    /** @type {number} X position of the object in pixels. */
    x = 120;

    /** @type {number} Y position of the object in pixels. */
    y = 290;

    /** @type {HTMLImageElement} Image currently displayed. */
    img;

    /** @type {number} Height of the object in pixels. */
    height = 150;

    /** @type {number} Width of the object in pixels. */
    width = 100;

    /** @type {boolean} Turn on/off hitboxes */
    showHitboxes = false;

    /**
     * Cache for images already loaded so animation frames do not need to be
     * loaded repeatedly.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /** @type {number} Index of the current animation frame. */
    currentImage = 0;

    /**
     * Draws the object's current image on the supplied canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads an individual image and sets it as the current image (this.img).
     * @param {string} path - Path to the image file.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image(); //ersetzt document.getElementById(img)
        this.img.src = path;
    }

    /**
     * Preloads multiple images into the imageCache, e.g., for animations.
     * @param {string[]} arr - Array of image paths.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws currently commented-out debug borders around the object and its
     * hitbox offset. Relevant only for selected object types.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {void}
     */
    drawFrame(ctx) {
        if (
            this.showHitboxes &&
            (this instanceof Character ||
                this instanceof Chicken ||
                this instanceof Chick ||
                this instanceof Endboss ||
                this instanceof CollectableObject ||
                this instanceof ThrowableObject)
        ) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            // Offset Frame
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom,
            );
            ctx.stroke();
        }
    }
}
