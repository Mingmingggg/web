/*
 * Infobytes Solutions Inc. Website Scripts
 * Enhanced Corporate Design with Advanced Animations
 */

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: false,
        mirror: true,
        disable: false,
      })
    }
  
    // Counter Up Animation
    if (typeof $ !== "undefined" && $.fn.counterUp) {
      $(".counter").counterUp({
        delay: 10,
        time: 1000,
      })
    } else {
      // Fallback counter animation if jQuery is not available
      const counters = document.querySelectorAll(".counter")
      counters.forEach((counter) => {
        const target = Number.parseInt(counter.textContent)
        let count = 0
        const increment = target / 100
  
        const updateCounter = () => {
          if (count < target) {
            count += increment
            counter.textContent = Math.ceil(count)
            setTimeout(updateCounter, 10)
          } else {
            counter.textContent = target
          }
        }
  
        updateCounter()
      })
    }
  
    // Navbar Shrink on Scroll
    const mainNav = document.getElementById("mainNav")
    if (mainNav) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          mainNav.classList.add("navbar-shrink")
        } else {
          mainNav.classList.remove("navbar-shrink")
        }
      })
    }
  
    // Preloader
    setTimeout(() => {
      const preloader = document.getElementById("preloader")
      if (preloader) {
        preloader.style.opacity = "0"
        setTimeout(() => {
          preloader.style.display = "none"
        }, 500)
      }
    }, 1000)
  
    // Back to Top Button
    const backToTopButton = document.querySelector(".back-to-top")
    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add("active")
        } else {
          backToTopButton.classList.remove("active")
        }
      })
  
      backToTopButton.addEventListener("click", (e) => {
        e.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        if (this.getAttribute("href") !== "#") {
          e.preventDefault()
          const targetId = this.getAttribute("href")
          const targetElement = document.querySelector(targetId)
  
          if (targetElement) {
            const navHeight = document.querySelector("#mainNav").offsetHeight
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
  
            window.scrollTo({
              top: targetPosition - navHeight,
              behavior: "smooth",
            })
  
            // Close mobile menu if open
            const navbarCollapse = document.querySelector(".navbar-collapse")
            if (navbarCollapse && navbarCollapse.classList.contains("show") && typeof bootstrap !== "undefined") {
              const bsCollapse = new bootstrap.Collapse(navbarCollapse)
              bsCollapse.hide()
            }
          }
        }
      })
    })
  
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll("section[id]")
  
    function navHighlighter() {
      const scrollY = window.pageYOffset
  
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100
        const sectionId = current.getAttribute("id")
        const navLink = document.querySelector(`.navbar-nav a[href*=${sectionId}]`)
  
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll(".navbar-nav a").forEach((link) => {
            link.classList.remove("active")
          })
          navLink.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", navHighlighter)
  
    // Service Card Animations
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".service-icon i")
        if (icon) {
          icon.classList.add("fa-bounce")
          setTimeout(() => {
            icon.classList.remove("fa-bounce")
          }, 1000)
        }
      })
    })
  
    // Solution Card Animations
    const solutionCards = document.querySelectorAll(".solution-card")
    solutionCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".solution-icon i")
        if (icon) {
          icon.classList.add("fa-flip")
          setTimeout(() => {
            icon.classList.remove("fa-flip")
          }, 1000)
        }
      })
    })
  
    // Partner Item Animations
    const partnerItems = document.querySelectorAll(".partner-item")
    partnerItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        const logo = this.querySelector(".partner-logo img")
        if (logo) {
          logo.style.transform = "scale(1.1)"
          setTimeout(() => {
            logo.style.transform = "scale(1)"
          }, 500)
        }
      })
    })
  
    // Mobile Detection
    function isMobile() {
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      )
    }
  
    // Adjust animations for mobile
    if (isMobile()) {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        el.setAttribute("data-aos-delay", "0")
      })
    }
  
    // Fix for iOS vh units
    function setVhProperty() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }
  
    setVhProperty()
    window.addEventListener("resize", setVhProperty)
  
    // Ensure images are loaded before animations
    window.addEventListener("load", () => {
      if (typeof AOS !== "undefined") {
        AOS.refresh()
      }
  
      // Fix Google Maps container height
      const mapContainer = document.querySelector(".map-container")
      if (mapContainer) {
        const iframe = mapContainer.querySelector("iframe")
        if (iframe) {
          iframe.style.height = "450px"
          mapContainer.style.height = "450px"
        }
      }
    })
  
    // Add parallax effect to hero section
    const hero = document.querySelector(".hero")
    if (hero && !isMobile()) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
      })
    }
  
    // Add hover effect to contact items
    const contactItems = document.querySelectorAll(".contact-item")
    contactItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateX(10px)"
      })
      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateX(0)"
      })
    })
  
    // Add typing effect to hero title
    const heroTitle = document.querySelector(".hero-title")
    if (heroTitle && !isMobile()) {
      const text = heroTitle.textContent
      heroTitle.textContent = ""
      let i = 0
  
      function typeWriter() {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 50)
        }
      }
  
      // Start typing effect after a short delay
      setTimeout(typeWriter, 500)
    }
  })
  
  