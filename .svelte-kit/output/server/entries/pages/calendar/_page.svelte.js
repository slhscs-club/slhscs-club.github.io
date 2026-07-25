import { a4 as head, a8 as bind_props, a9 as ensure_array_like, a6 as attr_class, e as escape_html, aa as attr, ac as stringify } from "../../../chunks/index.js";
import { S as Shell } from "../../../chunks/Shell.js";
import { g as getEventType, f as formatEventDate, a as getEventColor } from "../../../chunks/ics.js";
function generateCalendarDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  const days = [];
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 42; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);
    days.push({
      day: currentDay.getDate(),
      date: currentDay,
      isCurrentMonth: currentDay.getMonth() === month,
      isToday: currentDay.getTime() === today.getTime()
    });
  }
  return days;
}
function getEventsForDay(day, month, year, events) {
  return events.filter((event) => {
    const eventDate = event.start;
    return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day;
  });
}
function formatMonth(date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
function getUpcomingEvents(events, count = 10) {
  return events.slice().filter((e) => e.start >= /* @__PURE__ */ new Date()).sort((a, b) => a.start.getTime() - b.start.getTime()).slice(0, count);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let upcomingEvents, calendarDays;
    let data = $$props["data"];
    const { events: serverEvents, error: serverError } = data;
    let events = serverEvents.map((e) => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));
    let error = serverError;
    let currentDate = /* @__PURE__ */ new Date();
    let currentMonth;
    currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    upcomingEvents = getUpcomingEvents(events, 10);
    calendarDays = generateCalendarDays(currentMonth);
    head("13luymz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Calendar | SLHS CS Club</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Upcoming events for the Seven Lakes High School Computer Science Club."/>`);
    });
    Shell($$renderer2, {
      activePage: "calendar",
      children: ($$renderer3) => {
        $$renderer3.push(`<section class="section cal-hero svelte-13luymz"><div class="container"><h1 class="page-title">Calendar</h1> <p class="page-subtitle svelte-13luymz">All our events in one place. We meet every Monday at 2:45 PM in Room 1001.</p></div></section> <section class="section"><div class="container"><h2 class="section-title">Upcoming Events</h2> `);
        if (error) {
          $$renderer3.push("<!--[1-->");
          $$renderer3.push(`<div class="error-state svelte-13luymz">Unable to load calendar. Make sure your calendar is public.</div>`);
        } else if (upcomingEvents.length === 0) {
          $$renderer3.push("<!--[2-->");
          $$renderer3.push(`<div class="empty-state svelte-13luymz">No upcoming events found.</div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<div class="events-list svelte-13luymz"><!--[-->`);
          const each_array = ensure_array_like(upcomingEvents);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let event = each_array[$$index];
            const type = getEventType(event.summary, event.description);
            $$renderer3.push(`<div${attr_class(`event-row ${stringify(getEventColor(type))}`, "svelte-13luymz")}><span class="event-date svelte-13luymz">${escape_html(formatEventDate(event.start))}</span> <div class="event-details svelte-13luymz"><strong class="svelte-13luymz">${escape_html(event.summary)}</strong> `);
            if (event.description) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<p class="svelte-13luymz">${escape_html(event.description)}</p>`);
            } else {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]--></div> <span class="event-type svelte-13luymz">${escape_html(type)}</span></div>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]--></div></section> <section class="section calendar-section svelte-13luymz"><div class="container"><div class="calendar-wrapper svelte-13luymz"><div class="calendar-header svelte-13luymz"><button class="nav-btn svelte-13luymz" aria-label="Previous month"><i class="fa-solid fa-chevron-left"></i></button> <h2 class="calendar-title svelte-13luymz">${escape_html(formatMonth(currentMonth))}</h2> <button class="nav-btn svelte-13luymz" aria-label="Next month"><i class="fa-solid fa-chevron-right"></i></button></div> `);
        if (error) {
          $$renderer3.push("<!--[1-->");
          $$renderer3.push(`<div class="error-state svelte-13luymz">Unable to load calendar. Please try again later.</div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<div class="calendar-grid svelte-13luymz"><div class="calendar-weekdays svelte-13luymz"><!--[-->`);
          const each_array_1 = ensure_array_like(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let day = each_array_1[$$index_1];
            $$renderer3.push(`<div class="weekday svelte-13luymz">${escape_html(day)}</div>`);
          }
          $$renderer3.push(`<!--]--></div> <div class="calendar-days svelte-13luymz"><!--[-->`);
          const each_array_2 = ensure_array_like(calendarDays);
          for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
            let { day, date, isCurrentMonth, isToday } = each_array_2[$$index_3];
            const dayEvents = getEventsForDay(day, date.getMonth(), date.getFullYear(), events);
            $$renderer3.push(`<div${attr_class(`calendar-day ${isCurrentMonth ? "" : "other-month"} ${isToday ? "today" : ""}`, "svelte-13luymz")}><span class="day-number svelte-13luymz">${escape_html(day)}</span> `);
            if (dayEvents.length > 0) {
              $$renderer3.push("<!--[0-->");
              $$renderer3.push(`<div class="day-events svelte-13luymz"><!--[-->`);
              const each_array_3 = ensure_array_like(dayEvents.slice(0, 3));
              for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                let event = each_array_3[$$index_2];
                const type = getEventType(event.summary, event.description);
                $$renderer3.push(`<div${attr_class(`day-event ${stringify(getEventColor(type))}`, "svelte-13luymz")}${attr("title", event.summary)}>${escape_html(event.summary.length > 12 ? event.summary.substring(0, 12) + "…" : event.summary)}</div>`);
              }
              $$renderer3.push(`<!--]--> `);
              if (dayEvents.length > 3) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<div class="day-event more svelte-13luymz">+${escape_html(dayEvents.length - 3)} more</div>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]--></div>`);
            } else {
              $$renderer3.push("<!--[-1-->");
            }
            $$renderer3.push(`<!--]--></div>`);
          }
          $$renderer3.push(`<!--]--></div></div>`);
        }
        $$renderer3.push(`<!--]--></div></div></section> <section class="section"><div class="container cta-card color-orange svelte-13luymz"><h2 class="section-title svelte-13luymz">Add to Your Calendar</h2> <p class="section-lead svelte-13luymz">Subscribe to our Google Calendar to get updates directly in your own calendar app.</p> <div class="cta-actions svelte-13luymz"><a class="btn btn-primary" href="https://calendar.google.com" target="_blank"><i class="fa-brands fa-google"></i> Open Google Calendar</a> <a class="btn btn-secondary" href="https://discord.com/invite/eCRC3TCs"><i class="fa-brands fa-discord"></i> Discord for Updates</a></div></div></section>`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
