/**
 * Statusleiste, die die Anzahl gesammelter Münzen anzeigt.
 * @extends StatusBar
 */
class CoinBar extends StatusBar {
    /** @type {string[]} Bildpfade der Münzen-Statusleiste (grün). */
    static IMAGES = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];

    /**
     * @param {number} [percentage=0] - Startwert (Anzahl gesammelter Münzen).
     * @param {number} MAX_PERCENTAGE - Maximale Anzahl Münzen (z.B. MAX_COINS).
     * @param {number} [x=50] - X-Position der Anzeige.
     * @param {number} [y=50] - Y-Position der Anzeige.
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
