
import React, { useRef, useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Star, Quote, X } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

interface VideoTestimonialsProps {
  onWatchStory: (id: number) => void;
}

const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({ onWatchStory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - (clientWidth / 2) : scrollLeft + (clientWidth / 2);
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getEmbedUrl = (url: string | undefined, isThumbnail: boolean) => {
    if (!url || !url.includes('vimeo.com')) return '';
    // Strip query parameters to get the clean ID
    const path = url.split('?')[0];
    const id = path.split('/').pop();
    
    if (isThumbnail) {
      // Background mode: muted, loop, no controls, autoplay, low quality for performance
      return `https://player.vimeo.com/video/${id}?autoplay=1&loop=1&background=1&muted=1&badge=0&autopause=0&quality=360p&playsinline=1`;
    }
    
    // Active mode: MUST have autoplay=1 AND muted=0. 
    // Browser will allow audio because this is triggered by a user click gesture.
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&badge=0&autopause=0&player_id=0&app_id=58479&playsinline=1`;
  };

  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-4">Vertical Showcase</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-6">Real <span className="text-wave-gradient">Results.</span></h3>
            <p className="text-slate-400 text-lg">Click any project to experience the high-retention strategy in full sound.</p>
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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 pt-4"
        >
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="flex-shrink-0 w-[280px] md:w-[380px] snap-start group"
            >
              <div className="flex flex-col gap-6">
                <div 
                  className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-sky-500/50 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] cursor-pointer"
                  onClick={() => t.videoUrl ? setPlayingId(t.id) : onWatchStory(parseInt(t.id))}
                >
                  {playingId === t.id && t.videoUrl ? (
                    <div className="absolute inset-0 z-20 bg-black">
                      <iframe 
                        src={getEmbedUrl(t.videoUrl, false)} 
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; picture-in-picture" 
                        title={t.name}
                      ></iframe>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingId(null);
                        }}
                        className="absolute top-4 right-4 z-30 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      {/* Live Thumbnail Video (Muted Preview) */}
                      {t.videoUrl ? (
                        <div className="absolute inset-0 pointer-events-none">
                           <iframe 
                            src={getEmbedUrl(t.videoUrl, true)} 
                            className="w-full h-full scale-[1.4] object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                            allow="autoplay"
                            title={`${t.name} Preview`}
                          ></iframe>
                        </div>
                      ) : (
                        <img 
                          src={t.videoThumbnail} 
                          alt={t.name}
                          className="w-full h-full object-cover opacity-50"
                        />
                      )}
                      
                      {/* Dark Overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity group-hover:opacity-40" />

                      {/* Result Badge */}
                      <div className="absolute top-6 left-6 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 z-10">
                        <div className="text-xl font-black text-white">{t.resultMetric}</div>
                        <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">{t.resultLabel}</div>
                      </div>

                      {/* Play Button UI */}
                      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10">
                        <div className="w-16 h-16 rounded-full bg-sky-500/20 backdrop-blur-xl border border-sky-400/50 flex items-center justify-center shadow-2xl">
                          <Play className="text-white fill-white ml-1" size={24} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Info Footer */}
                <div className="px-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                      <div>
                        <h4 className="font-bold text-white text-base">{t.name}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sky-500">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="fill-current" />)}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 text-sky-500/10" size={32} />
                    <p className="text-slate-400 font-medium text-sm leading-relaxed italic relative z-10 pl-2">"{t.content}"</p>
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
