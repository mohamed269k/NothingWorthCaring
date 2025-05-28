// script.js
const form = document.getElementById('emailForm');
const generateBtn = document.getElementById('generateBtn');
const outputBox = document.getElementById('outputBox');
const copyBtn = document.getElementById('copyBtn');

// Language selector element
const languageSelector = document.getElementById('languageSelector');

// User information input elements
const yourNameInput = document.getElementById('yourName');
const yourEmailInput = document.getElementById('yourEmail');
const yourPhoneInput = document.getElementById('yourPhone');
const yourCompanyInput = document.getElementById('yourCompany');

// Your Gemini API Key
const API_KEY = 'AIzaSyAMIen9b701UekKNPVEuICV42kFZmhoUs4'; 

// --- Language Translations Object ---
const translations = {
    en: {
        documentTitle: "IgniteInbox: Your AI-Powered Outreach Engine",
        headerTitle: "IgniteInbox", // Emoji added in HTML
        headerTagline: "Your AI-Powered Outreach Engine",
        apiConfigTitle: "API Configuration", // Emoji added in HTML
        apiConfigText: "Your Gemini API is configured and ready to generate emails!",
        yourSenderDetailsTitle: "Your Sender Details", // Emoji added in HTML
        yourNameLabel: "Your Name",
        yourNamePlaceholder: "e.g., Alex Johnson",
        yourEmailLabel: "Your Email",
        yourEmailPlaceholder: "e.g., alex.j@yourcompany.com",
        yourPhoneLabel: "Your Phone Number (Optional)",
        yourPhonePlaceholder: "e.g., +1 (555) 123-4567",
        yourCompanyLabel: "Your Company/Title (Optional)",
        yourCompanyPlaceholder: "e.g., CEO, Spark Solutions Inc.",
        recipientDetailsTitle: "Recipient & Pitch Details", // Emoji added in HTML
        recipientNameLabel: "Recipient's Name",
        recipientNamePlaceholder: "e.g., Sarah Davies",
        companyNameLabel: "Company Name",
        companyNamePlaceholder: "e.g., InnovateTech Inc.",
        jobTitleLabel: "Role/Job Title",
        jobTitlePlaceholder: "e.g., Head of Product, Marketing Manager",
        emailToneLabel: "Desired Email Tone",
        selectTonePlaceholder: "Select a tone for your email...",
        toneFormal: "Formal & Professional",
        toneFriendly: "Friendly & Approachable",
        toneBold: "Bold & Direct",
        toneCasual: "Casual & Conversational",
        tonePersuasive: "Highly Persuasive",
        productServiceLabel: "Product/Service to Pitch",
        productServicePlaceholder: "Clearly describe your product or service and its key benefit for the recipient. Be specific! e.g., 'Our AI-powered CRM helps sales teams automate lead nurturing and close deals 30% faster.'",
        generateButton: "Generate Email", 
        generatedEmailTitle: "Your Generated Email", // Emoji added in HTML
        copyButton: "Copy to Clipboard", 
        outputBoxInitialText: "Your perfectly crafted, AI-generated cold email will appear here, ready to send!",
        // JS Alert/Dynamic messages
        alertFillRequired: "Please fill in all *required* fields.",
        generateButtonLoading: "Crafting Your Masterpiece...",
        outputBoxLoading: "IgniteInbox is firing up the engines to craft your perfect cold email...",
        copyButtonCopied: "Copied!",
        copyButtonFailed: "Failed!",
        errorApi: "Error generating email: ",
        errorApiProblem: "\n\nPlease check the browser console for more details.",
        errorApi403: "\n\nPossible issue: Invalid or missing API key, or API not enabled for your project.",
        errorApi400: "\n\nPossible issue: Malformed request, rate limit exceeded, or content moderation violation.",
        errorApi500: "\n\nPossible issue: Google API server error. Please try again later.",
        errorApiInvalidResponse: "Invalid response format from API. Please try again or check API documentation.",
        signatureBestRegards: "Best regards,",
        signatureEmail: "Email:",
        signaturePhone: "Phone:"
    },
    fr: {
        documentTitle: "IgniteInbox: Votre Moteur d'Outreach IA",
        headerTitle: "IgniteInbox",
        headerTagline: "Votre Moteur d'Outreach IA",
        apiConfigTitle: "Configuration API",
        apiConfigText: "Votre API Gemini est configurée et prête à générer des e-mails !",
        yourSenderDetailsTitle: "Vos Coordonnées d'Expéditeur",
        yourNameLabel: "Votre Nom",
        yourNamePlaceholder: "ex: Alex Johnson",
        yourEmailLabel: "Votre E-mail",
        yourEmailPlaceholder: "ex: alex.j@votreentreprise.com",
        yourPhoneLabel: "Votre Numéro de Téléphone (Facultatif)",
        yourPhonePlaceholder: "ex: +33 6 12 34 56 78",
        yourCompanyLabel: "Votre Entreprise/Titre (Facultatif)",
        yourCompanyPlaceholder: "ex: PDG, Spark Solutions Inc.",
        recipientDetailsTitle: "Détails du Destinataire et du Pitch",
        recipientNameLabel: "Nom du Destinataire",
        recipientNamePlaceholder: "ex: Sarah Davies",
        companyNameLabel: "Nom de l'Entreprise",
        companyNamePlaceholder: "ex: InnovateTech Inc.",
        jobTitleLabel: "Rôle/Titre du Poste",
        jobTitlePlaceholder: "ex: Directeur Produit, Responsable Marketing",
        emailToneLabel: "Ton d'E-mail Souhaité",
        selectTonePlaceholder: "Sélectionnez un ton pour votre e-mail...",
        toneFormal: "Formel & Professionnel",
        toneFriendly: "Amicable & Abordable",
        toneBold: "Audacieux & Direct",
        toneCasual: "Décontracté & Conversationnel",
        tonePersuasive: "Très Persuasif",
        productServiceLabel: "Produit/Service à Proposer",
        productServicePlaceholder: "Décrivez clairement votre produit ou service et son avantage clé pour le destinataire. Soyez précis ! ex: 'Notre CRM alimenté par l'IA aide les équipes de vente à automatiser le nurturing des leads et à conclure des affaires 30% plus rapidement.'",
        generateButton: "Générer l'E-mail",
        generatedEmailTitle: "Votre E-mail Généré",
        copyButton: "Copier dans le Presse-papiers",
        outputBoxInitialText: "Votre e-mail froid, parfaitement rédigé par l'IA, apparaîtra ici, prêt à être envoyé !",
        // JS Alert/Dynamic messages
        alertFillRequired: "Veuillez remplir tous les champs *obligatoires*.",
        generateButtonLoading: "Création de votre chef-d'œuvre...",
        outputBoxLoading: "IgniteInbox démarre les moteurs pour créer votre e-mail froid parfait...",
        copyButtonCopied: "Copié !",
        copyButtonFailed: "Échec !",
        errorApi: "Erreur lors de la génération de l'e-mail : ",
        errorApiProblem: "\n\nVeuillez vérifier la console du navigateur pour plus de détails.",
        errorApi403: "\n\nProblème possible : Clé API invalide ou manquante, ou API non activée pour votre projet.",
        errorApi400: "\n\nProblème possible : Requête malformée, limite de taux dépassée, ou violation de la modération du contenu.",
        errorApi500: "\n\nProblème possible : Erreur du serveur API Google. Veuillez réessayer plus tard.",
        errorApiInvalidResponse: "Format de réponse invalide de l'API. Veuillez réessayer ou consulter la documentation de l'API.",
        signatureBestRegards: "Cordialement,",
        signatureEmail: "E-mail :",
        signaturePhone: "Téléphone :"
    },
    ar: {
        documentTitle: "إجنايت إنبوكس: محرك التواصل الخاص بك بالذكاء الاصطناعي",
        headerTitle: "إجنايت إنبوكس",
        headerTagline: "محرك التواصل الخاص بك بالذكاء الاصطناعي",
        apiConfigTitle: "إعدادات واجهة برمجة التطبيقات",
        apiConfigText: "واجهة برمجة تطبيقات Gemini جاهزة لإنشاء رسائل البريد الإلكتروني!",
        yourSenderDetailsTitle: "تفاصيل المرسل الخاصة بك",
        yourNameLabel: "اسمك",
        yourNamePlaceholder: "مثال: أليكس جونسون",
        yourEmailLabel: "بريدك الإلكتروني",
        yourEmailPlaceholder: "مثال: alex.j@yourcompany.com",
        yourPhoneLabel: "رقم هاتفك (اختياري)",
        yourPhonePlaceholder: "مثال: 009665xxxxxxxx",
        yourCompanyLabel: "شركتك/منصبك (اختياري)",
        yourCompanyPlaceholder: "مثال: الرئيس التنفيذي، سبارك سوليوشنز",
        recipientDetailsTitle: "تفاصيل المستلم وعرض الموضوع",
        recipientNameLabel: "اسم المستلم",
        recipientNamePlaceholder: "مثال: سارة ديفيز",
        companyNameLabel: "اسم الشركة",
        companyNamePlaceholder: "مثال: إنوفيتك إنك.",
        jobTitleLabel: "الدور/المسمى الوظيفي",
        jobTitlePlaceholder: "مثال: مدير المنتج، مدير التسويق",
        emailToneLabel: "نبرة البريد الإلكتروني المطلوبة",
        selectTonePlaceholder: "اختر نبرة لبريدك الإلكتروني...",
        toneFormal: "رسمية ومهنية",
        toneFriendly: "ودودة وودودة",
        toneBold: "جريئة ومباشرة",
        toneCasual: "عفوية ومحادثة",
        tonePersuasive: "مقنعة للغاية",
        productServiceLabel: "المنتج/الخدمة المراد عرضها",
        productServicePlaceholder: "صف بوضوح منتجك أو خدمتك وفائدتها الرئيسية للمستلم. كن محددًا! مثال: 'يساعد نظام إدارة علاقات العملاء المدعوم بالذكاء الاصطناعي فرق المبيعات على أتمتة رعاية العملاء وإبرام الصفقات بشكل أسرع بنسبة 30٪.'",
        generateButton: "إنشاء بريد إلكتروني",
        generatedEmailTitle: "بريدك الإلكتروني الذي تم إنشاؤه",
        copyButton: "نسخ إلى الحافظة",
        outputBoxInitialText: "سيظهر بريدك الإلكتروني البارد المصمم بشكل مثالي بواسطة الذكاء الاصطناعي هنا، جاهزًا للإرسال!",
        // JS Alert/Dynamic messages
        alertFillRequired: "يرجى ملء جميع الحقول *المطلوبة*.",
        generateButtonLoading: "جاري إنشاء تحفتك...",
        outputBoxLoading: "إجنايت إنبوكس يشغل المحركات لصياغة بريدك الإلكتروني البارد المثالي...",
        copyButtonCopied: "تم النسخ!",
        copyButtonFailed: "فشل!",
        errorApi: "خطأ في إنشاء البريد الإلكتروني: ",
        errorApiProblem: "\n\nيرجى التحقق من وحدة تحكم المتصفح لمزيد من التفاصيل.",
        errorApi403: "\n\nمشكلة محتملة: مفتاح API غير صالح أو مفقود، أو API غير مفعل لمشروعك.",
        errorApi400: "\n\nمشكلة محتملة: طلب خاطئ، تجاوز حد المعدل، أو انتهاك اعتدال المحتوى.",
        errorApi500: "\n\nمشكلة محتملة: خطأ في خادم API Google. يرجى المحاولة مرة أخرى لاحقًا.",
        errorApiInvalidResponse: "تنسيق استجابة غير صالح من API. يرجى المحاولة مرة أخرى أو مراجعة وثائق API.",
        signatureBestRegards: "مع خالص التقدير،",
        signatureEmail: "البريد الإلكتروني:",
        signaturePhone: "الهاتف:"
    }
};

// Function to save user data to localStorage
function saveUserData() {
    localStorage.setItem('yourName', yourNameInput.value);
    localStorage.setItem('yourEmail', yourEmailInput.value);
    localStorage.setItem('yourPhone', yourPhoneInput.value);
    localStorage.setItem('yourCompany', yourCompanyInput.value);
}

// Function to load user data from localStorage
function loadUserData() {
    yourNameInput.value = localStorage.getItem('yourName') || '';
    yourEmailInput.value = localStorage.getItem('yourEmail') || '';
    yourPhoneInput.value = localStorage.getItem('yourPhone') || '';
    yourCompanyInput.value = localStorage.getItem('yourCompany') || '';
}

// Function to apply translations based on the selected language
function applyTranslations(lang) {
    const currentTranslations = translations[lang];
    if (!currentTranslations) {
        console.warn(`No translations found for language: ${lang}`);
        return;
    }

    // Update document title and body direction
    document.title = currentTranslations.documentTitle;
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // Update all elements with data-key attributes
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        if (currentTranslations[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // For input and textarea, update placeholder text
                element.placeholder = currentTranslations[key];
            } else if (element.tagName === 'OPTION') {
                // For select options, update text content
                element.textContent = currentTranslations[key];
            } else if (element.tagName === 'BUTTON') {
                // For buttons, set innerHTML including icon.
                // The icon (🚀 or 📋) is now managed by the JS for dynamic changes.
                if (key === 'generateButton') {
                    element.innerHTML = `🚀 ${currentTranslations[key]}`;
                } else if (key === 'copyButton') {
                    element.innerHTML = `📋 ${currentTranslations[key]}`;
                } else {
                    // For any other buttons with data-key that might appear
                    element.textContent = currentTranslations[key];
                }
            } else {
                // For all other elements, update text content
                element.textContent = currentTranslations[key];
            }
        }
    });

    // Manually ensure header emojis are present as they are static in HTML
    document.querySelector('[data-key="headerTitle"]').innerHTML = `✨ ${currentTranslations.headerTitle}`;
    document.querySelector('[data-key="apiConfigTitle"]').innerHTML = `🔑 ${currentTranslations.apiConfigTitle}`;
    document.querySelector('[data-key="yourSenderDetailsTitle"]').innerHTML = `👤 ${currentTranslations.yourSenderDetailsTitle}`;
    document.querySelector('[data-key="recipientDetailsTitle"]').innerHTML = `🎯 ${currentTranslations.recipientDetailsTitle}`;
    document.querySelector('[data-key="generatedEmailTitle"]').innerHTML = `📬 ${currentTranslations.generatedEmailTitle}`;

    // Update output box initial text based on current language
    if (outputBox.textContent === translations.en.outputBoxInitialText ||
        outputBox.textContent === translations.fr.outputBoxInitialText ||
        outputBox.textContent === translations.ar.outputBoxInitialText) {
        outputBox.textContent = currentTranslations.outputBoxInitialText;
    }
}

// --- Event Listeners ---

// Language change event listener
languageSelector.addEventListener('change', (event) => {
    const newLang = event.target.value;
    localStorage.setItem('selectedLanguage', newLang); // Save user's language preference
    applyTranslations(newLang); // Apply translations immediately
});

// Form submission event listener
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentLang = localStorage.getItem('selectedLanguage') || 'en'; // Get current language for messages
    const langMsgs = translations[currentLang]; // Access translated messages

    console.log('Form submitted!');

    // Collect all form data, including user's own info
    const formData = {
        recipientName: document.getElementById('recipientName').value,
        companyName: document.getElementById('companyName').value,
        jobTitle: document.getElementById('jobTitle').value,
        emailTone: document.getElementById('emailTone').value,
        productService: document.getElementById('productService').value,
        
        yourName: yourNameInput.value,
        yourEmail: yourEmailInput.value,
        yourPhone: yourPhoneInput.value,
        yourCompany: yourCompanyInput.value
    };
    
    console.log('Form data:', formData);

    // Check if all required fields are filled using translated alert message
    if (!formData.recipientName || !formData.companyName || !formData.jobTitle || !formData.emailTone || !formData.productService ||
        !formData.yourName || !formData.yourEmail) {
        alert(langMsgs.alertFillRequired);
        return;
    }

    // Save user data before generating email
    saveUserData();

    // Update button and output box with translated loading messages
    generateBtn.disabled = true;
    generateBtn.innerHTML = `🤖 ${langMsgs.generateButtonLoading}`; // Add robot emoji for loading
    outputBox.textContent = langMsgs.outputBoxLoading;
    outputBox.className = 'output-box loading';
    copyBtn.disabled = true;

    try {
        console.log('Making API request...');

        // Construct the signature block using translated phrases
        let signature = `\n\n${langMsgs.signatureBestRegards},\n${formData.yourName}`;
        if (formData.yourCompany) {
            signature += `\n${formData.yourCompany}`;
        }
        signature += `\n${langMsgs.signatureEmail} ${formData.yourEmail}`;
        if (formData.yourPhone) {
            signature += `\n${langMsgs.signaturePhone} ${formData.yourPhone}`;
        }

        // Include desired output language in the prompt for the AI
        const prompt = `Write a ${formData.emailTone} cold email to ${formData.jobTitle} at ${formData.companyName} named ${formData.recipientName}. The email should pitch: ${formData.productService}.
        
The email language should be in ${currentLang === 'en' ? 'English' : currentLang === 'fr' ? 'French' : 'Arabic'}.

Make the email:
- Professional and personalized
- Include a compelling subject line (e.g., "Subject: Relevant Title")
- Have a clear call-to-action
- Be concise but persuasive
- Follow cold email best practices
- **Crucially, end the email with a professional closing and the sender's details:**
${signature}

Format the response as a complete email with Subject line and body.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024,
                }
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            let errorMessage = langMsgs.errorApi + (errorData.error?.message || `HTTP error! Status: ${response.status}`);
            if (response.status === 403) {
                errorMessage += langMsgs.errorApi403;
            } else if (response.status === 400) {
                errorMessage += langMsgs.errorApi400;
            } else if (response.status === 500) {
                errorMessage += langMsgs.errorApi500;
            }
            errorMessage += langMsgs.errorApiProblem;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
            throw new Error(langMsgs.errorApiInvalidResponse);
        }
        
        const generatedEmail = data.candidates[0].content.parts[0].text;

        outputBox.textContent = generatedEmail;
        outputBox.className = 'output-box';
        copyBtn.disabled = false;

    } catch (error) {
        console.error('Error:', error);
        outputBox.textContent = error.message; // Error message is already translated by the catch block
        outputBox.className = 'output-box error';
    } finally {
        generateBtn.disabled = false;
        // Reset button text to the original translated 'Generate Email' with its emoji
        generateBtn.innerHTML = `🚀 ${langMsgs.generateButton}`; 
    }
});

// Copy to clipboard event listener
copyBtn.addEventListener('click', async () => {
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    const langMsgs = translations[currentLang];
    try {
        await navigator.clipboard.writeText(outputBox.textContent);
        copyBtn.innerHTML = `✅ ${langMsgs.copyButtonCopied}`; // Translated "Copied!" with emoji
        setTimeout(() => {
            copyBtn.innerHTML = `📋 ${langMsgs.copyButton}`; // Reset t
