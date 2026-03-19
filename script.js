// Tab navigation
const navLinks = document.querySelectorAll('.nav-link');
const tabs = document.querySelectorAll('.tab');

function activateTab(tabId) {
  tabs.forEach(t => t.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  const link = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
  if (link) link.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    activateTab(link.dataset.tab);
    history.pushState(null, '', `#${link.dataset.tab}`);
  });
});

// Handle direct URL hash on load
const hash = window.location.hash.replace('#', '');
if (hash && document.getElementById(hash)) {
  activateTab(hash);
}

// Gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// BibTeX modal (simple inline toggle)
document.querySelectorAll('.pub-links a').forEach(a => {
  if (a.textContent.trim().startsWith('BibTeX')) {
    a.addEventListener('click', e => {
      e.preventDefault();
      const key = a.closest('.pub-content').querySelector('.pub-title a').textContent.trim().slice(0, 30);
      alert(`BibTeX for "${key}" — replace this with your actual BibTeX entry.`);
    });
  }
});
