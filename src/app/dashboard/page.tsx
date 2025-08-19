'use client';

import { useEffect, useMemo, useState } from 'react';
import PadelForm from '@/components/PadelForm';
import PadelChart from '@/components/PadelChart';
import type { PadelSession } from '@/types';
import { loadSessions, saveSessions, clearSessions } from '@/lib/storage';

export default function Dashboard() {
  const [sessions, setSessions] = useState<PadelSession[]>([]);

  useEffect(() => { setSessions(loadSessions()); }, []);
  useEffect(() => { saveSessions(sessions); }, [sessions]);

  const totals = useMemo(() => {
    const total = sessions.length;
    const sumW = sessions.reduce((a,s)=>a+(s.winners??0),0);
    const sumE = sessions.reduce((a,s)=>a+(s.unforcedErrors??0),0);
    const matches = sessions.filter(s=>s.setsWon!=null || s.setsLost!=null);
    const wins = matches.filter(s=>(s.setsWon??0)>(s.setsLost??0)).length;
    const winrate = matches.length ? Math.round((wins/matches.length)*100) : 0;
    return { total, sumW, sumE, winrate };
  }, [sessions]);

  function addSession(s: PadelSession) {
    setSessions(prev => [s, ...prev]);
  }

  function resetAll() {
    if (confirm('Cancellare tutte le sessioni?')) {
      clearSessions();
      setSessions([]);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">PadelRise – Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border p-4"><div className="text-sm text-gray-500">Sessioni</div><div className="text-2xl font-semibold">{totals.total}</div></div>
        <div className="rounded-2xl border p-4"><div className="text-sm text-gray-500">Winners totali</div><div className="text-2xl font-semibold">{totals.sumW}</div></div>
        <div className="rounded-2xl border p-4"><div className="text-sm text-gray-500">Errori totali</div><div className="text-2xl font-semibold">{totals.sumE}</div></div>
        <div className="rounded-2xl border p-4"><div className="text-sm text-gray-500">Win rate</div><div className="text-2xl font-semibold">{totals.winrate}%</div></div>
      </div>
      <PadelForm onAdd={addSession} />
      <PadelChart data={sessions} />
      <div className="rounded-2xl border">
        <div className="flex items-center justify-between p-4">
          <h2 className="font-semibold">Storico</h2>
          <button onClick={resetAll} className="text-sm underline">Reset dati</button>
        </div>
        <ul className="divide-y">
          {sessions.map(s=>(
            <li key={s.id} className="p-4 flex flex-wrap gap-4 text-sm">
              <span className="font-medium">{s.date}</span>
              <span className="px-2 py-0.5 rounded-full border">{s.type}</span>
              {s.durationMin!=null && <span>{s.durationMin} min</span>}
              {(s.setsWon!=null || s.setsLost!=null) && <span>{s.setsWon ?? 0}-{s.setsLost ?? 0} set</span>}
              <span>W: {s.winners ?? 0}</span>
              <span>E: {s.unforcedErrors ?? 0}</span>
              {s.notes && <span className="text-gray-600 italic">"{s.notes}"</span>}
            </li>
          ))}
          {sessions.length === 0 && <li className="p-4 text-gray-500">Nessuna sessione ancora.</li>}
        </ul>
      </div>
    </div>
  );
}
