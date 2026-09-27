import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Search,
  Sparkles,
  ExternalLink,
  Volume2,
  Copy,
  Check,
  X,
  Loader2,
  Mic,
  MicOff,
  BookOpen,
  ArrowRight,
  Wifi,
  WifiOff,
  RefreshCw,
} from 'lucide-react';
import { QuestionItem, VoiceSettings } from '../types';

interface OnlineResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextQuestion?: QuestionItem | null;
  voiceSettings: VoiceSettings;
  onSpeak?: (text: string) => void;
  onCopy: (text: string) => void;
  isVoiceListening?: boolean;
  onToggleVoiceCommand?: () => void;
}


interface SearchSource {
  title: string;
  url: string;
}

export const OnlineResearchModal: React.FC<OnlineResearchModalProps> = ({
  isOpen,
  onClose,
  contextQuestion,
  voiceSettings,
  onSpeak,
  onCopy,
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<SearchSource[]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceSpeechFeedback, setVoiceSpeechFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Stop recognition on unmount or close
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert('আপনার ব্রাউজারে স্পিচ রেকগনিশন সাপোর্ট পাওয়া যায়নি। গুগল ক্রোম ব্রাউজার ব্যবহার করুন।');
      return;
    }

    if (isVoiceListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsVoiceListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = voiceSettings.language === 'bn' ? 'bn-BD' : 'en-US';

      recognition.onstart = () => {
        setIsVoiceListening(true);
        setVoiceSpeechFeedback('শুনছি... আপনার প্রশ্নটি মুখে বলুন');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setQuery(transcript);
          setVoiceSpeechFeedback(`শোনা গেছে: "${transcript}"`);
        }
      };

      recognition.onerror = () => {
        setIsVoiceListening(false);
        setVoiceSpeechFeedback('ভয়েস বুঝতে সমস্যা হয়েছে, আবার চেষ্টা করুন');
      };

      recognition.onend = () => {
        setIsVoiceListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsVoiceListening(false);
    }
  };

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

  // When opened with a context question, auto trigger deep explanation
  useEffect(() => {
    if (isOpen && contextQuestion) {
      setQuery(`গার্মেন্টস কাটিং প্রশ্ন #${contextQuestion.questionNumber}: ${contextQuestion.titleEn} (${contextQuestion.titleBn}) সম্পর্কে ফ্যাক্টরি লেভেলের প্র্যাকটিক্যাল বিস্তারিত ব্যাখ্যা ও টেস্ট মেথড`);
      handleSearch(contextQuestion);
    } else if (isOpen && !contextQuestion && !answer) {
      setQuery('');
      setAnswer(null);
      setSources([]);
      setError(null);
    }
  }, [isOpen, contextQuestion]);

  const handleSearch = async (questionContext?: QuestionItem | null) => {
    const targetQuery = query.trim();
    const ctx = questionContext !== undefined ? questionContext : contextQuestion;

    if (!targetQuery && !ctx) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);
    setSources([]);
    setSearchQueries([]);

    try {
      const response = await fetch('/api/ask-online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: targetQuery,
          contextQuestion: ctx
            ? {
                questionNumber: ctx.questionNumber,
                titleEn: ctx.titleEn,
                titleBn: ctx.titleBn,
                answerEn: ctx.answerEn,
                answerBn: ctx.answerBn,
              }
            : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'সার্ভার থেকে উত্তর পাওয়া যায়নি');
      }

      const data = await response.json();
      setAnswer(data.answer);
      setSources(data.sources || []);
      setSearchQueries(data.webSearchQueries || []);

      // Auto voice read if enabled
      if (voiceSettings.autoVoice && data.answer) {
        handleSpeakText(data.answer);
      }
    } catch (err: any) {
      console.error('Online search error:', err);
      setError(err?.message || 'ইন্টারনেট থেকে ডেটা লোড করতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ চেক করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      // Clean markdown tags for clearer speech
      const cleanText = text
        .replace(/[*#`_>-]/g, '')
        .replace(/\(.*?\)/g, '')
        .substring(0, 1000); // Read first 1000 chars for concise audio

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = voiceSettings.speed === 'slow' ? 0.75 : voiceSettings.speed === 'fast' ? 1.3 : 1.0;
      utterance.pitch = voiceSettings.gender === 'female' ? 1.15 : 0.9;
      utterance.lang = voiceSettings.language === 'bn' ? 'bn-BD' : 'en-US';

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleCopyAnswer = () => {
    if (!answer) return;
    onCopy(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-colors my-auto">
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-[#0f2844] to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  নেট সার্চ ও অনলাইন প্রশ্নোত্তর (Live Net Search)
                </h3>
                {isOnline ? (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                    <Wifi className="w-3 h-3" />
                    <span>অনলাইন কানেক্টেড</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                    <WifiOff className="w-3 h-3" />
                    <span>অফলাইন</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                বাংলা বা ইংরেজিতে নতুন প্রশ্ন করুন কিংবা যে কোনো প্রশ্নের গভীর টেকনিক্যাল সমাধান জানুন
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isSpeaking) window.speechSynthesis.cancel();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row items-stretch gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="নতুন কোনো প্রশ্ন লিখুন বা মাইকে বলুন (যেমন: Auto cutter blade life, Bow and skew, 4 point system...)"
                disabled={isLoading}
                className="w-full pl-10 pr-12 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                title={isVoiceListening ? 'ভয়েস বন্ধ করুন' : 'মুখে বলে প্রশ্ন করুন (Speak Question)'}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition ${
                  isVoiceListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                    : 'text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                }`}
              >
                {isVoiceListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>নেট সার্চ হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    <span>নেট সার্চ করুন</span>
                  </>
                )}
              </button>

              {contextQuestion && (
                <button
                  type="button"
                  onClick={() => handleSearch(contextQuestion)}
                  title="পুনরায় বিস্তারিত সার্চ করুন"
                  className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Voice Listening Status Banner */}
          {isVoiceListening && (
            <div className="mt-2.5 flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="font-medium">{voiceSpeechFeedback || 'শুনছি... আপনার প্রশ্নটি মুখে বলুন'}</span>
            </div>
          )}

          {/* Sample Prompts */}
          {!answer && !isLoading && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 dark:text-slate-500 font-semibold mr-1">জনপ্রিয় টপিক:</span>
              {[
                'Auto Cutter Blade Maintenance',
                'Bow and Skew ASTM D3882 formula',
                '4 Point System inspection penalty points',
                'Fabric Shrinkage AATCC TM135 calculation',
                'SMED implementation in cutting floor',
              ].map((sample, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(sample);
                    setTimeout(() => handleSearch(), 50);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  {sample}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Loading Animation */}
          {isLoading && (
            <div className="py-16 text-center space-y-4">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                <Globe className="w-8 h-8 animate-spin text-emerald-500" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  ইন্টারনেট থেকে টেকনিক্যাল তথ্য সংগ্রহ ও অ্যানালাইসিস করা হচ্ছে...
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  গার্মেন্টস ইন্ডাস্ট্রি স্ট্যান্ডার্ড, এএসটিএম/এএটিসিসি টেস্ট মেথড ও প্র্যাকটিক্যাল গাইড সংকলন করা হচ্ছে
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !isLoading && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>সার্চ সম্পন্ন করা সম্ভব হয়নি</span>
              </div>
              <p className="text-xs">{error}</p>
              <button
                onClick={() => handleSearch()}
                className="mt-2 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          )}

          {/* Result Display */}
          {answer && !isLoading && (
            <div className="space-y-5 animate-fade-in">
              {/* Action Toolbar on Result */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    ইন্টারনেট ভেরিফাইড উত্তর (Verified Online Data)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeakText(answer)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      isSpeaking
                        ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'বন্ধ করুন' : 'ভয়েসে শুনুন'}</span>
                  </button>

                  <button
                    onClick={handleCopyAnswer}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500">কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Web Search Queries Used */}
              {searchQueries.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">ব্যবহৃত সার্চ কোয়েরি:</span>
                  {searchQueries.map((sq, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]"
                    >
                      {sq}
                    </span>
                  ))}
                </div>
              )}

              {/* Main Formatted Answer */}
              <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 font-sans space-y-3 whitespace-pre-line bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                {answer}
              </div>

              {/* Grounding Web Sources Links */}
              {sources.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ইন্টারনেট তথ্যসূত্র ও রেফারেন্স (Web Sources):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {sources.slice(0, 6).map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-xs text-slate-800 dark:text-slate-200 transition group"
                      >
                        <span className="truncate group-hover:text-emerald-500 font-medium">
                          {source.title || source.url}
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State when no query is searched yet */}
          {!answer && !isLoading && !error && (
            <div className="text-center py-10 px-4 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                যেকোনো গার্মেন্ট কাটিং টেকনিক্যাল প্রশ্ন জিজ্ঞেস করুন
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                ইন্টারনেট থেকে বিশ্বমানের গার্মেন্টস টেকনোলজি, এএসটিএম টেস্টিং স্ট্যান্ডার্ড এবং রিয়েল ফ্যাক্টরি গাইডলাইন অনুসারে বাংলা ও ইংরেজিতে স্পষ্ট উত্তর পাবেন।
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Powered by Live Google Web Search & Cutting Technical Engine</span>
          <button
            onClick={() => {
              if (isSpeaking) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold transition"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
