import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Apple,
  Play,
  X,
  QrCode,
  Timer,
  Flame,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import OzzyHeroAnimation from './components/OzzyHeroAnimation';
import imgStage1 from './components/img/SS1.png';
import imgStage2 from './components/img/SS3.png';
import imgStage3 from './components/img/streak0.png';
import imgStage4 from './components/img/SS4.png';
import ozzyIcon from './components/img/ozzy-icon.png';
import SupportModal from './components/SupportModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'appstore' | 'googleplay' | 'general'>('general');
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [simActive, setSimActive] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Interactive Simulator States
  const [petLevel, setPetLevel] = useState(1);
  const [petXp, setPetXp] = useState(30);
  const [petStress, setPetStress] = useState(20);
  const [streakDays, setStreakDays] = useState(4);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes simulated
  const [simMsg, setSimMsg] = useState("Woof! Let's crush our goals today! 🚀");

  // Phone Mockup Image Fallback States (to show clean CSS mockup if images are missing)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({
    SS3: false,
    SS4: false,
    SS5: false,
    SS7: false,
  });

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Handle rapid countdown timer when active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeTimer !== null) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 10) {
            clearInterval(interval!);
            setActiveTimer(null);
            setPetXp((xp) => {
              const nextXp = xp + 35;
              if (nextXp >= 100) {
                setPetLevel((lvl) => lvl + 1);
                setSimMsg("🎉 LEVEL UP! Ozzy evolved a new trait! You are unstoppable.");
                return nextXp - 100;
              }
              setSimMsg("💫 Quest Completed! You earned +35 XP and lessened your stress!");
              return nextXp;
            });
            setPetStress((s) => Math.max(0, s - 15));
            setStreakDays((s) => s + 1);
            return 600;
          }
          return prev - 10; // 100x speed
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimer]);

  const triggerDownloadModal = (type: 'appstore' | 'googleplay' | 'general') => {
    setModalType(type);
    setIsModalOpen(true);
    setIsSubscribed(false);
    setEmailInput('');
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setIsSubscribed(true);
    }
  };

  const handleSimFeed = () => {
    setPetStress((s) => Math.max(0, s - 10));
    setPetXp((xp) => {
      const nextXp = xp + 10;
      if (nextXp >= 100) {
        setPetLevel((lvl) => lvl + 1);
        setSimMsg("✨ Delicious! Evolved to the next Level!");
        return nextXp - 100;
      }
      setSimMsg("Nom nom! Ozzy loved the focus berries! 🍓");
      return nextXp;
    });
  };

  const handleSimPet = () => {
    setPetStress((s) => Math.max(0, s - 12));
    setSimMsg("Yawwwwwn... Ozzy feels extremely safe with you now! ❤️");
  };

  const startFocusQuest = () => {
    if (activeTimer) {
      setActiveTimer(null);
      setSimMsg("Quest paused! Ozzy is waiting for your return.");
    } else {
      setActiveTimer(1);
      setSimMsg("⚔️ Focus Session commenced! Ozzy is studying beside you.");
    }
  };

  const formatMinSec = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div id="ozzy-landing" className="min-h-screen bg-white text-[#11252C] font-sans antialiased overflow-x-hidden selection:bg-[#47A659] selection:text-white">

      {/* 1. Navigation Bar */}
      <nav id="nav-bar" className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo Brand left */}
          <div className="flex items-center gap-3">
            <img src={ozzyIcon} alt="Ozzy App Icon" className="w-10 h-10 rounded-xl shadow-sm object-cover" />
            <span className="font-display font-black text-xl tracking-wider text-[#11252C] uppercase">
              Ozzy
            </span>
          </div>

          {/* CTA Right */}
          <div className="flex items-center gap-3">
            <div
              id="btn-nav-app-store"
              className="opacity-40 select-none pointer-events-none flex shrink-0"
              aria-label="Download on the App Store"
            >
              <img
                src="/app-store-badge.svg"
                alt="Download on the App Store"
                className="h-10 w-auto"
              />
            </div>

            <div className="relative flex shrink-0">
              <div
                id="btn-nav-google-play"
                className="opacity-40 select-none pointer-events-none"
                aria-label="Get it on Google Play"
              >
                <img 
                  src="/google-play-badge.svg" 
                  alt="Get it on Google Play" 
                  className="h-10 w-auto" 
                />
              </div>
              <div className="absolute top-[8px] left-[142px] flex items-center pointer-events-none select-none z-50">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#47A659" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 transform translate-y-0.5">
                    <path d="M20 11.5c-3 0.3-11-0.2-16 0.5" />
                    <path d="M9 6.5l-5 5 5 4.5" />
                  </svg>
                <span className="font-handwritten text-base font-bold text-[#47A659] -rotate-6 select-none translate-y-0.5 whitespace-nowrap">
                  coming soon!
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - Centered Layout as per bitepal.app specification (Swapped order: Rive container first, text below) */}
      <header id="hero-section" className="w-full bg-white pt-16 pb-20 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">

          {/* Top micro-badge tag */}
          {/* <div className="inline-flex items-center gap-2 px-3 tracking-widest py-1 bg-[#47A659]/10 rounded-full text-[10px] font-mono font-bold text-[#47A659] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            VIRTUAL COMPANION & PRODUCTIVITY APP
          </div> */}

          {/* Rive Placeholder Container - Perfect Centered Aspect Ratio 1024x576 - Swept to Top of Hero */}
          <div className="w-full max-w-[1024px] mt-2 px-1">
            <div
              id="rive-interactive-container"
              className="relative w-full aspect-[1024/576] bg-white rounded-[2rem] overflow-hidden shadow-xl flex flex-col items-center justify-center transition-all group"
            >

              {!simActive ? (
                // Inactive State: Rive Animation plays in the background, with an overlay play button
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">

                  {/* The actual Rive animation rendering in full width/height absolute container */}
                  <div className="absolute inset-0 w-full h-full">
                    <OzzyHeroAnimation />
                  </div>

                  {/* Glassmorphic/Semi-transparent control overlay */}


                </div>
              ) : (
                // Interactive Simulator State (White & Green theme, text #11252C)
                <div className="absolute inset-0 flex flex-col justify-between bg-white p-5 select-none">

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🐶</span>
                      <div className="text-left">
                        <h4 className="text-[10px] font-mono font-black tracking-widest text-[#47A659] uppercase leading-none">
                          Virtual Pet Simulator
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`block w-1.5 h-1.5 rounded-full ${activeTimer ? 'bg-[#47A659] animate-pulse' : 'bg-gray-400'}`} />
                          <span className="font-mono text-[9px] font-bold text-[#11252C] uppercase tracking-wider">
                            {activeTimer ? 'Quest In Progress' : 'Idle Room'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Streak badge */}
                    <div className="flex items-center gap-1 bg-[#47A659]/10 border border-[#47A659]/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#47A659] uppercase">
                      <Flame className="w-3.5 h-3.5 fill-[#47A659] text-[#47A659]" />
                      <span>{streakDays}d Streak</span>
                    </div>
                  </div>

                  {/* Body: Focus Pet Window */}
                  <div className="flex-1 grid grid-cols-12 gap-4 items-center">

                    {/* Ozzy graphic rendering */}
                    <div className="col-span-5 flex flex-col items-center justify-center text-center">

                      <div className="relative w-24 h-24 bg-[#47A659]/5 rounded-full border border-gray-150 flex items-center justify-center shadow-inner">
                        {/* Interactive reaction face */}
                        <motion.div
                          animate={{
                            y: activeTimer ? [0, -5, 0] : [0, -3, 0],
                            scale: activeTimer ? [1, 1.05, 1] : 1
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: activeTimer ? 1 : 2,
                            ease: "easeInOut"
                          }}
                          className="text-4xl filter drop-shadow-md"
                        >
                          {petStress > 50 ? '😭' : activeTimer ? '⚔️' : petXp > 80 ? '😋' : '🐶'}
                        </motion.div>

                        {/* Little sparks when timer active */}
                        {activeTimer && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                            className="absolute inset-0 border-2 border-dashed border-[#47A659]/30 rounded-full"
                          />
                        )}

                        {/* Level Ring Badge */}
                        <div className="absolute -bottom-1 -right-1 bg-[#11252C] text-white w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] font-bold border border-white">
                          L{petLevel}
                        </div>
                      </div>

                      {/* XP Bar */}
                      <div className="w-full max-w-[110px] mt-3">
                        <div className="flex justify-between text-[8px] font-mono text-[#11252C]/60 uppercase mb-0.5 leading-none">
                          <span>XP</span>
                          <span>{petXp}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden border border-gray-200/55">
                          <div className="bg-[#47A659] h-full transition-all duration-300" style={{ width: `${petXp}%` }} />
                        </div>
                      </div>

                    </div>

                    {/* Dialogue box & stats */}
                    <div className="col-span-7 flex flex-col justify-center gap-3">

                      {/* Message cloud */}
                      <div className="relative p-3 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] text-[#11252C]/90 font-sans tracking-tight leading-snug text-left">
                        <p>{simMsg}</p>
                        {/* Triangle arrow */}
                        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-gray-50" />
                      </div>

                      {/* Simulated Timer Counter */}
                      <div className="flex items-center justify-between bg-gray-50/50 border border-gray-100 p-2.5 rounded-xl">
                        <div className="flex items-center gap-1.5">
                          <Timer className="w-4 h-4 text-[#47A659]" />
                          <span className="font-mono text-base font-black tracking-tight text-[#11252C]">
                            {formatMinSec(timerSeconds)}
                          </span>
                        </div>
                        <button
                          onClick={startFocusQuest}
                          className="px-3.5 py-1.5 bg-[#47A659] hover:bg-[#47A659]/90 text-white rounded-lg text-[9px] font-mono font-black uppercase tracking-wider cursor-pointer"
                        >
                          {activeTimer ? 'PAUSE' : 'START QUEST'}
                        </button>
                      </div>

                    </div>

                  </div>

                  {/* Actions footer */}
                  <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between gap-1.5">
                    <button
                      onClick={handleSimFeed}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-white border border-gray-200 hover:border-[#47A659] rounded-xl text-[9px] font-mono font-black uppercase tracking-wider text-[#11252C] transition-all cursor-pointer"
                    >
                      🍓 Feed Focus Berries
                    </button>
                    <button
                      onClick={handleSimPet}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-white border border-gray-200 hover:border-[#47A659] rounded-xl text-[9px] font-mono font-black uppercase tracking-wider text-[#11252C] transition-all cursor-pointer"
                    >
                      ❤️ Pet Ozzy (-12 Stress)
                    </button>

                    <button
                      onClick={() => {
                        setSimActive(false);
                        if (activeTimer) setActiveTimer(null);
                      }}
                      className="p-1.5 text-gray-400 hover:text-[#11252C] rounded-lg cursor-pointer"
                      title="Deactivate Game"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* Headlines centered - Swept below Rive Container */}
          <div className="space-y-4 max-w-3xl mt-8">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-wide text-[#11252C] leading-none uppercase">
              Quiet the noise <br /> <span className="text-[#47A659] tracking-[4px]">Find your focus</span>
            </h1>

            <h2 className="font-display font-black text-xl sm:text-2xl text-[#11252C]/90 tracking-tight uppercase">
              Focus is your <span className="text-[#47A659] underline decoration-wavy decoration-2 underline-offset-4">Superpower.</span>
            </h2>
          </div>

          {/* Subheadline centered */}
          <p className="text-base sm:text-lg text-[#11252C]/80 font-normal leading-relaxed max-w-xl mx-auto font-montserrat">
            Turn your daily goals into an RPG. Grow your digital companion, unlock rare traits, and reclaim your attention span with Ozzy.
          </p>

          {/* Trust badge */}
          <div className="flex items-center gap-2 text-[10px] text-[#11252C]/50 font-mono tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-[#47A659]" />
            <span>SECURITY VERIFIED • ZERO TRACKERS</span>
          </div>

        </div>
      </header>

      {/* 3. Alternating Feature Showcase Row Matrix */}
      <section id="features-section" className="w-full bg-white py-16 md:py-24 space-y-24 md:space-y-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24 space-y-3">
            <span className="text-xs font-display font-bold text-[#47A659] tracking-widest uppercase">
              How Ozzy Works
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-[#11252C] uppercase tracking-tight">
              An RPG game powered by your focus sessions
            </h3>
            <p className="text-sm sm:text-base text-[#11252C]/75 leading-relaxed font-montserrat">
              Our unique game design rewards genuine real-world habits. Evolve your virtual buddy, unlock powerful accessories, and defeat distraction.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">

            {/* Feature Row 1 (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left text column */}
              <div className="md:col-span-6 space-y-4 flex flex-col items-start text-left">
                <span className="text-xs font-mono font-bold text-[#47A659] tracking-wider uppercase bg-[#47A659]/10 px-2.5 py-1 rounded-full">
                  STAGE 01
                </span>
                <h4 className="font-display font-black text-3xl md:text-4xl text-[#11252C] tracking-tight leading-tight uppercase">
                  Character-Driven Focus
                </h4>
                <p className="text-[#11252C]/80 text-lg leading-relaxed font-montserrat">
                  Set a focus timer and stay on track alongside Ozzy. Your digital companion studies with you, turning deep work into an engaging, shared experience.
                </p>
              </div>
              {/* Right image column: Light pastel green rounded backdrop + Floating Screenshot */}
              <div className="md:col-span-6 flex justify-center">
                <div className="relative w-full max-w-md flex justify-center items-center py-12 group overflow-visible">

                  {/* Wide horizontal pastel green backdrop */}
                  <div className="absolute inset-x-0 top-8 bottom-8 rounded-[3rem] bg-[#E8F5E9]" />

                  <img
                    src={imgStage1}
                    alt="Character-Driven Focus"
                    className="relative z-10 w-full max-w-[250px] sm:max-w-[270px] h-auto object-contain shadow-2xl rounded-[2.5rem] border-[6px] border-white transition-all group-hover:translate-y-[-12px] group-hover:rotate-1"
                  />

                </div>
              </div>
            </div>

            {/* Feature Row 2 (Image Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left image column: Light pastel blue rounded backdrop + Floating Screenshot */}
              <div className="md:col-span-6 flex justify-center order-2 md:order-1">
                <div className="relative w-full max-w-md flex justify-center items-center py-12 group overflow-visible">

                  {/* Wide horizontal pastel blue backdrop */}
                  <div className="absolute inset-x-0 top-8 bottom-8 rounded-[3rem] bg-[#E3F2FD]" />

                  <img
                    src={imgStage2}
                    alt="AI-Powered Verification"
                    className="relative z-10 w-full max-w-[250px] sm:max-w-[270px] h-auto object-contain shadow-2xl rounded-[2.5rem] border-[6px] border-white transition-all group-hover:translate-y-[-12px] group-hover:rotate-[-1deg]"
                  />

                </div>
              </div>
              {/* Right text column */}
              <div className="md:col-span-6 space-y-4 flex flex-col items-start text-left order-1 md:order-2">
                <span className="text-xs font-mono font-bold text-[#47A659] tracking-wider uppercase bg-[#47A659]/10 px-2.5 py-1 rounded-full">
                  STAGE 02
                </span>
                <h4 className="font-display font-black text-3xl md:text-4xl text-[#11252C] tracking-tight leading-tight uppercase">
                  AI-Powered Verification
                </h4>
                <p className="text-[#11252C]/80 text-lg leading-relaxed font-montserrat">
                  Complete real-world tasks and prove it. Snap a photo, and our smart AI instantly analyzes the image to verify your action and grant rewards. No cheating allowed!
                </p>
              </div>
            </div>


            {/* Feature Row 3 (Text Left, Image Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 space-y-4 flex flex-col items-start text-left">
                <span className="text-xs font-mono font-bold text-[#47A659] tracking-wider uppercase bg-[#47A659]/10 px-2.5 py-1 rounded-full">
                  STAGE 03
                </span>
                <h4 className="font-display font-black text-3xl md:text-4xl text-[#11252C] tracking-tight leading-tight uppercase">
                  Build Unbreakable Streaks
                </h4>
                <p className="text-[#11252C]/80 text-lg leading-relaxed font-montserrat">
                  Keep the flame alive. Track your daily consistency, build unstoppable momentum, and visualize your progress with satisfying weekly habit tracking.
                </p>
              </div>
              <div className="md:col-span-6 flex justify-center">
                <div className="relative w-full max-w-md flex justify-center items-center py-12 group overflow-visible">
                  <div className="absolute inset-x-0 top-8 bottom-8 rounded-[3rem] bg-[#FFF3E0]" />
                  <img
                    src={imgStage3}
                    alt="Build Unbreakable Streaks"
                    className="relative z-10 w-full max-w-[250px] sm:max-w-[270px] h-auto object-contain shadow-2xl rounded-[2.5rem] border-[6px] border-white transition-all group-hover:translate-y-[-12px] group-hover:rotate-1"
                  />
                </div>
              </div>
            </div>

            {/* Feature Row 4 (Image Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Left image column: Light pastel gray/silver rounded backdrop + Floating Screenshot */}
              <div className="md:col-span-6 flex justify-center order-2 md:order-1">
                <div className="relative w-full max-w-md flex justify-center items-center py-12 group overflow-visible">

                  {/* Wide horizontal pastel gray backdrop */}
                  <div className="absolute inset-x-0 top-8 bottom-8 rounded-[3rem] bg-[#ECEFF1]" />

                  <img
                    src={imgStage4}
                    alt="Customize & Evolve"
                    className="relative z-10 w-full max-w-[250px] sm:max-w-[270px] h-auto object-contain shadow-2xl rounded-[2.5rem] border-[6px] border-white transition-all group-hover:translate-y-[-12px] group-hover:rotate-[-1deg]"
                  />

                </div>
              </div>
              {/* Right text column */}
              <div className="md:col-span-6 space-y-4 flex flex-col items-start text-left order-1 md:order-2">
                <span className="text-xs font-mono font-bold text-[#47A659] tracking-wider uppercase bg-[#47A659]/10 px-2.5 py-1 rounded-full">
                  STAGE 04
                </span>
                <h4 className="font-display font-black text-3xl md:text-4xl text-[#11252C] tracking-tight leading-tight uppercase">
                  Customize & Evolve
                </h4>
                <p className="text-[#11252C]/80 text-lg leading-relaxed font-montserrat">
                  Spend your earned focus coins in the Gear Shop. Unlock rare hats, accessories, and outfits to personalize your pet and show off your productivity.
                </p>
              </div>
            </div>

          </div>




        </div>
      </section>

      {/* 4. Footer - Minimalist and neat as per template */}
      <footer id="footer-section" className="w-full bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center">

          {/* Left brand trademark */}
          <div className="flex items-center gap-2.5 justify-center">
            <img src={ozzyIcon} alt="Ozzy App Icon" className="w-8 h-8 rounded-lg shadow-sm object-cover" />
            <span className="font-mono text-xs text-[#11252C] uppercase tracking-wider font-bold">
              © 2026 Ozzy Focus Labs. All rights reserved.
            </span>
          </div>

          {/* Right footer legal anchors */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <a
              href="/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold tracking-widest uppercase text-[#11252C]/80 hover:text-[#47A659] transition-colors"
            >
              PRIVACY POLICY
            </a>
            <a
              href="/terms.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold tracking-widest uppercase text-[#11252C]/80 hover:text-[#47A659] transition-colors"
            >
              TERMS OF SERVICE
            </a>
            <a
              href="mailto:support@cosmocode.studio?subject=Ozzy%20App%20Support"
              onClick={(e) => {
                e.preventDefault();
                setIsSupportOpen(true);
              }}
              className="text-xs font-mono font-bold tracking-widest uppercase text-[#11252C]/80 hover:text-[#47A659] transition-colors cursor-pointer"
            >
              SUPPORT
            </a>
          </div>

        </div>
      </footer>

      {/* 5. Custom Gamified Download Mode Modal (Perfect AnimatePresence overlay) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Seamless backdrop filter background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#11252C]/65 backdrop-blur-xs"
            />

            {/* Modal block dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden z-10 text-left"
            >

              {/* Close corner icon */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-50 text-gray-400 hover:text-[#11252C] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title brand & context icon */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#47A659]/10 flex items-center justify-center shrink-0">
                  <span className="text-lg animate-bounce">🐶</span>
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-[#11252C] uppercase tracking-tight leading-none">
                    Summon Ozzy
                  </h3>
                  <p className="text-xs text-[#11252C]/60 mt-1 uppercase font-mono font-bold tracking-wider">
                    {modalType === 'appstore' ? 'iOS Companion Summoning Guild' : modalType === 'googleplay' ? 'Android Guild Summoning' : 'Initiate Game Download'}
                  </p>
                </div>
              </div>

              {/* Simulated scan to instantly play / email integration option */}
              <div className="space-y-6">

                <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-100 p-4 rounded-2xl text-center">
                  <div className="w-24 h-24 bg-white p-2.5 rounded-xl border border-gray-100 flex items-center justify-center shadow-xs">
                    <QrCode className="w-full h-full text-[#11252C]" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-[#47A659] tracking-widest uppercase mt-3 block">
                    Scan with Mobile Camera to Install
                  </span>
                  <span className="text-[11px] text-[#11252C]/70 mt-1">
                    Instantly syncs secure RPG character progress to your device.
                  </span>
                </div>

                <div className="relative flex py-1.5 items-center">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink mx-3 text-[10px] font-mono text-[#11252C]/40 uppercase font-black tracking-wider">OR Text Link via Email</span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[#47A659]/10 border border-[#47A659]/25 text-[#47A659] rounded-xl text-xs font-mono font-bold uppercase text-center"
                  >
                    🚀 Link sent! Check your inbox to summon Ozzy.
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-black text-[#11252C]/60 uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="summon@ozzyguild.com"
                        className="w-full px-4 py-3 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#47A659] text-[#11252C]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#11252C] hover:bg-[#11252C]/90 text-white rounded-xl text-xs font-mono font-black uppercase tracking-widest cursor-pointer transition-all"
                    >
                      Receive App Quest Invite
                    </button>
                  </form>
                )}

              </div>

              {/* Extra legal details badge info */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                <span>🔒 100% PRIVATE</span>
                <span>ID: OZZY-PROD-2026</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

    </div>
  );
}
