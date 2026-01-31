import React, { useState, useMemo } from 'react';
import { Share2, Check, Calendar as CalendarIcon, MapPin, Twitter, Link as LinkIcon, Send, Filter, ChevronDown, Clock, User, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_EVENTS } from '../constants';

interface EventsSectionProps {
  texts: any;
}

const EventsSection: React.FC<EventsSectionProps> = ({ texts }) => {
  const [activeShareId, setActiveShareId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);
  
  // Filtering States
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const handleCopyLink = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
      setActiveShareId(null);
    }, 2000);
  };

  const toggleShareMenu = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveShareId(activeShareId === id ? null : id);
  };

  const toggleExpand = (id: number) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const handleGetDirections = (e: React.MouseEvent, region: string) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(region)}`, '_blank');
  };

  // Derive unique options from data
  const eventTypes = useMemo(() => ['All', ...Array.from(new Set(MOCK_EVENTS.map(e => e.type)))], []);
  const eventRegions = useMemo(() => ['All', ...Array.from(new Set(MOCK_EVENTS.map(e => e.region)))], []);

  // Filter Logic
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const typeMatch = selectedType === 'All' || event.type === selectedType;
    const regionMatch = selectedRegion === 'All' || event.region === selectedRegion;
    return typeMatch && regionMatch;
  });

  return (
    <section id="events" className="py-20 bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <h2 className="text-3xl font-bold font-['Orbitron'] text-white">
               {texts.upcomingEvents}
             </h2>
             <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent w-24 hidden lg:block"></div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-2 rounded-lg">
               <Filter size={16} className="text-slate-400" />
               <span className="text-xs text-slate-500 uppercase font-bold tracking-wider hidden sm:block">{texts.filterType}:</span>
               <select 
                 value={selectedType}
                 onChange={(e) => setSelectedType(e.target.value)}
                 className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
               >
                 {eventTypes.map(t => (
                   <option key={t} value={t} className="bg-slate-900">{t === 'All' ? texts.all : t}</option>
                 ))}
               </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-3 py-2 rounded-lg">
               <MapPin size={16} className="text-slate-400" />
               <span className="text-xs text-slate-500 uppercase font-bold tracking-wider hidden sm:block">{texts.filterRegion}:</span>
               <select 
                 value={selectedRegion}
                 onChange={(e) => setSelectedRegion(e.target.value)}
                 className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
               >
                 {eventRegions.map(r => (
                   <option key={r} value={r} className="bg-slate-900">{r === 'All' ? texts.all : r}</option>
                 ))}
               </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                onClick={() => toggleExpand(event.id)}
                className={`bg-slate-900 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group relative overflow-hidden cursor-pointer flex flex-col ${expandedEventId === event.id ? 'row-span-2' : ''}`}
              >
                {/* Card Header Content */}
                <div className="p-6 relative z-20">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        event.type === 'Holiday' ? 'bg-green-500/10 text-green-400' :
                        event.type === 'Business' ? 'bg-blue-500/10 text-blue-400' :
                        event.type === 'Culture' ? 'bg-purple-500/10 text-purple-400' :
                        'bg-orange-500/10 text-orange-400'
                      }`}>
                        {event.type}
                      </span>
                      
                      <div className="relative">
                        <button 
                          onClick={(e) => toggleShareMenu(e, event.id)}
                          className={`transition-colors p-1 rounded-full ${activeShareId === event.id ? 'bg-white text-slate-900' : 'text-slate-500 hover:text-white'}`}
                        >
                          <Share2 size={18} />
                        </button>

                        {/* Social Share Menu */}
                        <AnimatePresence>
                          {activeShareId === event.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 10 }}
                              className="absolute right-0 top-8 bg-slate-800 border border-white/10 rounded-xl shadow-xl p-2 flex gap-2 z-50 min-w-[160px]"
                            >
                              <button onClick={(e) => handleCopyLink(e, event.id)} className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors flex flex-col items-center gap-1 flex-1">
                                  {copiedId === event.id ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
                                  <span className="text-[9px] uppercase">{copiedId === event.id ? texts.copied : 'Copy'}</span>
                              </button>
                              <button className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 transition-colors flex flex-col items-center gap-1 flex-1">
                                  <Send size={16} />
                                  <span className="text-[9px] uppercase">TG</span>
                              </button>
                              <button className="p-2 hover:bg-sky-500/20 rounded-lg text-sky-400 transition-colors flex flex-col items-center gap-1 flex-1">
                                  <Twitter size={16} />
                                  <span className="text-[9px] uppercase">X</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex flex-col gap-2 text-sm text-slate-300 mt-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} className="text-blue-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-red-500" />
                        {event.region}
                      </div>
                    </div>
                </div>

                {/* Expanded Details Accordion */}
                <AnimatePresence>
                  {expandedEventId === event.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 overflow-hidden bg-slate-800/30"
                    >
                       <div className="pt-4 border-t border-white/5 space-y-4">
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {event.desc}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs">
                             <div className="flex items-start gap-2">
                                <Clock size={14} className="text-amber-500 mt-0.5" />
                                <div>
                                  <div className="text-slate-500 uppercase font-bold text-[10px]">Time</div>
                                  <div className="text-slate-200">{event.time}</div>
                                </div>
                             </div>
                             <div className="flex items-start gap-2">
                                <User size={14} className="text-purple-500 mt-0.5" />
                                <div>
                                  <div className="text-slate-500 uppercase font-bold text-[10px]">Organizer</div>
                                  <div className="text-slate-200">{event.organizer}</div>
                                </div>
                             </div>
                          </div>

                          <button 
                             onClick={(e) => handleGetDirections(e, event.region)}
                             className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-900/20"
                          >
                             <Navigation size={16} />
                             {texts.getDirections}
                          </button>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed State Footer */}
                <div className={`mt-auto px-6 py-4 bg-slate-950/30 border-t border-white/5 flex justify-between items-center transition-opacity ${expandedEventId === event.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                  <span className="text-xs text-slate-500">
                    {expandedEventId === event.id ? 'Click to close' : 'Click to expand'}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-blue-400 transition-transform duration-300 ${expandedEventId === event.id ? 'rotate-180' : ''}`} 
                  />
                </div>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-600/5 to-transparent rounded-bl-full pointer-events-none -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
              <Filter size={48} className="mb-4 opacity-20" />
              <p>No events found for this selection.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;