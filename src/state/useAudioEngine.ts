// Web Audio API synthesized procedural sound engine (no external audio files needed)

// DTMF standard frequencies
const DTMF_FREQS: Record<string, [number, number]> = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477]
};

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeTunerOsc: OscillatorNode | null = null;
  private activeTunerGain: GainNode | null = null;

  public getContext(): AudioContext | null {
    this.init();
    return this.ctx;
  }

  public getAnalyser(): AnalyserNode | null {
    this.init();
    return this.analyser;
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Subtle retro tape/terminal click
  playClick(freq = 800) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.analyser || this.ctx.destination);
      if (this.analyser) this.analyser.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio fallback
    }
  }

  // Dual-Tone Multi-Frequency (DTMF) Telephone Tone generator
  playDtmf(key: string, duration = 0.18) {
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = DTMF_FREQS[key];
      if (!freqs) {
        this.playClick(600);
        return;
      }

      const [f1, f2] = freqs;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(f1, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(f2, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.analyser || this.ctx.destination);
      if (this.analyser) this.analyser.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + duration);
      osc2.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }

  // Clearance Upgrade / Security Alert Chime
  playClearanceChime(level: string) {
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = level === 'LEVEL_NULL' ? [130, 260, 520, 1040] : [440, 554, 659, 880];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = level === 'LEVEL_NULL' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.04, this.ctx!.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.analyser || this.ctx!.destination);
        if (this.analyser) this.analyser.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + idx * 0.08);
        osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.35);
      });
    } catch {
      // Audio fallback
    }
  }

  // Dialup glitch chirp
  playDialupChirp() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.setValueAtTime(2400, this.ctx.currentTime + 0.05);
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.analyser || this.ctx.destination);
      if (this.analyser) this.analyser.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Audio fallback
    }
  }

  // Dynamic Frequency Tuner Oscillator (for Carrier Tuner tool)
  setTunerFrequency(freq: number, type: 'sine' | 'sawtooth' | 'triangle' = 'sine', volume = 0.03) {
    try {
      this.init();
      if (!this.ctx) return;

      if (!this.activeTunerOsc) {
        this.activeTunerOsc = this.ctx.createOscillator();
        this.activeTunerGain = this.ctx.createGain();
        this.activeTunerGain.gain.setValueAtTime(volume, this.ctx.currentTime);
        this.activeTunerOsc.connect(this.activeTunerGain);
        this.activeTunerGain.connect(this.analyser || this.ctx.destination);
        if (this.analyser) this.analyser.connect(this.ctx.destination);
        this.activeTunerOsc.start();
      }

      this.activeTunerOsc.type = type;
      this.activeTunerOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.02);
      if (this.activeTunerGain) {
        this.activeTunerGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.02);
      }
    } catch {
      // Audio fallback
    }
  }

  stopTuner() {
    try {
      if (this.activeTunerOsc) {
        this.activeTunerOsc.stop();
        this.activeTunerOsc.disconnect();
        this.activeTunerOsc = null;
      }
      if (this.activeTunerGain) {
        this.activeTunerGain.disconnect();
        this.activeTunerGain = null;
      }
    } catch {
      // Audio fallback
    }
  }

  // Continuous low 58.4Hz telephone carrier / CRT monitor hum
  startAmbientHum() {
    try {
      this.init();
      if (!this.ctx || this.humOsc) return;
      this.humOsc = this.ctx.createOscillator();
      this.humGain = this.ctx.createGain();
      this.humOsc.type = 'sine';
      this.humOsc.frequency.setValueAtTime(58.4, this.ctx.currentTime);
      this.humGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      this.humOsc.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);
      this.humOsc.start();
    } catch {
      // Audio fallback
    }
  }

  stopAmbientHum() {
    try {
      if (this.humOsc) {
        this.humOsc.stop();
        this.humOsc.disconnect();
        this.humOsc = null;
      }
      if (this.humGain) {
        this.humGain.disconnect();
        this.humGain = null;
      }
    } catch {
      // Audio fallback
    }
  }

  // Authentic CRT monitor degauss coil discharge sound
  playCrtDegauss() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(this.analyser || this.ctx.destination);
      if (this.analyser) this.analyser.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch {
      // Audio fallback
    }
  }

  // Synthesizes Morse code tone for Station Null radio
  playMorseTone(durationSec = 0.08, pitch = 700) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);
      osc.connect(gain);
      gain.connect(this.analyser || this.ctx.destination);
      if (this.analyser) this.analyser.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + durationSec);
    } catch {
      // Audio fallback
    }
  }
}

export const soundEngine = new AudioSynthesizer();
