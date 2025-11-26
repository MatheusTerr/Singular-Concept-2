// ============================================
// SINGULAR - INTERACTIVE SYSTEM (OPTIMIZED)
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const animateEls = document.querySelectorAll("[data-animate]");
  const magneticEls = document.querySelectorAll("[data-magnetic]");
  const glassCards = document.querySelectorAll(".glass-card");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const contactForm = document.querySelector(".contact-form");
  
  // Device detection
  const prefersHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ============================================
  // MOBILE MENU
  // ============================================
  
  menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
    menuToggle.classList.toggle("active");
    document.body.style.overflow = nav?.classList.contains("open") ? "hidden" : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
      menuToggle?.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  
  if (!prefersReducedMotion) {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateEls.forEach((el) => observer.observe(el));
  } else {
    // Skip animations if user prefers reduced motion
    animateEls.forEach(el => el.classList.add("in-view"));
  }

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  
  const sections = Array.from(document.querySelectorAll("section[id]"));
  let ticking = false;

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 140;
    
    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute("id");
      if (!id) return;
      
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove("active"));
        link?.classList.add("active");
      }
    });
    
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveLink);
      ticking = true;
    }
  }, { passive: true });

  // ============================================
  // GLASS CARD MOUSE TRACKING (Desktop only)
  // ============================================
  
  if (prefersHover && !isMobile) {
    glassCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
      });
    });
  }

  // ============================================
  // CUSTOM CURSOR - OPTIMIZED (Desktop Only)
  // ============================================
  
  if (prefersHover && !isMobile && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isAnimating = false;

    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows immediately (no lag)
      cursorDot.style.transform = `translate(${mouseX - 3.5}px, ${mouseY - 3.5}px)`;
      
      // Start ring animation if not already running
      if (!isAnimating) {
        isAnimating = true;
        animateRing();
      }
    };

    const animateRing = () => {
      // Smooth follow with easing
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      
      cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      
      // Continue animation
      requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", updateCursor, { passive: true });

    // Magnetic effect on buttons (reduced strength)
    magneticEls.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.08;
        const deltaY = (e.clientY - centerY) * 0.08;
        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      el.addEventListener("mouseenter", () => {
        document.body.classList.add("hovering");
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
        document.body.classList.remove("hovering");
      });
    });
  }

  // ============================================
  // NEURAL NETWORK CANVAS - OPTIMIZED
  // ============================================
  
  const canvas = document.getElementById("neural-field");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d", { alpha: true });
    let nodes = [];
    let animationId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isTabVisible = !document.hidden;

    // Reduced node count for better performance
    const getNodeCount = () => {
      if (width < 480) return 15;
      if (width < 768) return 25;
      if (width < 1024) return 45;
      return 70;
    };

    const getSpeed = () => (width < 768 ? 0.25 : 0.4);
    const getConnectionDistance = () => (width < 768 ? 90 : 120);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initNodes();
    };

    const initNodes = () => {
      const nodeCount = getNodeCount();
      const speed = getSpeed();
      
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 1.2 + 0.6,
      }));
    };

    const draw = () => {
      if (!isTabVisible) return;
      
      ctx.clearRect(0, 0, width, height);
      const connectionDist = getConnectionDistance();

      // Draw connections first (behind nodes)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        // Only check nearby nodes (performance optimization)
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distSquared = dx * dx + dy * dy;
          const distThreshold = connectionDist * connectionDist;

          if (distSquared < distThreshold) {
            const distance = Math.sqrt(distSquared);
            const opacity = (1 - distance / connectionDist) * 0.3;
            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node (simplified, no glow for performance)
        ctx.beginPath();
        ctx.fillStyle = "rgba(96, 165, 250, 0.7)";
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    // Initialize
    resize();
    draw();

    // Debounced resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 250);
    }, { passive: true });

    // Pause animation when tab is not visible (major performance boost)
    document.addEventListener("visibilitychange", () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        draw();
      } else {
        cancelAnimationFrame(animationId);
      }
    });
  }

  // ============================================
  // FORM HANDLING
  // ============================================
  
  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    
    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // TODO: Integrate with Make.com webhook or your backend
      // Example:
      // const response = await fetch('YOUR_WEBHOOK_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      console.log("Form data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      submitBtn.textContent = "✓ Solicitação Enviada!";
      submitBtn.style.background = "linear-gradient(120deg, #10b981, #34d399)";
      
      // Reset form
      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        
        // Show custom alert
        alert("✅ Recebemos sua solicitação!\n\nEntraremos em contato em até 24 horas com perguntas personalizadas sobre seu negócio.");
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      submitBtn.textContent = "⚠️ Erro ao enviar";
      submitBtn.disabled = false;
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
      }, 3000);
    }
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ============================================
  // CONSOLE BRANDING
  // ============================================
  
  console.log(
    "%cSingular%c\nA singularidade da IA aplicada ao seu negócio.\n\nInteressado em trabalhar conosco? Fale com a gente!",
    "font-size: 28px; font-weight: bold; background: linear-gradient(120deg, #2563eb, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; padding: 8px 0;",
    "font-size: 13px; color: #94a3b8; line-height: 1.6;"
  );
});
