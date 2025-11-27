
// Dot duration in ms. Standard WPM calculation: T = 1200 / WPM. 
// For learning, we stick to around 15-20 WPM speed but wider spacing (Farnsworth timing).
const UNIT_TIME = 80; // approx 15 WPM character speed

export class MorseAudio {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(e => console.error("Audio context resume failed", e));
    }
  }

  public playCode(code: string, onComplete?: () => void) {
    this.init();
    if (!this.ctx) return;

    // Ensure we have a valid context time
    const now = this.ctx.currentTime;
    let timing = now + 0.1; // Start slightly in future to allow scheduler to catch up

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    // CRITICAL FIX FOR PITCH GLITCH:
    // 1. Set the intrinsic value property immediately.
    osc.frequency.value = 600; 
    // 2. Schedule it at time 0 (forever in the past) to ensure the audio engine 
    // uses this value from the very first sample frame, regardless of 'now'.
    osc.frequency.setValueAtTime(600, 0);

    // Initialize gain to 0 BEFORE connecting to destination to prevent clicking/leaking
    gain.gain.value = 0;
    gain.gain.setValueAtTime(0, 0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    const symbols = code.split('');
    
    symbols.forEach((symbol) => {
      // Handle Spaces (Word/Letter separators) - treat as silence
      if (symbol === ' ' || symbol === '/') {
          timing += (UNIT_TIME * 4) / 1000; // 3 units standard + 1 unit from prev char = 4 units gap roughly
          return;
      }

      const isDot = symbol === '.';
      const isDash = symbol === '-';
      
      // Only play tone for dot or dash
      if (isDot || isDash) {
        const duration = isDot ? UNIT_TIME / 1000 : (UNIT_TIME * 3) / 1000;
        
        // Ramp up/down to avoid clicking
        // Anchor at 0 before starting attack
        gain.gain.setValueAtTime(0, timing);
        // Attack (5ms)
        gain.gain.linearRampToValueAtTime(1, timing + 0.005);
        // Sustain
        gain.gain.setValueAtTime(1, timing + duration - 0.005);
        // Release (5ms)
        gain.gain.linearRampToValueAtTime(0, timing + duration);

        timing += duration;
        timing += UNIT_TIME / 1000; // Inter-symbol gap (1 unit)
      }
    });

    // Start slightly before the first scheduled gain ramp to ensure the oscillator is ready
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
      
      osc.frequency.value = 600;
      osc.frequency.setValueAtTime(600, 0);

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
