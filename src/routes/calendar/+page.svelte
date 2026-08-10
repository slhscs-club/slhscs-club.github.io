<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import PageHero from '$lib/components/PageHero.svelte';
  import CTACard from '$lib/components/CTACard.svelte';
  import { formatEventDate, getEventType, type ICSEvent } from '$lib/ics';
  import { generateCalendarDays, getEventsForDay, getUpcomingEvents, formatMonth, prevMonth, nextMonth } from '$lib/calendar';
  import FullscreenPanel from '$lib/components/FullscreenPanel.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { events: serverEvents, error: serverError } = data;
  let events = serverEvents.map((e: any) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end)
  }));
  let loading = false;
  let error = serverError;

  let currentDate = $state(new Date());
  const currentMonth = $derived(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

  const upcomingEvents = $derived(getUpcomingEvents(events, 8));

  const calendarDays = $derived(generateCalendarDays(currentMonth));

  function goPrevMonth() {
    currentDate = prevMonth(currentDate);
  }

  function goNextMonth() {
    currentDate = nextMonth(currentDate);
  }

  const nextEvent = $derived(upcomingEvents[0] ?? null);

  let now = $state(new Date());
  let showPast = $state(false);
  let selectedEvent = $state<any>(null);

  const pastEvents = $derived(
    events.filter((e: any) => e.start < now).sort((a: any, b: any) => b.start.getTime() - a.start.getTime()).slice(0, 20)
  );

  const nextEventInFuture = $derived(nextEvent ? nextEvent.start.getTime() > now.getTime() : false);
  $effect(() => {
    const id = window.setInterval(() => (now = new Date()), 60_000);
    return () => window.clearInterval(id);
  });

  function countdownParts(target: Date) {
    const diff = Math.max(0, target.getTime() - now.getTime());
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    return { days, hours, minutes };
  }

  function timeLabel(date: Date) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  function dayNumber(date: Date) {
    return date.toLocaleDateString('en-US', { day: '2-digit' });
  }

  function monthAbbr(date: Date) {
    return date.toLocaleDateString('en-US', { month: 'short' });
  }

  function weekdayAbbr(date: Date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
</script>

<svelte:head>
  <title>Calendar | SLHS CS Club</title>
  <meta name="description" content="Upcoming events for the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="calendar">
  <PageHero title="Calendar" subtitle="All our events in one place. We meet every Monday at 2:45 PM in Room 1001." />

  <section class="section">
    <div class="container">
      {#if !loading && !error && nextEvent && nextEventInFuture}
        <div class="next-strip">
          <span class="next-strip-label">Next up</span>
          <div class="next-strip-main">
            <strong>{nextEvent.summary}</strong>
            <span>{formatEventDate(nextEvent.start)} · {timeLabel(nextEvent.start)}</span>
          </div>
          <div class="next-strip-count" aria-label="Time until next event">
            {#if countdownParts(nextEvent.start).days > 0}
              <b>{countdownParts(nextEvent.start).days}</b><span>d</span>
            {/if}
            <b>{countdownParts(nextEvent.start).hours}</b><span>h</span>
            <b>{countdownParts(nextEvent.start).minutes}</b><span>m</span>
          </div>
        </div>
      {/if}
    </div>

    <div class="container calendar-layout">
      <div class="calendar-section">
        <div class="calendar-wrapper">
          <div class="calendar-header">
            <button class="nav-btn" onclick={goPrevMonth} aria-label="Previous month">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <h2 class="calendar-title">{formatMonth(currentMonth)}</h2>
            <button class="nav-btn" onclick={goNextMonth} aria-label="Next month">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          {#if loading}
            <div class="loading-state">Loading calendar...</div>
          {:else if error}
            <div class="error-state">Unable to load calendar. Please try again later.</div>
          {:else}
            <div class="calendar-grid">
              <div class="calendar-weekdays">
                {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
                  <div class="weekday">{day}</div>
                {/each}
              </div>

              <div class="calendar-days">
                {#each calendarDays as { day, date, isCurrentMonth, isToday }}
                  {@const dayEvents = getEventsForDay(day, date.getMonth(), date.getFullYear(), events)}
                  <div class="calendar-day {isCurrentMonth ? '' : 'other-month'} {isToday ? 'today' : ''}">
                    <span class="day-number">{day}</span>
                    {#if dayEvents.length > 0}
                      <div class="day-events">
                        {#each dayEvents.slice(0, 3) as event}
                          {@const type = getEventType(event.summary, event.description)}
                          <div class="day-event" title="{event.summary}">
                            {event.summary.length > 12 ? event.summary.substring(0, 12) + '…' : event.summary}
                          </div>
                        {/each}
                        {#if dayEvents.length > 3}
                          <div class="day-event more">+{dayEvents.length - 3} more</div>
                        {/if}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>

      <aside class="upcoming-section" aria-label="Upcoming events">
        <div class="upcoming-header">
          <h2 class="upcoming-title">Next Up</h2>
          <span class="upcoming-count">{upcomingEvents.length} events</span>
        </div>

        {#if loading}
          <div class="loading-state">Loading events...</div>
        {:else if error}
          <div class="error-state">Unable to load calendar.</div>
        {:else if upcomingEvents.length === 0}
          <div class="empty-state">No upcoming events found.</div>
        {:else}
          <ol class="upcoming-list">
            {#each upcomingEvents as event, i}
              {@const type = getEventType(event.summary, event.description)}
              <li class="upcoming-item" style={i === 0 ? 'border-left-color: var(--color-orange);' : ''}>
                <div class="upcoming-date">
                  <b>{dayNumber(event.start)}</b>
                  <span>{monthAbbr(event.start)}</span>
                </div>
                <div class="upcoming-info">
                  <strong>{event.summary}</strong>
                  <span class="upcoming-meta">{weekdayAbbr(event.start)} · {timeLabel(event.start)}</span>
                </div>
                <span class="event-type">{type}</span>
              </li>
            {/each}
          </ol>
        {/if}
      </aside>
    </div>
  </section>

  <CTACard title="Add to Your Calendar" lead="Subscribe to our Google Calendar to get updates directly in your own calendar app.">
    <a class="btn btn-primary" href="https://calendar.google.com" target="_blank"><i class="fa-brands fa-google"></i> Open Google Calendar</a>
    <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Discord for Updates</a>
  </CTACard>

  <section class="section section-tight">
    <div class="container cal-actions">
      <button class="btn btn-secondary" onclick={() => (showPast = !showPast)}>
        <i class="fa-solid fa-clock-rotate-left"></i> {showPast ? 'Hide' : 'View'} Past Events
      </button>
    </div>

    {#if showPast && pastEvents.length > 0}
      <div class="container"><div class="past-section">
        <h2 class="section-title">Past Events</h2>
        <p class="section-lead">Click an event to view details and media.</p>
        <ol class="upcoming-list">
          {#each pastEvents as event}
            {@const type = getEventType(event.summary, event.description)}
            <li class="upcoming-item past-item" onclick={() => (selectedEvent = event)} onkeydown={(e) => (e.key === 'Enter') && (selectedEvent = event)} role="button" tabindex="0">
              <div class="upcoming-date">
                <b>{dayNumber(event.start)}</b>
                <span>{monthAbbr(event.start)}</span>
              </div>
              <div class="upcoming-info">
                <strong>{event.summary}</strong>
                <span class="upcoming-meta">{weekdayAbbr(event.start)} · {timeLabel(event.start)}</span>
              </div>
              <span class="event-type">{type}</span>
              <i class="fa-solid fa-chevron-right past-chevron"></i>
            </li>
          {/each}
        </ol>
      </div></div>
    {/if}
  </section>

  {#if selectedEvent}
  <FullscreenPanel>
      <div class="media-panel">
        <div class="media-header">
          <div>
            <h2>{selectedEvent.summary}</h2>
            <p class="media-meta">{formatEventDate(selectedEvent.start)} · {timeLabel(selectedEvent.start)} · {weekdayAbbr(selectedEvent.start)}</p>
          </div>
          <button class="btn btn-primary" onclick={() => (selectedEvent = null)}><i class="fa-solid fa-xmark"></i> Close</button>
        </div>
        {#if selectedEvent.description}
          <div class="media-desc">{selectedEvent.description}</div>
        {/if}
        <div class="media-grid">
          <div class="media-slot">
            <i class="fa-solid fa-file-powerpoint"></i>
            <h3>Presentations</h3>
            <p>Slides or PDFs from this meeting.</p>
            <span class="badge">Coming soon</span>
          </div>
          <div class="media-slot">
            <i class="fa-solid fa-video"></i>
            <h3>Recording</h3>
            <p>Video recording of this session.</p>
            <span class="badge">Coming soon</span>
          </div>
          <div class="media-slot">
            <i class="fa-solid fa-link"></i>
            <h3>Links</h3>
            <p>Resources and references from this meeting.</p>
            <span class="badge">Coming soon</span>
          </div>
          <div class="media-slot">
            <i class="fa-solid fa-newspaper"></i>
            <h3>Notes</h3>
            <p>Meeting notes and recaps.</p>
            <span class="badge">Coming soon</span>
          </div>
        </div>
      </div>
  </FullscreenPanel>
  {/if}
</Shell>

<style>
  .loading-state, .error-state, .empty-state {
    padding: 1.2rem;
    border: 3px solid var(--color-orange);
    background: var(--color-surface);
    box-shadow: var(--orange-shadow);
    text-align: center;
  }

  /* Compact "next event" countdown banner */
  .next-strip {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
    padding: 1rem 1.4rem;
    margin-bottom: 2.5rem;
    border: 1px solid var(--color-navy);
    border-left: 4px solid var(--color-orange);
    background: var(--color-surface);
  }

  .next-strip-label {
    font: 700 .72rem var(--font-mono);
    text-transform: uppercase;
    letter-spacing: .12em;
    color: var(--color-orange);
  }

  .next-strip-main {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex: 1;
    min-width: 0;
  }

  .next-strip-main strong {
    font-size: 1.05rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .next-strip-main span {
    color: var(--color-text-muted);
    font-size: 0.85rem;
  }

  .next-strip-count {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    font: 700 1.4rem var(--font-mono);
    color: var(--color-text);
  }

  .next-strip-count b { color: var(--color-orange); }
  .next-strip-count span { font-size: 0.7rem; color: var(--color-text-muted); margin-right: 0.4rem; }

  .calendar-layout {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: start;
  }

  .calendar-wrapper {
    max-width: 900px;
  }

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  .calendar-title {
    margin: 0;
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-family: var(--font-title);
  }

  .nav-btn {
    width: 44px;
    height: 44px;
    border: 3px solid var(--color-navy);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: all 0.1s var(--ease-hover);
  }

  .nav-btn:hover {
    transform: translate(-2px, -2px);
    border-color: var(--color-orange);
    color: var(--color-orange);
    box-shadow: 4px 4px 0 var(--color-orange);
  }

  .calendar-grid {
    border: 1px solid var(--color-navy);
    background: var(--color-surface);
    box-shadow: var(--orange-shadow);
  }

  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: var(--color-surface-2);
    border-bottom: 2px solid var(--color-orange);
  }

  .weekday {
    padding: 0.75rem;
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: var(--color-navy);
  }

  .calendar-day {
    min-height: 110px;
    min-width: 0;
    background: var(--color-bg);
    padding: 0.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .calendar-day.other-month {
    background: var(--color-surface-2);
  }

  .calendar-day.today {
    background: var(--color-surface);
    outline: 2px solid var(--color-orange);
    outline-offset: -2px;
  }

  .day-number {
    font-weight: 700;
    font-size: 0.9rem;
    align-self: flex-end;
    margin-bottom: 0.25rem;
    color: var(--color-text);
  }

  .calendar-day.other-month .day-number {
    opacity: 0.4;
  }

  .day-events {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow: hidden;
  }

  .day-event {
    padding: 0.25rem 0.4rem;
    font-size: 0.72rem;
    font-weight: 600;
    border: 2px solid var(--color-orange);
    background: var(--color-orange);
    color: var(--color-black);
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: transform 0.1s var(--ease-hover);
  }

  .day-event:hover {
    transform: scale(1.05);
    z-index: 10;
  }

  .day-event.more {
    border-color: var(--color-text-muted);
    background: transparent;
    color: var(--color-text-muted);
  }

  /* Dense "Next Up" rail */
  .upcoming-section {
    border: 1px solid var(--color-navy);
    border-top: 3px solid var(--color-orange);
    background: var(--color-surface);
    padding: 1.4rem;
    position: sticky;
    top: 6.5rem;
  }

  .upcoming-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.1rem;
  }

  .upcoming-title {
    margin: 0;
    font-size: 1.35rem;
    font-family: var(--font-title);
    color: var(--color-text);
  }

  .upcoming-count {
    font: 700 0.7rem var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted);
  }

  .upcoming-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.4rem;
  }

  .upcoming-item {
    display: grid;
    grid-template-columns: 2.6rem 1fr auto;
    align-items: center;
    gap: 0.75rem;
    padding: 0.55rem 0.6rem;
    border-left: 3px solid var(--color-navy);
    background: var(--color-bg);
    transition: transform .25s cubic-bezier(.2,.8,.2,1), background .25s ease;
  }

  .upcoming-item:hover {
    transform: translateX(4px);
    background: var(--color-surface-2);
  }

  .upcoming-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.1;
    border: 1px solid var(--color-navy);
    padding: 0.3rem 0.1rem;
    background: var(--color-surface-2);
  }

  .upcoming-date b {
    font-size: 1.15rem;
    font-family: var(--font-mono);
    color: var(--color-orange);
  }

  .upcoming-date span {
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted);
  }

  .upcoming-info {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .upcoming-info strong {
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upcoming-meta {
    font-size: 0.72rem;
    color: var(--color-text-muted);
  }

  .event-type {
    padding: 0.25rem 0.5rem;
    border: 2px solid var(--color-orange);
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-orange);
    white-space: nowrap;
  }

  .past-item { opacity: 0.7; cursor: pointer; }
  .past-item:hover { opacity: 1; }
  .past-chevron { color: var(--color-text-muted); font-size: 0.7rem; }
  .media-desc { padding: 1rem 1.2rem; background: var(--color-bg); border-left: 3px solid var(--color-orange); color: var(--color-text-muted); margin-bottom: 1.5rem; line-height: 1.5; font-size: 0.88rem; border-radius: 2px; }
  .media-meta { margin: 0.3rem 0 0; color: var(--color-text-muted); font-size: 0.82rem; }

  .cal-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }

  .media-panel h2 { margin: 0 0 1.5rem; font-family: var(--font-title); }
  .media-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
  .media-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .media-slot { padding: 1.5rem; border: 1px solid var(--color-navy); border-top: 3px solid var(--color-orange); background: var(--color-bg); }
  .media-slot i { font-size: 2.4rem; color: var(--color-orange); margin-bottom: 1rem; }
  .media-slot h3 { margin: 0 0 0.4rem; }
  .media-slot p { margin: 0 0 0.8rem; color: var(--color-text-muted); font-size: 0.88rem; }

  @media (max-width: 768px) { .media-grid { grid-template-columns: 1fr; } }

  @media (max-width: 1024px) {
    .calendar-layout {
      grid-template-columns: 1fr;
    }

    .upcoming-section {
      position: static;
    }

    .upcoming-list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .calendar-days {
      gap: 0;
    }

    .calendar-day {
      min-height: 80px;
      padding: 0.25rem;
    }

    .day-event {
      font-size: 0.65rem;
      padding: 0.15rem 0.3rem;
    }
  }

  @media (max-width: 480px) {
    .calendar-header {
      gap: 1rem;
    }

    .calendar-day {
      min-height: 70px;
    }
  }
</style>
