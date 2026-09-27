import React, { useState, useEffect } from 'react';
import { Copy, Check, Star, Volume2, VolumeX, Sparkles, BookOpen, Globe, Edit3, Trash2, UserCheck, PlusCircle } from 'lucide-react';
import { QuestionItem, VoiceSettings } from '../types';

interface QuestionCardProps {
  question: QuestionItem;
  searchQuery?: string;
  onCopy: (text: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  voiceSettings?: VoiceSettings;
  isActiveQuestion?: boolean;
  onDeepResearch?: (question: QuestionItem) => void;
  onEditQuestion?: (question: QuestionItem) => void;
  onDeleteQuestion?: (id: number) => void;
  onAddFollowUpQuestion?: (fromQuestion: QuestionItem) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  searchQuery = '',
  onCopy,
  isBookmarked,
  onToggleBookmark,
  voiceSettings,
  isActiveQuestion = false,
  onDeepResearch,
  onEditQuestion,
  onDeleteQuestion,
  onAddFollowUpQuestion,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState<'both' | 'en' | 'bn'>('both');

  const handleCopy = () => {
    const textToCopy = `Question ${question.questionNumber}: ${question.titleEn}
(${question.titleBn})

Answer (English):
${question.answerEn}

উত্তর (বাংলা):
${question.answerBn}
${question.formula ? `\nFormula: ${question.formula}` : ''}
${question.keyTakeaway ? `\nKey Takeaway: ${question.keyTakeaway}` : ''}`;

    onCopy(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare speech text according to settings
    const lang = voiceSettings?.language || 'bilingual';
    let textToSpeak = '';

    if (lang === 'en') {
      textToSpeak = `Question ${question.questionNumber}: ${question.titleEn}. Answer: ${question.answerEn}`;
    } else if (lang === 'bn') {
      textToSpeak = `প্রশ্ন নম্বর ${question.questionNumber}: ${question.titleBn}। উত্তর: ${question.answerBn}`;
    } else {
      textToSpeak = `Question ${question.questionNumber}: ${question.titleEn}. ${question.answerEn}. বাংলা সারসংক্ষেপ: ${question.titleBn}। ${question.keyTakeaway || question.answerBn.slice(0, 300)}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Speed setting
    if (voiceSettings?.speed === 'slow') {
      utterance.rate = 0.75;
    } else if (voiceSettings?.speed === 'fast') {
      utterance.rate = 1.3;
    } else {
      utterance.rate = 1.0;
    }

    // High clarity & loud volume
    utterance.volume = 1.0;

    // Pitch & Voice gender matching
    const isFemale = voiceSettings?.gender === 'female';
    const isMale = voiceSettings?.gender === 'male';
    utterance.pitch = isFemale ? 1.15 : isMale ? 0.9 : 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const preferred = voices.find((v) => {
        const name = v.name.toLowerCase();
        if (lang === 'bn' && v.lang.startsWith('bn')) return true;
        if (isFemale && (name.includes('female') || name.includes('samantha') || name.includes('zira') || name.includes('karen') || name.includes('natural'))) {
          return true;
        }
        if (isMale && (name.includes('male') || name.includes('david') || name.includes('george') || name.includes('mark'))) {
          return true;
        }
        return false;
      });

      if (preferred) {
        utterance.voice = preferred;
      }
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Auto Voice feature: triggered when question becomes active in single view
  useEffect(() => {
    if (isActiveQuestion && voiceSettings?.autoVoice) {
      const timer = setTimeout(() => {
        handleSpeech();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isActiveQuestion, question.id, voiceSettings?.autoVoice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSpeaking && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);

  // Helper for keyword highlight
  const highlightText = (text: string) => {
    if (!searchQuery || searchQuery.trim().length < 2) return text;
    const parts = text.split(new RegExp(`(${searchQuery.trim()})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.trim().toLowerCase() ? (
            <mark key={i} className="bg-amber-300 dark:bg-amber-500/40 text-slate-900 dark:text-amber-100 rounded px-1 py-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Top Card Kicker: Question Number + Category + Actions */}
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5 tracking-wide">
              <span className="font-mono bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/50">
                Q.{question.questionNumber}
              </span>
              {question.isCustom && (
                <span className="bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  <span>কাস্টম প্রশ্ন</span>
                </span>
              )}
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">{question.category}</span>
            </div>

            {/* English Title */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
              {highlightText(question.titleEn)}
            </h2>

            {/* Bengali Title */}
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed font-sans">
              {highlightText(question.titleBn)}
            </p>
          </div>

          {/* Action Buttons: Edit, Delete, Deep Research, Bookmark, Listen, Copy */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Custom Question Edit/Delete Buttons */}
            {question.isCustom && onEditQuestion && (
              <button
                onClick={() => onEditQuestion(question)}
                title="প্রশ্নটি সম্পাদনা করুন"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            {question.isCustom && onDeleteQuestion && (
              <button
                onClick={() => {
                  if (window.confirm('আপনি কি এই প্রশ্নটি মুছে ফেলতে চান?')) {
                    onDeleteQuestion(question.id);
                  }
                }}
                title="প্রশ্নটি মুছে ফেলুন"
                className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            {/* Deep Research Online Button */}
            {onDeepResearch && (
              <button
                onClick={() => onDeepResearch(question)}
                title="নেট সার্চ করে এই প্রশ্নের বিস্তারিত ও প্র্যাকটিক্যাল ব্যাখ্যা দেখুন"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-xs font-semibold shadow-xs transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden md:inline">নেট সার্চে বিস্তারিত</span>
                <span className="md:hidden">নেট সার্চ</span>
              </button>
            )}

            {/* Listen / TTS Button */}
            {'speechSynthesis' in window && (
              <button
                onClick={handleSpeech}
                aria-label={isSpeaking ? 'Stop reading' : 'Read aloud in English'}
                title={isSpeaking ? 'Stop speech' : 'Listen to English question'}
                className={`p-2 rounded-xl border transition ${
                  isSpeaking
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}

            {/* Bookmark Button */}
            <button
              onClick={() => onToggleBookmark(question.id)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
              title={isBookmarked ? 'Bookmarked' : 'Add to Starred'}
              className={`p-2 rounded-xl border transition ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-500 border-amber-300 dark:border-amber-700'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              aria-label="Copy Question and Answer"
              title="Copy Q&A to clipboard"
              className="p-2 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-emerald-600 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Language View Filter Tabs (Segmented Button Group) */}
        <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 dark:bg-slate-800/80 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveLangTab('both')}
              className={`px-2.5 py-1 rounded-md transition ${
                activeLangTab === 'both'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Both / উভয়
            </button>
            <button
              onClick={() => setActiveLangTab('en')}
              className={`px-2.5 py-1 rounded-md transition ${
                activeLangTab === 'en'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveLangTab('bn')}
              className={`px-2.5 py-1 rounded-md transition ${
                activeLangTab === 'bn'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              বাংলা
            </button>
          </div>

          {question.formula && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Formula</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body: Answers & Tables */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Formula Box if Available */}
        {question.formula && (
          <div className="p-3.5 rounded-xl bg-slate-950 dark:bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs sm:text-sm tracking-wide shadow-inner overflow-x-auto">
            <div className="text-[11px] font-sans font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Standard Formula / সূত্র:
            </div>
            <div className="tabular-nums">{question.formula}</div>
          </div>
        )}

        {/* Content Columns / View */}
        <div className={`grid gap-6 ${activeLangTab === 'both' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* English Answer */}
          {(activeLangTab === 'both' || activeLangTab === 'en') && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>English Explanation</span>
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {highlightText(question.answerEn)}
              </div>
            </div>
          )}

          {/* Bengali Answer */}
          {(activeLangTab === 'both' || activeLangTab === 'bn') && (
            <div className="space-y-2 lg:border-l lg:border-slate-100 dark:lg:border-slate-800/80 lg:pl-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>বাংলা ব্যাখ্যা ও উত্তর</span>
              </div>
              <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {highlightText(question.answerBn)}
              </div>
            </div>
          )}
        </div>

        {/* Table Data if Applicable (e.g. 4-point penalty, relaxation time, defects list, ratio table) */}
        {question.tableData && (
          <div className="pt-2">
            {question.tableData.caption && (
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                {question.tableData.caption}
              </p>
            )}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {question.tableData.headers.map((hdr, idx) => (
                      <th key={idx} className="p-3 whitespace-nowrap">
                        {hdr}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {question.tableData.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={rowIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/40'}
                    >
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="p-3 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Key Takeaway Banner */}
        {question.keyTakeaway && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-700 dark:text-emerald-300">মূল পয়েন্ট (Interview Tip): </span>
              {question.keyTakeaway}
            </div>
          </div>
        )}

        {/* Bottom Actions Row: Add Follow-up Question from this question & Tags */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          {onAddFollowUpQuestion && (
            <button
              onClick={() => onAddFollowUpQuestion(question)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-500/30 font-semibold shadow-2xs transition"
              title="এই প্রশ্ন থেকে অফলাইন ক্রমানুসারে নতুন লিখিত প্রশ্ন যোগ করুন"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>এই বিষয় থেকে নতুন প্রশ্ন যোগ</span>
            </button>
          )}

          {/* Clean Unboxed Tags (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <span className="font-medium text-slate-500 dark:text-slate-400">টপিক:</span>
            {question.tags.map((tag, idx) => (
              <React.Fragment key={idx}>
                <span>#{tag}</span>
                {idx < question.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
