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
  document.getElementById('ty-text').textContent = 'See You There! 🥂';
  document.getElementById('ty-sub').textContent = `We're so excited to celebrate with you, ${guestName}!`;
  tyMsg.classList.add('show');
  saveRsvp(guestName, 'yes').catch(console.error);
});

rsvpNo.addEventListener('click', () => {
  modalOverlay.classList.remove('open');
  document.getElementById('ty-text').textContent = "We'll Miss You 💕";
  document.getElementById('ty-sub').textContent = `Thank you for letting us know, ${guestName}. We'll be thinking of you!`;
  tyMsg.classList.add('show');
  saveRsvp(guestName, 'no').catch(console.error);
});
