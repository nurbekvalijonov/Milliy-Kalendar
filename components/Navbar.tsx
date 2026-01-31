import React, { useState } from 'react';
import { Globe, Calendar, User, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  texts: any;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, setLang, texts }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLang = () => setIsLangOpen(!isLangOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
               <Calendar className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-wider text-white font-['Orbitron']">
              MILLIY<span className="text-green-400">KALENDAR</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-green-400 transition-colors">{texts.about}</a>
            <a href="#features" className="hover:text-green-400 transition-colors">{texts.features}</a>
            <a href="#map" className="hover:text-green-400 transition-colors">{texts.map}</a>
            <a href="#analytics" className="hover:text-green-400 transition-colors">{texts.analytics}</a>
            <a href="#contact" className="hover:text-green-400 transition-colors">{texts.contact}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-green-500/50"
              >
                <Globe size={16} />
                <span className="uppercase text-xs font-bold">{currentLang}</span>
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                  >
                    {[
                      { code: Language.UZ, label: "O'zbek" },
                      { code: Language.EN, label: "English" },
                      { code: Language.RU, label: "Русский" }
                    ].map((l) => (
                      <button 
                        key={l.code}
                        onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors ${
                          currentLang === l.code 
                            ? 'bg-blue-600/20 text-blue-400' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {l.label}
                        {currentLang === l.code && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-all shadow-[0_0_10px_rgba(37,99,235,0.5)] hover:scale-105">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;