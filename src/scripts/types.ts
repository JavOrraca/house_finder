export interface City {
  id: string;
  name: string;
  state: string;
  aliases: string[];
  center: { lat: number; lng: number };
  zoom: number;
}

export interface Venue {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Event {
  id: string;
  name: string;
  venue: Venue;
  artists: string[];
  promoters: string[];
  datetime: string;
  endTime?: string;
  cost: string;
  link: string;
  city: string;
}

export interface EventsData {
  lastUpdated: string;
  events: Event[];
}

export interface CitiesData {
  cities: City[];
}

export type TimeOfDay = 'DAY' | 'NIGHT';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface MatchResult {
  type: 'exact' | 'multiple' | 'none';
  cities: City[];
}
