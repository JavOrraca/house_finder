import * as chrono from 'chrono-node';
import type { DateRange } from './types';

// Helper functions
function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addHours(date: Date, hours: number): Date {
  const d = new Date(date);
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  return d;
}

function setHours(date: Date, hours: number): Date {
  const d = new Date(date);
  d.setHours(hours, 0, 0, 0);
  return d;
}

function getNextDayOfWeek(date: Date, dayOfWeek: number): Date {
  const d = new Date(date);
  const currentDay = d.getDay();
  let diff = dayOfWeek - currentDay;

  // If today is the target day or we've passed it, get next week's
  if (diff < 0) {
    diff += 7;
  }

  d.setDate(d.getDate() + diff);
  return startOfDay(d);
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function startOfMonth(date: Date): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfMonth(date: Date): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function parseNaturalDate(input: string, referenceDate?: Date): DateRange | null {
  const ref = referenceDate || new Date();
  const normalizedInput = input.toLowerCase().trim();

  // Handle special keywords first
  if (normalizedInput === 'today') {
    return { start: startOfDay(ref), end: endOfDay(ref) };
  }

  if (normalizedInput === 'tonight') {
    const start = setHours(ref, 18); // 6 PM
    const end = addHours(startOfDay(addDays(ref, 1)), 6); // 6 AM next day
    return { start, end };
  }

  if (normalizedInput === 'tomorrow') {
    const tomorrow = addDays(ref, 1);
    return { start: startOfDay(tomorrow), end: endOfDay(tomorrow) };
  }

  if (normalizedInput === 'this weekend' || normalizedInput === 'weekend') {
    const friday = getNextDayOfWeek(ref, 5); // Friday
    const monday = addDays(friday, 3);
    return {
      start: setHours(friday, 18), // Friday 6 PM
      end: addHours(startOfDay(monday), 6) // Monday 6 AM
    };
  }

  if (normalizedInput === 'next weekend') {
    // Get this friday first
    let friday = getNextDayOfWeek(ref, 5);
    // If we're already past Wednesday, "next weekend" means the weekend after this one
    if (ref.getDay() >= 4) { // Thursday or later
      friday = addDays(friday, 7);
    } else {
      // Otherwise skip to the following weekend
      friday = addDays(friday, 7);
    }
    const monday = addDays(friday, 3);
    return {
      start: setHours(friday, 18),
      end: addHours(startOfDay(monday), 6)
    };
  }

  if (normalizedInput === 'this week') {
    const endOfWeek = getNextDayOfWeek(ref, 0); // Next Sunday
    return { start: ref, end: endOfDay(endOfWeek) };
  }

  if (normalizedInput === 'next week') {
    const nextMonday = getNextDayOfWeek(addDays(ref, 7), 1);
    const nextSunday = addDays(nextMonday, 6);
    return { start: startOfDay(nextMonday), end: endOfDay(nextSunday) };
  }

  if (normalizedInput === 'this month') {
    return { start: ref, end: endOfMonth(ref) };
  }

  if (normalizedInput === 'next month') {
    const nextMonth = addMonths(ref, 1);
    return { start: startOfMonth(nextMonth), end: endOfMonth(nextMonth) };
  }

  // Handle "next [day]" patterns
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const nextDayMatch = normalizedInput.match(/^next\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/);
  if (nextDayMatch) {
    const dayIndex = dayNames.indexOf(nextDayMatch[1]);
    const targetDay = getNextDayOfWeek(addDays(ref, 1), dayIndex);
    return { start: startOfDay(targetDay), end: endOfDay(targetDay) };
  }

  // Fall back to chrono-node for complex parsing
  const parsed = chrono.parse(input, ref);

  if (parsed.length === 0) {
    return null;
  }

  const result = parsed[0];
  const start = result.start.date();
  const end = result.end ? result.end.date() : endOfDay(start);

  return { start, end };
}

export function formatDateRange(range: DateRange): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };

  const startStr = range.start.toLocaleDateString('en-US', options);
  const endStr = range.end.toLocaleDateString('en-US', options);

  if (startStr === endStr) {
    return startStr.toUpperCase();
  }

  return `${startStr} - ${endStr}`.toUpperCase();
}
