/* =====================================================================
   Shared site script: mobile nav toggle + reusable lightbox
   ===================================================================== */
document.addEventListener('click', e => {
  const t = e.target.closest('.nav-toggle');
  if (t) { document.getElementById('navLinks').classList.toggle('open'); }
});

/* ---------- Lightbox ---------- */
window.Lightbox = (function () {
  let items = [], idx = 0, box, imgEl, capEl;
  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML =
      '<button class="lb-close" aria-label="Close">×</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous">‹</button>' +
      '<img alt="" />' +
      '<button class="lb-btn lb-next" aria-label="Next">›</button>' +
      '<div class="lb-cap"></div>';
    document.body.appendChild(box);
    imgEl = box.querySelector('img');
    capEl = box.querySelector('.lb-cap');
    box.querySelector('.lb-close').onclick = close;
    box.querySelector('.lb-prev').onclick = () => go(-1);
    box.querySelector('.lb-next').onclick = () => go(1);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });
    // swipe
    let sx = 0;
    box.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    box.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
  function render() {
    const it = items[idx];
    imgEl.src = it.src; imgEl.alt = it.cap || '';
    capEl.textContent = it.cap || '';
  }
  function go(d) { idx = (idx + d + items.length) % items.length; render(); }
  function open(list, start) {
    if (!box) build();
    items = list; idx = start || 0; render();
    box.classList.add('open');
  }
  function close() { box.classList.remove('open'); }
  return { open };
})();
