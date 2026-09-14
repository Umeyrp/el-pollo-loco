/**
 * Statusleiste für die Energie/Lebenspunkte. Wird sowohl für den Charakter
 * als auch (mit abweichenden Bildern) für den Endboss verwendet.
 * @extends StatusBar
 */
class HealthBar extends StatusBar {
    /** @type {string[]} Bildpfade der Leben-Statusleiste (Charakter, grün). */
    static IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    /** @type {string[]} Bildpfade der Leben-Statusleiste für den Endboss (grün). */
    static IMAGES_ENDBOSS = [
        "img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];

    /**
     * @param {number} [percentage=100] - Startwert der Lebensanzeige.
     * @param {number} MAX_PERCENTAGE - Maximale Energie (z.B. 100 beim Charakter, 750 beim Endboss).
     * @param {number} [x=50] - X-Position der Anzeige.
     * @param {number} [y=0] - Y-Position der Anzeige.
     * @param {string[]} [images=HealthBar.IMAGES] - Zu verwendendes Bilder-Set (Charakter oder Endboss).
     */
    constructor(
        percentage = 100,
        MAX_PERCENTAGE,
        x = 50,
        y = 0,
        images = HealthBar.IMAGES,
    ) {
        super(images[5], percentage, MAX_PERCENTAGE, x, y, images);
    }
}
