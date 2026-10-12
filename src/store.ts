
export type DiscIcon = 'alarm' | 'checklist' | 'plusCircle' | 'tray' | 'gear' | 'at';

export type Task = {
  id: string;
  title: string;
  sub: string;
  start: number | null;
  duration: number;
  icon: DiscIcon;
  scheduled: boolean;
  done: boolean;
  recurring: boolean;
  hasNotes: boolean;
  note: string;
  checklist?: { done: number; total: number };
  rangeLabel?: string;
  noteAccent?: [number, number] | null;
};

export const durationPresets = [1, 15, 30, 45, 60, 90];

const t = (
  id: string,
  title: string,
  sub: string,
  start: number | null,
  duration: number,
  icon: DiscIcon,
  extra: Partial<Task> = {}
): Task => ({
  id,
  title,
  sub,
  start,
  duration,
  icon,
  scheduled: start !== null,
  done: false,
  recurring: false,
  hasNotes: false,
  note: '',
  ...extra,
});

export const initialTasks: Task[] = [
  t('rise', 'Rise and Shine', '08:00 AM', 8 * 60, 30, 'alarm', {
    recurring: true,
    hasNotes: true,
    note: 'Brief calm for 4m, then go!',
  }),
  t('guide-start', 'Get Started with Structured!', 'Tap here to learn the basics', null, 30, 'checklist', {
    hasNotes: true,
  }),
  t('guide-first', 'Add Your First Task', 'Start structuring your day', null, 30, 'plusCircle', {
    hasNotes: true,
    checklist: { done: 0, total: 5 },
  }),
  t('guide-inbox', 'Fill Your Inbox', "Don't forget anything", null, 30, 'tray', { hasNotes: true }),
  t('guide-own', 'Make It Your Own', 'Adjust colors and more', null, 30, 'gear', { hasNotes: true }),
];

export const planningHint = 'Unlock potential in 2h 25m. Plan it.';

const weeklyReview = t('teamSync', 'Weekly review', '07:45 - 08:15 PM (30m)', 19 * 60 + 45, 30, 'at', {
  rangeLabel: '07:45 - 08:15 PM (30m)',
});

const riseS2: Task = { ...initialTasks[0], note: 'Brief calm for 0m, then go!' };

export const s2Tasks: Task[] = [riseS2, ...initialTasks.slice(1), weeklyReview];

const riseDone: Task = { ...riseS2, note: 'Log how the pause felt.', noteAccent: null };
const weeklyReviewDone: Task = { ...weeklyReview, done: true };
export const s7Tasks: Task[] = [riseDone, ...initialTasks.slice(1), weeklyReviewDone];

const eveningWalk = t('grocery', 'Evening walk', '08:15 - 08:30 PM (15m)', 20 * 60 + 15, 15, 'at', {
  rangeLabel: '08:15 - 08:30 PM (15m)',
});
export const s10Tasks: Task[] = [...s7Tasks, eveningWalk];

export const suggestions: { title: string; range: string; icon: 'at' | 'tv' | 'people' | 'run' }[] = [
  { title: 'Answer Emails', range: '07:45 PM - 08:00 PM (15m)', icon: 'at' },
  { title: 'Watch a Movie', range: '07:45 PM - 09:15 PM (90m)', icon: 'tv' },
  { title: 'Meet with Friends', range: '07:00 PM - 07:10 PM (10m)', icon: 'people' },
  { title: 'Go for a Run!', range: '07:45 PM - 08:30 PM (45m)', icon: 'run' },
];

export const titlePlaceholder = 'Answer Emails';

export const formatClock = (minutes: number): string => {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const suffix = h24 < 12 ? 'AM' : 'PM';
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')} ${suffix}`;
};

export const formatPill = (minutes: number): string => {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const suffix = h24 < 12 ? 'AM' : 'PM';
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')} ${suffix}`;
};

export const formatGutter = (minutes: number): string => {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, '0')}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  if (minutes === 60) return '1h';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 30 ? `${h},5h` : `${h}h`;
};

export const formatRange = (start: number, duration: number): string =>
  `${formatClock(start).slice(0, 5)} - ${formatClock(start + duration)} (${formatDuration(duration)})`;
