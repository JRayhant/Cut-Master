import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Search,
  Sparkles,
  ExternalLink,
  Volume2,
  Copy,
  Check,
  Loader2,
  Mic,
  MicOff,
  BookOpen,
  Wifi,
  WifiOff,
  Lightbulb,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { VoiceSettings } from '../types';

interface OnlineResearchTabProps {
  voiceSettings: VoiceSettings;
  onCopy: (text: string) => void;
  showToast: (msg: string) => void;
  isVoiceListening?: boolean;
  onToggleVoiceCommand?: () => void;
}

interface SearchSource {
  title: string;
  url: string;
}

export const OnlineResearchTab: React.FC<OnlineResearchTabProps> = ({
  voiceSettings,
  onCopy,
  showToast,
  isVoiceListening,
  onToggleVoiceCommand,
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
  const [isSpeechListening, setIsSpeechListening] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const speechRecRef = useRef<any>(null);

  // Clean up voice on unmount
  useEffect(() => {
    return () => {
      if (speechRecRef.current) {
        try {
          speechRecRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const toggleSpeechInput = () => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      showToast('আপনার ব্রাউজারে ভয়েস রেকগনিশন সাপোর্ট নেই। গুগল ক্রোম ব্যবহার করুন।');
      return;
    }

    if (isSpeechListening) {
      if (speechRecRef.current) {
        try {
          speechRecRef.current.stop();
        } catch {}
      }
      setIsSpeechListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = voiceSettings.language === 'bn' ? 'bn-BD' : 'en-US';

      recognition.onstart = () => {
        setIsSpeechListening(true);
        setSpeechFeedback('শুনছি... আপনার প্রশ্নটি মুখে বলুন');
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setQuery(transcript);
          setSpeechFeedback(`শোনা গেছে: "${transcript}"`);
        }
      };

      recognition.onerror = () => {
        setIsSpeechListening(false);
        setSpeechFeedback('ভয়েস বুঝতে সমস্যা হয়েছে, আবার চেষ্টা করুন');
      };

      recognition.onend = () => {
        setIsSpeechListening(false);
      };

      speechRecRef.current = recognition;
      recognition.start();
    } catch {
      setIsSpeechListening(false);
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

  const handleSearch = async (customQuery?: string) => {
    const targetQuery = (customQuery || query).trim();
    if (!targetQuery) return;

    if (!navigator.onLine) {
      setError('ইন্টারনেট সংযোগ নেই। নেট সার্চের জন্য ইন্টারনেট প্রয়োজন।');
      return;
    }

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

      if (voiceSettings.autoVoice && data.answer) {
        handleSpeakText(data.answer);
      }
    } catch (err: any) {
      console.error('Online search error:', err);
      setError(err?.message || 'ইন্টারনেট থেকে ডেটা লোড করতে সমস্যা হয়েছে।');
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
      const cleanText = text
        .replace(/[*#`_>-]/g, '')
        .replace(/\(.*?\)/g, '')
        .substring(0, 1000);

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
    showToast('উত্তরটি ক্লিপবোর্ডে কপি করা হয়েছে');
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleQuestions = [
    {
      title: 'Auto Cutter Blade Maintenance',
      desc: 'অটোমেটিক কাটিং মেশিনের ব্লেড লাইফ ও মেইনটেন্যান্স রুলস',
    },
    {
      title: 'Bow and Skew ASTM D3882 calculation step by step',
      desc: 'বো এবং স্কিউ টেস্ট মেথড ও ক্যালকুলেশন ফর্মুলা',
    },
    {
      title: '4 Point System inspection penalty points and formula',
      desc: 'ফেব্রিক ইনস্পেকশনে ৪-পয়েন্ট সিস্টেম ও রোল একসেপ্টেন্স রুলস',
    },
    {
      title: 'Fabric Shrinkage AATCC TM135 pattern allowance',
      desc: 'টেস্টিং মেথড অনুযায়ী লেন্থ ও উইডথ সিঙ্কেজ প্যাটার্নে প্রয়োগ',
    },
    {
      title: 'Fabric Wastage Control & Cut Order Plan in RMG',
      desc: 'মার্কার এফিসিয়েন্সি বাড়ানো এবং এন্ড লস কমানোর উপায়',
    },
    {
      title: 'SMED (Single Minute Exchange of Die) in Garments Cutting',
      desc: 'কাটিং ফ্লোরে সেটআপ টাইম ও চেঞ্জওভার টাইম কমানোর আধুনিক পদ্ধতি',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-[#0b2542] to-slate-950 border border-slate-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>লাইভ ইন্টারনেট সার্চ ও কাটিং টেকনিক্যাল অ্যাসিস্ট্যান্ট</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              অনলাইন নেট সার্চ ও <span className="text-amber-400">স্মার্ট প্রশ্নোত্তর</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              বাংলা বা ইংরেজিতে যেকোনো গার্মেন্ট কাটিং ও আরএমজি টেকনিক্যাল প্রশ্ন করুন। লাইভ গুগল সার্চের মাধ্যমে ফ্যাক্টরি স্ট্যান্ডার্ড ও আন্তর্জাতিক টেস্ট মেথডসহ বিস্তারিত সমাধান জেনে নিন।
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
              {isOnline ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>ইন্টারনেট অ্যাক্টিভ — লাইভ সার্চ রেডি</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>ইন্টারনেট অফলাইন — নেট সংযোগ চালু করুন</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Search Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="space-y-3"
        >
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            আপনার কাটিং বা আরএমজি প্রশ্ন লিখুন বা মাইকে বলুন:
          </label>

          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="যেমন: Marker efficiency calculation, Bowing ASTM standard, Fabric defects..."
                disabled={isLoading}
                className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
              <button
                type="button"
                onClick={toggleSpeechInput}
                title={isSpeechListening ? 'ভয়েস রেকর্ডিং বন্ধ করুন' : 'মাইকে মুখে বলে প্রশ্ন করুন (Speak Question)'}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition ${
                  isSpeechListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                    : 'text-slate-400 hover:text-emerald-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isSpeechListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>সার্চ হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  <span>নেট সার্চ করুন</span>
                </>
              )}
            </button>
          </div>

          {/* Voice Listening Feedback Banner */}
          {isSpeechListening && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="font-semibold">{speechFeedback || 'শুনছি... আপনার প্রশ্নটি মুখে বলুন'}</span>
            </div>
          )}
        </form>

        {/* Quick Question Samples Grid */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>সরাসরি জানতে যেকোনো টপিকে ক্লিক করুন (Quick Topics):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {sampleQuestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(item.title);
                  handleSearch(item.title);
                }}
                disabled={isLoading}
                className="text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition group"
              >
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {item.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Box */}
      {isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <Globe className="w-8 h-8 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              ইন্টারনেট থেকে লাইভ তথ্য সংগ্রহ করা হচ্ছে...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              টেস্টিং স্ট্যান্ডার্ড, ক্যালকুলেশন মেথড এবং গার্মেন্টস ইন্ডাস্ট্রি গাইডলাইন একত্র করা হচ্ছে
            </p>
          </div>
        </div>
      )}

      {/* Error Box */}
      {error && !isLoading && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 space-y-2">
          <div className="font-bold text-sm">সমস্যা হয়েছে</div>
          <p className="text-xs">{error}</p>
          <button
            onClick={() => handleSearch()}
            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      )}

      {/* Result Display Card */}
      {answer && !isLoading && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                ইন্টারনেট সার্চ থেকে সংগৃহীত উত্তর
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeakText(answer)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  isSpeaking
                    ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking ? 'পড়া বন্ধ করুন' : 'ভয়েসে শুনুন'}</span>
              </button>

              <button
                onClick={handleCopyAnswer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition"
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

          {/* Search Queries Used */}
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

          {/* Formatted Text Content */}
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line space-y-3 font-sans">
            {answer}
          </div>

          {/* External Reference Sources */}
          {sources.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                <span>ইন্টারনেট রেফারেন্স ও তথ্যসূত্র (Live Sources):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {sources.slice(0, 6).map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-xs text-slate-800 dark:text-slate-200 transition group"
                  >
                    <span className="truncate group-hover:text-emerald-500 font-medium">
                      {src.title || src.url}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
