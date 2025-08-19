"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
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
      
      <motion.div 
        className="absolute bottom-32 left-1/3 w-28 h-28 bg-purple-500/30 rounded-full blur-xl"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="mx-auto mb-8 w-32 h-32 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/25"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <span className="text-4xl font-black text-white">🏓</span>
          </motion.div>
          
          <motion.h1 
            className="text-7xl md:text-9xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6"
            animate={{ 
              filter: [
                "drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))",
                "drop-shadow(0 0 40px rgba(147, 51, 234, 0.8))",
                "drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))"
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            PadelRise
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Elevate your padel game with AI-powered insights, 
            <span className="text-cyan-400 font-semibold"> real-time analytics</span>, and 
            <span className="text-purple-400 font-semibold"> personalized coaching</span>
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {[
            {
              icon: "📊",
              title: "Smart Analytics",
              description: "Track your progress with AI-powered insights and performance trends"
            },
            {
              icon: "🎯",
              title: "Personal Goals",
              description: "Set and achieve personalized targets with adaptive recommendations"
            },
            {
              icon: "🏆",
              title: "Pro Coaching",
              description: "Get expert feedback and technique analysis from certified coaches"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <motion.div
            className="inline-flex gap-4 flex-col sm:flex-row"
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/new">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Start Your Journey
              </motion.button>
            </Link>
            
            <Link href="/dashboard">
              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-2xl text-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📈 View Dashboard
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-1/4 right-10 text-6xl opacity-20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎾
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 left-10 text-5xl opacity-20"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🏓
        </motion.div>
      </div>
    </div>
  );
}
