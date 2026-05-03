'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const events = [
  { type: 'SQL Injection Attempt', severity: 'High', source: '192.168.1.104', color: 'bg-red-600 text-white' },
  { type: 'Failed Login (Brute Force)', severity: 'Medium', source: '10.0.0.5', color: 'bg-orange-500 text-white' },
  { type: 'DDoS Anomaly Detected', severity: 'Critical', source: 'Multiple', color: 'bg-red-700 text-white animate-pulse' },
  { type: 'Port Scan Detected', severity: 'Low', source: '172.16.0.42', color: 'bg-blue-600 text-white' },
  { type: 'XSS Payload Blocked', severity: 'High', source: '198.51.100.23', color: 'bg-red-600 text-white' }
];

interface LogEvent {
  id: number;
  type: string;
  severity: string;
  source: string;
  color: string;
  time: string;
}

export default function ThreatLogs() {
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial logs
    setTimeout(() => {
      setLogs([
        { id: 1, ...events[0], time: new Date().toLocaleTimeString('en-US', { hour12: false }) },
        { id: 2, ...events[1], time: new Date().toLocaleTimeString('en-US', { hour12: false }) }
      ]);
    }, 0);

    const channel = new BroadcastChannel('vibe_sentry_logs');
    channel.onmessage = (event) => {
      setLogs(prev => [
        ...prev,
        { id: Date.now(), ...event.data, time: new Date().toLocaleTimeString('en-US', { hour12: false }) }
      ].slice(-50));
    };

    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setLogs(prev => [
        ...prev,
        { id: Date.now(), ...randomEvent, time: new Date().toLocaleTimeString('en-US', { hour12: false }) }
      ].slice(-50));
    }, 2500);

    return () => {
      clearInterval(interval);
      channel.close();
    };
  }, []);

  // Auto-scroll the container only (prevents the whole page from scrolling)
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black border border-gray-800 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col h-[500px]">
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-3 flex justify-between items-center">
        <h2 className="text-sm font-mono font-bold text-gray-300 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-500" />
          Live Threat Feed
        </h2>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      {/* Log Feed */}
      <div ref={logsContainerRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2 custom-scrollbar">
        {logs.map(log => (
          <div key={log.id} className="flex flex-col sm:flex-row sm:items-center gap-2 hover:bg-white/5 p-1 rounded transition-colors animate-in fade-in duration-300">
            <span className="text-gray-500 shrink-0">[{log.time}]</span>
            
            <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 uppercase tracking-wider ${log.color} shadow-sm min-w-[70px] text-center`}>
              {log.severity}
            </span>
            
            <span className="text-gray-300 break-all">
              <span className="text-cyan-400">SRC={log.source}</span> <span className="text-gray-500">{"=>"}</span> <span className="text-white">{log.type}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
