class AudioManager {
    constructor() {
        this.musicTracks = {};
        this.sfxTracks = {};
        this.sfxLoopTracks = {};
        this.currentMusic = null;
        this.muted = false;
    }

    addMusic(name, src, options = {}) {
        const audio = new Audio(src);
        audio.loop = options.loop ?? true;
        this.musicTracks[name] = audio;
    }


    addSFX(name, src, loop = false) {
        const audio = new Audio(src);
        audio.loop = loop;
        if (loop) this.sfxLoopTracks[name] = audio;
        else this.sfxTracks[name] = audio;
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
    let audio = this.sfxTracks[name] || this.sfxLoopTracks[name];
    if (audio && !this.muted) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}

    stopSFX(name) {
        let audio = this.sfxLoopTracks[name];
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

toggleMute() {
    this.muted = !this.muted;
    if (this.currentMusic) {
        if (this.muted) this.currentMusic.pause();
        else this.currentMusic.play();
    }
    if (this.muted) {
        for (let key in this.sfxTracks) {
            const audio = this.sfxTracks[key];
            audio.pause();
            audio.currentTime = 0;
        }
        for (let key in this.sfxLoopTracks) {
            const audio = this.sfxLoopTracks[key];
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

    stopAll() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
        for (let key in this.sfxTracks) {
            const audio = this.sfxTracks[key];
            audio.pause();
            audio.currentTime = 0;
        }
        for (let key in this.sfxLoopTracks) {
            const audio = this.sfxLoopTracks[key];
            audio.pause();
            audio.currentTime = 0;
        }
    }
}