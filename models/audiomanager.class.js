class AudioManager {
    constructor() {
        this.musicTracks = {};
        this.sfxTracks = {};
        this.sfxLoopTracks = {};
        this.currentMusic = null;
        this.muted = false;
    }

    /**
     * Adds music track to manager.
     * @param {string} name - music name
     * @param {string} src - path of audio
     * @param {{loop?: boolean, volume?: number}} [options] - Optional settings
     */
    addMusic(name, src, options = {}) {
        const audio = new Audio(src);
        audio.loop = options.loop ?? true;
        audio.volume = options.volume ?? 1.0;
        audio.preload = 'auto';
        this.musicTracks[name] = audio;
    }

    /**
     * Adds sound effect to manager
     * @param {string} name - SFX name
     * @param {string} src - path of audio
     * @param {{loop?: boolean, volume?: number}} [options] - Optional settings
     */
    addSFX(name, src, options = {}) {
        const audio = new Audio(src);
        audio.loop = options.loop ?? false;
        audio.volume = options.volume ?? 1.0;
        audio.preload = 'auto';
        if (audio.loop) this.sfxLoopTracks[name] = audio;
        else this.sfxTracks[name] = audio;
    }

    /**
     * Plays the named track
     * @param {string} name - name of music 
     */
    playMusic(name) {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        const track = this.musicTracks[name];
        if (track) {
            this.currentMusic = track;
            if (!this.muted) track.play();
        }
    }

    /**
     * Stops current music
     */
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
    }

    /**
     * Plays named SFX
     * @param {string} name - name of SFX 
     * @returns {void}
     */
    playSFX(name) {
        let audio = this.sfxTracks[name] || this.sfxLoopTracks[name];
        if (!audio || this.muted) return;
        if (!audio.loop) {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        } else {
            if (audio.paused) audio.play();
        }
    }

    /**
     * Stops looping SFX
     * @param {string} name - SFX name 
     */
    stopSFX(name) {
        let audio = this.sfxLoopTracks[name];
        if (audio) audio.pause();
    }

    /**
     * Stops all audio and keeps going if unmute
     */
    toggleMute() {
        this.muted = !this.muted;
        if (this.currentMusic) {
            if (this.muted) this.currentMusic.pause();
            else this.currentMusic.play();
        }
        for (let key in this.sfxTracks) {
            const audio = this.sfxTracks[key];
            audio.pause();
            audio.currentTime = 0;
        }
        for (let key in this.sfxLoopTracks) {
            const audio = this.sfxLoopTracks[key];
            if (this.muted) audio.pause();
            else if (audio.currentTime > 0 && !audio.ended) audio.play();
        }
    }

    /**
     * Stops all audio
     */
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