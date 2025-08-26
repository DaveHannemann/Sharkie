class AudioManager {
    constructor() {
        this.musicTracks = {};
        this.sfxTracks = {};
        this.currentMusic = null;
        this.muted = false;
    }

    addMusic(name, src, options = {}) {
        const audio = new Audio(src);
        audio.loop = options.loop ?? true;
        this.musicTracks[name] = audio;
    }


    addSFX(name, src) {
        this.sfxTracks[name] = src;
    }


    playMusic(name) {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }

        const track = this.musicTracks[name];
        if (track) {
            this.currentMusic = track;
            if (!this.muted) {
                track.play();
            }
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
    }

    playSFX(name) {
        const src = this.sfxTracks[name];
        if (src && !this.muted) {
            const audio = new Audio(src);
            audio.play();
        }
    }

    toggleMute() {
        this.muted = !this.muted;

        if (this.muted) {
            if (this.currentMusic) this.currentMusic.pause();
        } else {
            if (this.currentMusic) this.currentMusic.play();
        }
    }
}