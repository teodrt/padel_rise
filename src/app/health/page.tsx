"use client";
import { useEffect, useState } from "react";

export default function HealthPage() {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setErr(String(e)));
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>PadelRise · Health</h1>
      {err && <pre>{err}</pre>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </main>
  );
}


