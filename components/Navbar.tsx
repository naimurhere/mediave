
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onCallTrigger: () => void;
  onInfoTrigger: (type: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCallTrigger, onInfoTrigger }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', type: 'scroll' },
    { name: 'Data', href: '#retention', type: 'scroll' },
    { name: 'Portfolio', href: '#portfolio', type: 'scroll' },
    { name: 'Pricing', href: '#pricing', type: 'scroll' },
    { name: 'About', type: 'info', key: 'about' },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.type === 'scroll') {
      e.preventDefault();
      const el = document.querySelector(link.href);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (link.type === 'info') {
      onInfoTrigger(link.key);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo size={32} />
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={(e) => handleLinkClick(e, link)}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={onCallTrigger}
            className="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-500 transition-all shadow-lg shadow-sky-600/20"
          >
            Free Strategy Call
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={(e) => handleLinkClick(e, link)}
              className="text-left text-xl font-bold text-slate-300 hover:text-white"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => {
              onCallTrigger();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-4 bg-sky-600 text-white font-bold rounded-xl"
          >
            Free Strategy Call
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
