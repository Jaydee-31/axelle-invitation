let touchStartX = 0;

document.addEventListener(
	"touchstart",
	(e) => {
		touchStartX = e.touches[0].clientX;
	},
	{ passive: true },
);

document.addEventListener(
	"touchend",
	(e) => {
		const dx = e.changedTouches[0].clientX - touchStartX;
		if (Math.abs(dx) > 50) {
			clearAutoplay();
			if (dx < 0 && current < scenes.length - 1) goTo(current + 1);
			if (dx > 0 && current > 0) goTo(current - 1, -1);
		}
	},
	{ passive: true },
);
