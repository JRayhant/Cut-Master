import React from 'react';
import {
  X,
  Home,
  BookOpen,
  Layers,
  Calculator,
  Globe,
  Bot,
  Settings,
  Download,
  Share2,
  Copy,
  Sun,
  Moon,
  Compass,
  Check,
  ChevronRight,
  Sparkles,
  Wifi,
  WifiOff,
  PlusCircle,
} from 'lucide-react';
import { AppMode, ThemeMode, VoiceSettings } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  themeMode: ThemeMode;
  onCycleTheme: () => void;
  voiceSettings: VoiceSettings;
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => void;
  onShare: () => void;
  onCopyLink: () => void;
  isOnline: boolean;
  totalQuestions: number;
  totalAbbreviations: number;
  onOpenAddContent?: (tab?: 'question' | 'abbreviation' | 'manage') => void;
  customQuestionsCount?: number;
  customAbbreviationsCount?: number;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSelectMode,
  themeMode,
  onCycleTheme,
  voiceSettings,
  isInstallable,
  isInstalled,
  onInstall,
  onShare,
  onCopyLink,
  isOnline,
  totalQuestions,
  totalAbbreviations,
  onOpenAddContent,
  customQuestionsCount = 0,
  customAbbreviationsCount = 0,
}) => {
  if (!isOpen) return null;

  const menuItems: {
    id: AppMode;
    labelBn: string;
    labelEn: string;
    icon: React.ReactNode;
    badge?: string | number;
    color: string;
  }[] = [
    {
      id: 'home',
      labelBn: 'হোম ড্যাশবোর্ড',
      labelEn: 'Home Dashboard',
      icon: <Home className="w-5 h-5" />,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'questions',
      labelBn: 'লিখিত পরীক্ষার প্রশ্ন-উত্তর',
      labelEn: 'Written Test Questions & Answers',
      icon: <BookOpen className="w-5 h-5" />,
      badge: `${totalQuestions} টি`,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      id: 'abbreviations',
      labelBn: 'অ্যাব্রিভিয়েশন ফ্ল্যাশকার্ড',
      labelEn: 'Garments Abbreviations Flashcards',
      icon: <Layers className="w-5 h-5" />,
      badge: `${totalAbbreviations} টি`,
      color: 'from-amber-600 to-orange-600',
    },
    {
      id: 'calculator',
      labelBn: 'কাটিং ক্যালকুলেটর ও সূত্র',
      labelEn: 'Cutting Formula Calculator (GSM, Skew, etc.)',
      icon: <Calculator className="w-5 h-5" />,
      color: 'from-violet-600 to-purple-600',
    },
    {
      id: 'research',
      labelBn: 'লাইভ নেট সার্চ ও সমাধান',
      labelEn: 'Live Web Search & Deep Explanations',
      icon: <Globe className="w-5 h-5" />,
      badge: 'Live',
      color: 'from-cyan-600 to-blue-600',
    },
    {
      id: 'voice-chat',
      labelBn: 'এআই ভয়েস চ্যাট ও ভাইভা কোচ',
      labelEn: 'AI Voice Chat & Viva Practice Coach',
      icon: <Bot className="w-5 h-5" />,
      badge: 'Voice AI',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'settings',
      labelBn: 'সেটিংস ও ভয়েস কন্ট্রোল',
      labelEn: 'Settings & Voice Controls (Speed, Pitch, Theme)',
      icon: <Settings className="w-5 h-5" />,
      color: 'from-slate-600 to-slate-800',
    },
    {
      id: 'install',
      labelBn: 'অ্যাপ ইনস্টল করুন (PWA)',
      labelEn: 'Install Mobile App with Icon',
      icon: <Download className="w-5 h-5" />,
      badge: isInstalled ? 'Installed' : 'App',
      color: 'from-green-600 to-emerald-700',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-in Drawer Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-md shadow-emerald-500/20 bg-slate-900 shrink-0">
              <img
                src="/app-icon.jpg"
                alt="CutMaster Icon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/icon.svg';
                }}
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                Cutting Interview Master
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  সকল ফিচার ও মেনু
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  {isOnline ? (
                    <>
                      <Wifi className="w-3 h-3 text-emerald-500" />
                      <span>অনলাইন</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3 text-amber-500" />
                      <span>অফলাইন</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Content Quick Action Banner */}
        {onOpenAddContent && (
          <div className="p-3 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenAddContent('question');
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 active:scale-98 transition text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-950/15 flex items-center justify-center shrink-0">
                  <PlusCircle className="w-4 h-4 text-slate-950" />
                </div>
                <div className="text-left">
                  <div className="font-bold">নতুন প্রশ্ন ও অ্যাব্রেভিয়েশন যোগ করুন</div>
                  <div className="text-[10px] font-semibold opacity-90">
                    নিজস্ব ভাইভা প্রশ্ন ও শব্দসংক্ষেপ যুক্ত করুন
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
            </button>
          </div>
        )}

        {/* Drawer Body - Scrollable Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Quick Install Banner inside Menu (if not installed) */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 shrink-0">
                <img src="/app-icon.jpg" alt="Icon" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {isInstalled ? 'অ্যাপটি ইনস্টল রয়েছে' : 'ফোনে অ্যাপ ইনস্টল করুন'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isInstalled ? 'আইকন দিয়ে হোমস্ক্রিন থেকে চালান' : 'মোবাইলে সহজে আইকন সহ ইনস্টল'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onSelectMode('install');
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition shrink-0"
            >
              {isInstalled ? 'দেখুন' : 'ইনস্টল'}
            </button>
          </div>

          {/* Feature Navigation List */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
              ফিচার তালিকা (Select Feature)
            </span>

            {menuItems.map((item) => {
              const isActive = currentMode === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectMode(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30 shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${item.color} shadow-sm shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold leading-tight">
                        {item.labelBn}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                        {item.labelEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Actions (Share & Copy Link) */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
              শেয়ার ও লিংক
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onCopyLink();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
              >
                <Copy className="w-3.5 h-3.5 text-emerald-500" />
                <span>লিংক কপি করুন</span>
              </button>

              <button
                onClick={() => {
                  onShare();
                }}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>অ্যাপ শেয়ার করুন</span>
              </button>
            </div>
          </div>

          {/* Theme & Voice Mood summary */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                থিম মুড:
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 capitalize">
                {themeMode}
              </span>
            </div>

            <button
              onClick={onCycleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              {themeMode === 'light' ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : themeMode === 'medium' ? (
                <Compass className="w-3.5 h-3.5 text-sky-500" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>মুড পরিবর্তন</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-center text-xs text-slate-500">
          <span>Created by </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Jahir Rayhan</span>
        </div>
      </div>
    </div>
  );
};
