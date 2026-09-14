/**
 * Stores the game canvas, world and keyboard input.
 */
let canvas;
let world;
let keyboard;

/**
 * Starts the game and initializes the canvas, controls and game world.
 */
function startGame() {
    document.querySelector("#startscreen").style.display = "none";
    canvas = document.querySelector("#canvas");
    setupCanvasResolution();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    ctx = canvas.getContext("2d");
    initTouchControls();
    document.querySelector("#touchControls").classList.add("game-active");
}

/**
 * Displays the controls overlay.
 */
function showControls() {
    document.querySelector("#controlsOverlay").hidden = false;
}

/**
 * Hides the controls overlay.
 */
function hideControls() {
    document.querySelector("#controlsOverlay").hidden = true;
}

/**
 * Displays the imprint overlay.
 */
function showImprint() {
    document.querySelector("#imprintOverlay").hidden = false;
}

/**
 * Hides the imprint overlay.
 */
function hideImprint() {
    document.querySelector("#imprintOverlay").hidden = true;
}

/**
 * Shows the game-over screen and disables the touch controls.
 */
function showGameoverScreen() {
    document.querySelector("#gameoverscreen").hidden = false;
    document.querySelector("#touchControls").classList.remove("game-active");
}

/**
 * Shows the win screen and disables the touch controls.
 */
function showWinScreen() {
    document.querySelector("#winscreen").hidden = false;
    document.querySelector("#touchControls").classList.remove("game-active");
}

/**
 * Hides the end screens and starts a new game.
 */
function restartGame() {
    document.querySelector("#gameoverscreen").hidden = true;
    document.querySelector("#winscreen").hidden = true;
    startGame();
}

/**
 * Hides the end screens and returns to the start screen.
 */
function goHome() {
    document.querySelector("#gameoverscreen").hidden = true;
    document.querySelector("#winscreen").hidden = true;
    document.querySelector("#startscreen").style.display = "block";
    document.querySelector("#touchControls").classList.remove("game-active");
}

/**
 * Toggles the game's mute state and updates the volume icon.
 */
function toggleMute() {
    Sound.toggleMute();
    updateMuteIcon();
}

/**
 * Updates the volume icon according to the current mute state.
 */
function updateMuteIcon() {
    const volumeOnIcon = document.getElementById("volumeOnIcon");
    const volumeOffIcon = document.getElementById("volumeOffIcon");

    if (Sound.isMuted) {
        volumeOnIcon.setAttribute("hidden", "");
        volumeOffIcon.removeAttribute("hidden");
    } else {
        volumeOnIcon.removeAttribute("hidden");
        volumeOffIcon.setAttribute("hidden", "");
    }
}

/**
 * Clears all active intervals used by the game.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Initializes the touch controls for mobile devices.
 */
function initTouchControls() {
    bindTouchButton("btnLeft", "LEFT");
    bindTouchButton("btnRight", "RIGHT");
    bindTouchButton("btnJump", "UP");
    bindTouchButton("btnThrow", "DOWN");
}

/**
 * Connects a touch button with a keyboard control.
 *
 * @param {string} buttonId - ID of the touch button.
 * @param {string} keyboardKey - Keyboard property controlled by the button.
 */
function bindTouchButton(buttonId, keyboardKey) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.addEventListener(
        "touchstart",
        (e) => {
            e.preventDefault();
            keyboard[keyboardKey] = true;
        },
        { passive: false },
    );

    btn.addEventListener(
        "touchend",
        (e) => {
            e.preventDefault();
            keyboard[keyboardKey] = false;
        },
        { passive: false },
    );

    btn.addEventListener(
        "touchcancel",
        (e) => {
            e.preventDefault();
            keyboard[keyboardKey] = false;
        },
        { passive: false },
    );

    btn.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}

window.addEventListener("keyup", (event) => {
    if (event.code == "KeyW") keyboard.UP = false;
    if (event.code == "KeyS") keyboard.DOWN = false;
    if (event.code == "KeyA") keyboard.LEFT = false;
    if (event.code == "KeyD") keyboard.RIGHT = false;
    if (event.code == "Space") keyboard.SPACE = false;
});

window.addEventListener("keydown", (event) => {
    if (event.code == "KeyW") keyboard.UP = true;
    if (event.code == "KeyS") keyboard.DOWN = true;
    if (event.code == "KeyA") keyboard.LEFT = true;
    if (event.code == "KeyD") keyboard.RIGHT = true;
    if (event.code == "Space") keyboard.SPACE = true;
});

/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document
            .querySelector(".game-container")
            .requestFullscreen()
            .catch((err) => {
                console.log("Fullscreen error:", err);
            });
    } else {
        document.exitFullscreen();
    }
}

/**
 * Sets the canvas resolution and scales the drawing context.
 */
function setupCanvasResolution() {
    const scale = 2;
    canvas.width = 720 * scale;
    canvas.height = 480 * scale;

    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
}

document.addEventListener("DOMContentLoaded", () => {
    updateMuteIcon();
});
