document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const animateEls = document.querySelectorAll("[data-animate]");
  const magneticEls = document.querySelectorAll("[data-magnetic]");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const prefersHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  menuToggle?.addEventListener("click", () => nav?.classList.toggle("open"));
  navLinks.forEach((link) => {
    link.addEventListener("click", () => nav?.classList.remove("open"));
    link.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
    link.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.3 }
  );
  animateEls.forEach((el) => observer.observe(el));

  // Active link while scrolling
  const sections = Array.from(document.querySelectorAll("section[id]"));
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      if (!id) return;
      const link = document.querySelector(`.nav a[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < bottom) {
        link?.classList.add("active");
      } else {
        link?.classList.remove("active");
      }
    });
  });

  // Custom cursor + magnetic buttons (desktop only)
  if (prefersHover && cursorDot && cursorRing) {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      cursorDot.style.transform = `translate(${x}px, ${y}px)`;
    };

    const render = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move);
    render();

    magneticEls.forEach((el) => {
      el.addEventListener("mousemove", (event) => {
        const rect = el.getBoundingClientRect();
        const mx = event.clientX - (rect.left + rect.width / 2);
        const my = event.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${mx * 0.08}px, ${my * 0.08}px)`;
      });
      el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
        document.body.classList.remove("hovering");
      });
    });
  } else {
    cursorDot?.classList.add("hide");
    cursorRing?.classList.add("hide");
  }

  // Neural field (desktop 80-100 nós, mobile 20-25)
  const canvas = document.getElementById("neural-field");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let nodes = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodeCount = getNodeCount();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const nextCount = getNodeCount();
      if (nextCount !== nodeCount) {
        nodeCount = nextCount;
        initNodes();
      }
    };

    const getSpeed = () => (window.innerWidth < 820 ? 0.4 : 0.6);
    const getNodeCount = () => (window.innerWidth < 820 ? 24 : 92);

    const initNodes = () => {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * getSpeed(),
        vy: (Math.random() - 0.5) * getSpeed(),
        r: Math.random() * 2 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = "rgba(96,165,250,0.8)";
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const threshold = window.innerWidth < 820 ? 110 : 150;
          if (dist < threshold) {
            const alpha = 1 - dist / threshold;
            ctx.strokeStyle = `rgba(96,165,250,${alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    resize();
    initNodes();
    draw();
    window.addEventListener("resize", resize);
  }

  const contactForm = document.querySelector(".contact-form");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Recebemos seu diagnóstico. Respondemos em até 24h.");
  });
});
