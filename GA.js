var gameenabled = false
function loadGA() {
    // Dynamically load the GA script
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-5YGZ8K86JH';
    document.head.appendChild(gaScript);
    gaScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-5YGZ8K86JH');
    };
}

function setGameEnabled(enabled) {
    
    if(enabled)
    {
        gameenabled = true;
    }
    else{
        gameenabled = false;
    }
    const buttons = document.querySelectorAll('#user-choice');
    buttons.forEach(btn => {
        if (btn.id !== 'consent-accept') {
            btn.disabled = !enabled;
            btn.style.opacity = enabled ? '1' : '0.5';
            btn.style.pointerEvents = enabled ? 'auto' : 'none';
        }
    });
}

function showConsentPopup() {
    if (!localStorage.getItem('ga_consent')) {
        document.getElementById('consent-popup').style.display = 'block';
        setGameEnabled(false);
    } else {
        setGameEnabled(true);
        loadGA();
    }
}
function acceptConsent() {
    localStorage.setItem('ga_consent', 'true');
    document.getElementById('consent-popup').style.display = 'none';
    setGameEnabled(true);
    loadGA();
}
function rejectConsent() {
    localStorage.setItem('ga_consent', 'false');
    document.getElementById('consent-popup').style.display = 'none';
    setGameEnabled(true);
}
document.addEventListener('DOMContentLoaded', function() {
    showConsentPopup();
    document.getElementById('consent-accept').onclick = acceptConsent;
    document.getElementById('consent-reject').onclick = rejectConsent;
});
