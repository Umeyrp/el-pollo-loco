/**
 * Basisklasse für alle Statusanzeigen (Leben, Münzen, Flaschen).
 * Wählt anhand eines Prozentwerts das passende Balken-Bild aus.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /** @type {number} Breite der Statusleiste in Pixel. */
    width = 200;

    /** @type {number} Höhe der Statusleiste in Pixel. */
    height = 60;

    /** @type {number} Aktueller Wert der Statusleiste (z.B. Energie, Münzen, Flaschen). */
    percentage;

    /** @type {number} Maximalwert, auf den sich "percentage" bezieht. */
    MAX_PERCENTAGE;

    /** @type {string[]} Array der Bildpfade für die verschiedenen Füllstände. */
    images;

    /** @type {number} X-Position der Statusleiste. */
    x;

    /** @type {number} Y-Position der Statusleiste. */
    y;

    /**
     * @param {string} path - Pfad zum initial anzuzeigenden Bild.
     * @param {number} percentage - Startwert der Statusleiste.
     * @param {number} MAX_PERCENTAGE - Maximalwert der Statusleiste.
     * @param {number} x - X-Position.
     * @param {number} y - Y-Position.
     * @param {string[]} images - Bildpfade für die 6 Füllstände (0/20/40/60/80/100).
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
     * Aktualisiert den Prozentwert und wechselt bei Bedarf das angezeigte Bild
     * auf den passenden, bereits vorgeladenen Cache-Eintrag.
     * @param {number} percentage - Neuer Wert der Statusleiste.
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
     * Ermittelt anhand von percentage/MAX_PERCENTAGE den passenden Bildindex
     * (0 = leer, 5 = voll) innerhalb des "images"-Arrays.
     * @returns {number} Index zwischen 0 und 5.
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
