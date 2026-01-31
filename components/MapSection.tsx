import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Maximize, Minus, Plus, X, Activity, Navigation, Calendar } from 'lucide-react';

interface MapSectionProps {
  texts: any;
}

interface HeatmapPoint {
  id: number;
  top: string;
  left: string;
  delay: number;
  label: string;
  value: number;
}

const MapSection: React.FC<MapSectionProps> = ({ texts }) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0); // 0: Init, 1: Loading, 2: Rendering
  const [selectedPoint, setSelectedPoint] = useState<HeatmapPoint | null>(null);

  // Mock heatmap points (percentage based positioning)
  const heatmapPoints: HeatmapPoint[] = [
    { id: 1, top: '40%', left: '70%', delay: 0, label: 'Tashkent', value: 92 },
    { id: 2, top: '55%', left: '50%', delay: 1, label: 'Samarkand', value: 85 },
    { id: 3, top: '60%', left: '40%', delay: 2, label: 'Bukhara', value: 78 },
    { id: 4, top: '45%', left: '20%', delay: 0.5, label: 'Khiva', value: 64 },
    { id: 5, top: '50%', left: '85%', delay: 1.5, label: 'Fergana', value: 70 },
  ];

  const handleLaunch = () => {
    setIsLoading(true);
    setLoadingStep(0);
    
    // Simulate complex loading phases
    setTimeout(() => setLoadingStep(1), 800);
    setTimeout(() => setLoadingStep(2), 1800);
    setTimeout(() => {
      setIsLoading(false);
      setIsActive(true);
    }, 2800);
  };

  const handleViewEvents = () => {
    // Scroll to events section
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
    setSelectedPoint(null);
  };

  const handleDirections = () => {
    alert("Simulation: Opening GPS Navigation to " + selectedPoint?.label);
  };

  return (
    <section id="map" className="relative h-[80vh] bg-slate-900 flex items-center justify-center overflow-hidden border-y border-white/5">
      
      {/* Background Abstract Grid if inactive */}
      {!isActive && (
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?grayscale&blur=2')] opacity-20 bg-cover bg-center"></div>
      )}

      <div className="w-full h-full relative z-10 max-w-7xl mx-auto md:px-4 md:py-8">
        
        {/* Main Map Container */}
        <div className="w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
          
          {isActive ? (
            <div className="absolute inset-0 w-full h-full bg-slate-900">
               {/* Google Maps Embed */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039648.868726588!2d63.0!3d41.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b403c7a75!2sUzbekistan!5e1!3m2!1sen!2s!4v1716380000000!5m2!1sen!2s" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Uzbekistan Map"
                 className="opacity-80 hover:opacity-100 transition-opacity duration-700"
               ></iframe>

               {/* Map Controls */}
               <div className="absolute right-4 bottom-24 flex flex-col gap-2 z-20">
                 <button 
                    className="w-10 h-10 bg-slate-800/90 text-white rounded-lg flex items-center justify-center border border-white/10 hover:bg-blue-600 transition-colors shadow-lg group relative" 
                    title="Zoom In"
                 >
                   <Plus size={20} />
                   <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-black/90 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
                     Zoom In
                   </div>
                 </button>
                 <button 
                    className="w-10 h-10 bg-slate-800/90 text-white rounded-lg flex items-center justify-center border border-white/10 hover:bg-blue-600 transition-colors shadow-lg group relative" 
                    title="Zoom Out"
                 >
                   <Minus size={20} />
                   <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-black/90 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md border border-white/10">
                     Zoom Out
                   </div>
                 </button>
               </div>

               {/* Live Feed Indicator */}
               <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur p-3 rounded-lg border border-white/10 shadow-lg pointer-events-none z-20">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-xs font-bold text-white uppercase tracking-wider">Live System Feed</span>
                 </div>
                 <div className="text-xs text-slate-400 font-mono">
                    LAT: 41.2995° N<br/>
                    LNG: 69.2401° E<br/>
                    ACTIVE NODES: {heatmapPoints.length}
                 </div>
               </div>

               {/* Interactive Heatmap Points */}
               {heatmapPoints.map((point) => (
                 <div 
                   key={point.id}
                   className="absolute z-10"
                   style={{ top: point.top, left: point.left }}
                 >
                   <button 
                     onClick={() => setSelectedPoint(point)}
                     className="relative group focus:outline-none"
                   >
                     {/* Pulse Effect */}
                     <motion.div
                       animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
                       transition={{ duration: 2, repeat: Infinity, delay: point.delay }}
                       className="absolute inset-0 bg-green-500/40 rounded-full"
                     />
                     {/* Core Point */}
                     <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white/80 shadow-[0_0_10px_rgba(34,197,94,0.8)] relative z-10 transform transition-transform group-hover:scale-125"></div>
                     
                     {/* Hover Label */}
                     <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                       {point.label}
                     </div>
                   </button>
                 </div>
               ))}

               {/* Point Details Modal Overlay */}
               <AnimatePresence>
                 {selectedPoint && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                     onClick={() => setSelectedPoint(null)}
                   >
                     <motion.div
                       initial={{ opacity: 0, scale: 0.9, y: 20 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.9, y: 20 }}
                       onClick={(e) => e.stopPropagation()}
                       className="w-full max-w-md bg-slate-900 border border-green-500/30 p-0 rounded-2xl shadow-2xl overflow-hidden"
                     >
                       {/* Modal Header */}
                       <div className="relative bg-slate-800 p-6 pb-8">
                          <button onClick={() => setSelectedPoint(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <X size={20} />
                          </button>
                          <h3 className="text-2xl font-bold text-white font-['Orbitron'] mb-1">{selectedPoint.label}</h3>
                          <span className="text-xs text-green-400 font-mono bg-green-500/10 px-2 py-1 rounded border border-green-500/20">ID: {selectedPoint.id}-UZ-NODE</span>
                       </div>

                       {/* Modal Body */}
                       <div className="p-6 -mt-4 bg-slate-900 rounded-t-2xl relative">
                          <div className="flex items-center justify-between mb-6">
                             <div className="text-center w-1/2 border-r border-white/10">
                                <div className="text-slate-400 text-xs uppercase mb-1">Activity</div>
                                <div className="text-2xl font-bold text-white">{selectedPoint.value}%</div>
                             </div>
                             <div className="text-center w-1/2">
                                <div className="text-slate-400 text-xs uppercase mb-1">Status</div>
                                <div className="text-green-400 font-bold flex items-center justify-center gap-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Live
                                </div>
                             </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                             <button 
                               onClick={handleViewEvents}
                               className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl border border-white/10 transition-all hover:scale-[1.02]"
                             >
                                <Calendar size={18} className="text-blue-400" />
                                <span className="text-sm font-semibold">{texts.viewEventsInRegion}</span>
                             </button>
                             <button 
                               onClick={handleDirections}
                               className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]"
                             >
                                <Navigation size={18} />
                                <span className="text-sm font-semibold">{texts.getDirections}</span>
                             </button>
                          </div>
                       </div>
                     </motion.div>
                   </motion.div>
                 )}
               </AnimatePresence>

            </div>
          ) : (
            // Inactive State with Advanced Segmented Loading
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="text-center w-full max-w-md flex flex-col items-center"
               >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <Map className="text-blue-400 w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold font-['Orbitron'] mb-4 text-white">3D Interactive Map</h2>
                  <p className="text-slate-400 mb-8 max-w-sm">
                    {texts.mapDesc || "Visualizing 12 regions with real-time event heatmaps and AI-driven traffic analysis."}
                  </p>
                  
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center w-full">
                       {/* Circular Segmented Loader */}
                       <div className="relative w-24 h-24 mb-6">
                          <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                             {/* Background Ring */}
                             <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                             {/* Segment 1 */}
                             <circle cx="50" cy="50" r="45" fill="none" stroke={loadingStep >= 0 ? "#3b82f6" : "transparent"} strokeWidth="8" strokeDasharray="70 200" strokeDashoffset="0" className="transition-all duration-500" />
                             {/* Segment 2 */}
                             <circle cx="50" cy="50" r="45" fill="none" stroke={loadingStep >= 1 ? "#8b5cf6" : "transparent"} strokeWidth="8" strokeDasharray="70 200" strokeDashoffset="-90" className="transition-all duration-500" />
                             {/* Segment 3 */}
                             <circle cx="50" cy="50" r="45" fill="none" stroke={loadingStep >= 2 ? "#10b981" : "transparent"} strokeWidth="8" strokeDasharray="70 200" strokeDashoffset="-180" className="transition-all duration-500" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold font-mono text-white">
                             {loadingStep === 0 ? "33%" : loadingStep === 1 ? "66%" : "99%"}
                          </div>
                       </div>
                       
                       {/* Text Status */}
                       <motion.div
                          key={loadingStep}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-slate-300 font-mono text-sm"
                       >
                          {loadingStep === 0 && texts.initializing}
                          {loadingStep === 1 && texts.loadingData}
                          {loadingStep === 2 && texts.renderingMap}
                       </motion.div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleLaunch}
                      className="group relative w-full md:w-auto px-10 py-4 bg-transparent overflow-hidden rounded-xl border border-green-500 text-green-400 font-bold tracking-widest uppercase transition-all hover:bg-green-500 hover:text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {texts.launchMap} <Maximize size={18} />
                      </span>
                    </button>
                  )}
               </motion.div>
            </div>
          )}
          
          {/* Decorative Corner Markers */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500/50 rounded-tl-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500/50 rounded-br-2xl pointer-events-none"></div>

        </div>
      </div>
    </section>
  );
};

export default MapSection;