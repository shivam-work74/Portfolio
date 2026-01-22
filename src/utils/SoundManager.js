class SoundManager {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.ambientOsc = null;
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    setMuted(muted) {
        this.isMuted = muted;
        if (this.isMuted) {
            this.stopAmbient();
        } else {
            this.playAmbient();
        }
    }

    playOsc(freq, type, duration, volume) {
        if (!this.ctx || this.isMuted) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playHover() {
        this.playOsc(880, 'sine', 0.1, 0.05);
    }

    playClick() {
        this.playOsc(440, 'square', 0.1, 0.05);
    }

    playAchievement() {
        if (!this.ctx || this.isMuted) return;
        const now = this.ctx.currentTime;
        [440, 554.37, 659.25, 880].forEach((freq, i) => {
            this.playOsc(freq, 'sine', 0.5, 0.1);
        });
    }

    playAmbient() {
        if (!this.ctx || this.isMuted || this.ambientOsc) return;

        this.ambientOsc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        this.ambientOsc.type = 'sine';
        this.ambientOsc.frequency.setValueAtTime(60, this.ctx.currentTime); // Low hum

        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);

        this.ambientOsc.connect(gain);
        gain.connect(this.ctx.destination);

        this.ambientOsc.start();
    }

    stopAmbient() {
        if (this.ambientOsc) {
            this.ambientOsc.stop();
            this.ambientOsc = null;
        }
    }
}

const soundManager = new SoundManager();
export default soundManager;
