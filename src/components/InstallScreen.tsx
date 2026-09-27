import React, { useState } from 'react';
import {
  Download,
  Share2,
  Copy,
  Check,
  CheckCircle,
  Smartphone,
  ShieldCheck,
  WifiOff,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

interface InstallScreenProps {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => void;
  onShare: () => void;
  onCopyLink: () => void;
  onBack: () => void;
}

export const InstallScreen: React.FC<InstallScreenProps> = ({
  isInstallable,
  isInstalled,
  isIOS,
  onInstall,
  onShare,
  onCopyLink,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-md shadow-emerald-500/20 bg-slate-900 shrink-0">
            <img
              src="/app-icon.jpg"
              alt="App Icon"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/icon.svg';
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              মোবাইলে অ্যাপ ইনস্টল ও শেয়ার
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              অ্যান্ড্রয়েড ও আইফোনে আসল অ্যাপের মতো হোমস্ক্রিনে ইনস্টল করার সহজ নিয়ম
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

      {/* Main Installation Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* App Presentation Badge */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/20 bg-slate-950 shrink-0">
            <img src="/app-icon.jpg" alt="Icon" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center sm:text-left space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Cutting Interview Master
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              গার্মেন্টস কাটিং লিখিত ও ভাইভা প্রস্তুতি অফিশিয়াল PWA মোবাইল অ্যাপ
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> ১০০% অফলাইন সাপোর্ট
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> নো স্টোরেজ ল্যাগ
              </span>
            </div>
          </div>
        </div>

        {/* Real App vs Shortcut Note */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5">
          <span className="font-bold flex items-center gap-1.5 text-sm">
            <Smartphone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            আসল অ্যাপের মতো ইনস্টল (Full App Installation):
          </span>
          <p className="text-[12px] leading-relaxed">
            এটি শুধু সাধারণ ওয়েব শর্টকাট নয় — অ্যাপটি আপনার ফোনের অ্যাপ ড্রয়ার এবং হোমস্ক্রিনে আসল মোবাইল অ্যাপের মতো আইকনসহ ইনস্টল হবে এবং ইন্টারনেট ছাড়াই সমস্ত লিখিত প্রশ্ন, সূত্র ও ক্যালকুলেটর এক ক্লিকে চালু হবে।
          </p>
        </div>

        {/* Android Installation Button */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              ১. অ্যান্ড্রয়েড ফোন (Google Chrome)
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Android Recommended
            </span>
          </div>

          {isInstalled ? (
            <div className="flex items-center gap-2 p-3.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-semibold">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>অ্যাপটি আপনার মোবাইলে সফলভাবে ইনস্টল করা হয়েছে!</span>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={onInstall}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition"
              >
                <Download className="w-5 h-5" />
                <span>সরাসরি অ্যাপ ইনস্টল করুন (Install App)</span>
              </button>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  ম্যানুয়াল নিয়ম (যদি উপরের বাটনে পপ-আপ না আসে):
                </span>
                <p>১. ক্রোম ব্রাউজারের উপরে ডান কোণে ৩-ডট (⋮) মেনুতে চাপ দিন।</p>
                <p>২. <strong>"Install app" (অ্যাপ ইনস্টল করুন)</strong> অপশনে চাপ দিন।</p>
                <p>৩. এরপর <strong>Install</strong> কনফার্ম করলেই ফোনের হোমস্ক্রিনে অ্যাপ চলে আসবে।</p>
              </div>
            </div>
          )}
        </div>

        {/* iPhone / iOS Guide */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
            ২. আইফোন ব্যবহারকারীদের জন্য (iOS Safari)
          </span>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p>১. Safari ব্রাউজারের নিচে থাকা <strong>Share (শেয়ার)</strong> বাটনে চাপ দিন।</p>
            <p>২. একটু নিচে স্ক্রল করে <strong>"Add to Home Screen"</strong> নির্বাচন করুন।</p>
            <p>৩. উপরে ডান কোণে <strong>Add</strong> চাপলেই আইফোনে অ্যাপ আইকন বসে যাবে।</p>
          </div>
        </div>

        {/* Direct Link Copy & Share */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
            অ্যাপ লিংক কপি ও বন্ধুদের শেয়ার করুন
          </span>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={typeof window !== 'undefined' ? window.location.href : ''}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-emerald-400" />
                  <span>কপি করুন</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onShare}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition"
          >
            <Share2 className="w-4 h-4" />
            <span>হোয়াটসঅ্যাপ বা ফেসবুকে সহকর্মীদের সাথে শেয়ার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
