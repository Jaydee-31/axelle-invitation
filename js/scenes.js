const scenes = document.querySelectorAll('.scene');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const autoFill = document.getElementById('autoplay-fill');
let current = 0;
let autoTimer = null;

function goTo(idx, dir = 1) {
  if (idx < 0 || idx >= scenes.length) return;

  scenes[current].classList.remove('active');
  if (dir === 1) scenes[current].classList.add('exit-left');
  setTimeout(() => scenes[idx >= 0 ? current : idx].classList.remove('exit-left'), 900);

  current = idx;

  setTimeout(() => {
    scenes[current].classList.add('active');
    if (current === 1) animateLetter();
    updateDots();
    updateNavBtns();
    resetAutoplay();
  }, 50);
}

function updateDots() {
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function updateNavBtns() {
  prevBtn.style.opacity = current === 0 ? '0.4' : '1';
  prevBtn.style.pointerEvents = current === 0 ? 'none' : 'all';
  if (current === scenes.length - 1) {
    nextBtn.textContent = '💌 RSVP';
    nextBtn.classList.add('primary');
    nextBtn.onclick = openModal;
  } else {
    nextBtn.textContent = 'Next →';
    nextBtn.onclick = () => { clearAutoplay(); goTo(current + 1); };
  }
}

function resetAutoplay() {
  clearAutoplay();
  if (current === scenes.length - 1) return;
  autoFill.style.transition = 'none';
  autoFill.style.width = '0%';
  requestAnimationFrame(() => {
    autoFill.style.transition = `width ${SCENE_DURATION}ms linear`;
    autoFill.style.width = '100%';
  });
  autoTimer = setTimeout(() => {
    if (current < scenes.length - 1) goTo(current + 1);
  }, SCENE_DURATION);
}

function clearAutoplay() {
  clearTimeout(autoTimer);
  autoFill.style.transition = 'none';
  autoFill.style.width = '0%';
}

prevBtn.addEventListener('click', () => { clearAutoplay(); if (current > 0) goTo(current - 1, -1); });
nextBtn.addEventListener('click', () => { clearAutoplay(); goTo(current + 1); });
