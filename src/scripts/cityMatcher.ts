import type { City, CitiesData, MatchResult } from './types';
import citiesData from '../data/cities.json';

const cities: City[] = (citiesData as CitiesData).cities;

export function matchCity(input: string): MatchResult {
  const normalizedInput = input.toLowerCase().trim();

  if (!normalizedInput) {
    return { type: 'none', cities: [] };
  }

  // First, check for exact alias match
  const exactMatches = cities.filter(city =>
    city.aliases.some(alias => alias.toLowerCase() === normalizedInput)
  );

  if (exactMatches.length === 1) {
    return { type: 'exact', cities: exactMatches };
  }

  if (exactMatches.length > 1) {
    return { type: 'multiple', cities: exactMatches };
  }

  // Partial match - check if input is contained in any alias or city name
  const partialMatches = cities.filter(city =>
    city.aliases.some(alias =>
      alias.toLowerCase().includes(normalizedInput) ||
      normalizedInput.includes(alias.toLowerCase())
    ) ||
    city.name.toLowerCase().includes(normalizedInput)
  );

  if (partialMatches.length === 1) {
    return { type: 'exact', cities: partialMatches };
  }

  if (partialMatches.length > 1) {
    return { type: 'multiple', cities: partialMatches };
  }

  return { type: 'none', cities: [] };
}

export function getAllCities(): City[] {
  return cities;
}

export function getCityById(id: string): City | undefined {
  return cities.find(city => city.id === id);
}

export function formatCityDisplay(city: City): string {
  return `${city.name}, ${city.state}`;
}
