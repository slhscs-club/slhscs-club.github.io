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

  let currentEvent: Partial<ICSEvent> | null = null;
  let currentKey: string | null = null;
  let currentValue = '';

  function flushProperty() {
    if (currentKey && currentValue !== '') {
      if (currentKey === 'DTSTART') {
        currentEvent!.start = parseICSDate(currentValue);
      } else if (currentKey === 'DTEND') {
        currentEvent!.end = parseICSDate(currentValue);
      } else if (currentKey === 'SUMMARY') {
        currentEvent!.summary = decodeICSText(currentValue);
      } else if (currentKey === 'DESCRIPTION') {
        currentEvent!.description = decodeICSText(currentValue);
      } else if (currentKey === 'LOCATION') {
        currentEvent!.location = decodeICSText(currentValue);
      } else if (currentKey === 'UID') {
        currentEvent!.uid = currentValue;
      }
    }
    currentKey = null;
    currentValue = '';
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === 'BEGIN:VEVENT') {
      flushProperty();
      currentEvent = {};
    } else if (line === 'END:VEVENT') {
      flushProperty();
      if (currentEvent && currentEvent.uid && currentEvent.summary && currentEvent.start) {
        events.push(currentEvent as ICSEvent);
      }
      currentEvent = null;
    } else if (line.startsWith(' ') || line.startsWith('\t')) {
      currentValue += line.substring(1);
    } else if (currentEvent) {
      flushProperty();
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const keyPart = line.substring(0, colonIndex);
        currentValue = line.substring(colonIndex + 1);
        const semiIndex = keyPart.indexOf(';');
        currentKey = semiIndex !== -1 ? keyPart.substring(0, semiIndex) : keyPart;
      }
    }
  }

  return events;
}

function parseICSDate(value: string): Date {
  const dateStr = value.replace(/[^0-9]/g, '');
  
  if (value.includes('T') && dateStr.length >= 14) {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    const hour = parseInt(dateStr.substring(8, 10)) || 0;
    const minute = parseInt(dateStr.substring(10, 12)) || 0;
    const second = parseInt(dateStr.substring(12, 14)) || 0;
    
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  } else {
    const year = parseInt(value.substring(0, 4));
    const month = parseInt(value.substring(4, 6)) - 1;
    const day = parseInt(value.substring(6, 8));
    return new Date(year, month, day);
  }
}

function decodeICSText(text: string): string {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\N/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getEventType(summary: string, description?: string): string {
  const lower = (summary + ' ' + (description || '')).toLowerCase();
  if (lower.includes('contest') || lower.includes('competition')) return 'contest';
  if (lower.includes('cp') || lower.includes('competitive') || lower.includes('practice') || lower.includes('uil')) return 'cp';
  if (lower.includes('social') || lower.includes('camp') || lower.includes('socials')) return 'social';
  if (lower.includes('speaker') || lower.includes('workshop')) return 'special';
  return 'meeting';
}

export function getEventColor(type: string): string {
  if (type === 'cp' || type === 'special') return 'color-blue';
  return 'color-orange';
}