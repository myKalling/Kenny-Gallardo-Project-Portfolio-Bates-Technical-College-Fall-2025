function toggleMenu(evt) {
    // Toggle navigation menu visibility
    let nav = document.querySelector("#nav-list");
    
    if (nav.style.display === "block") {
        evt.target.innerText = "=";
        nav.style.display = "none";
        nav.style.transition = "opacity 0.1s ease-out";
        nav.style.opacity = 0;
    } else {
        evt.target.innerText = "x";
        nav.style.display = "block";
        nav.style.transition = "opacity 0.1s ease-in";
        nav.style.opacity = 1;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // collect and trim form data
        const firstNameEl = document.querySelector("#fname");
        const lastNameEl = document.querySelector("#lname");
        const emailEl = document.querySelector("#email");
        const messageEl = document.querySelector("#message");
        const phoneEl = document.querySelector("#phone");

        const firstName = (firstNameEl && firstNameEl.value || "").trim();
        const lastName = (lastNameEl && lastNameEl.value || "").trim();
        const email = (emailEl && emailEl.value || "").trim();
        const message = (messageEl && messageEl.value || "").trim();
        const phone = (phoneEl && phoneEl.value || "").trim();

        // ensure there's a visible container for messages (error/success)
        let msgEl = document.querySelector(".error-message");
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'error-message';
            msgEl.setAttribute('role', 'alert');
            msgEl.setAttribute('aria-live', 'polite');
            contactForm.parentNode.insertBefore(msgEl, contactForm);
        }

        // helper to show messages
        function showMessage(text, isError = true) {
            msgEl.innerText = text;
            if (isError) {
                msgEl.style.color = '#c00';
            } else {
                msgEl.style.color = '#080';
            }
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[+0-9()\-\.\s]{7,}$/; // simple permissive phone check

        // validate required fields (require first name and email)
        if (!firstName) {
            showMessage('Please enter your first name.');
            firstNameEl && firstNameEl.focus();
            return;
        }
        if (!email) {
            showMessage('Please enter your email address.');
            emailEl && emailEl.focus();
            return;
        }

        // validate email format
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.');
            emailEl && emailEl.focus();
            return;
        }

        // validate phone if provided
        if (phone && !phoneRegex.test(phone)) {
            showMessage('Please enter a valid phone number or leave it blank.');
            phoneEl && phoneEl.focus();
            return;
        }

        // disable submit to prevent double-click
        const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        showMessage('Preparing email...', false);

        try {
            const subject = `Contact Form Submission from ${firstName} ${lastName}`;
            const bodyLines = [
                `Name: ${firstName} ${lastName}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                `Message: ${message}`
            ];
            const body = bodyLines.join('\r\n');
            const recipient = 'owner@mykalling.net';
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Attempt to open mail client by programmatically clicking a temporary anchor
            const a = document.createElement('a');
            a.href = mailtoLink;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            showMessage('Your default email should have opened with computer magic fairy dust. If nothing happened, please send contact detail manually to myKalling LLC (Kenny Gallardo) ' + recipient, false);

            // reset form after short delay so user can cancel if needed
            setTimeout(function() {
                contactForm.reset();
                if (submitBtn) submitBtn.disabled = false;
            }, 1200);
        } catch (err) {
            showMessage('An unexpected error occurred. Please try again or send email to milton.cruz@batestech.edu');
            if (submitBtn) submitBtn.disabled = false;
            console.error(err);
        }
    });
});