const slides = document.querySelectorAll(".slide");
let current = 0;

function changeSlide() {
    if (!slides.length) {
        return;
    }

    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}

if (slides.length) {
    setInterval(changeSlide, 3000);
}

function toggleMenu() {
    const navMenu = document.getElementById("navMenu");

    if (navMenu) {
        navMenu.classList.toggle("show");
    }
}
