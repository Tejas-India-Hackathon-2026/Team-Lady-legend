'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchApi } from '@/lib/api';
import { Mic, MicOff, Volume2, X, Send, Bot, Sparkles } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: language === 'bho'
        ? "नमस्ते किसान भाई! हमरा से अपन खेत के सेहत, बीमारी, या मौसम के बारे में पूछीं।"
        : language === 'hi'
        ? "नमस्ते किसान भाई! मैं आपकी फसल की निगरानी कर रहा हूँ। मुझसे खेत के स्वास्थ्य, बीमारी या मौसम के बारे में पूछें।"
        : "Hello Farmer! I am AgriVision AI. Ask me about your farm health score, disease detection, or irrigation advice."
    }
  ]);

  if (!isOpen) return null;

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: queryText }];
    setMessages(newMsgs);
    setInputText('');

    // Call API or AI assistant service
    const res = await fetchApi('/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ message: queryText, language, farm_id: 1 })
    });

    const replyText = res?.reply || (
      language === 'bho'
        ? "रउआ Green Valley Farm के सेहत स्कोर 82/100 बा। 7.4% हिस्सा में Yellow Rust (पीला रतुआ) के लक्षण पावल गइल बा।"
        : language === 'hi'
        ? "आपके Green Valley Farm का स्वास्थ्य स्कोर 82/100 है। खेत के 7.4% क्षेत्र में पीला रतुआ (Yellow Rust) के शुरुआती लक्षण मिले हैं।"
        : "Your Green Valley Farm health score is 82/100. 7.4% of your wheat crop shows signs of Yellow Rust disease."
    );

    setMessages([...newMsgs, { sender: 'assistant', text: replyText }]);

    // Text-To-Speech Synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(replyText);
      utterance.lang = language === 'en' ? 'en-IN' : 'hi-IN';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startVoiceInput = () => {
    if (isListening) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your query.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-IN' : 'hi-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      handleSendQuery(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-600/40 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col h-[580px]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                AgriVision Voice Assistant
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </h3>
              <span className="text-[11px] text-emerald-300">Hindi • Bhojpuri • English Interaction</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow'
                    : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Large Mic Button & Controls */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 space-y-3">
          
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={startVoiceInput}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold transition-all shadow-xl ${
                isListening
                  ? 'bg-red-600 animate-ping ring-8 ring-red-500/30'
                  : isSpeaking
                  ? 'bg-amber-600 animate-pulse'
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-500 hover:scale-105 shadow-emerald-950'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
          </div>

          <div className="text-center text-xs font-semibold text-emerald-400">
            {isListening ? "🔴 Listening... (बोलिए...)" : isSpeaking ? "🔊 Speaking... (सुनिए...)" : "Tap microphone to speak"}
          </div>

          {/* Quick Voice Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-[11px]">
            <button
              onClick={() => handleSendQuery("मेरे खेत की हालत कैसी है?")}
              className="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-full border border-slate-700"
            >
              "मेरे खेत की हालत कैसी है?"
            </button>
            <button
              onClick={() => handleSendQuery("हमरा खेत में बीमारी कहाँ बा?")}
              className="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-full border border-slate-700"
            >
              "हमरा खेत में बीमारी कहाँ बा?"
            </button>
            <button
              onClick={() => handleSendQuery("Which area needs attention?")}
              className="bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-full border border-slate-700"
            >
              "Which area needs attention?"
            </button>
          </div>

          {/* Fallback Text Input */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendQuery(inputText)}
              placeholder="Type your question in Hindi, Bhojpuri, or English..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSendQuery(inputText)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
