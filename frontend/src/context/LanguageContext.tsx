'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language } from '@/types';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    bho: string;
  };
}

export const translations: Translations = {
  appName: { en: 'AgriVision', hi: 'एग्रीविज़न', bho: 'एग्रीविज़न' },
  tagline: { en: 'DETECT. DECIDE. TREAT. MONITOR.', hi: 'जांचें। निर्णय लें। उपचार करें। निगरानी करें।', bho: 'जांचीं। निर्णय लीं। इलाज करीं। देखरेख करीं।' },
  heroSubtitle: {
    en: 'See Your Farm. Detect Problems Early. Grow Smarter.',
    hi: 'अपने खेत को समझें। समस्याओं को समय पर पहचानें। स्मार्ट खेती करें।',
    bho: 'अपन खेत के समझीं। बीमारी के जल्दी पहचानीं। समझदारी से खेती करीं।'
  },
  bookDrone: { en: 'Book Drone Scan', hi: 'ड्रोन स्कैन बुक करें', bho: 'ड्रोन स्कैन बुक करीं' },
  explorePlatform: { en: 'Explore Platform', hi: 'प्लेटफॉर्म देखें', bho: 'प्लेटफॉर्म देखीं' },
  healthScore: { en: 'Farm Health Score', hi: 'खेत स्वास्थ्य स्कोर', bho: 'खेत सेहत स्कोर' },
  healthyArea: { en: 'Healthy Area', hi: 'स्वस्थ क्षेत्र', bho: 'बढ़िया क्षेत्र' },
  warningArea: { en: 'Warning Area', hi: 'चेतावनी क्षेत्र', bho: 'ध्यान देवे वाला क्षेत्र' },
  highRiskArea: { en: 'High Risk Area', hi: 'उच्च जोखिम क्षेत्र', bho: 'खतरा वाला क्षेत्र' },
  askAssistant: { en: 'Ask AgriVision AI', hi: 'एग्रीविज़न AI से पूछें', bho: 'एग्रीविज़न AI से पूछीं' },
  recentAlerts: { en: 'Recent Field Alerts', hi: 'हाल की खेत चेतावनियाँ', bho: 'हाल के खेत चेतावनी' },
  droneOperatorDashboard: { en: 'Drone Operator Dashboard', hi: 'ड्रोन ऑपरेटर डैशबोर्ड', bho: 'ड्रोन ऑपरेटर डैशबोर्ड' },
  agronomistExpertCenter: { en: 'Agronomist Expert Center', hi: 'कृषि विशेषज्ञ केंद्र', bho: 'कृषि विशेषज्ञ केंद्र' },
  adminAnalytics: { en: 'Platform Admin Analytics', hi: 'एडमिन एनालिटिक्स', bho: 'एडमिन एनालिटिक्स' },
  fpoOrganizationHub: { en: 'FPO / Organization Hub', hi: 'FPO / संगठन केंद्र', bho: 'FPO / संस्था केंद्र' },
  downloadReport: { en: 'Download PDF Report', hi: 'PDF रिपोर्ट डाउनलोड करें', bho: 'PDF रिपोर्ट डाउनलोड करीं' },
  waterStressMap: { en: 'Water Stress Map', hi: 'जल तनाव मानचित्र', bho: 'पानी तनाव नक्शा' },
  diseaseDetection: { en: 'Disease Detection', hi: 'रोग पहचान', bho: 'बीमारी पहचान' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('hi');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    if (translations[key] && translations[key]['en']) {
      return translations[key]['en'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
