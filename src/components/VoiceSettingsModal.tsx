import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Sun,
  Moon,
  Compass,
  Play,
  Square,
  Settings,
  Sparkles,
  Check,
  Radio,
  Sliders,
  UserCheck,
} from 'lucide-react';
import { ThemeMode, VoiceSettings } from '../types';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  voiceSettings: VoiceSettings;
  onVoiceSettingsChange: (settings: VoiceSettings) => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  themeMode,
  onThemeChange,
  voiceSettings,
  onVoiceSettingsChange,
}) => {
  const [isPlayingTest, setIsPlayingTest] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setAvailableVoices(v);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  if (!isOpen) return null;

  const handleTestAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingTest) {
      window.speechSynthesis.cancel();
      setIsPlayingTest(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Select text based on language choice
    let testText = 'Cutting Interview Master: Testing high-clarity voice output.';
    if (voiceSettings.language === 'bn') {
      testText = 'কাটিং ইন্টারভিউ মাস্টার। উচ্চ শব্দ ও স্পষ্ট বাংলা অডিও পরীক্ষা করা হচ্ছে।';
    } else if (voiceSettings.language === 'bilingual') {
      testText = 'Cutting Interview Master. গার্মেন্টস কাটিং ভাইভা প্রস্তুতি স্পষ্ট ভয়েস পরীক্ষা।';
    }

    const utterance = new SpeechSynthesisUtterance(testText);

    // Apply speed
    if (voiceSettings.speed === 'slow') utterance.rate = 0.75;
    else if (voiceSettings.speed === 'fast') utterance.rate = 1.3;
    else utterance.rate = 1.0;

    // Loud & clear volume
    utterance.volume = 1.0;
    utterance.pitch = voiceSettings.gender === 'female' ? 1.15 : 0.9;

    // Filter available voice
    if (availableVoices.length > 0) {
      const isFemale = voiceSettings.gender === 'female';
      const isMale = voiceSettings.gender === 'male';

      const voice = availableVoices.find((v) => {
        const name = v.name.toLowerCase();
        if (voiceSettings.language === 'bn' && v.lang.startsWith('bn')) {
          return true;
        }
        if (isFemale && (name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('karen') || name.includes('victoria') || name.includes('natural'))) {
          return true;
        }
        if (isMale && (name.includes('male') || name.includes('david') || name.includes('george') || name.includes('mark') || name.includes('guy'))) {
          return true;
        }
        return false;
      }) || availableVoices[0];

      if (voice) {
        utterance.voice = voice;
      }
    }

    utterance.onend = () => setIsPlayingTest(false);
    utterance.onerror = () => setIsPlayingTest(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingTest(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/20 font-bold">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                অ্যাপ সেটিংস (Theme & Voice Settings)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                থিম মুড, অটো-ভয়েস স্পিড ও মেল/ফিমেল কণ্ঠ নিয়ন্ত্রণ
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isPlayingTest && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* SECTION 1: 3 THEME MOODS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                ১. থিম মুড নির্বাচন (Theme Mood - ৩টি অপশন)
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {themeMode === 'light' ? 'Light' : themeMode === 'medium' ? 'Medium' : 'Dark'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Light Mood */}
              <button
                onClick={() => onThemeChange('light')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition ${
                  themeMode === 'light'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold shadow-xs ring-2 ring-amber-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold block">Light Mood</span>
                  <span className="text-[10px] text-slate-400">উজ্জ্বল ও ফ্রেশ</span>
                </div>
              </button>

              {/* Medium Mood (Eye-Care Slate Navy) */}
              <button
                onClick={() => onThemeChange('medium')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition ${
                  themeMode === 'medium'
                    ? 'bg-blue-500/15 border-blue-500 text-blue-900 dark:text-blue-200 font-bold shadow-xs ring-2 ring-blue-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold block">Medium Mood</span>
                  <span className="text-[10px] text-slate-400">আই-কেয়ার নেভি</span>
                </div>
              </button>

              {/* Dark Mood */}
              <button
                onClick={() => onThemeChange('dark')}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition ${
                  themeMode === 'dark'
                    ? 'bg-slate-800 border-emerald-500 text-emerald-400 font-bold shadow-xs ring-2 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-emerald-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold block">Dark Mood</span>
                  <span className="text-[10px] text-slate-400">ডার্ক নাইট মোড</span>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION 2: AUTO VOICE TOGGLE */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  অটো-ভয়েস (Auto Read On Jump / Click)
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  প্রশ্ন পরিবর্তনের সাথে সাথে স্বয়ংক্রিয়ভাবে অডিও পড়া শুরু হবে
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                onVoiceSettingsChange({
                  ...voiceSettings,
                  autoVoice: !voiceSettings.autoVoice,
                })
              }
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                voiceSettings.autoVoice ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                  voiceSettings.autoVoice ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* SECTION 3: VOICE SPEED (Slow, Medium, Fast) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              ২. ভয়েস গতি নির্বাচন (Voice Speed: Slow / Medium / Fast)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'slow', label: 'Slow (ধীর)', rate: '0.75x' },
                { id: 'medium', label: 'Medium (স্বাভাবিক)', rate: '1.0x' },
                { id: 'fast', label: 'Fast (দ্রুত)', rate: '1.3x' },
              ].map((sp) => (
                <button
                  key={sp.id}
                  onClick={() =>
                    onVoiceSettingsChange({
                      ...voiceSettings,
                      speed: sp.id as 'slow' | 'medium' | 'fast',
                    })
                  }
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-0.5 transition ${
                    voiceSettings.speed === sp.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>{sp.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{sp.rate}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 4: VOICE GENDER (Female / Male) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              ৩. কণ্ঠের ধরন (Voice Gender: Female / Male)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  onVoiceSettingsChange({
                    ...voiceSettings,
                    gender: 'female',
                  })
                }
                className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                  voiceSettings.gender === 'female'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Female Voice (মহিলা কণ্ঠ)</span>
              </button>

              <button
                onClick={() =>
                  onVoiceSettingsChange({
                    ...voiceSettings,
                    gender: 'male',
                  })
                }
                className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                  voiceSettings.gender === 'male'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Male Voice (পুরুষ কণ্ঠ)</span>
              </button>
            </div>
          </div>

          {/* SECTION 5: VOICE LANGUAGE MODE */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              ৪. পড়ার ভাষা নির্বাচন (Speaking Language)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'bilingual', label: 'Bilingual (উভয় ভাষা)' },
                { id: 'en', label: 'English Only' },
                { id: 'bn', label: 'Bangla Only' },
              ].map((lg) => (
                <button
                  key={lg.id}
                  onClick={() =>
                    onVoiceSettingsChange({
                      ...voiceSettings,
                      language: lg.id as 'bilingual' | 'en' | 'bn',
                    })
                  }
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    voiceSettings.language === lg.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lg.label}
                </button>
              ))}
            </div>
          </div>

          {/* TEST VOICE BUTTON */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                উচ্চ শব্দ ও স্পষ্ট সাউন্ড টেস্ট (Test Loud Voice)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                বর্তমান সেটিংসে ভয়েস কেমন শোনাবে তা পরীক্ষা করুন
              </span>
            </div>
            <button
              onClick={handleTestAudio}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                isPlayingTest
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
              }`}
            >
              {isPlayingTest ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>থামুন (Stop)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>টেস্ট শুনুন (Test Voice)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer with Created By Jahir Rayhan & Close */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Created by <span className="text-emerald-600 dark:text-emerald-400 font-bold">Jahir Rayhan</span>
          </div>
          <button
            onClick={() => {
              if (isPlayingTest && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition"
          >
            সম্পন্ন (Save & Close)
          </button>
        </div>
      </div>
    </div>
  );
};
