import { HomeStory } from './home-story.js';

const base = document.body.dataset.baseurl || '';
const asset = (path) => `${base}${path}`;
const mediaPreference = matchMedia('(prefers-reduced-motion: reduce)');
let paused = mediaPreference.matches || localStorage.getItem('volar-motion') === 'paused';
const marks = new Set();
let homeStory;
const returnBrand = document.querySelector('.home-route .brand, .purpose-route .brand');
const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
const returnProgress = () => {
  const progress = Math.min(Math.max(scrollY / 160, 0), 1);
  return paused ? Number(progress > 0) : progress;
};
function updateReturnBrand() {
  if (!returnBrand) return;
  document.body.style.setProperty('--home-departure', returnProgress());
  if (document.body.classList.contains('purpose-route')) {
    const departed = scrollY > 8;
    returnBrand.setAttribute('href', departed ? '#page-top' : asset('/'));
    returnBrand.setAttribute('aria-label', departed ? 'Volar Robotics, back to top' : 'Volar Robotics, home');
    returnBrand.setAttribute('title', departed ? 'Back to top' : 'Home');
  }
  marks.forEach((mark) => {
    if (mark.canvas.closest('.brand') === returnBrand) mark.updateInteraction();
  });
  const brand = returnBrand.getBoundingClientRect();
  const x = brand.left + brand.width / 2;
  const y = brand.top + brand.height / 2;
  const dark = [
    ...document.querySelectorAll('.story-dark-ground, .story-product-window, .research-project-development, .story-company, .purpose-outlook, .site-footer'),
  ].some((surface) => {
    const bounds = surface.getBoundingClientRect();
    const research = surface.closest('.story-research');
    const company = surface.matches('.story-company, .story-dark-ground');
    const product = surface.matches('.story-product-window');
    const radius = Math.min(bounds.width, bounds.height) / 2;
    const centerY = Math.max(bounds.top + radius, Math.min(y, bounds.bottom - radius));
    const insideCapsule = Math.hypot(x - (bounds.left + bounds.right) / 2, y - centerY) <= radius;
    const wipe = homeStory?.companyWipe;
    return (
      x >= bounds.left &&
      x <= bounds.right &&
      y >= bounds.top &&
      y <= bounds.bottom &&
      Number(getComputedStyle(surface).opacity) > 0.5 &&
      (!product || (insideCapsule && Number(getComputedStyle(surface.closest('.story-windows')).opacity) > 0.5)) &&
      (!research || !homeStory?.enhanced || Number(getComputedStyle(research).opacity) > 0.5) &&
      (!company ||
        !homeStory?.enhanced ||
        (wipe && x >= wipe.left && y >= wipe.top && x <= wipe.right && y <= wipe.bottom))
    );
  });
  if (document.body.classList.contains('home-on-dark') !== dark) {
    document.body.classList.toggle('home-on-dark', dark);
    marks.forEach((mark) => {
      if (mark.canvas.closest('.brand') === returnBrand) mark.draw();
    });
  }
}
const motionButton = document.createElement('button');
motionButton.className = 'motion-toggle';
motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
motionButton.setAttribute('aria-pressed', String(paused));
document.querySelector('.footer-legal')?.prepend(motionButton);
function setPaused(value) {
  paused = value;
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.textContent = paused ? 'Resume motion' : 'Pause motion';
  motionButton.setAttribute('aria-pressed', String(paused));
  homeStory?.refresh();
  marks.forEach((mark) => mark.setPaused(paused));
  updateReturnBrand();
}
motionButton.addEventListener('click', () => {
  setPaused(!paused);
  localStorage.setItem('volar-motion', paused ? 'paused' : 'running');
});
mediaPreference.addEventListener('change', (event) => setPaused(event.matches));
setPaused(paused);

if (returnBrand) {
  addEventListener('scroll', updateReturnBrand, { passive: true });
  updateReturnBrand();
  returnBrand.addEventListener('click', (event) => {
    if (document.body.classList.contains('purpose-route') && scrollY <= 8) return;
    event.preventDefault();
    history.replaceState(null, '', location.pathname + location.search);
    scrollTo({ top: 0, behavior: paused ? 'instant' : 'smooth' });
  });
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('is-open');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
nav?.querySelectorAll('a,button').forEach((link) => link.addEventListener('click', closeMenu));
matchMedia('(min-width:821px)').addEventListener('change', closeMenu);

const carvesReady = fetch(asset('/assets/brand/carves.json'))
  .then((r) => {
    if (!r.ok) throw new Error('Brand geometry unavailable');
    return r.json();
  })
  .catch(() => null);
class CarvedMark {
  constructor(canvas, data) {
    canvas.classList.add('has-geometry');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.data = data;
    this.rest = canvas.dataset.brandMark || 'rest';
    this.current = data.carves[this.rest].map((bar) => [...bar]);
    this.visible = true;
    this.frame = 0;
    this.timer = 0;
    this.cycleIndex = 0;
    this.cycle = canvas.dataset.cycleMarks
      ?.split(',')
      .filter((name) => name !== 'eye' && name !== 'rest' && data.carves[name])
      .flatMap((name) => [name, 'rest']);
    if (paused && this.cycle?.length)
      this.current = data.carves[this.cycle[0]].map((bar) => [...bar]);
    this.resizeObserver = new ResizeObserver(() => this.draw());
    this.resizeObserver.observe(canvas);
    this.observer = new IntersectionObserver(
      (entries) => {
        this.visible = entries[0].isIntersecting;
        this.scheduleCycle();
      },
      { threshold: 0.1 },
    );
    this.observer.observe(canvas);
    const hover = canvas.dataset.hoverCarve;
    if (hover) {
      const parent = canvas.closest('a') || canvas;
      this.interactionParent = parent;
      parent.addEventListener('mouseenter', () => {
        this.hovered = true;
        this.updateInteraction();
      });
      parent.addEventListener('mouseleave', () => {
        this.hovered = false;
        this.updateInteraction();
      });
      parent.addEventListener('focus', () => this.updateInteraction());
      parent.addEventListener('blur', () => this.updateInteraction());
      hoverPointer.addEventListener('change', () => this.updateInteraction());
      this.updateInteraction();
    }
    this.draw();
    this.scheduleCycle();
  }
  draw() {
    const { canvas, ctx } = this;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const width = Math.round(bounds.width * dpr),
      height = Math.round(bounds.height * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.clearRect(0, 0, width, height);
    const size = Math.min(width, height) * 0.94;
    const scale = size / this.data.mark_size;
    ctx.save();
    ctx.translate((width - size) / 2, (height - size) / 2);
    ctx.scale(scale, scale);
    ctx.fillStyle = getComputedStyle(canvas).color;
    this.current.forEach(([x, y, w, h]) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, this.data.bar_radius);
      ctx.fill();
    });
    ctx.restore();
  }
  updateInteraction() {
    if (!this.interactionParent) return;
    const isScrollReturn = this.interactionParent === returnBrand;
    const departed = scrollY > 8;
    const active = isScrollReturn && !hoverPointer.matches
      ? departed
      : this.hovered || document.activeElement === this.interactionParent;
    const carve = active && (!isScrollReturn || departed)
      ? this.canvas.dataset.hoverCarve
      : this.rest;
    if (carve !== this.targetName) this.to(carve);
  }
  to(name) {
    this.targetName = name;
    const target = this.data.carves[name];
    if (!target || name === 'eye') return;
    cancelAnimationFrame(this.frame);
    if (paused || document.hidden) {
      this.current = target.map((b) => [...b]);
      this.draw();
      return;
    }
    const from = this.current.map((b) => [...b]);
    const start = performance.now();
    const duration = this.canvas.dataset.hoverCarve === 'arrow-up' ? 500 : 850;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * t * (3 - 2 * t);
      this.current = from.map((bar, i) => [
        bar[0],
        bar[1] + (target[i][1] - bar[1]) * eased,
        bar[2],
        bar[3] + (target[i][3] - bar[3]) * eased,
      ]);
      this.draw();
      if (t < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }
  scheduleCycle() {
    clearTimeout(this.timer);
    if (!this.cycle || paused || !this.visible || document.hidden) return;
    this.timer = setTimeout(() => {
      this.to(this.cycle[this.cycleIndex++ % this.cycle.length]);
      this.scheduleCycle();
    }, 3300);
  }
  setPaused(value) {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (value) this.to(this.rest);
    this.scheduleCycle();
  }
}
carvesReady.then((data) => {
  if (data) {
    document
      .querySelectorAll('[data-brand-mark]')
      .forEach((canvas) => marks.add(new CarvedMark(canvas, data)));
    const story = document.querySelector('[data-home-story]');
    if (story) homeStory = new HomeStory(story, data, () => paused, updateReturnBrand);
  }
});
document.addEventListener('visibilitychange', () =>
  marks.forEach((mark) => {
    if (document.hidden) mark.to(mark.rest);
    else mark.updateInteraction();
    mark.scheduleCycle();
  }),
);

document
  .querySelectorAll('[data-open]')
  .forEach((button) =>
    button.addEventListener('click', () =>
      document.getElementById(button.dataset.open)?.showModal(),
    ),
  );
document.querySelectorAll('dialog').forEach((element) => {
  element.querySelector('[data-close]')?.addEventListener('click', () => element.close());
  element.addEventListener('click', (event) => {
    if (event.target === element) {
      const r = element.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        element.close();
    }
  });
});
const topic = document.querySelector('#contact-topic');
topic?.addEventListener('change', () => {
  document.querySelector('.contact-email').href =
    `mailto:hello@volar-robotics.com?subject=${encodeURIComponent(topic.value)}`;
});

document.querySelectorAll('[data-product-stage]').forEach((stage) => {
  let frame;
  stage.addEventListener('pointermove', (event) => {
    if (paused || event.pointerType === 'touch') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = stage.getBoundingClientRect();
      stage.style.setProperty('--drift-x', `${((event.clientX - r.left) / r.width - 0.5) * 10}px`);
      stage.style.setProperty('--drift-y', `${((event.clientY - r.top) / r.height - 0.5) * 8}px`);
    });
  });
  stage.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    stage.style.removeProperty('--drift-x');
    stage.style.removeProperty('--drift-y');
  });
});

const dots = document.querySelector('[data-data-dots]');
if (dots)
  for (let i = 0; i < Number(dots.dataset.total); i++) {
    const dot = document.createElement('i');
    if (i < Number(dots.dataset.highlight)) dot.className = 'is-height';
    dots.append(dot);
  }
document.querySelectorAll('a[href^="#source-"]').forEach((link) =>
  link.addEventListener('click', () => {
    document.getElementById(link.hash.slice(1))?.closest('details')?.setAttribute('open', '');
  }),
);
function revealHash() {
  if (!location.hash) return;
  const id = decodeURIComponent(location.hash.slice(1));
  if (id === 'page-top') {
    scrollTo({ top: 0, behavior: paused ? 'instant' : 'smooth' });
    return;
  }
  if (id === 'technology' && document.querySelector('[data-home-story]')) {
    if (homeStory?.enhanced) homeStory.revealTechnology();
    else
      document
        .getElementById(id)
        .scrollIntoView({ behavior: paused ? 'instant' : 'smooth', block: 'start' });
    return;
  }
  if (id === 'company' && document.querySelector('[data-home-story]')) {
    if (homeStory?.enhanced) homeStory.revealCompany();
    else
      document
        .getElementById(id)
        .scrollIntoView({ behavior: paused ? 'instant' : 'smooth', block: 'start' });
    return;
  }
  if (id.startsWith('project-') && !document.getElementById(id)) return;
  if (
    (id === 'research' || id.startsWith('project-')) &&
    document.querySelector('[data-home-story]')
  ) {
    if (homeStory?.enhanced) homeStory.revealResearch(id);
    else
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: paused ? 'instant' : 'smooth', block: 'start' });
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  target.closest('details')?.setAttribute('open', '');
  requestAnimationFrame(() =>
    target.scrollIntoView({
      behavior: paused ? 'instant' : 'smooth',
      block: 'center',
    }),
  );
}
window.addEventListener('hashchange', revealHash);
revealHash();
