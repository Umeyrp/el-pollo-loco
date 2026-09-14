/**
 * Simple state store for the currently pressed control keys.
 * It is updated by the global keydown/keyup listeners in game.js and read
 * by Character.
 */
class Keyboard {
    /** @type {boolean} true while the left key (A) is pressed. */
    LEFT = false;

    /** @type {boolean} true while the right key (D) is pressed. */
    RIGHT = false;

    /** @type {boolean} true while the jump key (W) is pressed. */
    UP = false;

    /** @type {boolean} true while the throw key (S) is pressed. */
    DOWN = false;

    /** @type {boolean} true while the space bar is pressed. */
    SPACE = false;
}
