// HaYom Yom daily entries keyed by hebcal month-day
import data from './hayom-yom.json';

export const hayomYomData: Record<string, { header: string; text: string }> = data as any;
