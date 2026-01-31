export enum Language {
  UZ = 'uz',
  EN = 'en',
  RU = 'ru'
}

export interface ContentText {
  heroTitle: string;
  heroSubtitle: string;
  ctaDemo: string;
  ctaExplore: string;
  features: string;
  about: string;
  calendar: string;
  map: string;
  analytics: string;
  contact: string;
  community: string;
  national: string;
  chatPlaceholder: string;
  chatWelcome: string;
  launchMap: string;
  loadingMap: string;
  share: string;
  copied: string;
  upcomingEvents: string;
  disclaimerTitle: string;
  disclaimerText: string;
  founder: string;
  founderRole: string;
  readMore: string;
  socialShare: string;
  // New keys for features
  filterType: string;
  filterRegion: string;
  all: string;
  viewEventsInRegion: string;
  getDirections: string;
  close: string;
  initializing: string;
  loadingData: string;
  renderingMap: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface NavItem {
  id: string;
  label: string;
}