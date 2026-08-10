<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import CountUp from '$lib/components/CountUp.svelte';

  const achievements = [
    { prefix: '', num: 4, suffix: 'x', label: 'UIL State Championships' },
    { prefix: '', num: 20, suffix: '+', label: 'Individual UIL State Attendees' },
    { prefix: '≈', num: 15, suffix: '', label: 'Years Running' },
    { prefix: '', num: 50, suffix: '+', label: 'Honor Society Members' }
  ];

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

  const structure = [
    {
      icon: 'fa-chalkboard-user',
      title: 'Weekly Meetings',
      text: 'Every Monday after school we hold a general meeting with presentations on CS topics delivered by our own members, from algorithms to web dev, game dev, and career advice.'
    },
    {
      icon: 'fa-code',
      title: 'Competitive Programming',
      text: 'Weekly CP practice sessions where members work through problems together, plus USACO, HP Code Wars, UIL CS, and local contests.'
    },
    {
      icon: 'fa-trophy',
      title: 'National October Contest',
      text: 'Every year we host our own national programming contest, produced entirely by the CS Club. We need problem writers, testers, judges, and volunteers.'
    },
    {
      icon: 'fa-people-group',
      title: 'Social Events',
      text: 'Social events throughout the year help members connect and build community outside of coding.'
    }
  ];

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

  <section class="section history-band">
    <div class="container history-grid">
      <div class="history-copy">
        <h2 class="section-title">Our History</h2>
        <p>
          The Seven Lakes High School Computer Science Club has been running for around 15 years, growing from a UIL academics team into one of the most active clubs on campus. We've hosted national programming contests with over 350 attendees, won UIL CS State multiple times, and built a community that welcomes students of all skill levels and interests.
        </p>
        <p class="history-footnote">
          <i class="fa-solid fa-location-dot"></i> We meet every Monday at 2:45 PM in Room 1001.
        </p>
      </div>
      <div class="history-stats">
        {#each achievements as ach}
          <div class="achievement-card">
            <strong>{ach.prefix}<CountUp from={0} to={ach.num} separator="" direction="up" duration={0.8} />{ach.suffix}</strong>
            <p>{ach.label}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="section overview-band">
    <div class="container">
      <h2 class="section-title">How the Club Works</h2>
      <p class="section-lead">Here's how we're structured.</p>

      <div class="structure-grid">
        {#each structure as item}
          <div class="structure-card">
            <i class="fa-solid {item.icon}"></i>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq-grid">
        {#each faqItems as item}
          <div class="faq-item">
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="section officers-section">
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
  .history-band {
    padding: 4rem 0 2rem;
  }

  .history-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2.5rem;
    align-items: center;
  }

  .history-copy p {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    color: var(--color-text-muted);
  }

  .history-footnote {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border-left: 3px solid var(--color-orange);
    background: var(--color-surface);
    color: var(--color-text);
    font-weight: 600;
  }

  .history-footnote i {
    color: var(--color-orange);
  }

  .history-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .achievement-card {
    padding: 1.4rem;
    border: 1px solid var(--color-navy);
    border-top: 3px solid var(--color-orange);
    background: var(--color-surface);
    color: var(--color-white);
    transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease;
  }

  .achievement-card:hover {
    transform: translateY(-3px);
    box-shadow: 4px 4px 0 var(--color-orange);
  }

  .achievement-card strong { display: block; font-size: 2rem; color: var(--color-orange); font-family: var(--font-mono); }
  .achievement-card p { margin: .35rem 0 0; color: var(--color-text-muted); }

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
    border: 1px solid var(--color-navy);
    border-top: 3px solid var(--color-orange);
    background: var(--color-surface);
    color: var(--color-text);
    transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease;
  }

  .structure-card:hover {
    transform: translateY(-3px);
    box-shadow: 4px 4px 0 var(--color-orange);
  }

  .structure-card i {
    color: var(--color-orange);
    font-size: 1.6rem;
    margin-bottom: 0.9rem;
  }

  .structure-card h3 {
    margin: 0 0 0.5rem;
  }

  .structure-card p {
    margin: 0;
    opacity: 0.9;
    color: var(--color-text-muted);
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .faq-item {
    padding: 1.2rem 1.3rem;
    border: 1px solid var(--color-navy);
    border-left: 3px solid var(--color-orange);
    background: var(--color-surface);
    color: var(--color-text);
  }

  .faq-item h3 {
    margin: 0 0 0.5rem;
    color: var(--color-text);
    font-size: 1.05rem;
  }

  .faq-item p {
    margin: 0;
    color: var(--color-text-muted);
  }

  .officers-section {
    padding-bottom: 3rem;
  }

  @media (max-width: 1024px) {
    .history-grid {
      grid-template-columns: 1fr;
    }

    .structure-grid {
      grid-template-columns: 1fr;
    }

    .faq-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .history-stats {
      grid-template-columns: 1fr;
    }
  }
</style>
