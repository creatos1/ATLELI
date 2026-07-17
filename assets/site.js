const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");

if (header && menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-locked");
    });
  });
}

const canAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

if (window.gsap && window.ScrollTrigger && canAnimate) {
  document.documentElement.classList.add("gsap-ready");
  gsap.registerPlugin(ScrollTrigger);

  const progress = document.querySelector(".progress");
  if (progress) {
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2
      }
    });
  }

  gsap.utils.toArray(".hero .reveal, .page-hero .reveal").forEach((item, index) => {
    gsap.from(item, {
      y: 34,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.12 + index * 0.08
    });
  });

  if (document.querySelector(".hero-bottle")) {
    gsap.from(".hero-bottle", {
      y: 90,
      rotate: -4,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.35
    });
  }

  if (document.querySelector(".hero-tag")) {
    gsap.from(".hero-tag", {
      scale: 0.78,
      autoAlpha: 0,
      duration: 0.9,
      ease: "back.out(1.6)",
      delay: 0.75
    });
  }

  gsap.utils.toArray("[data-speed]").forEach((item) => {
    const speed = Number(item.dataset.speed || 0);
    const trigger = item.closest(".hero, .page-hero, .custom") || item;
    gsap.to(item, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  gsap.utils.toArray(".section .reveal, .aromas .reveal, .rich-footer .reveal").forEach((item) => {
    gsap.from(item, {
      y: 42,
      autoAlpha: 0,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 84%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".proof-card, .care-list li, .steps li, .detail-card, .story-card").forEach((item) => {
    gsap.to(item, {
      y: -10,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });
  });

  const track = document.querySelector("[data-horizontal]");
  if (track) {
    ScrollTrigger.matchMedia({
      "(min-width: 861px)": function () {
        const getDistance = () => -(track.scrollWidth - window.innerWidth + 56);

        gsap.to(track, {
          x: getDistance,
          ease: "none",
          scrollTrigger: {
            trigger: track.closest(".aromas") || track,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            end: () => "+=" + Math.abs(getDistance())
          }
        });
      }
    });
  }

  if (document.querySelector(".custom")) {
    gsap.to(".custom", {
      backgroundPosition: "center 70%",
      ease: "none",
      scrollTrigger: {
        trigger: ".custom",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
}
