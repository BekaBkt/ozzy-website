import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, ArrowRight, CheckCircle2, QrCode } from 'lucide-react';
import React, { useState } from 'react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [device, setDevice] = useState<'ios' | 'android'>('ios');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      setSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
        
        {/* Dark backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl z-10 p-6 sm:p-8 text-left transition-colors duration-300"
        >
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-705 dark:hover:text-slate-200 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Heading with App Icon */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 bg-brand-primary rounded-[1.1rem] flex items-center justify-center shadow-lg shadow-brand-primary/25 shrink-0 bg-linear-to-tr from-brand-primary to-orange-400">
              <svg viewBox="0 0 100 100" className="w-7 h-7 text-white">
                <path d="M 35,42 Q 22,12 40,20 Q 42,32 35,42 Z" fill="#fff" />
                <path d="M 65,42 Q 78,12 60,20 Q 58,32 65,42 Z" fill="#fff" />
                <ellipse cx="38" cy="55" rx="7" ry="7" fill="#fff" />
                <ellipse cx="62" cy="55" rx="7" ry="7" fill="#fff" />
              </svg>
            </div>
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 dark:text-white leading-none uppercase tracking-tight">
                Join the Ozzy Quest Guild
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Unlock your ultimate character-driven productivity companion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center border-t border-b border-indigo-50/50 dark:border-slate-800 py-6 my-6">
            
            {/* Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest font-black text-slate-400 dark:text-slate-500 uppercase block">
                  Select Ecosystem
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setDevice('ios'); setSubmitted(false); }}
                    className={`flex-1 py-2.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider border transition-all cursor-pointer ${
                      device === 'ios'
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Apple iOS
                  </button>
                  <button
                    onClick={() => { setDevice('android'); setSubmitted(false); }}
                    className={`flex-1 py-2.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider border transition-all cursor-pointer ${
                      device === 'android'
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Google Play
                  </button>
                </div>
              </div>

              {/* Instant Link via phone text */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest font-black text-slate-400 dark:text-slate-500 uppercase block">
                  Text link to Phone
                </label>
                {submitted ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-full text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 stroke-[2.5]" />
                    <span>Focus link sent! Check your sms inbox to summon Ozzy.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex gap-1.5">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      required
                      className="flex-1 min-w-0 px-4 py-2.5 text-xs rounded-full bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-brand-primary text-white text-[10px] font-mono font-black uppercase tracking-wider rounded-full hover:bg-brand-primary/95 shadow-xs shrink-0 cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Simulated QR Code for download */}
            <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-[1.8rem] border border-slate-100 dark:border-slate-800/80">
              
              {/* Custom SVG QR Code styling */}
              <div className="relative w-28 h-28 bg-white p-2 rounded-2xl flex items-center justify-center shadow-xs border border-slate-200/50">
                <QrCode className="w-full h-full text-slate-800" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-brand-primary rounded-[0.4rem] flex items-center justify-center shadow">
                  <svg viewBox="0 0 100 100" className="w-4 h-4 text-white">
                    <path d="M 35,42 Q 22,12 40,20 Q 42,32 35,42 Z" fill="#fff" />
                    <path d="M 65,42 Q 78,12 60,20 Q 58,32 65,42 Z" fill="#fff" />
                    <circle cx="50" cy="55" r="8" fill="#fff" />
                  </svg>
                </div>
              </div>

              <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 mt-3 text-center tracking-wider">
                SCAN TO JOIN INSTANTLY
              </span>
            </div>

          </div>

          <div className="flex justify-between items-center text-[10px] font-mono tracking-wide text-slate-400 select-none uppercase font-bold">
            <span className="flex items-center gap-1">
              🔒 Safe & secure sandbox download
            </span>
            <span>Est. load time: &lt; 5s</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
