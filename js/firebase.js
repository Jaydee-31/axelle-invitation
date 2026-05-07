import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, getDoc, setDoc, deleteDoc, updateDoc, query, orderBy, getDocs, increment, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

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
	getDoc,
	setDoc,
	deleteDoc,
	updateDoc,
	query,
	orderBy,
	getDocs,
	increment,
	serverTimestamp,
};

// ─── Device ID helpers ────────────────────────────────────────────────────────

// Returns the stored device ID or generates + persists a new one.
function getOrCreateDeviceId() {
	let id = localStorage.getItem("axelle_device_id");
	if (!id) {
		// Combine timestamp + random suffix for uniqueness.
		id = "dev_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
		localStorage.setItem("axelle_device_id", id);
	}
	return id;
}

// Builds the fields that are always refreshed on every action.
function currentDeviceInfo() {
	return {
		userAgent: navigator.userAgent,
		platform: navigator.platform,
		language: navigator.language,
		screenSize: `${screen.width}x${screen.height}`,
	};
}

// ─── Main save function ───────────────────────────────────────────────────────

/**
 * Saves an RSVP action to the `devices` collection using deviceId as the
 * document ID, so the same browser never creates duplicate records.
 *
 * - New device  → creates a full document with firstSeenAt + all fields.
 * - Known device → updates only lastActionAt, device info, and the latest
 *                  guestName / response.
 */
async function saveDeviceAction(guestName, response) {
	const deviceId = getOrCreateDeviceId();
	const deviceRef = doc(db, "guest_responses", deviceId);
	const snapshot = await getDoc(deviceRef);

	const updatedFields = {
		...currentDeviceInfo(),
		lastActionAt: serverTimestamp(),
		guestName: guestName || null,
		response,
	};

	if (!snapshot.exists()) {
		// First time this device performs an action — create the full document.
		await setDoc(deviceRef, {
			deviceId,
			firstSeenAt: serverTimestamp(),
			...updatedFields,
		});
	} else {
		// Device already known — only refresh the mutable fields.
		await updateDoc(deviceRef, updatedFields);
	}
}

window.saveDeviceAction = saveDeviceAction;
