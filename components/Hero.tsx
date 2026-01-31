import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, MapPin } from 'lucide-react';

interface HeroProps {
  texts: any;
}

const Hero: React.FC<HeroProps> = ({ texts }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 z-0"></div>
      
      {/* 3D Animated Mesh/Orbs (Simulated with div circles) */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl z-0"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-block px-4 py-1 mb-6 border border-green-500/30 rounded-full bg-green-500/10 backdrop-blur-sm">
            <span className="text-green-400 text-sm font-bold tracking-widest uppercase">E-Government Startup</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {texts.heroTitle}
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed border-l-2 border-blue-500 pl-6">
            {texts.heroSubtitle}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all"
            >
              <Play size={20} fill="currentColor" />
              {texts.ctaDemo}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700 border border-white/10 text-white rounded-xl font-bold flex items-center gap-3 backdrop-blur-sm transition-all"
            >
              {texts.ctaExplore}
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: 3D Isometric Illustration */}
        <motion.div 
           initial={{ opacity: 0, y: 50, rotateX: 10 }}
           animate={{ opacity: 1, y: 0, rotateX: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative perspective-1000 group"
        >
          <div className="relative w-full aspect-square transform group-hover:rotate-y-12 transition-transform duration-700 preserve-3d">
             {/* Base Plate */}
             <div className="absolute inset-0 bg-slate-900/80 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl flex items-center justify-center transform translate-z-0">
               <div className="grid grid-cols-2 gap-4 p-6 w-full h-full">
                  {/* Calendar Widget */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 hover:border-blue-500/50 transition-colors">
                     <div className="h-2 w-12 bg-blue-500 rounded mb-4"></div>
                     <div className="grid grid-cols-7 gap-2">
                       {[...Array(14)].map((_, i) => (
                         <div key={i} className={`h-2 w-2 rounded-full ${i === 5 ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                       ))}
                     </div>
                  </div>
                  {/* Map Widget */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500 to-transparent"></div>
                     <MapPin className="text-green-500 mx-auto mt-4" size={32} />
                  </div>
                   {/* Stats Widget */}
                   <div className="col-span-2 bg-slate-800/50 rounded-xl p-4 border border-white/5 flex items-end justify-between h-24">
                      <div className="w-4 bg-blue-900 h-8 rounded-t"></div>
                      <div className="w-4 bg-blue-700 h-12 rounded-t"></div>
                      <div className="w-4 bg-blue-500 h-16 rounded-t shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                      <div className="w-4 bg-blue-700 h-10 rounded-t"></div>
                      <div className="w-4 bg-blue-900 h-6 rounded-t"></div>
                   </div>
               </div>
             </div>

             {/* Floating Elements (Parallax) */}
             <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 bg-gradient-to-br from-green-400 to-emerald-600 p-4 rounded-xl shadow-lg border border-white/20 z-20"
             >
                <span className="text-2xl font-bold text-white">2025</span>
                <div className="text-xs text-green-100">Vision</div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
