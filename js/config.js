const params = new URLSearchParams(window.location.search);
const guestName = params.get("guest") || null;

if (!guestName || !guestName.trim()) {
	document.getElementById("error-screen").style.display = "flex";
	document.getElementById("intro").style.display = "none";
}

const _nameLower = guestName ? guestName.toLowerCase() : "";
const godparentRole = _nameLower.includes("ninong") ? "Ninong" : _nameLower.includes("ninang") ? "Ninang" : null;
const SCENE_DURATION = 7000;
const LETTER_SCENE_DURATION = 20000;

const letterMsg = `Even though I’m just a tiny baby, I already know how special you are to me. Mama and Papa have chosen you to be my ${godparentRole || "Ninong / Ninang"} — to guide me, pray for me, and walk beside me as I grow in faith. I may not be able to say it yet, but my heart is already so thankful for you. Please come and celebrate this special moment with me. Your presence on my big day would mean the whole world to this little girl. I already love you so much! With all my tiny heart, Axelle 🌸`;
