import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Play,
  Square,
  Sun,
  Moon,
  Compass,
  Check,
  Radio,
  Sliders,
  Sparkles,
  ArrowLeft,
  Settings as SettingsIcon
} from 'lucide-react';
import { ThemeMode, VoiceSettings } from '../types';

interface SettingsScreenProps {
  themeMode: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  voiceSettings: VoiceSettings;
  onVoiceSettingsChange: (settings: VoiceSettings) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  themeMode,
  onThemeChange,
  voiceSettings,
  onVoiceSettingsChange,
  onBack,
}) => {
  const [isPlayingTest, setIsPlayingTest] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const loadVoices = () => {
      setAvailableVoices(window.speechSynthesis.getVoices());
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleTestAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingTest) {
      window.speechSynthesis.cancel();
      setIsPlayingTest(false);
      return;
    }

    window.speechSynthesis.cancel();

    let testText = 'Cutting Interview Master: Testing high-clarity voice output.';
    if (voiceSettings.language === 'bn') {
      testText = 'কাটিং ইন্টারভিউ মাস্টার। উচ্চ শব্দ ও স্পষ্ট বাংলা অডিও পরীক্ষা করা হচ্ছে।';
    } else if (voiceSettings.language === 'bilingual') {
      testText = 'Cutting Interview Master. গার্মেন্টস কাটিং ভাইভা প্রস্তুতি স্পষ্ট ভয়েস পরীক্ষা।';
    }

    const utterance = new SpeechSynthesisUtterance(testText);

    if (voiceSettings.speed === 'slow') utterance.rate = 0.75;
    else if (voiceSettings.speed === 'fast') utterance.rate = 1.25;
    else utterance.rate = 1.0;

    utterance.volume = 1.0;
    utterance.pitch = voiceSettings.gender === 'female' ? 1.15 : 0.9;

    if (availableVoices.length > 0) {
      const isFemale = voiceSettings.gender === 'female';
      const voice = availableVoices.find((v) => {
        const name = v.name.toLowerCase();
        if (voiceSettings.language === 'bn' && v.lang.startsWith('bn')) return true;
        if (isFemale && (name.includes('female') || name.includes('samantha') || name.includes('zira'))) return true;
        if (!isFemale && (name.includes('male') || name.includes('david') || name.includes('george'))) return true;
        return false;
      }) || availableVoices[0];

      if (voice) utterance.voice = voice;
    }

    utterance.onend = () => setIsPlayingTest(false);
    utterance.onerror = () => setIsPlayingTest(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingTest(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center font-bold">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              অ্যাপ সেটিংস ও ভয়েস কন্ট্রোল
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ভয়েস স্পিড, পিচ, সাউন্ড টেস্ট এবং ৩টি থিম মুড নির্বাচন
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোমে ফিরুন</span>
        </button>
      </div>

      {/* Voice Controls Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ভয়েস কন্ট্রোল ও অডিও সেটিংস (Voice Controls)
            </h3>
          </div>

          <button
            onClick={handleTestAudio}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
          >
            {isPlayingTest ? (
              <>
                <Square className="w-3.5 h-3.5 text-white" />
                <span>ভয়েস থামান</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-white" />
                <span>ভয়েস টেস্ট শুনুন</span>
              </>
            )}
          </button>
        </div>

        {/* Speed Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            ভয়েস পড়ার গতি (Speech Speed Rate):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'slow', label: 'ধীর (0.75x)' },
              { id: 'medium', label: 'স্বাভাবিক (1.0x)' },
              { id: 'fast', label: 'দ্রুত (1.25x)' },
            ].map((sp) => (
              <button
                key={sp.id}
                onClick={() =>
                  onVoiceSettingsChange({
                    ...voiceSettings,
                    speed: sp.id as any,
                  })
                }
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition ${
                  voiceSettings.speed === sp.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gender Voice Voice */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            কণ্ঠস্বর (Voice Persona / Gender):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'female', label: 'নারী কণ্ঠ (Female Voice)' },
              { id: 'male', label: 'পুরুষ কণ্ঠ (Male Voice)' },
            ].map((gen) => (
              <button
                key={gen.id}
                onClick={() =>
                  onVoiceSettingsChange({
                    ...voiceSettings,
                    gender: gen.id as any,
                  })
                }
                className={`py-2.5 px-4 rounded-2xl text-xs font-bold border transition ${
                  voiceSettings.gender === gen.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {gen.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            অডিও ভাষা মোড (Audio Language):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'bilingual', label: 'বাংলা ও ইংরেজি' },
              { id: 'bn', label: 'শুধু বাংলা' },
              { id: 'en', label: 'English Only' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() =>
                  onVoiceSettingsChange({
                    ...voiceSettings,
                    language: lang.id as any,
                  })
                }
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition ${
                  voiceSettings.language === lang.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Voice Readout Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              স্বয়ংক্রিয় ভয়েস পাঠ (Auto-Voice on Question Open)
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              যেকোনো প্রশ্নে ক্লিক করলে সাথে সাথে অডিও স্বয়ংক্রিয়ভাবে পড়ে শোনাবে
            </span>
          </div>
          <button
            onClick={() =>
              onVoiceSettingsChange({
                ...voiceSettings,
                autoVoice: !voiceSettings.autoVoice,
              })
            }
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              voiceSettings.autoVoice ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                voiceSettings.autoVoice ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          অ্যাপ থিম মুড (Theme Mood)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'light' as ThemeMode,
              nameBn: 'লাইট মুড (Light)',
              desc: 'পরিষ্কার সাদা ব্যাকগ্রাউন্ড',
              icon: <Sun className="w-5 h-5 text-amber-500" />,
            },
            {
              id: 'medium' as ThemeMode,
              nameBn: 'মিডিয়াম স্লেট (Medium)',
              desc: 'আরামদায়ক সফট ডার্ক গ্রে',
              icon: <Compass className="w-5 h-5 text-sky-400" />,
            },
            {
              id: 'dark' as ThemeMode,
              nameBn: 'ডিপ নেভি ডার্ক (Dark)',
              desc: 'স্মার্ট ও আরামদায়ক কাটিং ব্লু',
              icon: <Moon className="w-5 h-5 text-emerald-400" />,
            },
          ].map((th) => (
            <button
              key={th.id}
              onClick={() => onThemeChange(th.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition ${
                themeMode === th.id
                  ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                {th.icon}
                {themeMode === th.id && (
                  <Check className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold block">{th.nameBn}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {th.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
