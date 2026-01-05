
import React, { useState, useEffect } from 'react';
import { X, Check, Send, Sparkles, Shield, Rocket, Globe, Zap, Play, Layers, TrendingUp } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialPlan = "" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '1k-3k'
  });

  useEffect(() => {
    if (initialPlan) {
      setFormData(prev => ({ ...prev, projectType: initialPlan.toLowerCase() }));
    }
  }, [initialPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  const getPlanDetails = () => {
    const type = formData.projectType.toLowerCase();
    
    if (type.includes('premium')) {
      return {
        title: 'Unlock Premium Growth',
        subtitle: 'Our most popular plan for serious creators and scaling brands.',
        icon: <Rocket className="text-sky-400" size={32} />,
        features: ['15 High-Retention Shorts', 'Hook Strategy Included', 'Priority 24h Support', 'Custom Thumbnail Design']
      };
    } else if (type.includes('enterprise')) {
      return {
        title: 'Enterprise Solution',
        subtitle: 'White-glove service for high-volume content engines.',
        icon: <Globe className="text-indigo-400" size={32} />,
        features: ['Unlimited Scale', 'Dedicated Creative Director', 'Omnichannel Strategy', 'On-site Filming Sync']
      };
    } else if (type.includes('short-form')) {
      return {
        title: 'Short-Form Mastery',
        subtitle: 'Dominate TikTok, Reels, and Shorts with energy.',
        icon: <Zap className="text-yellow-400" size={32} />,
        features: ['Rapid Pattern Interrupts', 'Kinetic Typography', 'Viral Hook Logic', 'Platform-Native Editing']
      };
    } else if (type.includes('youtube')) {
      return {
        title: 'YouTube Growth',
        subtitle: 'Cinematic pacing for long-form retention.',
        icon: <Play className="text-red-400" size={32} />,
        features: ['Story Arc Optimization', 'B-Roll Sourcing', 'Custom Soundscapes', 'High-CTR Thumbnails']
      };
    } else {
      return {
        title: 'Start the Wave',
        subtitle: 'Perfect for consistent, high-quality content delivery.',
        icon: <Shield className="text-slate-400" size={32} />,
        features: ['8 Pattern-Interrupt Shorts', 'Cinematic Pacing', 'Pro Color Grading', 'Subtitle Automation']
      };
    }
  };

  const details = getPlanDetails();

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Close Button - Fixed for visibility */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-30 md:z-10"
        >
          <X size={24} />
        </button>

        {/* Sidebar Info */}
        <div className="md:w-5/12 p-8 md:p-10 flex flex-col justify-between bg-white/5 border-b md:border-b-0 md:border-r border-white/5">
          <div>
            <div className="mb-6">{details.icon}</div>
            <h4 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{details.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{details.subtitle}</p>
            
            <ul className="space-y-3">
              {details.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-xs font-black text-white/80">
                  <Check size={14} className="text-sky-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 p-4 md:p-6 rounded-2xl bg-slate-950 border border-white/5">
            <p className="text-[10px] uppercase tracking-widest font-black text-sky-500 mb-2">Current Capacity</p>
            <p className="text-xs text-slate-300 font-bold">2 Slots Remaining for May</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-8 md:p-12 relative flex flex-col justify-center bg-slate-900">
          {submitted ? (
            <div className="text-center animate-in zoom-in fade-in duration-500 py-12">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-green-500/10">
                <Check size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4">Request Sent!</h3>
              <p className="text-slate-400 text-base">Our team will be in touch within 12 hours.</p>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sky-400 text-[10px] font-black mb-6 uppercase tracking-widest">
                <Sparkles size={12} />
                Project Initialization
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-8 tracking-tight">Tell Us About Your Vision</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-700"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@creators.com"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-700"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Focus Area</label>
                  <select 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all appearance-none capitalize text-slate-300"
                    value={formData.projectType}
                    onChange={e => setFormData({...formData, projectType: e.target.value})}
                  >
                    <option value="standard">Standard Growth</option>
                    <option value="premium">Premium Acceleration</option>
                    <option value="enterprise">Enterprise Custom</option>
                    <option value="short-form">Short-Form Mastery</option>
                    <option value="youtube">YouTube Growth</option>
                    <option value="corporate">Corporate Identity</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-white text-black font-black rounded-xl mt-6 transition-all shadow-xl hover:bg-slate-200 active:scale-95 flex items-center justify-center gap-3 group"
                >
                  START THE WAVE <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
