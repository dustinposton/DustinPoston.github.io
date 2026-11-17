/* ==========================================
   Typed role line in the hero
========================================== */

(function () {

    var el = document.getElementById("typed");
    if (!el) return;

    var roles = [
        "Security Analyst",
        "Vulnerability Management",
        "GRC & IT Audit Support"
    ];

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Leave the static text in place for people who turn motion off
    if (reduceMotion) return;

    var role = 0;
    var chars = 0;
    var deleting = false;

    function tick() {

        var word = roles[role];

        el.textContent = word.slice(0, chars);

        if (!deleting && chars < word.length) {
            chars++;
            setTimeout(tick, 80);
        } else if (!deleting) {
            deleting = true;
            setTimeout(tick, 1600);
        } else if (chars > 0) {
            chars--;
            setTimeout(tick, 40);
        } else {
            deleting = false;
            role = (role + 1) % roles.length;
            setTimeout(tick, 300);
        }
    }

    chars = 0;
    tick();

})();

/* ==========================================
   Lab case-study pop-ups
========================================== */

(function () {

    // Open a pop-up when a lab card's button is clicked
    document.querySelectorAll(".lab-open").forEach(function (button) {

        button.addEventListener("click", function () {

            var dialog = document.getElementById(button.dataset.lab);

            if (dialog && typeof dialog.showModal === "function") {
                dialog.showModal();
                document.body.style.overflow = "hidden";
            }
        });
    });

    document.querySelectorAll(".lab-modal").forEach(function (dialog) {

        // Clicking the dark backdrop closes the pop-up
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });

        // Restore page scrolling when closed (also fires on Esc)
        dialog.addEventListener("close", function () {
            document.body.style.overflow = "";
        });

        var closeButton = dialog.querySelector(".modal-close");

        if (closeButton) {
            closeButton.addEventListener("click", function () {
                dialog.close();
            });
        }
    });

})();
