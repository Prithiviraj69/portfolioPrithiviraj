document.addEventListener("DOMContentLoaded", () => {
    const textAnimationElements = document.querySelectorAll(".text-animation")
    const totalStyles = 7 // Updated to include the new typing effect style
  
    // Function to preload all animation styles
    function preloadStyles(element) {
      for (let i = 1; i <= totalStyles; i++) {
        element.classList.add(`style-${i}`)
        setTimeout(() => element.classList.remove(`style-${i}`), 50)
      }
    }
  
    textAnimationElements.forEach((element) => {
      const text1 = element.getAttribute("data-text-1")
      const text2 = element.getAttribute("data-text-2")
      let isShowingText1 = true
      let currentStyle = 1
      let animationPaused = false
      let animationTimeout = null
  
      // Preload all styles for smoother first transitions
      preloadStyles(element)
  
      // Apply initial style
      element.classList.add(`style-${currentStyle}`)
      if (currentStyle === 6) element.classList.add("active") // For underline animation
  
      // Function to get a random style (different from current)
      function getRandomStyle() {
        // Remove current style
        element.classList.remove(`style-${currentStyle}`)
        if (currentStyle === 6) element.classList.remove("active")
  
        // Get random style (different from current)
        let newStyle
        do {
          newStyle = Math.floor(Math.random() * totalStyles) + 1
        } while (newStyle === currentStyle)
  
        currentStyle = newStyle
  
        // Apply new style
        element.classList.add(`style-${currentStyle}`)
  
        // Special handling for certain styles
        if (currentStyle === 6) {
          // For the underline animation, add the active class after a small delay
          setTimeout(() => {
            element.classList.add("active")
          }, 100)
        }
  
        // Special handling for typing effect
        if (currentStyle === 7) {
          // Reset width to 0 and then animate to full width
          element.style.width = "0"
          setTimeout(() => {
            element.style.width = "100%"
          }, 50)
        } else {
          element.style.width = "auto"
        }
      }
  
      // Function to toggle between the two texts with different styles
      function toggleText() {
        if (animationPaused) return
  
        // First fade out the current text
        element.classList.add("fade-out")
  
        // After the fade out animation completes, change the text, style, and fade in
        clearTimeout(animationTimeout)
        animationTimeout = setTimeout(() => {
          if (isShowingText1) {
            element.textContent = text2
            isShowingText1 = false
          } else {
            element.textContent = text1
            isShowingText1 = true
          }
  
          // Change to a new random style
          getRandomStyle()
  
          // Fade in with new style
          element.classList.remove("fade-out")
          element.classList.add("fade-in")
  
          // Remove the fade-in class after animation completes
          setTimeout(() => {
            element.classList.remove("fade-in")
          }, 500)
        }, 500)
      }
  
      // Start the animation loop
      let animationInterval = setInterval(toggleText, 2000)
  
      // Add click event to manually trigger style change
      element.addEventListener("click", () => {
        // Clear existing timeouts and intervals
        clearTimeout(animationTimeout)
        clearInterval(animationInterval)
  
        // Toggle animation pause state
        animationPaused = !animationPaused
  
        if (!animationPaused) {
          // Resume animation
          animationInterval = setInterval(toggleText, 2000)
        } else {
          // Manually trigger a style change on click when paused
          toggleText()
        }
  
        // Visual feedback for click (subtle scale effect)
        element.style.transform = "scale(1.05)"
        setTimeout(() => {
          element.style.transform = "scale(1)"
        }, 200)
      })
  
      // Add tooltip to indicate interactivity
      element.title = "Click to change style or pause/resume animation"
      element.style.cursor = "pointer"
    })
  })
  