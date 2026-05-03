'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Trophy, ArrowRight, RotateCcw, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { sanitizeInput } from '@/lib/security';

const questions = [
  {
    id: 1,
    question: 'Which of the following is the most effective defense against SQL Injection?',
    options: ['Regular Expression filters', 'Parameterized Queries', 'Base64 encoding inputs', 'Client-side validation'],
    answer: 1,
    explanation: 'Parameterized queries ensure the database treats input as data, not as executable code.'
  },
  {
    id: 2,
    question: 'In the context of XSS, what does the "xss" library primarily do?',
    options: ['Encrypts user data', 'Strips malicious HTML tags and scripts', 'Prevents SQL execution', 'Blocks IP addresses'],
    answer: 1,
    explanation: 'The xss library sanitizes input by removing or neutralizing dangerous HTML and script tags.'
  },
  {
    id: 3,
    question: 'What is the main goal of Rate Limiting?',
    options: ['To speed up database queries', 'To prevent brute-force and DoS attacks', 'To compress network traffic', 'To encrypt session cookies'],
    answer: 1,
    explanation: 'Rate limiting controls traffic volume to prevent resource exhaustion and automated attacks.'
  },
  {
    id: 4,
    question: 'Which tool is commonly used for network discovery and security auditing?',
    options: ['Wazuh', 'Suricata', 'Nmap', 'React'],
    answer: 2,
    explanation: 'Nmap is the industry standard for network scanning and port auditing.'
  },
  {
    id: 5,
    question: 'According to OWASP, what is SSRF?',
    options: ['Safe Script Running Format', 'Server-Side Request Forgery', 'Secure System Recovery File', 'Session State Retrieval Function'],
    answer: 1,
    explanation: 'SSRF occurs when an attacker can abuse functionality on the server to read or update internal resources.'
  }
];

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export default function QuizPage() {
  const [userName, setUserName] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = () => {
    if (userName.trim()) {
      setIsStarted(true);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const sanitizedName = sanitizeInput(userName);
    const entry = { name: sanitizedName, score, date: new Date().toISOString() };
    
    const savedLeaderboard = localStorage.getItem('vibe_sentry_leaderboard');
    const leaderboard: LeaderboardEntry[] = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('vibe_sentry_leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-[#0a0500] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#120a05] border border-orange-900/30 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <GraduationCap className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Analyst Certification</h1>
            <p className="text-orange-200/60 text-sm">Verify your technical mastery over the Vibe Sentry defensive protocols.</p>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter Analyst Callsign..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-black border border-orange-900/30 px-4 py-3 rounded-xl text-orange-400 placeholder-orange-900 focus:outline-none focus:border-orange-500 font-mono text-sm"
            />
            <button 
              onClick={startQuiz}
              disabled={!userName.trim()}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-all shadow-lg shadow-orange-500/20"
            >
              Initiate Assessment
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#0a0500] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#120a05] border border-orange-900/30 p-10 rounded-2xl max-w-lg w-full shadow-2xl text-center space-y-8"
        >
          <div className="relative">
            <Trophy className="w-20 h-20 text-orange-500 mx-auto" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-green-500 text-black font-bold px-3 py-1 rounded-full text-xs"
            >
              LEVEL UP
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white uppercase">Assessment Complete</h2>
            <p className="text-orange-200/60 font-mono">Analyst: {userName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/50 border border-orange-900/20 p-4 rounded-xl">
              <p className="text-xs text-orange-500/50 uppercase mb-1">Final Score</p>
              <p className="text-3xl font-bold text-white">{score}/{questions.length}</p>
            </div>
            <div className="bg-black/50 border border-orange-900/20 p-4 rounded-xl">
              <p className="text-xs text-orange-500/50 uppercase mb-1">Rank</p>
              <p className="text-3xl font-bold text-white">{score === 5 ? 'Elite' : score >= 3 ? 'Veteran' : 'Junior'}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link 
              href="/" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-all"
            >
              Return to Dashboard
            </Link>
            <button 
              onClick={() => window.location.reload()}
              className="text-orange-500 hover:text-orange-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#0a0500] text-gray-100 p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-bold uppercase tracking-tighter text-orange-200/60">Module {currentQuestion + 1} / {questions.length}</span>
          </div>
          <div className="text-sm font-mono text-orange-500">
            Score: {score}
          </div>
        </div>

        <div className="w-full bg-orange-900/20 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className="bg-orange-500 h-full" 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold leading-tight">{q.question}</h2>
          
          <div className="grid grid-cols-1 gap-3">
            {q.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q.answer;
              
              let variantClass = "bg-[#120a05] border-orange-900/30 text-orange-100/60 hover:border-orange-500/50 hover:bg-orange-500/5";
              if (selectedOption !== null) {
                if (isCorrect) variantClass = "bg-green-500/10 border-green-500 text-green-400";
                else if (isSelected) variantClass = "bg-red-500/10 border-red-500 text-red-400";
                else variantClass = "bg-[#120a05] border-orange-900/10 text-orange-100/20";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-5 rounded-xl border-2 transition-all flex items-center justify-between text-left group ${variantClass}`}
                >
                  <span className="font-medium">{option}</span>
                  {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                  {selectedOption !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-2 text-orange-400">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Sensei Insight</span>
              </div>
              <p className="text-sm text-orange-100/70 italic leading-relaxed">
                &quot;{q.explanation}&quot;
              </p>
              <button 
                onClick={nextQuestion}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                Next Directve
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
