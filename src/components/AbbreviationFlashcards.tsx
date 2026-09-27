import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Star,
  CheckCircle2,
  Search,
  BookOpen,
  LayoutGrid,
  CreditCard,
  Copy,
  Check,
  PlusCircle,
  Edit3,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { Abbreviation } from '../types';

interface AbbreviationFlashcardsProps {
  items: Abbreviation[];
  onCopy: (text: string) => void;
  onOpenAddModal?: () => void;
  onEditAbbreviation?: (abbr: Abbreviation) => void;
  onDeleteAbbreviation?: (id: string) => void;
}

export const AbbreviationFlashcards: React.FC<AbbreviationFlashcardsProps> = ({
  items,
  onCopy,
  onOpenAddModal,
  onEditAbbreviation,
  onDeleteAbbreviation,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [memorizedIds, setMemorizedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('memorized_abbrs');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [starredIds, setStarredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('starred_abbrs');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [viewMode, setViewMode] = useState<'flashcard' | 'grid'>('flashcard');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered list
  const filteredList = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        filterCategory === 'All'
          ? true
          : filterCategory === 'Starred'
          ? starredIds.has(item.id)
          : filterCategory === 'Memorized'
          ? memorizedIds.has(item.id)
          : item.category === filterCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.fullForm.toLowerCase().includes(q) ||
        item.banglaMeaning.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [items, filterCategory, searchQuery, starredIds, memorizedIds]);

  // Reset index when filter or search changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filterCategory, searchQuery]);

  // Keep index within bounds
  const currentItem = filteredList[currentIndex] || filteredList[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'flashcard') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredList.length, viewMode]);

  const handleNext = () => {
    if (filteredList.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredList.length);
  };

  const handlePrev = () => {
    if (filteredList.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  };

  const handleShuffle = () => {
    if (filteredList.length <= 1) return;
    setIsFlipped(false);
    let randomIndex = Math.floor(Math.random() * filteredList.length);
    if (randomIndex === currentIndex && filteredList.length > 1) {
      randomIndex = (randomIndex + 1) % filteredList.length;
    }
    setCurrentIndex(randomIndex);
  };

  const toggleMemorized = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setMemorizedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('memorized_abbrs', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const toggleStarred = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('starred_abbrs', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleCopyAbbreviation = (abbr: Abbreviation, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const text = `${abbr.term} — ${abbr.fullForm}\n(${abbr.banglaMeaning})${
      abbr.context ? `\nনোট: ${abbr.context}` : ''
    }`;
    onCopy(text);
    setCopiedId(abbr.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search abbreviations / শব্দ সংক্ষেপ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Mode Switcher & Add Button */}
          <div className="flex items-center gap-2">
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>নতুন যোগ</span>
              </button>
            )}

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode('flashcard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'flashcard'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Flashcard</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All List ({filteredList.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'All', label: 'All (সব)' },
            { id: 'Cutting Section (কাটিং বিভাগ)', label: 'কাটিং বিভাগ (২৮টি)' },
            { id: 'General Quality (QC/QA)', label: 'General QC/QA (২৫টি)' },
            { id: 'Starred', label: `Starred (${starredIds.size})` },
            { id: 'Memorized', label: `Memorized (${memorizedIds.size})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                filterCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
            কোনো অ্যাব্রিভিয়েশন পাওয়া যায়নি
          </p>
          <p className="text-xs text-slate-500 mt-1">অন্য কোনো শব্দ বা ফিল্টার দিয়ে চেষ্টা করুন।</p>
        </div>
      ) : viewMode === 'flashcard' ? (
        /* Interactive Flashcard Deck View */
        <div className="max-w-xl mx-auto space-y-4">
          {/* Flashcard Header Status */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2 font-medium">
            <span className="font-mono tabular-nums">
              Card {currentIndex + 1} of {filteredList.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {memorizedIds.size} Mastered
              </span>
              <button
                onClick={handleShuffle}
                title="Shuffle cards"
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            role="button"
            tabIndex={0}
            aria-label="Click to flip card"
            className="cursor-pointer select-none group relative min-h-[340px] sm:min-h-[360px] w-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 transform active:scale-[0.99] shadow-md hover:shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-slate-200 dark:border-slate-800"
          >
            {/* Top Toolbar inside Card */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
                  {currentItem.category}
                </span>
                {currentItem.isCustom && (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-300 dark:border-amber-700">
                    <UserCheck className="w-3 h-3" />
                    <span>কাস্টম</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                {/* Custom Edit and Delete Buttons */}
                {currentItem.isCustom && onEditAbbreviation && (
                  <button
                    onClick={() => onEditAbbreviation(currentItem)}
                    title="সম্পাদনা করুন"
                    className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                {currentItem.isCustom && onDeleteAbbreviation && (
                  <button
                    onClick={() => {
                      if (window.confirm('আপনি কি এই শব্দসংক্ষেপটি মুছে ফেলতে চান?')) {
                        onDeleteAbbreviation(currentItem.id);
                      }
                    }}
                    title="মুছে ফেলুন"
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Copy Button */}
                <button
                  onClick={(e) => handleCopyAbbreviation(currentItem, e)}
                  title="Copy full form"
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  {copiedId === currentItem.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {/* Star Button */}
                <button
                  onClick={(e) => toggleStarred(currentItem.id, e)}
                  title={starredIds.has(currentItem.id) ? 'Starred' : 'Add to Starred'}
                  className="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Star
                    className={`w-4 h-4 ${
                      starredIds.has(currentItem.id)
                        ? 'fill-amber-400 text-amber-500'
                        : ''
                    }`}
                  />
                </button>

                {/* Mark as Memorized */}
                <button
                  onClick={(e) => toggleMemorized(currentItem.id, e)}
                  title={
                    memorizedIds.has(currentItem.id)
                      ? 'Marked as Memorized'
                      : 'Mark as Memorized'
                  }
                  className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl border transition ${
                    memorizedIds.has(currentItem.id)
                      ? 'bg-emerald-500 text-white border-emerald-600 font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-500'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {memorizedIds.has(currentItem.id) ? 'Mastered' : 'Memorize'}
                  </span>
                </button>
              </div>
            </div>

            {/* Card Content: Front vs Back */}
            {!isFlipped ? (
              /* FRONT: Abbreviation Question / Term */
              <div className="my-auto text-center py-6">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-mono mb-3">
                  {currentItem.term}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Question / Term (প্রশ্ন)
                </p>
                <div className="mt-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold animate-pulse">
                  <RotateCw className="w-3 h-3" />
                  <span>ক্লিক করে সম্পূর্ণ রূপ ও বাংলা অর্থ দেখুন (Tap to Reveal)</span>
                </div>
              </div>
            ) : (
              /* BACK: Full Form & Meaning */
              <div className="my-auto py-4 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Full Form (সম্পূর্ণ রূপ)
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {currentItem.fullForm}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    বাংলা অর্থ ও ব্যাখ্যা
                  </span>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-medium">
                    {currentItem.banglaMeaning}
                  </p>
                </div>

                {currentItem.context && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800/70 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-sans border border-slate-200/50 dark:border-slate-700/50">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      ইন্টারভিউ নোট:
                    </span>{' '}
                    {currentItem.context}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Card Footer: Tap to Flip indicator */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                {isFlipped ? 'Tap to see term' : 'Space / Enter to flip'}
              </span>
              <span>Use Left / Right arrow keys</span>
            </div>
          </div>

          {/* Navigation Controls: Previous / Next Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-98 transition shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>পূর্বের (Previous)</span>
            </button>

            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="px-5 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Flip Card"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-2xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 active:scale-98 transition shadow-xs"
            >
              <span>পরের (Next)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Searchable Table / Grid View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5 w-12 text-center">#</th>
                  <th className="p-3.5 w-24">সংক্ষেপ (Term)</th>
                  <th className="p-3.5">পূর্ণ রূপ (Full Form)</th>
                  <th className="p-3.5">বাংলা অর্থ ও ব্যাখ্যা</th>
                  <th className="p-3.5 w-24 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredList.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                  >
                    <td className="p-3.5 text-center font-mono text-xs text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">
                      <div className="flex items-center gap-1.5">
                        <span>{item.term}</span>
                        {item.isCustom && (
                          <span className="text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.5 rounded-md">
                            Custom
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-900 dark:text-white">
                      {item.fullForm}
                    </td>
                    <td className="p-3.5 leading-relaxed font-sans text-xs sm:text-sm">
                      {item.banglaMeaning}
                      {item.context && (
                        <span className="block mt-1 text-slate-500 dark:text-slate-400 text-xs">
                          {item.context}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {item.isCustom && onEditAbbreviation && (
                          <button
                            onClick={() => onEditAbbreviation(item)}
                            title="সম্পাদনা করুন"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {item.isCustom && onDeleteAbbreviation && (
                          <button
                            onClick={() => {
                              if (window.confirm('আপনি কি এই শব্দসংক্ষেপটি মুছে ফেলতে চান?')) {
                                onDeleteAbbreviation(item.id);
                              }
                            }}
                            title="মুছে ফেলুন"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => toggleStarred(item.id, e)}
                          title="Star"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              starredIds.has(item.id)
                                ? 'fill-amber-400 text-amber-500'
                                : ''
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => handleCopyAbbreviation(item, e)}
                          title="Copy"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
