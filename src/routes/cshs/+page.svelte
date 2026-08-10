<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
</script>

<svelte:head>
  <title>CS Honor Society | SLHS CS Club</title>
  <meta name="description" content="Computer Science Honor Society &mdash; requirements, induction, and point-based volunteering." />
</svelte:head>

<Shell activePage="">
  <div class="fresco-root">
    <!-- Decorative column silhouettes -->
    <div class="fresco-col fresco-col-left"></div>
    <div class="fresco-col fresco-col-right"></div>

    <div class="fresco-banner">
      <div class="fresco-meander"></div>
      <div class="fresco-crest">
        <div class="fresco-crest-outer">
          <div class="fresco-crest-inner">
            <i class="fa-solid fa-award"></i>
          </div>
        </div>
      </div>
      <span class="fresco-tag">&#9813; CSHS</span>
      <h1>Computer Science<br />Honor Society</h1>
      <div class="fresco-subtitle">
        <span class="fresco-rule"></span>
        <p>Distinguish yourself. Lead. Serve.</p>
        <span class="fresco-rule"></span>
      </div>
      <div class="fresco-meander"></div>
    </div>

    <div class="fresco-requirements">
      <div class="fresco-req">
        <div class="fresco-req-num">I</div>
        <h3>Academic Standing</h3>
        <p>Be enrolled in a computer science course each semester and maintain a grade of <em>B or higher</em>.</p>
      </div>
      <div class="fresco-req">
        <div class="fresco-req-num">II</div>
        <h3>Membership Fee</h3>
        <p>Pay the annual dues through <em>Pay n Go</em> under Computer Science Club.</p>
      </div>
      <div class="fresco-req">
        <div class="fresco-req-num">III</div>
        <h3>Registration</h3>
        <p>Complete the official Google Form with accurate information.</p>
      </div>
      <div class="fresco-req">
        <div class="fresco-req-num">IV</div>
        <h3>Volunteering Points</h3>
        <p>Earn points across <em>service</em>, <em>leadership</em>, and <em>participation</em> categories.</p>
        <div class="fresco-req-note">Point breakdown and tracking coming soon. Ask an officer.</div>
      </div>
    </div>

    <div class="fresco-motto">
      <span class="fresco-motto-prefix">&#9733;</span>
      <p>Induction is a mark of dedication recognized by colleges and scholarship committees nationwide.</p>
      <span class="fresco-motto-prefix">&#9733;</span>
    </div>

    <div class="fresco-cta">
      <h2>Apply for Induction</h2>
      <p>Ready to join the Honor Society? Fill out the form and get started.</p>
      <div class="fresco-actions">
        <a class="btn btn-primary" href="/join"><i class="fa-solid fa-file-lines"></i> Register for CSHS</a>
        <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Discord</a>
      </div>
    </div>
  </div>
</Shell>

<style>
  /* ===== FULL-PAGE OVERRIDES ===== */

  /* Greek fresco background — mosaic grid, vignette, gold dust, columns */
  :global(html), :global(body) {
    background: #120e0a;
  }
  :global(body) {
    background-image:
      /* fine mosaic grid */
      linear-gradient(rgba(184,148,58,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184,148,58,0.025) 1px, transparent 1px),
      /* radial vignette */
      radial-gradient(ellipse at 50% 10%, rgba(196,162,72,0.06) 0%, transparent 65%),
      radial-gradient(ellipse at 30% 85%, rgba(255,107,44,0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(38,54,80,0.06) 0%, transparent 50%);
    background-size: 48px 48px, 48px 48px, 100% 100%, 100% 100%, 100% 100%;
    background-position: center;
    background-attachment: fixed;
  }

  /* Header and footer adopt the warm stone palette */
  :global(.sticky-top) {
    backdrop-filter: none;
    background: rgba(18,14,10,0.94);
    border-bottom-color: rgba(184,148,58,0.3);
  }
  :global(header) {
    background: rgba(18,14,10,0.94);
    border-bottom: 2px solid rgba(184,148,58,0.25);
  }
  :global(header a), :global(header i), :global(header button),
  :global(header .logo) {
    color: #c9b87a !important;
  }
  :global(header .join-btn) {
    background: #b8943a;
    border-color: #b8943a;
    color: #120e0a !important;
  }
  :global(header .icon-btn) {
    border-color: rgba(184,148,58,0.35);
    background: rgba(18,14,10,0.8);
  }
  :global(.nav-indicator) { background: #d4af37; }
  :global(.footer-wrap) {
    background: rgba(14,11,7,0.95);
    border-top: 2px solid rgba(184,148,58,0.25);
  }
  :global(.footer-wrap::before) { display: none; }
  :global(footer .footer-brand) { color: #c9b87a; }
  :global(footer .footer-links a) { color: #8b7a56; }
  :global(footer .footer-links a:hover) { color: #d4af37; }
  :global(.btn-primary) {
    background: #b8943a;
    border-color: #b8943a;
    color: #120e0a !important;
    box-shadow: 4px 4px 0 rgba(184,148,58,0.4);
  }
  :global(.btn-primary:hover) {
    transform: translate(-3px,-3px);
    box-shadow: 6px 6px 0 rgba(184,148,58,0.5);
  }
  :global(.btn-secondary) {
    border-color: #6b5f47;
    color: #c9b87a;
    box-shadow: 4px 4px 0 rgba(107,95,71,0.4);
  }
  :global(.btn-secondary:hover) {
    background: #2a2318;
    color: #d4af37;
    border-color: #b8943a;
    box-shadow: 6px 6px 0 rgba(184,148,58,0.4);
  }
  :global(.cta-card) {
    background: rgba(20,15,9,0.9);
    border: 2px solid rgba(184,148,58,0.2);
    margin: 2rem 1rem;
  }
  :global(.cta-card .section-title) { color: #d4af37; font-family: 'IBM Plex Mono', monospace; }
  :global(.cta-card .section-lead) { color: #8b7a56; }

  /* ===== FRESCO PAGE ELEMENTS ===== */
  .fresco-root {
    max-width: 840px;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
    position: relative;
    overflow: hidden;
  }

  /* Side column silhouettes */
  .fresco-col {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
    pointer-events: none;
    opacity: 0.06;
  }
  .fresco-col-left {
    left: 8px;
    background:
      repeating-linear-gradient(0deg,
        transparent, transparent 18px,
        rgba(196,162,72,0.6) 18px, rgba(196,162,72,0.6) 20px,
        transparent 20px);
  }
  .fresco-col-right {
    right: 8px;
    background:
      repeating-linear-gradient(0deg,
        transparent, transparent 18px,
        rgba(196,162,72,0.6) 18px, rgba(196,162,72,0.6) 20px,
        transparent 20px);
  }

  /* Meander (Greek key) border */
  .fresco-meander {
    height: 18px;
    background:
      repeating-linear-gradient(90deg,
        #b8943a 0px, #b8943a 6px,
        transparent 6px, transparent 12px,
        #b8943a 12px, #b8943a 14px,
        transparent 14px, transparent 20px,
        rgba(184,148,58,0.2) 0px);
    background-size: 80px 100%;
    opacity: 0.35;
    margin: 0.4rem 0;
  }

  .fresco-banner {
    text-align: center;
    padding: 2rem 0 1.5rem;
  }

  .fresco-crest {
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
  }
  .fresco-crest-outer {
    width: 100px;
    height: 100px;
    border: 3px solid #b8943a;
    display: grid;
    place-items: center;
    box-shadow: 0 0 40px rgba(184,148,58,0.1), inset 0 0 20px rgba(184,148,58,0.05);
  }
  .fresco-crest-inner {
    width: 62px;
    height: 62px;
    border: 2px solid rgba(196,162,72,0.5);
    display: grid;
    place-items: center;
    background: rgba(184,148,58,0.06);
  }
  .fresco-crest-inner i {
    font-size: 1.8rem;
    color: #d4af37;
  }

  .fresco-tag {
    display: inline-block;
    padding: 0.2rem 0.8rem;
    border: 1px solid rgba(196,162,72,0.35);
    color: #c4a248;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
  }

  .fresco-banner h1 {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: clamp(2.2rem, 4.5vw, 3.6rem);
    line-height: 1.1;
    color: #e8d8b0;
    letter-spacing: 0.01em;
  }

  .fresco-subtitle {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-top: 0.6rem;
  }
  .fresco-subtitle p {
    margin: 0;
    color: #b8943a;
    font-size: 0.82rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .fresco-rule {
    flex: 1;
    max-width: 60px;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(184,148,58,0.4), transparent);
  }

  .fresco-requirements {
    display: grid;
    gap: 0.8rem;
    margin-top: 0.5rem;
  }

  .fresco-req {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 1.2rem;
    padding: 1.4rem 1.5rem;
    background: rgba(20,15,9,0.7);
    border: 1px solid rgba(184,148,58,0.12);
    border-left: 4px solid #b8943a;
    align-items: start;
    position: relative;
    overflow: hidden;
  }
  .fresco-req::after {
    content: '';
    position: absolute;
    right: 0; top: 0; bottom: 0; width: 40px;
    background: linear-gradient(to right, transparent, rgba(184,148,58,0.03));
    pointer-events: none;
  }
  .fresco-req-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.6rem;
    color: #b8943a;
    font-weight: 700;
    line-height: 1;
    padding-top: 0.05rem;
  }
  .fresco-req h3 {
    margin: 0 0 0.3rem;
    font-size: 1.05rem;
    color: #d9cfa6;
    font-family: 'IBM Plex Mono', monospace;
  }
  .fresco-req p {
    margin: 0;
    color: #948f7a;
    line-height: 1.5;
    font-size: 0.86rem;
  }
  .fresco-req em {
    color: #d4af37;
    font-style: normal;
    font-weight: 600;
  }
  .fresco-req-note {
    margin-top: 0.8rem;
    padding: 0.5rem 0.8rem;
    background: rgba(184,148,58,0.06);
    border-left: 2px solid #b8943a;
    color: #b8943a;
    font-size: 0.75rem;
  }

  .fresco-motto {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    justify-content: center;
    padding: 2.5rem 0;
    color: #6b5f47;
    font-style: italic;
    font-size: 0.88rem;
    text-align: center;
  }
  .fresco-motto p { margin: 0; max-width: 500px; }
  .fresco-motto-prefix { color: #b8943a; font-style: normal; font-size: 1rem; }

  .fresco-cta {
    text-align: center;
    padding: 2rem;
    background: rgba(20,15,9,0.7);
    border: 2px solid rgba(184,148,58,0.15);
  }
  .fresco-cta h2 {
    margin: 0 0 0.4rem;
    font-family: 'IBM Plex Mono', monospace;
    color: #d4af37;
  }
  .fresco-cta p { margin: 0 0 1.2rem; color: #8b7a56; }
  .fresco-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (max-width: 560px) {
    .fresco-req { grid-template-columns: 1fr; gap: 0.3rem; }
    .fresco-req-num { font-size: 1rem; }
    .fresco-col { display: none; }
  }
</style>
