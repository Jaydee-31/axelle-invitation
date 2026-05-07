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

rsvpYes.addEventListener('click', () => {
  modalOverlay.classList.remove('open');
  document.getElementById('ty-text').textContent = 'Yay! See You There! 🥂';
  document.getElementById('ty-sub').textContent = `I'm so happy you'll be there, ${guestName || "dear guest"}! I'll save a big hug just for you! 🌸`;
  tyMsg.classList.add('show');
  saveDeviceAction(guestName, 'yes').catch(console.error);
});

rsvpNo.addEventListener('click', () => {
  modalOverlay.classList.remove('open');
  document.getElementById('ty-text').textContent = "I'll Miss You! 💕";
  document.getElementById('ty-sub').textContent = `Thank you for letting me know, ${guestName || "dear guest"}. I'll be sending you lots of love! 🌸`;
  tyMsg.classList.add('show');
  saveDeviceAction(guestName, 'no').catch(console.error);
});
