/**
 * Manages all sound effects and background music of the game.
 */
class Sound {
    static CHARACTER_WALK = Sound.create("./audios/character_walk.mp3", 0.1);
    static CHARACTER_JUMP = Sound.create("./audios/character_jump.mp3", 0.02);
    static CHARACTER_HURT = Sound.create("./audios/character_hurt.mp3", 0.05);
    static CHARACTER_SNORE = Sound.create(
        "./audios/character_snore.mp3",
        0.08,
        true,
    );
    static CHARACTER_DEAD = Sound.create("./audios/character_dead.mp3", 0.3);
    static CHICKEN_DEAD = Sound.create("./audios/chicken_dead.mp3", 0.1);
    static CHICK_DEAD = Sound.create("./audios/chick_dead.mp3", 0.15);
    static BOTTLE_THROW = Sound.create("./audios/bottle_throw.mp3", 0.1);
    static BOTTLE_HIT = Sound.create("./audios/bottle_break.mp3", 0.1);
    static COLLECT_COIN = Sound.create("./audios/collect_coin.mp3", 0.1);
    static COLLECT_BOTTLE = Sound.create("./audios/collect_bottle.mp3", 0.15);
    static BACKGROUND_MUSIC = Sound.create(
        "./audios/background_music.mp3",
        0.07,
        true,
    );

    /**
     * Contains all sounds that can be controlled at once.
     */
    static allSounds = [
        Sound.CHARACTER_WALK,
        Sound.CHARACTER_DEAD,
        Sound.CHARACTER_HURT,
        Sound.CHARACTER_JUMP,
        Sound.CHARACTER_SNORE,
        Sound.CHICKEN_DEAD,
        Sound.BOTTLE_THROW,
        Sound.BOTTLE_HIT,
        Sound.COLLECT_BOTTLE,
        Sound.COLLECT_COIN,
        Sound.BACKGROUND_MUSIC,
    ];

    /**
     * Indicates whether all sounds are muted.
     */
    static isMuted = true;

    /**
     * Creates a new audio element with the given settings.
     *
     * @param {string} path - Path to the audio file.
     * @param {number} volume - Volume of the audio.
     * @param {boolean} loop - Whether the audio should repeat.
     * @returns {HTMLAudioElement} The created audio element.
     */
    static create(path, volume, loop = false) {
        const audio = new Audio(path);
        audio.volume = volume;
        audio.loop = loop;
        return audio;
    }

    /**
     * Plays a sound unless the game is muted.
     *
     * @param {HTMLAudioElement} sound - Sound to play.
     */
    static playSound(sound) {
        if (Sound.isMuted) {
            return;
        }

        if (sound != Sound.BACKGROUND_MUSIC) {
            sound.currentTime = 0;
        }

        sound.play();
    }

    /**
     * Stops all sounds and resets their playback position.
     */
    static stopAllSounds() {
        Sound.allSounds.forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /**
     * Toggles the mute state and starts the background music when unmuted.
     */
    static toggleMute() {
        Sound.isMuted = !Sound.isMuted;

        Sound.allSounds.forEach((sound) => {
            sound.muted = Sound.isMuted;
        });

        if (!Sound.isMuted) {
            Sound.playSound(Sound.BACKGROUND_MUSIC);
        }
    }
}
