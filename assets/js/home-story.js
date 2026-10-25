// Scroll-driven handovers connect the identity, technology, research and company scenes.
export class HomeStory {
  constructor(root, data, motionPaused, onSurfaceChange) {
    this.root = root;
    this.stage = root.querySelector('.home-story-stage');
    this.copy = root.querySelector('.story-intro-copy');
    this.source = root.querySelector('.story-mark-source');
    this.technology = root.querySelector('.story-technology');
    this.targets = [...root.querySelectorAll('[data-story-window]')];
    this.curtains = [...root.querySelectorAll('.story-windows > *')];
    this.projects = [...root.querySelectorAll('[data-project-panel]')];
    this.company = root.querySelector('.story-company');
    this.companySource = root.querySelector('.research-project-development');
    this.researchStart = 1.85;
    this.researchReady = 2.6;
    this.companyStart = 3.25;
    this.companyReady = 4.35;
    this.onSurfaceChange = onSurfaceChange;
    this.data = data;
    this.motionPaused = motionPaused;
    this.selected = [6, 10, 14];
    this.focus = this.selected.reduce(
      (point, i) => {
        const [x, y, w, h] = data.carves.rest[i];
        return {
          x: point.x + (x + w / 2) / this.selected.length,
          y: point.y + (y + h / 2) / this.selected.length,
        };
      },
      { x: 0, y: 0 },
    );
    this.bars = data.carves.rest.map(() => {
      const bar = document.createElement('span');
      root.querySelector('.story-bars').append(bar);
      return bar;
    });
    this.screen = matchMedia('(min-width: 1000px) and (min-height: 700px)');
    this.screen.addEventListener('change', () => this.refresh());
    this.frame = 0;
    addEventListener('scroll', () => this.schedule(), { passive: true });
    addEventListener('resize', () => this.measure());
    document.querySelectorAll('a[href="#technology"]').forEach((link) =>
      link.addEventListener('click', (event) => {
        if (!this.enhanced) return;
        event.preventDefault();
        history.replaceState(null, '', '#technology');
        this.revealTechnology();
      }),
    );
    document.querySelectorAll('a[href="#research"]').forEach((link) =>
      link.addEventListener('click', (event) => {
        if (!this.enhanced) return;
        event.preventDefault();
        history.replaceState(null, '', link.hash);
        this.revealResearch();
      }),
    );
    document.querySelectorAll('a[href="#company"]').forEach((link) =>
      link.addEventListener('click', (event) => {
        if (!this.enhanced) return;
        event.preventDefault();
        history.replaceState(null, '', '#company');
        this.revealCompany();
      }),
    );
    this.company.addEventListener('focusin', () => {
      if (this.enhanced && this.travel < this.companyReady) this.revealCompany();
    });
    this.technology.addEventListener('focusin', () => {
      if (this.enhanced && (this.progress < 1 || this.travel > this.researchStart))
        this.revealTechnology();
    });
    this.projects.forEach((project) =>
      project.addEventListener('focusin', () => {
        if (this.enhanced && (this.travel < this.researchReady || this.travel > this.companyStart))
          this.revealResearch();
      }),
    );
    this.copy.addEventListener('focusin', () => {
      if (this.enhanced && this.progress > 0.1) scrollTo({ top: this.start, behavior: 'smooth' });
    });
    document.fonts.ready.then(() => {
      this.measure();
      this.followHash();
    });
    this.refresh();
    this.followHash();
    addEventListener('pageshow', (event) => {
      if (!event.persisted) requestAnimationFrame(() => this.followHash());
    });
  }
  refresh() {
    this.enhanced = this.screen.matches && !this.motionPaused();
    this.root.classList.toggle('story-enhanced', this.enhanced);
    this.root.style.setProperty(
      '--home-story-length',
      `${Math.round((this.companyReady + 1.5) * 100)}svh`,
    );
    if (!this.enhanced) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      this.root.style.removeProperty('--intro-opacity');
      this.root.style.removeProperty('--content-opacity');
      this.root.style.removeProperty('--ground-opacity');
      this.copy.style.removeProperty('transform');
      this.curtains.forEach((card) => card.style.removeProperty('transform'));
      return;
    }
    this.measure();
  }
  measure() {
    if (!this.enhanced) return;
    const stage = this.stage.getBoundingClientRect();
    const source = this.source.getBoundingClientRect();
    this.height = stage.height;
    this.width = stage.width;
    this.start = this.root.getBoundingClientRect().top + scrollY;
    this.sourceBounds = {
      x: source.left - stage.left,
      y: source.top - stage.top,
      size: source.width,
    };
    this.curtains.forEach((card) => card.style.removeProperty('transform'));
    this.destination = this.targets.map((target) => {
      const rect = target.getBoundingClientRect();
      return {
        x: rect.left - stage.left,
        y: rect.top - stage.top,
        width: rect.width,
        height: rect.height,
      };
    });
    const relativeBounds = (element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left - stage.left,
        y: rect.top - stage.top,
        width: rect.width,
        height: rect.height,
      };
    };
    this.companySourceBounds = relativeBounds(this.companySource);
    this.schedule();
  }
  schedule() {
    if (!this.enhanced || this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.draw();
    });
  }
  revealTechnology() {
    scrollTo({ top: this.start + this.height * 1.35, behavior: 'smooth' });
  }
  followHash() {
    if (!this.enhanced) {
      const target = document.getElementById(location.hash.slice(1));
      if (target && this.root.contains(target))
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
      return;
    }
    if (location.hash === '#technology') this.revealTechnology();
    else if (location.hash === '#company') this.revealCompany();
    else if (
      location.hash === '#research' ||
      this.projects.some((project) => `#${project.id}` === location.hash)
    )
      this.revealResearch();
  }
  revealResearch() {
    scrollTo({
      top: this.start + this.height * this.researchReady,
      behavior: 'smooth',
    });
  }
  revealCompany() {
    scrollTo({
      top: this.start + this.height * this.companyReady,
      behavior: 'smooth',
    });
  }
  draw() {
    const clamp = (n) => Math.min(1, Math.max(0, n));
    const ease = (n) => n * n * (3 - 2 * n);
    const interval = (p, from, to) => ease(clamp((p - from) / (to - from)));
    const mix = (a, b, t) => a + (b - a) * t;
    const travel = Math.max(0, (scrollY - this.start) / this.height);
    this.travel = travel;
    const p = clamp(travel / 1.35);
    const labOpening = interval(travel, this.researchStart, this.researchReady);
    const companyOpening = interval(travel, this.companyStart, this.companyReady);
    const researchLeaving = interval(companyOpening, 0.55, 0.7);
    const technologyOpacity = 1 - interval(labOpening, 0, 0.4);
    this.progress = p;
    const zoom = interval(p, 0.06, 0.56);
    const opening = interval(p, 0.42, 0.88);
    const scale = this.sourceBounds.size / this.data.mark_size;
    const zoomScale = scale * mix(1, 3.4, zoom);
    const originX = mix(this.sourceBounds.x, this.width * 0.5 - this.focus.x * scale * 3.4, zoom);
    const originY = mix(this.sourceBounds.y, this.height * 0.5 - this.focus.y * scale * 3.4, zoom);
    this.bars.forEach((element, i) => {
      const [x, y, w, h] = this.data.carves.rest[i];
      let bounds = {
        x: originX + x * zoomScale,
        y: originY + y * zoomScale,
        width: w * zoomScale,
        height: h * zoomScale,
      };
      const index = this.selected.indexOf(i);
      if (index !== -1) {
        const end = this.destination[index];
        bounds = Object.fromEntries(
          Object.keys(bounds).map((key) => [key, mix(bounds[key], end[key], opening)]),
        );
        const shiftX = index === 1 ? 0 : (index === 0 ? -1 : 1) * this.width * 0.85 * labOpening;
        const shiftY = index === 1 ? this.height * 1.1 * labOpening : 0;
        bounds.x += shiftX;
        bounds.y += shiftY;
        this.curtains[index].style.transform = `translate3d(${shiftX}px,${shiftY}px,0)`;
      }
      const surface =
        index > 0 ? `color-mix(in srgb,var(--deep),var(--sand) ${opening * 100}%)` : 'var(--deep)';
      element.style.cssText = `left:${bounds.x}px;top:${bounds.y}px;width:${bounds.width}px;height:${bounds.height}px;border-radius:${Math.min(bounds.width, bounds.height) / 2}px;opacity:${index === -1 ? 1 - interval(p, 0.38, 0.67) : 1};background:${surface}`;
    });
    this.root.style.setProperty('--intro-opacity', 1 - interval(p, 0.02, 0.27));
    this.root.style.setProperty('--content-opacity', interval(p, 0.7, 0.96) * technologyOpacity);
    this.root.style.setProperty('--heading-opacity', interval(p, 0.4, 0.64) * technologyOpacity);
    this.root.style.setProperty(
      '--ground-opacity',
      interval(p, 0.32, 0.78) * (1 - interval(labOpening, 0, 0.5)),
    );
    this.root.style.setProperty(
      '--research-opacity',
      interval(labOpening, 0, 0.5) * (1 - researchLeaving),
    );
    this.root.style.setProperty('--research-first-opacity', interval(labOpening, 0.1, 0.6));
    this.root.style.setProperty('--research-next-opacity', interval(labOpening, 0.55, 1));
    this.root.style.setProperty('--research-copy-opacity', interval(labOpening, 0.1, 0.5));
    const spread = interval(companyOpening, 0, 0.55);
    const source = this.companySourceBounds;
    const left = mix(source.x, 0, spread);
    const top = mix(source.y, 0, spread);
    const right = mix(this.width - source.x - source.width, 0, spread);
    const bottom = mix(this.height - source.y - source.height, 0, spread);
    this.companyWipe = { left, top, right: this.width - right, bottom: this.height - bottom };
    this.root.style.setProperty(
      '--company-clip',
      `inset(${top}px ${right}px ${bottom}px ${left}px)`,
    );
    this.root.style.setProperty('--company-opacity', interval(companyOpening, 0, 0.08));
    this.root.style.setProperty('--company-heading-opacity', interval(companyOpening, 0.3, 0.6));
    this.root.style.setProperty(
      '--company-band-reveal',
      `${(1 - interval(companyOpening, 0.45, 0.95)) * 100}%`,
    );
    this.root.classList.toggle('story-company-opening', companyOpening > 0.01);
    this.root.classList.toggle('story-company-heading-reading', companyOpening > 0.6);
    this.root.classList.toggle('story-company-reading', companyOpening > 0.98);
    this.copy.style.transform = `translate3d(${-zoom * 100}px,0,0)`;
    this.root.classList.toggle('story-reading', p > 0.75);
    this.root.classList.toggle('story-research-reading', labOpening > 0.85);
    this.onSurfaceChange();
  }
}
