let musicPlaying = false;
const audioBtn = document.getElementById("audio-btn");
const backgroundMusic = new Audio("assets/audio/audio.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

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
