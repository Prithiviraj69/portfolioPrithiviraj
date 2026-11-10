// About tabs
const aboutTabBtns = document.querySelectorAll(".about-tab-btn")
const aboutTabPanes = document.querySelectorAll(".about-tab-pane")

if (aboutTabBtns.length > 0 && aboutTabPanes.length > 0) {
  aboutTabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.dataset.tab + "-tab"

      // Remove active class from all buttons and panes
      aboutTabBtns.forEach((btn) => btn.classList.remove("active"))
      aboutTabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to current button and pane
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Project filtering
const projectFilterBtns = document.querySelectorAll(".project-filter-btn")
const projectCards = document.querySelectorAll(".project-card")

if (projectFilterBtns.length > 0 && projectCards.length > 0) {
  projectFilterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      projectFilterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.dataset.filter

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
        } else {
          if (card.dataset.category === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        }
      })
    })
  })
}

// Skills filtering
const skillFilterBtns = document.querySelectorAll(".skill-filter-btn")
const skillCards = document.querySelectorAll(".skill-card")

if (skillFilterBtns.length > 0 && skillCards.length > 0) {
  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      skillFilterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.dataset.filter

      // Filter skills
      skillCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "flex"
        } else {
          if (card.dataset.category === filter) {
            card.style.display = "flex"
          } else {
            card.style.display = "none"
          }
        }
      })
    })
  })
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  })
}

// Mobile dropdown toggle
const mobileDropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle")

if (mobileDropdownToggles.length > 0) {
  mobileDropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault()
      const parent = this.closest(".mobile-dropdown")
      parent.classList.toggle("active")
    })
  })
}

// Back to top button
const backToTopBtn = document.querySelector(".back-to-top")

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible")
    } else {
      backToTopBtn.classList.remove("visible")
    }
  })

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenuBtn.classList.remove("active")
          mobileMenu.classList.remove("active")
          document.body.classList.remove("menu-open")
        }

        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })
        document.querySelectorAll(`.nav-link[href="${targetId}"]`).forEach((link) => {
          link.classList.add("active")
        })
      }
    }
  })
})

// Highlight active section on scroll
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY + 100 // Adjust for header height

  // Get all sections
  const sections = document.querySelectorAll("section[id]")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Add active class to corresponding nav link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
      })
      document.querySelectorAll(`.nav-link[data-section="${sectionId}"]`).forEach((link) => {
        link.classList.add("active")
      })
    }
  })
})

// Form submission handling
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll('form[data-reset="true"]')

  forms.forEach((form) => {
    form.addEventListener("submit", function () {
      const submitBtn = this.querySelector('button[type="submit"]')
      if (submitBtn) {
        submitBtn.disabled = true
      }
    })
  })
})

// Initialize any tooltips or popovers
document.addEventListener("DOMContentLoaded", () => {
  // Add any initialization code for third-party libraries here
})

// Handle navigation active state on page load
document.addEventListener("DOMContentLoaded", () => {
  // Get current hash or default to home
  const currentHash = window.location.hash || "#home"

  // Set active class on nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })
  document.querySelectorAll(`.nav-link[href="${currentHash}"]`).forEach((link) => {
    link.classList.add("active")
  })
})

// Terminal Tab Switcher
document.addEventListener("DOMContentLoaded", () => {
  const termTabBtns = document.querySelectorAll(".term-tab-btn")
  const termPanes = document.querySelectorAll(".term-pane")

  if (termTabBtns.length > 0) {
    termTabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const target = this.getAttribute("data-term")
        termTabBtns.forEach((b) => b.classList.remove("active"))
        termPanes.forEach((p) => p.classList.remove("active"))
        this.classList.add("active")
        const activePane = document.getElementById(`term-${target}`)
        if (activePane) activePane.classList.add("active")
      })
    })
  }

  // Copy channel button with toast feedback
  const copyBtns = document.querySelectorAll(".copy-channel-btn")
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const textToCopy = this.getAttribute("data-copy")
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy)
          const originalIcon = this.innerHTML
          this.innerHTML = '<i class="fa-solid fa-check" style="color: #22c55e;"></i>'
          setTimeout(() => {
            this.innerHTML = originalIcon
          }, 2000)
        } catch (err) {
          console.error("Failed to copy:", err)
        }
      }
    })
  })

  // Card 3D tilt & spotlight effect on mouse move
  const techCards = document.querySelectorAll(".tech-project-card, .tech-skill-card, .highlight-card")
  techCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    })
  })
})

// Load theme.js and text-animation.js at the end of the file
if (!window.__scriptsLoaded) {
  window.__scriptsLoaded = true
  const themeScript = document.createElement("script")
  themeScript.src = "/js/theme.js"
  document.body.appendChild(themeScript)

  const animScript = document.createElement("script")
  animScript.src = "/js/text-animation.js"
  document.body.appendChild(animScript)
}
