import React from 'react';
import {
  BookOpen,
  Layers,
  Calculator,
  Globe,
  Bot,
  Settings,
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Mic,
  Award,
  Smartphone,
  PlusCircle,
  FileText,
} from 'lucide-react';
import { AppMode, ThemeMode } from '../types';

interface HomeDashboardProps {
  onSelectMode: (mode: AppMode) => void;
  totalQuestions: number;
  totalAbbreviations: number;
  bookmarkedCount: number;
  isInstalled: boolean;
  onShare: () => void;
  onCopyLink: () => void;
  onOpenAddContent?: (tab?: 'question' | 'abbreviation' | 'manage') => void;
  customQuestionsCount?: number;
  customAbbreviationsCount?: number;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onSelectMode,
  totalQuestions,
  totalAbbreviations,
  bookmarkedCount,
  isInstalled,
  onShare,
  onCopyLink,
  onOpenAddContent,
  customQuestionsCount = 0,
  customAbbreviationsCount = 0,
}) => {
  const featureCards = [
    {
      id: 'questions' as AppMode,
      titleBn: 'লিখিত পরীক্ষার প্রশ্ন-উত্তর',
      titleEn: 'Garments Cutting Written Questions & Answers',
      desc: '১০০+ পূর্ণাঙ্গ প্রশ্ন, উত্তর, ফ্যাক্টরি স্ট্যান্ডার্ড, সূত্র এবং ভাইভা টিপস।',
      badge: `${totalQuestions} টি প্রশ্ন`,
      badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      icon: <BookOpen className="w-6 h-6 text-emerald-400" />,
      gradient: 'from-emerald-900/40 via-slate-900/60 to-slate-900/90',
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    {
      id: 'abbreviations' as AppMode,
      titleBn: 'অ্যাব্রিভিয়েশন ফ্ল্যাশকার্ড',
      titleEn: 'Garments Cutting Abbreviations & Terms',
      desc: 'কাটিং ও কিউসি বিভাগের সকল টেকনিক্যাল পূর্ণরূপ, বাংলা অর্থ ও ফ্ল্যাশকার্ড।',
      badge: `${totalAbbreviations} টি টার্ম`,
      badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      gradient: 'from-amber-900/30 via-slate-900/60 to-slate-900/90',
      border: 'border-amber-500/30 hover:border-amber-500/60',
      buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    {
      id: 'calculator' as AppMode,
      titleBn: 'কাটিং ক্যালকুলেটর ও সূত্র',
      titleEn: 'Cutting Formulas & Interactive Calculators',
      desc: 'GSM, OZ, মার্কার এফিসিয়েন্সি, স্কিউ %, শ্রিংকেজ এবং ফেব্রিক কনজাম্পশন ক্যালকুলেটর।',
      badge: '৬টি ক্যালকুলেটর',
      badgeColor: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30',
      icon: <Calculator className="w-6 h-6 text-violet-400" />,
      gradient: 'from-violet-900/30 via-slate-900/60 to-slate-900/90',
      border: 'border-violet-500/30 hover:border-violet-500/60',
      buttonBg: 'bg-violet-600 hover:bg-violet-500 text-white',
    },
    {
      id: 'research' as AppMode,
      titleBn: 'লাইভ নেট সার্চ ও সমাধান',
      titleEn: 'Live Web Search & Technical Solutions',
      desc: 'গুগল সার্চ ও এআই দিয়ে যেকোনো কাটিং প্রশ্ন, ফেব্রিক ফল্ট ও স্ট্যান্ডার্ড জানুন।',
      badge: 'অনলাইন ও অফলাইন',
      badgeColor: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      gradient: 'from-cyan-900/30 via-slate-900/60 to-slate-900/90',
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    },
    {
      id: 'voice-chat' as AppMode,
      titleBn: 'এআই ভয়েস চ্যাট ও ভাইভা কোচ',
      titleEn: 'AI Voice Chat & Mock Interview Practice',
      desc: 'মুখে বাংলায় প্রশ্ন করুন অথবা এআইকে ভাইভা পরীক্ষা নিতে বলুন, এআই মুখে উত্তর দেবে।',
      badge: 'ভয়েস ইন্টারঅ্যাকশন',
      badgeColor: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
      icon: <Bot className="w-6 h-6 text-teal-400" />,
      gradient: 'from-teal-900/30 via-slate-900/60 to-slate-900/90',
      border: 'border-teal-500/30 hover:border-teal-500/60',
      buttonBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold',
    },
    {
      id: 'settings' as AppMode,
      titleBn: 'সেটিংস ও ভয়েস কন্ট্রোল',
      titleEn: 'Voice Speed, Pitch & Theme Controls',
      desc: 'ভয়েস পড়ার গতি (Slow/Fast), পিচ, পুরুষ/নারী কণ্ঠ ও থিম মুড নির্বাচন।',
      badge: 'কন্ট্রোল',
      badgeColor: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30',
      icon: <Settings className="w-6 h-6 text-slate-400" />,
      gradient: 'from-slate-800/40 via-slate-900/60 to-slate-900/90',
      border: 'border-slate-700 hover:border-slate-500',
      buttonBg: 'bg-slate-700 hover:bg-slate-600 text-white',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0f2b48] to-slate-950 border border-slate-800 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 sm:p-8">
          <div className="flex-1 space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cutting Executive & Manager Interview Master</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
                Garments Cutting <span className="text-amber-400">Written Test</span>
              </h2>
              <p className="text-base sm:text-lg font-bold text-emerald-300 mt-1">
                গার্মেন্টস কাটিং — লিখিত পরীক্ষা ও প্রফেশনাল ভাইভা গাইড
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                যেকোনো একটি অপশন নির্বাচন করুন। প্রতিটি ফিচারে আলাদাভাবে পড়ার সুবিধা ও ব্যাক বাটন রয়েছে।
              </p>
            </div>

            {/* Quick Install / Share / Add Content buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs">
              {onOpenAddContent && (
                <button
                  onClick={() => onOpenAddContent('question')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20 active:scale-95 transition"
                >
                  <PlusCircle className="w-4 h-4 text-slate-950" />
                  <span>নতুন প্রশ্ন / অ্যাব্রেভিয়েশন যোগ করুন</span>
                </button>
              )}

              <button
                onClick={() => onSelectMode('install')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition"
              >
                <Smartphone className="w-4 h-4 text-slate-950" />
                <span>{isInstalled ? 'ইনস্টল অ্যাপ স্ট্যাটাস' : 'মোবাইল অ্যাপ ইনস্টল করুন'}</span>
              </button>

              <button
                onClick={onShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 active:scale-95 transition"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>অ্যাপ লিংক শেয়ার</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="w-full sm:w-72 lg:w-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 shrink-0 aspect-16/10 bg-slate-950">
            <img
              src="/hero-banner.jpg"
              alt="Garments Cutting Written Test Cover"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/app-icon.jpg';
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {featureCards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectMode(card.id)}
            className={`cursor-pointer group relative rounded-3xl p-5 sm:p-6 bg-gradient-to-b ${card.gradient} border ${card.border} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-md">
                  {card.icon}
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {card.titleBn}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                  {card.titleEn}
                </span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                প্রবেশ করুন
              </span>
              <button
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${card.buttonBg}`}
              >
                <span>ওপেন</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
