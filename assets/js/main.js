(function () {
  'use strict';

  // Smooth scroll handled by CSS; close mobile nav on anchor click
  var toggle = document.getElementById('nav-toggle');
  if (toggle) {
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { toggle.checked = false; });
    });
  }

  // Email obfuscation — reconstruct mailto: only on user interaction, never in static HTML
  document.querySelectorAll('.js-email').forEach(function (a) {
    function build() { a.href = 'mailto:' + a.dataset.u + '@' + a.dataset.d; }
    a.addEventListener('mouseenter', build);
    a.addEventListener('focus', build);
    a.addEventListener('touchstart', build, { passive: true });
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ── Generic discrete carousel ────────────────────────────────────────────
  // desktopPerPage: number of items visible at once on desktop (≥820 px).
  // Mobile always shows 1 item.  Slides by 1 item per page step.
  // Page count: desktop → N-(desktopPerPage-1),  mobile → N.
  function initCarousel(carousel, desktopPerPage) {
    if (!carousel) return;
    var track     = carousel.querySelector('.carousel-track');
    var cards     = track.querySelectorAll('.carousel-track > *');
    var controls  = carousel.querySelector('.carousel-controls');
    var prevBtn   = controls.querySelector('.carousel-prev');
    var nextBtn   = controls.querySelector('.carousel-next');
    var dotsWrap  = controls.querySelector('.carousel-dots');
    var n         = cards.length;
    var page      = 0;
    var MOBILE_BP = 820;
    function isMobile() { return window.innerWidth <= MOBILE_BP; }

    function pageCount() {
      if (n <= 1) return 1;
      return isMobile() ? n : Math.max(1, n - (desktopPerPage - 1));
    }

    function offsetForPage(p) {
      if (n <= 0) return 0;
      var gap   = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      var cardW = cards[0].offsetWidth;
      return p * (cardW + gap);
    }

    function applyPage(p) {
      page = Math.max(0, Math.min(p, pageCount() - 1));
      track.style.transform = 'translateX(-' + offsetForPage(page) + 'px)';
      prevBtn.disabled = (page === 0);
      nextBtn.disabled = (page === pageCount() - 1);
      var dots = dotsWrap.querySelectorAll('.carousel-dot');
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-active', i === page);
        dots[i].setAttribute('aria-pressed', i === page ? 'true' : 'false');
      }
    }

    function buildDots() {
      dotsWrap.innerHTML = '';
      var total = pageCount();
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Page ' + (i + 1) + ' of ' + total);
        dot.setAttribute('aria-pressed', 'false');
        (function (idx) {
          dot.addEventListener('click', function () { applyPage(idx); });
        }(i));
        dotsWrap.appendChild(dot);
      }
    }

    prevBtn.addEventListener('click', function () { applyPage(page - 1); });
    nextBtn.addEventListener('click', function () { applyPage(page + 1); });

    buildDots();
    applyPage(0);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        measure();
        buildDots();
        applyPage(Math.min(page, pageCount() - 1));
      }, 120);
    });
  }

  initCarousel(document.querySelector('.chapter-carousel'), 2);
  initCarousel(document.querySelector('.video-carousel'),   3);

  // ── Video modal ──────────────────────────────────────────────────────────
  // Clicking a .video-tile opens a centered modal that streams the source URL
  // from the tile's inline <video class="thumb"> element. The inline element
  // itself is just a static first-frame preview (controls removed).
  (function () {
    var modal = document.querySelector('.video-modal');
    if (!modal) return;
    var player   = modal.querySelector('.video-modal-player');
    var caption  = modal.querySelector('.video-modal-caption');
    var closeBtn = modal.querySelector('.video-modal-close');
    var backdrop = modal.querySelector('.video-modal-backdrop');

    function openModal(srcUrl, captionText) {
      player.src = srcUrl;
      caption.textContent = captionText || '';
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(function () {
        player.play().catch(function () { /* gesture policy, user can click play */ });
      });
    }
    function closeModal() {
      player.pause();
      player.removeAttribute('src');
      player.load();
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.video-tile').forEach(function (tile) {
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('role', 'button');
      var v = tile.querySelector('video.thumb source');
      var rawSrc = v ? v.getAttribute('src') : '';
      var src    = rawSrc.split('#')[0];
      var h4     = tile.querySelector('h4');
      var label  = h4 ? h4.textContent : '';
      tile.setAttribute('aria-label', 'Play video: ' + label);

      tile.addEventListener('click', function () {
        if (src) openModal(src, label);
      });
      tile.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && src) {
          e.preventDefault();
          openModal(src, label);
        }
      });
    });

    closeBtn && closeBtn.addEventListener('click', closeModal);
    backdrop && backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  })();
})();
