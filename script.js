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

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        // prevent default form submission
        event.preventDefault();

        // collect form data
        const firstName = document.querySelector("#fname").value;
        const lastName = document.querySelector("#lname").value;
        const email = document.querySelector("#email").value;
        const message = document.querySelector("#message").value;
        const phone = document.querySelector("#phone").value;

        // log form data to console
        console.log(`Form submitted: ${firstName} ${lastName} ${email} ${phone} ${message}`);

        // reset form
        contactForm.reset();
    });
}