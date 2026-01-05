import React from 'react';
import { X, Play, BarChart3, Zap, Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ isOpen, onClose, projectId }) => {
  if (!isOpen || projectId === null) return null;

  const project = TESTIMONIALS.find(t => t.id === projectId);
  
  const getEmbedUrl = (url: string) => {
    if (url.includes('vimeo.com')) {
      const id = url.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-8 bg-slate-950/95 backdrop-blur-xl">
      <div className="w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-slate-900 md:border md:border-white/10 md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors z-30"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-3/5 aspect-[9/16] md:aspect-auto bg-black relative flex items-center justify-center group overflow-hidden md:min-h-[500px]">
          {project?.videoUrl ? (
            <iframe 
              src={getEmbedUrl(project.videoUrl)} 
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
              title={project.name}
            ></iframe>
          ) : (
            <>
              <img 
                src={project?.videoThumbnail || `https://picsum.photos/seed/mediave${projectId}/1200/1600`} 
                className="w-full h-full object-cover opacity-60"
                alt="Project Preview"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/50 flex items-center justify-center cursor-pointer hover:scale-110 transition-all">
                  <Play className="text-white fill-white" size={32} />
                </div>
              </div>
            </>
          )}
          
          <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md p-2 rounded-full pr-4 z-10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/face${i}/50/50`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="avatar" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">Live Case Study</span>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-slate-900 custom-scrollbar">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-black mb-6 uppercase tracking-widest">
            <Star size={12} className="fill-sky-400" /> Success Story
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter leading-tight">
            {project?.name}'s <span className="text-sky-500">Breakthrough.</span>
          </h3>
          <p className="text-slate-400 mb-8 leading-relaxed font-medium italic">
            "{project?.content || "Another Mediave success story optimized for peak retention."}"
          </p>

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
            <div className="p-4 md:p-5 bg-slate-950 rounded-2xl md:rounded-3xl border border-white/5 shadow-inner">
              <BarChart3 className="text-sky-500 mb-2" size={18} />
              <div className="text-2xl md:text-3xl font-black text-white">{project?.resultMetric || "+88%"}</div>
              <div className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest">{project?.resultLabel || "Retention"}</div>
            </div>
            <div className="p-4 md:p-5 bg-slate-950 rounded-2xl md:rounded-3xl border border-white/5 shadow-inner">
              <Zap className="text-sky-500 mb-2" size={18} />
              <div className="text-2xl md:text-3xl font-black text-white">Top 1%</div>
              <div className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest">Niche Ranking</div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-xs uppercase text-slate-500 tracking-[0.2em] mb-4">Wave Optimization</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                </div>
                <div>
                  <p className="text-sm text-white font-bold mb-1">Pattern Interrupts</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Custom motion graphics every 3 seconds to reset attention span.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                </div>
                <div>
                  <p className="text-sm text-white font-bold mb-1">Sonic Branding</p>
                  <p className="text-xs text-slate-400 leading-relaxed">High-fidelity soundscapes that psychologically reward retention.</p>
                </div>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => {
              onClose();
              const el = document.getElementById('strategy');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-5 bg-white text-black font-black rounded-2xl mt-12 hover:bg-slate-200 transition-all shadow-xl shadow-black/20"
          >
            I WANT THIS STRATEGY
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseModal;
