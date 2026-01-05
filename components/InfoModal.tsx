
import React from 'react';
import { X, Users, Briefcase, Heart, Shield, FileText, Cookie } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const getContent = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About Mediave',
          icon: <Heart className="text-sky-500" />,
          body: 'Mediave was founded in 2023 with a single mission: to help creators and brands navigate the fast-moving waters of modern digital media. We believe that video is the most powerful tool for connection, and our team of editors and strategists work tirelessly to ensure every frame serves a purpose. We are a remote-first agency headquartered in the digital ether, serving clients globally.'
        };
      case 'team':
        return {
          title: 'Our Team',
          icon: <Users className="text-sky-500" />,
          body: 'Our team is comprised of world-class editors, cinematic storytellers, and data-obsessed growth strategists. From former YouTube-native creators to traditional film school graduates, the Mediave crew represents a blend of "old school" craft and "new age" speed. We don\'t just edit; we engineer retention.'
        };
      case 'careers':
        return {
          title: 'Join the Crew',
          icon: <Briefcase className="text-sky-500" />,
          body: 'We are always looking for visionary editors, motion designers, and account managers who want to push the boundaries of short-form content. At Mediave, you\'ll work with some of the biggest names in tech and lifestyle. Check back soon for open roles or send your portfolio to careers@mediave.creative.'
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Shield className="text-sky-500" />,
          body: 'Your privacy is paramount. Mediave collects only the necessary information to provide our services and communicate project updates. We never sell your data to third parties. Our full policy outlines how we store and protect your personal and project information in compliance with global standards.'
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="text-sky-500" />,
          body: 'By engaging Mediave, you agree to our collaborative process. We provide revisions based on selected plans and maintain confidentiality of all raw footage. Ownership of final assets is transferred upon full payment. We aim for 100% satisfaction through clear communication and high-fidelity output.'
        };
      case 'cookie':
        return {
          title: 'Cookie Policy',
          icon: <Cookie className="text-sky-500" />,
          body: 'We use a minimal set of cookies to enhance your browsing experience and analyze our traffic. No tracking cookies are used for third-party advertising. You can manage your preferences at any time through your browser settings.'
        };
      default:
        return {
          title: 'Information',
          icon: <FileText className="text-sky-500" />,
          body: 'Content loading...'
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
              {content.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-black">{content.title}</h3>
          </div>
          
          <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed text-base md:text-lg mb-8">
            {content.body}
          </div>

          <button 
            onClick={onClose}
            className="w-full md:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
