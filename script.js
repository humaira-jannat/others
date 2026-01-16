
// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Header shadow on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 0 
        ? '0 2px 30px rgba(0,0,0,0.15)' 
        : '0 2px 20px rgba(0,0,0,0.1)';
});

// Hero text typing
const heroTitle = document.querySelector('.hero-text h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let charIndex = 0;
function typeWriter() {
    if(charIndex < text.length) {
        heroTitle.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}
window.addEventListener('load', () => typeWriter());

// Contact Form → Google Sheets
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    fetch("https://script.google.com/macros/s/AKfycbzauysjDeaRbGACSvABjxaDOS45mmjvGfJsunAyWMbKMzrWv35DrrVhx82wXw_a-JLP/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        alert("Message sent successfully!");
        form.reset();
    })
    .catch(() => alert("Error sending message. Try again."));
});
