/*
 * Infobytes Solutions Inc. Website Scripts
 * Enhanced Corporate Design with Advanced Animations & New 3D Logo Scroller
 */

document.addEventListener("DOMContentLoaded", function() {
  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Fallback to hide preloader if 'load' event takes too long
    const forceHidePreloader = setTimeout(function() {
        if (preloader.style.opacity !== "0") {
            preloader.style.opacity = "0";
            setTimeout(() => { preloader.style.visibility = "hidden"; }, 600); // Match transition
        }
    }, 3500); // Increased fallback time slightly

    window.addEventListener('load', function() {
        clearTimeout(forceHidePreloader);
        preloader.style.opacity = "0";
        setTimeout(() => { preloader.style.visibility = "hidden"; }, 600); // Match CSS transition
    });
  }

  // Typing effect for hero title
  const heroTitleTextElement = document.querySelector(".typing-text");
  if (heroTitleTextElement) {
      const textToType = "Advanced IT Solutions for Future Challenges"; // Text to be typed
      let charIndex = 0;
      const typingSpeed = 90; // Milliseconds per character

      function typeWriter() {
          if (charIndex < textToType.length) {
              heroTitleTextElement.textContent += textToType.charAt(charIndex);
              charIndex++;
              setTimeout(typeWriter, typingSpeed);
          } else {
              // Optional: Blinking cursor stops or changes after typing
              const cursor = document.querySelector(".hero-title .cursor");
              if (cursor) {
                // cursor.style.animation = 'none'; // Stop blinking
                // cursor.style.opacity = '0';
              }
          }
      }
      setTimeout(typeWriter, 800); // Delay before typing starts
  }

  // Navbar Shrink on Scroll
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
      const navHeightThreshold = 50; // Pixels to scroll before shrinking
      function handleScroll() {
          if (window.scrollY > navHeightThreshold) {
              mainNav.classList.add("navbar-shrink");
          } else {
              mainNav.classList.remove("navbar-shrink");
          }
      }
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check in case page is loaded scrolled
  }

  // Back to Top Button
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
      const scrollThreshold = 250; // Pixels to scroll before button appears
      function toggleBackToTopButton() {
          if (window.scrollY > scrollThreshold) {
              backToTopButton.classList.add("active");
          } else {
              backToTopButton.classList.remove("active");
          }
      }
      window.addEventListener("scroll", toggleBackToTopButton);
      toggleBackToTopButton(); // Initial check

      backToTopButton.addEventListener("click", function(e) {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: "smooth"
          });
      });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener("click", function(e) {
          const href = this.getAttribute("href");
          // Ensure it's a valid internal link and not just "#"
          if (href && href.startsWith("#") && href.length > 1) {
              const targetElement = document.querySelector(href);

              if (targetElement) {
                  e.preventDefault(); // Prevent default only if target exists
                  const nav = document.querySelector("#mainNav");
                  const navHeight = nav ? nav.offsetHeight : 0;
                  // Adjust for scroll-padding-top if set in CSS, otherwise use navHeight
                  const scrollPaddingTop = parseInt(getComputedStyle(document.documentElement).scrollPaddingTop) || navHeight;
                  
                  let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                  
                  // If target is the #home (hero), scroll exactly to top of hero, considering navbar offset for other sections
                  if (href === "#home") {
                     targetPosition = targetElement.offsetTop; // Go to very top of hero
                  } else {
                     targetPosition = targetElement.offsetTop - scrollPaddingTop +1; // Add 1px to ensure it triggers active state correctly
                  }


                  window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth"
                  });

                  // Collapse mobile navbar if open
                  const navbarToggler = document.querySelector(".navbar-toggler");
                  const navbarCollapse = document.querySelector(".navbar-collapse.show"); // Check if it's shown
                  if (navbarCollapse && navbarToggler && getComputedStyle(navbarToggler).display !== 'none') {
                      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                      bsCollapse.hide();
                  }
              }
          }
      });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function highlightNavLink() {
      let currentSectionId = "";
      const scrollY = window.pageYOffset;
      const navHeight = mainNav ? mainNav.offsetHeight : 75; // Use a default or calculated nav height
      const offsetCorrection = 5; // Small correction factor

      sections.forEach(function(section) {
          const sectionTop = section.offsetTop - navHeight - offsetCorrection;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionBottom) {
              currentSectionId = section.getAttribute("id");
          }
      });
      
      // If near the top of the page, specifically activate "Home"
      if (scrollY < sections[0].offsetTop - navHeight - offsetCorrection) {
        currentSectionId = "home";
      }
      // If scrolled to the very bottom, ensure the last section (e.g., contact) is active
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - navHeight) {
          const lastSection = sections[sections.length-1];
          if(lastSection) currentSectionId = lastSection.id;
      }


      navLinks.forEach(function(link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
              link.classList.add("active");
          }
      });
  }
  window.addEventListener("scroll", highlightNavLink);
  highlightNavLink(); // Initial call

  // Initialize AOS (Animate On Scroll)
  try {
      if (typeof AOS !== "undefined") {
          AOS.init({
              duration: 700,      
              easing: "ease-in-out-cubic", 
              once: true,        
              mirror: false,      
              offset: 80,        
              delay: 50,         
          });
      }
  } catch (e) {
      console.warn("AOS initialization error:", e);
  }

  // Initialize 3D Partners Logo Scroller
  const scroller = document.querySelector(".partners-logo-scroller");
  if (scroller) {
    const track = scroller.querySelector(".partners-logo-track");
    if (track) {
      const items = Array.from(track.children);
      // Duplicate items for seamless scroll effect.
      // CSS animation moves the track by -50% of its width.
      // Duplicating ensures there's always content visible.
      if (items.length > 0) { // Only clone if there are items
        items.forEach(item => {
          const clone = item.cloneNode(true);
          track.appendChild(clone);
        });
      }
    } else {
        console.warn("Partner logo track (.partners-logo-track) not found inside .partners-logo-scroller.");
    }
  }

  // Counter animation (using jQuery Counter-Up)
  try {
      if (typeof jQuery !== 'undefined' && jQuery.fn.counterUp) {
          jQuery('.counter').counterUp({
              delay: 12, // Slower delay for smoother start
              time: 1600 // Slightly longer animation time
          });
      } else {
          console.warn("jQuery or Counter-Up not available. Manual counter fallback can be implemented if needed.");
          // Basic fallback for counters if jQuery Counter-Up is not available
          document.querySelectorAll('.counter').forEach(counter => {
            const target = +(counter.textContent || counter.innerText);
            counter.textContent = '0'; // Start from 0
            let current = 0;
            const increment = target / (1600 / 16); // 1600ms time, 16ms interval (approx 60fps)

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target; // Ensure it ends on target
              }
            };
            // Start counter when it becomes visible
            new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            }, { threshold: 0.3 }).observe(counter); // Trigger when 30% visible
          });
      }
  } catch (e) {
      console.warn("Counter animation error:", e);
  }

  // Helper for mobile VH unit consistency (addresses URL bar issue on mobile)
  function setVhProperty() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setVhProperty(); // Set on initial load
  window.addEventListener("resize", setVhProperty); // Update on resize

  // Hero overlay parallax effect (subtle vertical movement)
  const heroOverlay = document.querySelector(".hero .overlay");
  if (heroOverlay && window.innerWidth > 768) { // Apply only on non-mobile for performance/simplicity
      window.addEventListener("scroll", function() {
          const scrollPosition = window.pageYOffset;
          heroOverlay.style.transform = `translateY(${scrollPosition * 0.08}px)`; // Reduced parallax intensity
      });
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
  }

  // Refresh AOS on window load if it exists, to recalculate positions after all assets are loaded
  window.addEventListener("load", function() {
      if (typeof AOS !== "undefined") {
          AOS.refresh();
      }
  });

}); // End DOMContentLoaded