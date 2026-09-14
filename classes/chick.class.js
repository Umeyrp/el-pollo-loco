class Chick extends MovableObject {
    y = 375;
    height = 40;
    width = 40;
    energy = 100;
    deadTime = 0;
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
    IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
    offset = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
    };

    constructor(baseX) {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.x = baseX + Math.random() * 80;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.speed = 0.8 + Math.random() * 0.25;
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) return;
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    playHurtSound() {
        Sound.playSound(Sound.CHICK_DEAD);
    }
}
