// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');
function checkFade() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

// Events slider
let slideIndex = 0;
const slides = document.querySelectorAll('.events-slider .slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}
showSlide(slideIndex);

// Gallery slider
let galleryIndex = 0;
const gallerySlides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');

function showGallerySlide(n) {
    gallerySlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    galleryIndex = (n + gallerySlides.length) % gallerySlides.length;
    gallerySlides[galleryIndex].classList.add('active');
    dots[galleryIndex].classList.add('active');
}

function changeGallerySlide(n) {
    showGallerySlide(galleryIndex + n);
}

function currentGallerySlide(n) {
    showGallerySlide(n - 1);
}
showGallerySlide(galleryIndex);

// Initialize gallery
showGallerySlide(galleryIndex);

// Auto-slide gallery every 4 seconds
setInterval(() => {
    changeGallerySlide(1);
}, 4000);

// Check for status parameters in URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const message = urlParams.get('message');

    if (status === 'success') {
        alert('✅ Data saved successfully!');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'error') {
        alert('❌ Error: ' + (message || 'Something went wrong.'));
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
