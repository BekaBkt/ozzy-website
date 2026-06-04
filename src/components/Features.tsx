import { motion } from 'motion/react';
import { Shield, Sparkles, Flame, BarChart3, Target, CalendarDays, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Features() {
  const [activeWeekStreak, setActiveWeekStreak] = useState([true, true, true, true, false, false, false]);
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (idx: number) => {
    setActiveWeekStreak(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <section id="features" className="py-20 sm:py-28 bg-light-bg dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase bg-indigo-100 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full">
            Game Loop of Success
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-5 mb-5 uppercase leading-none">
            Turn boring routines into a legendary adventure.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans font-normal leading-relaxed">
            Ozzy matches modern neuroscientific habit methods with immersive RPG-style companion mechanics to make staying on track naturally addictive.
          </p>
        </div>

        {/* 3 Core Value Propositions Grid under theme styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          
          {/* Card 1: Character-Driven Focus */}
          <div className="group relative overflow-hidden bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xs hover:border-brand-primary/40 dark:hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between">
            
            {/* Corner Decor Blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full filter blur-xl group-hover:scale-150 transition-all duration-500" />
            
            <div>
              {/* Icon Container matching design HTML */}
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 font-bold text-lg">
                ✦
              </div>

              <h3 className="font-display font-black text-slate-900 dark:text-slate-100 mb-2.5 uppercase text-xs sm:text-sm tracking-wider">
                Character-Driven Focus
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Say goodbye to phone distractions. Initiate deep-focus timers where every minute completed fuels Ozzy with XP. Skip your session, and Ozzy gets sad and sleepy.
              </p>
            </div>

            {/* Feature Slot Visual Preview - Interactive study simulator badge */}
            <div className="mt-4 p-4 rounded-2xl bg-light-bg dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/60 z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-450 uppercase">Focus Buddy State</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.5 rounded-sm">STUDY MODE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-primary/10 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                  🦉
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>XP progress</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Card 2: Habit Tracking */}
          <div className="group relative overflow-hidden bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xs hover:border-emerald-550/40 dark:hover:border-emerald-555/40 transition-all duration-300 flex flex-col justify-between">
            
            {/* Corner Decor Blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full filter blur-xl group-hover:scale-150 transition-all duration-500" />

            <div>
              {/* Icon Container matching design HTML */}
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 font-bold text-lg">
                ⚡
              </div>

              <h3 className="font-display font-black text-slate-900 dark:text-slate-100 mb-2.5 uppercase text-xs sm:text-sm tracking-wider">
                Habit Tracking
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Establish and check off customizable daily habits. Watch your focus streak burn brighter. The longer you maintain your streaks, the more legendary your level multipliers become!
              </p>
            </div>

            {/* Feature Slot Visual Preview - Interactive 7-days Streak Wheel */}
            <div className="mt-4 p-4 rounded-2xl bg-light-bg dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/60 z-10 w-full">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono font-bold text-slate-450 uppercase">Interactive Streak Map</span>
                <span className="text-[10px] font-semibold text-[#FFAC33] flex items-center gap-0.5">
                  🔥 12 Days
                </span>
              </div>
              <div className="flex justify-between gap-1.5 w-full">
                {weekdays.map((day, idx) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(idx)}
                    className={`flex-1 flex flex-col items-center p-1.5 rounded-lg border transition-all cursor-pointer ${
                      activeWeekStreak[idx]
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800/60 dark:text-emerald-300'
                        : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800/60 dark:text-slate-600'
                     }`}
                    title={`Toggle ${day}`}
                  >
                    <span className="text-[9px] font-medium scale-90 mb-1">{day}</span>
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${
                      activeWeekStreak[idx] ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800'
                    }`}>
                      {activeWeekStreak[idx] ? '✓' : ''}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Card 3: Productivity Insights */}
          <div className="group relative overflow-hidden bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xs hover:border-brand-primary/40 dark:hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between">
            
            {/* Corner Decor Blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full filter blur-xl group-hover:scale-150 transition-all duration-500" />

            <div>
              {/* Icon Container matching design HTML */}
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 font-bold text-lg">
                📈
              </div>

              <h3 className="font-display font-black text-slate-900 dark:text-slate-100 mb-2.5 uppercase text-xs sm:text-sm tracking-wider">
                Productivity Insights
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Understand your peaks and troughs. Access deep performance reports highlighting your most efficient times of day, habit retention indexes, and weekly study charts.
              </p>
            </div>

            {/* Feature Slot Visual Preview - Clean SVG Bar Chart representation */}
            <div className="mt-4 p-4 rounded-xl bg-light-bg dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/60 z-10 w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-slate-450 uppercase">Weekly Hours Spent</span>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 text-right">Avg: 4.8h/day</span>
              </div>
              <div className="h-12 flex items-end gap-2.5 px-1 pt-2">
                {[
                  { d: 'M', h: '60%' },
                  { d: 'T', h: '45%' },
                  { d: 'W', h: '90%' },
                  { d: 'T', h: '30%' },
                  { d: 'F', h: '75%' },
                  { d: 'S', h: '20%' },
                  { d: 'S', h: '55%' }
                ].map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center h-full justify-end">
                    <motion.div 
                      className="w-full bg-linear-to-t from-indigo-400 to-brand-primary rounded-t-sm"
                      initial={{ height: '0%' }}
                      animate={{ height: item.h }}
                      transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
                    />
                    <span className="text-[8px] font-mono text-slate-450 dark:text-slate-500 mt-1">{item.d}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
