// ============================================================
// CONFIGURATION - UPDATE THESE WITH ACTUAL URLS
// ============================================================
const REGISTRATION_URL = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=_zxWcJGFbU-EBzgagy-ukQalSOBqF3ZPnhFQAFjPNv9UQ0ZHWVFCUVdPVU1LOVVVWVpKQjUzNEU3Ri4u"; // PLACEHOLDER: Insert Microsoft Forms URL here
const TEAMS_URL = "https://teams.microsoft.com/l/team/19%3AWl1aCTW1al2Hd2KwggHFyX3h4jVeMpwdCAQEBod4qoQ1%40thread.tacv2/conversations?groupId=04c4e9a1-7a5f-48cd-8622-cefc154bf39e&tenantId=70563cff-8591-4f6d-8407-381a832fae91"; // PLACEHOLDER: Insert Microsoft Teams URL here
const FIRST_CHALLENGE_URL = "CHALLENGES/WEEK 1/am28c09.html";

// ============================================================
// BOOT SEQUENCE
// ============================================================
const bootOverlay = document.getElementById('bootOverlay');
const mainContent = document.getElementById('mainContent');
const skipBootBtn = document.getElementById('skipBootBtn');

const bootSequence = [
    { line: 'bootLine1', text: 'CHECKING CORE MEMORY', status: 'ok', delay: 500 },
    { line: 'bootLine2', text: 'CHECKING NETWORK CONNECTION', status: 'ok', delay: 1000 },
    { line: 'bootLine3', text: 'CHECKING EXTERNAL ACCESS', status: 'warning', delay: 1500 },
    { line: 'bootLine4', text: 'PHYSICAL ACCESS', status: 'failed', delay: 2000 },
    { line: 'bootLine5', text: 'RESTORATION PROTOCOL', status: 'standby', delay: 2500 },
];

function startBootSequence() {
    bootSequence.forEach(item => {
        setTimeout(() => {
            const element = document.getElementById(item.line);
            if (element) {
                element.innerHTML = `${item.text} <span class="status ${item.status}">[${item.status.toUpperCase()}]</span>`;
            }
        }, item.delay);
    });

    setTimeout(() => {
        showMainContent();
    }, 3500);
}

function showMainContent() {
    bootOverlay.classList.add('hidden');
    mainContent.classList.add('visible');
}

skipBootBtn.addEventListener('click', showMainContent);

// Start boot sequence on page load
window.addEventListener('load', () => {
    startBootSequence();
});

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================
function showNotification(message, type = 'warning', duration = 3000) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification visible ${type}`;

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('visible', 'hide');
        }, 300);
    }, duration);
}

// ============================================================
// BUTTON HANDLERS
// ============================================================

// Register Button
document.getElementById('registerBtn').addEventListener('click', function() {
    if (REGISTRATION_URL === "") {
        showNotification('REGISTRATION PORTAL OFFLINE\nAWAITING CONNECTION...', 'warning', 3000);
    } else {
        try {
            const win = window.open(REGISTRATION_URL, '_blank');
            if (!win || win.closed || typeof win.closed === 'undefined') {
                // Fallback if window.open is blocked
                window.location.href = REGISTRATION_URL;
            }
        } catch (e) {
            console.error('Failed to open registration portal:', e);
            window.location.href = REGISTRATION_URL;
        }
    }
});

// Teams Button
document.getElementById('teamsBtn').addEventListener('click', function() {
    if (TEAMS_URL === "") {
        showNotification('COMMUNICATION CHANNEL UNAVAILABLE\nAWAITING CONNECTION...', 'warning', 3000);
    } else {
        try {
            const win = window.open(TEAMS_URL, '_blank');
            if (!win || win.closed || typeof win.closed === 'undefined') {
                // Fallback if window.open is blocked
                window.location.href = TEAMS_URL;
            }
        } catch (e) {
            console.error('Failed to open Teams:', e);
            window.location.href = TEAMS_URL;
        }
    }
});

// Challenge Button
document.getElementById('challengeBtn').addEventListener('click', function() {
    // Show transition message
    const notification = document.getElementById('notification');
    notification.innerHTML = 'INITIALIZING WEEK 01...<br>NODE 01 FOUND.<br>ACCESS GRANTED.';
    notification.className = 'notification visible';
    
    // Navigate after brief delay
    setTimeout(() => {
        window.location.href = FIRST_CHALLENGE_URL;
    }, 1000);
});

// ============================================================
// SUBTLE EFFECTS
// ============================================================

// Random glitch effect on a word
function addRandomGlitch() {
    const narrativeBlock = document.getElementById('narrativeBlock');
    const paragraphs = narrativeBlock.querySelectorAll('p');
    const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    const words = randomParagraph.innerHTML.split(' ');
    const randomWordIndex = Math.floor(Math.random() * words.length);
    
    if (words[randomWordIndex]) {
        words[randomWordIndex] = `<span class="glitch-text">${words[randomWordIndex]}</span>`;
        randomParagraph.innerHTML = words.join(' ');
    }

    // Occasionally activate glitch
    if (Math.random() > 0.7) {
        const glitchElements = randomParagraph.querySelectorAll('.glitch-text');
        if (glitchElements.length > 0) {
            const randomGlitch = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            randomGlitch.classList.add('active');
            setTimeout(() => {
                randomGlitch.classList.remove('active');
            }, 300);
        }
    }
}

// Periodically add glitches (every 8-15 seconds)
setInterval(addRandomGlitch, 8000 + Math.random() * 7000);

// ============================================================
// RESPONSIVE BUTTON SIZING
// ============================================================
function adjustButtonLayout() {
    const accessTerminal = document.querySelector('.access-terminal');
    if (window.innerWidth < 768) {
        accessTerminal.style.gridTemplateColumns = '1fr';
    } else {
        accessTerminal.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    }
}

window.addEventListener('resize', adjustButtonLayout);
window.addEventListener('load', adjustButtonLayout);
