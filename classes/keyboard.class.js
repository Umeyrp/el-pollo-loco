/**
 * Einfacher Zustandsspeicher für die aktuell gedrückten Steuerungstasten.
 * Wird von den globalen keydown/keyup-Listenern in game.js aktualisiert
 * und vom Character ausgelesen.
 */
class Keyboard {
    /** @type {boolean} true, während die Links-Taste (A) gedrückt ist. */
    LEFT = false;

    /** @type {boolean} true, während die Rechts-Taste (D) gedrückt ist. */
    RIGHT = false;

    /** @type {boolean} true, während die Sprung-Taste (W) gedrückt ist. */
    UP = false;

    /** @type {boolean} true, während die Wurf-Taste (S) gedrückt ist. */
    DOWN = false;

    /** @type {boolean} true, während die Leertaste gedrückt ist. */
    SPACE = false;
}
