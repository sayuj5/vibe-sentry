'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, ShieldCheck, Zap, Lock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const lessons = [
  { id: 'xss', title: 'XSS Fundamentals', icon: BookOpen, path: '/lessons/xss' },
  { id: 'sqli', title: 'SQLi Defense', icon: ShieldCheck, path: '/lessons/sqli' },
  { id: 'rate-limiting', title: 'Rate Limiting Theory', icon: Zap, path: '/lessons/rate-limiting' },
];

export default function LessonSidebar() {
  const pathname = usePathname();
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('vibe_sentry_lessons_completed');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTimeout(() => {
        setCompleted(parsed);
      }, 0);
    }
  }, []);

  return (
    <div className="w-64 bg-[#120a05] border-r border-orange-900/30 flex flex-col h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-6">
        <h3 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-6">Learning Curriculum</h3>
        <nav className="space-y-2">
          {lessons.map((lesson) => {
            const isActive = pathname === lesson.path;
            const isCompleted = completed.includes(lesson.id);
            
            return (
              <Link 
                key={lesson.id} 
                href={lesson.path}
                className={`flex items-center justify-between p-3 rounded-lg transition-all group ${
                  isActive 
                    ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400' 
                    : 'text-orange-100/60 hover:bg-orange-500/5 hover:text-orange-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <lesson.icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-orange-200/40'}`} />
                  <span className="text-sm font-medium">{lesson.title}</span>
                </div>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <ChevronRight className={`w-3 h-3 transition-transform ${isActive ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-orange-900/30">
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-tighter">Security Level 1</span>
          </div>
          <div className="w-full bg-orange-900/30 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-orange-500 h-full transition-all duration-1000" 
              style={{ width: `${(completed.length / lessons.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-orange-200/40 mt-2 font-mono">
            {completed.length} of {lessons.length} Modules Verified
          </p>
        </div>
      </div>
    </div>
  );
}
