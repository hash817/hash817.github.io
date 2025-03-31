document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  
    // Dropdown Menus
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');
        
        // Close other dropdowns
        dropdownToggles.forEach(otherToggle => {
          if (otherToggle !== this) {
            otherToggle.parentElement.classList.remove('active');
          }
        });
      });
    });
  
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDotsContainer = document.querySelector('.hero-dots');
    const heroPrevBtn = document.querySelector('.hero-prev');
    const heroNextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let slideInterval;
  
    // Create dots
    heroSlides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('hero-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      heroDotsContainer.appendChild(dot);
    });
  
    const heroDots = document.querySelectorAll('.hero-dot');
  
    function showSlide(index) {
      heroSlides.forEach(slide => slide.classList.remove('active'));
      heroSlides[index].classList.add('active');
      
      heroDots.forEach(dot => dot.classList.remove('active'));
      heroDots[index].classList.add('active');
      
      currentSlide = index;
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      showSlide(currentSlide);
    }
  
    function goToSlide(index) {
      currentSlide = index;
      showSlide(currentSlide);
      resetInterval();
    }
  
    function startInterval() {
      slideInterval = setInterval(nextSlide, 5000);
    }
  
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
  
    heroPrevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  
    heroNextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  
    startInterval();
  
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
  
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-menu-toggle')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
        });
        
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      }
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
              mainNav.classList.remove('active');
              mobileMenuToggle.classList.remove('active');
            }
          }
        }
      });
    });
  
    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
      });
    } else {
      // Fallback for browsers that don't support lazy loading
      const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });
  
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        lazyLoadObserver.observe(img);
      });
    }
  });