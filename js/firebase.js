import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, deleteDoc, updateDoc, query, orderBy, getDocs, increment, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyCPgtQoMtq51J88lgo3UHqfdRHG5Br3Q_c",
	authDomain: "axelle-invitation.firebaseapp.com",
	projectId: "axelle-invitation",
	storageBucket: "axelle-invitation.firebasestorage.app",
	messagingSenderId: "598307044937",
	appId: "1:598307044937:web:9ca20b4ace929e82fbc998",
	measurementId: "G-E8CJS7LNSZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.firebaseDB = db;
window.firebaseFunctions = {
	collection,
	addDoc,
	doc,
	deleteDoc,
	updateDoc,
	query,
	orderBy,
	getDocs,
	increment,
	serverTimestamp,
};

function saveRsvp(name, response) {
	return addDoc(collection(db, "rsvps"), {
		guestName: name,
		response: response,
		timestamp: serverTimestamp(),
	});
}

window.saveRsvp = saveRsvp;
