const intro = document.getElementById('intro');
const enterBtn = document.getElementById('enter-btn');

enterBtn.addEventListener('click', () => {
  intro.classList.add('hidden');
  setTimeout(() => {
    intro.style.display = 'none';
    scenes[0].classList.add('active');
    animateLetter();
    updateDots();
    updateNavBtns();
    resetAutoplay();
    tryPlayAmbient();
  }, 1200);
});
