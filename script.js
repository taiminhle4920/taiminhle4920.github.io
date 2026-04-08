/* ── Year ───────────────────────────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();

/* ── Custom cursor glow ─────────────────────────────────────── */
const cursorGlow = document.getElementById("cursor-glow");
let mouseX = -999, mouseY = -999;
let glowX = -999, glowY = -999;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    if (cursorGlow) {
        cursorGlow.style.left = glowX + "px";
        cursorGlow.style.top  = glowY + "px";
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

/* ── Typed.js ──────────────────────────────────────────────── */
if (window.Typed) {
    new Typed(".animated-text", {
        strings: [
            "Software Engineer",
            "AI & ML Builder",
            "Backend Systems Dev",
            "IT Engineer at AIC"
        ],
        typeSpeed: 42,
        backSpeed: 24,
        backDelay: 1800,
        startDelay: 400,
        loop: true,
        showCursor: false
    });
}

/* ── Mobile menu ─────────────────────────────────────────────── */
const menuBtn  = document.getElementById("menu-btn");
const menuBar  = document.getElementById("menu-bar");
const menuIcon = menuBtn?.querySelector("i");
const navLinks = document.querySelectorAll(".menu-bar a");

function closeMenu() {
    menuBar?.classList.remove("active");
    menuIcon?.classList.replace("bx-x", "bx-menu");
}

menuBtn?.addEventListener("click", () => {
    menuBar.classList.toggle("active");
    const isOpen = menuBar.classList.contains("active");
    menuIcon?.classList.toggle("bx-menu", !isOpen);
    menuIcon?.classList.toggle("bx-x", isOpen);
});

navLinks.forEach(link => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", closeMenu);

/* ── Scroll-spy ─────────────────────────────────────────────── */
const sections = document.querySelectorAll("main section[id]");

function setActiveNav() {
    const scrollY = window.scrollY + 140;
    sections.forEach((section) => {
        const id      = section.getAttribute("id");
        const link    = document.querySelector(`.menu-bar a[href="#${id}"]`);
        if (!link) return;
        const inView  = scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight;
        link.classList.toggle("active", inView);
    });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();

/* ── Reveal on scroll ───────────────────────────────────────── */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    revealObserver.observe(el);
});

/* ── Animated stat counters ──────────────────────────────────── */
function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || "";
    const duration = 1400;
    const start    = performance.now();

    function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.6 }
);

document.querySelectorAll(".stat-value[data-target]").forEach(el => statObserver.observe(el));

/* ── 3D card tilt ────────────────────────────────────────────── */
const TILT_STRENGTH = 8;

function applyTilt(card, e) {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const rotX   = -dy * TILT_STRENGTH;
    const rotY   =  dx * TILT_STRENGTH;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
}

function resetTilt(card) {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
}

document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => applyTilt(card, e));
    card.addEventListener("mouseleave", () => resetTilt(card));
});

/* ── Skill tag stagger entrance ─────────────────────────────── */
document.querySelectorAll(".skill-tags, .tech-tags, .project-tech").forEach((container) => {
    const tags = container.querySelectorAll("span");
    tags.forEach((tag, i) => {
        tag.style.opacity = "0";
        tag.style.transform = "translateY(10px)";
        tag.style.transition = `opacity 0.35s ease ${i * 0.06}s, transform 0.35s ease ${i * 0.06}s`;
    });

    const obs = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                tags.forEach((tag) => {
                    tag.style.opacity = "1";
                    tag.style.transform = "translateY(0)";
                });
                obs.disconnect();
            }
        },
        { threshold: 0.3 }
    );

    obs.observe(container);
});
