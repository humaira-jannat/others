document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // Smooth scrolling for nav links
    // ==========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================
    // Header shadow effect on scroll
    // ==========================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.pageYOffset > 0 
            ? '0 2px 30px rgba(0,0,0,0.15)' 
            : '0 2px 20px rgba(0,0,0,0.1)';
    });

    // ==========================
    // Animate sections on scroll
    // ==========================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ==========================
    // Active nav link on scroll
    // ==========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 200) {
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
    if (heroTitle) {
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
        typeWriter();
    }

    // ==========================
    // Contact Form Submission to Google Sheet
    // ==========================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            fetch("https://script.google.com/macros/s/AKfycbyOZ6BeaDrwRKJh-5lptC7qD-NEX6i5nAl752g-SBpNGfuRCRSHf_1Hr7uk7J9BpztutQ/exec", {
                method: "POST",
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                alert("Message sent successfully!");
                contactForm.reset();
            })
            .catch(err => {
                console.error(err);
                alert("Error sending message. Try again.");
            });
        });
    }
});

