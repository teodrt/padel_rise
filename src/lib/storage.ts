export interface PadelSession {
  id: string;
  date: string;
  type: 'TRAINING' | 'MATCH';
  duration: number;
  notes: string;
  skills: {
    technical: Record<string, number>;
    tactical: Record<string, number>;
    physical: Record<string, number>;
    mental: Record<string, number>;
  };
  createdAt: string;
}

const STORAGE_KEY = 'padelrise_sessions';

// Funzione helper per emettere eventi personalizzati
const emitStorageChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('padelrise-storage-change'));
  }
};

export const storage = {
  // Salva sessioni nel localStorage
  saveSessions: (sessions: PadelSession[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      emitStorageChange(); // Emette evento per aggiornamenti in tempo reale
    } catch (error) {
      console.error('Errore nel salvataggio:', error);
    }
  },

  // Carica sessioni dal localStorage
  loadSessions: (): PadelSession[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Errore nel caricamento:', error);
      return [];
    }
  },

  // Aggiunge una nuova sessione
  addSession: (session: Omit<PadelSession, 'id' | 'createdAt'>): PadelSession => {
    const sessions = storage.loadSessions();
    const newSession: PadelSession = {
      ...session,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    sessions.push(newSession);
    storage.saveSessions(sessions);
    return newSession;
  },

  // Elimina una sessione
  deleteSession: (id: string): void => {
    const sessions = storage.loadSessions();
    const filtered = sessions.filter(s => s.id !== id);
    storage.saveSessions(filtered);
  },

  // Elimina tutte le sessioni
  clearSessions: (): void => {
    localStorage.removeItem(STORAGE_KEY);
    emitStorageChange(); // Emette evento per aggiornamenti in tempo reale
  },

  // Calcola statistiche aggregate
  getStats: () => {
    const sessions = storage.loadSessions();
    
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        thisMonth: 0,
        avgRating: 0,
        topSkill: 'N/A',
        improvement: 0
      };
    }

    // Sessioni questo mese
    const now = new Date();
    const thisMonth = sessions.filter(s => {
      const sessionDate = new Date(s.date);
      return sessionDate.getMonth() === now.getMonth() && 
             sessionDate.getFullYear() === now.getFullYear();
    }).length;

    // Rating medio
    let totalRating = 0;
    let ratingCount = 0;
    
    sessions.forEach(session => {
      Object.values(session.skills).forEach(category => {
        Object.values(category).forEach(rating => {
          totalRating += rating;
          ratingCount++;
        });
      });
    });

    const avgRating = ratingCount > 0 ? +(totalRating / ratingCount).toFixed(1) : 0;

    // Skill con rating più alto (ultime 5 sessioni)
    const recentSessions = sessions.slice(-5);
    const skillRatings: Record<string, number[]> = {};
    
    recentSessions.forEach(session => {
      Object.entries(session.skills).forEach(([category, skills]) => {
        Object.entries(skills).forEach(([skill, rating]) => {
          const key = `${category}::${skill}`;
          if (!skillRatings[key]) skillRatings[key] = [];
          skillRatings[key].push(rating);
        });
      });
    });

    let topSkill = 'N/A';
    let highestAvg = 0;
    
    Object.entries(skillRatings).forEach(([key, ratings]) => {
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      if (avg > highestAvg) {
        highestAvg = avg;
        topSkill = key.split('::')[1];
      }
    });

    // Trend (confronta ultime 3 vs precedenti 3)
    const recent = sessions.slice(-3);
    const previous = sessions.slice(-6, -3);
    
    let recentAvg = 0;
    let previousAvg = 0;
    
    if (recent.length > 0) {
      let total = 0;
      let count = 0;
      recent.forEach(s => {
        Object.values(s.skills).forEach(cat => {
          Object.values(cat).forEach(r => {
            total += r;
            count++;
          });
        });
      });
      recentAvg = total / count;
    }
    
    if (previous.length > 0) {
      let total = 0;
      let count = 0;
      previous.forEach(s => {
        Object.values(s.skills).forEach(cat => {
          Object.values(cat).forEach(r => {
            total += r;
            count++;
          });
        });
      });
      previousAvg = total / count;
    }

    const improvement = +(recentAvg - previousAvg).toFixed(1);

    return {
      totalSessions: sessions.length,
      thisMonth,
      avgRating,
      topSkill,
      improvement
    };
  }
};
