import { useState, useEffect, useCallback } from 'react';
import { storage, PadelSession } from './storage';

export function useSessions() {
  const [sessions, setSessions] = useState<PadelSession[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    thisMonth: 0,
    avgRating: 0,
    topSkill: 'N/A',
    improvement: 0
  });

  const loadSessions = useCallback(() => {
    const loadedSessions = storage.loadSessions();
    setSessions(loadedSessions);
    setStats(storage.getStats());
  }, []);

  const addSession = useCallback((sessionData: Omit<PadelSession, 'id' | 'createdAt'>) => {
    const newSession = storage.addSession(sessionData);
    loadSessions(); // Ricarica i dati
    return newSession;
  }, [loadSessions]);

  const deleteSession = useCallback((id: string) => {
    storage.deleteSession(id);
    loadSessions(); // Ricarica i dati
  }, [loadSessions]);

  const clearAllSessions = useCallback(() => {
    storage.clearSessions();
    loadSessions(); // Ricarica i dati
  }, [loadSessions]);

  useEffect(() => {
    loadSessions();

    // Ascolta cambiamenti nel localStorage
    const handleStorageChange = () => {
      loadSessions();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Ascolta anche i cambiamenti locali (per aggiornamenti in tempo reale)
    const handleCustomStorageChange = () => {
      loadSessions();
    };

    window.addEventListener('padelrise-storage-change', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('padelrise-storage-change', handleCustomStorageChange);
    };
  }, [loadSessions]);

  return {
    sessions,
    stats,
    addSession,
    deleteSession,
    clearAllSessions,
    refresh: loadSessions
  };
}
