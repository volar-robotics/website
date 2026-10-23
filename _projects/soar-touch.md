---
layout: default
title: SOAR-Touch — Tactile contact in laboratory flight
permalink: /soar-touch/
nav: work
---
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{{ '/work/' | relative_url }}">Research</a><span aria-hidden="true">/</span
  ><span aria-current="page">SOAR-Touch</span>
</nav>
<header class="project-header">
  <div>
    <p class="eyebrow">euROBIN · Sapienza &amp; University of Twente</p>
    <h1>SOAR-Touch</h1>
    <p>
      Friction-anchor interaction and soft-optical tactile sensing, combined in laboratory
      contact-flight experiments.
    </p>
    <div class="project-meta">
      <span><span class="status-dot"></span>Laboratory experiments</span>
    </div>
  </div>
  <img
    src="{{ '/assets/img/research/contact-flight.webp' | relative_url }}"
    width="1200"
    height="900"
    alt="The miniThex research robot making tactile contact with a laboratory wall"
  />
</header>
<div class="project-resources">
  <a class="text-link" href="https://sites.google.com/diag.uniroma1.it/soar-touch-website"
    >Project website at Sapienza ↗</a
  >
</div>
<section class="timeline-explorer" data-timeline>
  <p class="eyebrow">Explore the experiments</p>
  <div class="timeline-steps" role="group" aria-label="Experiment stages">
    <button data-timeline-step="0" aria-pressed="true">Sense<small>Sensor bench</small></button
    ><button data-timeline-step="1" aria-pressed="false">
      Control<small>Manipulator trials</small></button
    ><button data-timeline-step="2" aria-pressed="false">Fly<small>Tactile feedback</small></button
    ><button data-timeline-step="3" aria-pressed="false">
      Interact<small>Combined system</small>
    </button>
  </div>
  <div class="timeline-body">
    <img
      data-timeline-image
      src="{{ '/assets/img/research/tactile-input.webp' | relative_url }}"
      alt="The camera image inside the tactile sensor"
    />
    <div aria-live="polite">
      <h2 data-timeline-title>Read the contact.</h2>
      <p data-timeline-text>
        Compare tactile estimates with reference force measurements on the sensor bench.
      </p>
    </div>
  </div>
</section>
<section class="project-content">
  <h2>What the<br /><em>trials show.</em></h2>
  <div>
    <p class="project-summary">
      Tactile estimates of contact force and surface orientation were used as feedback for contact
      control on the miniThex research platform.
    </p>
    <details class="disclosure">
      <summary>Scope of the result</summary>
      <div class="disclosure-body">
        <p>
          These were controlled laboratory trials using external motion capture for platform
          localization. They do not establish reliable operation on untested surfaces or in field
          conditions.
        </p>
      </div>
    </details>
    <details class="disclosure">
      <summary>Research archive &amp; acknowledgments</summary>
      <div class="disclosure-body">
        <p>
          The work was carried out within euROBIN, with research at Sapienza DIAG and contact-flight
          experiments hosted by the University of Twente.
        </p>
        <a class="text-link" href="https://doi.org/10.5281/zenodo.20271808"
          >SOAR-Touch research recordings ↗</a
        >
      </div>
    </details>
  </div>
</section>
<section class="publications" aria-labelledby="publications-title">
  <div class="section-label">
    <h2 id="publications-title">Publications</h2>
    <span>SOAR-Touch</span>
  </div>
  <div class="publication-list">
    <a class="publication" href="https://arxiv.org/abs/2610.10020"
      ><p class="eyebrow">arXiv preprint · 7 October 2026</p>
      <h3>
        Tactile Reconstruction of Contact Task Frames and Forces for Hybrid Force/Motion Control
      </h3>
      <p>Tactile sensing and manipulator experiments.</p>
      <span class="text-link">Read the preprint <span aria-hidden="true">↗</span></span></a
    >
    <article class="publication publication-pending">
      <p class="eyebrow">Forthcoming</p>
      <h3>Second SOAR-Touch preprint</h3>
      <p>Link will be added when available.</p>
    </article>
  </div>
</section>
<nav class="route-path" aria-label="Return to research">
  <a href="{{ '/work/' | relative_url }}">← Research</a><span class="path-end">SOAR-Touch</span>
</nav>
