
import React from 'react';
import { X, Play, BarChart3, Clock, Zap } from 'lucide-react';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number | null;
}

const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ isOpen, onClose, projectId }) => {
  if (!isOpen || projectId === null) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10 bg-slate-950/95 backdrop-blur-xl">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Video Player Side */}
        <div className="md:w-3/5 bg-black relative flex items-center justify-center group overflow-hidden">
          <img 
            src={`https://picsum.photos/seed/mediave${projectId}/1200/1600`} 
            className="w-full h-full object-cover opacity-60"
            alt="Project Preview"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/50 flex items-center justify-center cursor-pointer hover:scale-110 transition-all">
              <Play className="text-white fill-white" size={32} />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/face${i}/50/50`} className="w-8 h-8 rounded-full border-2 border-black" alt="avatar" />
              ))}
            </div>
            <span className="text-xs font-bold text-white/70">Joined by 1.2M+ viewers</span>
          </div>
        </div>

        {/* Info Side */}
        <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-6">
            CASE STUDY #{projectId}
          </div>
          <h3 className="text-4xl font-black mb-6">Viral Momentum: The Tech Review Wave</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">
            For this project, we implemented our signature "Retention-First" editing style, using rapid pattern interrupts and 3D kinetic typography to maintain engagement for over 60 seconds.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
              <BarChart3 className="text-sky-500 mb-2" size={20} />
              <div className="text-2xl font-black">+42%</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Avg View Duration</div>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
              <Zap className="text-sky-500 mb-2" size={20} />
              <div className="text-2xl font-black">2.4M</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Reach within 48h</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase text-slate-500 tracking-widest">The Strategy</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                Custom sound design for every transition.
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                AI-optimized subtitle placement for readability.
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                Color grading tuned for OLED mobile screens.
              </li>
            </ul>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-white text-black font-black rounded-xl mt-12 hover:bg-slate-200 transition-all"
          >
            I want results like this
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseModal;
