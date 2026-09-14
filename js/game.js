let canvas;
let world;
let keyboard;

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

function showControls() {
    document.querySelector("#controlsOverlay").hidden = false;
}

function hideControls() {
    document.querySelector("#controlsOverlay").hidden = true;
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

function showGameoverScreen() {
    document.querySelector("#gameoverscreen").hidden = false;
    document.querySelector("#touchControls").classList.remove("game-active");
}

function showWinScreen() {
    document.querySelector("#winscreen").hidden = false;
    document.querySelector("#touchControls").classList.remove("game-active");
}

function restartGame() {
    document.querySelector("#gameoverscreen").hidden = true;
    document.querySelector("#winscreen").hidden = true;
    startGame();
}

function goHome() {
    document.querySelector("#gameoverscreen").hidden = true;
    document.querySelector("#winscreen").hidden = true;
    document.querySelector("#startscreen").style.display = "block";
    document.querySelector("#touchControls").classList.remove("game-active");
}

function toggleMute() {
    Sound.toggleMute();
    updateMuteIcon();
}

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

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function initTouchControls() {
    bindTouchButton("btnLeft", "LEFT");
    bindTouchButton("btnRight", "RIGHT");
    bindTouchButton("btnJump", "UP");
    bindTouchButton("btnThrow", "DOWN");
}

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

function setupCanvasResolution() {
    const scale = 2; // 2x Auflösung für schärferes Bild
    canvas.width = 720 * scale;
    canvas.height = 480 * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
}
