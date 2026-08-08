<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
</script>

<svelte:head>
  <title>Competitions | SLHS CS Club</title>
  <meta name="description" content="Competitions run by the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="competitions">
  <PageHero title="Competitions" subtitle="Information about the contests we run and attend." />

  <section class="section">
    <div class="container">
      <h2 class="section-title">Local Contests</h2>
      <p>
        We attend several local computer science contests throughout the year hosted by neighboring schools. Teams of 3 program on one computer to complete a packet of programming problems (while eating pizza and candy). They're a fun way to spend a Saturday and improve your problem solving skills.
      </p>
      <div class="contest-list">
        <div class="contest-card color-orange">
          <h3>HP Code Wars</h3>
          <p>Annual contest hosted by Hewlett Packard</p>
        </div>
        <div class="contest-card color-orange">
          <h3>USACO</h3>
          <p>USA Computing Olympiad - online contests throughout the year</p>
        </div>
        <div class="contest-card color-orange">
          <h3>UIL CS</h3>
          <p>University Interscholastic League - we frequently advance to State</p>
        </div>
        <div class="contest-card color-orange">
          <h3>Local School Contests</h3>
          <p>Hosted by nearby schools, in the district or otherwise</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section national-band">
    <div class="container">
      <h2 class="section-title">Annual October Contest</h2>
      <p>
        Every year our annual October contest is hosted online and in-person with over 350 people in attendance. The contest is produced entirely by the CS Club and every year we need problem writers, testers, judges, and other volunteers to help put the event together.
      </p>
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
    border: 3px solid var(--accent, var(--color-orange));
    background: var(--accent, var(--color-surface));
    color: var(--accent-text, var(--color-white));
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