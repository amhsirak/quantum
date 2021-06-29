class MediaManager {
    constructor(config) {
        this.scene = config.scene;
        emitter.on(G.PLAY_SOUND, this.playSound, this);
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }
    musicChanged() {
        if (this.background) {
            if (model.musicOn == !1) {
                this.background.stop();
            } else {
                this.background.play();
            }
        }
    }
    playSound(key) {
        if (model.soundOn == 1) {
            let sound = this.scene.sound.add(key);
            sound.play();
        }
    }
    setBackgroundMusic(key) {
        if (model.musicOn == 1) {
            this.background = this.scene.sound.add(key, {
                volume: .5,
                loop: 1
            });
            this.background.play();
        }
    }
}