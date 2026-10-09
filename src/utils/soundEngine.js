// Web Audio API Synthesizer for Ethereal Dreamy Chimes & Background Music
class DreamyAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.pentatonicNotes = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      440.00, // A4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      880.00  // A5
    ];
    this.melodyIdx = 0;
    this.arpeggio = [0, 2, 4, 7, 5, 3, 1, 4, 6, 8, 9, 7, 5, 2];
    this.soundVolume = 0.18;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, time, duration = 2.4, gainLevel = 0.08) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(gainLevel * this.soundVolume, time + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      this.playTone(freq, now + (idx * 0.1), 1.8, 0.14);
    });
  }

  playCelebrationFanfare() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chord = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    chord.forEach((freq, i) => {
      this.playTone(freq, now + (i * 0.08), 2.8, 0.2);
    });
  }

  startAmbientMelody() {
    this.init();
    this.isPlaying = true;
    const scheduleNextNote = () => {
      if (!this.isPlaying || !this.ctx) return;
      const noteIndex = this.arpeggio[this.melodyIdx % this.arpeggio.length];
      const freq = this.pentatonicNotes[noteIndex % this.pentatonicNotes.length];
      
      this.playTone(freq, this.ctx.currentTime, 3.2, 0.06);
      
      if (this.melodyIdx % 4 === 0) {
        this.playTone(freq / 2, this.ctx.currentTime, 4.2, 0.04);
      }

      this.melodyIdx++;
      const nextTime = 480 + (Math.random() * 220);
      this.timer = setTimeout(scheduleNextNote, nextTime);
    };
    scheduleNextNote();
  }

  stopAmbientMelody() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
  }
}

export const soundEngine = new DreamyAudioEngine();
