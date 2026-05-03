'use client';

import LessonSidebar from '@/components/LessonSidebar';
import Chatbot from '@/components/Chatbot';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0500] text-gray-100 font-sans selection:bg-orange-500/30">
      {/* Navigation - Reusing styles from main page */}
      <nav className="border-b border-orange-900/30 bg-[#0a0500]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-linear-to-br from-orange-500 to-red-600 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-300 to-orange-500">
              Vibe Sentry Hub
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium text-orange-200/60">
            <span className="flex items-center gap-2 border border-orange-900/50 bg-[#120a05] px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Learning Mode Active
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        <LessonSidebar />
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth">
          {children}
        </main>
      </div>

      <Chatbot />
    </div>
  );
}
