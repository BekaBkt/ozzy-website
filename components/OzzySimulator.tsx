import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Flame, Sparkles, Heart, Coffee, ShieldAlert, CheckCircle2, Award } from 'lucide-react';
import { OzzyState, InteractiveHabit, FocusSession } from '../types';

interface OzzySimulatorProps {
  isDarkMode: boolean;
}

export default function OzzySimulator({ isDarkMode }: OzzySimulatorProps) {
  // Simulator State
  const [characterState, setCharacterState] = useState<OzzyState>('idle');
  const [xp, setXp] = useState(65);
  const [level, setLevel] = useState(3);
  const [streakCount, setStreakCount] = useState(12);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  // Focus Session State
  const [focusSession, setFocusSession] = useState<FocusSession>({
    isActive: false,
    timeLeft: 1500, // 25 mins
    duration: 1500,
    sessionCount: 2
  });

  // Confetti particles for level up
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // Simulation speed factor (100x when fast-forwarding, of course!)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive local habits list
  const [habits, setHabits] = useState<InteractiveHabit[]>([
    { id: '1', title: 'Read 10 pages', category: 'mind', streak: 4, completed: false },
    { id: '2', title: 'Code landing page', category: 'work', streak: 8, completed: false },
    { id: '3', title: '30 mins workout', category: 'health', streak: 12, completed: false }
  ]);

  // Handle focus session timer
  useEffect(() => {
    if (focusSession.isActive) {
      timerRef.current = setInterval(() => {
        setFocusSession(prev => {
          if (prev.timeLeft <= 10) {
            // Completed!
            if (timerRef.current) clearInterval(timerRef.current);
            setCharacterState('levelup');
            triggerConfetti();
            setXp(oldXp => {
              const newXp = oldXp + 35;
              if (newXp >= 100) {
                setLevel(l => l + 1);
                return newXp - 100;
              }
              return newXp;
            });
            return {
              ...prev,
              isActive: false,
              timeLeft: 1500,
              sessionCount: prev.sessionCount + 1
            };
          }
          // Fast-forward simulation: subtract 15s every step (every 100ms)
          return {
            ...prev,
            timeLeft: prev.timeLeft - 15
          };
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [focusSession.isActive]);

  // Reset state to idle after some seconds
  useEffect(() => {
    if (characterState === 'happy' || characterState === 'levelup') {
      const timer = setTimeout(() => {
        if (focusSession.isActive) {
          setCharacterState('focusing');
        } else {
          setCharacterState('idle');
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [characterState, focusSession.isActive]);

  const triggerConfetti = () => {
    const colors = ['#FF5E5B', '#00CECB', '#FFED66', '#3B82F6', '#10B981'];
    const newConfetti = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 30 + 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4000);
  };

  // Quick Action Handlers
  const handlePet = () => {
    setCharacterState('happy');
    setXp(v => {
      const next = v + 5;
      if (next >= 100) {
        setLevel(l => l + 1);
        triggerConfetti();
        setCharacterState('levelup');
        return next - 100;
      }
      return next;
    });
  };

  const handleToggleFocus = () => {
    if (focusSession.isActive) {
      setFocusSession(prev => ({ ...prev, isActive: false }));
      setCharacterState('idle');
    } else {
      setFocusSession(prev => ({ ...prev, isActive: true, timeLeft: 1500 }));
      setCharacterState('focusing');
    }
  };

  const handleCompleteHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        if (!h.completed) {
          // Trigger reward
          setCharacterState('happy');
          setStreakCount(s => s + 1);
          setXp(oldXp => {
            const added = h.id === '3' ? 25 : 15; // Health workouts give more XP!
            const newXp = oldXp + added;
            if (newXp >= 100) {
              setLevel(l => l + 1);
              triggerConfetti();
              setCharacterState('levelup');
              return newXp - 100;
            }
            return newXp;
          });
          return { ...h, completed: true, streak: h.streak + 1 };
        }
        return h;
      }
      return h;
    }));
  };

  const handleResetHabits = () => {
    setHabits(prev => prev.map(h => ({ ...h, completed: false })));
    setStreakCount(12);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div id="rive-demo-container" className="relative w-full aspect-[1024/576] rounded-[2rem] overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors shadow-2xl flex flex-col md:flex-row">
      
      {/* Decorative Rive Canvas Label Overlay */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono text-[10px] tracking-wider text-slate-400 dark:text-slate-500 font-semibold bg-slate-200/50 dark:bg-slate-900/50 px-2 py-0.5 rounded backdrop-blur-xs">
          Rive Animation Asset (1024x576) | Interactive Simulator
        </span>
      </div>

      {/* Confetti container */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {confetti.map(c => (
          <motion.div
            key={c.id}
            initial={{ opacity: 1, y: -20, x: `${c.x}%` }}
            animate={{ 
              opacity: 0, 
              y: 400,
              rotate: 360,
              x: `${c.x + (Math.random() * 20 - 10)}%` 
            }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="absolute h-2 w-2 rounded-sm"
            style={{ backgroundColor: c.color }}
          />
        ))}
      </div>

      {/* Left Canvas - Ozzy character renderer (Visualizes Rive animation) */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 select-none bg-slate-100/50 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800 overflow-hidden min-h-[220px]">
        
        {/* Subtle grid decoration */}
        <div className="absolute inset-0 bg-dotted dark:bg-dotted-dark opacity-35 pointer-events-none"></div>

        {/* Environment Light Source / Aura */}
        <div className={`absolute w-44 h-44 rounded-full filter blur-[60px] opacity-25 transition-all duration-1000 ${
          characterState === 'focusing' ? 'bg-indigo-500' :
          characterState === 'levelup' ? 'bg-amber-400 scale-150' :
          characterState === 'happy' ? 'bg-emerald-400 scale-120' : 'bg-brand-primary'
        }`} />

        {/* Ozzy companion representation (Visual Canvas using SVG + dynamic animations) */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-2 z-10 cursor-pointer" onClick={handlePet}>
          <AnimatePresence mode="wait">
            
            {characterState === 'idle' && (
              <motion.g
                key="idle"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center justify-center"
              >
                {/* IDLE OZZY */}
                <svg viewBox="0 0 200 200" className="w-36 h-36">
                  {/* Body shadow */}
                  <ellipse cx="100" cy="170" rx="45" ry="10" fill="#000" opacity="0.15" />
                  
                  {/* Ears */}
                  <path d="M 60,65 Q 40,25 70,35 Q 75,55 60,65 Z" fill="#FF5E5B" />
                  <path d="M 140,65 Q 160,25 130,35 Q 125,55 140,65 Z" fill="#FF5E5B" />
                  <path d="M 65,60 Q 53,35 70,42 Q 72,53 65,60 Z" fill="#FFEAA7" opacity="0.8" />
                  <path d="M 135,60 Q 147,35 130,42 Q 128,53 135,60 Z" fill="#FFEAA7" opacity="0.8" />

                  {/* Body body bundle anim */}
                  <motion.g
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    {/* Main rounded body */}
                    <ellipse cx="100" cy="115" rx="55" ry="50" fill="#FF5E5B" />
                    
                    {/* Soft belly */}
                    <ellipse cx="100" cy="125" rx="35" ry="28" fill="#FFEAA7" />

                    {/* Cute blushing cheeks */}
                    <circle cx="68" cy="115" r="7" fill="#FF8E8B" opacity="0.8" />
                    <circle cx="132" cy="115" r="7" fill="#FF8E8B" opacity="0.8" />

                    {/* Cute responsive eyes */}
                    <g>
                      <motion.circle 
                        cx="75" cy="105" r="8" fill="#1E293B"
                        animate={{ scaleY: [1, 1, 0.1, 1, 1] }} 
                        transition={{ repeat: Infinity, duration: 4 }}
                      />
                      <motion.circle 
                        cx="125" cy="105" r="8" fill="#1E293B"
                        animate={{ scaleY: [1, 1, 0.1, 1, 1] }} 
                        transition={{ repeat: Infinity, duration: 4 }}
                      />
                      {/* eye shine */}
                      <circle cx="77" cy="102" r="3" fill="#FFF" />
                      <circle cx="127" cy="102" r="3" fill="#FFF" />
                    </g>

                    {/* Mouth */}
                    <path d="M 96,115 Q 100,111 104,115" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </motion.g>

                  {/* Little tiny arms */}
                  <motion.path 
                    d="M 46,120 Q 30,125 40,135" stroke="#FF5E5B" strokeWidth="12" strokeLinecap="round" fill="none"
                    animate={{ rotate: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M 154,120 Q 170,125 160,135" stroke="#FF5E5B" strokeWidth="12" strokeLinecap="round" fill="none"
                    animate={{ rotate: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </motion.g>
            )}

            {characterState === 'focusing' && (
              <motion.g
                key="focusing"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center justify-center"
              >
                {/* STUDY OZZY */}
                <svg viewBox="0 0 200 200" className="w-36 h-36">
                  {/* Floor Shadow */}
                  <ellipse cx="100" cy="170" rx="45" ry="10" fill="#000" opacity="0.15" />
                  
                  {/* Laptop background wire representation */}
                  <path d="M 40,80 Q 30,40 25,50" stroke="#818CF8" strokeWidth="2" strokeDasharray="3,3" fill="none" opacity="0.4" />

                  {/* Body with soft typing wiggle */}
                  <motion.g
                    animate={{ 
                      x: [-1, 1, -1, 1, -1],
                      y: [0, -1, 0, -1, 0] 
                    }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Ears flattened in deep focus */}
                    <path d="M 64,68 Q 48,45 74,48 Q 78,60 64,68 Z" fill="#FF5E5B" />
                    <path d="M 136,68 Q 152,45 126,48 Q 122,60 136,68 Z" fill="#FF5E5B" />

                    <ellipse cx="100" cy="115" rx="55" ry="50" fill="#FF5E5B" />
                    <ellipse cx="100" cy="125" rx="35" ry="28" fill="#FFEAA7" />

                    {/* Tiny retro focus glasses */}
                    <circle cx="75" cy="105" r="14" stroke="#FFEAA7" strokeWidth="4" fill="none" />
                    <circle cx="125" cy="105" r="14" stroke="#FFEAA7" strokeWidth="4" fill="none" />
                    <line x1="89" y1="105" x2="111" y2="105" stroke="#FFEAA7" strokeWidth="4" />

                    {/* Concentrated focused eyes (flat lines) */}
                    <line x1="70" y1="105" x2="80" y2="105" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="120" y1="105" x2="130" y2="105" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

                    {/* Cute light bulb of inspiration floating off-to-top */}
                    <motion.g
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="origin-bottom"
                    >
                      <circle cx="100" cy="45" r="8" fill="#FFED66" />
                      <line x1="100" y1="53" x2="100" y2="57" stroke="#FFED66" strokeWidth="2" />
                    </motion.g>

                    {/* Little arms typing on a keyboard */}
                    <motion.path 
                      d="M 45,125 Q 30,120 50,135" stroke="#FF5E5B" strokeWidth="12" strokeLinecap="round" fill="none"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.2 }}
                    />
                    <motion.path 
                      d="M 155,125 Q 170,120 150,135" stroke="#FF5E5B" strokeWidth="12" strokeLinecap="round" fill="none"
                      animate={{ y: [4, 0, 4] }}
                      transition={{ repeat: Infinity, duration: 0.2 }}
                    />
                  </motion.g>

                  {/* Tiny glowing laptop in front of him */}
                  <g>
                    <path d="M 70,145 L 130,145 L 140,165 L 60,165 Z" fill="#475569" className="transition-all" />
                    <path d="M 75,145 L 125,145 L 120,132 L 80,132 Z" fill="#38BDF8" opacity="0.8" />
                    {/* Keys dots */}
                    <circle cx="85" cy="155" r="2" fill="#94A3B8" />
                    <circle cx="100" cy="155" r="2" fill="#94A3B8" />
                    <circle cx="115" cy="155" r="2" fill="#94A3B8" />
                    <circle cx="92" cy="160" r="2" fill="#94A3B8" />
                    <circle cx="108" cy="160" r="2" fill="#94A3B8" />
                  </g>
                </svg>
              </motion.g>
            )}

            {characterState === 'happy' && (
              <motion.g
                key="happy"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1, rotate: [0, -5, 5, 0] }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center justify-center"
              >
                {/* HAPPY OZZY */}
                <svg viewBox="0 0 200 200" className="w-36 h-36">
                  <ellipse cx="100" cy="170" rx="55" ry="12" fill="#000" opacity="0.15" />
                  
                  {/* Floating hearts */}
                  <motion.g animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <path d="M 50,45 C 50,40 40,30 35,40 C 30,30 20,40 20,45 C 20,55 50,65 50,65 Z" fill="#FF5E5B" transform="scale(0.5) translate(40, 20)" />
                    <path d="M 140,45 C 140,40 130,30 125,40 C 120,30 110,40 110,45 C 110,55 140,65 140,65 Z" fill="#FF5E5B" transform="scale(0.5) translate(210, 30)" />
                  </motion.g>
                  
                  {/* Body bouncing */}
                  <motion.g
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Ears */}
                    <path d="M 60,65 Q 35,15 70,35 Q 75,55 60,65 Z" fill="#FF5E5B" />
                    <path d="M 140,65 Q 165,15 130,35 Q 125,55 140,65 Z" fill="#FF5E5B" />

                    <ellipse cx="100" cy="115" rx="55" ry="50" fill="#FF5E5B" />
                    <ellipse cx="100" cy="125" rx="35" ry="28" fill="#FFEAA7" />

                    <circle cx="68" cy="115" r="8" fill="#FF8E8B" opacity="0.9" />
                    <circle cx="132" cy="115" r="8" fill="#FF8E8B" opacity="0.9" />

                    {/* Happy squinting ^_^ eyes */}
                    <path d="M 65,108 L 75,102 L 85,108" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <path d="M 115,108 L 125,102 L 135,108" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" fill="none" />

                    {/* Happy open big mouth showing tongue */}
                    <path d="M 92,118 Q 100,132 108,118 Z" fill="#1E293B" />
                    <path d="M 96,123 Q 100,129 104,123 Z" fill="#FF8E8B" />
                  </motion.g>

                  {/* Arms waving */}
                  <motion.path 
                    d="M 46,120 Q 20,105 38,100" stroke="#FF5E5B" strokeWidth="12" strokeLinecap="round" fill="none"
                    animate={{ rotate: [0, 45, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                  />
                  <motion.path 
                    d="M 154,120 Q 180,105 162,100" stroke="#FF5E5B" strokeWidth="12" strokeLinecap="round" fill="none"
                    animate={{ rotate: [0, -45, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                  />
                </svg>
              </motion.g>
            )}

            {characterState === 'levelup' && (
              <motion.g
                key="levelup"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1.1], opacity: 1, rotate: [0, -10, 10, -5, 5, 0] }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center justify-center animate-pulse"
              >
                {/* LEVEL UP / SUPER CHARGE OZZY */}
                <svg viewBox="0 0 200 200" className="w-36 h-36">
                  {/* Glowing background star/sunburst */}
                  <motion.polygon 
                    points="100,10 120,70 180,50 140,100 190,140 120,130 100,190 80,130 10,140 60,100 20,50 80,70" 
                    fill="#FFED66" 
                    opacity="0.6"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  />
                  
                  <ellipse cx="100" cy="170" rx="55" ry="12" fill="#000" opacity="0.15" />

                  {/* Character Body super charged */}
                  <g>
                    <path d="M 60,65 Q 35,10 70,35 Q 75,55 60,65 Z" fill="#00CECB" />
                    <path d="M 140,65 Q 165,10 130,35 Q 125,55 140,65 Z" fill="#00CECB" />

                    <ellipse cx="100" cy="115" rx="55" ry="50" fill="#00CECB" />
                    <ellipse cx="100" cy="125" rx="35" ry="28" fill="#FFEAA7" />

                    <circle cx="68" cy="115" r="8" fill="#4BECEC" opacity="0.9" />
                    <circle cx="132" cy="115" r="8" fill="#4BECEC" opacity="0.9" />

                    {/* Excited sparkling eyes or diamond star-eyes */}
                    <path d="M 70,105 L 75,98 L 80,105 L 75,112 Z" fill="#1E293B" />
                    <path d="M 120,105 L 125,98 L 130,105 L 125,112 Z" fill="#1E293B" />

                    {/* Giant victory shout mouth */}
                    <circle cx="100" cy="122" r="10" fill="#1E293B" />
                    <circle cx="100" cy="124" r="6" fill="#FF5E5B" />
                  </g>

                  {/* Star crown floating above head */}
                  <motion.g animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <path d="M 85,45 L 90,40 L 95,45 L 100,32 L 105,45 L 110,40 L 115,45 Z" fill="#FFED66" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
                  </motion.g>
                </svg>
              </motion.g>
            )}
          </AnimatePresence>
        </div>

        {/* Level & Badge Display */}
        <div className="text-center z-10 w-full px-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm mb-2.5">
            <Award className="w-4 h-4 text-brand-primary animate-bounce" />
            <span className="text-[10px] font-mono font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              Ozzy Level {level}
            </span>
          </div>
          
          {/* XP Progress Bar */}
          <div className="w-full max-w-[200px] mx-auto bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-1 border border-slate-300/40 dark:border-slate-600/30">
            <motion.div 
              className="bg-brand-primary h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${xp}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider">
            {xp}/100 XP TO LEVEL {level + 1}
          </div>
        </div>

        {/* Fun floating pet interaction tooltip */}
        <div className="absolute bottom-3 text-center pointer-events-none">
          <p className="text-[10px] font-sans text-slate-400 dark:text-slate-500">
            💡 Click on Ozzy to pet him & earn +5 XP
          </p>
        </div>
      </div>

      {/* Right Canvas - Interactive Controls Panel */}
      <div className="flex-1 p-5 flex flex-col justify-between bg-white dark:bg-slate-950">
        
        {/* Header containing session indicators */}
        <div className="flex items-center justify-between border-b border-indigo-50/50 dark:border-slate-900 pb-3.5 mb-3.5">
          <div>
            <h4 className="text-[10px] font-mono font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">
              Current Focus Mode
            </h4>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`block w-2 h-2 rounded-full ${focusSession.isActive ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className="font-display font-black text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200">
                {focusSession.isActive ? 'Session in Progress' : 'Idle and Listening'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-indigo-950/40 border border-slate-200/50 dark:border-indigo-900/30 px-3 py-1 rounded-full">
            <Flame className="w-3.5 h-3.5 text-indigo-500 fill-indigo-55" />
            <span className="font-mono font-black text-[10px] uppercase tracking-wider text-indigo-650 dark:text-indigo-300">
              {streakCount}d Streak
            </span>
          </div>
        </div>

        {/* Body containing either Focus Session Timer or Mock Habits Checklist */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          
          {/* Main Focus Clock */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-[1.5rem] border border-indigo-50/50 dark:border-slate-900 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">
                PROD TIMER (100x speed)
              </div>
              <div className="font-mono text-3xl font-black tracking-tight text-slate-950 dark:text-slate-100 animate-pulse">
                {formatTime(focusSession.timeLeft)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFocus}
                className={`p-2.5 rounded-full transition-all flex items-center justify-center shadow-sm cursor-pointer ${
                  focusSession.isActive 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                    : 'bg-brand-primary hover:bg-brand-primary/95 text-white'
                }`}
                title={focusSession.isActive ? 'Pause Study' : 'Start Focus'}
              >
                {focusSession.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              {focusSession.timeLeft < 1500 && (
                <button
                  onClick={() => {
                    setFocusSession(prev => ({ ...prev, isActive: false, timeLeft: 1500 }));
                    setCharacterState('idle');
                  }}
                  className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                  title="Reset study clock"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Mock Checklist Habits */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase">
              <span>Today's Consistency Quests</span>
              <button 
                onClick={handleResetHabits} 
                className="text-[10px] text-brand-primary hover:underline font-mono uppercase cursor-pointer"
              >
                Reset quests
              </button>
            </div>
            <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
              {habits.map(h => (
                <div 
                  key={h.id} 
                  onClick={() => handleCompleteHabit(h.id)}
                  className={`flex items-center justify-between p-2.5 rounded-full border transition-all cursor-pointer text-xs ${
                    h.completed 
                      ? 'bg-emerald-50/75 border-emerald-200/60 dark:bg-emerald-950/20 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300' 
                      : 'bg-slate-50 border-slate-250/30 dark:bg-slate-900/50 dark:border-slate-800 text-slate-750 dark:text-slate-305 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${h.completed ? 'text-emerald-500 stroke-[3]' : 'text-slate-350 dark:text-slate-600'}`} />
                    <span className={`font-mono font-bold uppercase tracking-wide text-[11.5px] ${h.completed ? 'line-through opacity-75' : ''}`}>
                      {h.title}
                    </span>
                  </div>
                  <span className={`font-mono text-[9px] px-2.5 py-0.5 rounded-full shrink-0 font-black uppercase tracking-widest ${
                    h.completed 
                      ? 'bg-emerald-100/60 dark:bg-emerald-900/40 text-emerald-750 dark:text-emerald-400' 
                      : 'bg-slate-200/50 dark:bg-slate-850 text-slate-400'
                  }`}>
                    +{h.id === '3' ? '25' : '15'} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions of control panel */}
        <div className="mt-3 pt-3 border-t border-indigo-50/50 dark:border-slate-900 flex justify-between gap-2">
          <button 
            onClick={handlePet}
            className="flex-grow py-2.5 px-3 bg-slate-900 hover:bg-slate-850 dark:bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
            Pet Ozzy (-5m stress)
          </button>
          <button 
            onClick={() => {
              setCharacterState('levelup');
              triggerConfetti();
              setLevel(l => l + 1);
            }}
            className="flex-grow py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-900/40 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
            Simulate Level Up
          </button>
        </div>

      </div>

    </div>
  );
}
