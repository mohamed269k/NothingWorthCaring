// /firebase-app.js

// --- 1. FIREBASE IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// --- 2. FIREBASE CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyDmWNfHVuzEZariM7hPunt3zXeEXKSBlk0",
    authDomain: "project01-6dc41.firebaseapp.com",
    projectId: "project01-6dc41",
    storageBucket: "project01-6dc41.firebasestorage.app",
    messagingSenderId: "714586325510",
    appId: "1:714586325510:web:8d57e4654877ff298b7987",
    measurementId: "G-0BM2TWETQW"
};

// --- 3. FIREBASE INITIALIZATION ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- 4. SENDER PROFILE UI & DATABASE LOGIC ---

/**
 * Updates the UI to show the saved sender information.
 * @param {object} senderData The object containing sender info.
 */
function switchToDisplayView(senderData) {
    const section = document.getElementById('senderInfoSection');
    if (!section) return;

    document.getElementById('displaySenderName').textContent = `${senderData.firstName} ${senderData.lastName}`;
    document.getElementById('displaySenderTitle').textContent = `${senderData.role} at ${senderData.company}`;
    document.getElementById('displaySenderEmail').textContent = senderData.email;
    section.classList.add('is-saved');
}

/**
 * Updates the UI to show the sender information form.
 */
function switchToEditView() {
    const section = document.getElementById('senderInfoSection');
    if(section) section.classList.remove('is-saved');
}

/**
 * Saves the sender information from the form to Firestore.
 */
async function saveSenderInfo() {
    const user = auth.currentUser;
    if (!user) {
        // This file needs access to your main script's showMessage function
        if (window.showMessage) {
            window.showMessage('You must be logged in to save information.', 'error');
        }
        return;
    }

    const senderData = {
        firstName: document.getElementById('senderFirstName').value.trim(),
        lastName: document.getElementById('senderLastName').value.trim(),
        company: document.getElementById('senderCompany').value.trim(),
        role: document.getElementById('senderRole').value.trim(),
        email: document.getElementById('senderEmail').value.trim(),
        phone: document.getElementById('senderPhone').value.trim(),
        bio: document.getElementById('senderBio').value.trim()
    };
    
    if (!senderData.firstName || !senderData.lastName || !senderData.company || !senderData.role || !senderData.email) {
        if (window.showMessage) {
            window.showMessage('Please fill in all required sender fields before saving.', 'error');
        }
        return;
    }

    try {
        const docRef = doc(db, "senderProfiles", user.uid);
        await setDoc(docRef, senderData);
        switchToDisplayView(senderData);
        if (window.showMessage) {
            window.showMessage('Sender information saved!', 'success');
        }
    } catch (error) {
        console.error("Error saving sender profile: ", error);
        if (window.showMessage) {
            window.showMessage('Could not save information. Please try again.', 'error');
        }
    }
}

/**
 * Fetches the sender profile from Firestore for the user and updates the UI.
 * @param {object} user The Firebase user object.
 */
async function loadSenderProfile(user) {
    if (!user) return;
    const docRef = doc(db, "senderProfiles", user.uid);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('senderFirstName').value = data.firstName || '';
            document.getElementById('senderLastName').value = data.lastName || '';
            document.getElementById('senderCompany').value = data.company || '';
            document.getElementById('senderRole').value = data.role || '';
            document.getElementById('senderEmail').value = data.email || '';
            document.getElementById('senderPhone').value = data.phone || '';
            document.getElementById('senderBio').value = data.bio || '';
            switchToDisplayView(data);
        }
    } catch (error) {
        console.error("Error loading sender profile: ", error);
    }
}

/**
 * Fetches all leads from the user's "leads" subcollection in Firestore.
 * @param {object} db - The Firestore database instance.
 * @param {string} userId - The UID of the current user.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of lead objects.
 */
export async function fetchUserLeads(db, userId) {
    if (!userId) {
        console.error("User ID is required to fetch leads.");
        return [];
    }
    try {
        const leads = [];
        const leadsCollectionRef = collection(db, "users", userId, "leads");
        const querySnapshot = await getDocs(leadsCollectionRef);
        querySnapshot.forEach(doc => {
            leads.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return leads;
    } catch (error) {
        console.error("Error fetching user leads:", error);
        if(window.showMessage) {
            window.showMessage('Could not fetch your leads. Please try again.', 'error');
        }
        return [];
    }
}

// --- 5. MAIN AUTHENTICATION LISTENER ---
// This is the entry point that runs automatically.
onAuthStateChanged(auth, async (user) => {
    const userProfileContainer = document.getElementById('userProfileContainer');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    if (!user) {
        // User is not signed in, redirect to login page.
        if (userProfileContainer) userProfileContainer.classList.add('hidden');
        if (userDropdownMenu) userDropdownMenu.classList.add('hidden');
        
        const LOGIN_PAGE_URL = "/loginsignupsys.html";
        if (!window.location.pathname.endsWith(LOGIN_PAGE_URL)) { 
            window.location.replace(LOGIN_PAGE_URL); 
        }
    } else {
        // User is signed in, set up the UI and listeners.
        if (userProfileContainer) userProfileContainer.classList.remove('hidden');
        
        const userNameDisplay = document.getElementById('userNameDisplay');
        if (userNameDisplay) {
            userNameDisplay.textContent = user.displayName || user.email.split('@')[0];
        }

        // Attach event listeners for sender info and logout
        document.getElementById('saveSenderBtn')?.addEventListener('click', saveSenderInfo);
        document.getElementById('editSenderBtn')?.addEventListener('click', switchToEditView);
        document.getElementById('logoutButton')?.addEventListener('click', () => signOut(auth));

        // Load the user's saved data from the database
        await loadSenderProfile(user);
    }
});

// --- 6. GLOBAL EVENT LISTENERS (for UI elements like dropdowns) ---
document.addEventListener('click', (event) => {
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const userDropdownToggle = document.getElementById('userDropdownToggle');
    if (userDropdownMenu?.classList.contains('hidden')) return;

    if (!userDropdownMenu.contains(event.target) && !userDropdownToggle.contains(event.target)) {
        userDropdownMenu.classList.add('hidden');
    }
});

document.getElementById('userDropdownToggle')?.addEventListener('click', (event) => {
    event.stopPropagation(); 
    document.getElementById('userDropdownMenu')?.classList.toggle('hidden');
});