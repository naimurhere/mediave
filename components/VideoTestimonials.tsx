
import React, { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

interface VideoTestimonialsProps {
  onWatchStory: (id: number) => void;
}

const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({ onWatchStory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-4">Social Proof</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-6">Built by <span className="text-wave-gradient">Results.</span></h3>
            <p className="text-slate-400 text-lg">Hear directly from the creators and founders who rode the wave with us.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 pt-4"
        >
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              onClick={() => onWatchStory(parseInt(t.id))}
              className="flex-shrink-0 w-[300px] md:w-[380px] snap-start group cursor-pointer"
            >
              <div className="relative aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-sky-500/50 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.15)]">
                {/* Thumbnail */}
                <img 
                  src={t.videoThumbnail} 
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                      <div className="text-2xl font-black text-white">{t.resultMetric}</div>
                      <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">{t.resultLabel}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <Star size={16} className="fill-white" />
                    </div>
                  </div>

                  <div className="text-center group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 mx-auto rounded-full bg-sky-500/20 backdrop-blur-xl border border-sky-400/50 flex items-center justify-center mb-4">
                      <Play className="text-white fill-white ml-1" size={24} />
                    </div>
                    <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Watch Story</span>
                  </div>

                  <div>
                    <Quote className="text-sky-500/30 mb-4" size={32} />
                    <p className="text-white font-medium text-lg leading-relaxed mb-6 line-clamp-3 italic">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-white/10" />
                      <div>
                        <h4 className="font-bold text-white leading-tight">{t.name}</h4>
                        <p className="text-xs text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
