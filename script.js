// Activate Menu Button //
let menuBtn = document.querySelector('#menu-btn');
let menuBar = document.querySelector('.menu-bar');
menuBtn.onclick = () =>{
    menuBtn.classList.toggle('bx-x');
    menuBar.classList.toggle('active');
}

// Remove menu bar on scrolls //

window.onscroll = () => {
    menuBtn.classList.remove('bx-x');
    menuBar.classList.remove('active');
}

//Scroll Reveal //
ScrollReveal({
    reset: true,
    distance: '100px',
    duration: 2000,
    delay: 200
})
ScrollReveal().reveal('.home-bio h1', {origin: 'left'});
ScrollReveal().reveal('.home-bio p', {origin: 'right'});
ScrollReveal().reveal('.home-bio, heading', {origin: 'top'});
ScrollReveal().reveal('.profile-pic, .skills-items, .project-items, .form', {origin: 'bottom'});

// Typing Animation //
const animatedText = new Typed('.animated-text', {
    strings: ['Back-End Developer', 'Front-End Developer', "Fullstack Developer"],
    backSpeed: 50,
    typeSpeed:50,
    backDelay: 600,
    loop: true
});