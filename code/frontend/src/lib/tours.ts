/** The shapes the pages read out of src/data. */
export interface TourRow {
  id: string;
  name: string;
  place: string;
  operator: string;
  price: number;
  duration: string;
  starts: string;
  summary: string;
  meeting: string;
  image: string;
  photos: string[];
  included: string[];
  dates: string[];
  status: string;
}

export interface OperatorRow {
  id: string;
  name: string;
  base: string;
  since: number;
  blurb: string;
}

export interface PlaceRow {
  id: string;
  name: string;
  image: string;
  note: string;
}

export interface BookingRow {
  id: string;
  tour: string;
  traveller: string;
  date: string;
  people: number;
  total: number;
  status: string;
  placed: string;
}

export interface MetricRow {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number;
}

export interface MonthRow {
  id: string;
  month: string;
  bookings: number;
}

/** What a booking in progress is, kept in the browser between the two pages. */
export interface Draft {
  tour: string;
  date: string;
  people: number;
  total: number;
}

const KEY = "tabimarket:draft";

export function saveDraft(d: Draft): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* a private window: the page carries it instead */
  }
}

export function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nothing kept */
  }
}
