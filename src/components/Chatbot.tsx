'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Cpu, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Greetings. Axiom-Sensei online. Tactical career protocols active. How may I guide your security journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      if (res.ok) {
        setMessages([...newMessages, { role: 'assistant' as const, content: data.response }]);
      } else {
        setMessages([...newMessages, { role: 'assistant' as const, content: `**Error:** ${data.error}` }]);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant' as const, content: '**Error:** Connection severed. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* JARVIS Icon Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.5)] z-50 flex items-center justify-center group overflow-hidden bg-black border border-[#00f0ff]/50"
      >
        <div className="absolute inset-0 bg-[#00f0ff]/10 group-hover:bg-[#00f0ff]/20 transition-colors"></div>
        {/* Spinning HUD rings */}
        <div className="absolute w-[120%] h-[120%] border-t-2 border-[#00f0ff] rounded-full animate-spin [animation-duration:3s]"></div>
        <div className="absolute w-[90%] h-[90%] border-b-2 border-orange-500 rounded-full animate-spin [animation-duration:2s] [animation-direction:reverse]"></div>
        <Cpu className="w-6 h-6 text-[#00f0ff] relative z-10" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[400px] bg-black/90 backdrop-blur-xl border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col z-50 overflow-hidden"
            style={{ 
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              height: '600px',
              maxHeight: '80vh'
            }}
          >
            {/* Header */}
            <div className="bg-[#00f0ff]/10 p-4 border-b border-[#00f0ff]/30 flex justify-between items-center relative">
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#00f0ff] to-transparent"></div>
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8">
                  <div className="absolute inset-0 border border-[#00f0ff] rounded-full animate-ping [animation-duration:3s] opacity-50"></div>
                  <div className="w-2 h-2 bg-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]"></div>
                </div>
                <h3 className="text-[#00f0ff] font-mono font-bold tracking-widest text-sm uppercase">Axiom-Sensei Core</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-[#00f0ff]/60 hover:text-[#00f0ff] transition-colors p-1 hover:bg-[#00f0ff]/10 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-sm wrap-break-word ${
                    msg.role === 'user' 
                      ? 'bg-[#00f0ff]/10 text-white border border-[#00f0ff]/30 rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                      : 'bg-transparent text-gray-300 border-l-2 border-orange-500 rounded-r-lg'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="[&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-[#00f0ff] [&_code]:bg-[#00f0ff]/10 [&_code]:text-[#00f0ff] [&_code]:px-1 [&_code]:rounded [&_pre]:bg-black/50 [&_pre]:p-2 [&_pre]:rounded [&_pre]:border [&_pre]:border-[#00f0ff]/20 [&_pre_code]:bg-transparent [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-transparent text-[#00f0ff] border-l-2 border-[#00f0ff] p-4 flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-mono text-xs uppercase tracking-widest">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black border-t border-[#00f0ff]/30 flex gap-3 relative">
              <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#00f0ff]/50 to-transparent"></div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Enter command directive..."
                className="flex-1 bg-[#00f0ff]/5 text-[#00f0ff] placeholder-[#00f0ff]/30 border border-[#00f0ff]/30 px-4 py-3 focus:outline-none focus:border-[#00f0ff] focus:bg-[#00f0ff]/10 transition-all font-mono text-sm"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              />
              <button 
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30 disabled:opacity-50 text-[#00f0ff] w-12 flex shrink-0 items-center justify-center transition-colors"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
