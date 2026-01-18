import type { Event, TimeOfDay, DateRange } from './types';

/**
 * Classifies an event as DAY or NIGHT based on start time.
 * DAY: Events starting between 6:00 AM and 5:59 PM (06:00 - 17:59)
 * NIGHT: Events starting between 6:00 PM and 5:59 AM (18:00 - 05:59)
 */
export function classifyEvent(event: Event): TimeOfDay {
  const startTime = new Date(event.datetime);
  const hour = startTime.getHours();

  // DAY: 6 AM (6) to 5:59 PM (17)
  // NIGHT: 6 PM (18) to 5:59 AM (5)
  if (hour >= 6 && hour < 18) {
    return 'DAY';
  }
  return 'NIGHT';
}

/**
 * Filter events by time of day classification
 */
export function filterByTimeOfDay(
  events: Event[],
  filter: TimeOfDay | 'ALL'
): Event[] {
  if (filter === 'ALL') {
    return events;
  }
  return events.filter(event => classifyEvent(event) === filter);
}

/**
 * Filter events by city
 */
export function filterByCity(events: Event[], cityId: string): Event[] {
  return events.filter(event => event.city === cityId);
}

/**
 * Filter events by date range
 */
export function filterByDateRange(events: Event[], range: DateRange): Event[] {
  return events.filter(event => {
    const eventDate = new Date(event.datetime);
    return eventDate >= range.start && eventDate <= range.end;
  });
}

/**
 * Sort events by datetime
 */
export function sortEventsByDate(events: Event[]): Event[] {
  return [...events].sort((a, b) =>
    new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );
}

/**
 * Format event time for display
 */
export function formatEventTime(event: Event): string {
  const start = new Date(event.datetime);
  const end = event.endTime ? new Date(event.endTime) : null;

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };

  const dateStr = start.toLocaleDateString('en-US', dateOptions);
  const startTimeStr = start.toLocaleTimeString('en-US', timeOptions);

  if (end) {
    const endTimeStr = end.toLocaleTimeString('en-US', timeOptions);
    return `${dateStr} | ${startTimeStr} - ${endTimeStr}`;
  }

  return `${dateStr} | ${startTimeStr}`;
}

/**
 * Get count of DAY and NIGHT events
 */
export function getEventCounts(events: Event[]): { day: number; night: number; total: number } {
  const day = events.filter(e => classifyEvent(e) === 'DAY').length;
  const night = events.filter(e => classifyEvent(e) === 'NIGHT').length;
  return { day, night, total: events.length };
}
