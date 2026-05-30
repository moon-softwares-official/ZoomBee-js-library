(function () {

const SVG_LOGO = `
<svg width="180" height="52" viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10,10)">
    <ellipse cx="35" cy="20" rx="12" ry="18" fill="#7CFFB2"/>
    <ellipse cx="65" cy="20" rx="12" ry="18" fill="#7CFFB2"/>
    <line x1="40" y1="10" x2="30" y2="-5" stroke="#00AA55" stroke-width="3"/>
    <line x1="60" y1="10" x2="70" y2="-5" stroke="#00AA55" stroke-width="3"/>
    <circle cx="30" cy="-5" r="3" fill="#00AA55"/>
    <circle cx="70" cy="-5" r="3" fill="#00AA55"/>
    <rect x="20" y="10" width="60" height="50" rx="20" fill="#00CC66"/>
    <line x1="35" y1="10" x2="35" y2="60" stroke="#00AA55" stroke-width="4"/>
    <line x1="50" y1="10" x2="50" y2="60" stroke="#00AA55" stroke-width="4"/>
    <line x1="65" y1="10" x2="65" y2="60" stroke="#00AA55" stroke-width="4"/>
    <path d="M30 35 A6 6 0 0 1 42 35" fill="none" stroke="white" stroke-width="3"/>
    <path d="M58 35 A6 6 0 0 1 70 35" fill="none" stroke="white" stroke-width="3"/>
  </g>
  <text x="110" y="70"
        font-size="42"
        font-family="Arial"
        font-weight="bold"
        fill="#00CC66">
    ZoomBee
  </text>
</svg>
`;

function popup(title, message) {

    const box = document.createElement("div");

    box.style.cssText = `
        position:fixed;
        right:20px;
        bottom:20px;
        width:380px;
        background:white;
        border-left:6px solid #00CC66;
        border-radius:12px;
        padding:15px;
        box-shadow:0 0 20px rgba(0,0,0,.25);
        font-family:Arial,sans-serif;
        z-index:999999999;
    `;

    box.innerHTML = `
        <h3 style="margin:0;color:#00AA55">${title}</h3>
        <p>${message}</p>
        <hr>
        <small>Powered by:</small><br>
        ${SVG_LOGO}
    `;

    document.body.appendChild(box);

    setTimeout(() => box.remove(), 8000);
}

window.ZoomBee = {

    version: "1.0.0",

    init() {

        // JS Errors
        window.addEventListener("error", e => {

            popup(
                "JavaScript Error Detected",
                e.message
            );

        });

        // Promise Errors
        window.addEventListener(
            "unhandledrejection",
            e => {

                popup(
                    "Unexpected Application Error",
                    String(e.reason)
                );

            }
        );

        // Offline
        window.addEventListener(
            "offline",
            () => {

                popup(
                    "Connection Lost",
                    "You are currently offline."
                );

            }
        );

        // Online
        window.addEventListener(
            "online",
            () => {

                popup(
                    "Connection Restored",
                    "Internet connection restored."
                );

            }
        );

        // Small screen
        if (window.innerWidth < 500) {

            popup(
                "Device Compatibility Warning",
                "This Website May Not Work On Your Device"
            );

        }

        // Slow connection
        if (
            navigator.connection &&
            navigator.connection.effectiveType &&
            (
                navigator.connection.effectiveType === "slow-2g" ||
                navigator.connection.effectiveType === "2g"
            )
        ) {

            popup(
                "Slow Network Connection",
                "Network speed appears to be very slow."
            );

        }

        // Low memory
        if (
            navigator.deviceMemory &&
            navigator.deviceMemory <= 2
        ) {

            popup(
                "Low Memory Detected",
                "Device memory is limited."
            );

        }

        // Unsupported localStorage
        try {

            localStorage.setItem("_zb","1");
            localStorage.removeItem("_zb");

        } catch {

            popup(
                "Unsupported Feature Detected",
                "LocalStorage is unavailable."
            );

        }

        console.log(
            "%cZoomBee.js Active",
            "color:#00CC66;font-size:16px;font-weight:bold;"
        );

    },

    error(message) {
        popup("Critical Runtime Error", message);
    },

    warning(message) {
        popup("Warning", message);
    },

    success(message) {
        popup("Success", message);
    },

    info(message) {
        popup("Information", message);
    }

};

})();
