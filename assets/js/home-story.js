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
    this.compactScenes = [
      ...this.curtains.map((element) => ({ element, section: 'technology' })),
      ...this.projects.flatMap((project) => [
        ...(!project.classList.contains('research-project-development')
          ? [{ element: project.querySelector('.research-media'), section: 'research', project }]
          : []),
        { element: project.querySelector('.research-brief'), section: 'research', project },
      ]),
      { element: root.querySelector('.company-people'), section: 'company' },
      { element: root.querySelector('.company-scene-band'), section: 'company' },
    ];
    this.compactScenes.forEach((scene) => {
      scene.element.classList.add('compact-scene');
      scene.element.addEventListener('focusin', (event) => {
        if (this.compact && this.enhanced) this.revealCompactScene(scene, event.target);
      });
    });
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
    this.company.addEventListener('focusin', (event) => {
      if (this.compact && this.enhanced && !event.target.closest('.compact-scene')) {
        const scene = this.compactScenes.find((item) => item.section === 'company');
        if (this.travel < scene.stop) this.revealCompactScene(scene);
      }
      if (this.enhanced && !this.compact && this.travel < this.companyReady) this.revealCompany();
    });
    this.technology.addEventListener('focusin', (event) => {
      if (this.compact && this.enhanced && !event.target.closest('.compact-scene')) {
        const first = this.compactScenes[0];
        const research = this.compactScenes.find((item) => item.section === 'research');
        if (this.travel < first.stop || this.travel >= research.stop - 0.7) this.revealCompactScene(first);
      }
      if (this.enhanced && !this.compact && (this.progress < 1 || this.travel > this.researchStart))
        this.revealTechnology();
    });
    this.projects.forEach((project) =>
      project.addEventListener('focusin', () => {
        if (this.enhanced && !this.compact && (this.travel < this.researchReady || this.travel > this.companyStart))
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
    this.enhanced = !this.motionPaused();
    this.compact = !this.screen.matches;
    this.root.classList.toggle('story-enhanced', this.enhanced);
    this.root.classList.toggle('story-compact', this.compact && this.enhanced);
    this.compactScenes.forEach(({ element }) => {
      element.style.removeProperty('transform');
      element.style.removeProperty('pointer-events');
    });
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
    if (this.compact) this.copy.style.removeProperty('transform');
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
    this.compactScenes.forEach(({ element }) => element.style.removeProperty('transform'));
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
    if (this.compact) {
      const copy = this.copy.getBoundingClientRect();
      this.introOverflow = Math.max(0, copy.bottom - stage.bottom + 28, source.bottom - stage.bottom + 28);
      this.introHold = this.introOverflow / this.height;
      let stop = this.introHold + 1.35;
      this.compactScenes.forEach((scene) => {
        const bounds = relativeBounds(scene.element);
        scene.top = bounds.y;
        scene.overflow = Math.max(0, bounds.y + scene.element.scrollHeight - this.height + 28);
        scene.hold = 0.5 + scene.overflow / this.height;
        scene.stop = stop;
        stop += scene.hold + 0.7;
      });
      this.root.style.setProperty('--home-story-length', `${(stop + 1) * this.height}px`);
    }
    this.schedule();
  }
  schedule() {
    if (!this.enhanced || this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      if (this.compact) this.drawCompact();
      else this.draw();
    });
  }
  revealTechnology() {
    scrollTo({ top: this.start + this.height * (this.compact ? this.compactScenes[0].stop : 1.35), behavior: 'smooth' });
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
      this.revealResearch(location.hash.slice(1));
  }
  revealResearch(id) {
    scrollTo({
      top: this.start + this.height * (this.compact
        ? this.compactScenes.find((scene) => scene.section === 'research' &&
          (!id || id === 'research' || (scene.project.id === id && scene.element.matches('.research-brief')))).stop
        : this.researchReady),
      behavior: 'smooth',
    });
  }
  revealCompany() {
    scrollTo({
      top: this.start + this.height * (this.compact
        ? this.compactScenes.find((scene) => scene.section === 'company').stop
        : this.companyReady),
      behavior: 'smooth',
    });
  }
  revealCompactScene(scene, focused) {
    const reading = this.travel >= scene.stop && this.travel <= scene.stop + scene.hold;
    let destination = scene.stop;
    if (focused && scene.overflow) {
      const bounds = focused.getBoundingClientRect();
      const stage = this.stage.getBoundingClientRect();
      if (reading && bounds.top >= stage.top + scene.top && bounds.bottom <= stage.bottom - 28) return;
      const pan = Math.min(scene.overflow, Math.max(0, bounds.bottom + scene.pan - stage.bottom + 28));
      destination += (pan / scene.overflow) * (scene.hold - 0.15);
    } else if (reading) return;
    scrollTo({ top: this.start + this.height * destination, behavior: 'instant' });
  }
  drawCompact() {
    const clamp = (n) => Math.min(1, Math.max(0, n));
    const ease = (n) => n * n * (3 - 2 * n);
    const interval = (p, from, to) => ease(clamp((p - from) / (to - from)));
    const mix = (a, b, t) => a + (b - a) * t;
    const travel = Math.max(0, (scrollY - this.start) / this.height);
    this.travel = travel;
    const p = clamp((travel - this.introHold) / 1.35);
    const introPan = this.introHold ? this.introOverflow * clamp(travel / this.introHold) : 0;
    this.copy.style.transform = `translate3d(0,${-introPan}px,0)`;
    this.progress = p;
    this.compactScenes.forEach((scene, i) => {
      const next = this.compactScenes[i + 1];
      const enter = interval(travel, i ? scene.stop - 0.7 : this.introHold + 0.95, scene.stop);
      const leave = next ? interval(travel, next.stop - 0.7, next.stop) : 0;
      scene.opacity = enter * (1 - leave);
      scene.x = ((i ? 1 - enter : 0) - leave) * this.width * 1.1;
      scene.pan = scene.overflow * clamp((travel - scene.stop) / (scene.hold - 0.15));
      scene.element.style.setProperty('--scene-opacity', scene.opacity);
      scene.element.style.transform = `translate3d(${scene.x}px,${-scene.pan}px,0)`;
      scene.element.style.pointerEvents = scene.opacity > 0.95 ? 'auto' : 'none';
    });
    this.root.style.setProperty('--compact-platform-motion', this.compactScenes[0].opacity > 0.95 ? 'running' : 'paused');
    const zoom = interval(p, 0.06, 0.56);
    const opening = interval(p, 0.42, 0.88);
    const scale = this.sourceBounds.size / this.data.mark_size;
    const zoomScale = scale * mix(1, 3.4, zoom);
    const originX = mix(this.sourceBounds.x, this.width / 2 - this.focus.x * scale * 3.4, zoom);
    const originY = mix(this.sourceBounds.y - introPan, this.height / 2 - this.focus.y * scale * 3.4, zoom);
    this.bars.forEach((element, i) => {
      const [x, y, width, height] = this.data.carves.rest[i];
      const index = this.selected.indexOf(i);
      const bounds = { x: originX + x * zoomScale, y: originY + y * zoomScale,
        width: width * zoomScale, height: height * zoomScale };
      if (index >= 0) {
        const end = this.destination[index];
        const scene = this.compactScenes[index];
        bounds.x = mix(bounds.x, end.x + scene.x, opening);
        bounds.y = mix(bounds.y, end.y - scene.pan, opening);
        bounds.width = mix(bounds.width, end.width, opening);
        bounds.height = mix(bounds.height, end.height, opening);
      }
      const surface = index > 0
        ? `color-mix(in srgb,var(--deep),var(--sand) ${opening * 100}%)` : 'var(--deep)';
      element.style.cssText = `left:${bounds.x}px;top:${bounds.y}px;width:${bounds.width}px;height:${bounds.height}px;border-radius:${Math.min(bounds.width, bounds.height) / 2}px;opacity:${index < 0 ? 1 - interval(p, 0.38, 0.67) : 1};background:${surface}`;
    });
    const research = this.compactScenes.find((scene) => scene.section === 'research');
    const company = this.compactScenes.find((scene) => scene.section === 'company');
    const development = this.compactScenes.find((scene) => scene.project === this.companySource);
    const lab = interval(travel, research.stop - 0.7, research.stop);
    const people = interval(travel, company.stop - 0.7, company.stop);
    this.compactDark = interval(travel, development.stop - 0.7, development.stop);
    this.root.style.setProperty('--intro-opacity', 1 - interval(p, 0.02, 0.27));
    this.root.style.setProperty('--ground-opacity', interval(p, 0.32, 0.78));
    this.root.style.setProperty('--content-opacity', interval(p, 0.7, 0.96) * (1 - lab));
    this.root.style.setProperty('--heading-opacity', interval(p, 0.4, 0.64) * (1 - lab));
    this.root.style.setProperty('--research-opacity', lab * (1 - people));
    this.root.style.setProperty('--compact-dark', this.compactDark);
    this.root.style.setProperty('--compact-bars-clip', p >= 1 ? 'inset(220px 0 64px)' : 'inset(0)');
    this.root.style.setProperty('--company-opacity', people);
    this.root.style.setProperty('--company-heading-opacity', people);
    this.root.style.setProperty('--company-clip', `inset(0 ${(1 - people) * 100}% 0 0)`);
    this.companyWipe = { left: 0, top: 0, right: this.width * people, bottom: this.height };
    this.root.classList.toggle('story-reading', p > 0.75);
    this.root.classList.toggle('story-research-reading', lab > 0.95);
    this.root.classList.toggle('story-company-reading', people > 0.95);
    this.onSurfaceChange();
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
