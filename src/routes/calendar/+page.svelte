<script lang="ts">
  import Shell from '$lib/components/Shell.svelte';
  import { formatEventDate, getEventType, getEventColor, type ICSEvent } from '$lib/ics';
  import { generateCalendarDays, getEventsForDay, getUpcomingEvents, formatMonth, prevMonth, nextMonth } from '$lib/calendar';
  import type { PageData } from './$types';

  export let data: PageData;
  const { events: serverEvents, error: serverError } = data;

  let events = serverEvents.map((e: any) => ({
    ...e,
    start: new Date(e.start),
    end: new Date(e.end)
  }));
  let loading = false;
  let error = serverError;

  let currentDate = new Date();
  let currentMonth: Date;
  $: currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  $: upcomingEvents = getUpcomingEvents(events, 10);

  $: calendarDays = generateCalendarDays(currentMonth);

  function goPrevMonth() {
    currentDate = prevMonth(currentDate);
  }

  function goNextMonth() {
    currentDate = nextMonth(currentDate);
  }

</script>

<svelte:head>
  <title>Calendar | SLHS CS Club</title>
  <meta name="description" content="Upcoming events for the Seven Lakes High School Computer Science Club." />
</svelte:head>

<Shell activePage="calendar">
  <section class="section cal-hero">
    <div class="container">
      <h1 class="page-title">Calendar</h1>
      <p class="page-subtitle">All our events in one place. We meet every Monday at 2:45 PM in Room 1001.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">Upcoming Events</h2>
      {#if loading}
        <div class="loading-state">Loading events from calendar...</div>
      {:else if error}
        <div class="error-state">Unable to load calendar. Make sure your calendar is public.</div>
      {:else if upcomingEvents.length === 0}
        <div class="empty-state">No upcoming events found.</div>
      {:else}
        <div class="events-list">
          {#each upcomingEvents as event}
            {@const type = getEventType(event.summary, event.description)}
            <div class="event-row {getEventColor(type)}">
              <span class="event-date">{formatEventDate(event.start)}</span>
              <div class="event-details">
                <strong>{event.summary}</strong>
                {#if event.description}
                  <p>{event.description}</p>
                {/if}
              </div>
              <span class="event-type">{type}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  <section class="section calendar-section">
    <div class="container">
      <div class="calendar-wrapper">
        <div class="calendar-header">
          <button class="nav-btn" on:click={goPrevMonth} aria-label="Previous month">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <h2 class="calendar-title">{formatMonth(currentMonth)}</h2>
          <button class="nav-btn" on:click={goNextMonth} aria-label="Next month">
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
                        <div class="day-event {getEventColor(type)}" title="{event.summary}">
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
  </section>

  <section class="section">
    <div class="container cta-card color-orange">
      <h2 class="section-title">Add to Your Calendar</h2>
      <p class="section-lead">Subscribe to our Google Calendar to get updates directly in your own calendar app.</p>
      <div class="cta-actions">
        <a class="btn btn-primary" href="https://calendar.google.com" target="_blank"><i class="fa-brands fa-google"></i> Open Google Calendar</a>
        <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Discord for Updates</a>
      </div>
    </div>
  </section>
</Shell>

<style>
  .cal-hero {
    text-align: center;
    padding: 6rem 0 2rem;
  }
  .cal-hero .page-subtitle { margin-left: auto; margin-right: auto; }

  .loading-state, .error-state, .empty-state {
    padding: 1.2rem;
    border: 3px solid var(--color-orange);
    background: var(--color-surface);
    box-shadow: var(--orange-shadow);
    text-align: center;
  }

  .events-list { display: grid; gap: 0.75rem; }

  .event-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.2rem;
    border: 3px solid var(--accent, var(--color-orange));
    background: var(--accent, var(--color-surface));
    color: var(--accent-text, var(--color-white));
  }

  .event-date { font-weight: 800; font-size: 1.1rem; min-width: 80px; }
  .event-details strong { display: block; margin-bottom: 0.15rem; }
  .event-details p { margin: 0; opacity: 0.85; font-size: 0.9rem; }

  .event-type {
    padding: 0.25rem 0.5rem;
    border: 2px solid currentColor;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .calendar-section {
    padding-top: 0;
  }

  .calendar-wrapper {
    max-width: 900px;
    margin: 0 auto;
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
    border: 3px solid var(--color-text);
    background: var(--color-bg);
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
    border: 3px solid var(--color-orange);
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
    background: var(--color-orange);
  }

  .calendar-day {
    min-height: 120px;
    background: var(--color-bg);
    padding: 0.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
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
    font-size: 0.75rem;
    font-weight: 600;
    border: 2px solid;
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

  .day-event.color-orange {
    border-color: var(--color-orange);
    background: var(--color-orange);
    color: var(--color-black);
  }

  .day-event.color-blue {
    border-color: var(--color-blue);
    background: var(--color-blue);
    color: var(--color-white);
  }

  .day-event.more {
    border-color: var(--color-text-muted);
    background: transparent;
    color: var(--color-text-muted);
  }

  .cta-card {
    padding: 2.4rem;
    text-align: center;
    background: var(--color-surface);
  }
  .cta-actions { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
  .cta-card .section-title, .cta-card .section-lead { margin-left: auto; margin-right: auto; }

  @media (max-width: 768px) {
    .event-row { grid-template-columns: 1fr; }
    
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