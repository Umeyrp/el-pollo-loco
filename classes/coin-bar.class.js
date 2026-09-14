/**
 * Status bar that displays the number of collected coins.
 * @extends StatusBar
 */
class CoinBar extends StatusBar {
    /** @type {string[]} Image paths for the green coin status bar. */
    static IMAGES = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];

    /**
     * @param {number} [percentage=0] - Initial value (number of collected coins).
     * @param {number} MAX_PERCENTAGE - Maximum number of coins (e.g., MAX_COINS).
     * @param {number} [x=50] - X position of the display.
     * @param {number} [y=50] - Y position of the display.
     */
    constructor(percentage = 0, MAX_PERCENTAGE, x = 50, y = 50) {
        super(
            "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
            percentage,
            MAX_PERCENTAGE,
            x,
            y,
            CoinBar.IMAGES,
        );
    }
}
