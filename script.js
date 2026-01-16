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
    // Contact form submission
    // ==========================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = {
                name: contactForm.querySelector('input[placeholder="First Name"]').value + " " +
                      contactForm.querySelector('input[placeholder="Last Name"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };

            fetch("https://script.google.com/macros/s/AKfycbyOZ6BeaDrwRKJh-5lptC7qD-NEX6i5nAl752g-SBpNGfuRCRSHf_1Hr7uk7J9BpztutQ/exec", {
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
    }

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
});
