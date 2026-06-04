import { Star, MessageCircle, Quote, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export default function Testimonials() {
  const [filterType, setFilterType] = useState<'all' | 'human' | 'pet'>('all');

  const list = [
    {
      author: 'Sarah Jenkins',
      role: 'Computer Science Student',
      comment: "I used to procrastinate on my assignments for hours. Now, I see Ozzy looking at me with his study glasses and little laptop, and I instantly open VS Code. 10/10 best Pomodoro ever.",
      stars: 5,
      type: 'human',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      tag: '🔥 Fire Pomodoro Fan'
    },
    {
      author: 'Ozzy (Sarah\'s Companion)',
      role: 'Level 24 Fire Spirit',
      comment: "Sarah has been doing so much homework since she downloaded this app. I got a wizard hat and a mini golden crown! Plus, I haven't fallen deep asleep in 3 weeks. Keep typing, human!",
      stars: 5,
      type: 'pet',
      isCompanion: true,
      tag: '⭐ Fully Levelled Up'
    },
    {
      author: 'Alex Rivera',
      role: 'Remote Software Lead',
      comment: "The streaks feel like real achievements. The productivity insights graphs helped me identify that my deep work peaks at 10 AM. Unbelievably clean UI, feels like a real game.",
      stars: 5,
      type: 'human',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      tag: '🖥️ Remote Lead'
    },
    {
      author: 'Lulu (Alex\'s Companion)',
      role: 'Level 12 Forest Pixie',
      comment: "Alex is doing great! He always completes his daily water intake goals, which lets me grow my head flower. But please, Alex, do not skip Sunday workout. I want the dragon wings soon.",
      stars: 5,
      type: 'pet',
      isCompanion: true,
      tag: '🌿 Green Team'
    }
  ];

  const filtered = filterType === 'all' ? list : list.filter(item => item.type === filterType);

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-linear-to-b from-light-bg to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase bg-amber-500/10 px-3 py-1 rounded-full">
              Guild Feedback
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-3 tracking-tight uppercase leading-none">
              Testimonials from both Worlds.
            </h3>
          </div>

          {/* Filter segment selector */}
          <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/60 self-start">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white dark:bg-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              All players
            </button>
            <button
               onClick={() => setFilterType('human')}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterType === 'human'
                  ? 'bg-slate-900 text-white dark:bg-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Humans 🧑‍💻
            </button>
            <button
              onClick={() => setFilterType('pet')}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterType === 'pet'
                  ? 'bg-slate-900 text-white dark:bg-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Comcompanions 🦉
            </button>
          </div>
        </div>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-6 sm:p-8 rounded-[2rem] border transition-all duration-300 relative ${
                item.isCompanion
                  ? 'bg-brand-primary/5 border-brand-primary/20 dark:bg-brand-primary/10 dark:border-brand-primary/30 shadow-none'
                  : 'bg-white border-slate-200/80 dark:bg-slate-950 dark:border-slate-805/40 shadow-xs'
              }`}
            >
              <Quote className={`absolute top-6 right-6 w-8 h-8 opacity-10 ${item.isCompanion ? 'text-brand-primary' : 'text-slate-400'}`} />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                ))}
              </div>

              {/* Comment text */}
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                "{item.comment}"
              </p>

              {/* Author metadata element */}
              <div className="flex items-center gap-4.5 border-t border-slate-100 dark:border-slate-900 pt-4 mt-auto">
                {item.img ? (
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200/40 shrink-0">
                    <img 
                      src={item.img} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                      alt={item.author} 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 bg-brand-primary/15 text-brand-primary rounded-full flex items-center justify-center shrink-0 font-bold text-lg border border-brand-primary/20 animate-pulse">
                    🔥
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-slate-800 dark:text-slate-100 block leading-tight">
                      {item.author}
                    </span>
                    <span className="text-[8px] font-mono font-black bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 shrink-0 uppercase tracking-widest">
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Micro CTA banner */}
        <div className="mt-16 sm:mt-20 p-8 rounded-[2rem] bg-slate-900 dark:bg-linear-to-tr dark:from-indigo-950 dark:to-slate-900 border border-slate-800 text-center text-white relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-24 h-24 bg-brand-secondary/10 rounded-full filter blur-xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full filter blur-xl" />

          <h4 className="font-display font-black text-lg sm:text-xl lg:text-2xl leading-snug mb-3 uppercase tracking-tight">
            Want to see your companion level up in real-time?
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6">
            Track focus on your lap, phone, or tablet. Ozzy has full live cloud syncing active so your streaks always stay united.
          </p>
          <a
            href="#rive-demo-container"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-primary hover:underline hover:scale-105 transition-all uppercase tracking-wider"
          >
            <span>Play with Ozzy simulator first</span>
            <ThumbsUp className="w-4 h-4 text-brand-primary" />
          </a>
        </div>

      </div>
    </section>
  );
}
