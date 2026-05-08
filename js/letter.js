function animateLetter() {
	const dear = document.getElementById("letter-dear");
	dear.textContent = `Dear ${guestName || "Friend"},`;

	const body = document.getElementById("letter-body");
	body.innerHTML = "";
	const words = letterMsgShort.split(" ");
	words.forEach((w, i) => {
		const span = document.createElement("span");
		span.className = "word";
		span.textContent = w;
		body.appendChild(span);
		if (i < words.length - 1) body.appendChild(document.createTextNode(" "));
	});
	const wordEls = body.querySelectorAll(".word");
	wordEls.forEach((el, i) => {
		setTimeout(() => el.classList.add("visible"), 400 + i * 80);
	});
}
