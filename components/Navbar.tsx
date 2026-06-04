import { Sun, Moon, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onCtaClick: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode, onCtaClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-light-bg/75 dark:bg-slate-950/75 border-b border-slate-200/50 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-22 flex items-center justify-between">
        
        {/* Brand identity logo + brand name */}
        <div className="flex items-center gap-3 group cursor-pointer">
          
          {/* App Icon placeholder (Ozzy Squircle Face in Indigo) */}
          <div className="relative w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 bg-linear-to-tr from-brand-primary to-indigo-500 group-hover:scale-105 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-white/10" />
            <svg viewBox="0 0 100 100" className="w-6 h-6 text-white font-black">
              {/* Ears */}
              <path d="M 35,42 Q 22,12 40,20 Q 42,32 35,42 Z" fill="#fff" />
              <path d="M 65,42 Q 78,12 60,20 Q 58,32 65,42 Z" fill="#fff" />
              {/* Cute face eyes */}
              <ellipse cx="38" cy="55" rx="6" ry="6" fill="#fff" />
              <ellipse cx="62" cy="55" rx="6" ry="6" fill="#fff" />
              {/* eye shine */}
              <circle cx="39" cy="53" r="2.2" fill="#4F46E5" />
              <circle cx="63" cy="53" r="2.2" fill="#4F46E5" />
              {/* happy mouth */}
              <path d="M 45,63 Q 50,67 55,63" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-2xl font-black tracking-tight uppercase text-slate-900 dark:text-slate-100 flex items-center gap-1.5 leading-none">
              Ozzy 
              <span className="text-[10px] bg-brand-primary/10 dark:bg-brand-primary/25 text-brand-primary px-2 py-0.5 rounded-full font-sans font-bold tracking-normal hidden sm:inline-block normal-case">
                v1.0
              </span>
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
              Focus Companion
            </span>
          </div>

        </div>

        {/* Center Desktop Links based on theme layout */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">
          <a href="#landing-root" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</a>
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-slate-900 dark:hover:text-white transition-colors">Guild Portal</a>
        </div>

        {/* Action Controls & CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Dark Mode toggle with aesthetic icons */}
          <button
            onClick={toggleDarkMode}
            className="p-2 sm:p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all cursor-pointer shadow-xs"
            aria-label="Toggle Dark Mode"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Night Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-brand-yellow" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Download CTA Button */}
          <button
            onClick={onCtaClick}
            className="relative overflow-hidden px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-brand-primary dark:hover:bg-brand-primary/90 text-white rounded-full text-xs sm:text-sm font-bold font-sans tracking-wider uppercase transition-all active:scale-[0.98] shadow-md shadow-slate-900/10 dark:shadow-brand-primary/10 flex items-center gap-1.5 sm:gap-2 border border-slate-800 dark:border-white/10 group cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            <span>Download</span>
          </button>

        </div>

      </div>
    </nav>
  );
}
