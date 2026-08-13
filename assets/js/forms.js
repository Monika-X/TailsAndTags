// Form handling: success messages + input reset without full page refresh

document.addEventListener('DOMContentLoaded', function () {
  // Insert a small success message below the submitted form, auto-dismiss after a few seconds
  function showSuccess(form, message) {
    var parent = form.parentNode;
    var existing = parent.querySelector('.form-success');
    if (existing) existing.remove();

    var msg = document.createElement('div');
    msg.className = 'form-success';
    msg.setAttribute('role', 'status');
    msg.style.cssText = 'display:inline-flex;align-items:center;gap:8px;margin-top:10px;padding:10px 14px;border-radius:var(--radius-sm, 8px);background:rgba(99,195,124,0.12);border:1px solid #63c37c;color:#63c37c;font-size:0.9rem;font-weight:500;';
    msg.innerHTML = '<i class="fa-solid fa-circle-check"></i><span></span>';
    msg.querySelector('span').textContent = message;
    parent.insertBefore(msg, form.nextSibling);
    setTimeout(function () { msg.remove(); }, 4000);
  }

  // --- Newsletter forms (footer "The Private List" + inline subscribe sections) ---
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) return;
      showSuccess(form, 'Thanks for subscribing! Please check your inbox.');
      form.reset();
    });
  });

  // --- Contact form (contact.html) ---
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showSuccess(contactForm, 'Your message has been sent. We will get back to you soon!');
      contactForm.reset();
    });
  }

  // --- Blog comment form (blog-details.html) ---
  var commentForm = document.getElementById('comment-form');
  if (commentForm) {
    var list = document.getElementById('comment-list');
    var countEl = document.getElementById('comment-count');
    var nameInput = document.getElementById('comment-name');
    var textInput = document.getElementById('comment-text');

    var articleId = (window.location.search.match(/[?&]id=(\d+)/) || [null, '1'])[1];
    var STORE_KEY = 'tt_comments_' + articleId;

    function loadComments() {
      try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
      catch (err) { return []; }
    }
    function saveComments(comments) {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(comments)); } catch (err) {}
    }
    function renderComment(comment) {
      var wrap = document.createElement('div');
      wrap.style.cssText = 'margin-bottom: var(--spacing-md); padding-bottom: var(--spacing-md); border-bottom: 1px solid var(--border-color);';
      var name = document.createElement('h5');
      name.style.cssText = 'margin-bottom: 5px;';
      name.textContent = comment.name;
      var body = document.createElement('p');
      body.style.margin = '0';
      body.textContent = comment.text;
      wrap.appendChild(name);
      wrap.appendChild(body);
      list.appendChild(wrap);
      return wrap;
    }
    function updateCount() {
      if (countEl) countEl.textContent = 'Comments (' + (2 + loadComments().length) + ')';
    }

    loadComments().forEach(renderComment);
    updateCount();

    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = textInput.value.trim();
      if (!text) return;
      var comment = { name: (nameInput.value.trim() || 'Guest'), text: text };
      var comments = loadComments();
      comments.push(comment);
      saveComments(comments);
      var node = renderComment(comment);
      updateCount();
      commentForm.reset();
      showSuccess(commentForm, 'Comment posted successfully!');
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});