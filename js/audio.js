let musicPlaying = false;
const audioBtn = document.getElementById("audio-btn");
const backgroundMusic = new Audio("assets/audio/audio.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

const guestLower = guestName.toLowerCase();
let guestAudio = null;
if (guestLower.includes('ninong')) {
	guestAudio = new Audio('assets/audio/ninong.mp3');
	guestAudio.volume = 0.85;
} else if (guestLower.includes('ninang')) {
	guestAudio = new Audio('assets/audio/ninang.mp3');
	guestAudio.volume = 0.85;
}

function playGuestAudio() {
	if (guestAudio) guestAudio.play().catch(() => {});
}

function stopGuestAudio() {
	if (!guestAudio) return;
	guestAudio.pause();
	guestAudio.currentTime = 0;
}

function tryPlayAmbient() {
	backgroundMusic
		.play()
		.then(() => {
			musicPlaying = true;
			audioBtn.textContent = "🔊";
		})
		.catch(() => {});
}

audioBtn.addEventListener("click", () => {
	if (!musicPlaying) {
		backgroundMusic.play().then(() => {
			musicPlaying = true;
			audioBtn.textContent = "🔊";
		});
	} else {
		backgroundMusic.pause();
		musicPlaying = false;
		audioBtn.textContent = "🔇";
	}
});
