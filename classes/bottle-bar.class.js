/**
 * Statusleiste, die die Anzahl gesammelter/verfügbarer Flaschen anzeigt.
 * @extends StatusBar
 */
class BottleBar extends StatusBar {
    /** @type {string[]} Bildpfade der Flaschen-Statusleiste (grün). */
    static IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
    ];

    /**
     * @param {number} [percentage=0] - Startwert (Anzahl verfügbarer Flaschen).
     * @param {number} MAX_PERCENTAGE - Maximale Anzahl Flaschen (z.B. MAX_BOTTLES).
     * @param {number} [x=50] - X-Position der Anzeige.
     * @param {number} [y=100] - Y-Position der Anzeige.
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
