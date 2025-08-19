'use client';

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import type { PadelSession } from '@/types';
import { format } from 'date-fns';

type Props = { data: PadelSession[] };

export default function PadelChart({ data }: Props) {
  const series = [...data]
    .sort((a,b)=>a.date.localeCompare(b.date))
    .map(s => ({
      date: format(new Date(s.date), 'dd/MM'),
      diff: (s.winners ?? 0) - (s.unforcedErrors ?? 0),
      winners: s.winners ?? 0,
      errors: s.unforcedErrors ?? 0
    }));

  return (
    <div className="h-80 w-full rounded-2xl border p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="diff" />
          <Line type="monotone" dataKey="winners" />
          <Line type="monotone" dataKey="errors" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
