'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Shield, Search, Terminal, Database, Network, Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const careerPaths = [
  {
    id: 'soc',
    title: 'SOC Analyst',
    desc: 'Monitor, detect, and respond to cyber threats in real-time.',
    icon: Shield,
    color: 'text-blue-400',
    subjects: [
      { name: 'Computer Networks', focus: 'OSI Model, TCP/IP, DNS, Subnetting' },
      { name: 'Operating Systems', focus: 'Process Management, Memory, Linux CLI' },
      { name: 'Security Operations', focus: 'SIEM (Wazuh), Log Analysis, Incident Response' }
    ],
    tools: ['Wazuh', 'Splunk', 'Wireshark', 'Suricata']
  },
  {
    id: 'pentester',
    title: 'Penetration Tester',
    desc: 'Conduct authorized simulations of cyberattacks to identify vulnerabilities.',
    icon: Search,
    color: 'text-red-400',
    subjects: [
      { name: 'Web Security', focus: 'OWASP Top 10, XSS, SQLi, SSRF' },
      { name: 'Cryptography', focus: 'AES, RSA, Hashing, TLS Handshake' },
      { name: 'DBMS', focus: 'Relational Algebra, SQL Optimization' }
    ],
    tools: ['Nmap', 'Burp Suite', 'Metasploit', 'Ghidra']
  },
  {
    id: 'security-architect',
    title: 'Security Architect',
    desc: 'Design and implement robust security infrastructures.',
    icon: Target,
    color: 'text-amber-400',
    subjects: [
      { name: 'Systems Design', focus: 'High Availability, Zero Trust Architecture' },
      { name: 'Cloud Security', focus: 'IAM, VPC Peering, Serverless Security' },
      { name: 'Discrete Maths', focus: 'Logic, Graph Theory, Number Theory' }
    ],
    tools: ['Terraform', 'Checkov', 'Vault', 'Kubernetes']
  }
];

export default function CareersPage() {
  const [selectedPath, setSelectedPath] = useState(careerPaths[0]);

  return (
    <div className="min-h-screen bg-[#0a0500] text-gray-100 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-orange-900/20 pb-8">
          <div className="space-y-4">
            <Link href="/" className="text-orange-500 hover:text-orange-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Return to Command Center
            </Link>
            <h1 className="text-4xl font-bold text-white tracking-tight">Cybersecurity Career Roadmaps</h1>
            <p className="text-orange-100/60 max-w-2xl leading-relaxed">
              Strategize your professional evolution. Select a primary directive to view foundational subjects (GATE CSE) and essential technical tooling.
            </p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <Cpu className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-[10px] text-orange-500 uppercase font-bold tracking-widest">Axiom Mentor</p>
              <p className="text-sm text-white font-mono font-bold tracking-tighter">Roadmap Protocol Active</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Path Selection */}
          <div className="lg:col-span-4 space-y-4">
            {careerPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path)}
                className={`w-full p-6 rounded-2xl border transition-all text-left group relative overflow-hidden ${
                  selectedPath.id === path.id 
                    ? 'bg-orange-500/10 border-orange-500/50 text-white' 
                    : 'bg-[#120a05] border-orange-900/20 text-orange-100/40 hover:border-orange-500/30'
                }`}
              >
                {selectedPath.id === path.id && (
                  <motion.div layoutId="activePath" className="absolute inset-0 bg-orange-500/5 -z-10" />
                )}
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${path.color}`}>
                    <path.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest text-sm">{path.title}</h3>
                    <p className="text-xs mt-1 line-clamp-1">{path.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Path Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPath.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-[#120a05] border border-orange-900/30 rounded-3xl p-8 lg:p-12 shadow-2xl space-y-12"
              >
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className={selectedPath.color}>{selectedPath.title}</span>
                    Core Roadmap
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedPath.tools.map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-black/50 border border-orange-500/20 rounded text-[10px] font-mono font-bold text-orange-400 uppercase">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Foundational Subjects (GATE)
                    </h4>
                    <div className="space-y-4">
                      {selectedPath.subjects.map((sub) => (
                        <div key={sub.name} className="group cursor-default">
                          <p className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                            <ChevronRight className="w-3 h-3 text-orange-500 group-hover:translate-x-1 transition-transform" />
                            {sub.name}
                          </p>
                          <p className="text-xs text-orange-200/40 pl-5">{sub.focus}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/40 border border-orange-500/10 rounded-2xl p-6 space-y-6 self-start">
                    <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest flex items-center gap-2">
                      <Network className="w-4 h-4" />
                      Career Trajectory
                    </h4>
                    <ul className="space-y-4 relative">
                      <div className="absolute left-1.5 top-1 bottom-1 w-px bg-orange-900/30"></div>
                      {['Junior Apprentice', 'Lead Specialist', 'Chief Architect'].map((level, i) => (
                        <li key={level} className="flex items-center gap-4 pl-6 relative">
                          <div className={`absolute left-0 w-3 h-3 rounded-full border-2 border-orange-900 ${i === 0 ? 'bg-orange-500 scale-125' : 'bg-[#120a05]'}`}></div>
                          <span className={`text-xs font-bold ${i === 0 ? 'text-white' : 'text-orange-200/20'}`}>{level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-orange-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-orange-100/60 leading-relaxed italic">
                      &quot;Foundational strength in computer science is the primary firewall against technical obsolescence.&quot;
                    </p>
                    <p className="text-[10px] text-orange-500 font-bold uppercase">&mdash; Axiom Sensei</p>
                  </div>
                  <Link 
                    href="/lessons"
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all shrink-0"
                  >
                    Start Training Modules
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
