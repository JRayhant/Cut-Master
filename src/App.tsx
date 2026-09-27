import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  BookOpen,
  WifiOff,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowLeft,
  RotateCcw,
  PlusCircle,
} from 'lucide-react';
import { AppMode, CategoryFilter, QuestionItem, ThemeMode, VoiceSettings, Abbreviation } from './types';
import { questionsData } from './data/questionsData';
import { abbreviationsData } from './data/abbreviationsData';
import { Header } from './components/Header';
import { MenuDrawer } from './components/MenuDrawer';
import { HomeDashboard } from './components/HomeDashboard';
import { QuestionCard } from './components/QuestionCard';
import { AbbreviationFlashcards } from './components/AbbreviationFlashcards';
import { CuttingCalculator } from './components/CuttingCalculator';
import { OnlineResearchTab } from './components/OnlineResearchTab';
import { OnlineResearchModal } from './components/OnlineResearchModal';
import { VoiceChatModal } from './components/VoiceChatModal';
import { SettingsScreen } from './components/SettingsScreen';
import { InstallScreen } from './components/InstallScreen';
import { AddContentModal } from './components/AddContentModal';
import { Toast } from './components/Toast';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  // Current Feature View: default to 'home'
  const [currentMode, setCurrentMode] = useState<AppMode>(() => {
    try {
      const saved = localStorage.getItem('cutmaster_mode') as AppMode | null;
      if (
        saved &&
        ['home', 'questions', 'abbreviations', 'calculator', 'research', 'voice-chat', 'settings', 'install'].includes(
          saved
        )
      ) {
        return saved;
      }
      return 'home';
    } catch {
      return 'home';
    }
  });

  const handleSelectMode = (mode: AppMode) => {
    setCurrentMode(mode);
    try {
      localStorage.setItem('cutmaster_mode', mode);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Menu Drawer State (always accessible from corner menu button)
  const [showMenuDrawer, setShowMenuDrawer] = useState<boolean>(false);

  // 3 Theme Moods: 'light' | 'medium' | 'dark'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('theme_mood') as ThemeMode | null;
      if (saved && ['light', 'medium', 'dark'].includes(saved)) {
        return saved;
      }
      return 'dark'; // default to deep cutting blue theme
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme_mood', themeMode);
  }, [themeMode]);

  const handleCycleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'light') return 'medium';
      if (prev === 'medium') return 'dark';
      return 'light';
    });
  };

  // Voice Settings (Voice Speed, Pitch, Gender, Language, Auto-voice)
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(() => {
    try {
      const saved = localStorage.getItem('voice_settings');
      return saved
        ? JSON.parse(saved)
        : {
            autoVoice: false,
            speed: 'medium',
            gender: 'female',
            language: 'bilingual',
            volume: 1.0,
            pitch: 1.0,
          };
    } catch {
      return {
        autoVoice: false,
        speed: 'medium',
        gender: 'female',
        language: 'bilingual',
        volume: 1.0,
        pitch: 1.0,
      };
    }
  });

  const handleUpdateVoiceSettings = (newSettings: VoiceSettings) => {
    setVoiceSettings(newSettings);
    localStorage.setItem('voice_settings', JSON.stringify(newSettings));
  };

  // Online / Offline Status
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const handleCopyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('টেক্সট কপি করা হয়েছে!');
    }
  };

  // ==========================================
  // CUSTOM USER QUESTIONS & ABBREVIATIONS
  // ==========================================
  const [customQuestions, setCustomQuestions] = useState<QuestionItem[]>(() => {
    try {
      const saved = localStorage.getItem('cutmaster_custom_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customAbbreviations, setCustomAbbreviations] = useState<Abbreviation[]>(() => {
    try {
      const saved = localStorage.getItem('cutmaster_custom_abbreviations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Combined Questions in strict sequential order (অফলাইন সিস্টেমের ক্রমানুসারে)
  const allQuestions = useMemo(() => {
    const combined = [...questionsData, ...customQuestions];
    return combined.sort((a, b) => {
      const numA = parseInt(String(a.questionNumber).replace(/\D/g, ''), 10);
      const numB = parseInt(String(b.questionNumber).replace(/\D/g, ''), 10);
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }
      return a.id - b.id;
    });
  }, [customQuestions]);

  // Auto-calculated next sequential question number matching offline system (e.g. 56, 57...)
  const nextSequentialQuestionNumber = useMemo(() => {
    let maxNum = 0;
    for (const q of allQuestions) {
      const n = parseInt(String(q.questionNumber).replace(/\D/g, ''), 10);
      if (!isNaN(n) && n > maxNum) {
        maxNum = n;
      }
    }
    const next = maxNum + 1;
    return next < 10 ? `0${next}` : String(next);
  }, [allQuestions]);

  const [addQuestionCategory, setAddQuestionCategory] = useState<string>('Fabric & Basics');
  const [addQuestionTopic, setAddQuestionTopic] = useState<string>('');

  const handleAddQuestionFromItem = (fromQ: QuestionItem) => {
    setAddQuestionCategory(fromQ.category);
    setAddQuestionTopic(fromQ.tags ? fromQ.tags.join(', ') : '');
    handleOpenAddContent('question');
  };

  const allAbbreviations = useMemo(() => {
    return [...customAbbreviations, ...abbreviationsData];
  }, [customAbbreviations]);

  // Handlers for Questions
  const handleAddQuestion = (q: QuestionItem) => {
    setCustomQuestions((prev) => {
      const next = [q, ...prev];
      try {
        localStorage.setItem('cutmaster_custom_questions', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleUpdateQuestion = (q: QuestionItem) => {
    setCustomQuestions((prev) => {
      const next = prev.map((item) => (item.id === q.id ? q : item));
      try {
        localStorage.setItem('cutmaster_custom_questions', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleDeleteQuestion = (id: number) => {
    setCustomQuestions((prev) => {
      const next = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('cutmaster_custom_questions', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast('প্রশ্নটি মুছে ফেলা হয়েছে');
  };

  // Handlers for Abbreviations
  const handleAddAbbreviation = (abbr: Abbreviation) => {
    setCustomAbbreviations((prev) => {
      const next = [abbr, ...prev];
      try {
        localStorage.setItem('cutmaster_custom_abbreviations', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleUpdateAbbreviation = (abbr: Abbreviation) => {
    setCustomAbbreviations((prev) => {
      const next = prev.map((item) => (item.id === abbr.id ? abbr : item));
      try {
        localStorage.setItem('cutmaster_custom_abbreviations', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleDeleteAbbreviation = (id: string) => {
    setCustomAbbreviations((prev) => {
      const next = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('cutmaster_custom_abbreviations', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast('অ্যাব্রেভিয়েশনটি মুছে ফেলা হয়েছে');
  };

  // Add Content Modal State
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [addContentInitialTab, setAddContentInitialTab] = useState<'question' | 'abbreviation' | 'manage'>('question');

  const handleOpenAddContent = (tab: 'question' | 'abbreviation' | 'manage' = 'question') => {
    setAddContentInitialTab(tab);
    setIsAddContentOpen(true);
  };

  // Questions Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [bookmarkedOnly, setBookmarkedOnly] = useState<boolean>(false);
  const [viewLayout, setViewLayout] = useState<'single' | 'list'>('single');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('bookmarked_questions');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('বুকমার্ক থেকে সরানো হয়েছে');
      } else {
        next.add(id);
        showToast('বুকমার্কে সংরক্ষণ করা হয়েছে');
      }
      try {
        localStorage.setItem('bookmarked_questions', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // PWA Install Hook
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const handleShareApp = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: 'Cutting Interview Master',
      text: 'গার্মেন্টস কাটিং লিখিত পরীক্ষা ও ভাইভা প্রস্তুতির ১০০+ প্রশ্ন, সূত্র ও এআই কোচ!',
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('ধন্যবাদ শেয়ার করার জন্য!');
      } catch {
        handleCopyText(shareUrl);
        showToast('অ্যাপ লিংক কপি করা হয়েছে!');
      }
    } else {
      handleCopyText(shareUrl);
      showToast('অ্যাপ লিংক ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  };

  // Deep Research Modal for a single question
  const [showOnlineModal, setShowOnlineModal] = useState<boolean>(false);
  const [researchContextQuestion, setResearchContextQuestion] = useState<QuestionItem | null>(null);

  const handleOpenDeepResearch = useCallback((question: QuestionItem) => {
    setResearchContextQuestion(question);
    setShowOnlineModal(true);
  }, []);

  // Filtered Questions Memo (using allQuestions)
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Bookmark filter
      if (bookmarkedOnly && !bookmarkedIds.has(item.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitleEn = item.titleEn.toLowerCase().includes(query);
        const inTitleBn = item.titleBn.toLowerCase().includes(query);
        const inAnswerEn = item.answerEn.toLowerCase().includes(query);
        const inAnswerBn = item.answerBn.toLowerCase().includes(query);
        const inNumber = item.questionNumber.toLowerCase().includes(query);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const inFormula = item.formula ? item.formula.toLowerCase().includes(query) : false;

        return inTitleEn || inTitleBn || inAnswerEn || inAnswerBn || inNumber || inTags || inFormula;
      }
      return true;
    });
  }, [allQuestions, searchQuery, selectedCategory, bookmarkedOnly, bookmarkedIds]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    allQuestions.forEach((q) => set.add(q.category));
    return ['All', ...Array.from(set)];
  }, [allQuestions]);

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : filteredQuestions.length - 1));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev < filteredQuestions.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sticky Header with Back Button and Corner Menu */}
      <Header
        currentMode={currentMode}
        onModeChange={handleSelectMode}
        onBackToHome={() => handleSelectMode('home')}
        themeMode={themeMode}
        onCycleTheme={handleCycleTheme}
        onOpenMenu={() => setShowMenuDrawer(true)}
        isInstalled={isInstalled}
      />

      {/* Offline Status Alert */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>অফলাইন মোড সক্রিয় — আপনি ইন্টারনেট ছাড়াই সমস্ত প্রশ্ন, সূত্র ও ডেটা পড়তে পারবেন।</span>
        </div>
      )}

      {/* Single-Feature Screen Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-6 pb-20">
        {/* MODE 0: HOME DASHBOARD */}
        {currentMode === 'home' && (
          <HomeDashboard
            onSelectMode={handleSelectMode}
            totalQuestions={allQuestions.length}
            totalAbbreviations={allAbbreviations.length}
            bookmarkedCount={bookmarkedIds.size}
            isInstalled={isInstalled}
            onShare={handleShareApp}
            onCopyLink={() => {
              handleCopyText(window.location.href);
              showToast('অ্যাপ লিংক কপি করা হয়েছে!');
            }}
            onOpenAddContent={handleOpenAddContent}
            customQuestionsCount={customQuestions.length}
            customAbbreviationsCount={customAbbreviations.length}
          />
        )}

        {/* MODE 1: QUESTIONS & ANSWERS (FOCUSED SINGLE VIEW) */}
        {currentMode === 'questions' && (
          <div className="space-y-5">
            {/* Top Toolbar: Search, Filters & View Toggle */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="প্রশ্ন নম্বর, GSM, 4-Point বা কীওয়ার্ড দিয়ে খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentQuestionIndex(0);
                    }}
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold px-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* View Controls: Add Question, Single vs List & Bookmarked Only */}
                <div className="flex items-center flex-wrap gap-2">
                  {/* Add Custom Question Button */}
                  <button
                    onClick={() => handleOpenAddContent('question')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition"
                    title="আপনার নিজস্ব প্রশ্ন যোগ করুন"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>নতুন প্রশ্ন</span>
                  </button>

                  <button
                    onClick={() => {
                      setBookmarkedOnly((prev) => !prev);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                      bookmarkedOnly
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedOnly ? 'fill-current' : ''}`} />
                    <span>বুকমার্ক ({bookmarkedIds.size})</span>
                  </button>

                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                    <button
                      onClick={() => setViewLayout('single')}
                      className={`px-3 py-1 rounded-lg transition ${
                        viewLayout === 'single'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      একক ভিউ
                    </button>
                    <button
                      onClick={() => setViewLayout('list')}
                      className={`px-3 py-1 rounded-lg transition ${
                        viewLayout === 'list'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      তালিকা
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat as any);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition font-semibold ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat === 'All' ? 'সব প্রশ্ন (All)' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Counter & Pagination in Single View */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-semibold">
              <span>
                দেখাচ্ছে: <strong className="text-slate-800 dark:text-slate-200">{filteredQuestions.length}</strong> টি প্রশ্ন
                {customQuestions.length > 0 && ` (আপনার যোগ করা ${customQuestions.length}টি)`}
                {selectedCategory !== 'All' && ` · ${selectedCategory}`}
              </span>

              {viewLayout === 'single' && filteredQuestions.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono">
                    প্রশ্ন {currentQuestionIndex + 1} / {filteredQuestions.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevQuestion}
                      className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white transition"
                      title="পূর্ববর্তী প্রশ্ন"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white transition"
                      title="পরবর্তী প্রশ্ন"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Questions Content */}
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  কোনো প্রশ্ন পাওয়া যায়নি
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  আপনার সার্চ কোয়েরি বা ক্যাটাগরি ফিল্টার পরিবর্তন করুন অথবা নিজেই নতুন প্রশ্ন যুক্ত করুন।
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setBookmarkedOnly(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-300 transition"
                  >
                    ফিল্টার রিসেট
                  </button>
                  <button
                    onClick={() => handleOpenAddContent('question')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>নতুন প্রশ্ন যোগ করুন</span>
                  </button>
                </div>
              </div>
            ) : viewLayout === 'single' ? (
              /* Focused Single Question View */
              <div className="space-y-4">
                {filteredQuestions[currentQuestionIndex] && (
                  <QuestionCard
                    question={filteredQuestions[currentQuestionIndex]}
                    searchQuery={searchQuery}
                    onCopy={handleCopyText}
                    isBookmarked={bookmarkedIds.has(filteredQuestions[currentQuestionIndex].id)}
                    onToggleBookmark={toggleBookmark}
                    voiceSettings={voiceSettings}
                    isActiveQuestion={true}
                    onDeepResearch={handleOpenDeepResearch}
                    onEditQuestion={() => handleOpenAddContent('manage')}
                    onDeleteQuestion={handleDeleteQuestion}
                    onAddFollowUpQuestion={handleAddQuestionFromItem}
                  />
                )}

                {/* Bottom Navigation Buttons for Single View */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handlePrevQuestion}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>পূর্ববর্তী প্রশ্ন</span>
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition"
                  >
                    <span>পরবর্তী প্রশ্ন</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Full List Layout */
              <div className="space-y-5">
                {filteredQuestions.map((q, idx) => (
                  <div key={q.id}>
                    <QuestionCard
                      question={q}
                      searchQuery={searchQuery}
                      onCopy={handleCopyText}
                      isBookmarked={bookmarkedIds.has(q.id)}
                      onToggleBookmark={toggleBookmark}
                      voiceSettings={voiceSettings}
                      isActiveQuestion={idx === currentQuestionIndex}
                      onDeepResearch={handleOpenDeepResearch}
                      onEditQuestion={() => handleOpenAddContent('manage')}
                      onDeleteQuestion={handleDeleteQuestion}
                      onAddFollowUpQuestion={handleAddQuestionFromItem}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODE 2: ABBREVIATIONS FLASHCARDS */}
        {currentMode === 'abbreviations' && (
          <AbbreviationFlashcards
            items={allAbbreviations}
            onCopy={handleCopyText}
            onOpenAddModal={() => handleOpenAddContent('abbreviation')}
            onEditAbbreviation={() => handleOpenAddContent('manage')}
            onDeleteAbbreviation={handleDeleteAbbreviation}
          />
        )}

        {/* MODE 3: CUTTING CALCULATOR */}
        {currentMode === 'calculator' && <CuttingCalculator />}

        {/* MODE 4: LIVE ONLINE RESEARCH (Q&A) */}
        {currentMode === 'research' && (
          <OnlineResearchTab
            voiceSettings={voiceSettings}
            onCopy={handleCopyText}
            showToast={showToast}
          />
        )}

        {/* MODE 5: AI VOICE CHAT & VIVA COACH (Continuous Duplex Mode) */}
        {currentMode === 'voice-chat' && (
          <VoiceChatModal
            isOpen={true}
            inlineMode={true}
            onClose={() => handleSelectMode('home')}
            onBack={() => handleSelectMode('home')}
            voiceSettings={voiceSettings}
            onCopy={handleCopyText}
            showToast={showToast}
          />
        )}

        {/* MODE 6: SETTINGS & VOICE CONTROLS */}
        {currentMode === 'settings' && (
          <SettingsScreen
            themeMode={themeMode}
            onThemeChange={setThemeMode}
            voiceSettings={voiceSettings}
            onVoiceSettingsChange={handleUpdateVoiceSettings}
            onBack={() => handleSelectMode('home')}
          />
        )}

        {/* MODE 7: INSTALL APP WITH ICON & SHARE */}
        {currentMode === 'install' && (
          <InstallScreen
            isInstallable={isInstallable}
            isInstalled={isInstalled}
            isIOS={isIOS}
            onInstall={install}
            onShare={handleShareApp}
            onCopyLink={() => {
              handleCopyText(window.location.href);
              showToast('অ্যাপ লিংক কপি করা হয়েছে!');
            }}
            onBack={() => handleSelectMode('home')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-5 text-center text-xs text-slate-500 dark:text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Cutting Interview Master</span>
            <span>·</span>
            <span>গার্মেন্টস কাটিং লিখিত ও ভাইভা প্রস্তুতি গাইড</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <span>Created by</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200/50 dark:border-emerald-800/40">
              Jahir Rayhan
            </span>
          </div>
        </div>
      </footer>

      {/* Always-Accessible Corner Menu Drawer */}
      <MenuDrawer
        isOpen={showMenuDrawer}
        onClose={() => setShowMenuDrawer(false)}
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        themeMode={themeMode}
        onCycleTheme={handleCycleTheme}
        voiceSettings={voiceSettings}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        onInstall={install}
        onShare={handleShareApp}
        onCopyLink={() => {
          handleCopyText(window.location.href);
          showToast('অ্যাপ লিংক কপি করা হয়েছে!');
        }}
        isOnline={isOnline}
        totalQuestions={allQuestions.length}
        totalAbbreviations={allAbbreviations.length}
        onOpenAddContent={handleOpenAddContent}
        customQuestionsCount={customQuestions.length}
        customAbbreviationsCount={customAbbreviations.length}
      />

      {/* Deep Research Modal for specific question button */}
      <OnlineResearchModal
        isOpen={showOnlineModal}
        onClose={() => {
          setShowOnlineModal(false);
          setResearchContextQuestion(null);
        }}
        contextQuestion={researchContextQuestion}
        voiceSettings={voiceSettings}
        onCopy={handleCopyText}
      />

      {/* Add / Manage Custom Content Modal (Questions & Abbreviations) */}
      <AddContentModal
        isOpen={isAddContentOpen}
        onClose={() => setIsAddContentOpen(false)}
        initialTab={addContentInitialTab}
        onAddQuestion={handleAddQuestion}
        onUpdateQuestion={handleUpdateQuestion}
        onDeleteQuestion={handleDeleteQuestion}
        onAddAbbreviation={handleAddAbbreviation}
        onUpdateAbbreviation={handleUpdateAbbreviation}
        onDeleteAbbreviation={handleDeleteAbbreviation}
        customQuestions={customQuestions}
        customAbbreviations={customAbbreviations}
        showToast={showToast}
        suggestedNextNumber={nextSequentialQuestionNumber}
        initialCategory={addQuestionCategory}
        initialRelatedTopic={addQuestionTopic}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
