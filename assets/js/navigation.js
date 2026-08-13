document.documentElement.classList.add('js-nav');

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    const actions = navbar.querySelector('.nav-actions');
    let toggle = navbar.querySelector('.nav-toggle');

    if (!toggle && actions) {
      toggle = document.createElement('button');
      toggle.className = 'btn btn-outline nav-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Toggle Menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i><i class="fa-solid fa-xmark"></i>';
      actions.append(toggle);
    }

    if (toggle) {
      let scrollPos = 0;

      const getScrollY = () => window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const lockScroll = () => {
        scrollPos = getScrollY();
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPos}px`;
        document.body.style.width = '100%';
      };
      const unlockScroll = () => {
        if (document.body.style.position !== 'fixed') return;
        const target = scrollPos;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, target);
        if (getScrollY() !== target) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              window.scrollTo(0, target);
              if (getScrollY() !== target) {
                document.documentElement.scrollTop = target;
                document.body.scrollTop = target;
              }
            });
          });
        }
      };

      const closeMenu = () => {
        const wasOpen = navbar.classList.contains('nav-open');
        navbar.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        if (wasOpen) unlockScroll();
      };

      toggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) lockScroll();
        else unlockScroll();
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && navbar.classList.contains('nav-open')) {
          closeMenu();
        }
      });

      navbar.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', closeMenu);
      });

      const linksList = navbar.querySelector('.nav-links');
      if (linksList && !linksList.querySelector('.nav-cta')) {
        const isSubdir = /\/pages\//.test(window.location.pathname);
        const contactHref = isSubdir ? 'contact.html' : 'pages/contact.html';
        const ctaLi = document.createElement('li');
        ctaLi.className = 'nav-cta';
        ctaLi.style.cssText = 'padding: var(--spacing-md) 0 var(--spacing-sm); text-align: center;';
        ctaLi.innerHTML = '<a href="' + contactHref + '" class="btn-gold" style="width: 100%; justify-content: center;"><i class="fa-solid fa-calendar-check"></i> Book Now</a>';
        linksList.appendChild(ctaLi);
      }

      if (actions && !actions.querySelector('.nav-book')) {
        const isSubdir = /\/pages\//.test(window.location.pathname);
        const contactHref = isSubdir ? 'contact.html' : 'pages/contact.html';
        const book = document.createElement('a');
        book.className = 'btn-gold nav-book';
        book.href = contactHref;
        book.innerHTML = '<i class="fa-solid fa-calendar-check"></i> Book Now';
        actions.append(book);
      }

      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) closeMenu();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });
    }
  }
});