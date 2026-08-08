<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import Carousel from '$lib/components/Carousel.svelte';

  const officerImages = import.meta.glob(
    '$lib/assets/officers/*.{jpg,jpeg,png,gif,webp,avif}',
    { eager: true, query: { url: true } }
  );

  function getOfficerImage(name: string): string | undefined {
    const hyphenated = name.toLowerCase().replace(/\s+/g, '-');
    const match = Object.entries(officerImages).find(([path]) =>
      path.includes(`/${hyphenated}.`)
    );
    return match ? (match[1] as { default: string }).default : undefined;
  }

  const officers = [
    { name: 'Abhay Godavarthy', role: 'President' },
    { name: 'Shravni Rotithor', role: 'Vice President' },
    { name: 'Saanvi Saxena', role: 'Treasurer + Secretary' },
    { name: 'Avika Shrivastava', role: 'Historian' },
    { name: 'Eren Tor', role: 'Competitive Programming Lead' },
    { name: 'Austin Yu', role: 'Contest Lead' },
    { name: 'Kushagra Nagar', role: 'Outreach Manager' },
    { name: 'Jackson MacGregor', role: 'Web Development' }
  ].map((o) => ({ ...o, image: getOfficerImage(o.name) }));

  const faqItems = [
    {
      q: 'What activities does the club do?',
      a: 'We hold presentations on computer science topics every week, practice for contests, host a national contest and UIL invitational, and provide an environment for Seven Lakes students interested in computer science to connect with each other.'
    },
    {
      q: 'How do I join?',
      a: 'Our club is open to anyone who wants to attend our meetings. No sign up is required and we don\'t keep a list of members.'
    },
    {
      q: 'Do I have to pay any fees?',
      a: 'No! Our club is completely free to everyone. If you meet the requirements and would like to join National CS Honor Society after a year, then we ask for a small fee to cover the cost of the Honor Society.'
    },
    {
      q: 'Do I need to compete to be in the club?',
      a: 'Competitions are not required. We encourage everyone to give contests a try because they\'re fun and a great way to improve your problem solving skills, but we recognize that there wide range of interests in CS beyond competitions.'
    }
  ];
</script>

<svelte:head>
  <title>About | SLHS CS Club</title>
  <meta name="description" content="Learn about the Seven Lakes High School Computer Science Club - history, how we work, and our officers." />
</svelte:head>

<Shell activePage="about">
  <PageHero title="About Us" subtitle="Learn about the Seven Lakes High School Computer Science Club" />

  <section class="section">
    <div class="container">
      <h2 class="section-title">Our History</h2>
      <p>
        The Seven Lakes High School Computer Science Club has been running for around 15 years, growing from a UIL academics team into one of the most active clubs on campus. We've hosted national programming contests with over 350 attendees, won UIL CS State multiple times, and built a community that welcomes students of all skill levels and interests.
      </p>
    </div>
  </section>

  <section class="section overview-band">
    <div class="container">
      <h2 class="section-title">How the Club Works</h2>
      <p class="section-lead">We meet every Monday at 2:45 PM in Room 1001. Here's how we're structured.</p>

      <div class="structure-grid">
        <div class="structure-card color-orange">
          <h3>Weekly Meetings</h3>
          <p>Every Monday after school, we hold a general meeting with presentations on CS topics delivered by our own members. Topics range from algorithms and data structures to web development, game dev, and career advice.</p>
        </div>
        <div class="structure-card color-orange">
          <h3>Competitive Programming</h3>
          <p>We hold weekly CP practice sessions where members work through programming problems together. We attend several local contests throughout the year hosted by neighboring schools, plus USACO, HP Code Wars, and UIL CS.</p>
        </div>
        <div class="structure-card color-orange">
          <h3>National October Contest</h3>
          <p>Every year we host our own national programming contest, produced entirely by the CS Club. We need problem writers, testers, judges, and volunteers to help put the event together.</p>
        </div>
        <div class="structure-card color-orange">
          <h3>Social Events</h3>
          <p>We also run social events throughout the year to help members connect and build community outside of coding.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq-list">
        {#each faqItems as item}
          <div class="faq-item color-orange">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Our Officers</h2>
      <p class="section-lead">The students who keep the club running:</p>

      <Carousel items={officers} visibleSlides={3} ariaLabel="Officers carousel" />
    </div>
  </section>

  <CTACard title="Want to get involved?" lead="Come to a meeting or join our Discord to learn more.">
    <a class="btn btn-primary" href="/join"><i class="fa-solid fa-user-plus"></i> Join the Club</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Join Discord</a>
  </CTACard>
</Shell>

<style>
  .overview-band {
    border-top: 3px solid var(--color-orange);
    border-bottom: 3px solid var(--color-orange);
    background: rgba(255, 255, 255, 0.02);
  }

  .structure-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .structure-card {
    padding: 1.5rem;
    border: 3px solid var(--accent, var(--color-orange));
    background: var(--accent, var(--color-surface));
    color: var(--accent-text, var(--color-white));
  }

  .structure-card h3 {
    margin: 0 0 0.5rem;
  }

  .structure-card p {
    margin: 0;
    opacity: 0.9;
  }

  .faq-list {
    display: grid;
    gap: 1.5rem;
  }

  .faq-item {
    padding: 1.2rem;
    border: 3px solid var(--accent, var(--color-orange));
    background: var(--accent, var(--color-surface));
    color: var(--accent-text, var(--color-white));
    box-shadow: var(--orange-shadow);
  }

  .faq-item h3 {
    margin: 0 0 0.5rem;
    color: var(--color-black);
  }

  .faq-item p {
    margin: 0;
  }

  @media (max-width: 1024px) {
    .structure-grid {
      grid-template-columns: 1fr;
    }
  }
</style>