"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

export default function NewSessionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: "TRAINING" as "TRAINING" | "MATCH",
    duration: 60,
    notes: "",
    skills: {
      technical: {
        "Forehand from baseline": 5,
        "Backhand from baseline": 5,
        "Volley (FH/BH)": 5,
        "Bandeja": 5,
        "Vibora": 5,
        "Smash": 5,
        "Serve": 5,
        "Return": 5,
      },
      tactical: {
        "Court positioning": 5,
        "Use of lob": 5,
        "Shot selection": 5,
        "Pair movement": 5,
        "Reading opponents": 5,
      },
      physical: {
        "Endurance": 5,
        "Movement speed": 5,
        "Reactivity": 5,
        "Agility": 5,
      },
      mental: {
        "Self-confidence": 5,
        "Concentration": 5,
        "Pressure management": 5,
        "Communication": 5,
      }
    }
  });

  const handleSkillChange = (category: string, skill: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: {
          ...prev.skills[category as keyof typeof prev.skills],
          [skill]: value
        }
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Salva la sessione nel localStorage
      const newSession = storage.addSession({
        date: formData.date,
        type: formData.type,
        duration: formData.duration,
        notes: formData.notes,
        skills: formData.skills
      });

      console.log("✅ Sessione salvata:", newSession);

      // Reindirizza alla dashboard per vedere i risultati
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Errore nel salvataggio:", error);
      alert("Errore nel salvataggio della sessione. Riprova.");
    } finally {
      setIsSubmitting(false);
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
            New Session
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your padel progress with detailed skill ratings
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Basic Info */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Session Details</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as "TRAINING" | "MATCH" }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="TRAINING">Training</option>
                  <option value="MATCH">Match</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration (min)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                  min="30"
                  max="180"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="How was your session? Any specific focus areas?"
              />
            </div>
          </div>

          {/* Skills Rating */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6">Skill Ratings</h2>

            {Object.entries(formData.skills).map(([category, skills]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4 capitalize">{category}</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(skills).map(([skill, rating]) => (
                    <div key={skill} className="bg-white/5 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-300">{skill}</label>
                        <span className="text-lg font-bold text-white">{rating}/10</span>
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => handleSkillChange(category, skill, parseInt(e.target.value))}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(rating-1)*11.11}%, rgba(255,255,255,0.2) ${(rating-1)*11.11}%, rgba(255,255,255,0.2) 100%)`
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? "💾 Salvando..." : "💾 Save Session"}
            </motion.button>

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
        </motion.form>
      </div>
    </div>
  );
}
