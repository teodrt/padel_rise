import { PadelSession } from '@/types';

const KEY = 'padel_sessions_v1';

export function loadSessions(): PadelSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PadelSession[]) : [];
  } catch {
    return [];
  }
}

export function saveSessions(list: PadelSession[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function clearSessions() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
