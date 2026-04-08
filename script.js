document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menu-btn");
const menuBar = document.getElementById("menu-bar");
const menuIcon = menuBtn?.querySelector("i");
const navLinks = document.querySelectorAll(".menu-bar a");

if (menuBtn && menuBar) {
    menuBtn.addEventListener("click", () => {
        menuBar.classList.toggle("active");
        if (menuIcon) {
            menuIcon.classList.toggle("bx-menu");
            menuIcon.classList.toggle("bx-x");
        }
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuBar.classList.remove("active");
        if (menuIcon) {
            menuIcon.classList.add("bx-menu");
            menuIcon.classList.remove("bx-x");
        }
    });
});

window.addEventListener("scroll", () => {
    menuBar.classList.remove("active");
    if (menuIcon) {
        menuIcon.classList.add("bx-menu");
        menuIcon.classList.remove("bx-x");
    }
});

const sections = document.querySelectorAll("main section[id]");
function setActiveNavOnScroll() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute("id");
        const navLink = document.querySelector(`.menu-bar a[href="#${id}"]`);
        if (!navLink) return;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLink.classList.add("active");
        } else {
            navLink.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", setActiveNavOnScroll);
setActiveNavOnScroll();

if (window.ScrollReveal) {
    ScrollReveal({
        distance: "40px",
        duration: 900,
        delay: 120,
        easing: "ease-out",
        reset: false
    });
    ScrollReveal().reveal(".hero-content, .section-heading", { origin: "top" });
    ScrollReveal().reveal(".impact-card, .timeline-item, .project-item, .skills-card, .education-item", {
        origin: "bottom",
        interval: 80
    });
}

if (window.Typed) {
    new Typed(".animated-text", {
        strings: [
            "IT Engineer at AIC",
            "Software Engineer",
            "AI & Data Workflow Builder"
        ],
        typeSpeed: 45,
        backSpeed: 28,
        backDelay: 1300,
        loop: true
    });
}
