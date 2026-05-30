(function () {

/* =========================
   SVG (VOCÊ COLOCA AQUI)
========================= */
const SVG_LOGO = `<svg width="420" height="120" viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10,10)">
    <!-- Wings -->
    <ellipse cx="35" cy="20" rx="12" ry="18" fill="#7CFFB2"/>
    <ellipse cx="65" cy="20" rx="12" ry="18" fill="#7CFFB2"/>

    <!-- Antennas -->
    <line x1="40" y1="10" x2="30" y2="-5" stroke="#00AA55" stroke-width="3"/>
    <line x1="60" y1="10" x2="70" y2="-5" stroke="#00AA55" stroke-width="3"/>
    <circle cx="30" cy="-5" r="3" fill="#00AA55"/>
    <circle cx="70" cy="-5" r="3" fill="#00AA55"/>

    <!-- Body -->
    <rect x="20" y="10" width="60" height="50" rx="20" fill="#00CC66"/>

    <!-- Stripes -->
    <line x1="35" y1="10" x2="35" y2="60" stroke="#00AA55" stroke-width="4"/>
    <line x1="50" y1="10" x2="50" y2="60" stroke="#00AA55" stroke-width="4"/>
    <line x1="65" y1="10" x2="65" y2="60" stroke="#00AA55" stroke-width="4"/>

    <!-- Eyes -->
    <path d="M30 35 A6 6 0 0 1 42 35" fill="none" stroke="white" stroke-width="3"/>
    <path d="M58 35 A6 6 0 0 1 70 35" fill="none" stroke="white" stroke-width="3"/>
  </g>

  <text x="110" y="70"
        font-size="42"
        font-family="Arial, sans-serif"
        font-weight="bold"
        fill="#00CC66">
    ZoomBee
  </text>
</svg>`;

/* =========================
   POPUP SYSTEM
========================= */
function popup(title, message) {

    const box = document.createElement("div");

    box.style.cssText = `
        position:fixed;
        right:20px;
        bottom:20px;
        width:360px;
        background:#fff;
        border-left:6px solid #00CC66;
        border-radius:12px;
        padding:14px;
        box-shadow:0 10px 30px rgba(0,0,0,.25);
        font-family:Arial,sans-serif;
        z-index:999999999;
    `;

    box.innerHTML = `
        <h3 style="margin:0;color:#00AA55;font-size:16px">${title}</h3>
        <p style="margin:8px 0;font-size:14px">${message || ""}</p>
        <hr>
        <small style="color:#666">Powered by:</small><br>
        ${SVG_LOGO}
    `;

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 8000);
}

/* =========================
   MESSAGES (60+ VARIAÇÕES)
========================= */
const M = {

JS_ERROR:"JavaScript Error Detected",
TYPE_ERROR:"TypeError",
REFERENCE_ERROR:"ReferenceError",
SYNTAX_ERROR:"SyntaxError",
RANGE_ERROR:"RangeError",
URI_ERROR:"URIError",
EVAL_ERROR:"EvalError",
AGGREGATE_ERROR:"AggregateError",
INTERNAL_ERROR:"InternalError",

UNEXPECTED:"Unexpected Application Error",
CRITICAL:"Critical Runtime Error",
UNKNOWN:"Unknown Error Detected",

RESOURCE:"Resource Failed To Load",
IMG:"Image Failed To Load",
SCRIPT:"Script Failed To Load",
CSS:"Stylesheet Failed To Load",
FONT:"Font Failed To Load",
VIDEO:"Video Failed To Load",
AUDIO:"Audio Failed To Load",
IFRAME:"Iframe Failed To Load",
MODULE:"Module Failed To Load",
MANIFEST:"Manifest Failed To Load",

NETWORK:"Network Request Failed",
OFFLINE:"You Are Currently Offline",
ONLINE:"Connection Restored",
SLOW:"Slow Network Connection",
UNSTABLE:"Connection Appears Unstable",

LOCAL:"LocalStorage Unavailable",
SESSION:"SessionStorage Unavailable",
INDEXED:"IndexedDB Unavailable",
COOKIES:"Cookies Are Disabled",
STORAGE:"Storage Access Failed",

WEBGL:"WebGL Unsupported",
WEBRTC:"WebRTC Unsupported",
WEBSOCKET:"WebSocket Unsupported",
WORKER:"Web Workers Unsupported",
SERVICE:"Service Workers Unsupported",
FETCH:"Fetch API Unavailable",
PROMISE:"Promise API Unavailable",

CLIPBOARD:"Clipboard API Unavailable",
GEO:"Geolocation API Unavailable",
NOTIFY:"Notifications API Unavailable",
BLUETOOTH:"Bluetooth API Unavailable",
USB:"USB API Unavailable",
GAMEPAD:"Gamepad API Unavailable",

MEMORY_LOW:"Low Memory Detected",
MEMORY_HIGH:"High Memory Usage Detected",
CPU_HIGH:"High CPU Usage Detected",

SCREEN_SMALL:"Screen Size May Be Too Small",
DEVICE:"Device Compatibility Warning",
TOUCH:"Touch Input Not Supported",

PERMISSION:"Permission Denied",
CAMERA:"Camera Access Blocked",
MIC:"Microphone Access Blocked",
LOCATION:"Location Access Blocked",

BROWSER_OLD:"Your Browser Is Outdated",
LEGACY:"Legacy Compatibility Mode Enabled",
EXPERIMENTAL:"Experimental Feature In Use",

PERFORMANCE:"Performance Issues Detected",
CRASH:"Page Execution Crashed",

CONFIG:"Invalid Configuration",
DATA:"Invalid Data Received",
DEPENDENCY:"Dependency Missing",
FILE:"File Not Found",

};

function warn(type, msg){
    popup(type, msg);
}

/* =========================
   INIT DETECTORS
========================= */
window.ZoomBee = {

version:"1.0.0",

init(){

/* JS ERRORS */
window.addEventListener("error",(e)=>{

    if(e.target && e.target !== window){

        const map = {
            IMG:M.IMG,
            SCRIPT:M.SCRIPT,
            LINK:M.CSS,
            VIDEO:M.VIDEO,
            AUDIO:M.AUDIO,
            IFRAME:M.IFRAME
        };

        warn(map[e.target.tagName] || M.RESOURCE,
             e.target.tagName + " failed");

        return;
    }

    warn(M.JS_ERROR, e.message || "");

}, true);

/* PROMISE */
window.addEventListener("unhandledrejection",(e)=>{
    warn(M.UNEXPECTED, String(e.reason));
});

/* OFFLINE / ONLINE */
window.addEventListener("offline",()=>warn(M.OFFLINE,""));
window.addEventListener("online",()=>warn(M.ONLINE,""));

/* MEMORY */
if(navigator.deviceMemory && navigator.deviceMemory <= 2){
    warn(M.MEMORY_LOW,"");
}

/* SMALL SCREEN */
if(window.innerWidth < 500){
    warn(M.SCREEN_SMALL,"");
}

/* STORAGE */
try{
    localStorage.setItem("_zb","1");
    localStorage.removeItem("_zb");
}catch{
    warn(M.LOCAL,"");
}

try{
    sessionStorage.setItem("_zb","1");
    sessionStorage.removeItem("_zb");
}catch{
    warn(M.SESSION,"");
}

if(!window.indexedDB) warn(M.INDEXED,"");
if(!navigator.cookieEnabled) warn(M.COOKIES,"");

/* APIs */
if(!window.WebGLRenderingContext) warn(M.WEBGL,"");
if(!window.WebSocket) warn(M.WEBSOCKET,"");
if(!window.Worker) warn(M.WORKER,"");
if(!window.fetch) warn(M.FETCH,"");
if(!window.Promise) warn(M.PROMISE,"");
if(!navigator.clipboard) warn(M.CLIPBOARD,"");
if(!navigator.geolocation) warn(M.GEO,"");
if(!("Notification" in window)) warn(M.NOTIFY,"");
if(!navigator.bluetooth) warn(M.BLUETOOTH,"");
if(!navigator.usb) warn(M.USB,"");
if(!navigator.getGamepads) warn(M.GAMEPAD,"");
if(!("serviceWorker" in navigator)) warn(M.SERVICE,"");

/* PERFORMANCE */
const obs = new PerformanceObserver((list)=>{
    for(const entry of list.getEntries()){
        if(entry.duration > 200){
            warn(M.PERFORMANCE,"Long task detected");
        }
    }
});

try{
    obs.observe({entryTypes:["longtask"]});
}catch{}

/* FETCH MONITOR */
if(window.fetch){

const oldFetch = window.fetch;

window.fetch = async (...args)=>{

    try{

        const res = await oldFetch(...args);

        if(!res.ok){
            warn(M.NETWORK, "Request failed");
        }

        return res;

    }catch(err){
        warn(M.NETWORK, err.message);
        throw err;
    }

};

}

console.log("%cZoomBee Active","color:#00CC66;font-size:14px");

},

error:(m)=>warn(M.CRITICAL,m),
warning:(m)=>warn(M.EXPERIMENTAL,m),
info:(m)=>warn(M.DATA,m)

};

})();
