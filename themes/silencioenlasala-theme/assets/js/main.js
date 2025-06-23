class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createToggleButton();
    this.addEventListeners();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    this.updateToggleButton();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  createToggleButton() {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle theme');
    button.innerHTML = this.getToggleIcon();
    document.body.appendChild(button);
    this.toggleButton = button;
  }

  getToggleIcon() {
    if (this.currentTheme === 'light') {
      return '<img src="/images/dark/logo-dark.png" alt="Switch to classic mode" style="width: 50px; height: 50px;">';
    } else {
      return '<img src="/images/light/moon.png" alt="Switch to modern mode" style="width: 24px; height: 24px;">';
    }
  }

  updateToggleButton() {
    if (this.toggleButton) {
      this.toggleButton.innerHTML = this.getToggleIcon();
      this.toggleButton.setAttribute('aria-label', 
        `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} theme`
      );
    }
  }

  addEventListeners() {
    // Toggle button click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('theme-toggle') || e.target.closest('.theme-toggle')) {
        this.toggleTheme();
      }
    });

    // System theme change detection
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
}
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setActiveNavItem();
  }

  setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkPath = new URL(link.href).pathname;
      
      if (currentPath === linkPath || 
          (currentPath.startsWith(linkPath) && linkPath !== '/')) {
        link.classList.add('active');
      }
    });
  }
}





document.addEventListener('DOMContentLoaded', function () {
  window.themeManager = new ThemeManager();
  new NavigationManager();

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


window.addEventListener('popstate', () => {
  new NavigationManager();
});

