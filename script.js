/*
 * Infobytes Solutions Inc. Website Scripts
 * Enhanced Corporate Design with Advanced Animations
 */

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Force preloader to hide after a maximum time (failsafe)
  const forceHidePreloader = setTimeout(function() {
      const preloader = document.getElementById("preloader");
      if (preloader) {
          preloader.style.opacity = "0";
          setTimeout(function() {
              preloader.style.display = "none";
          }, 500);
      }
  }, 3000);

  // Normal preloader hide
  setTimeout(function() {
      const preloader = document.getElementById("preloader");
      if (preloader) {
          preloader.style.opacity = "0";
          setTimeout(function() {
              preloader.style.display = "none";
              clearTimeout(forceHidePreloader); // Clear the failsafe if normal hide works
          }, 500);
      }
  }, 1500);

  // Typing effect for hero title
  const heroTitle = document.querySelector(".typing-text");
  if (heroTitle) {
      const text = "Advanced IT Solutions for Future Challenges";
      let i = 0;
      const speed = 100; // typing speed in milliseconds

      function typeWriter() {
          if (i < text.length) {
              heroTitle.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, speed);
          }
      }

      // Start typing after a short delay
      setTimeout(typeWriter, 1000);
  }

  // Navbar Shrink on Scroll
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
      window.addEventListener("scroll", function() {
          if (window.scrollY > 50) {
              mainNav.classList.add("navbar-shrink");
          } else {
              mainNav.classList.remove("navbar-shrink");
          }
      });
  }

  // Back to Top Button
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
      window.addEventListener("scroll", function() {
          if (window.scrollY > 300) {
              backToTopButton.classList.add("active");
          } else {
              backToTopButton.classList.remove("active");
          }
      });

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
          if (this.getAttribute("href") !== "#") {
              e.preventDefault();
              const targetId = this.getAttribute("href");
              const targetElement = document.querySelector(targetId);

              if (targetElement) {
                  const navHeight = document.querySelector("#mainNav").offsetHeight;
                  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                  window.scrollTo({
                      top: targetPosition - navHeight,
                      behavior: "smooth"
                  });

                  // Close mobile menu if open
                  const navbarCollapse = document.querySelector(".navbar-collapse");
                  if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                      try {
                          // Try to use Bootstrap's collapse if available
                          if (typeof bootstrap !== 'undefined') {
                              const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                              bsCollapse.hide();
                          } else {
                              // Fallback to manual toggle
                              navbarCollapse.classList.remove("show");
                          }
                      } catch (e) {
                          // Fallback if bootstrap is not available
                          navbarCollapse.classList.remove("show");
                      }
                  }
              }
          }
      });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id]");

  function navHighlighter() {
      const scrollY = window.pageYOffset;

      sections.forEach(function(current) {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 100;
          const sectionId = current.getAttribute("id");
          const navLink = document.querySelector(`.navbar-nav a[href*=${sectionId}]`);

          if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              document.querySelectorAll(".navbar-nav a").forEach(function(link) {
                  link.classList.remove("active");
              });
              navLink.classList.add("active");
          }
      });
  }

  window.addEventListener("scroll", navHighlighter);

  // Initialize AOS (Animate On Scroll) if available
  try {
      if (typeof AOS !== "undefined") {
          AOS.init({
              duration: 1000,
              easing: "ease-in-out",
              once: false,
              mirror: true
          });
      }
  } catch (e) {
      console.warn("AOS not available:", e);
  }

  // Initialize Swiper for partners carousel if available
  try {
      if (typeof Swiper !== "undefined") {
          // First row carousel - continuous smooth movement
          const partnersCarousel = new Swiper(".partners-carousel", {
              slidesPerView: 1,
              spaceBetween: 20,
              loop: true,
              freeMode: true,
              allowTouchMove: false,
              speed: 8000, // Very slow speed for smooth continuous movement
              autoplay: {
                  delay: 0, // No delay between transitions
                  disableOnInteraction: false
              },
              breakpoints: {
                  576: {
                      slidesPerView: 2
                  },
                  768: {
                      slidesPerView: 3
                  },
                  992: {
                      slidesPerView: 4
                  },
                  1200: {
                      slidesPerView: 5
                  }
              },
              pagination: {
                  el: ".swiper-pagination",
                  clickable: true
              },
              on: {
                  // Ensure continuous looping
                  beforeDestroy: function() {
                      this.autoplay.stop();
                  },
                  slideChange: function() {
                      // Ensure smooth transition
                      this.params.speed = 8000;
                  }
              }
          });

          // Second row carousel - continuous smooth movement in reverse direction
          const partnersCarousel2 = new Swiper(".partners-carousel-2", {
              slidesPerView: 1,
              spaceBetween: 20,
              loop: true,
              freeMode: true,
              allowTouchMove: false,
              speed: 8000, // Very slow speed for smooth continuous movement
              autoplay: {
                  delay: 0, // No delay between transitions
                  disableOnInteraction: false,
                  reverseDirection: true
              },
              breakpoints: {
                  576: {
                      slidesPerView: 2
                  },
                  768: {
                      slidesPerView: 3
                  },
                  992: {
                      slidesPerView: 4
                  },
                  1200: {
                      slidesPerView: 5
                  }
              },
              on: {
                  // Ensure continuous looping
                  beforeDestroy: function() {
                      this.autoplay.stop();
                  },
                  slideChange: function() {
                      // Ensure smooth transition
                      this.params.speed = 8000;
                  }
              }
          });

          // Ensure carousels keep running even when tab is inactive
          document.addEventListener('visibilitychange', function() {
              if (document.visibilityState === 'visible') {
                  partnersCarousel.autoplay.start();
                  partnersCarousel2.autoplay.start();
              }
          });
      }
  } catch (e) {
      console.warn("Swiper not available or error initializing:", e);
      
      // Fallback for carousel if Swiper fails
      const createSimpleCarousel = function(selector, isReverse) {
          const container = document.querySelector(selector);
          if (!container) return;
          
          const wrapper = container.querySelector('.swiper-wrapper');
          if (!wrapper) return;
          
          // Clone slides for continuous effect
          const slides = wrapper.querySelectorAll('.swiper-slide');
          slides.forEach(function(slide) {
              const clone = slide.cloneNode(true);
              wrapper.appendChild(clone);
          });
          
          // Set up animation
          wrapper.style.display = 'flex';
          wrapper.style.transition = 'transform 60s linear infinite';
          wrapper.style.transform = 'translateX(0)';
          
          const totalWidth = Array.from(wrapper.children).reduce(function(width, slide) {
              return width + slide.offsetWidth + 20; // 20px is spaceBetween
          }, 0);
          
          // Start animation
          setTimeout(function() {
              wrapper.style.transform = isReverse ? 
                  `translateX(${totalWidth / 2}px)` : 
                  `translateX(-${totalWidth / 2}px)`;
          }, 100);
          
          // Reset animation when it completes
          wrapper.addEventListener('transitionend', function() {
              wrapper.style.transition = 'none';
              wrapper.style.transform = 'translateX(0)';
              setTimeout(function() {
                  wrapper.style.transition = 'transform 60s linear infinite';
                  wrapper.style.transform = isReverse ? 
                      `translateX(${totalWidth / 2}px)` : 
                      `translateX(-${totalWidth / 2}px)`;
              }, 50);
          });
      };
      
      // Initialize fallback carousels
      createSimpleCarousel('.partners-carousel', false);
      createSimpleCarousel('.partners-carousel-2', true);
  }

  // Counter animation
  function animateCounter(counter) {
      const target = parseInt(counter.textContent);
      let count = 0;
      const duration = 2000; // Animation duration in milliseconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const increment = target / totalFrames;

      const animate = function() {
          count += increment;
          if (count < target) {
              counter.textContent = Math.ceil(count);
              requestAnimationFrame(animate);
          } else {
              counter.textContent = target;
          }
      };

      animate();
  }

  // Initialize counter animation when element is in viewport
  const counters = document.querySelectorAll('.counter');
  
  // Use Intersection Observer if available
  if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  animateCounter(entry.target);
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });

      counters.forEach(function(counter) {
          observer.observe(counter);
      });
  } else {
      // Fallback for browsers that don't support Intersection Observer
      counters.forEach(function(counter) {
          animateCounter(counter);
      });
  }

  // Service Card Animations
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach(function(card) {
      card.addEventListener("mouseenter", function() {
          const icon = this.querySelector(".service-icon i");
          if (icon) {
              icon.style.transform = "rotateY(180deg)";
              setTimeout(function() {
                  icon.style.transform = "rotateY(0)";
              }, 1000);
          }
      });
  });

  // Solution Card Animations
  const solutionCards = document.querySelectorAll(".solution-card");
  solutionCards.forEach(function(card) {
      card.addEventListener("mouseenter", function() {
          const icon = this.querySelector(".solution-icon i");
          if (icon) {
              icon.style.transform = "rotateY(360deg)";
              icon.style.transition = "transform 0.8s ease";
          }
      });
      
      card.addEventListener("mouseleave", function() {
          const icon = this.querySelector(".solution-icon i");
          if (icon) {
              icon.style.transform = "rotateY(0)";
              icon.style.transition = "transform 0.8s ease";
          }
      });
  });

  // Partner Item Animations
  const partnerItems = document.querySelectorAll(".partner-item");
  partnerItems.forEach(function(item) {
      item.addEventListener("mouseenter", function() {
          const logo = this.querySelector(".partner-logo img");
          if (logo) {
              logo.style.transform = "scale(1.1)";
              logo.style.transition = "transform 0.5s ease";
          }
      });
      
      item.addEventListener("mouseleave", function() {
          const logo = this.querySelector(".partner-logo img");
          if (logo) {
              logo.style.transform = "scale(1)";
              logo.style.transition = "transform 0.5s ease";
          }
      });
  });

  // Add animation to contact items
  const contactItems = document.querySelectorAll(".contact-item");
  contactItems.forEach(function(item) {
      item.addEventListener("mouseenter", function() {
          this.style.transform = "translateX(10px)";
          this.style.transition = "transform 0.3s ease";
      });
      
      item.addEventListener("mouseleave", function() {
          this.style.transform = "translateX(0)";
          this.style.transition = "transform 0.3s ease";
      });
  });

  // Add animation to certification features
  const featureItems = document.querySelectorAll(".feature-item");
  featureItems.forEach(function(item, index) {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
      
      setTimeout(function() {
          item.style.transition = "all 0.5s ease";
          item.style.opacity = "1";
          item.style.transform = "translateX(0)";
      }, 500 + (index * 200));
  });

  // Add animation to social links
  const socialLinks = document.querySelectorAll(".social-link, .social-links a");
  socialLinks.forEach(function(link) {
      link.addEventListener("mouseenter", function() {
          this.style.transform = "translateY(-5px)";
          this.style.transition = "transform 0.3s ease";
      });
      
      link.addEventListener("mouseleave", function() {
          this.style.transform = "translateY(0)";
          this.style.transition = "transform 0.3s ease";
      });
  });

  // Add animation to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(function(button) {
      button.addEventListener("mouseenter", function() {
          this.style.transform = "translateY(-3px)";
          this.style.boxShadow = "0 7px 15px rgba(0, 0, 0, 0.2)";
          this.style.transition = "all 0.3s ease";
      });
      
      button.addEventListener("mouseleave", function() {
          this.style.transform = "translateY(0)";
          this.style.boxShadow = "";
          this.style.transition = "all 0.3s ease";
      });
  });

  // Mobile Detection
  function isMobile() {
      return (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          window.innerWidth < 768
      );
  }

  // Fix for iOS vh units
  function setVhProperty() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setVhProperty();
  window.addEventListener("resize", setVhProperty);

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero");
  if (hero && !isMobile()) {
      window.addEventListener("scroll", function() {
          const scrollPosition = window.pageYOffset;
          const overlay = hero.querySelector(".overlay");
          if (overlay) {
              overlay.style.transform = `translateY(${scrollPosition * 0.3}px)`;
          }
      });
  }

  // Handle navbar toggler click
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
      navbarToggler.addEventListener("click", function() {
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse) {
              if (navbarCollapse.classList.contains("show")) {
                  navbarCollapse.classList.remove("show");
              } else {
                  navbarCollapse.classList.add("show");
              }
          }
      });
  }

  // Close navbar when clicking outside
  document.addEventListener("click", function(event) {
      const navbarCollapse = document.querySelector(".navbar-collapse.show");
      if (navbarCollapse) {
          const navbarToggler = document.querySelector(".navbar-toggler");
          const isClickInside = navbarCollapse.contains(event.target) || 
                               (navbarToggler && navbarToggler.contains(event.target));
          
          if (!isClickInside) {
              navbarCollapse.classList.remove("show");
          }
      }
  });

  // Add animation to section dividers
  const sectionDividers = document.querySelectorAll(".section-divider");
  sectionDividers.forEach(function(divider) {
      divider.innerHTML = '<span></span>';
      const span = divider.querySelector("span");
      span.style.position = "absolute";
      span.style.left = "-100%";
      span.style.width = "100%";
      span.style.height = "100%";
      span.style.background = "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)";
      
      setInterval(function() {
          span.style.left = "-100%";
          span.style.transition = "none";
          setTimeout(function() {
              span.style.transition = "left 2s ease";
              span.style.left = "100%";
          }, 50);
      }, 3000);
  });
});

// When the window has fully loaded
window.addEventListener("load", function() {
  // Force hide preloader if it's still visible
  const preloader = document.getElementById("preloader");
  if (preloader && preloader.style.display !== "none") {
      preloader.style.opacity = "0";
      setTimeout(function() {
          preloader.style.display = "none";
      }, 500);
  }

  // Ensure all images are loaded before animations
  try {
      if (typeof AOS !== "undefined") {
          AOS.refresh();
      }
  } catch (e) {
      console.warn("Error refreshing AOS:", e);
  }

  // Fix Google Maps container height
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
      const iframe = mapContainer.querySelector("iframe");
      if (iframe) {
          iframe.style.height = "450px";
          mapContainer.style.height = "450px";
      }
  }
});
