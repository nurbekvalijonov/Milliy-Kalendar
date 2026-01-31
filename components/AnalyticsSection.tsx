import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ANALYTICS_DATA } from '../constants';

interface AnalyticsSectionProps {
  texts: any;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ texts }) => {
  return (
    <section id="analytics" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 skew-x-12 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-bold mb-6 text-white font-['Orbitron']">{texts.analytics}</h2>
            <p className="text-slate-400 mb-8">
              Real-time data visualization for government and investors. Track event participation, regional activity, and economic impact.
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="text-white font-bold">Total Events</h4>
                <p className="text-2xl text-green-400 font-mono">1,248</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-white font-bold">Active Users</h4>
                <p className="text-2xl text-blue-400 font-mono">85,201</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-slate-200 mb-6">Regional Engagement</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEvt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Area type="monotone" dataKey="participation" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPart)" />
                    <Area type="monotone" dataKey="events" stroke="#10b981" fillOpacity={1} fill="url(#colorEvt)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
