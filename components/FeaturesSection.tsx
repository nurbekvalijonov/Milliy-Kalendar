import React from 'react';
import { Calendar, Map, FileText, Star, Users, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturesSectionProps {
  texts: any;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ texts }) => {
  const features = [
    { icon: <Calendar className="w-8 h-8 text-blue-400" />, title: texts.calendar, desc: "Interactive day/week/month view" },
    { icon: <Map className="w-8 h-8 text-green-400" />, title: texts.map, desc: "GPS-inspired event location tracking" },
    { icon: <FileText className="w-8 h-8 text-purple-400" />, title: "Reports", desc: "Automated after-event analytics" },
    { icon: <Star className="w-8 h-8 text-yellow-400" />, title: "Reputation", desc: "Trust index for organizers" },
    { icon: <Landmark className="w-8 h-8 text-emerald-400" />, title: texts.national, desc: "Holidays, Prayer Times, History" },
    { icon: <Users className="w-8 h-8 text-pink-400" />, title: texts.community, desc: "Mahalla notifications & meetings" },
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            {texts.features}
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
              className="group perspective-1000"
            >
              <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-2xl h-full shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-125">
                   {feature.icon}
                </div>
                
                <div className="mb-6 bg-slate-800/50 w-16 h-16 rounded-xl flex items-center justify-center shadow-inner border border-white/5">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 font-['Orbitron']">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                
                <div className="mt-6 flex items-center text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  EXPLORE <div className="w-8 h-[1px] bg-blue-400 ml-2"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
