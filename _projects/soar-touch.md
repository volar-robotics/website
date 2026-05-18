---
layout: default
title: SOAR-Touch — Volar Robotics
permalink: /projects/soar-touch/
---

<section class="project-hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <p class="eyebrow">Research · Chapter 01</p>
      <h1>SOAR-Touch</h1>
      <p class="lead">Soft Optical Aerial Robot — Touch</p>
      <div class="hero-visual-mobile" aria-hidden="true">
        <img
          src="{{ '/assets/img/platform-minithex@800.png' | relative_url }}"
          width="800" height="435"
          alt=""
          decoding="async">
      </div>
      <p class="intro">
        The perception–control foundations of tactile aerial physical interaction:
        soft optical tactile feedback into an energy-aware contact controller,
        carried from bench characterization through software- and hardware-in-the-loop
        validation to flight on a fully-actuated multirotor.
      </p>
      <div class="pill-row">
        <span class="pill">Field-validated</span>
        <span class="pill">2025–2026</span>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <img
        src="{{ '/assets/img/platform-minithex.png' | relative_url }}"
        srcset="{{ '/assets/img/platform-minithex@800.png' | relative_url }} 800w,
                {{ '/assets/img/platform-minithex.png' | relative_url }} 1600w"
        sizes="(max-width: 980px) 90vw, 560px"
        width="1600" height="869"
        alt=""
        decoding="async">
    </div>
  </div>
</section>

<section class="project-section">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow">Work</p>
      <h2>What was built.</h2>
    </header>

    <article class="work-block reveal">
      <h3>Part I · Soft optical tactile sensing</h3>
      <p>A complete <strong>tactile sensing pipeline</strong> that turns a silicone-membrane camera
      sensor into a quantitative <strong>contact-state observer</strong>. A purpose-built characterization
      rig on a UR10 manipulator at Sapienza DIAG produced the ground-truth dataset for a
      <strong>heteroscedastic deep regressor</strong> — itself trained against a <strong>physics-informed loss</strong>
      that anchors lateral force estimates to torque consistency. An <strong>Extended Kalman
      Filter</strong> fuses the regressor's per-sample uncertainty with the carrier's pose to
      produce stable estimates of <strong>contact patch geometry</strong> and contact force. The full
      pipeline was first validated in <strong>closed-loop force–motion control</strong> on the UR10, then
      deployed in flight on the UTwente <strong>miniThex hexarotor</strong> with both flat and
      tilted sensor-mount configurations.</p>
    </article>

    <article class="work-block reveal">
      <h3>Part II · SOT-aided aerial interaction</h3>
      <p>An <strong>energy-aware aerial interaction stack</strong> built on top of the tactile pipeline.
      A <strong>geometric SE(3) controller</strong> drives the multirotor's pose; a <strong>dual-channel
      admittance layer</strong> (contact-compliant in translation, stiff in rotation) shapes the contact
      wrench; an on-line <strong>manifold-aware reference generator</strong> solves a quadratic program
      on SO(3) at every cycle, exploiting the <strong>friction cone</strong> and surface reaction force
      to minimize rotor power while maintaining the <strong>hybrid force–motion reference</strong>. The
      full stack was validated in Simulink with stochastic wind and contact-model
      uncertainty, then in <strong>hardware-in-the-loop</strong> on a Franka Research
      3 arm, then in <strong>free flight</strong> on the miniThex against both vertical and upward-tilted
      surfaces.</p>
    </article>
  </div>
</section>

<section class="project-section alt">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow">Team</p>
      <h2>The people behind SOAR-Touch.</h2>
    </header>

    <div class="role-grid">
      <div class="role-block reveal">
        <h4>Researchers</h4>
        <ul>
          <li><strong>Simone Orelli</strong> · Volar Robotics — flight control &amp; physical interaction</li>
          <li><strong>Antonio Rapuano</strong> · Volar Robotics — tactile perception &amp; AI</li>
        </ul>
      </div>

      <div class="role-block reveal">
        <h4>Principal Investigator</h4>
        <ul>
          <li><strong>Alessandro De Luca</strong> · Sapienza University of Rome · DIAG</li>
        </ul>
      </div>

      <div class="role-block reveal">
        <h4>Supervisors</h4>
        <ul>
          <li><strong>Antonio Franchi</strong> · University of Twente · RaM</li>
          <li><strong>Barbara Bazzana</strong> · University of Twente · RaM</li>
          <li><strong>Andrea Cristofaro</strong> · Sapienza University of Rome · DIAG</li>
          <li><strong>Marilena Vendittelli</strong> · Sapienza University of Rome · DIAG</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="project-section">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow">Timeline</p>
      <h2>From kick-off to flight.</h2>
    </header>

    <ol class="ifp-list">
      <li class="reveal">
        <p class="when">Aug 2025 · Start</p>
        <h3>Project kick-off</h3>
      </li>
      <li class="reveal">
        <p class="when">Oct 2025 · Simulation</p>
        <h3>Proof of concept in simulated environment</h3>
        <p>The full perception–control architecture first exercised in software,
        under stochastic wind and a virtual contact perception layer affected by uncertainty, establishing the
        energy-aware concept's feasibility before any hardware investment.</p>
      </li>
      <li class="reveal">
        <p class="when">Dec 2025 · Dataset</p>
        <h3>Tactile dataset acquired at Sapienza DIAG</h3>
        <p>A controlled six-phase contact protocol on a UR10 manipulator equipped with a force/torque sensor
        produces the labeled wrench–pose–image dataset that will ground the
        tactile inverse-model regressor.</p>
      </li>
      <li class="reveal">
        <p class="when">Dec 2025 · Perception</p>
        <h3>First iteration of the tactile inverse model</h3>
        <p>The heteroscedastic deep regressor is trained against a
        physics-informed loss, then
        demoed in closed-loop orientation-and-force regulation on the UR10 using the regressed tactile info.</p>
      </li>
      <li class="reveal">
        <p class="when">Mar 2026 · Deployment</p>
        <h3>Full stack on a robot manipulator</h3>
        <p>The first hardware-in-the-loop experience stressing the complete SOAR-Touch stack — tactile perception, admittance,
        and the energy-aware reference generator — exercised end-to-end on a Franka Research 3 manipulator.</p>
      </li>
      <li class="reveal">
        <p class="when">Apr 2026 · Aerial perception</p>
        <h3>Tactile inference in flight</h3>
        <p>The perception–control pipeline deployed onboard the miniThex hexarotor achieves real-time surface-pose estimation during flight, enabling simultaneous perpendicular alignment and contact force regulation with both a flat and a tilted sensor mount.</p>
      </li>
      <li class="reveal">
        <p class="when">Apr 2026 · Aerial deployment</p>
        <h3>Full stack validated in flight</h3>
        <p>The complete interaction control stack is engaged in-flight against vertical and upward-tilted surfaces, leveraging surface friction to enhance closed-loop stability and actively reduce the load borne by the actuators.</p>
      </li>
      <li class="reveal">
        <p class="when">Apr 2026 · End</p>
        <h3>Project close</h3>
      </li>
    </ol>
  </div>
</section>

<section class="project-section alt">
  <div class="container">
    <header class="section-head reveal">
      <p class="eyebrow">Media</p>
      <h2>Experiments on video.</h2>
    </header>

    <div class="video-carousel reveal">
      <div class="carousel-track">
        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_dataset.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p1">Part I</span> Dataset</p>
            <h4>Tactile dataset acquisition with UR10</h4>
            <p>Side-by-side view of the DigiTac sensor and the UR10 manipulator running the
            dataset acquisition protocol. Each sweep produces a labeled wrench–pose–image
            triplet that trains the tactile inverse-model regressor.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_sot.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p1">Part I</span> Perception</p>
            <h4>UR10 tactile-driven alignment</h4>
            <p>An operator induces motion in a plywood board while the DCNN regresses the tactile info that animates a fixed-base manipulator. Proof that perception is stable and real-time expendible under kinematic disturbances.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_align_mt0.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p1">Part I</span> Aerial perception</p>
            <h4>Tactile perception on miniThex</h4>
            <p>The hexarotor engages a vertical wall presenting an arbitrary yaw angle using a 0° sensor mount. The on-board EKF reconstructs the surface pose in flight, allowing the platform to actively align its sensor face to the wall normal.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_align_mt10.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p1">Part I</span> Aerial perception</p>
            <h4>Offset tactile perception on miniThex</h4>
            <p>Same protocol with a 10° tilted sensor mount, requiring a non-trivial
            attitude correction.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_sim.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p2">Part II</span> Simulation</p>
            <h4>Simulated energy-aware contact</h4>
            <p>Validation of the full perception–control stack under stochastic
            wind in a virtual environment. The platform
            exploits the friction cone to save energy and withstand disturbance.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_manip_grav.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p2">Part II</span> Deployment</p>
            <h4>Full stack on a FR3</h4>
            <p>The complete SOAR-Touch stack is executed on a FR3 manipulator acting as a kinematic proxy for the aerial platform, utilizing the SOT sensor to bridge the control loop to a physical surface subject to operator-imposed re-orientation.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_manip_wind.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p2">Part II</span> Deployment</p>
            <h4>Disturbed full stack on a FR3</h4>
            <p>Same protocol with simulated wind injected on the dynamics.
            Stress-tests the perception–control cascade under additional disturbance
            loads.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_optim_upr.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p2">Part II</span> Aerial deployment</p>
            <h4>Energy-aware contact in flight</h4>
            <p>
            The miniThex regulates contact on a vertical surface subject to an arbitrary yaw angle with the full energy-aware optimizer engaged. Surface friction is exploited to reduce thrust and increase stability during sustained contact.</p>
          </div>
        </article>

        <article class="video-tile">
          <video class="thumb" muted preload="metadata" playsinline>
            <source src="https://zenodo.org/records/20271808/files/vid_optim_incl.mp4#t=0.5" type="video/mp4">
          </video>
          <span class="play-overlay" aria-hidden="true">▶</span>
          <div class="cap">
            <p class="phase-label"><span class="phase-badge phase-badge--p2">Part II</span> Aerial deployment</p>
            <h4>Energy-aware flight with wall reaction</h4>
            <p>Same flight protocol against an upward-tilted surface. The wall reaction
            force is leveraged to partially support the platform's weight.</p>
          </div>
        </article>
      </div><!-- /.carousel-track -->

      <div class="carousel-controls">
        <button class="carousel-prev" aria-label="Previous page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="carousel-dots" role="tablist" aria-label="Pages"></div>
        <button class="carousel-next" aria-label="Next page">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div><!-- /.carousel-controls -->
    </div><!-- /.video-carousel -->

    <p class="zenodo-credit reveal">
      Full-resolution recordings on Zenodo:
      <a href="https://doi.org/10.5281/zenodo.20271808" target="_blank" rel="noopener noreferrer">
        <img class="doi-badge" src="https://zenodo.org/badge/DOI/10.5281/zenodo.20271808.svg" alt="DOI 10.5281/zenodo.20271808">
      </a>
    </p>
  </div>
</section>

<section class="project-section">
  <div class="container">
    <header class="section-head funding-head reveal">
      <div>
        <p class="eyebrow">Funding &amp; acknowledgement</p>
        <h2>euROBIN.</h2>
      </div>
      <a href="https://www.eurobin-project.eu/" target="_blank" rel="noopener noreferrer" class="funding-logo-link">
        <img src="{{ '/assets/img/eurobin.png' | relative_url }}" alt="euROBIN — The European Excellence Network on AI-Powered Robotics" class="logo-eurobin">
      </a>
    </header>
    <p class="reveal">SOAR-Touch was carried out within
      <a href="https://www.eurobin-project.eu/" target="_blank" rel="noopener noreferrer">euROBIN</a>,
      the European Network of Excellence in Robotics, co-funded by the European Union.
      The flight campaigns were hosted by the Robotics and Mechatronics group at the
      University of Twente.</p>

    <p style="margin-top: 2rem;">
      <a href="{{ '/#research' | relative_url }}">← Back to Research</a>
    </p>
  </div>
</section>

<!-- ===================== VIDEO MODAL ===================== -->
<div class="video-modal" hidden role="dialog" aria-modal="true" aria-labelledby="video-modal-caption">
  <div class="video-modal-backdrop" aria-hidden="true"></div>
  <div class="video-modal-content">
    <button class="video-modal-close" type="button" aria-label="Close video">×</button>
    <video class="video-modal-player" controls playsinline preload="auto"></video>
    <p class="video-modal-caption" id="video-modal-caption"></p>
  </div>
</div>
