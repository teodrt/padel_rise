'use client';

import { useState } from 'react';
import type { PadelSession, SessionType } from '@/types';

type Props = { onAdd: (s: PadelSession) => void };

export default function PadelForm({ onAdd }: Props) {
  const [type, setType] = useState<SessionType>('training');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [durationMin, setDurationMin] = useState<number>(60);
  const [setsWon, setSetsWon] = useState<number>(0);
  const [setsLost, setSetsLost] = useState<number>(0);
  const [winners, setWinners] = useState<number>(0);
  const [unforcedErrors, setUnforcedErrors] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const session: PadelSession = {
      id: crypto.randomUUID(),
      date,
      type,
      durationMin: type === 'training' ? durationMin : undefined,
      setsWon: type === 'match' ? setsWon : undefined,
      setsLost: type === 'match' ? setsLost : undefined,
      winners: winners || 0,
      unforcedErrors: unforcedErrors || 0,
      notes
    };
    onAdd(session);
    if (type === 'training') setDurationMin(60);
    else { setSetsWon(0); setSetsLost(0); }
    setWinners(0); setUnforcedErrors(0); setNotes('');
  }

  return (
    <form onSubmit={submit} className="grid gap-4 p-4 rounded-2xl border shadow-sm">
      <div className="flex gap-3 items-center">
        <label className="font-medium">Tipo</label>
        <select value={type} onChange={e=>setType(e.target.value as SessionType)} className="border rounded px-2 py-1">
          <option value="training">Allenamento</option>
          <option value="match">Partita</option>
        </select>
        <label className="ml-4 font-medium">Data</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border rounded px-2 py-1" />
      </div>
      {type === 'training' ? (
        <div>
          <label className="block text-sm">Durata (min)</label>
          <input type="number" min={0} value={durationMin} onChange={e=>setDurationMin(+e.target.value)} className="border rounded px-2 py-1 w-28" />
        </div>
      ) : (
        <div className="flex gap-4">
          <div>
            <label className="block text-sm">Set vinti</label>
            <input type="number" min={0} value={setsWon} onChange={e=>setSetsWon(+e.target.value)} className="border rounded px-2 py-1 w-20" />
          </div>
          <div>
            <label className="block text-sm">Set persi</label>
            <input type="number" min={0} value={setsLost} onChange={e=>setSetsLost(+e.target.value)} className="border rounded px-2 py-1 w-20" />
          </div>
        </div>
      )}
      <div className="flex gap-4">
        <div>
          <label className="block text-sm">Winners</label>
          <input type="number" min={0} value={winners} onChange={e=>setWinners(+e.target.value)} className="border rounded px-2 py-1 w-24" />
        </div>
        <div>
          <label className="block text-sm">Errori non forzati</label>
          <input type="number" min={0} value={unforcedErrors} onChange={e=>setUnforcedErrors(+e.target.value)} className="border rounded px-2 py-1 w-24" />
        </div>
      </div>
      <div>
        <label className="block text-sm">Note</label>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={2} className="border rounded px-2 py-1 w-full" />
      </div>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded-xl">Aggiungi sessione</button>
    </form>
  );
}
