
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RETENTION_DATA } from '../constants';

const RetentionChart: React.FC = () => {
  return (
    <section id="retention" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Editing is <span className="text-wave-gradient">Not Just Aesthetics.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We track retention metrics across every project. Our high-retention strategy focuses on the first 3 seconds, pattern interrupts, and seamless pacing to keep viewers glued to the screen.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-sky-500" />
                </div>
                <span className="text-slate-300">Average +25% Retention Increase</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <span className="text-slate-300">Reduced Bounce Rates in the first 5 seconds</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                </div>
                <span className="text-slate-300">Optimized for Platform-Specific Algorithms</span>
              </li>
            </ul>
          </div>
          
          <div className="md:w-1/2 w-full h-[400px] bg-slate-950 p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-600" />
            <h3 className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Retention Performance (Typical Project)</h3>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={RETENTION_DATA}>
                <defs>
                  <linearGradient id="colorMediave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOriginal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend />
                <Area 
                  name="Mediave High-Retention"
                  type="monotone" 
                  dataKey="mediave" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorMediave)" 
                />
                <Area 
                  name="Raw Footage / Standard Edit"
                  type="monotone" 
                  dataKey="original" 
                  stroke="#475569" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorOriginal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetentionChart;
