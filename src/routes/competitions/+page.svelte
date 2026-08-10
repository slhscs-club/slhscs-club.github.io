<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import { attendedCompetitions, hostedCompetitions } from '$lib/data/competitions';
</script>

<svelte:head>
  <title>Competitions | SLHS CS Club</title>
  <meta name="description" content="Competitions run by the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="competitions">
  <PageHero title="Competitions" subtitle="Information about the contests we run and attend." />

  <section class="section national-band">
    <div class="container">
      <h2 class="section-title">Hosted Competitions</h2>
      <div class="hosted-grid">
        {#each hostedCompetitions as contest}
          <div class="hosted-card">
            <div class="hosted-card-header">
              <h3>{contest.title}</h3>
              <span class="badge">{contest.badge}</span>
            </div>
            <p>{contest.description}</p>
            {#if contest.callout}
              <div class="hosted-callout">
                <i class="fa-solid fa-handshake-angle"></i>
                <span>{contest.callout}</span>
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <p class="mono-text">View our contest schedule <a href="https://www.apluscompsci.com/cs_cont_list.htm" target="_blank" rel="noopener noreferrer">here</a>.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Attended Competitions</h2>
      <p>
        We attend several local computer science contests throughout the year hosted by neighboring schools. Teams of three program on one computer to complete a packet of programming problems (while eating pizza and candy). They are a fun way to spend a Saturday and improve your problem-solving skills.
      </p>
      <div class="contest-list">
        {#each attendedCompetitions as contest}
          <div class="contest-card"><h3>{contest[0]}</h3><p>{contest[1]}</p></div>
        {/each}
      </div>
    </div>
  </section>

  <CTACard title="Competitive Programming Practice" lead="We hold competitive programming practice every week. Come learn and improve.">
    <a class="btn btn-primary" href="/calendar"><i class="fa-solid fa-calendar"></i> See Schedule</a>
    <a class="btn btn-secondary" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a>
  </CTACard>
</Shell>

<style>
  .hosted-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 1.5rem; }
  .hosted-card { padding: 1.75rem; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-surface); color: var(--color-text); display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; }
  .hosted-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
  .hosted-card h3 { margin: 0; font-size: 1.4rem; }
  .badge { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.25rem 0.6rem; background: var(--color-orange); color: var(--color-black); border-radius: 2px; }
  .hosted-card p { margin: 0; opacity: 0.9; line-height: 1.5; }
  .hosted-callout { display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem; background: rgba(255, 107, 44, 0.1); border-left: 3px solid var(--color-orange); font-size: 0.88rem; color: var(--color-orange); }
  .hosted-callout i { font-size: 1.1rem; flex-shrink: 0; }

  .contest-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-top: 1.5rem; }
  .contest-card { padding: 1.5rem; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-surface); color: var(--color-text); }
  .contest-card h3 { margin: 0 0 0.4rem; }
  .contest-card p { margin: 0; opacity: 0.9; }

  .national-band { border-top: 3px solid var(--color-orange); border-bottom: 3px solid var(--color-orange); background: rgba(255, 255, 255, 0.02); }
  .mono-text { font-family: var(--font-mono); text-align: center; margin: 1.5rem 0; }
  .mono-text a { color: var(--color-orange); text-decoration: underline; }

  @media (max-width: 768px) { .contest-list, .hosted-grid { grid-template-columns: 1fr; } }
</style>
