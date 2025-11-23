// Dot duration in ms. Standard WPM calculation: T = 1200 / WPM. 
// For learning, we stick to around 15-20 WPM speed but wider spacing (Farnsworth timing).
const UNIT_TIME = 80; // approx 15 WPM character speed

export class MorseAudio {
  private ctx: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playCode(code: string, onComplete?: () => void) {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    let timing = now + 0.1; // Start slightly in future

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now); // 600Hz is a pleasant tone
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    gain.gain.setValueAtTime(0, now);

    const symbols = code.split('');
    
    symbols.forEach((symbol) => {
      const duration = symbol === '.' ? UNIT_TIME / 1000 : (UNIT_TIME * 3) / 1000;
      
      // Ramp up/down to avoid clicking
      gain.gain.setValueAtTime(0, timing);
      gain.gain.linearRampToValueAtTime(1, timing + 0.005);
      gain.gain.setValueAtTime(1, timing + duration - 0.005);
      gain.gain.linearRampToValueAtTime(0, timing + duration);

      timing += duration;
      timing += UNIT_TIME / 1000; // Inter-symbol gap (1 unit)
    });

    osc.start(now);
    osc.stop(timing + 0.1);

    if (onComplete) {
      setTimeout(onComplete, (timing - now) * 1000);
    }
  }

  public playTone(duration?: number) {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      
      if (duration) {
          osc.stop(this.ctx.currentTime + duration);
      }
      
      return { osc, gain, ctx: this.ctx };
  }
}

export const morseAudio = new MorseAudio();
