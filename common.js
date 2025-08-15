// Common JavaScript functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  if (themeToggle) {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      body.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark');
      const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
    });
  }

  // Tab functionality for competency cards
  function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        const parentCard = this.closest('.competency-card');
        
        if (parentCard) {
          // Remove active class from all buttons and contents in this card
          parentCard.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
          parentCard.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Show corresponding content
          const targetContent = parentCard.querySelector(`#${targetTab}`);
          if (targetContent) {
            targetContent.classList.add('active');
          }
        }
      });
    });
  }

  // Initialize tabs if they exist
  if (document.querySelectorAll('.tab-button').length > 0) {
    initializeTabs();
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Navigation active state based on scroll position (for pages with sections)
  function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    if (sections.length === 0) return;
    
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Update navigation on scroll (only if sections exist)
  if (document.querySelectorAll('section[id]').length > 0) {
    window.addEventListener('scroll', updateActiveNavigation);
  }

  // Mobile menu toggle (basic functionality)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('mobile-active');
    });
  }

  // Close dropdowns when clicking outside (for top nav pages)
  document.addEventListener('click', function(e) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) menu.classList.remove('show');
        dropdown.classList.remove('active');
      }
    });
  });

  // Unified Side Navigation toggle behavior (for pages using side nav)
  const sideNavToggle = document.getElementById('sideNavToggle');
  const sideNav = document.getElementById('sideNav');
  const navOverlay = document.getElementById('navOverlay');

  function openSideNav() {
    if (!sideNav) return;
    sideNav.classList.add('open');
    if (navOverlay) navOverlay.classList.add('show');
    if (sideNavToggle) sideNavToggle.classList.add('hidden');
  }
  
  function closeSideNav() {
    if (!sideNav) return;
    sideNav.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('show');
    if (sideNavToggle) sideNavToggle.classList.remove('hidden');
  }
  
  function toggleSideNav() {
    if (!sideNav) return;
    if (sideNav.classList.contains('open')) closeSideNav(); else openSideNav();
  }

  if (sideNavToggle && sideNav) {
    sideNavToggle.addEventListener('click', toggleSideNav);
  }
  if (navOverlay && sideNav) {
    navOverlay.addEventListener('click', closeSideNav);
  }

  // Close button in side nav
  const navCloseBtn = document.getElementById('navCloseBtn');
  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', closeSideNav);
  }

  // Close side nav when a link inside the nav is clicked
  if (sideNav) {
    sideNav.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', closeSideNav);
    });
  }

  // Keyboard support for closing side nav
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sideNav && sideNav.classList.contains('open')) {
      closeSideNav();
    }
  });

  // Dropdown toggle behavior within side nav
  const sideDropdownToggles = document.querySelectorAll('.header .dropdown-toggle');
  if (sideDropdownToggles.length > 0) {
    sideDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdown = this.closest('.dropdown');
        if (!dropdown) return;
        const menu = dropdown.querySelector('.dropdown-menu');
        const chevron = this.querySelector('i');

        // Close other open dropdowns
        document.querySelectorAll('.header .dropdown .dropdown-menu.show').forEach(otherMenu => {
          if (otherMenu !== menu) otherMenu.classList.remove('show');
        });
        document.querySelectorAll('.header .dropdown .dropdown-toggle i').forEach(otherIcon => {
          if (otherIcon !== chevron) otherIcon.style.transform = 'rotate(0deg)';
        });

        // Toggle current
        if (menu) menu.classList.toggle('show');
        const isOpen = menu && menu.classList.contains('show');
        if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      });
    });
  }

  // Strictly prevent any auto-download behavior by avoiding programmatic clicks on anchors
  // and ensuring iframes are display-only. No download triggers exist here by design.
});
