/**
 * Status bar for energy/health points. Used both for the character and,
 * with different images, for the final boss.
 * @extends StatusBar
 */
class HealthBar extends StatusBar {
    /** @type {string[]} Image paths for the character's green health status bar. */
    static IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];

    /** @type {string[]} Image paths for the final boss's green health status bar. */
    static IMAGES_ENDBOSS = [
        "img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];

    /**
     * @param {number} [percentage=100] - Initial health display value.
     * @param {number} MAX_PERCENTAGE - Maximum energy (e.g., 100 for the character, 750 for the final boss).
     * @param {number} [x=50] - X position of the display.
     * @param {number} [y=0] - Y position of the display.
     * @param {string[]} [images=HealthBar.IMAGES] - Image set to use (character or final boss).
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
