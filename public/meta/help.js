// This code is just a heavily modified version of Ayano's Comment Widget (https://virtualobserver.moe/ayano/comment-widget)
const s_formId = '1FAIpQLSczVDeAwazWrseq_6xh-v06HhHBRCOl6y9aeoG5Yd2blTI5QA';
const s_issueId = '157985674'
const s_nameId = '1323728799';
const s_contactId = '1414916685';
const s_textId = '1692195758';

// Misc - Other random settings
const s_maxLengthName = 32; // The max character length of a name
const s_maxLength = 1000; // The max character length of a comment
const s_commentsOpen = true; // Change to false if you'd like to close your comment section site-wide (Turn it off on Google Forms too!)

// Text - Change what messages/text appear on the form and in the comments section (Mostly self explanatory)
const s_issueFieldLabel = 'Reason for Contact';
const s_nameFieldLabel = 'Name';
const s_contactFieldLabel = 'Email';
const s_textFieldLabel = 'Details of Concern';
const s_submitButtonLabel = 'Submit';
const s_closedCommentsText = 'Admin currently away!';

// HTML Form
const v_mainHtml = `
    <div id="c_inputDiv">
        <form id="c_form" onsubmit="c_submitButton.disabled = true; v_submitted = true;" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse"></form>
    </div>
`;
const v_formHtml = `
    <div id="c_issueWrapper" class="c-inputWrapper">
        <label class="c-label c-issueLabel" for="entry.${s_issueId}">${s_issueFieldLabel}</label><br>
        <input value="" type="hidden" class="c-input c-issueInput" name="entry.${s_issueId}" id="entry.${s_issueId}" type="text" required>
        <select id="inputOptions" class="c-input c-issueInput" onchange="changeIssue()" required>
            <option value="" selected disable>Select a Reason</option>
            <option value="submissions">Edit / Remove Submissions</option>
            <option value="domain">Changed Website Domain</option>
            <option value="rules">Question about Rules</option>
            <option value="prompts">Prompt Suggestion</option>
            <option value="misc">Miscellaneous</option>
        </select>
    </div>

    <div id="c_nameWrapper" class="c-inputWrapper">
        <label class="c-label c-nameLabel" for="entry.${s_nameId}">${s_nameFieldLabel}</label><br>
        <input class="c-input c-nameInput" name="entry.${s_nameId}" id="entry.${s_nameId}" type="text" maxlength="${s_maxLengthName}" required>
    </div>

    <div id="c_contactWrapper" class="c-inputWrapper">
        <label class="c-label c-contactLabel" for="entry.${s_contactId}">${s_contactFieldLabel}</label><br>
        <input class="c-input c-contactInput" name="entry.${s_contactId}" id="entry.${s_contactId}" type="text" required>
    </div>

    <div id="c_textWrapper" class="c-inputWrapper">
        <label class="c-label c-textLabel" for="entry.${s_textId}">${s_textFieldLabel}</label>
        <textarea class="c-input c-textInput" name="entry.${s_textId}" id="entry.${s_textId}" rows="4" cols="50"  maxlength="${s_maxLength}" required></textarea>
    </div>

    <input id="c_submitButton" name="c_submitButton" type="submit" value="${s_submitButtonLabel}" disabled>
`;

// Insert main HTML to page
document.getElementById('c_widget').innerHTML = v_mainHtml;
const c_form = document.getElementById('c_form');
if (s_commentsOpen) { c_form.innerHTML = v_formHtml }
else { c_form.innerHTML = s_closedCommentsText }

// Initialize misc things
const c_container = document.getElementById('c_container');

// The fake button is just a dummy placeholder for when comments are closed
let c_submitButton;
if (s_commentsOpen) { c_submitButton = document.getElementById('c_submitButton') }
else { c_submitButton = document.createElement('button') }

// Add the invisible iFrame to the document for catching the default Google Forms submisson page
let v_submitted = false;
let c_hiddenIframe = document.createElement('iframe');
c_hiddenIframe.id = 'c_hiddenIframe'; c_hiddenIframe.name = 'c_hiddenIframe'; c_hiddenIframe.style.display = 'none';
c_hiddenIframe.setAttribute('onload', 'if(v_submitted){fixFrame()}');
c_form.appendChild(c_hiddenIframe);
c_hiddenIframe = document.getElementById('c_hiddenIframe');

// Fix the invisible iFrame so it doesn't keep trying to load stuff
function fixFrame() {
    v_submitted = false;
    c_hiddenIframe.srcdoc = '';
    getComments(); // Reload comments after submission
}

// Processes comment data with the Google Sheet ID
function getComments() {
    // Disable the submit button while comments are reloaded
    c_submitButton.disabled;

    // Clear input fields too
    if (s_commentsOpen) {
        document.getElementById(`entry.${s_issueId}`).value = '';
        document.getElementById(`entry.${s_nameId}`).value = '';
        document.getElementById(`entry.${s_contactId}`).value = '';
        document.getElementById(`entry.${s_textId}`).value = '';
        document.getElementById(`inputOptions`).value = '';
    }

    c_submitButton.disabled = false // Now that everything is done, re-enable the submit button
}

issueInput = document.getElementById(`entry.${s_issueId}`)
function changeIssue() {
    issueInput.value = event.target.value
    issueInput.setAttribute('value', event.target.value)
}

getComments()