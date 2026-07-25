export interface CalendarDay {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function generateCalendarDays(date: Date): CalendarDay[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const days: CalendarDay[] = [];
  const today = new Date();
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

export function getEventsForDay<T extends { start: Date }>(day: number, month: number, year: number, events: T[]): T[] {
  return events.filter((event) => {
    const eventDate = event.start;
    return eventDate.getFullYear() === year &&
           eventDate.getMonth() === month &&
           eventDate.getDate() === day;
  });
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function getUpcomingEvents<T extends { start: Date }>(events: T[], count: number = 10): T[] {
  return events
    .slice()
    .filter((e) => e.start >= new Date())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, count);
}

export function prevMonth(currentDate: Date): Date {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
}

export function nextMonth(currentDate: Date): Date {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
}