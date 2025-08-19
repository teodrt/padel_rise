"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSessions } from "@/lib/useSessions";

export default function DashboardPage() {
  const { sessions, stats, clearAllSessions } = useSessions();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getSessionIcon = (type: string) => {
    return type === 'TRAINING' ? '🏋️' : '🏆';
  };

  const getSessionColor = (type: string) => {
    return type === 'TRAINING' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-pink-500/20 text-pink-400';
  };

  const calculateSessionRating = (session: any) => {
    let total = 0;
    let count = 0;
    
    Object.values(session.skills).forEach((category: any) => {
      Object.values(category).forEach((rating: any) => {
        total += rating;
        count++;
      });
    });
    
    return count > 0 ? +(total / count).toFixed(1) : 0;
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all sessions? This action cannot be undone.")) {
      clearAllSessions();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

      {/* Floating Neon Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/30 rounded-full blur-xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-pink-500/30 rounded-full blur-xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-block mb-4">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">🏓</span>
            </motion.div>
          </Link>

          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Dashboard
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your padel journey and see your progress
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { label: "Total Sessions", value: stats.totalSessions, icon: "📊", color: "from-cyan-500 to-blue-600" },
            { label: "This Month", value: stats.thisMonth, icon: "📅", color: "from-pink-500 to-purple-600" },
            { label: "Avg Rating", value: stats.avgRating, icon: "⭐", color: "from-yellow-500 to-orange-600" },
            { label: "Top Skill", value: stats.topSkill, icon: "🏆", color: "from-green-500 to-emerald-600" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group hover:border-cyan-500/50 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
                {stat.icon}
              </div>

              <div className="text-3xl font-bold text-white mb-2">
                {typeof stat.value === 'number' ? stat.value : stat.value.length > 20 ? stat.value.substring(0, 20) + '...' : stat.value}
              </div>

              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Sessions</h2>
            {sessions.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-colors"
              >
                🗑️ Clear All
              </button>
            )}
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏓</div>
              <h3 className="text-xl text-gray-400 mb-2">No sessions yet</h3>
              <p className="text-gray-500 mb-6">Start tracking your padel progress!</p>
              <Link href="/new">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ➕ Add First Session
                </motion.button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.slice(-5).reverse().map((session, index) => (
                <motion.div
                  key={session.id}
                  className="bg-white/5 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${getSessionColor(session.type)}`}>
                      {getSessionIcon(session.type)}
                    </div>

                    <div>
                      <div className="text-white font-semibold">{formatDate(session.date)}</div>
                      <div className="text-gray-400 text-sm">{session.type} • {session.duration} min</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-white font-bold">{calculateSessionRating(session)}/10</div>
                    <div className="text-gray-400 text-sm">{session.notes || 'No notes'}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/new">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ➕ Add New Session
              </motion.button>
            </Link>

            <Link href="/">
              <motion.button
                type="button"
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl text-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🏠 Back Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
