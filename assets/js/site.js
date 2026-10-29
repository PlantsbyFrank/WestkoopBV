/* Westkoop — site.js
   Woord-voor-woord onthullen, de route van kweker naar klant en de loader.
   Alles staat stil bij prefers-reduced-motion. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Splits koppen in woorden; een losse | wordt een regelbreuk. */
  function split(el) {
    var words = el.textContent.trim().split(/\s+/);
    var step = el.classList.contains('ink-rv') ? 45 : 70;
    el.textContent = '';
    words.forEach(function (w, i) {
      if (w === '|') { el.appendChild(document.createElement('br')); return; }
      var outer = document.createElement('span'); outer.className = 'w';
      var inner = document.createElement('span'); inner.textContent = w;
      inner.style.setProperty('--d', (i * step) + 'ms');
      outer.appendChild(inner); el.appendChild(outer); el.appendChild(document.createTextNode(' '));
    });
  }
  document.querySelectorAll('.rv, .ink-rv').forEach(split);

  /* Onthullen zodra een element in beeld komt. */
  function watch() {
    var els = document.querySelectorAll('.rv, .ink-rv, .fade, .route-band, .bigword-wrap');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* De route: lengte voor het tekenen, daarna een stip die over de lijn loopt. */
  var rp = document.getElementById('rp'), runner = document.getElementById('runner');
  if (rp) {
    var L = rp.getTotalLength();
    rp.style.setProperty('--len', L);
    if (!reduce && runner) {
      var band = document.querySelector('.route-band'), t0 = null, seen = null;
      (function loop(ts) {
        if (!t0) t0 = ts;
        if (band.classList.contains('in')) {
          if (seen === null) seen = ts;
          if (ts - seen > 2200) {
            var p = ((ts - seen - 2200) % 4200) / 4200;
            var e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
            var pt = rp.getPointAtLength(e * L);
            runner.setAttribute('cx', pt.x); runner.setAttribute('cy', pt.y);
            runner.style.opacity = (p < .06 || p > .94) ? 0 : 1;
          }
        }
        requestAnimationFrame(loop);
      })(performance.now());
    }
  }

  /* Loader: de stip loopt de boog af terwijl de teller naar 100% gaat.
     Eén keer per bezoek; daarna start de pagina direct. */
  function runLoader(done) {
    var ld = document.querySelector('.loader');
    var seenBefore = false;
    try { seenBefore = sessionStorage.getItem('wk-loader') === '1'; sessionStorage.setItem('wk-loader', '1'); } catch (e) {}
    if (!ld || reduce || seenBefore) { if (ld) ld.remove(); done(); return; }
    var path = document.getElementById('lp'), dot = document.getElementById('ld'), cnt = ld.querySelector('.count');
    var len = path.getTotalLength(), dur = 1500, s = null;
    function step(ts) {
      if (!s) s = ts;
      var p = Math.min(1, (ts - s) / dur), e = 1 - Math.pow(1 - p, 3);
      path.setAttribute('stroke-dashoffset', len * (1 - e));
      var pt = path.getPointAtLength(e * len); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
      cnt.textContent = Math.round(e * 100) + '%';
      if (p < 1) requestAnimationFrame(step);
      else {
        ld.classList.add('show-word');
        setTimeout(function () { ld.classList.add('done'); done(); setTimeout(function () { ld.remove(); }, 1100); }, 650);
      }
    }
    requestAnimationFrame(step);
  }

  runLoader(watch);
})();
