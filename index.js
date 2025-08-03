// --- START OF NEW TEMPLATE SCRIPT ---
const emailTemplates = [
    // --- Sales Outreach ---
    { id: 'sales-co-1', category: 'Sales Outreach', title: 'Classic Intro & Demo', description: 'Introduce your product and ask for a brief demo call.', purposeText: 'Introduce our product, [Your Product/Service Name], which helps companies in the [Prospect\'s Industry] to solve [Common Pain Point]. The goal is to highlight the key benefit of [Benefit 1] and secure a 15-minute introductory call to demonstrate its value.' },
    { id: 'sales-co-2', category: 'Sales Outreach', title: 'Value-First Resource', description: 'Provide immediate value by sharing a helpful resource or insight.', purposeText: 'Start by offering a valuable resource (like a blog post, whitepaper, or tool) that is relevant to the prospect\'s role. The goal is to provide value upfront, establish credibility, and then gently pivot to a conversation about how our solution, [Your Product/Service Name], can help them further.' },
    { id: 'sales-co-3', category: 'Sales Outreach', title: 'Pain Point Focus', description: 'Directly address a specific, researched pain point their company may have.', purposeText: 'Based on my research of [Prospect\'s Company], I believe you might be facing challenges with [Specific, Researched Pain Point]. My goal is to show I\'ve done my homework and explain concisely how [Your Product/Service Name] is designed to alleviate this exact issue.' },
    { id: 'sales-co-4', category: 'Sales Outreach', title: 'Competitor Mention', description: 'Position your solution against a known competitor they might be using.', purposeText: 'Acknowledge that many companies in their space use [Competitor Name]. The goal is to introduce our solution, [Your Product/Service Name], as a compelling alternative, highlighting our key differentiator which is [Unique Differentiator], and ask if they are open to seeing a quick comparison.' },
    { id: 'sales-co-5', category: 'Sales Outreach', title: 'Trigger Event (e.g., Funding)', description: 'Reference a recent company event like a funding round or new hire.', purposeText: 'Congratulate the prospect on their recent [Trigger Event, e.g., funding round, award, major hire]. The goal is to connect this event to a new challenge they might face (e.g., scaling operations) and position [Your Product/Service Name] as the perfect solution to support their growth.' },
    { id: 'sales-co-6', category: 'Sales Outreach', title: 'Question-Based Hook', description: 'Start with a thought-provoking question related to their role or industry.', purposeText: 'Open the email with a compelling question related to their role, such as "What\'s your current strategy for handling [Challenge]?" The goal is to pique their curiosity and then introduce [Your Product/Service Name] as a potential answer to that question.' },
    { id: 'sales-co-7', category: 'Sales Outreach', title: 'Warm Lead (Referral)', description: 'Reach out to a prospect who was referred by a mutual connection.', purposeText: 'State immediately that our mutual connection, [Referrer\'s Name], suggested I get in touch. Mention why the referral was made (e.g., they thought we could help with [Problem]). The goal is to leverage the trust from the referral to secure a meeting.' },
    { id: 'sales-co-8', category: 'Sales Outreach', title: 'Video Pitch Embed', description: 'Mention a short, personalized video you made for them.', purposeText: 'Explain that I have recorded a brief, personalized video (under 60 seconds) specifically for them to demonstrate how [Your Product/Service Name] can impact [Prospect\'s Company]. The goal is to drive them to watch the video and respond to a clear call-to-action within the email.' },

    // --- Follow-up ---
    { id: 'follow-up-1', category: 'Follow-up', title: 'Simple Bump (No Reply)', description: 'A gentle and brief nudge after no response to your first email.', purposeText: 'Gently "bump" my previous email to the top of their inbox. The goal is to ask if they had a chance to consider my earlier message about [Original Topic] and to keep the conversation alive without being pushy.' },
    { id: 'follow-up-2', category: 'Follow-up', title: 'Post-Meeting Summary', description: 'Summarize a recent meeting and confirm the next steps.', purposeText: 'Follow up on our conversation from [Date]. The goal is to briefly recap the key points we discussed, particularly [Key Takeaway], and clearly outline the agreed-upon next step, which is [Agreed Next Step].' },
    { id: 'follow-up-3', category: 'Follow-up', title: 'Value-Add (No Reply)', description: 'Follow up by providing a new piece of valuable information.', purposeText: 'Follow up on my previous email by sharing a new, relevant piece of content (like a case study, article, or quick tip) related to [Original Topic]. The goal is to offer more value and re-engage them in a helpful way.' },
    { id: 'follow-up-4', category: 'Follow-up', title: 'Post-Demo Feedback', description: 'Follow up after a product demo to get feedback and move forward.', purposeText: 'Thank the prospect for their time during our recent demo of [Your Product/Service Name]. The goal is to ask for their initial thoughts or any outstanding questions and to propose the next logical step, such as a trial period or a formal proposal.' },
    { id: 'follow-up-5', category: 'Follow-up', title: 'The "Break-up" Email', description: 'A final attempt to close the loop or get a response.', purposeText: 'Since I haven\'t heard back, I\'ll assume this is not a priority right now and I won\'t continue to follow up. The goal is to close the loop respectfully or to provoke a response from prospects who may have just been busy. End by leaving the door open for the future.' },
    { id: 'follow-up-6', category: 'Follow-up', title: 'After Leaving a Voicemail', description: 'A quick email to reference a voicemail you just left.', purposeText: 'Briefly state that I just left a voicemail regarding [Topic of Voicemail]. The goal is to provide an easy way for them to respond (by replying to the email) and to reinforce the message from the call.' },

    // --- Networking ---
    { id: 'network-1', category: 'Networking', title: 'Connect with Industry Peer', description: 'Reach out to someone in a similar role to share insights.', purposeText: 'Reach out to a peer in the industry. Mention that I admire their work at [Their Company], specifically [Specific Project or Achievement]. The goal is to propose a brief virtual coffee chat to exchange ideas on [Industry Topic] and build a professional connection.' },
    { id: 'network-2', category: 'Networking', title: 'Post-Event Connection', description: 'Follow up with someone you met at a conference or event.', purposeText: 'Mention that it was great meeting them at [Event Name]. Reference a specific topic we discussed, [Topic of Conversation], to jog their memory. The goal is to continue the conversation and solidify the new connection.' },
    { id: 'network-3', category: 'Networking', title: 'Request for Advice', description: 'Humbly ask an expert for their opinion or a brief moment of their time.', purposeText: 'Acknowledge the prospect\'s expertise in [Their Field], referencing a specific article, talk, or project of theirs. The goal is to humbly ask for their brief advice on a specific challenge I\'m facing, emphasizing respect for their busy schedule.' },
    { id: 'network-4', category: 'Networking', title: 'Requesting an Introduction', description: 'Ask a mutual connection to introduce you to someone.', purposeText: 'Ask my connection, [Recipient\'s Name], if they would be willing to introduce me to [Target Person\'s Name]. Clearly and concisely explain why I want the introduction – to discuss [Topic]. The goal is to make it as easy as possible for them to forward the request or make the intro.' },
    { id: 'network-5', category: 'Networking', title: 'Congratulations', description: 'Congratulate a connection on a new job or promotion.', purposeText: 'Congratulate my connection on their new role as [New Role] at [New Company]! The goal is to maintain the relationship, wish them well, and perhaps ask a light question about their new position once they are settled.' },

    // --- Recruiting ---
    { id: 'recruit-1', category: 'Recruiting', title: 'Passive Candidate Outreach', description: 'Contact a promising candidate who isn\'t actively looking for a new job.', purposeText: 'Reach out to a high-potential candidate for the [Job Role] position at my company. Compliment their specific experience (e.g., their work on [Specific Project]) that makes them a great fit. The goal is to introduce the opportunity in a low-pressure way and ask if they would be open to a confidential, exploratory conversation.' },
    { id: 'recruit-2', category: 'Recruiting', title: 'Referral Candidate', description: 'Contact a candidate who was referred by an employee or connection.', purposeText: 'Immediately mention that [Referrer\'s Name] recommended them as a top talent in [Field]. The goal is to leverage the warm introduction to express strong interest in their profile for our [Job Role] position and schedule an initial call.' },
    { id: 'recruit-3', category: 'Recruiting', title: 'Interview Confirmation', description: 'Confirm interview details with a candidate.', purposeText: 'Confirm the details for the upcoming interview for the [Job Role] position. The goal is to clearly state the date, time, location (or video link), and who they will be meeting with, and provide any necessary materials for them to review beforehand.' },
    { id: 'recruit-4', category: 'Recruiting', title: 'Post-Interview Follow-up', description: 'Follow up with a candidate to provide an update on the hiring process.', purposeText: 'Thank the candidate for their time interviewing for the [Job Role] position. The goal is to provide an update on the timeline for next steps and to keep them engaged and informed about the process.' },
    { id: 'recruit-5', category: 'Recruiting', title: 'Polite Rejection', description: 'A respectful rejection email to a candidate who was not selected.', purposeText: 'Thank the candidate for their interest and time interviewing for the [Job Role]. The goal is to inform them that we have decided to move forward with another candidate, while still being respectful, professional, and encouraging them to apply for future roles.' },
    { id: 'recruit-6', category: 'Recruiting', title: 'Job Offer', description: 'Officially extend a job offer to a successful candidate.', purposeText: 'Express excitement in formally offering the candidate the position of [Job Role] at [Your Company]. The goal is to clearly outline the key terms of the offer (salary, start date) and attach the official offer letter for their review and signature.' },
    { id: 'recruit-7', category: 'Recruiting', title: 'Company Culture Highlight', description: 'Attract a candidate by focusing on your company\'s unique culture.', purposeText: 'Reach out to a promising candidate by highlighting a unique aspect of our company culture, such as our commitment to [Company Value] or our recent [Team Achievement]. The goal is to differentiate our company and appeal to candidates who value a positive work environment.' },

    // --- Job Seeking ---
    { id: 'job-seek-1', category: 'Job Seeking', title: 'Post-Interview Thank You', description: 'Send a thank-you note after a job interview.', purposeText: 'Thank the interviewer(s), [Interviewer Names], for their time discussing the [Job Role] position. The goal is to reiterate my strong interest in the role, briefly mention something specific I enjoyed discussing, and reaffirm why I am a great fit for the team.' },
    { id: 'job-seek-2', category: 'Job Seeking', title: 'Cold Application', description: 'Express interest in a company without a specific job posting.', purposeText: 'Express my admiration for [Company Name] and its work in [Their Industry]. The goal is to introduce myself as a [My Profession] with expertise in [My Key Skill] and inquire about any potential or future opportunities on their team, with my resume attached for consideration.' },
    { id: 'job-seek-3', category: 'Job Seeking', title: 'Informational Interview Request', description: 'Ask a professional for a brief chat about their career or company.', purposeText: 'Mention that I am a [My Status, e.g., student, professional] interested in [Their Industry/Company]. The goal is to ask for 15-20 minutes of their time for an informational interview to learn more about their career path and experience, emphasizing that I am seeking advice, not a job.' },
    { id: 'job-seek-4', category: 'Job Seeking', title: 'Application Follow-up', description: 'Follow up on a job application after a week or two of silence.', purposeText: 'Gently follow up on my application for the [Job Role] position, which I submitted on [Date]. The goal is to briefly reiterate my enthusiasm for the opportunity and confirm that my application was received.' },
    { id: 'job-seek-5', category: 'Job Seeking', title: 'Accepting a Job Offer', description: 'Formally accept a job offer you have received.', purposeText: 'Formally and enthusiastically accept the offer for the position of [Job Role]. The goal is to express my excitement to join the team, confirm the agreed-upon terms (like start date and salary), and ask about any next steps for onboarding.' },
    { id: 'job-seek-6', category: 'Job Seeking', title: 'Withdrawing Application', description: 'Professionally withdraw your candidacy from a hiring process.', purposeText: 'Thank the hiring manager for the opportunity to interview for the [Job Role]. The goal is to respectfully withdraw my application from consideration, briefly stating that I have accepted another position, while maintaining a positive relationship with the company for the future.' },

    // --- Customer Success ---
    { id: 'cs-1', category: 'Customer Success', title: 'New Customer Welcome', description: 'Welcome a new client and introduce yourself as their point of contact.', purposeText: 'Warmly welcome the new customer, [Customer Company Name], to [Your Product/Service]. The goal is to introduce myself as their dedicated [Your Role, e.g., Customer Success Manager], provide key getting-started resources, and schedule a brief onboarding call.' },
    { id: 'cs-2', category: 'Customer Success', title: 'Proactive Check-in', description: 'Check in with a client to see how they are doing and offer help.', purposeText: 'Proactively check in with the client to see how they are progressing with [Your Product]. The goal is to ask if they have any questions, offer a helpful tip about [Specific Feature], and ensure they are getting the full value from our service.' },
    { id: 'cs-3', category: 'Customer Success', title: 'Feedback Request', description: 'Ask a current customer for their valuable feedback.', purposeText: 'Explain that we are constantly working to improve [Your Product]. The goal is to ask if they would be willing to share their feedback, either through a quick survey or a brief 5-minute call, to help us make the product better for them.' },
    { id: 'cs-4', category: 'Customer Success', title: 'Renewal Reminder', description: 'Remind a client about their upcoming subscription renewal.', purposeText: 'Gently remind the client that their subscription for [Your Product] is due for renewal on [Renewal Date]. The goal is to make the renewal process smooth, ask if they have any questions, and highlight a new feature or recent success they\'ve had.'},
    { id: 'cs-5', category: 'Customer Success', title: 'Usage Tip / Best Practice', description: 'Share a useful tip to help a customer get more value.', purposeText: 'Share a quick "pro-tip" or best practice for using [Specific Feature] of our product. The goal is to provide proactive, educational value that helps the customer achieve their goals more effectively, thereby increasing their satisfaction and stickiness.' },
    { id: 'cs-6', category: 'Customer Success', title: 'At-Risk Client Re-engagement', description: 'Reach out to a client whose usage has dropped or who seems disengaged.', purposeText: 'Reach out to a client, noting that I want to ensure they are getting the full value from [Your Product]. The goal is to ask if they are facing any challenges, offer a personalized training session, and understand how we can better support their goals to prevent churn.' },
    { id: 'cs-7', category: 'Customer Success', title: 'Quarterly Business Review (QBR)', description: 'Invite a key client to a strategic review meeting.', purposeText: 'Invite the client to a Quarterly Business Review (QBR). The goal is to schedule a meeting to review their progress, discuss their goals for the upcoming quarter, and align on how [Your Product] can continue to support their strategic objectives.' },
    { id: 'cs-8', category: 'Customer Success', title: 'New Feature Announcement', description: 'Inform customers about a new feature that is relevant to them.', purposeText: 'Announce an exciting new feature, [New Feature Name], that is now live in [Your Product]. The goal is to explain how this feature can specifically help them achieve [Relevant Goal] and provide a link to a tutorial or guide.' }
];

/**
 * Main function to set up the entire template browser system.
 */
function initializeTemplateBrowser() {
    const browseBtn = document.getElementById('browseTemplatesBtn');
    const modal = document.getElementById('templateModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const categoriesContainer = document.getElementById('templateCategoriesContainer');
    const emailPurposeTextarea = document.getElementById('emailPurpose');

    // --- Event Listeners to Open/Close the Modal ---
    browseBtn.addEventListener('click', () => modal.classList.add('show'));
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
        // Close modal if user clicks on the dark overlay background
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    document.addEventListener('keydown', (e) => {
        // Close modal if user presses the Escape key
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });

    // --- Logic to create and manage the template UI ---
    const categories = [...new Set(emailTemplates.map(t => t.category))];
    categoriesContainer.innerHTML = ''; // Clear any existing buttons

    categories.forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        // Make the first category active by default
        if (index === 0) {
            btn.classList.add('active');
        }
        btn.textContent = category;
        btn.dataset.category = category;

        btn.addEventListener('click', () => {
            // Remove 'active' class from the previously active button
            categoriesContainer.querySelector('.active').classList.remove('active');
            // Add 'active' class to the clicked button
            btn.classList.add('active');
            // Repopulate the grid with templates from the new category
            populateTemplates(category);
        });
        categoriesContainer.appendChild(btn);
    });

    // --- Initial population of the template grid ---
    if (categories.length > 0) {
        populateTemplates(categories[0]);
    }
}

/**
 * Populates the grid with templates for a given category.
 * @param {string} category The category to filter by.
 */
function populateTemplates(category) {
    const templatesContainer = document.getElementById('templatesGridContainer');
    const emailPurposeTextarea = document.getElementById('emailPurpose');
    const modal = document.getElementById('templateModal');

    templatesContainer.innerHTML = ''; // Clear old templates
    const filteredTemplates = emailTemplates.filter(t => t.category === category);

    filteredTemplates.forEach(template => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.innerHTML = `<h4>${template.title}</h4><p>${template.description}</p>`;

        // Add the main click action
        card.addEventListener('click', () => {
            emailPurposeTextarea.value = template.purposeText;
            emailPurposeTextarea.focus(); // Help the user to start typing immediately
            modal.classList.remove('show'); // Close the modal
            showMessage('Template applied!', 'success'); // Give user feedback
        });
        templatesContainer.appendChild(card);
    });
}

// --- END OF NEW TEMPLATE SCRIPT ---
const GMAIL_API_KEY = 'AIzaSyCqPOKuJI6X7Ay6fjJDY-occ8HqSIQjlhk'; // Replace with your API key
const GMAIL_CLIENT_ID = '987431490504-feghrjp2bgo5r4e4bpped1kj9hefv7j2.apps.googleusercontent.com'; // Replace with your client ID
const GMAIL_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
const GMAIL_SCOPES = 'https://www.googleapis.com/auth/gmail.send';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let isGmailConnected = false;

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

 // Add this new function
async function initializeGapiClient() {
    try {
        await gapi.client.init({
            apiKey: GMAIL_API_KEY,
            discoveryDocs: [GMAIL_DISCOVERY_DOC],
        });
        gapiInited = true;
        console.log("GAPI client initialized.");
        checkGmailAuthReady();
    } catch (error) {
        console.error("Error initializing GAPI client:", error);
        showMessage('Gmail API setup failed.', 'error');
    }
}


function gisLoaded() {
    try {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GMAIL_CLIENT_ID,
            scope: GMAIL_SCOPES,
            callback: '',
        });
        gisInited = true;
        console.log("Gmail GIS client initialized.");
        checkGmailAuthReady();
    } catch (error) {
        console.error("Error initializing Gmail GIS client:", error);
        showMessage('Gmail authentication setup failed', 'error');
    }
}

function checkGmailAuthReady() {
    if (gapiInited && gisInited) {
        console.log('Gmail API ready for authentication');
        const connectBtn = document.getElementById('gmailConnectBtn');
        if (connectBtn) {
            connectBtn.disabled = false;
            // Restore the original button content
            connectBtn.innerHTML = `
                <div class="btn-shine"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Connect</span>
            `;
        }
    }
}

function toggleGmailConnection() {
    const connectBtn = document.getElementById('gmailConnectBtn');
    const statusIcon = document.getElementById('gmailStatusIcon');
    const statusTitle = document.getElementById('gmailStatusTitle');
    const statusSubtitle = document.getElementById('gmailStatusSubtitle');

    if (!isGmailConnected) {
        if (!gapiInited || !gisInited) {
            showMessage('Gmail API is still loading. Please wait a moment.', 'error');
            return;
        }

        connectBtn.disabled = true;
        connectBtn.innerHTML = `<div class="loading-spinner" style="width: 16px; height: 16px; margin:0; border-width: 2px; display: inline-block;"></div><span style="margin-left: 0.5rem;">Connecting...</span>`;

        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                console.error('Gmail auth error:', resp);
                showMessage('Gmail authentication failed', 'error');
                resetConnectionButton();
                return;
            }

            isGmailConnected = true;
            statusIcon.className = 'gmail-status-icon connected';
            statusIcon.textContent = '✅';
            statusTitle.textContent = 'Gmail Connected';
            connectBtn.className = 'gmail-connect-btn connected disconnect';
            connectBtn.disabled = false;
            connectBtn.innerHTML = `<span>Disconnect</span>`;

            updateSendButtonState();
            showMessage('Gmail connected successfully!', 'success');
        };

        if (gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            tokenClient.requestAccessToken({ prompt: '' });
        }

    } else {
        handleGmailSignout();
    }
}

function updateSendButtonState() {
    const sendBtn = document.getElementById('sendBtn');
    if (!sendBtn) return;

    if (generatedEmails.length > 0 && currentEmailIndex < generatedEmails.length) {
        const currentEmail = generatedEmails[currentEmailIndex];
        const hasEmail = currentEmail.prospect.Email && currentEmail.prospect.Email.trim() !== '';
        const isConnected = isGmailConnected;

        sendBtn.disabled = !hasEmail || !isConnected;

        if (!isConnected) {
            sendBtn.querySelector('span').textContent = 'Connect Gmail First';
        } else if (!hasEmail) {
            sendBtn.querySelector('span').textContent = 'No Email Address';
        } else {
            sendBtn.querySelector('span').textContent = `Send to ${currentEmail.prospect.FirstName}`;
        }
    }
}

function resetConnectionButton() {
    const connectBtn = document.getElementById('gmailConnectBtn');
    connectBtn.disabled = false;
    connectBtn.className = 'gmail-connect-btn';
    connectBtn.innerHTML = `
        <div class="btn-shine"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span>Connect</span>`;
}

async function sendEmail() {
    if (!isGmailConnected) {
        showMessage('Please connect Gmail first', 'error');
        return;
    }

    const currentEmailData = generatedEmails[currentEmailIndex];
            // --- END: NEW CODE TO WRITE STATS ---
    if (!currentEmailData || !currentEmailData.prospect.Email) {
        showMessage('No email address available for this prospect', 'error');
        return;
    }

    const sendBtn = document.getElementById('sendBtn');
    const originalBtnHTML = sendBtn.innerHTML;

    // Read from the editable textarea
    const fullEmailText = document.getElementById('emailPreview').value;

    // Parse subject and body from the textarea
    let subject = `A message for ${currentEmailData.prospect.Company}`;
    let body = fullEmailText;
    const subjectMatch = fullEmailText.match(/Subject:\s*(.*)/i);
    if (subjectMatch && subjectMatch[1]) {
        subject = subjectMatch[1].trim();
        const bodyStartIndex = fullEmailText.indexOf(subjectMatch[0]) + subjectMatch[0].length;
        body = fullEmailText.substring(bodyStartIndex).trim();
    }

    try {
        sendBtn.disabled = true;
        sendBtn.innerHTML = `<div class="loading-spinner" style="width:16px; height:16px; display:inline-block; border-width:2px; margin-right:0.5rem;"></div> <span>Sending...</span>`;

        const emailLines = [
            `From: ${currentEmailData.sender.firstName} ${currentEmailData.sender.lastName} <${currentEmailData.sender.email}>`,
            `To: ${currentEmailData.prospect.Email}`,
            `Subject: ${subject}`,
            'Content-Type: text/plain; charset=utf-8',
            '',
            body
        ];
        const email = emailLines.join('\n');

        const base64EncodedEmail = btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_');

        await gapi.client.gmail.users.messages.send({
            'userId': 'me',
            'resource': { 'raw': base64EncodedEmail }
        });

        showMessage(`Email sent successfully to ${currentEmailData.prospect.FirstName}!`, 'success');

    } catch (error) {
        console.error('Error sending email:', error);
        const errorMessage = error.result?.error?.message || error.message || 'Unknown error';
        showMessage(`Failed to send email: ${errorMessage}`, 'error');
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = originalBtnHTML;
        updateSendButtonState();
    }

}

function updateLeadSelectionCounter() {
    const dropdownLabel = document.getElementById('leadsDropdownLabel');
    const selectedCount = document.querySelectorAll('.lead-checkbox:checked').length;

    if (selectedCount === 0) {
        dropdownLabel.textContent = 'Select from your leads...';
    } else if (selectedCount === 1) {
        dropdownLabel.textContent = '1 lead selected';
    } else {
        dropdownLabel.textContent = `${selectedCount} leads selected`;
    }
}

async function displayLeadsForSelection() {
    const leadsListContainer = document.getElementById('leadsListContainer');

    leadsListContainer.innerHTML = '<div class="loading-spinner"></div>';

    const user = window.auth.currentUser;
    if (!user) {
        leadsListContainer.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.6); padding: 2rem;">Could not find user.</p>';
        return;
    }

    const userLeads = await window.fetchUserLeads(window.db, user.uid);

    leadsListContainer.innerHTML = '';

    if (userLeads.length === 0) {
        const noLeadsMsg = document.getElementById('noLeadsMessage');
        leadsListContainer.appendChild(noLeadsMsg.cloneNode(true));
        leadsListContainer.querySelector('#noLeadsMessage').classList.remove('hidden');
        return;
    }

    userLeads.forEach(lead => {
        const leadItem = document.createElement('div');
        leadItem.className = 'lead-item';
        leadItem.innerHTML = `
            <input type="checkbox" class="lead-checkbox"
                   data-firstname="${lead.FirstName}"
                   data-lastname="${lead.LastName}"
                   data-company="${lead.Company}"
                   data-role="${lead.Role}"
                   data-email="${lead.Email || ''}">
            <label>
                <div class="lead-name">${lead.FirstName} ${lead.LastName}</div>
                <div class="lead-details">${lead.Role} at ${lead.Company}</div>
            </label>
        `;
        leadsListContainer.appendChild(leadItem);
    });
}

function handleGmailSignout() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
    }

    isGmailConnected = false;

    const statusIcon = document.getElementById('gmailStatusIcon');
    const statusTitle = document.getElementById('gmailStatusTitle');
    statusIcon.className = 'gmail-status-icon disconnected';
    statusIcon.textContent = '📧';
    statusTitle.textContent = 'Gmail Not Connected';

    resetConnectionButton();
    updateSendButtonState();
    showMessage('Gmail disconnected', 'success');
}

let prospects = [];
let generatedEmails = [];
let currentEmailIndex = 0;
let currentInputMode = 'csv';
let genAI = null;

async function initializeAI() {
    try {
        const API_KEY = 'AIzaSyAMIen9b701UekKNPVEuICV42kFZmhoUs4';
        if (API_KEY === 'YOUR_GEMINI_API_KEY') {
            console.warn('Please set your Gemini API key');
            return false;
        }

        const { GoogleGenerativeAI } = await import('https://esm.run/@google/generative-ai');
        genAI = new GoogleGenerativeAI(API_KEY);
        console.log('Gemini AI initialized successfully');
        return true;
    } catch (error) {
        console.error('Failed to initialize AI:', error);
        return false;
    }
}

function createParticles() {
    const container = document.getElementById('particleContainer');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

function toggleInputMode(mode) {
    currentInputMode = mode;

    const csvToggleBtn = document.getElementById('csvToggle');
    const manualToggleBtn = document.getElementById('manualToggle');
    const leadsToggleBtn = document.getElementById('leadsToggle');

    const csvSection = document.getElementById('csvSection');
    const manualSection = document.getElementById('manualSection');
    const leadsSection = document.getElementById('leadsSection');

    csvToggleBtn.classList.toggle('active', mode === 'csv');
    manualToggleBtn.classList.toggle('active', mode === 'manual');
    leadsToggleBtn.classList.toggle('active', mode === 'leads');

    csvSection.classList.toggle('active', mode === 'csv');
    manualSection.classList.toggle('active', mode === 'manual');
    leadsSection.classList.toggle('active', mode === 'leads');

    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.querySelector('span').textContent = mode === 'manual' ? 'Generate Email' : 'Generate Emails';
    }

    if (mode === 'leads') {
        const leadsDropdownContainer = document.getElementById('leadsDropdownContainer');
        const leadsDropdownPanel = document.getElementById('leadsDropdownPanel');
        const theGamble = document.getElementsByClassName("theGamble");
            leadsDropdownPanel.addEventListener("click", () => {
                theGamble.style.display = "block";
            });

    }
}

function resetForm() {
    if (currentInputMode === 'csv') {
        const csvInput = document.getElementById('csvFileInput');
        if (csvInput) csvInput.value = '';
    } else {
        const fields = ['firstName', 'lastName', 'company', 'role', 'email'];
        fields.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
    }

    prospects = [];
    generatedEmails = [];
    hideEmailPreview();
}

function validateInputs() {
    const requiredSenderFields = ['senderFirstName', 'senderLastName', 'senderCompany', 'senderRole', 'senderEmail'];
    for (const fieldId of requiredSenderFields) {
        if (!document.getElementById(fieldId).value.trim()) {
            showMessage('Please fill in all required sender information fields.', 'error');
            return false;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(document.getElementById('senderEmail').value.trim())) {
        showMessage('Please enter a valid sender email address.', 'error');
        return false;
    }

    if (!document.getElementById('emailPurpose').value.trim()) {
        showMessage('Please enter the email purpose/goal.', 'error');
        return false;
    }

    if (currentInputMode === 'csv') {
        if (!document.getElementById('csvFileInput').files[0]) {
            showMessage('Please upload a CSV file.', 'error');
            return false;
        }
    } else if (currentInputMode === 'manual') {
        const requiredManualFields = ['firstName', 'lastName', 'company', 'role'];
        for (const fieldId of requiredManualFields) {
            if (!document.getElementById(fieldId).value.trim()) {
                showMessage('Please fill in all required prospect fields.', 'error');
                return false;
            }
        }
    } else if (currentInputMode === 'leads') {
        const selectedCount = document.querySelectorAll('.lead-checkbox:checked').length;
        if (selectedCount === 0) {
            showMessage('Please select at least one lead from the dropdown.', 'error');
            return false;
        }
    }

    return true;
}

function handleCSVGeneration() {
    return new Promise((resolve, reject) => {
        Papa.parse(document.getElementById('csvFileInput').files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                const parsedProspects = results.data.filter(row =>
                    row.FirstName && row.LastName && row.Company && row.Role
                );

                if (parsedProspects.length === 0) {
                    showMessage('No valid prospects found in CSV. Check for required columns: FirstName, LastName, Company, Role.', 'error');
                    reject(new Error('No valid prospects'));
                    return;
                }
                resolve(parsedProspects);
            },
            error: (error) => reject(error)
        });
    });
}

function handleManualGeneration() {
    const prospect = {
        FirstName: document.getElementById('firstName').value.trim(),
        LastName: document.getElementById('lastName').value.trim(),
        Company: document.getElementById('company').value.trim(),
        Role: document.getElementById('role').value.trim(),
        Email: document.getElementById('email').value.trim() || ''
    };
    return [prospect];
}

async function generateEmails(prospects, purpose, language) {
    const emails = [];
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const senderInfo = {
        firstName: document.getElementById('senderFirstName').value.trim(),
        lastName: document.getElementById('senderLastName').value.trim(),
        company: document.getElementById('senderCompany').value.trim(),
        role: document.getElementById('senderRole').value.trim(),
        email: document.getElementById('senderEmail').value.trim(),
        phone: document.getElementById('senderPhone').value.trim(),
        bio: document.getElementById('senderBio').value.trim()
    };

    for (let i = 0; i < prospects.length; i++) {
        const prospect = prospects[i];

        document.getElementById('processingText').textContent =
            `AI is working on an email for ${prospect.FirstName} (${i + 1}/${prospects.length})...`;

        const prompt = `
        Write a personalized cold outreach email in ${language}.
        SENDER: ${senderInfo.firstName} ${senderInfo.lastName}, ${senderInfo.role} at ${senderInfo.company}. Background: ${senderInfo.bio}.
        PROSPECT: ${prospect.FirstName} ${prospect.LastName}, ${prospect.Role} at ${prospect.Company}.
        GOAL: ${purpose}.
        REQUIREMENTS:
        1. Write the entire email (subject and body) in fluent, natural-sounding ${language}.
        2. Personalize using both sender and prospect info.
        3. Be concise (150-200 words).
        4. Include a clear call-to-action in ${language}.
        5. Sound professional but conversational, not overly salesy.
        6. Create a compelling subject line in ${language}.
        7. IMPORTANT: Do NOT include a closing or signature (e.g., "Best regards," or "Sincerely,"). The signature will be added automatically.
        OUTPUT FORMAT (Strict):
        Subject: [Your subject line in ${language}]

        [Email body in ${language}]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const emailContent = response.text();

        const subjectMatch = emailContent.match(/Subject:\s*(.+)/i);
        const subject = subjectMatch ? subjectMatch[1].trim() : `A ${language} message for ${prospect.Company}`;
        const emailBody = emailContent.replace(/Subject:\s*.+\n*/i, '').trim();

        const signatureRegex = /(Best regards|Sincerely|Yours truly|Thanks|Cheers|Regards),?[\s\S]*/i;
        const cleanBody = emailBody.replace(signatureRegex, '').trim();

        emails.push({
            prospect: prospect,
            sender: senderInfo,
            content: `${cleanBody}\n\nBest regards,\n${senderInfo.firstName} ${senderInfo.lastName}\n${senderInfo.role} at ${senderInfo.company}\n${senderInfo.email}${senderInfo.phone ? `\n${senderInfo.phone}` : ''}`,
            subject: subject,
            recipientInfo: `${prospect.FirstName} ${prospect.LastName} @ ${prospect.Company}`
        });
    }
    return emails;
}

async function handleGenerateEmails() {
    if (!validateInputs() || !genAI) {
        if (!genAI) showMessage('AI not initialized. Please refresh.', 'error');
        return;
    }

    try {
        showProcessing(true);
        const emailPurpose = document.getElementById('emailPurpose').value.trim();
        const language = document.getElementById('emailLanguage').value;

        let localProspects = [];

        if (currentInputMode === 'csv') {
            localProspects = await handleCSVGeneration();
        } else if (currentInputMode === 'manual') {
            localProspects = handleManualGeneration();
        } else if (currentInputMode === 'leads') {
            const selectedCheckboxes = document.querySelectorAll('.lead-checkbox:checked');
            if (selectedCheckboxes.length === 0) {
                showMessage('Please select at least one lead from your list.', 'error');
                showProcessing(false);
                return;
            }
            selectedCheckboxes.forEach(cb => {
                localProspects.push({
                    FirstName: cb.dataset.firstname,
                    LastName: cb.dataset.lastname,
                    Company: cb.dataset.company,
                    Role: cb.dataset.role,
                    Email: cb.dataset.email
                });
            });
        }

        if (localProspects && localProspects.length > 0) {
            prospects = localProspects;
            generatedEmails = await generateEmails(prospects, emailPurpose, language);
            showEmailPreview();
        } else if (currentInputMode !== 'leads') {
            showMessage('No valid prospects found to process.', 'error');
        }

    } catch (error) {
        console.error('Error during generation:', error);
        showMessage('Failed to generate emails. Check inputs or try again.', 'error');
    } finally {
        showProcessing(false);
    }
}

function showEmailPreview() {
    document.getElementById('emailSliderCard').classList.remove('hidden');

    const gmailSection = document.getElementById('gmailConnectionSection');
    if (gmailSection) {
        gmailSection.classList.remove('hidden');
    }

    currentEmailIndex = 0;
    updateEmailDisplay();

    const message = `Generated ${generatedEmails.length} AI-personalized email${generatedEmails.length > 1 ? 's' : ''}!`;
    showMessage(message, 'success');
}

function updateEmailDisplay() {
    if (generatedEmails.length === 0) return;

    const currentEmail = generatedEmails[currentEmailIndex];
    document.getElementById('emailPreview').value = `Subject: ${currentEmail.subject}\n\n${currentEmail.content}`;

    let recipientInfo = document.querySelector('.recipient-info');
    if (!recipientInfo) {
        recipientInfo = document.createElement('div');
        recipientInfo.className = 'recipient-info';
        const emailPreviewEl = document.getElementById('emailPreview');
        emailPreviewEl.parentNode.insertBefore(recipientInfo, emailPreviewEl);
    }
    recipientInfo.textContent = `For: ${currentEmail.recipientInfo}`;

    document.getElementById('counter').textContent = `${currentEmailIndex + 1} / ${generatedEmails.length}`;
    document.getElementById('prevBtn').disabled = currentEmailIndex === 0;
    document.getElementById('nextBtn').disabled = currentEmailIndex === generatedEmails.length - 1;

    updateDotIndicators();
    updateSendButtonState();
}

function updateDotIndicators() {
    const dotIndicator = document.getElementById('dotIndicator');
    dotIndicator.innerHTML = '';
    const maxDots = Math.min(generatedEmails.length, 10);

    for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = i === currentEmailIndex ? 'dot active' : 'dot';
        dot.onclick = () => {
            currentEmailIndex = i;
            updateEmailDisplay();
        };
        dotIndicator.appendChild(dot);
    }
}

function prevEmail() {
    if (currentEmailIndex > 0) {
        currentEmailIndex--;
        updateEmailDisplay();
    }
}

function nextEmail() {
    if (currentEmailIndex < generatedEmails.length - 1) {
        currentEmailIndex++;
        updateEmailDisplay();
    }
}

async function copyEmail() {
    try {
        await navigator.clipboard.writeText(document.getElementById('emailPreview').value);
        showMessage('Email copied to clipboard!', 'success');
    } catch (err) {
        showMessage('Failed to copy email.', 'error');
    }
}

function showProcessing(show) {
    const processingSection = document.getElementById('processingStatus');
    const generateBtn = document.getElementById('generateBtn');

    processingSection.style.display = show ? 'flex' : 'none';
    processingSection.querySelector('.loading-spinner').style.display = show ? 'block' : 'none';
    generateBtn.disabled = show;
}

function showMessage(message, type) {
    const messageBox = document.getElementById(type === 'success' ? 'successMessage' : 'errorMessage');
    messageBox.textContent = message;
    messageBox.classList.add('show');
    setTimeout(() => messageBox.classList.remove('show'), 4000);
}

function switchToDisplayView(senderData) {
    const section = document.getElementById('senderInfoSection');

    document.getElementById('displaySenderName').textContent = `${senderData.firstName} ${senderData.lastName}`;
    document.getElementById('displaySenderTitle').textContent = `${senderData.role} at ${senderData.company}`;
    document.getElementById('displaySenderEmail').textContent = senderData.email;

    section.classList.add('is-saved');
}

function initializeSenderInfoControls() {
    const section = document.getElementById('senderInfoSection');
    const saveBtn = document.getElementById('saveSenderBtn');
    const editBtn = document.getElementById('editSenderBtn');

    saveBtn.addEventListener('click', saveSenderInfo);
    editBtn.addEventListener('click', editSenderInfo);
}

function saveSenderInfo() {
    const section = document.getElementById('senderInfoSection');
    const firstName = document.getElementById('senderFirstName').value.trim();
    const lastName = document.getElementById('senderLastName').value.trim();
    const company = document.getElementById('senderCompany').value.trim();
    const role = document.getElementById('senderRole').value.trim();
    const email = document.getElementById('senderEmail').value.trim();

    if (!firstName || !lastName || !company || !role || !email) {
        showMessage('Please fill in all required sender fields before saving.', 'error');
        return;
    }

    document.getElementById('displaySenderName').textContent = `${firstName} ${lastName}`;
    document.getElementById('displaySenderTitle').textContent = `${role} at ${company}`;
    document.getElementById('displaySenderEmail').textContent = email;

    section.classList.add('is-saved');
    showMessage('Sender information saved!', 'success');
}

function editSenderInfo() {
    const section = document.getElementById('senderInfoSection');
    section.classList.remove('is-saved');
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded. Attaching ALL event listeners...");

    createParticles();
    await initializeAI();
    initializeSenderInfoControls();
    initializeTemplateBrowser();

document.getElementById('generateBtn').addEventListener('click', handleGenerateEmails);

    const inputsToMonitor = ['firstName', 'lastName', 'company', 'role', 'email', 'csvFileInput', 'emailPurpose'];
    inputsToMonitor.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const eventType = element.type === 'file' ? 'change' : 'input';
            element.addEventListener(eventType, () => {
                if (generatedEmails.length > 0) {
                    hideEmailPreview();
                    generatedEmails = [];
                }
            });
        }
    });

    const leadsDropdownContainer = document.getElementById('leadsDropdownContainer');
    const leadsDropdownTrigger = document.getElementById('leadsDropdownTrigger');
    const leadsDropdownPanel = document.getElementById('leadsDropdownPanel');
    const selectAllCheckbox = document.getElementById('selectAllLeads');
    const leadsListContainer = document.getElementById('leadsListContainer');

    if (leadsDropdownTrigger) {
        leadsDropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("Leads dropdown trigger clicked!");

            const isPanelVisible = leadsDropdownPanel.style.display === 'block';
            if (isPanelVisible) {
                leadsDropdownPanel.style.display = 'none';
                leadsDropdownContainer.classList.remove('is-open');
            } else {
                leadsDropdownPanel.style.display = 'block';
                leadsDropdownContainer.classList.add('is-open');
                displayLeadsForSelection();
            }
        });
    }

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            if(leadsListContainer) {
                leadsListContainer.querySelectorAll('.lead-checkbox').forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
                updateLeadSelectionCounter();
            }
        });
    }

    if (leadsListContainer) {
        leadsListContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('lead-checkbox')) {
                updateLeadSelectionCounter();
            }
        });
    }

    const userProfileContainer = document.getElementById('userProfileContainer');
    const userDropdownToggle = document.getElementById('userDropdownToggle');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const logoutButton = document.getElementById('logoutButton');

    if (userDropdownToggle && userDropdownMenu) {
        userDropdownToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isHidden = userDropdownMenu.classList.toggle('hidden');
            const chevronIcon = userDropdownToggle.querySelector('svg');
            if (chevronIcon) {
                chevronIcon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            signOut(auth).catch(error => console.error('Sign Out Error', error));
        });
    }

    const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');

function toggleSidebar() {
    document.body.classList.toggle('sidebar-is-open');
    sidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');
}

hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
});

sidebarOverlay.addEventListener('click', toggleSidebar);

sidebarLogoutBtn.addEventListener('click', () => {
    signOut(auth).catch(error => console.error('Sign Out Error', error));
});
document.addEventListener('click', (e) => {
    if (document.body.classList.contains('sidebar-open')) {
        if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            document.body.classList.remove('sidebar-open');
        }
    }
});

if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', () => {
        signOut(auth).catch(error => console.error('Sign Out Error', error));
    });
}

document.addEventListener('click', (e) => {
    const leadsDropdownContainer = document.getElementById('leadsDropdownContainer');
    const leadsDropdownPanel = document.getElementById('leadsDropdownPanel');
    if (leadsDropdownContainer && leadsDropdownPanel && leadsDropdownPanel.style.display === 'block') {
        if (!leadsDropdownContainer.contains(e.target)) {
             leadsDropdownPanel.style.display = 'none';
             leadsDropdownContainer.classList.remove('is-open');
        }
    }

    const userProfileContainer = document.getElementById('userProfileContainer');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    if (userProfileContainer && userDropdownMenu && !userDropdownMenu.classList.contains('hidden')) {
        if (!userProfileContainer.contains(e.target)) {
            userDropdownMenu.classList.add('hidden');
        }
    }


});
});

window.toggleInputMode = toggleInputMode;
window.prevEmail = prevEmail;
window.nextEmail = nextEmail;
window.copyEmail = copyEmail;
window.sendEmail = sendEmail;
window.toggleGmailConnection = toggleGmailConnection;
window.initializeTemplateBrowser = initializeTemplateBrowser;
window.gapiLoaded = gapiLoaded;
