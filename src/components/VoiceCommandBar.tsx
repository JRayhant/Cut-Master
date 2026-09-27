import React from 'react';
import { Mic, MicOff, AlertCircle, CheckCircle, Volume2, X, Command, Bot } from 'lucide-react';
import { VoiceCommandFeedback } from '../hooks/useVoiceCommander';

interface VoiceCommandBarProps {
  isListening: boolean;
  isSupported: boolean;
  feedback: VoiceCommandFeedback | null;
  onToggleListening: () => void;
  onClearFeedback: () => void;
  commandLang?: 'bn-BD' | 'en-US';
  onToggleLang?: () => void;
  onOpenVoiceChat?: () => void;
  onShowHelp?: () => void;
}

export const VoiceCommandBar: React.FC<VoiceCommandBarProps> = ({
  isListening,
  isSupported,
  feedback,
  onToggleListening,
  onClearFeedback,
  commandLang = 'bn-BD',
  onToggleLang,
  onOpenVoiceChat,
  onShowHelp,
}) => {
  if (!isSupported) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isListening
            ? 'bg-rose-500/10 border-rose-500/50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 shadow-lg shadow-rose-500/10 ring-2 ring-rose-500/30'
            : feedback?.status === 'no-match'
            ? 'bg-amber-500/10 border-amber-500/50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
            : feedback?.status === 'action-executed'
            ? 'bg-emerald-500/10 border-emerald-500/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm'
        }`}
      >
        {/* Left Side: Mic Trigger & Status Indicator */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onToggleListening}
            aria-label={isListening ? 'Stop Voice Command' : 'Start Voice Command'}
            title={isListening ? 'ক্লিক করে ভয়েস কমান্ড বন্ধ করুন' : 'ভয়েস কমান্ড চালু করুন (Voice Command)'}
            className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-5 h-5 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />
              </>
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Command className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>স্মার্ট ভয়েস কন্ট্রোল (Smart Voice Search)</span>
              </span>
              {isListening && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                  REC
                </span>
              )}
            </div>

            {/* Subtitle / Feedback line */}
            <div className="text-xs mt-0.5 truncate font-medium">
              {isListening ? (
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>কথা বলুন: যেমন "GSM", "Skew", "Next", "Calculator", "Dark mood"...</span>
                </span>
              ) : feedback ? (
                <div className="flex items-center gap-1.5">
                  {feedback.status === 'no-match' && (
                    <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{feedback.text}</span>
                    </span>
                  )}
                  {feedback.status === 'action-executed' && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{feedback.text}</span>
                    </span>
                  )}
                  {feedback.status === 'error' && (
                    <span className="text-rose-500 font-semibold">{feedback.text}</span>
                  )}
                  {feedback.transcript && (
                    <span className="text-slate-400 dark:text-slate-500 font-normal">
                      (বলা হয়েছে: "{feedback.transcript}")
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">
                  মাইকে চাপ দিয়ে বাংলায় বা ইংরেজিতে যেকোনো প্রশ্ন, টপিক বা অপশনের নাম বলুন
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Voice Chat Trigger, Language Toggle & Sample Prompts / Clear Feedback */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50 dark:border-slate-800">
          {onOpenVoiceChat && (
            <button
              onClick={onOpenVoiceChat}
              title="এআই এর সাথে সরাসরি মুখে কথা বলে চ্যাট করুন"
              className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>এআই ভয়েস চ্যাট</span>
            </button>
          )}

          {onToggleLang && (
            <button
              onClick={onToggleLang}
              title="ভয়েস ইনপুট ভাষা পরিবর্তন করুন"
              className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700 transition flex items-center gap-1"
            >
              <span className="text-[10px] uppercase tracking-wider text-slate-400">ভাষা:</span>
              <span>{commandLang === 'bn-BD' ? '🇧🇩 বাংলা' : '🇺🇸 English'}</span>
            </button>
          )}

          {feedback && (
            <button
              onClick={onClearFeedback}
              className="text-xs px-2 py-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg flex items-center gap-1 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>মুছে ফেলুন</span>
            </button>
          )}

          {/* Quick Voice Prompt Hints Pill */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-xl">
            <span className="font-semibold text-slate-600 dark:text-slate-300">কমান্ড টিপস:</span>
            <span>"Question 5", "Shrinkage", "Full form", "Next", "Light", "Dark"</span>
          </div>
        </div>
      </div>
    </div>
  );
};
