import React from 'react';
import { ArrowLeft, Menu, Sun, Moon, Compass, Sparkles } from 'lucide-react';
import { AppMode, ThemeMode } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  onBackToHome: () => void;
  themeMode: ThemeMode;
  onCycleTheme: () => void;
  onOpenMenu: () => void;
  isInstalled: boolean;
}

const MODE_TITLES: Record<AppMode, { bn: string; en: string }> = {
  home: { bn: 'হোম ড্যাশবোর্ড', en: 'Home Dashboard' },
  questions: { bn: 'লিখিত প্রশ্ন ও উত্তর', en: 'Written Questions (100+)' },
  abbreviations: { bn: 'অ্যাব্রিভিয়েশন ফ্ল্যাশকার্ড', en: 'Abbreviations' },
  calculator: { bn: 'কাটিং ক্যালকুলেটর', en: 'Formula Calculator' },
  research: { bn: 'লাইভ নেট সার্চ (Q&A)', en: 'Live Web Search' },
  'voice-chat': { bn: 'এআই ভয়েস ভাইভা চ্যাট', en: 'AI Voice Viva Coach' },
  settings: { bn: 'সেটিংস ও ভয়েস কন্ট্রোল', en: 'Settings & Voice' },
  install: { bn: 'মোবাইল অ্যাপ ইনস্টল', en: 'Install App (PWA)' },
};

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  onBackToHome,
  themeMode,
  onCycleTheme,
  onOpenMenu,
  isInstalled,
}) => {
  const isInsideFeature = currentMode !== 'home';
  const modeInfo = MODE_TITLES[currentMode] || { bn: 'কাটিং মাস্টার', en: 'CutMaster' };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left Side: Back Button or App Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isInsideFeature ? (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs shadow-xs active:scale-95 transition"
              title="হোমে ফিরে যান (Back to Home)"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>পিছনে (Back)</span>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 shadow-sm bg-slate-900 shrink-0">
              <img
                src="/app-icon.jpg"
                alt="Cutting Interview Master Icon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/icon.svg';
                }}
              />
            </div>
          )}

          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
              <span>{isInsideFeature ? modeInfo.bn : 'Cutting Interview Master'}</span>
              {!isInsideFeature && (
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                  <Sparkles className="w-2.5 h-2.5" />
                  RMG Guide
                </span>
              )}
            </h1>
            <span className="text-[10px] text-emerald-400 font-medium tracking-wide">
              {isInsideFeature ? modeInfo.en : 'পোশাক কাটিং লিখিত ও ভাইভা প্রস্তুতি'}
            </span>
          </div>
        </div>

        {/* Right Side: Theme Cycle + Always-Visible Menu Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Mood Cycle Button */}
          <button
            onClick={onCycleTheme}
            aria-label={`Current: ${themeMode} mood. Click to switch`}
            title={`Mood: ${themeMode.toUpperCase()} (Light / Medium / Dark)`}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 transition active:scale-95"
          >
            {themeMode === 'light' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : themeMode === 'medium' ? (
              <Compass className="w-4 h-4 text-sky-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Persistent Always-Visible Corner Menu Button */}
          <button
            onClick={onOpenMenu}
            aria-label="Open Full Menu"
            title="সকল ফিচারের মেনু খুলুন (Menu)"
            className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
          >
            <Menu className="w-4 h-4 text-slate-950 shrink-0 stroke-[2.5]" />
            <span className="tracking-wide">মেনু (Menu)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
