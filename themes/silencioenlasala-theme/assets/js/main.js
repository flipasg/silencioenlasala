document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main'); // Scroll container
  const body = document.body;
  const mobileImage = document.querySelector('.section-image-mobile');
  let imageHidden = false;

  // Mobile image interactions (only on mobile screens)
  if (mobileImage && window.innerWidth < 560) {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    const navbar = document.querySelector('.navbar');
    
    // Function to switch to compact layout
    function switchToCompactLayout() {
      if (header) header.classList.add('compact');
      if (logo) logo.classList.add('small');
      if (navbar) navbar.classList.add('compact');
    }
    
    // Click to fade out
    mobileImage.addEventListener('click', function () {
      if (!imageHidden) {
        mobileImage.classList.add('fade-out');
        imageHidden = true;
        
        // Switch to compact layout immediately
        switchToCompactLayout();
        
        // Hide completely after animation
        setTimeout(() => {
          mobileImage.classList.add('hidden');
        }, 500);
      }
    });

    // Multiple scroll detection methods
    let lastScrollTop = 0;
    let scrollStarted = false;

    // Method 1: Main container scroll
    main.addEventListener('scroll', function () {
      if (!imageHidden) {
        const scrollTop = main.scrollTop;
        
        if (!scrollStarted && scrollTop > 10) {
          scrollStarted = true;
          console.log('Scroll detected on main:', scrollTop);
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 20) {
          console.log('Triggering scroll-up animation');
          mobileImage.classList.add('scroll-up');
          imageHidden = true;
          
          // Switch to compact layout immediately
          switchToCompactLayout();
          
          setTimeout(() => {
            mobileImage.classList.add('hidden');
          }, 500);
        }
        
        lastScrollTop = scrollTop;
      }
    });

    // Method 2: Window scroll (fallback)
    window.addEventListener('scroll', function () {
      if (!imageHidden && window.scrollY > 20) {
        console.log('Window scroll detected:', window.scrollY);
        mobileImage.classList.add('scroll-up');
        imageHidden = true;
        
        // Switch to compact layout immediately
        switchToCompactLayout();
        
        setTimeout(() => {
          mobileImage.classList.add('hidden');
        }, 500);
      }
    });

    // Method 3: Touch events for mobile
    let touchStartY = 0;
    mobileImage.addEventListener('touchstart', function (e) {
      touchStartY = e.touches[0].clientY;
    });

    mobileImage.addEventListener('touchmove', function (e) {
      if (!imageHidden) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        
        if (deltaY > 30) { // Swiped up
          console.log('Touch swipe up detected');
          mobileImage.classList.add('scroll-up');
          imageHidden = true;
          
          // Switch to compact layout immediately
          switchToCompactLayout();
          
          setTimeout(() => {
            mobileImage.classList.add('hidden');
          }, 500);
        }
      }
    });
  }

  // Header scroll functionality
  main.addEventListener('scroll', function () {
    if (window.innerWidth <= 768) {
      if (main.scrollTop > 100) {
        body.classList.add('scrolled');
      } else {
        body.classList.remove('scrolled');
      }
    }
  });
});
