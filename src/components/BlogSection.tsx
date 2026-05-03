'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Clock, ShieldCheck, Loader2 } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  source: string;
}

export default function BlogSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data);
      } catch {
        setError('Unable to load security intelligence. Connection unstable.');
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="font-mono text-orange-200/60 animate-pulse uppercase tracking-widest text-sm">Synchronizing Intelligence Feeds...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-900/10 border border-red-500/20 rounded-xl">
        <p className="text-red-400 font-mono">{error}</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <BookOpen className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Cyber Intelligence Blog</h2>
            <p className="text-orange-200/60 text-sm font-mono">Aggregated Global Security Updates</p>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-tighter">
            <ShieldCheck className="w-3 h-3" />
            Verified Sources
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative bg-[#120a05] border border-orange-900/30 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-orange-500/10"
          >
            {/* Source Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-2 py-1 bg-black/80 backdrop-blur-md border border-orange-500/30 rounded text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                {item.source}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-orange-200/40 text-xs mb-3 font-mono">
                <Clock className="w-3 h-3" />
                {new Date(item.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>

              <h3 className="text-white font-bold mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-orange-100/60 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                {item.contentSnippet}
              </p>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-between text-orange-400 text-xs font-bold uppercase tracking-widest group/btn border-t border-orange-900/30 pt-4 hover:text-orange-300"
              >
                Read Intelligence Report
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Hover Accent */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-linear-to-r from-orange-500 to-red-600 group-hover:w-full transition-all duration-500"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
