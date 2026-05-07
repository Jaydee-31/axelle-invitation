const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');
const tyMsg = document.getElementById('ty-msg');

function openModal() {
  modalOverlay.classList.add('open');
}

modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('open');
});

async function handleRsvp(response) {
  const loader = document.getElementById('modal-loading');
  rsvpYes.disabled = true;
  rsvpNo.disabled = true;
  loader.classList.add('active');

  try {
    await saveDeviceAction(guestName, response);
  } catch (e) {
    console.error(e);
  }

  loader.classList.remove('active');
  rsvpYes.disabled = false;
  rsvpNo.disabled = false;
  modalOverlay.classList.remove('open');

  if (response === 'yes') {
    document.getElementById('ty-text').textContent = 'Yay! See You There! 🥂';
    document.getElementById('ty-sub').textContent = `I'm so happy you'll be there, ${guestName || "dear guest"}! I'll save a big hug just for you! 🌸`;
  } else {
    document.getElementById('ty-text').textContent = "I'll Miss You! 💕";
    document.getElementById('ty-sub').textContent = `Thank you for letting me know, ${guestName || "dear guest"}. I'll be sending you lots of love! 🌸`;
  }
  tyMsg.classList.add('show');
}

rsvpYes.addEventListener('click', () => handleRsvp('yes'));
rsvpNo.addEventListener('click', () => handleRsvp('no'));
