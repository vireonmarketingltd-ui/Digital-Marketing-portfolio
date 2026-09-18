/* ============================================
   ISAIAH JR. — MAIN.JS
   ============================================ */

// NAV
(function(){
  var ham = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  var path = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a){
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  if(ham && menu){
    ham.addEventListener('click', function(){
      ham.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        ham.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  var navbar = document.querySelector('.navbar');
  if(navbar){
    window.addEventListener('scroll', function(){
      navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,.4)' : 'none';
    });
  }
})();

// SCROLL REVEAL
(function(){
  var els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:.12});
  els.forEach(function(el){ obs.observe(el); });
})();

// COUNTER ANIMATION
function counter(el, target, suffix, dur){
  var start = 0;
  var step = target / (dur / 16);
  var timer = setInterval(function(){
    start += step;
    if(start >= target){ start = target; clearInterval(timer); }
    var disp = target < 10 ? start.toFixed(2) : Math.floor(start).toLocaleString();
    el.innerHTML = disp + '<span class="suf">' + suffix + '</span>';
  }, 16);
}
(function(){
  var els = document.querySelectorAll('[data-count]');
  if(!els.length) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var el = e.target;
        counter(el, parseFloat(el.dataset.count), el.dataset.suffix || '', 2000);
        obs.unobserve(el);
      }
    });
  }, {threshold:.5});
  els.forEach(function(el){ obs.observe(el); });
})();
