/* Eén bewegingsprincipe: fade-up op sectieniveau, één duur.
   Respecteert prefers-reduced-motion, en zonder JS is alles gewoon zichtbaar
   omdat base.css de zichtbare eindstaat als .in toepast zodra dit script draait. */

(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  var stil = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (stil || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { io.observe(el); });
})();
