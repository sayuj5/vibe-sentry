'use client';

import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
import { CheckCircle2, Code2, AlertTriangle, Lightbulb } from 'lucide-react';

interface LessonContentProps {
  id: string;
  title: string;
  vulnerability: string;
  defenseSnippet: string;
  explanation: string;
  practiceInstructions: string;
}

export default function LessonContent({
  id,
  title,
  vulnerability,
  defenseSnippet,
  explanation,
  practiceInstructions
}: LessonContentProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vibe_sentry_lessons_completed');
    if (saved) {
      const list = JSON.parse(saved);
      if (list.includes(id)) {
        setTimeout(() => {
          setCompleted(true);
        }, 0);
      }
    }
  }, [id]);

  const handleComplete = () => {
    const saved = localStorage.getItem('vibe_sentry_lessons_completed');
    const list = saved ? JSON.parse(saved) : [];
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem('vibe_sentry_lessons_completed', JSON.stringify(list));
      setCompleted(true);
      // Force sidebar update (simple way: reload or use custom event)
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <div className="max-w-4xl space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          {title}
          {completed && <CheckCircle2 className="w-6 h-6 text-green-500" />}
        </h1>
        <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-xl flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-red-400 uppercase mb-1">Vulnerability Vector</h4>
            <p className="text-sm text-red-200/70 leading-relaxed">{vulnerability}</p>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Explanation
        </h2>
        <div className="text-orange-100/70 leading-relaxed prose prose-invert max-w-none">
          {explanation.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-500" />
          Defense Implementation
        </h2>
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <pre className="relative bg-black border border-orange-900/30 rounded-xl p-6 overflow-x-auto text-xs font-mono leading-relaxed text-orange-200/80">
            <code>{defenseSnippet}</code>
          </pre>
        </div>
      </section>

      <section className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Practice Exercise</h2>
          <p className="text-orange-100/60 text-sm">
            {practiceInstructions}
          </p>
        </div>
        
        <button
          onClick={handleComplete}
          disabled={completed}
          className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-lg ${
            completed 
              ? 'bg-green-500/20 text-green-500 border border-green-500/30 cursor-default' 
              : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20 hover:scale-105 active:scale-95'
          }`}
        >
          {completed ? 'Module Verified' : 'Complete Practice'}
        </button>
      </section>
    </div>
  );
}
