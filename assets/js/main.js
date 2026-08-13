// Import all modules
// Since we are not using a bundler, we will just include these in index.html,
// but main.js will hold generic initializations.

document.addEventListener('DOMContentLoaded', () => {
  // Page Transition Enter
  document.body.classList.add('page-transition-enter-active');
  
  // Initialize Scroll Reveal
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load
});
