/**
 * Erweitert DrawableObject um Bewegung, Physik (Schwerkraft), Kollisionsabfrage
 * und den generischen "Treffer"-Mechanismus (Schaden nehmen).
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /** @type {number} Bewegungsgeschwindigkeit in Pixel pro Frame. */
    speed = 0.15;

    /** @type {boolean} Ob das Objekt horizontal gespiegelt gezeichnet wird (schaut nach links). */
    otherDirection = false;

    /** @type {number} Aktuelle vertikale Geschwindigkeit (für Sprung/Fall). */
    speedY = 0;

    /** @type {number} Wert, um den speedY pro Tick durch die Schwerkraft verringert wird. */
    acceleration = 2.5;

    /** @type {number} Zeitstempel (ms) des letzten erhaltenen Treffers, für Hurt-Cooldown. */
    lastHit = 0;

    /**
     * Startet eine wiederkehrende Schwerkraftsimulation (60x pro Sekunde).
     * Hebt/senkt das Objekt anhand von speedY und acceleration.
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this instanceof Character && this.y - this.speedY > 155) {
                    this.y = this.GROUND_Y;
                } else {
                    this.y -= this.speedY;
                }
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 60);
    }

    /**
     * Prüft, ob sich das Objekt über dem Boden befindet.
     * ThrowableObject gilt immer als "über dem Boden" (fliegt/fällt permanent).
     * @returns {boolean} true, wenn das Objekt sich in der Luft befindet.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        return this.y < this.GROUND_Y;
    }

    /**
     * Setzt das aktuelle Bild anhand des Animationsframe-Index und erhöht den Zähler.
     * @param {string[]} images - Array von Bildpfaden der Animation.
     * @returns {number} Der Index des tatsächlich angezeigten Frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        return i;
    }

    /**
     * Löst einen Sprung aus, indem die vertikale Geschwindigkeit gesetzt wird.
     * @returns {void}
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Bewegt das Objekt um "speed" nach rechts.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Bewegt das Objekt um "speed" nach links.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Prüft, ob dieses Objekt (unter Berücksichtigung der Hitbox-Offsets)
     * mit einem anderen MovableObject kollidiert.
     * @param {MovableObject} mo - Das andere Objekt, gegen das geprüft wird.
     * @returns {boolean} true, wenn sich die Hitboxen überschneiden.
     */
    isColliding(mo) {
        return (
            this.x +
                this.offset.left +
                this.width -
                this.offset.right -
                this.offset.left >
                mo.x + mo.offset.left &&
            this.y +
                this.offset.top +
                this.height -
                this.offset.top -
                this.offset.bottom >
                mo.y + mo.offset.top &&
            this.x + this.offset.left <
                mo.x +
                    mo.offset.left +
                    mo.width -
                    mo.offset.left -
                    mo.offset.right &&
            this.y + this.offset.top <
                mo.y +
                    mo.offset.top +
                    mo.height -
                    mo.offset.top -
                    mo.offset.bottom
        );
    }

    /**
     * Fügt dem Objekt Schaden zu, sofern der Hurt-Cooldown (350ms) abgelaufen ist.
     * Spielt den Hurt-Sound und setzt bei Tod die Energie explizit auf 0.
     * @param {number} damage - Menge an Schaden, die abgezogen wird.
     * @returns {void}
     */
    hit(damage) {
        if (Date.now() - this.lastHit < 350) return;
        this.lastHit = Date.now();
        if (!this.isDead()) {
            this.playHurtSound();
            this.energy -= damage;
            if (this.isDead()) {
                this.deadTime = Date.now();
                this.energy = 0;
            }
        }
    }

    /**
     * Prüft, ob der letzte Treffer weniger als 0,5 Sekunden zurückliegt.
     * @returns {boolean} true, während die Hurt-Animation gezeigt werden soll.
     */
    isHurt() {
        let timepassed = Date.now() - this.lastHit;
        let seconds = timepassed / 1000;
        return seconds < 0.5;
    }

    /**
     * Prüft, ob die Energie des Objekts aufgebraucht ist.
     * @returns {boolean} true, wenn energy <= 0 ist.
     */
    isDead() {
        return this.energy <= 0;
    }
}
