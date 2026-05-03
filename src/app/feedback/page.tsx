'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { sanitizeInput } from '@/lib/security';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim()) return;

    const sanitizedName = sanitizeInput(name);
    const sanitizedFeedback = sanitizeInput(feedback);

    // Real-time Data Ingestion Simulation via BroadcastChannel
    const channel = new BroadcastChannel('vibe_sentry_logs');
    channel.postMessage({
      type: `FEEDBACK: ${sanitizedFeedback.substring(0, 30)}...`,
      severity: 'INFO',
      source: sanitizedName,
      color: 'bg-blue-500 text-white'
    });
    channel.close();

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0500] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-orange-500 hover:text-orange-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Dashboard
          </Link>
          <div className="text-orange-200/40 text-xs font-mono uppercase">System Node: Feedback-01</div>
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#120a05] border border-orange-900/30 p-8 rounded-2xl shadow-2xl space-y-8"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Intelligence Received</h2>
                <p className="text-orange-200/60 leading-relaxed">
                  Your feedback has been ingested into the real-time telemetry stream. 
                  Return to the dashboard to see your entry in the live logs.
                </p>
              </div>
              <Link 
                href="/" 
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl uppercase tracking-widest text-sm transition-all"
              >
                View Live Telemetry
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                  Feedback Terminal
                </h1>
                <p className="text-orange-100/60 leading-relaxed">
                  Your insights help us refine the Vibe Sentry protocols. Every submission is ingested directly into our simulated event stream for data analysis.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-orange-500 uppercase tracking-widest">Contributor Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your callsign..."
                    className="w-full bg-black border border-orange-900/30 px-4 py-3 rounded-xl text-orange-400 placeholder-orange-900 focus:outline-none focus:border-orange-500 font-mono text-sm transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-orange-500 uppercase tracking-widest">Learning Experience Rating</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        className="flex-1 py-3 bg-black border border-orange-900/30 rounded-xl text-orange-500 hover:border-orange-500 hover:bg-orange-500/10 transition-all font-bold"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-orange-500 uppercase tracking-widest">Intelligence Report (Feedback)</label>
                  <textarea 
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Describe your session findings..."
                    className="w-full bg-black border border-orange-900/30 px-4 py-3 rounded-xl text-orange-400 placeholder-orange-900 focus:outline-none focus:border-orange-500 font-mono text-sm transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Intelligence
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
