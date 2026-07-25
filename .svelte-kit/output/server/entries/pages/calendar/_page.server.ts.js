import { p as parseICS } from "../../../chunks/ics.js";
const ICS_URL = "https://calendar.google.com/calendar/ical/bee0a4ff591a63c015084a9d2770b82ca06813f1c223c6077b688f537cc6cde1%40group.calendar.google.com/public/basic.ics";
const load = async () => {
  let events = [];
  let error = false;
  try {
    const response = await fetch(ICS_URL);
    if (!response.ok) throw new Error("Failed to fetch calendar");
    const icsText = await response.text();
    events = parseICS(icsText);
  } catch (e) {
    console.error("Could not fetch calendar events:", e);
    error = true;
  }
  return {
    events: events.map((e) => ({
      uid: e.uid,
      summary: e.summary,
      description: e.description,
      location: e.location,
      start: e.start.toISOString(),
      end: e.end.toISOString()
    })),
    error
  };
};
export {
  load
};
