// Web Audio API Synthesizer for tactile physical feedback
// All sounds are procedurally generated, avoiding any external asset load failures.

let audioCtx: AudioContext | null = null;
let humNode: OscillatorNode | null = null;
let humGain: GainNode | null = null;
let isSoundEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound(enabled: boolean) {
  isSoundEnabled = enabled;
  if (!enabled) {
    stopHum();
  } else if (humNode) {
    startHum();
  }
}

export function playPaperFlip() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create noise buffer
    const bufferSize = ctx.sampleRate * 0.4; // 0.4s
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Filter noise to sound like rubbing paper (low-pass)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.35);
    filter.Q.setValueAtTime(3, now);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(now);
    noise.stop(now + 0.4);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
}

export function playPencilScratch() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create quick short scratch buffer
    const bufferSize = ctx.sampleRate * 0.12; // 120ms scratch
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Bandpass filter to mimic pencil graphite grit
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.linearRampToValueAtTime(1200, now + 0.1);
    filter.Q.setValueAtTime(2, now);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(now);
    noise.stop(now + 0.12);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
}

export function playStampClack() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Wood clack sound: high transient sine wave with rapid decay + short noise rattle
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
    
    oscGain.gain.setValueAtTime(0.4, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    // Low bandpass noise for the body of the wooden stamp hitting paper
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(150, now);
    filter.Q.setValueAtTime(4, now);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.16);
    
    noise.start(now);
    noise.stop(now + 0.18);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
}

export function playSwitchClick() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.setValueAtTime(800, now + 0.01);
    
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
}

export function playCoffeeSip() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Bubble effect: short sine waves sweeping upwards in frequency
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(200, now);
    osc1.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.06, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(250, now + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(1000, now + 0.25);
    gain2.gain.setValueAtTime(0, now + 0.08);
    gain2.gain.linearRampToValueAtTime(0.05, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + 0.2);
    
    osc2.start(now + 0.08);
    osc2.stop(now + 0.3);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
}

export function startHum() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    if (humNode) return; // Already running
    
    humNode = ctx.createOscillator();
    humNode.type = 'sine';
    humNode.frequency.setValueAtTime(60, now); // 60 Hz hum
    
    // Add 120Hz overtone
    const overtone = ctx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(120, now);
    
    humGain = ctx.createGain();
    humGain.gain.setValueAtTime(0.004, now); // extremely quiet background hum
    
    humNode.connect(humGain);
    overtone.connect(humGain);
    humGain.connect(ctx.destination);
    
    humNode.start(now);
    overtone.start(now);
  } catch (e) {
    console.warn('Hum play failed', e);
  }
}

export function stopHum() {
  try {
    if (humNode) {
      humNode.stop();
      humNode.disconnect();
      humNode = null;
    }
    if (humGain) {
      humGain.disconnect();
      humGain = null;
    }
  } catch (e) {
    console.warn('Stop hum failed', e);
  }
}
