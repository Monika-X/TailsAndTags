document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const dirToggle = document.getElementById('dir-toggle');
  const html = document.documentElement;
  
  // Theme Toggle (Dark / Light)
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.innerHTML = newTheme === 'light' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    });
  }

  // Direction Toggle (LTR / RTL)
  const savedDir = localStorage.getItem('dir') || 'ltr';
  html.setAttribute('dir', savedDir);
  
  if (dirToggle) {
    dirToggle.textContent = savedDir.toUpperCase();
    dirToggle.addEventListener('click', () => {
      const currentDir = html.getAttribute('dir');
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      html.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      dirToggle.textContent = newDir.toUpperCase();
    });
  }
});

