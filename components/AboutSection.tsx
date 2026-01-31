import React from 'react';
import { AlertTriangle, UserCheck, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { DISCLAIMER_CONTENT } from '../constants';

interface AboutSectionProps {
  texts: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ texts }) => {
  return (
    <section id="about" className="py-16 bg-slate-900 border-t border-white/5 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-amber-500/5 to-slate-900 border border-amber-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]"
        >
          <div className="flex flex-col md:flex-row">
            
            {/* Left: Icon & Title Area */}
            <div className="bg-amber-500/10 p-8 md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-amber-500/20">
               <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <AlertTriangle className="text-amber-500 w-8 h-8" />
               </div>
               <span className="text-amber-500 font-bold tracking-widest uppercase text-sm text-center">Prototype Notice</span>
            </div>

            {/* Right: Bilingual Content */}
            <div className="p-8 md:w-3/4 flex flex-col justify-center">
               {/* Uzbek Version */}
               <div className="mb-6">
                 <div className="flex items-center gap-2 mb-2">
                   <Globe size={14} className="text-slate-400" />
                   <span className="text-xs font-bold text-slate-500 uppercase">O'zbek</span>
                 </div>
                 <p className="text-slate-200 text-lg leading-relaxed font-medium">
                   "{DISCLAIMER_CONTENT.UZ}"
                 </p>
               </div>

               <div className="h-px w-full bg-white/10 mb-6"></div>

               {/* English Version */}
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <Globe size={14} className="text-slate-400" />
                   <span className="text-xs font-bold text-slate-500 uppercase">English</span>
                 </div>
                 <p className="text-slate-300 text-base leading-relaxed italic">
                   "{DISCLAIMER_CONTENT.EN}"
                 </p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Founder & Credibility Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-90">
           <div className="flex items-center gap-4 bg-slate-800/50 px-6 py-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors cursor-default w-full md:w-auto">
              <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shrink-0">
                <UserCheck className="text-white w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold">{texts.founder}</h3>
                <p className="text-slate-400 text-sm">{texts.founderRole}</p>
              </div>
           </div>

           <div className="flex items-center gap-3 bg-green-900/10 px-5 py-3 rounded-full border border-green-500/20">
              <ShieldCheck size={18} className="text-green-500" />
              <span className="text-green-500 text-xs font-bold tracking-wider uppercase">Official High-Fidelity Prototype</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;