/**
 * Basisklasse für alle Objekte, die auf dem Canvas gezeichnet werden können.
 * Kümmert sich um Position, Bildladen und das eigentliche Zeichnen.
 */
class DrawableObject {
    /** @type {number} X-Position des Objekts in Pixel. */
    x = 120;

    /** @type {number} Y-Position des Objekts in Pixel. */
    y = 290;

    /** @type {HTMLImageElement} Aktuell angezeigtes Bild. */
    img;

    /** @type {number} Höhe des Objekts in Pixel. */
    height = 150;

    /** @type {number} Breite des Objekts in Pixel. */
    width = 100;

    /**
     * Zwischenspeicher für bereits geladene Bilder, damit Animationsframes
     * nicht mehrfach neu geladen werden müssen.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /** @type {number} Index des aktuellen Animationsframes. */
    currentImage = 0;

    /**
     * Zeichnet das aktuelle Bild des Objekts auf den übergebenen Canvas-Kontext.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Lädt ein einzelnes Bild und setzt es als aktuelles Bild (this.img).
     * @param {string} path - Pfad zur Bilddatei.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image(); //ersetzt document.getElementById(img)
        this.img.src = path;
    }

    /**
     * Lädt mehrere Bilder vorab in den imageCache, z.B. für Animationen.
     * @param {string[]} arr - Array von Bildpfaden.
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
     * Zeichnet (aktuell auskommentierte) Debug-Rahmen um Objekt und
     * dessen Hitbox-Offset. Nur für ausgewählte Objekttypen relevant.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
     * @returns {void}
     */
    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Chick ||
            this instanceof Endboss ||
            this instanceof CollectableObject ||
            this instanceof ThrowableObject
        ) {
            // ctx.beginPath();
            // ctx.lineWidth = '1';
            // ctx.strokeStyle = 'blue';
            // ctx.rect(this.x, this.y, this.width, this.height);
            // ctx.stroke();
            //Offset Frame
            // ctx.beginPath();
            // ctx.lineWidth = '1';
            // ctx.strokeStyle = 'red';
            // ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            // ctx.stroke();
        }
    }
}
