// Itinerary templates: durations derived from the data and checked for consistency.
import type { Itinerary } from "./extras";

export type DurationCheck = { days: number; nights: number; issues: string[] };

/** Days come from the day plan; nights from the stops (multi-stay) or the template. Mismatches are reported, never hidden. */
export function checkDuration(t: Itinerary): DurationCheck {
  const issues: string[] = [];
  const days = t.plan.length || t.days;
  const stopNights = t.stops?.length ? t.stops.reduce((n, s) => n + (s.nights || 0), 0) : undefined;
  const nights = stopNights ?? t.nights;
  if (t.plan.length && t.days && t.plan.length !== t.days) issues.push(`day plan has ${t.plan.length} days but the template says ${t.days}`);
  if (stopNights !== undefined && stopNights !== t.nights) issues.push(`stops add up to ${stopNights} nights but the template says ${t.nights}`);
  if (nights !== days - 1) issues.push(`${days} days should mean ${days - 1} nights, not ${nights}`);
  return { days, nights, issues };
}

export const durationBand = (days: number) => (days <= 4 ? "A few days (up to 4)" : days <= 7 ? "About a week (5–7)" : "A longer chapter (8+)");
export const DURATION_BANDS = ["A few days (up to 4)", "About a week (5–7)", "A longer chapter (8+)"];
