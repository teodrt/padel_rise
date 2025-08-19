export type SessionType = 'match' | 'training';

export interface PadelSession {
  id: string;              // crypto.randomUUID()
  date: string;            // ISO, es: 2025-08-18
  type: SessionType;
  durationMin?: number;    // minuti allenamento
  setsWon?: number;        // match
  setsLost?: number;       // match
  winners?: number;        // vincenti
  unforcedErrors?: number; // errori non forzati
  notes?: string;
}
