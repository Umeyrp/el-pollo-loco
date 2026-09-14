/**
 * Status bar that displays the number of collected or available bottles.
 * @extends StatusBar
 */
class BottleBar extends StatusBar {
    /** @type {string[]} Image paths for the green bottle status bar. */
    static IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
    ];

    /**
     * @param {number} [percentage=0] - Initial value (number of available bottles).
     * @param {number} MAX_PERCENTAGE - Maximum number of bottles (e.g., MAX_BOTTLES).
     * @param {number} [x=50] - X position of the display.
     * @param {number} [y=100] - Y position of the display.
     */
    constructor(percentage = 0, MAX_PERCENTAGE, x = 50, y = 100) {
        super(
            "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
            percentage,
            MAX_PERCENTAGE,
            x,
            y,
            BottleBar.IMAGES,
        );
    }
}
