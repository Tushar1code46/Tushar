let menuIcon = document.querySelector('menu-icon');
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toogle('<i class="fa-solid fa-x"></i>');
    navbar.classList.toogle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.off - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= pffset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');

    header.classList.toogle('sticky', window.scrollY > 100)

    menuIcon.classList.toogle('<i class="fa-solid fa-x"></i>');
    navbar.classList.remove('active');
};

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box .contact-form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Backend Developer', 'Database Management'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true

});
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "fadeIn 1s ease forwards";
            }
        });
    }, {
        threshold: 0.1,
    });

    sections.forEach((section) => {
        observer.observe(section);
    });
});


document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Gather form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Prepare data for API request
    const formData = {
        fullName,
        email,
        mobile,
        subject,
        message
    };

    try {
        // Make a POST request to the backend API
        const response = await fetch('http://localhost:9000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.msg); // Message sent successfully
            document.getElementById('contactForm').reset();
        } else {
            alert(data.msg); // Error message
        }
    } catch (error) {
        alert('Error: Could not send message.');
    }
});