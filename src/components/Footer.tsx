import { Shield, Sparkles, Flame, HelpCircle, Heart, Send } from 'lucide-react';
import React, { useState } from 'react';

interface FooterProps {
  onCtaClick: () => void;
}

export default function Footer({ onCtaClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Upper newsletter element */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 mb-12 border-b border-indigo-950/40 items-center">
          
          <div className="md:col-span-6">
            <h4 className="font-display text-lg sm:text-xl font-black text-white mb-2 uppercase tracking-tight">
              Join the Ozzy Guild newsletter 📬
            </h4>
            <p className="text-sm text-slate-400">
              Get game strategy tips, free pixel cosmetic reveals, and early access to desktop versions.
            </p>
          </div>

          <div className="md:col-span-6 w-full">
            {subscribed ? (
              <div className="p-4 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-xs font-black uppercase tracking-wider text-center">
                🎉 Welcome to the Guild! Custom stickers sent!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3 text-xs rounded-full bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-hidden focus:border-brand-primary transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Join Guild</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand slot */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-primary rounded-[0.8rem] flex items-center justify-center shadow-lg shadow-brand-primary/25">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-white">
                  <path d="M 35,42 Q 22,12 40,20 Q 42,32 35,42 Z" fill="#fff" />
                  <path d="M 65,42 Q 78,12 60,20 Q 58,32 65,42 Z" fill="#fff" />
                  <ellipse cx="38" cy="55" rx="7" ry="7" fill="#fff" />
                  <ellipse cx="62" cy="55" rx="7" ry="7" fill="#fff" />
                </svg>
              </div>
              <span className="font-display font-black text-xl text-white uppercase tracking-wider">Ozzy</span>
            </div>
            
            <p className="text-xs text-slate-405 leading-relaxed max-w-[240px]">
              The level-based study and habit routine companion designed to spark real interest in getting matters completed.
            </p>

            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-slate-900 border border-slate-850 hover:text-white px-2.5 py-1 rounded-full text-slate-400 font-mono tracking-widest font-bold uppercase">
                iOS
              </span>
              <span className="text-[10px] bg-slate-900 border border-slate-850 hover:text-white px-2.5 py-1 rounded-full text-slate-400 font-mono tracking-widest font-bold uppercase">
                Android
              </span>
              <span className="text-[10px] bg-slate-900 border border-slate-850 hover:text-white px-2.5 py-1 rounded-full text-slate-400 font-mono tracking-widest font-bold uppercase">
                Web
              </span>
            </div>
          </div>

          {/* Column 2: Legal links */}
          <div>
            <h5 className="font-display font-black text-xs text-white tracking-widest uppercase mb-5">
              Legal Guild
            </h5>
            <ul className="space-y-3 text-xs font-mono font-bold uppercase tracking-wider">
              <li>
                <a href="#privacy" className="hover:text-brand-primary transition-all">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-brand-primary transition-all">Terms of Service</a>
              </li>
              <li>
                <a href="#dpa" className="hover:text-brand-primary transition-all">Data Processing Agreement</a>
              </li>
              <li>
                <a href="#rules" className="hover:text-brand-primary transition-all">Fair Play Guidelines</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Contact */}
          <div>
            <h5 className="font-display font-black text-xs text-white tracking-widest uppercase mb-5">
              Player Support
            </h5>
            <ul className="space-y-3 text-xs font-mono font-bold uppercase tracking-wider">
              <li>
                <a href="#sub" className="hover:text-brand-primary transition-all">Submit a Ticket</a>
              </li>
              <li>
                <a href="#discord" className="hover:text-brand-primary transition-all">Community Portal</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-primary transition-all font-black text-brand-secondary">Frequently Asked FAQ</a>
              </li>
              <li>
                <a href="#api" className="hover:text-brand-primary transition-all">Developer API</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Playful App Stats & CTA */}
          <div className="flex flex-col items-start justify-between bg-slate-900 p-5 rounded-[1.8rem] border border-slate-850">
            <div>
              <span className="text-[10px] font-mono tracking-widest font-black text-brand-primary uppercase">
                Free download
              </span>
              <h6 className="font-display font-black text-white text-sm uppercase tracking-wider mt-1.5 mb-2">
                Level up your focus
              </h6>
              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                No credit cards. Take your productivity companion anywhere today.
              </p>
            </div>
            <button 
              onClick={onCtaClick}
              className="w-full text-center py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white text-[11px] font-mono font-black uppercase tracking-wider rounded-full transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              Start Ozzy Quest
            </button>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Ozzy Productivity Inc. Inspired by pet gamification loops.
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-medium font-sans">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for highly focus-driven guilds globally.
          </div>
        </div>

      </div>
    </footer>
  );
}
