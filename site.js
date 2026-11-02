// Theme toggle, footer year and image lightbox, shared by the project pages.
(function () {
  var root = document.documentElement, btn = document.getElementById('theme');
  try { var t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
  if (btn) btn.addEventListener('click', function () {
    var dark = root.dataset.theme ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Lightbox: click any image inside .frame or .p-cover to view it full size.
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.frame img, .p-cover img'));
  if (!imgs.length) return;
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = '<button class="x" aria-label="Close">✕</button><button class="pv" aria-label="Previous">‹</button>' +
    '<img alt=""><p></p><button class="nx" aria-label="Next">›</button>';
  document.body.appendChild(lb);
  var big = lb.querySelector('img'), cap = lb.querySelector('p'), i = 0;

  function caption(img) {
    var fig = img.closest('figure');
    var fc = fig && fig.querySelector('figcaption');
    return fc ? fc.textContent : img.alt;
  }
  function show(n) {
    i = (n + imgs.length) % imgs.length;
    big.src = imgs[i].currentSrc || imgs[i].src;
    big.alt = imgs[i].alt;
    cap.textContent = caption(imgs[i]);
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  imgs.forEach(function (img, n) {
    img.addEventListener('click', function () {
      show(n); lb.classList.add('open'); document.body.style.overflow = 'hidden';
    });
  });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.pv').onclick = function (e) { e.stopPropagation(); show(i - 1); };
  lb.querySelector('.nx').onclick = function (e) { e.stopPropagation(); show(i + 1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
