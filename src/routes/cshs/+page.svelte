<script lang="ts">
  import Shell from "$lib/components/Shell.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    document.documentElement.classList.add("theme-cshs");
    return () => document.documentElement.classList.remove("theme-cshs");
  });
</script>

<svelte:head>
  <title>CS Honor Society | SLHS CS Club</title>
</svelte:head>

<Shell activePage="">
  <div class="fresco-root">
    <div class="fresco-banner">
      <div class="fresco-crest">
        <div class="fresco-crest-outer">
          <div class="fresco-crest-inner">
            <i class="fa-solid fa-award"></i>
          </div>
        </div>
      </div>
      <span class="fresco-tag">CSHS</span>
      <h1>Computer Science<br />Honor Society</h1>
      <div class="fresco-subtitle">
        <span class="fresco-rule"></span>
        <p>Participation-based qualification</p>
        <span class="fresco-rule"></span>
      </div>
    </div>

    <div class="fresco-meander"></div>

    <div class="fresco-intro">
      <p>The purpose of CSHS is to make membership meaningfully different from simply being a member of CS Club, while still allowing students with different interests — competitive programming, projects, service, learning — to qualify.</p>
    </div>

    <div class="fresco-meander"></div>

    <div class="fresco-section">
      <h2>Membership Tiers</h2>

      <div class="fresco-tier-grid">
        <div class="fresco-tier">
          <div class="fresco-tier-num">100<span>pts</span></div>
          <h3>Alpha / New Member</h3>
          <p>For students being inducted for the first time.</p>
        </div>
        <div class="fresco-tier">
          <div class="fresco-tier-num">150<span>pts</span></div>
          <h3>Returning / Advanced</h3>
          <p>For returning members. Point values for activities are the same regardless of year or course.</p>
        </div>
      </div>
    </div>

    <div class="fresco-section">
      <h2>Baseline Requirements</h2>

      <div class="fresco-req-list">
        <div class="fresco-req">
          <div class="fresco-req-num">I</div>
          <div class="fresco-req-text">
            <h3>Meetings</h3>
            <p>Attend at least <em>4 qualifying meetings</em> at <em>10 points each</em> = <em>40 points</em>. These are primarily general CS club meetings.</p>
          </div>
        </div>
        <div class="fresco-req">
          <div class="fresco-req-num">II</div>
          <div class="fresco-req-text">
            <h3>Service</h3>
            <p>Complete at least <em>4 volunteer hours</em> at <em>10 points per hour</em> = <em>40 points</em>. Service is mandatory but not tied to any single activity category.</p>
          </div>
        </div>
        <div class="fresco-req">
          <div class="fresco-req-num">III</div>
          <div class="fresco-req-text">
            <h3>One Qualifying Event</h3>
            <p>Attend at least <em>1 qualifying event</em> at <em>20 points</em>. This includes socials, hackathons, programming competitions, or other approved CS events.</p>
          </div>
        </div>
      </div>

    <div class="fresco-section">
      <h2>Approved Events</h2>

      <div class="fresco-pts-grid">
        <div class="fresco-pt"><strong>Approved event</strong><span>20 pts</span></div>
      </div>
      <p class="fresco-section-p" style="margin-top:0.8rem">Qualifying events, hackathons, programming competitions, CS socials, and other approved CS activities all earn 20 points.</p>
    </div>

    <div class="fresco-section">
      <h2>Example Paths</h2>

      <div class="fresco-examples">
        <div class="fresco-ex">
          <h3>Competitive Programmer</h3>
          <div class="fresco-ex-calc">
            <span>5 competitions</span><span>100 pts</span>
            <span>4 meetings</span><span>40 pts</span>
            <span>4 volunteer hours</span><span>40 pts</span>
            <span class="fresco-ex-total">180 pts</span>
          </div>
          <p>No extra points for being a competitor — competitions simply provide opportunities to earn.</p>
        </div>
        <div class="fresco-ex">
          <h3>Project-Oriented Student</h3>
          <div class="fresco-ex-calc">
            <span>8 meetings</span><span>80 pts</span>
            <span>6 volunteer hours</span><span>60 pts</span>
            <span>2 qualifying events</span><span>40 pts</span>
            <span class="fresco-ex-total">180 pts</span>
          </div>
          <p>They qualify without ever competing. CSHS rewards involvement in computer science, not forcing everyone into competitive programming.</p>
        </div>
      </div>
    </div>

    <div class="fresco-meander"></div>

    <div class="fresco-motto">
      <p>CSHS should reward involvement in computer science, not force everyone into a single path.</p>
    </div>

    <div class="fresco-cta">
      <h2>Apply for Induction</h2>
      <p>Pay the membership fee through Pay n Go and fill out the registration form. Maintain a B or higher in a CS course.</p>
      <div class="fresco-actions">
        <a class="btn btn-primary" href="/join"><i class="fa-solid fa-file-lines"></i> Register for CSHS</a>
        <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Discord</a>
      </div>
    </div>
  </div>
</Shell>

<style>
  :global(html.theme-cshs), :global(html.theme-cshs body) { background: #120e0a; }
  :global(html.theme-cshs .sticky-top) { backdrop-filter: none; }
  :global(html.theme-cshs header) { background: rgba(18,14,10,0.94); border-bottom: 2px solid rgba(184,148,58,0.25); }
  :global(html.theme-cshs header a), :global(html.theme-cshs header i), :global(html.theme-cshs header button), :global(html.theme-cshs header .logo) { color: #c9b87a !important; }
  :global(html.theme-cshs header .join-btn) { background: #b8943a; border-color: #b8943a; color: #120e0a !important; }
  :global(html.theme-cshs header .icon-btn) { border-color: rgba(184,148,58,0.35); background: rgba(18,14,10,0.8); }
  :global(html.theme-cshs .nav-indicator) { background: #d4af37; }
  :global(html.theme-cshs .footer-wrap) { background: rgba(14,11,7,0.95); border-top: 2px solid rgba(184,148,58,0.25); }
  :global(html.theme-cshs .footer-wrap::before) { display: none; }
  :global(html.theme-cshs footer .footer-brand) { color: #c9b87a; }
  :global(html.theme-cshs footer .footer-links a) { color: #8b7a56; }
  :global(html.theme-cshs footer .footer-links a:hover) { color: #d4af37; }
  :global(html.theme-cshs .btn-primary) { background: #b8943a; border-color: #b8943a; color: #120e0a !important; box-shadow: 4px 4px 0 rgba(184,148,58,0.4); }
  :global(html.theme-cshs .btn-primary:hover) { transform: translate(-3px,-3px); box-shadow: 6px 6px 0 rgba(184,148,58,0.5); }
  :global(html.theme-cshs .btn-secondary) { border-color: #6b5f47; color: #c9b87a; box-shadow: 4px 4px 0 rgba(107,95,71,0.4); }
  :global(html.theme-cshs .btn-secondary:hover) { background: #2a2318; color: #d4af37; border-color: #b8943a; box-shadow: 6px 6px 0 rgba(184,148,58,0.4); }
  :global(html.theme-cshs .cta-card) { display: none; }
  :global(html.theme-cshs .main-shell) { padding-bottom: 0; }

  .fresco-root { width: min(780px, calc(100% - 2rem)); margin: 0 auto; padding: 2rem 0 3rem; }
  .fresco-meander { height: 2px; background: rgba(184,148,58,0.3); margin: 0.8rem 0; }
  .fresco-banner { text-align: center; padding: 2rem 0 1rem; }
  .fresco-crest { display: flex; justify-content: center; margin-bottom: 1.2rem; }
  .fresco-crest-outer { width: 100px; height: 100px; border: 3px solid #b8943a; display: grid; place-items: center; box-shadow: 0 0 40px rgba(184,148,58,0.1), inset 0 0 20px rgba(184,148,58,0.05); }
  .fresco-crest-inner { width: 62px; height: 62px; border: 2px solid rgba(196,162,72,0.5); display: grid; place-items: center; background: rgba(184,148,58,0.06); }
  .fresco-crest-inner i { font-size: 1.8rem; color: #d4af37; }
  .fresco-tag { display: inline-block; padding: 0.2rem 0.8rem; border: 1px solid rgba(196,162,72,0.35); color: #c4a248; font-family: "IBM Plex Mono", monospace; font-size: 0.68rem; letter-spacing: 0.2em; margin-bottom: 1rem; }
  .fresco-banner h1 { margin: 0; font-family: "IBM Plex Mono", monospace; font-size: clamp(2.2rem, 4.5vw, 3.6rem); line-height: 1.1; color: #e8d8b0; letter-spacing: 0.01em; }
  .fresco-subtitle { display: flex; align-items: center; gap: 1rem; justify-content: center; margin: 0.6rem 0 0; }
  .fresco-subtitle p { margin: 0; color: #b8943a; font-size: 0.82rem; letter-spacing: 0.2em; text-transform: uppercase; }
  .fresco-rule { flex: 1; max-width: 60px; height: 1px; background: rgba(184,148,58,0.3); }

  .fresco-intro { text-align: center; padding: 1rem 1.5rem; color: #a69572; line-height: 1.6; font-size: 0.92rem; }

  .fresco-section { margin: 2rem 0; }
  .fresco-section h2 { margin: 0 0 1rem; font-family: "IBM Plex Mono", monospace; color: #d4af37; font-size: 1.3rem; }
  .fresco-section-p { color: #948f7a; line-height: 1.5; margin: 0 0 1rem; font-size: 0.88rem; }
  .fresco-section-p em { color: #d4af37; font-style: normal; font-weight: 600; }

  .fresco-tier-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .fresco-tier { padding: 1.5rem; background: rgba(20,15,9,0.7); border: 1px solid rgba(184,148,58,0.12); border-top: 3px solid #b8943a; text-align: center; }
  .fresco-tier-num { font-family: "IBM Plex Mono", monospace; font-size: 2.4rem; color: #d4af37; font-weight: 700; line-height: 1; }
  .fresco-tier-num span { display: block; font-size: 0.6rem; color: #8b7a56; letter-spacing: 0.1em; margin-top: 0.1rem; }
  .fresco-tier h3 { margin: 0.8rem 0 0.4rem; color: #d9cfa6; font-size: 1rem; font-family: "IBM Plex Mono", monospace; }
  .fresco-tier p { margin: 0; color: #948f7a; font-size: 0.82rem; line-height: 1.4; }

  .fresco-req-list { display: grid; gap: 0.8rem; }
  .fresco-req { display: grid; grid-template-columns: 48px 1fr; gap: 1.2rem; padding: 1.2rem 1.4rem; background: rgba(20,15,9,0.7); border: 1px solid rgba(184,148,58,0.12); border-left: 4px solid #b8943a; align-items: start; }
  .fresco-req-num { font-family: "IBM Plex Mono", monospace; font-size: 1.6rem; color: #b8943a; font-weight: 700; line-height: 1; }
  .fresco-req-text h3 { margin: 0 0 0.3rem; font-size: 1.05rem; color: #d9cfa6; font-family: "IBM Plex Mono", monospace; }
  .fresco-req-text p { margin: 0; color: #948f7a; line-height: 1.5; font-size: 0.86rem; }
  .fresco-req-text em { color: #d4af37; font-style: normal; font-weight: 600; }

  .fresco-math { display: flex; align-items: baseline; gap: 0.5rem; justify-content: center; margin-top: 1.5rem; font-family: "IBM Plex Mono", monospace; font-size: 2rem; color: #d4af37; font-weight: 700; }
  .fresco-math .fresco-plus { color: #6b5f47; font-size: 1.4rem; font-weight: 400; }
  .fresco-math .fresco-eq { color: #8b7a56; font-size: 1.4rem; margin: 0 0.3rem; }
  .fresco-math .fresco-total { font-size: 2.6rem; color: #d4af37; }
  .fresco-math-label { font-family: "IBM Plex Mono", monospace; text-align: center; color: #6b5f47; font-size: 0.7rem; margin-top: 0.2rem; letter-spacing: 0.06em; text-transform: uppercase; }

  .fresco-pts-grid { display: grid; gap: 0.5rem; }
  .fresco-pt { display: flex; justify-content: space-between; align-items: center; padding: 0.7rem 1rem; background: rgba(20,15,9,0.7); border: 1px solid rgba(184,148,58,0.1); }
  .fresco-pt strong { color: #d9cfa6; font-weight: 600; font-size: 0.88rem; }
  .fresco-pt span { color: #d4af37; font-family: "IBM Plex Mono", monospace; font-weight: 700; font-size: 0.85rem; }

  .fresco-examples { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .fresco-ex { padding: 1.3rem 1.3rem; background: rgba(20,15,9,0.7); border: 1px solid rgba(184,148,58,0.12); border-top: 3px solid #b8943a; }
  .fresco-ex h3 { margin: 0 0 0.8rem; color: #d9cfa6; font-family: "IBM Plex Mono", monospace; font-size: 1rem; }
  .fresco-ex-calc { display: grid; grid-template-columns: 1fr auto; gap: 0.25rem 1rem; margin-bottom: 0.8rem; font-size: 0.82rem; }
  .fresco-ex-calc span:nth-child(odd) { color: #948f7a; }
  .fresco-ex-calc span:nth-child(even) { color: #d4af37; font-family: "IBM Plex Mono", monospace; font-weight: 600; text-align: right; }
  .fresco-ex-total { grid-column: 1 / -1; border-top: 1px solid rgba(184,148,58,0.2); padding-top: 0.3rem; margin-top: 0.2rem; color: #d4af37 !important; font-size: 1rem !important; }
  .fresco-ex p { margin: 0; color: #8b7a56; font-size: 0.78rem; line-height: 1.4; }

  .fresco-motto { padding: 1.5rem 0; color: #6b5f47; font-style: italic; font-size: 0.88rem; text-align: center; }
  .fresco-motto p { margin: 0; max-width: 500px; margin-inline: auto; }

  .fresco-cta { text-align: center; padding: 2rem; background: rgba(20,15,9,0.7); border: 2px solid rgba(184,148,58,0.15); }
  .fresco-cta h2 { margin: 0 0 0.4rem; font-family: "IBM Plex Mono", monospace; color: #d4af37; }
  .fresco-cta p { margin: 0 0 1.2rem; color: #8b7a56; }
  .fresco-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

  @media (max-width: 600px) {
    .fresco-tier-grid, .fresco-examples { grid-template-columns: 1fr; }
    .fresco-req { grid-template-columns: 1fr; gap: 0.3rem; }
    .fresco-math { font-size: 1.5rem; }
    .fresco-math .fresco-total { font-size: 1.8rem; }
  }
</style>
