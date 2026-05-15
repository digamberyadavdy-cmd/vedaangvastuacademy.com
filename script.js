const slides = document.querySelectorAll('.slide');

let current = 0;

function changeSlide(){

slides[current].classList.remove('active');

current++;

if(current >= slides.length){
current = 0;
}

slides[current].classList.add('active');
}

setInterval(changeSlide,3000);


// Scroll animation
window.addEventListener("scroll", function(){

const cards = document.querySelectorAll(
'.service-box,.news-card,.zodiac-card'
);

cards.forEach(card => {

let position = card.getBoundingClientRect().top;

let screenHeight = window.innerHeight;

if(position < screenHeight - 100){
card.style.opacity = "1";
card.style.transform = "translateY(0)";
}

});

});
