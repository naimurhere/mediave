import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import RetentionChart from './components/RetentionChart';
import AIConsultant from './components/AIConsultant';
import LiveConsultant from './components/LiveConsultant';
import BookingModal from './components/BookingModal';
import ShowcaseModal from './components/ShowcaseModal';
import InfoModal from './components/InfoModal';
import VideoTestimonials from './components/VideoTestimonials';
import { 
  SERVICES, 
  PRICING, 
  TESTIMONIALS 
} from './constants';
import { 
  Zap, 
  Play, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Twitter, 
  Instagram, 
  Youtube,
  Star,
  Phone,
  Layout
} from 'lucide-react';

const ServiceIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'Zap': return <Zap className="text-sky-400" size={32} />;
    case 'Play': return <Play className="text-sky-400" size={32} />;
    case 'Layers': return <Layers className="text-sky-400" size={32} />;
    case 'TrendingUp': return <TrendingUp className="text-sky-400" size={32} />;
    default: return <Play className="text-sky-400" size={32} />;
  }
};

const App: React.FC = () => {
  // Modal States
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showcaseId, setShowcaseId] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<{ isOpen: boolean; type: string }>({ isOpen: false, type: '' });
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleBookProject = (plan?: string) => {
    setSelectedPlan(plan || "");
    setIsBookingModalOpen(true);
  };

  const handleOpenInfo = (type: string) => {
    setInfoModal({ isOpen: true, type });
  };

  return (
    <div className="min-h-screen selection:bg-sky-500 selection:text-white bg-slate-950">
      <Navbar 
        onCallTrigger={() => setIsLiveModalOpen(true)} 
        onInfoTrigger={handleOpenInfo}
      />

      {/* Global Overlays */}
      <LiveConsultant isOpen={isLiveModalOpen} onClose={() => setIsLiveModalOpen(false)} />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} initialPlan={selectedPlan} />
      <ShowcaseModal isOpen={showcaseId !== null} onClose={() => setShowcaseId(null)} projectId={showcaseId} />
      <InfoModal isOpen={infoModal.isOpen} type={infoModal.type} onClose={() => setInfoModal({ ...infoModal, isOpen: false })} />

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-sky-600/10 blur-[150px] -z-10 rounded-full" />
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping" />
            Booking for Q2 2025 Open
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight">
            Ride the Next <br />
            <span className="text-wave-gradient">Wave of Content.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            High-performance video editing that blends cinematic storytelling with data-driven strategy. We help creators and brands scale with short-form mastery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => handleBookProject()}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group"
            >
              Start Your Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('portfolio');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold border border-white/10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Layout size={20} /> View Showcase
            </button>
          </div>

          <div className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['Nike', 'HubSpot', 'Stripe', 'Figma', 'Shopify'].map((brand) => (
              <span key={brand} className="text-2xl font-black text-white">{brand}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-4">Our Services</h2>
              <h3 className="text-3xl md:text-5xl font-black">Performance First.</h3>
            </div>
            <button 
              onClick={() => handleBookProject("custom")}
              className="hidden md:flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors"
            >
              Inquire About Custom Needs <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                onClick={() => handleBookProject(service.id)}
                className="group p-8 bg-slate-900/40 border border-white/5 rounded-3xl hover:bg-slate-900 hover:border-sky-500/30 transition-all duration-500 cursor-pointer"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{service.description}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-sky-500 opacity-0 group-hover:opacity-100 transition-all">
                  BOOK NOW <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetentionChart />

      <VideoTestimonials onWatchStory={(id) => setShowcaseId(id)} />

      <AIConsultant />

      {/* Portfolio Grid - Aligned with actual project data */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">The Media<span className="text-sky-500">ve</span> Look.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setShowcaseId(project.id)}
                className="aspect-[9/16] rounded-3xl bg-slate-800 overflow-hidden relative group cursor-pointer border border-white/5"
              >
                <img 
                  src={project.videoThumbnail} 
                  alt={project.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <span className="text-sky-400 text-xs font-bold uppercase mb-2">Short-form mastery</span>
                  <h4 className="text-xl font-bold text-white">{project.name}</h4>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                  <Play className="fill-white text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Simple, Scalable Pricing.</h2>
            <p className="text-slate-400">Scale your content without breaking the bank. Choose the plan that fits your current growth stage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((plan) => (
              <div 
                key={plan.name} 
                className={`relative p-8 rounded-3xl border transition-all duration-500 ${
                  plan.isPopular 
                    ? 'bg-slate-800 border-sky-500 shadow-2xl shadow-sky-500/10 scale-105 z-10' 
                    : 'bg-slate-900 border-white/5'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-sky-500 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-slate-500">{plan.price === 'Custom' ? '' : '/mo'}</span>
                </div>
                <p className="text-slate-400 text-sm mb-8">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={18} className="text-sky-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleBookProject(plan.name)}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.isPopular 
                      ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <Logo className="mb-6" />
              <p className="text-slate-400 max-w-md mb-8">
                The premium creative agency specializing in high-performance video editing for the modern digital landscape. We turn raw footage into digital assets that convert.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
            <div>
              <h6 className="text-white font-bold mb-6">Agency</h6>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><button onClick={() => handleOpenInfo('about')} className="hover:text-sky-400 transition-colors">About Us</button></li>
                <li><button onClick={() => handleOpenInfo('team')} className="hover:text-sky-400 transition-colors">Our Team</button></li>
                <li><button onClick={() => handleOpenInfo('careers')} className="hover:text-sky-400 transition-colors">Careers</button></li>
                <li><button onClick={() => handleBookProject('contact')} className="hover:text-sky-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white font-bold mb-6">Legal</h6>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><button onClick={() => handleOpenInfo('privacy')} className="hover:text-sky-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => handleOpenInfo('terms')} className="hover:text-sky-400 transition-colors">Terms of Service</button></li>
                <li><button onClick={() => handleOpenInfo('cookie')} className="hover:text-sky-400 transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-4">
            <p className="text-slate-600 text-xs">© 2025 Mediave Creative Agency. All rights reserved.</p>
            <p className="text-slate-600 text-xs">Designed for the next wave of creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
