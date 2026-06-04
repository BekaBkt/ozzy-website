import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Smartphone, Globe, Sparkles } from 'lucide-react';
import OzzySimulator from './OzzySimulator';

interface HeroProps {
  isDarkMode: boolean;
  onCtaClick: () => void;
}

export default function Hero({ isDarkMode, onCtaClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-linear-to-b from-light-bg to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      
      {/* Dynamic Background Blob Glows matching the Indigo theme */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-20 dark:opacity-10 filter blur-[90px] z-0">
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-brand-primary" />
        <div className="absolute bottom-5 left-10 w-80 h-80 rounded-full bg-brand-secondary" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Messaging under Bold Typography guidelines */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            
            {/* Playful Floating Badge aligned with the theme */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-brand-primary dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100 dark:border-indigo-900/30"
            >
              {/* App Icon mini placeholder */}
              <div className="w-5 h-5 bg-brand-primary rounded-md flex items-center justify-center shadow-md bg-linear-to-tr from-brand-primary to-indigo-500">
                <svg viewBox="0 0 100 100" className="w-3 h-3 text-white">
                  <path d="M 35,42 Q 22,12 40,20 Q 42,32 35,42 Z" fill="#fff" />
                  <path d="M 65,42 Q 78,12 60,20 Q 58,32 65,42 Z" fill="#fff" />
                </svg>
              </div>
              <span className="font-mono tracking-wider font-bold">
                Gamified Focus Assistant ✨
              </span>
            </motion.div>

            {/* Bold Black Punchy Headline leading-[0.95] tracking-tighter as requested */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7.5xl font-black leading-[0.95] tracking-tighter text-slate-900 dark:text-slate-100 mb-6 uppercase"
            >
              Focus more.<br/>
              <span className="text-brand-primary">Level up</span><br/>
              together.
            </motion.h1>

            {/* Subheadline describing game mechanics */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans font-normal leading-relaxed mb-8 max-w-md"
            >
              Build lasting habits by nurturing your digital companion. Every focused minute helps Ozzy grow, unlocking new traits, achievements, and unique gear.
            </motion.p>

            {/* Dual App Store / Google Play Buttons matching the requested style */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto"
            >
              {/* App Store Download */}
              <button 
                onClick={onCtaClick}
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl shadow-xl transition-all cursor-pointer text-left group border border-slate-800"
              >
                <Smartphone className="w-6 h-6 text-slate-200 shrink-0" />
                <div>
                  <div className="text-[10px] opacity-70 uppercase leading-none font-bold tracking-wider mb-1">
                    Download on the
                  </div>
                  <div className="text-sm font-black tracking-tight leading-none uppercase">
                    App Store
                  </div>
                </div>
              </button>

              {/* Google Play Download */}
              <button 
                onClick={onCtaClick}
                className="flex items-center gap-3 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-900 dark:text-white px-5 py-3 rounded-2xl shadow-sm transition-all cursor-pointer text-left group border border-slate-200 dark:border-slate-800"
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 48 48" className="w-5 h-5">
                    <polygon points="6,3 26,23 6,43" fill="#00C0FF" />
                    <polygon points="6,3 36,13 26,23" fill="#78C257" />
                    <polygon points="6,43 26,23 36,33" fill="#FFC107" />
                    <polygon points="36,13 44,21 44,25 36,33 26,23" fill="#FF5252" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] opacity-50 uppercase leading-none font-bold tracking-wider mb-1">
                    Get it on
                  </div>
                  <div className="text-sm font-black tracking-tight leading-none uppercase">
                    Google Play
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Testimonial / Social proof banner with clean borders */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 mt-10 pt-8 border-t border-slate-200/50 dark:border-slate-800/60 w-full"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400 overflow-hidden relative">
                    <img 
                      src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80&index=${i}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                      alt="User avatar" 
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                  ))}
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 ml-1">4.9/5</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Loved by over <span className="font-extrabold text-slate-700 dark:text-slate-300">45,000+</span> productivity guild members
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: High aspect ratio 1024x576 simulator element */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 w-full flex items-center justify-center"
          >
            <div className="w-full">
              <OzzySimulator isDarkMode={isDarkMode} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
