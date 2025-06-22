// /dashboard.js

// --- 1. FIREBASE IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
// This is the CORRECT line with writeBatch included
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, writeBatch } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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

// --- 3. FIREBASE INITIALIZATION & DOM ELEMENTS ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Page Elements
const loader = document.getElementById('loader');
const leadsTableContainer = document.getElementById('leadsTableContainer');
const leadsTableBody = document.getElementById('leadsTableBody');
const noLeadsMessage = document.getElementById('noLeadsMessage');
const uploadBtn = document.getElementById('uploadBtn');
const csvFileInput = document.getElementById('csvFileInput');
const fileNameDisplay = document.getElementById('fileName');
const addLeadBtn = document.getElementById('addLeadBtn');

// Modal Elements
const leadModal = document.getElementById('leadModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const leadForm = document.getElementById('leadForm');
const modalTitle = document.getElementById('modalTitle');
const saveLeadBtn = document.getElementById('saveLeadBtn');

// --- 4. HELPER FUNCTIONS (COMPLETE IMPLEMENTATIONS) ---

function showMessage(message, type = 'success') {
    const messageBox = document.getElementById(type === 'success' ? 'successMessage' : 'errorMessage');
    if (!messageBox) return;
    messageBox.textContent = message;
    messageBox.classList.add('show');
    setTimeout(() => messageBox.classList.remove('show'), 4000);
}

function showLoader(show) {
    if (!loader) return;
    loader.classList.toggle('hidden', !show);
}

function parseCSV(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new Error("No file selected."));
        }
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const requiredColumns = ['FirstName', 'LastName', 'Company', 'Role', 'Email'];
                const hasAllColumns = requiredColumns.every(col => results.meta.fields.includes(col));
                if (!hasAllColumns) {
                    return reject(new Error(`CSV missing required columns. Ensure it has: ${requiredColumns.join(', ')}`));
                }
                resolve(results.data);
            },
            error: (error) => reject(new Error(`CSV parsing error: ${error.message}`))
        });
    });
}

// --- 5. CORE LOGIC ---

async function saveLeadsToFirestore(leads, userId) {
    if (!leads || leads.length === 0) throw new Error("No leads to save.");
    
    const batch = writeBatch(db);
    const leadsCollectionRef = collection(db, "users", userId, "leads");

    leads.forEach(leadData => {
        const newLeadRef = doc(leadsCollectionRef);
        const leadWithStatus = { ...leadData, status: 'New Lead', createdAt: new Date() };
        batch.set(newLeadRef, leadWithStatus);
    });

    await batch.commit();
}

function displayLeads(leads) {
    leadsTableBody.innerHTML = '';
    
    const hasLeads = leads.length > 0;
    noLeadsMessage.classList.toggle('hidden', hasLeads);
    leadsTableContainer.classList.toggle('hidden', !hasLeads);

    if (!hasLeads) return;

    leads.forEach(lead => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', lead.id);
        row.innerHTML = `
            <td data-label="Name">${lead.FirstName || ''} ${lead.LastName || ''}</td>
            <td data-label="Company">${lead.Company || ''}</td>
            <td data-label="Email">${lead.Email || ''}</td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="btn-action btn-edit" title="Edit Lead">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn-action btn-remove" title="Remove Lead">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            </td>
        `;
        leadsTableBody.appendChild(row);
    });
}

async function loadLeads(userId) {
    showLoader(true);
    leadsTableContainer.classList.add('hidden');
    noLeadsMessage.classList.add('hidden');
    
    try {
        const leadsCollectionRef = collection(db, "users", userId, "leads");
        const querySnapshot = await getDocs(leadsCollectionRef);
        const leads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        displayLeads(leads);
    } catch (error) {
        console.error("Error loading leads:", error);
        showMessage("Failed to load leads. Check console for details.", "error");
        displayLeads([]); // Show the "no leads" message on error
    } finally {
        showLoader(false);
    }
}

function openLeadModal(lead = null) {
    leadForm.reset();
    if (lead) {
        modalTitle.textContent = 'Edit Lead';
        saveLeadBtn.textContent = 'Save Changes';
        document.getElementById('leadId').value = lead.id;
        document.getElementById('leadFirstName').value = lead.FirstName;
        document.getElementById('leadLastName').value = lead.LastName;
        document.getElementById('leadCompany').value = lead.Company;
        document.getElementById('leadRole').value = lead.Role;
        document.getElementById('leadEmail').value = lead.Email;
    } else {
        modalTitle.textContent = 'Add New Lead';
        saveLeadBtn.textContent = 'Add Lead';
        document.getElementById('leadId').value = '';
    }
    leadModal.classList.add('show');
}

function closeLeadModal() {
    leadModal.classList.remove('show');
}

async function handleSaveLead(e, userId) {
    e.preventDefault();
    const leadId = document.getElementById('leadId').value;
    const leadData = {
        FirstName: document.getElementById('leadFirstName').value.trim(),
        LastName: document.getElementById('leadLastName').value.trim(),
        Company: document.getElementById('leadCompany').value.trim(),
        Role: document.getElementById('leadRole').value.trim(),
        Email: document.getElementById('leadEmail').value.trim(),
    };

    if (!leadData.FirstName || !leadData.Company || !leadData.Email) {
        showMessage('First Name, Company, and Email are required.', 'error');
        return;
    }

    saveLeadBtn.disabled = true;
    try {
        if (leadId) {
            const leadRef = doc(db, "users", userId, "leads", leadId);
            await updateDoc(leadRef, leadData);
            showMessage('Lead updated successfully!', 'success');
        } else {
            const leadsCollectionRef = collection(db, "users", userId, "leads");
            await addDoc(leadsCollectionRef, { ...leadData, status: 'New Lead', createdAt: new Date() });
            showMessage('Lead added successfully!', 'success');
        }
        closeLeadModal();
        await loadLeads(userId);
    } catch (error) {
        console.error("Error saving lead:", error);
        showMessage('Could not save lead.', 'error');
    } finally {
        saveLeadBtn.disabled = false;
    }
}

async function handleRemoveLead(leadId, userId) {
    if (!confirm('Are you sure you want to remove this lead?')) return;
    
    try {
        await deleteDoc(doc(db, "users", userId, "leads", leadId));
        showMessage('Lead removed successfully.', 'success');
        loadLeads(userId); // Refresh the list from the database
    } catch (error) {
        console.error("Error removing lead:", error);
        showMessage('Could not remove lead.', 'error');
    }
}

function setupDashboard(user) {
    const { uid } = user;

    // User Profile UI
    document.getElementById('userProfileContainer').classList.remove('hidden');
    document.getElementById('userNameDisplay').textContent = user.displayName || user.email.split('@')[0];
    document.getElementById('userDropdownToggle').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('userDropdownMenu').classList.toggle('hidden');
    });
    document.addEventListener('click', () => document.getElementById('userDropdownMenu').classList.add('hidden'));
    document.getElementById('logoutButton').addEventListener('click', () => signOut(auth));

    // EVENT LISTENERS
    addLeadBtn.addEventListener('click', () => openLeadModal());
    modalCloseBtn.addEventListener('click', closeLeadModal);
    leadModal.addEventListener('click', (e) => { if (e.target === leadModal) closeLeadModal(); });
    leadForm.addEventListener('submit', (e) => handleSaveLead(e, uid));
    
    csvFileInput.addEventListener('change', (e) => {
        fileNameDisplay.textContent = e.target.files[0] ? e.target.files[0].name : 'No file selected';
    });
    
    uploadBtn.addEventListener('click', async () => {
        const file = csvFileInput.files[0];
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading...';
        try {
            const parsedLeads = await parseCSV(file);
            await saveLeadsToFirestore(parsedLeads, uid);
            showMessage(`${parsedLeads.length} leads saved!`, 'success');
            csvFileInput.value = '';
            fileNameDisplay.textContent = 'No file selected';
            await loadLeads(uid);
        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.textContent = 'Upload CSV';
        }
    });

    leadsTableBody.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('.btn-edit');
        const removeBtn = e.target.closest('.btn-remove');
        if (!editBtn && !removeBtn) return;
        
        const leadRow = e.target.closest('tr');
        const leadId = leadRow.dataset.id;
        
        if (editBtn) {
            const leadRef = doc(db, "users", uid, "leads", leadId);
            const leadSnap = await getDoc(leadRef);
            if (leadSnap.exists()) {
                openLeadModal({ id: leadId, ...leadSnap.data() });
            }
        } else if (removeBtn) {
            handleRemoveLead(leadId, uid);
        }
    });

    // Initial load of data
    loadLeads(uid);
}


// --- 6. AUTHENTICATION LISTENER (ENTRY POINT) ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        setupDashboard(user);
    } else {
        const LOGIN_PAGE_URL = "/loginsignupsys.html";
        if (!window.location.pathname.endsWith(LOGIN_PAGE_URL)) {
            window.location.replace(LOGIN_PAGE_URL);
        }
    }
});

const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');

// This single function now handles everything
function toggleSidebar() {
    document.body.classList.toggle('sidebar-is-open');
    sidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');
}

hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents clicks from propagating
    toggleSidebar();
});

sidebarOverlay.addEventListener('click', toggleSidebar);

sidebarLogoutBtn.addEventListener('click', () => {
    signOut(auth).catch(error => console.error('Sign Out Error', error));
});
// Close sidebar if user clicks on the dark overlay
document.addEventListener('click', (e) => {
    if (document.body.classList.contains('sidebar-open')) {
        if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            document.body.classList.remove('sidebar-open');
        }
    }
});

// Handle the logout button inside the sidebar
if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', () => {
        // We reuse the same logic from the other logout button
        // Assuming 'auth' and 'signOut' are available from your firebase module
        signOut(auth).catch(error => console.error('Sign Out Error', error));
    });
}