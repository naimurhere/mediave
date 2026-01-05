
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Drop your video idea. I'll give you a **viral hook** and a **retention map** in seconds." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await gemini.generateStrategy(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "The wave is silent. Try a different angle." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Choppy waters! Check your connection and let's try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      if (!line.trim()) return <div key={lineIdx} className="h-2" />;

      // 1. Handle Headers
      if (line.trim().startsWith('#')) {
        const level = (line.match(/^#+/) || [''])[0].length;
        const content = line.replace(/^#+\s*/, '');
        const sizeClass = level === 1 ? 'text-xl' : 'text-lg';
        return (
          <h4 key={lineIdx} className={`${sizeClass} font-black text-white mt-4 mb-2 tracking-tight`}>
            {parseInlines(content)}
          </h4>
        );
      }

      // 2. Handle Lists
      const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      const isNumbered = /^\d+\.\s/.test(line.trim());

      if (isBullet || isNumbered) {
        const content = line.trim().replace(/^(\*|-|\d+\.)\s+/, '');
        return (
          <div key={lineIdx} className="flex gap-3 ml-1 mb-2">
            <span className="text-sky-500 font-black">
              {isNumbered ? line.trim().match(/^\d+\./) : '•'}
            </span>
            <span className="flex-1 text-slate-300 font-medium">
              {parseInlines(content)}
            </span>
          </div>
        );
      }

      // 3. Regular Paragraph
      return (
        <p key={lineIdx} className="mb-3 text-slate-300 leading-snug font-medium">
          {parseInlines(line)}
        </p>
      );
    });
  };

  const parseInlines = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|__.*?__)/g);
    return parts.map((part, i) => {
      if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
        return (
          <strong key={i} className="font-black text-sky-400">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section id="strategy" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-600/5 blur-[120px] rounded-full" />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Sparkles size={12} />
              Viral Strategy Engine
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">Retention Lab.</h2>
            <p className="text-slate-400 text-lg">Input your idea. Get a high-retention blueprint.</p>
          </div>

          <div className="bg-slate-900 border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
            <div className="p-6 border-b border-white/5 bg-slate-800/30 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-sky-600 flex items-center justify-center shadow-lg shadow-sky-600/20">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm">Mediave Strategist</h3>
                  <p className="text-[10px] text-sky-500 font-bold uppercase tracking-widest">Online / Retaining 88%</p>
                </div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-950/40 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-sky-600' : 'bg-slate-800 border border-white/10'
                    }`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-sky-400" />}
                    </div>
                    <div className={`p-5 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-sky-600 text-white rounded-tr-none' 
                        : 'bg-slate-900/80 text-slate-300 rounded-tl-none border border-white/5 backdrop-blur-sm'
                    }`}>
                      {formatText(msg.content)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center text-sky-400 text-[10px] font-black animate-pulse ml-11 uppercase tracking-widest">
                    <Loader2 size={14} className="animate-spin" />
                    Analyzing Retention...
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-900 border-t border-white/5">
              <div className="relative flex items-center max-w-2xl mx-auto">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Need a hook for my tech review..."
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-700"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-3 bg-sky-600 text-white rounded-xl hover:bg-sky-500 disabled:opacity-20 transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
