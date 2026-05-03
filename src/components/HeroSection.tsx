'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0500] min-h-[80vh] flex flex-col items-center justify-center pt-20 pb-32">
      
      {/* Background Smoky/Fiery Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-orange-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-red-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-amber-700/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Shooting Light Streaks (Warp speed effect) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] rounded-full bg-gradient-to-r from-transparent via-orange-100 to-transparent"
            style={{
              top: `${Math.random() * 100}%`,
              left: `-20%`,
              width: `${Math.random() * 200 + 100}px`,
              filter: 'blur(1px)'
            }}
            animate={{
              left: '120%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 1.5 + 1,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        
        {/* Trusted Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-950/30 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-200">Trusted by forward-thinking teams.</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-amber-200 via-orange-400 to-red-600">
            Launch Your
            <br />
            Security Into Orbit
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-orange-100/70 max-w-2xl mb-10 leading-relaxed font-medium"
        >
          Supercharge your network protection with AI-powered intrusion detection built for the next generation of teams — fast, seamless, and limitless.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button 
            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(249,115,22,0.8)] flex items-center gap-2"
          >
            Get Started for Free
          </button>
          
          <button 
            onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full border border-orange-500/30 hover:border-orange-500 hover:bg-orange-950/30 transition-all text-orange-200 font-bold text-lg flex items-center gap-2"
          >
            Explore Features
          </button>
        </motion.div>

      </div>
    </div>
  );
}
