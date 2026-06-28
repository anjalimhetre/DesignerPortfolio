// ==========================================================================
// Project Dataset - Anjali Mhetre's Real Projects
// ==========================================================================
const PROJECTS_DATA = {
  1: {
    id: 1,
    title: "Health Navigator",
    category: "Web",
    year: "2025",
    image: "assets/healthtech_mockup.png",
    excerpt: "A full-stack health navigation web application helping users find relevant medical resources, track wellness metrics, and connect with healthcare services.",
    tags: ["Python", "Full-Stack", "REST API"],
    client: "Personal Project",
    role: "Full-Stack Developer",
    duration: "3 Months",
    overview: "Health Navigator is a full-stack web application designed to simplify how users find and interact with health-related resources. It provides a centralized platform where individuals can search for medical facilities, log wellness metrics, and access healthcare guidance — all through a clean and accessible interface.",
    problem: "Navigating healthcare resources online is fragmented and overwhelming. Users are forced to switch between multiple websites and apps to find the right medical provider, track health history, or understand symptoms — leading to frustration and delays in seeking help.",
    solution: "Built a unified full-stack health navigation platform using Python and REST APIs. The application features a structured search interface for healthcare services, user-friendly wellness tracking forms, and a modular backend architecture built for extensibility and clean data flows.",
    process: "Defined project requirements through user interviews and competitive analysis. Designed RESTful API endpoints, implemented data validation logic, and iteratively tested backend integration against front-end UI components. Maintained detailed documentation throughout development.",
    results: "Successfully deployed the application with core navigation and tracking features fully functional. Received positive feedback on usability during peer testing, with testers noting the clean structure and ease of resource discovery.",
    metrics: [
      { num: "95%", label: "Test Coverage" },
      { num: "3+", label: "Core Modules" },
      { num: "100%", label: "REST Compliant" }
    ]
  },
  2: {
    id: 2,
    title: "Social Enhancement App",
    category: "Mobile",
    year: "2025",
    image: "assets/collab_mockup.png",
    excerpt: "A social connectivity application designed to improve digital interactions, featuring community features, user feeds, and enhanced engagement tools.",
    tags: ["Mobile App", "SQL", "REST APIs"],
    client: "Personal Project",
    role: "Full-Stack Developer",
    duration: "4 Months",
    overview: "The Social Enhancement App is a mobile application aimed at improving the quality of digital social interactions. It enables users to create communities, share curated content feeds, engage in structured conversations, and maintain meaningful connections with their network.",
    problem: "Existing social platforms prioritize engagement metrics over meaningful interaction, leading to noise, information overload, and declining satisfaction. Users struggle to maintain real connections in an environment designed for passive scrolling rather than active participation.",
    solution: "Designed and built a mobile app with structured community spaces, curated content discovery, and interaction tools encouraging quality engagement. The backend uses SQL for relational data modeling ensuring efficient queries for user feeds, connections, and community membership.",
    process: "Mapped user journeys for key social interactions. Developed RESTful API contracts first, then implemented the front-end against them. Wrote SQL migration scripts, tested database integrity under load, and iterated on UI patterns based on test user feedback.",
    results: "Completed a fully functional application with user authentication, feed management, community creation, and social interaction features. Clean code architecture enabled rapid feature iterations with minimal technical debt.",
    metrics: [
      { num: "5+", label: "Core Features" },
      { num: "SQL", label: "Relational DB" },
      { num: "Agile", label: "Development Style" }
    ]
  },
  3: {
    id: 3,
    title: "Apache Superset",
    category: "Open Source",
    year: "2024",
    image: "assets/fintech_mockup.png",
    excerpt: "Contributed to Apache Superset — a leading open-source data visualization and business intelligence platform used by thousands of organizations worldwide.",
    tags: ["Open Source", "Python", "Data Visualization"],
    client: "Apache Software Foundation",
    role: "Open Source Contributor",
    duration: "Ongoing",
    overview: "Apache Superset is a modern, enterprise-ready business intelligence web application enabling users to explore, visualize, and share data insights. It is used by companies worldwide as a self-service analytics platform built on top of open-source technologies.",
    problem: "Large-scale open-source projects need consistent contributor involvement to maintain code quality, fix issues, improve documentation, and implement new features across a rapidly growing codebase. Maintaining standards across thousands of contributors is a significant challenge.",
    solution: "Contributed to Apache Superset by working on feature improvements and bug fixes following the project's community contribution guidelines. Applied Python best practices, wrote unit tests, participated in code review processes, and maintained thorough documentation standards.",
    process: "Studied the project's contribution guidelines and codebase architecture. Identified issues from the GitHub issue tracker, proposed solutions, submitted pull requests, incorporated reviewer feedback, and ensured changes met the project's quality standards before merge.",
    results: "Successfully contributed to one of the most widely used open-source BI platforms. Gained real-world experience in large-scale collaborative software development, version control workflows, code review culture, and open-source community participation.",
    metrics: [
      { num: "60k+", label: "GitHub Stars" },
      { num: "Community", label: "Contributor" },
      { num: "Python", label: "Stack" }
    ]
  }
};


// ==========================================================================
// Application Core Controller
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initActiveNavTracking();
  initProjectsFilter();
  initModalController();
  initContactForm();
});

// 1. Header Sticky Effect
function initHeaderScroll() {
  const header = document.querySelector(".header");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger check on load
}

// 2. Mobile Menu Controller
function initMobileMenu() {
  const burgerMenu = document.getElementById("burger-menu");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link, .nav-btn");

  const toggleMenu = () => {
    navMenu.classList.toggle("active");
  };

  burgerMenu.addEventListener("click", toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// 3. Navigation Active Link Tracking (ScrollSpy)
function initActiveNavTracking() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

// 4. Projects Category Filter
function initProjectsFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Toggle button states
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const selectedCategory = button.getAttribute("data-category");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        
        // Hide with transitions
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        
        setTimeout(() => {
          if (selectedCategory === "all" || cardCategory === selectedCategory) {
            card.style.display = "flex";
            // Trigger visual fade in
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 50);
          } else {
            card.style.display = "none";
          }
        }, 300);
      });
    });
  });
}

// 5. Case Study Modal Controller
function initModalController() {
  const modalOverlay = document.getElementById("project-modal");
  const modalContainer = modalOverlay.querySelector(".modal-container");
  const modalCloseBtn = document.getElementById("modal-close");
  const projectCards = document.querySelectorAll(".project-card");

  const openModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    // Inject data into Modal
    document.getElementById("modal-hero-img").src = data.image;
    document.getElementById("modal-hero-img").alt = data.title;
    document.getElementById("modal-category").textContent = data.category;
    document.getElementById("modal-title").textContent = data.title;

    // Metadata items
    document.getElementById("meta-client").textContent = data.client;
    document.getElementById("meta-role").textContent = data.role;
    document.getElementById("meta-duration").textContent = data.duration;
    document.getElementById("meta-year").textContent = data.year;

    // Body content sections
    document.getElementById("modal-overview").textContent = data.overview;
    document.getElementById("modal-problem").textContent = data.problem;
    document.getElementById("modal-solution").textContent = data.solution;
    document.getElementById("modal-process").textContent = data.process;
    document.getElementById("modal-results").textContent = data.results;

    // Metrics widgets mapping
    const metricsContainer = document.getElementById("modal-metrics");
    metricsContainer.innerHTML = "";
    data.metrics.forEach(metric => {
      const box = document.createElement("div");
      box.className = "metric-box";
      box.innerHTML = `
        <div class="metric-num">${metric.num}</div>
        <div class="metric-lbl">${metric.label}</div>
      `;
      metricsContainer.appendChild(box);
    });

    // Reset modal scroll position to top
    modalContainer.scrollTop = 0;

    // Open animations
    document.body.classList.add("modal-open");
    modalOverlay.classList.add("active");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  // Bind clicks to project cards
  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const projectId = card.getAttribute("data-id");
      openModal(projectId);
    });
  });

  // Bind close buttons and escape keys
  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
}

// 6. Contact Form Logic & Validation
function initContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector(".form-submit-btn");
  const formStatus = document.getElementById("form-status");

  // Input Fields
  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("form-email");
  const msgInput = document.getElementById("form-msg");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInput = (input, validationFn) => {
    const errorEl = input.nextElementSibling;
    const isValid = validationFn(input.value.trim());

    if (!isValid) {
      errorEl.style.display = "block";
      input.style.borderColor = "#ef4444";
      return false;
    } else {
      errorEl.style.display = "none";
      input.style.borderColor = "";
      return true;
    }
  };

  // Setup blur listener for quick feedback
  nameInput.addEventListener("blur", () => validateInput(nameInput, val => val.length > 0));
  emailInput.addEventListener("blur", () => validateInput(emailInput, val => emailRegex.test(val)));
  msgInput.addEventListener("blur", () => validateInput(msgInput, val => val.length > 0));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Verify all fields are valid
    const isNameValid = validateInput(nameInput, val => val.length > 0);
    const isEmailValid = validateInput(emailInput, val => emailRegex.test(val));
    const isMsgValid = validateInput(msgInput, val => val.length > 0);

    if (!isNameValid || !isEmailValid || !isMsgValid) {
      return;
    }

    // Success Simulation
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector("span");
    const originalText = btnText.textContent;
    btnText.textContent = "Sending Message...";

    setTimeout(() => {
      // Complete Simulation
      form.reset();
      submitBtn.disabled = false;
      btnText.textContent = originalText;

      formStatus.textContent = "Thank you! Your message was sent successfully. We will be in touch shortly.";
      formStatus.classList.add("success");
      formStatus.style.display = "block";

      // Hide message after 5 seconds
      setTimeout(() => {
        formStatus.style.opacity = "0";
        setTimeout(() => {
          formStatus.style.display = "none";
          formStatus.style.opacity = "";
          formStatus.classList.remove("success");
        }, 500);
      }, 5000);

    }, 1500);
  });
}
