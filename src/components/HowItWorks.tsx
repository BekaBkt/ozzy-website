import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Trophy, Shield, Swords, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const [selectedPet, setSelectedPet] = useState<'ozzy' | 'lulu' | 'momo'>('ozzy');
  const [selectedFocus, setSelectedFocus] = useState<number>(25);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Companions data
  const pets = [
    {
      id: 'ozzy' as const,
      name: 'Ozzy',
      emoji: '🔥',
      element: 'Fire/Focus Spirit',
      accent: '#FF5E5B',
      desc: 'An energetic spirit that lives for high-intensity work sprints. Gets hyper-excited during Pomodoros.',
      svg: (
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <ellipse cx="50" cy="85" rx="25" ry="6" fill="#000" opacity="0.1" />
          <ellipse cx="50" cy="55" rx="28" ry="26" fill="#FF5E5B" />
          {/* Ears */}
          <path d="M 30,35 Q 12,12 32,20 Z" fill="#FF5E5B" />
          <path d="M 70,35 Q 88,12 68,20 Z" fill="#FF5E5B" />
          {/* Face */}
          <ellipse cx="50" cy="60" rx="16" ry="14" fill="#FFEAA7" opacity="0.9" />
          <circle cx="38" cy="56" r="4.5" fill="#1E293B" />
          <circle cx="62" cy="56" r="4.5" fill="#1E293B" />
          <path d="M 46,65 Q 50,69 54,65" stroke="#1E293B" strokeWidth="2.5" fill="none" />
        </svg>
      )
    },
    {
      id: 'lulu' as const,
      name: 'Lulu',
      emoji: '🌿',
      element: 'Forest pixie',
      accent: '#00CECB',
      desc: 'An ambient, gentle companion who rewards mindfulness sessions, slow reading routines, and hydration.',
      svg: (
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <ellipse cx="50" cy="85" rx="25" ry="6" fill="#000" opacity="0.1" />
          <ellipse cx="50" cy="55" rx="28" ry="26" fill="#00CECB" />
          {/* Cute leaf ears */}
          <path d="M 30,35 Q 20,5 34,22 Z" fill="#10B981" />
          <path d="M 70,35 Q 80,5 66,22 Z" fill="#10B981" />
          {/* Face */}
          <ellipse cx="50" cy="60" rx="16" ry="14" fill="#E0F2FE" opacity="0.9" />
          <ellipse cx="38" cy="56" rx="4" ry="4" fill="#1E293B" />
          <ellipse cx="62" cy="56" rx="4" ry="4" fill="#1E293B" />
          <path d="M 45,63 Q 50,65 55,63" stroke="#1E293B" strokeWidth="2.5" fill="none" />
          {/* Flower on head */}
          <circle cx="50" cy="27" r="4" fill="#FF5E5B" />
          <circle cx="45" cy="29" r="3" fill="#FFED66" />
          <circle cx="55" cy="29" r="3" fill="#FFED66" />
        </svg>
      )
    },
    {
      id: 'momo' as const,
      name: 'Momo',
      emoji: '⚡',
      element: 'Cyber-bunny',
      accent: '#FFED66',
      desc: 'A cybernetic, fast-thinking bunny that excels at programming flow states and developer sprint quests.',
      svg: (
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <ellipse cx="50" cy="85" rx="25" ry="6" fill="#000" opacity="0.1" />
          <ellipse cx="50" cy="55" rx="28" ry="26" fill="#334155" />
          {/* Long rabbit ears */}
          <path d="M 32,35 L 28,5 Q 38,5 40,25 Z" fill="#334155" />
          <path d="M 68,35 L 72,5 Q 62,5 60,25 Z" fill="#334155" />
          <path d="M 31,30 L 29,10 Q 35,10 37,22 Z" fill="#FF5E5B" opacity="0.8" />
          <path d="M 69,30 L 71,10 Q 65,10 63,22 Z" fill="#FF5E5B" opacity="0.8" />
          {/* Face */}
          <ellipse cx="50" cy="62" rx="16" ry="12" fill="#F1F5F9" opacity="0.9" />
          <circle cx="38" cy="58" r="4" fill="#FF5E5B" />
          <circle cx="62" cy="58" r="4" fill="#FF5E5B" />
          <polygon points="50,61 47,65 53,65" fill="#1E293B" />
          {/* Cyber patch */}
          <rect x="58" y="48" width="10" height="2" fill="#FFED66" />
        </svg>
      )
    }
  ];

  const focusDurations = [15, 25, 45, 60, 90];

  return (
    <section className="py-20 sm:py-24 bg-light-bg dark:bg-slate-900 transition-colors duration-300 border-t border-b border-indigo-50/50 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-xl">
            <span className="text-[10px] font-mono tracking-widest font-black text-brand-primary uppercase bg-indigo-100 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full">
              Gamer onboarding
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-4 mb-4 uppercase leading-none">
              Your 3-step focus journey.
            </h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
              Set up your first productivity quest in minutes and observe how simple it is to hold yourself accountable.
            </p>
          </div>
          
          {/* Step navigations using bold rounded pills */}
          <div className="flex gap-2.5">
            {[1, 2, 3].map(step => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeStep === step
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                Step {step}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Container matching [2rem] rounded pattern of the theme */}
        <div className="bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-100 dark:border-slate-850/60 p-6 sm:p-10 shadow-xl relative min-h-[360px] flex items-center">
          
          {/* Step 1 Content: Pick companion */}
          {activeStep === 1 && (
            <motion.div 
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
            >
              <div className="lg:col-span-4 space-y-4">
                <span className="text-[11px] font-mono font-black text-brand-primary uppercase tracking-wider">FIRST RECRUITMENT</span>
                <h4 className="font-display font-black text-2xl text-slate-900 dark:text-white tracking-tight uppercase leading-none">
                  Choose your focus companion
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-normal">
                  Every character responds uniquely to goals, study environments, and streak accomplishments. Choose your complementary match.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setActiveStep(2)}
                    className="py-2.5 px-5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                  >
                    <span>Proceed to step 2</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Companions lists selectors */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pets.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPet(p.id)}
                    className={`relative p-5 rounded-[1.8rem] border transition-all cursor-pointer flex flex-col items-center text-center select-none ${
                       selectedPet === p.id
                        ? 'bg-slate-50/50 hover:bg-slate-50/50 border-brand-primary dark:bg-slate-900 dark:border-brand-primary shadow-xs'
                        : 'bg-white border-slate-100 dark:bg-slate-950 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {selectedPet === p.id && (
                      <div className="absolute top-4 right-4 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center text-white scale-90">
                        <Check className="w-3 h-3 stroke-[3.5]" />
                      </div>
                    )}
                    
                    <div className="mb-4">
                      {p.svg}
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-display font-black text-slate-900 dark:text-slate-100 uppercase text-xs tracking-wider">
                        {p.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {p.emoji}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono font-bold text-slate-405 uppercase tracking-widest mt-0.5 mb-2.5 block">
                      {p.element}
                    </span>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 Content: Focus duration config */}
          {activeStep === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
            >
              <div className="lg:col-span-4 space-y-4">
                <span className="text-[11px] font-mono font-black text-brand-primary uppercase tracking-wider">SPRINT ALIGNMENT</span>
                <h4 className="font-display font-black text-2xl text-slate-900 dark:text-white tracking-tight uppercase leading-none">
                  Design custom focus duration quests
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-normal">
                  Customize timer constraints. Earn progressive multiplier items the longer your session remains deep. Play safe, gain deep flow.
                </p>
                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => setActiveStep(1)}
                    className="py-2.5 px-4.5 bg-slate-100 hover:bg-slate-205 dark:bg-slate-920 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setActiveStep(3)}
                    className="py-2.5 px-5 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                  >
                    <span>Proceed to step 3</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Durations config display */}
              <div className="lg:col-span-8 flex flex-col items-center">
                <div className="w-full max-w-lg bg-slate-50/50 dark:bg-slate-900 border border-slate-150-and-light-bg dark:border-slate-800/80 rounded-[1.8rem] p-6 text-center shadow-xs">
                  
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-1">
                    Select mock quest timer
                  </span>

                  {/* Gigantic Focus Clock timer representation with JetBrains Mono styling */}
                  <div className="font-mono text-5xl sm:text-6xl font-black text-brand-primary tracking-tight my-4">
                    {selectedFocus}:00
                  </div>

                  {/* Multi-badges selector option with clean rounded pills */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {focusDurations.map(dur => (
                      <button
                        key={dur}
                        onClick={() => setSelectedFocus(dur)}
                        className={`px-4.5 py-2.5 rounded-full text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                          selectedFocus === dur
                            ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-indigo-600/10 scale-105'
                            : 'bg-white border-slate-202/80 hover:border-slate-350 text-slate-700 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300'
                        } border`}
                      >
                        {dur} Mins Focus
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-5 border-t border-slate-202/50 dark:border-slate-800/60 text-xs text-slate-400 px-2 font-black uppercase tracking-wider">
                    <span>🔥 Streak mult: 1.2x</span>
                    <span>🥇 Estimated Reward: +{selectedFocus * 2} Gold</span>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3 Content: Loot collection rewards */}
          {activeStep === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
            >
              <div className="lg:col-span-4 space-y-4">
                <span className="text-[11px] font-mono font-black text-brand-primary uppercase tracking-wider">EPIC LOOT RUNS</span>
                <h4 className="font-display font-black text-2xl text-slate-900 dark:text-white tracking-tight uppercase leading-none">
                  Collect cosmetics and custom equipment
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-normal">
                  Redeem accumulated goals points to buy hats, study desks, sunglasses, and custom background themes for your companion.
                </p>
                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => setActiveStep(2)}
                    className="py-2.5 px-4.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-705 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setActiveStep(1)}
                    className="py-2.5 px-4.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-white text-xs font-black uppercase tracking-wider rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Back to step 1</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cute digital cosmetics catalog */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Sleek Wizard Hat', desc: 'Grants +5 Focus energy', cost: '350 Coins', icon: '🧙‍♂️', rarity: 'Rare', bg: 'from-purple-400/10 to-indigo-500/5' },
                  { name: 'Red Sci-Fi Glasses', desc: 'Protects from screen blue light', cost: '120 Coins', icon: '🕶️', rarity: 'Common', bg: 'from-blue-400/10 to-cyan-500/5' },
                  { name: 'Dragon Crown', desc: 'Doubles XP rewards for 1hr', cost: '700 Coins', icon: '👑', rarity: 'Legendary', bg: 'from-amber-400/10 to-orange-500/5' }
                ].map((cos, i) => (
                  <div 
                    key={i} 
                    className="p-5 rounded-[1.8rem] bg-white dark:bg-slate-905 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center select-none relative overflow-hidden"
                  >
                    <span className={`absolute top-4 right-4 text-[9px] font-mono font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
                      cos.rarity === 'Legendary' ? 'bg-amber-100/65 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                      cos.rarity === 'Rare' ? 'bg-purple-100/65 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400' :
                      'bg-slate-100/65 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {cos.rarity}
                    </span>
                    
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 flex items-center justify-center text-3xl mb-4 shadow-xs">
                      {cos.icon}
                    </div>

                    <h5 className="font-display font-black text-xs text-slate-900 dark:text-slate-105 uppercase tracking-wider">
                      {cos.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 mb-2 mt-1 leading-tight">
                      {cos.desc}
                    </p>
                    <div className="text-xs font-mono font-extrabold text-brand-primary">
                      {cos.cost}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
