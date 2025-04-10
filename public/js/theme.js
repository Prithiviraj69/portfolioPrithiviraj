// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle")
    const htmlElement = document.documentElement
    const themeIcons = document.querySelectorAll(".theme-toggle i")
  
    // Check for saved theme preference or use the system preference
    const savedTheme =
      localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  
    // Apply the saved theme
    setTheme(savedTheme)
  
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", toggleTheme)
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener("click", toggleTheme)
    }
  
    // Function to toggle between light and dark themes
    function toggleTheme() {
      const currentTheme = htmlElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
  
      setTheme(newTheme)
      localStorage.setItem("theme", newTheme)
    }
  
    // Function to set the theme and update icons
    function setTheme(theme) {
      htmlElement.setAttribute("data-theme", theme)
  
      // Update icons
      themeIcons.forEach((icon) => {
        if (theme === "dark") {
          icon.classList.remove("fa-sun")
          icon.classList.add("fa-moon")
        } else {
          icon.classList.remove("fa-moon")
          icon.classList.add("fa-sun")
        }
      })
    }
  
    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light")
      }
    })
  })
  