// Firebase configuration from your provided HTML
const firebaseConfig = {
    apiKey: "AIzaSyDmWNfHVuzEZariM7hPunt3zXeEXKSBlk0",
    authDomain: "project01-6dc41.firebaseapp.com",
    projectId: "project01-6dc41",
    storageBucket: "project01-6dc41.firebasestorage.app",
    messagingSenderId: "714586325510",
    appId: "1:714586325510:web:8d57e4654877ff298b7987",
    measurementId: "G-0BM2TWETQW" // Analytics is not directly used here but is part of the config
};

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    onAuthStateChanged,
    updateProfile // To set display name during signup
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the Auth service instance

// --- Constants ---
const REDIRECTION_URL = '/app/index.html'; // Your target website

// --- Utility Functions ---
// Initialize Lucide icons (must be called after DOM is loaded)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function togglePassword(button) {
    const input = button.previousElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    // Re-render icon after changing its data-lucide attribute
    if (typeof lucide !== 'undefined') {
        lucide.createIcons(); 
    }
}

function toggleCheckbox(checkbox) {
    checkbox.classList.toggle('checked');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// --- Form Switching Functions ---
function showLogin(event) {
    if (event) event.preventDefault();
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('forgotForm').classList.add('hidden');
    resetFormErrors(document.getElementById('loginUserForm'));
}

function showSignup(event) {
    if (event) event.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('forgotForm').classList.add('hidden');
    resetFormErrors(document.getElementById('signupUserForm'));
}

function showForgotPassword(event) {
    if (event) event.preventDefault();
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('forgotForm').classList.remove('hidden');
    resetFormErrors(document.getElementById('forgotPasswordForm'));
    // Pre-fill email if available from login form
    const loginEmail = document.getElementById('loginEmail').value;
    if (loginEmail && validateEmail(loginEmail)) {
        document.getElementById('forgotEmail').value = loginEmail;
    }
}

function resetFormErrors(formElement) {
    if (!formElement) return; // Guard against null forms during quick switching
    formElement.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('error', 'success');
    });
    formElement.querySelectorAll('.error-message').forEach(msg => {
        msg.classList.remove('show');
        // Reset text to default if it was changed by an error
        msg.textContent = msg.getAttribute('data-default-message') || msg.textContent; 
    });
}

function displayError(inputElement, errorMessageElement, message) {
    inputElement.classList.add('error');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.classList.add('show');
    }
}

function setButtonLoading(button, isLoading, originalText, loadingText) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.textContent = loadingText;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        button.textContent = originalText;
    }
}

// --- Firebase Authentication Handlers ---

// Handle login form submission
document.getElementById('loginUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    const loginButton = document.getElementById('loginButton');

    resetFormErrors(event.target); // Clear previous errors

    let isValid = true;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!validateEmail(email)) {
        displayError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    }

    if (!password) { 
        displayError(passwordInput, passwordError, 'Password cannot be empty');
        isValid = false;
    }

    if (!isValid) return;

    setButtonLoading(loginButton, true, 'Sign in', 'Signing in...');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged listener will handle redirection on successful login
    } catch (error) {
        console.error("Login error:", error.code, error.message);
        let errorMessage = "An unknown error occurred. Please try again.";
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address format.';
                displayError(emailInput, emailError, errorMessage);
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled.';
                displayError(emailInput, emailError, errorMessage);
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email.';
                displayError(emailInput, emailError, errorMessage);
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                displayError(passwordInput, passwordError, errorMessage);
                break;
            default:
                displayError(emailInput, emailError, `Error: ${error.message}`);
                break;
        }
    } finally {
        setButtonLoading(loginButton, false, 'Sign in');
    }
});

// Handle signup form submission
document.getElementById('signupUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const firstNameInput = document.getElementById('signupFirstName');
    const lastNameInput = document.getElementById('signupLastName');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const signupButton = document.getElementById('signupButton');

    const firstNameError = document.getElementById('signupFirstNameError');
    const lastNameError = document.getElementById('signupLastNameError');
    const emailError = document.getElementById('signupEmailError');
    const passwordError = document.getElementById('signupPasswordError');
    const termsError = document.getElementById('termsError');

    resetFormErrors(event.target); // Clear previous errors

    let isValid = true;
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!firstName) {
        displayError(firstNameInput, firstNameError, 'First name is required');
        isValid = false;
    }
    if (!lastName) {
        displayError(lastNameInput, lastNameError, 'Last name is required');
        isValid = false;
    }
    if (!validateEmail(email)) {
        displayError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    }
    if (!validatePassword(password)) {
        displayError(passwordInput, passwordError, 'Password must be at least 8 characters');
        isValid = false;
    }
    if (!termsCheckbox.classList.contains('checked')) {
        displayError(termsCheckbox, termsError, 'Please accept the Terms of Service and Privacy Policy');
        isValid = false;
    }

    if (!isValid) return;

    setButtonLoading(signupButton, true, 'Start free trial', 'Creating account...');

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update user profile with first/last name
        await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`
        });
        // onAuthStateChanged listener will handle redirection on successful signup
    } catch (error) {
        console.error("Signup error:", error.code, error.message);
        let errorMessage = "An unknown error occurred. Please try again.";
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already in use by another account.';
                displayError(emailInput, emailError, errorMessage);
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address format.';
                displayError(emailInput, emailError, errorMessage);
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak. Please choose a stronger password.';
                displayError(passwordInput, passwordError, errorMessage);
                break;
            default:
                displayError(emailInput, emailError, `Error: ${error.message}`); 
                break;
        }
    } finally {
        setButtonLoading(signupButton, false, 'Start free trial');
    }
});

// Handle forgot password form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('forgotEmail');
    const emailError = document.getElementById('forgotEmailError');
    const forgotPasswordButton = document.getElementById('forgotPasswordButton');

    resetFormErrors(event.target); // Clear previous errors

    let isValid = true;
    const email = emailInput.value;

    if (!validateEmail(email)) {
        displayError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    }

    if (!isValid) return;

    setButtonLoading(forgotPasswordButton, true, 'Send reset link', 'Sending...');

    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent to your email!');
        showLogin(); // Go back to login after sending link
    } catch (error) {
        console.error("Forgot password error:", error.code, error.message);
        let errorMessage = "An unknown error occurred. Please try again.";
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address format.';
                displayError(emailInput, emailError, errorMessage);
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email.';
                displayError(emailInput, emailError, errorMessage);
                break;
            default:
                displayError(emailInput, emailError, `Error: ${error.message}`);
                break;
        }
    } finally {
        setButtonLoading(forgotPasswordButton, false, 'Send reset link');
    }
});

// --- Authentication State Listener (for redirection) ---
// This listens for any change in the user's authentication state (login, logout, signup)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in. Redirect them.
        console.log("User is signed in:", user.email);
        // Only redirect if not already on the target page to prevent redirect loops
        if (window.location.href !== REDIRECTION_URL && window.location.href !== `${REDIRECTION_URL}/`) {
            window.location.href = REDIRECTION_URL;
        }
    } else {
        // User is signed out or not signed in.
        console.log("No user is signed in.");
        // Ensure forms are visible if no one is logged in.
        // This is important if a user manually navigates back from the main app or if they were logged out.
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const forgotForm = document.getElementById('forgotForm');

        // If all forms are hidden (e.g., after a redirect from a logged-in state), show login
        if (loginForm && loginForm.classList.contains('hidden') && 
            signupForm && signupForm.classList.contains('hidden') && 
            forgotForm && forgotForm.classList.contains('hidden')) {
            showLogin(); // Default to showing the login form
        }
    }
});


// --- Initial Setup and Animations ---
document.addEventListener('DOMContentLoaded', function() {
    const authCard = document.querySelector('.auth-card');
    
    // Add entrance animation
    setTimeout(() => {
        authCard.style.opacity = '1';
        authCard.style.transform = 'translateY(0)';
    }, 100);

    // Store default error messages for easy resetting
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.setAttribute('data-default-message', msg.textContent);
    });

    // Make utility functions globally accessible if they are called by inline onclick attributes
    // This is generally not ideal practice in modern JS but needed for inline HTML attributes
    window.togglePassword = togglePassword;
    window.toggleCheckbox = toggleCheckbox;
    window.showLogin = showLogin;
    window.showSignup = showSignup;
    window.showForgotPassword = showForgotPassword;
});