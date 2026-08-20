'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { fetchApi } from '@/lib/api';
import { Bot, Mic, Send, Sparkles } from 'lucide-react';

export default function AssistantPage() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: language === 'bho'
        ? "नमस्ते किसान भाई! हमरा से अपन खेत के सेहत, बीमारी, या मौसम के बारे में पूछीं।"
        : language === 'hi'
        ? "नमस्ते किसान भाई! मैं आपकी फसल की निगरानी कर रहा हूँ। मुझसे खेत के स्वास्थ्य, बीमारी या मौसम के बारे में पूछें।"
        : "Hello Farmer! I am AgriVision AI Assistant. How can I help you with your crop health today?"
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { sender: 'user' as const, text }];
    setMessages(newMsgs);
    setInput('');

    const res = await fetchApi<{ reply?: string }>('/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ message: text, language, farm_id: 1 })
    });

    const replyText = res?.reply || (
      language === 'bho'
        ? "रउआ Green Valley Farm के सेहत स्कोर 82/100 बा। 7.4% हिस्सा में Yellow Rust बीमारी बा।"
        : language === 'hi'
        ? "आपके Green Valley Farm का स्वास्थ्य स्कोर 82/100 है। खेत के 7.4% क्षेत्र में पीला रतुआ देखा गया है।"
        : "Your Green Valley Farm health score is 82/100. 7.4% of your wheat field has Yellow Rust disease."
    );

    setMessages([
      ...newMsgs,
      {
        sender: 'assistant',
        text: replyText
      }
    ]);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-lg">AI Agriculture Assistant</h1>
              <span className="text-xs text-emerald-300">Hindi • Bhojpuri • English Interaction</span>
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-y-auto space-y-4 shadow-xl">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Controls */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Type your question in Hindi, Bhojpuri, or English..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={() => handleSend(input)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-xl shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}
