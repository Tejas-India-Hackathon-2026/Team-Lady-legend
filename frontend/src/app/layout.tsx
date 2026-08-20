'use client';

import React, { useState } from 'react';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>AgriVision — AI-Powered Precision Agriculture Platform</title>
        <meta name="description" content="Multilingual AI-powered precision-agriculture platform combining drone scans, computer vision crop disease detection, water stress mapping, and voice interaction in Hindi, Bhojpuri & English." />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
        <AuthProvider>
          <LanguageProvider>
            <DemoBanner />
            <Navbar onOpenVoiceModal={() => setIsVoiceOpen(true)} />
            <main>{children}</main>
            <VoiceAssistantModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
