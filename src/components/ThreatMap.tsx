'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ThreatMap() {
  const [mounted, setMounted] = useState(false);
  const [blips, setBlips] = useState<{top: string, left: string, delay: number, duration: number}[]>([]);
  
  useEffect(() => {
    // Generate static blip positions once on mount
    const newBlips = [...Array(12)].map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1.5
    }));
    setBlips(newBlips);
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-[#0a0500]" />;
  }

  return (
    <div className="w-full h-[400px] relative bg-[#0a0500] overflow-hidden rounded-lg border border-orange-900/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-orange-900/20 via-[#0a0500] to-[#0a0500]"></div>
      
      {/* Grid lines */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.5) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>
      
      {/* Radar Sweep */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] mt-[-400px] ml-[-400px] rounded-full origin-center pointer-events-none"
        style={{ 
          background: 'conic-gradient(from 0deg, transparent 70%, rgba(249, 115, 22, 0.2) 100%)',
          borderRight: '2px solid rgba(249, 115, 22, 0.5)'
        }}
      />

      {/* Target Blips */}
      {blips.map((blip, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-red-500 rounded-full"
          style={{
            top: blip.top,
            left: blip.left,
            boxShadow: '0 0 15px 2px rgba(239, 68, 68, 0.8)'
          }}
          animate={{
            scale: [1, 2.5, 1],
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: blip.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blip.delay
          }}
        />
      ))}
      
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-xs font-mono text-orange-200/60 uppercase tracking-wider">Live Tracking Active</span>
      </div>
    </div>
  );
}
