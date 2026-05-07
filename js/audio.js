let audioCtx = null;
let musicPlaying = false;
let gainNode = null;
let oscillators = [];
const audioBtn = document.getElementById('audio-btn');

function tryPlayAmbient() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 3);
  gainNode.connect(audioCtx.destination);

  const notes = [261.63, 311.13, 392.00, 466.16]; // C4 Eb4 G4 Bb4 — soft pad
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    lfo.frequency.value = 0.15 + i * 0.07;
    lfoGain.gain.value = 1.5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gainNode);
    lfo.start();
    osc.start(audioCtx.currentTime + i * 0.4);
    oscillators.push(osc);
  });

  musicPlaying = true;
  audioBtn.textContent = '🔊';
}

audioBtn.addEventListener('click', () => {
  if (!audioCtx) { tryPlayAmbient(); return; }
  if (musicPlaying) {
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
    musicPlaying = false;
    audioBtn.textContent = '🔇';
  } else {
    gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 1);
    musicPlaying = true;
    audioBtn.textContent = '🔊';
  }
});
