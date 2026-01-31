import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import AnalyticsSection from './components/AnalyticsSection';
import ChatAssistant from './components/ChatAssistant';
import Footer from './components/Footer';
import MapSection from './components/MapSection';
import EventsSection from './components/EventsSection';
import AboutSection from './components/AboutSection';
import { Language } from './types';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.UZ);

  // Get current translation object
  const texts = TRANSLATIONS[lang];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 selection:bg-green-500/30">
      <Navbar currentLang={lang} setLang={setLang} texts={texts} />
      
      <main>
        <Hero texts={texts} />
        <AboutSection texts={texts} />
        <FeaturesSection texts={texts} />
        <MapSection texts={texts} />
        <EventsSection texts={texts} />
        <AnalyticsSection texts={texts} />
      </main>

      <Footer />
      <ChatAssistant texts={texts} />
    </div>
  );
};

export default App;