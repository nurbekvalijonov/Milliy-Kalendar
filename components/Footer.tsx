import React from 'react';
import { Twitter, Mail, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 font-['Orbitron']">MILLIY<span className="text-green-500">KALENDAR</span></h3>
            <p className="text-slate-400 max-w-sm">
              The future of digital time infrastructure. Unifying events, geography, and national values into a single 3D platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:berdimurodovalijon59@gmail.com" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                  <Mail size={16} /> berdimurodovalijon59@gmail.com
                </a>
              </li>
              <li>
                <a href="https://t.me/nurbekvalijonov" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                  <Send size={16} /> @nurbekvalijonov
                </a>
              </li>
              <li>
                <a href="https://twitter.com/ValijonovNurbek" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter size={16} /> @ValijonovNurbek
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">E-Gov Compliance</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
           <p className="text-slate-500 text-sm">© 2025 Milliy Kalendar Startup. All rights reserved.</p>
           <p className="text-slate-600 text-xs mt-2 md:mt-0">Prototype v1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
