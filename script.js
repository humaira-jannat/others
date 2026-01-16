// ==========================
// Smooth scrolling for navigation links
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================
// Header scroll effect
// ==========================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    }
    
    lastScroll = currentScroll;
});

// ==========================
// Contact form submission
// ==========================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const data = {
        name: contactForm.querySelector('input[placeholder="First Name"]').value + " " + contactForm.querySelector('input[placeholder="Last Name"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value
    };

    // Send data to Google Sheets
    fetch("https://script.google.com/macros/s/AKfycbw6EbS0ZKq9um1uLHfK8vXB2H4n1qrN9TVGc-acB0hPzpQZluosWbTPQKhoYfRmY1qa/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        alert("Message sent successfully!");
        contactForm.reset();
    })
    .catch(() => {
        alert("Error sending message. Try again.");
    });
});

// ==========================
// Animate elements on scroll
// ==========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ==========================
// Add active class to nav links on scroll
// ==========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================
// Hero typing effect
// ==========================
const heroTitle = document.querySelector('.hero-text h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let charIndex = 0;

function typeWriter() {
    if (charIndex < text.length) {
        heroTitle.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect on page load
window.addEventListener('load', () => {
    typeWriter();
});
