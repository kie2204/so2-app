var QrScanner = import("/javascripts/qr-scanner.min.js")

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
}

// Actual code
var homePage = document.getElementById("window-home")
var qrPage = document.getElementById("window-scan-qr")
var histPage = document.getElementById("window-history")

var allPages = document.getElementsByClassName("app-window")

// Check URL
function checkURL() {
    switch (window.location.pathname) {
        case "/":
            openPage(1)
            break;
        case "/scan-qr":
            openPage(2)
            break;
        case "/historik":
            openPage(3)
            break;
        default:
    }
}

function setActiveWindow(w) {
    for(var i = 0; i < allPages.length; i++) {
        allPages[i].classList.add("inactive");
    }
    w.classList.remove("inactive")
}

var lastSlide = 1;

function slidePill(el) {
    if(typeof(el) != "number") {
        el = lastSlide;
    }

    pillSlide = (
        document.getElementsByTagName("footer")[0].childNodes[el].getBoundingClientRect().x +
        (document.getElementsByTagName("footer")[0].childNodes[el].getBoundingClientRect().right -
        document.getElementsByTagName("footer")[0].childNodes[el].getBoundingClientRect().x) / 2
    )
    var pill = document.getElementById("pill")
    
    pill.style.left = pillSlide + "px";
    
    lastSlide = el;
}

function openPage(x) {
    switch (x) {
        case 1:
            setActiveWindow(homePage)
            slidePill(1)
            break;
        case 2:
            setActiveWindow(qrPage)
            slidePill(2)
            break;
        case 3:
            setActiveWindow(histPage)
            slidePill(3)
            break;
    }
}

window.addEventListener('resize', slidePill);
window.addEventListener('load', checkURL);
window.addEventListener("load", function(){
    const qrScanner = new QrScanner(document.getElementsByTagName("video")[0], result => console.log('decoded qr code:', result));
    qrScanner.start();
})