import { parse, addWeeks, addMonths } from 'date-fns';

export type ICSEvent = {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
};

export function parseICS(icsText: string): ICSEvent[] {
  const events: ICSEvent[] = [];
  const lines = icsText.replace(/\r\n/g, '\n').split('\n');

  let cur: Record<string, string> | null = null;
  let key: string | null = null;
  let val = '';

  function flush() {
    if (key && val !== '' && cur) {
      if (key === 'EXDATE' && cur[key]) {
        cur[key] += ',' + val;
      } else {
        cur[key] = val;
      }
    }
    key = null;
    val = '';
  }

  for (const raw of lines) {
    const line = raw.trim();

    if (line === 'BEGIN:VEVENT') {
      flush();
      cur = {};
    } else if (line === 'END:VEVENT') {
      flush();
      if (cur && cur.UID && cur.SUMMARY && cur.DTSTART) {
        events.push(...expand(cur));
      }
      cur = null;
    } else if (line.startsWith(' ') || line.startsWith('\t')) {
      val += line.substring(1);
    } else if (cur) {
      flush();
      const ci = line.indexOf(':');
      if (ci !== -1) {
        const kp = line.substring(0, ci);
        val = line.substring(ci + 1);
        const si = kp.indexOf(';');
        key = si !== -1 ? kp.substring(0, si) : kp;
      }
    }
  }

  return events;
}

function expand(props: Record<string, string>): ICSEvent[] {
  const start = parseDate(props.DTSTART);
  const end = props.DTEND ? parseDate(props.DTEND) : new Date(start.getTime() + 3600000);
  const dur = end.getTime() - start.getTime();

  const exDates: Date[] = [];
  if (props.EXDATE) {
    for (const part of props.EXDATE.split(',')) {
      const ci = part.lastIndexOf(':');
      exDates.push(parseDate(ci !== -1 ? part.substring(ci + 1) : part));
    }
  }

  if (props.RRULE) {
    try {
      const occs = expandRRule(props.DTSTART, props.RRULE);
      return occs
        .filter((d) => !exDates.some((ex) =>
          ex.getFullYear() === d.getFullYear() &&
          ex.getMonth() === d.getMonth() &&
          ex.getDate() === d.getDate()
        ))
        .map((d) => ({
          uid: props.UID + '_' + d.getTime(),
          summary: props.SUMMARY || '',
          description: props.DESCRIPTION,
          location: props.LOCATION,
          start: d,
          end: new Date(d.getTime() + dur),
        }));
    } catch {
      // fall through
    }
  }

  return [{
    uid: props.UID,
    summary: props.SUMMARY || '',
    description: props.DESCRIPTION,
    location: props.LOCATION,
    start,
    end,
  }];
}

function expandRRule(dtstart: string, rrule: string): Date[] {
  const startDate = parseDate(dtstart);
  const p = parseRRule(rrule);
  const res: Date[] = [];

  const until = p.until ? parseDate(p.until.replace(/T.*/, 'T000000Z')) : null;

  if (p.freq === 'WEEKLY') {
    let cur = new Date(startDate);
    let i = 200;
    while (i-- > 0) {
      if (until && cur > until) break;
      if (p.byday) {
        const dow = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 }[p.byday];
        if (cur.getDay() === dow) res.push(new Date(cur));
      } else {
        res.push(new Date(cur));
      }
      cur = addWeeks(cur, p.interval || 1);
    }
  } else if (p.freq === 'MONTHLY') {
    let cur = new Date(startDate);
    let i = 60;
    while (i-- > 0) {
      if (until && cur > until) break;
      if (p.byday) {
        const m = p.byday.match(/^(-?\d+)([A-Z]+)$/);
        if (m) {
          const day = nthDayOfMonth(cur.getFullYear(), cur.getMonth(), m[2], parseInt(m[1]));
          if (day) {
            res.push(new Date(cur.getFullYear(), cur.getMonth(), day,
              cur.getHours(), cur.getMinutes(), cur.getSeconds()));
          }
        }
      } else {
        res.push(new Date(cur));
      }
      cur = addMonths(cur, p.interval || 1);
    }
  }

  return res;
}

function nthDayOfMonth(year: number, month: number, dayName: string, nth: number): number | null {
  const dow: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
  const target = dow[dayName];
  if (target === undefined) return null;

  if (nth > 0) {
    const first = new Date(year, month, 1);
    let diff = target - first.getDay();
    if (diff < 0) diff += 7;
    const day = 1 + diff + (nth - 1) * 7;
    return day > new Date(year, month + 1, 0).getDate() ? null : day;
  } else {
    const last = new Date(year, month + 1, 0);
    let diff = last.getDay() - target;
    if (diff < 0) diff += 7;
    const day = last.getDate() - diff + (nth + 1) * 7;
    return day < 1 ? null : day;
  }
}

function parseRRule(rrule: string) {
  const parts = rrule.split(';');
  const p: Record<string, string> = {};
  for (const part of parts) {
    const [k, v] = part.split('=');
    p[k] = v;
  }
  return {
    freq: p.FREQ || '',
    interval: p.INTERVAL ? parseInt(p.INTERVAL) : undefined,
    until: p.UNTIL,
    byday: p.BYDAY,
  };
}

function parseDate(value: string): Date {
  const v = value.toUpperCase();
  if (v.includes('T')) {
    return parse(v, v.endsWith('Z') ? "yyyyMMdd'T'HHmmssX" : "yyyyMMdd'T'HHmmss", new Date());
  }
  return parse(v, 'yyyyMMdd', new Date());
}

export function formatEventDate(date: Date): string {
  const now = new Date();
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() !== now.getFullYear() && { year: 'numeric' }),
  });
}

export function getEventType(summary: string, description?: string): string {
  const t = (summary + ' ' + (description || '')).toLowerCase();
  if (/contest|competition/.test(t)) return 'contest';
  if (/competitive|practice|uil/.test(t)) return 'comp prog';
  if (/intro|freshman|spectac|fish camp|orientation/.test(t)) return 'intro';
  if (/social|camp|socials/.test(t)) return 'social';
  if (/speaker|workshop/.test(t)) return 'special';
  return 'meeting';
}

export function getEventColor(type: string): string {
  return 'color-orange';
}
