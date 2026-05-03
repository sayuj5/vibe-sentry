'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, ShieldCheck, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function LessonsPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-bold text-orange-400 uppercase tracking-widest">
          <GraduationCap className="w-4 h-4" />
          Cybersecurity Academy
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Welcome to the Intelligence Hub</h1>
        <p className="text-lg text-orange-100/60 leading-relaxed">
          Master the art of defensive engineering. Our interactive modules guide you through common vulnerabilities and show you how the Vibe Sentry core protocols mitigate these threats in real-time.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            title: 'XSS Fundamentals', 
            desc: 'Learn how to prevent malicious script injection in web interfaces.',
            path: '/lessons/xss',
            icon: BookOpen,
            color: 'text-blue-400'
          },
          { 
            title: 'SQLi Defense', 
            desc: 'Protect your data layers from structured query language injection.',
            path: '/lessons/sqli',
            icon: ShieldCheck,
            color: 'text-green-400'
          },
          { 
            title: 'Rate Limiting Theory', 
            desc: 'Mitigate brute-force and DoS attacks using sophisticated timing logic.',
            path: '/lessons/rate-limiting',
            icon: Zap,
            color: 'text-amber-400'
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#120a05] border border-orange-900/30 rounded-2xl p-6 hover:border-orange-500/50 transition-all shadow-xl"
          >
            <div className={`p-3 bg-white/5 rounded-xl w-fit mb-4 ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-orange-100/60 text-sm mb-6 leading-relaxed">
              {item.desc}
            </p>
            <Link 
              href={item.path}
              className="flex items-center gap-2 text-orange-500 text-sm font-bold uppercase tracking-widest hover:text-orange-400 transition-colors"
            >
              Start Module
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="bg-linear-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-4">Educational Directive</h2>
        <p className="text-orange-100/70 text-sm leading-relaxed">
          The code snippets provided in these lessons are extracted directly from the Vibe Sentry production codebase. 
          By completing these modules, you are gaining insight into enterprise-grade security implementation.
        </p>
      </div>
    </div>
  );
}
