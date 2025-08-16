// This code is just a heavily modified version Ayano's Comment Widget (https://virtualobserver.moe/ayano/comment-widget)
const s_formId = '1FAIpQLSdpRftDtvHmv3m2d4munCLJQmoArDMTMlUKBJpCH363bthssg';
const s_nameId = '170895200';
const s_websiteId = '1789412348';
const s_imageId = '2101140507'

// Misc - Other random settings
const s_maxLengthName = 32; // The max character length of a name
const s_commentsOpen = true; // Change to false if you'd like to close your comment section site-wide (Turn it off on Google Forms too!)

// Text - Change what messages/text appear on the form and in the comments section (Mostly self explanatory)
const s_nameFieldLabel = 'Name';
const s_websiteFieldLabel = 'Website';
const s_imageFieldLabel = 'Image';
const s_submitButtonLabel = 'Submit';
const s_closedCommentsText = 'Signing up for membership is temporarily closed';

// HTML Form
const v_mainHtml = `
    <div id="c_inputDiv">
        <form id="c_form" onsubmit="c_submitButton.disabled = true; v_submitted = true;" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse"></form>
    </div>
`;
const v_formHtml = `
    <div id="c_nameWrapper" class="c-inputWrapper">
        <label class="c-label c-nameLabel" for="entry.${s_nameId}">${s_nameFieldLabel}</label>
        <input class="c-input c-nameInput" name="entry.${s_nameId}" id="entry.${s_nameId}" type="text" maxlength="${s_maxLengthName}" required>
    </div>

    <div id="c_websiteWrapper" class="c-inputWrapper">
        <label class="c-label c-websiteLabel" for="entry.${s_websiteId}">${s_websiteFieldLabel}</label>
        <input class="c-input c-websiteInput" name="entry.${s_websiteId}" id="entry.${s_websiteId}" type="url" pattern="https://.*" required>
    </div>

    <div id="c_imageWrapper" class="c-inputWrapper">
        <label class="c-label c-imageLabel" for="entry.${s_imageId}">${s_imageFieldLabel}</label>
        <input class="c-input c-imageInput" name="entry.${s_imageId}" id="entry.${s_imageId}" type="url" pattern="https://.*" onchange="previewImg()">
    </div>

    <input id="c_submitButton" name="c_submitButton" type="submit" value="${s_submitButtonLabel}" disabled>

    <div id="c_previewWrapper">
        <img id="c_previewOutput" src="#">
        <label class="c-label c-previewLabel">Image Preview</label>
        <p>If the image does not load, please make sure the website you are linking to allows <a href="https://simple.wikipedia.org/wiki/Hotlinking" target="_blank">hotlinking</a>!</p>
    </div>
`;

// Insert main HTML to page
document.getElementById('c_widget').innerHTML = v_mainHtml;
const c_form = document.getElementById('c_form');
if (s_commentsOpen) {c_form.innerHTML = v_formHtml} 
else {c_form.innerHTML = s_closedCommentsText}

// Initialize misc things
const c_container = document.getElementById('c_container');

// The fake button is just a dummy placeholder for when comments are closed
let c_submitButton;
if (s_commentsOpen) {c_submitButton = document.getElementById('c_submitButton')}
else {c_submitButton = document.createElement('button')}

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
        document.getElementById(`entry.${s_nameId}`).value = '';
        document.getElementById(`entry.${s_websiteId}`).value = '';
        document.getElementById(`entry.${s_imageId}`).value = '';
    }

    previewImg()
        
    c_submitButton.disabled = false // Now that everything is done, re-enable the submit button
}

function previewImg() {
    previewWrapper = document.getElementById("c_previewWrapper")
    imagePreview = document.getElementById(`entry.${s_imageId}`).value
    if (imagePreview.length === 0) { 
        previewWrapper.style.display = "none"
        imagePreview = "#"
    } else {
        previewWrapper.style.display = "block"
    }
    document.getElementById("c_previewOutput").src = imagePreview
}

getComments()