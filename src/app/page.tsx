'use client';

import ThreatLogs from '@/components/ThreatLogs';
import Chatbot from '@/components/Chatbot';
import HeroSection from '@/components/HeroSection';
import ThreatMap from '@/components/ThreatMap';
import BlogSection from '@/components/BlogSection';
import Link from 'next/link';
import { Shield, Activity, Users, AlertTriangle, Info, GraduationCap, Trophy, MessageSquare, Compass } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vibe_sentry_leaderboard');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Defer state update to avoid cascading render warning during hydration
      setTimeout(() => {
        setLeaderboard(parsed);
      }, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0500] text-gray-100 font-sans selection:bg-orange-500/30 overflow-x-hidden scroll-smooth">
      <nav className="border-b border-orange-900/30 bg-[#0a0500]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="p-2 bg-linear-to-br from-orange-500 to-red-600 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-300 to-orange-500">
              Vibe Sentry
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { name: 'Home', id: 'home' },
              { name: 'Dashboard', id: 'dashboard' },
              { name: 'Threat Map', id: 'threat-map' },
              { name: 'Live Feed', id: 'live-feed' },
              { name: 'Academy', path: '/lessons' },
              { name: 'Careers', path: '/careers' },
              { name: 'Quiz', path: '/quiz' },
              { name: 'Feedback', path: '/feedback' }
            ].map((tab) => (
              tab.path ? (
                <Link 
                  key={tab.name}
                  href={tab.path}
                  className="text-orange-400 hover:text-orange-300 transition-colors font-bold flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                  {tab.name}
                </Link>
              ) : (
                <button 
                  key={tab.name}
                  onClick={() => document.getElementById(tab.id!)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-orange-100/70 hover:text-orange-400 transition-colors relative group"
                >
                  {tab.name}
                  <span className="absolute bottom-[-21px] left-0 w-0 h-[2px] bg-linear-to-r from-orange-500 to-red-500 transition-all group-hover:w-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
                </button>
              )
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-orange-200/60">
            <span className="flex items-center gap-2 border border-orange-900/50 bg-[#120a05] px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              System Active
            </span>
          </div>
        </div>
      </nav>

      <div id="home">
        <HeroSection />
      </div>

      <main id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Threats', value: '2,481', icon: AlertTriangle, color: 'text-orange-500' },
            { label: 'Blocked Attacks', value: '1,932', icon: Shield, color: 'text-red-500' },
            { label: 'Active Sessions', value: '843', icon: Users, color: 'text-amber-500' },
            { label: 'Network Load', value: '42%', icon: Activity, color: 'text-yellow-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#120a05] border border-orange-900/30 rounded-xl p-6 relative overflow-hidden group hover:border-orange-500/50 transition-colors shadow-lg">
              <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${stat.color}`}>
                <stat.icon className="w-16 h-16" />
              </div>
              <p className="text-orange-200/60 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area (Threat Map) */}
          <div id="threat-map" className="lg:col-span-2 bg-[#120a05] border border-orange-900/30 rounded-xl p-6 shadow-2xl relative overflow-hidden group scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Global Threat Map</h2>
              <span className="text-[10px] font-mono text-orange-500/50 uppercase tracking-tighter border border-orange-500/20 px-2 py-0.5 rounded">
                Simulated Security Events
              </span>
            </div>
            <ThreatMap />
          </div>

          {/* Live Feed */}
          <div id="live-feed" className="lg:col-span-1 scroll-mt-24">
            <ThreatLogs />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div id="blog" className="lg:col-span-3 scroll-mt-24">
            <BlogSection />
          </div>

          {/* Session Leaderboard */}
          <div className="lg:col-span-1 bg-[#120a05] border border-orange-900/30 rounded-xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-orange-500" />
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Top Analysts</h2>
            </div>
            <div className="space-y-4">
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-orange-900/10 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-orange-500/40">#{i + 1}</span>
                      <span className="text-sm font-bold text-orange-100">{entry.name}</span>
                    </div>
                    <span className="text-xs font-mono text-orange-500">{entry.score}/5</span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-xs text-orange-200/20 font-mono">No assessments recorded yet.</p>
                  <Link href="/quiz" className="text-orange-500 text-[10px] uppercase font-bold mt-2 inline-block border border-orange-500/20 px-3 py-1 rounded hover:bg-orange-500/10 transition-all">Start Quiz</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="bg-linear-to-b from-[#120a05] to-[#0a0500] border border-orange-900/30 rounded-xl p-8 shadow-2xl relative overflow-hidden scroll-mt-24">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px]"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Info className="w-8 h-8 text-orange-500" />
                About Vibe Sentry
              </h2>
              <p className="text-orange-100/70 leading-relaxed text-lg mb-4">
                Vibe Sentry is a next-generation Intrusion Detection System (IDS) dashboard designed to provide real-time, actionable intelligence against cyber threats. 
                Our architecture combines high-fidelity visual telemetry with an AI-powered security assistant.
              </p>
              <p className="text-orange-100/70 leading-relaxed text-lg mb-6">
                Built with enterprise-grade security at its core, it employs strict rate limiting, input sanitization, and continuous monitoring to ensure your network remains impregnable.
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3 text-orange-400">
                <GraduationCap className="w-8 h-8" />
                <h3 className="text-xl font-bold uppercase tracking-widest">Learning Hub</h3>
              </div>
              <p className="text-sm text-orange-200/60 leading-relaxed">
                Want to learn how we built these security protocols? Join our interactive academy to master XSS prevention, SQLi defense, and rate limiting logic.
              </p>
              <Link 
                href="/lessons" 
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest text-xs"
              >
                <GraduationCap className="w-4 h-4" />
                Academy
              </Link>
              <Link 
                href="/careers" 
                className="flex items-center justify-center gap-2 bg-[#120a05] border border-orange-500/30 hover:border-orange-500 text-orange-400 font-bold py-3 rounded-lg transition-all uppercase tracking-widest text-xs"
              >
                <Compass className="w-4 h-4" />
                Roadmaps
              </Link>
              <Link 
                href="/feedback" 
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-lg transition-all uppercase tracking-widest text-xs col-span-2 border border-white/10"
              >
                <MessageSquare className="w-4 h-4" />
                Feedback Terminal
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Chatbot />
    </div>
  );
}
