<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';

  const attended = [
    ['HP Code Wars', 'Annual contest hosted by Hewlett Packard'],
    ['USACO', 'Online contests throughout the year'],
    ['UIL CS', 'We frequently advance to State'],
    ['Local School Contests', 'Hosted by neighboring schools']
  ];
  const hosted = [
    ['Annual October Contest', 'Our national contest with 350+ participants'],
    ['UIL Invitational', 'A competitive meet hosted by SLHS CS Club']
  ];
</script>

<svelte:head>
  <title>Competitions | SLHS CS Club</title>
  <meta name="description" content="Competitions run by the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="competitions">
  <PageHero title="Competitions" subtitle="Information about the contests we run and attend." />

  <section class="section">
    <div class="container">
      <h2 class="section-title">Attended Competitions</h2>
      <p>
        We attend several local computer science contests throughout the year hosted by neighboring schools. Teams of 3 program on one computer to complete a packet of programming problems (while eating pizza and candy). They're a fun way to spend a Saturday and improve your problem solving skills.
      </p>
      <div class="contest-list">{#each attended as contest}<div class="contest-card"><h3>{contest[0]}</h3><p>{contest[1]}</p></div>{/each}</div>
    </div>
  </section>

  <section class="section national-band">
    <div class="container">
      <h2 class="section-title">Hosted Competitions</h2>
      <div class="contest-list">{#each hosted as contest}<div class="contest-card"><h3>{contest[0]}</h3><p>{contest[1]}</p></div>{/each}</div>
      <p>These events are produced by club members. We need problem writers, testers, judges, and volunteers to help put them together.</p>
      <p class="mono-text">View our contest schedule <a href="https://www.apluscompsci.com/cs_cont_list.htm" target="_blank" rel="noopener noreferrer">here</a>.</p>
    </div>
  </section>

  <CTACard title="CP Practice" lead="We hold competitive programming practice every week. Come learn and improve.">
    <a class="btn btn-primary" href="/calendar"><i class="fa-solid fa-calendar"></i> See Schedule</a>
    <a class="btn btn-secondary" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a>
  </CTACard>
</Shell>

<style>
  .contest-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .contest-card {
    padding: 1.5rem;
    border: 1px solid var(--color-blue);
    border-top: 3px solid var(--color-orange);
    background: var(--color-surface);
    color: var(--color-text);
  }

  .contest-card h3 {
    margin: 0 0 0.4rem;
  }

  .contest-card p {
    margin: 0;
    opacity: 0.9;
  }

  .national-band {
    border-top: 3px solid var(--color-orange);
    border-bottom: 3px solid var(--color-orange);
    background: rgba(255, 255, 255, 0.02);
  }

  .mono-text {
    font-family: var(--font-mono);
    text-align: center;
    margin: 1.5rem 0;
  }

  .mono-text a {
    color: var(--color-orange);
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .contest-list {
      grid-template-columns: 1fr;
    }
  }
</style>
