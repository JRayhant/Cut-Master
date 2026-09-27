import React from 'react';
import { X, Download, Share2, Smartphone, CheckCircle, Copy, ArrowRight, ShieldCheck, WifiOff } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => void;
  onShare: () => void;
  onCopyLink: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  onInstall,
  onShare,
  onCopyLink,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-md shadow-emerald-500/20 bg-slate-900 shrink-0">
              <img
                src="/app-icon.jpg"
                alt="App Icon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                অ্যাপ ডাউনলোড ও শেয়ার করুন
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cutting Interview Master PWA (Android / iOS)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Offline & PWA Benefits */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center gap-2.5">
              <WifiOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                  ১০০% অফলাইন সুবিধা
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  ইন্টারনেট ছাড়াই চলবে
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-blue-900 dark:text-blue-200 block">
                  কোনো মেমরি চাপ নেই
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  তাত্ক্ষণিক ইনস্টল
                </span>
              </div>
            </div>
          </div>

          {/* Android Installation Button & Flow */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                অ্যান্ড্রয়েড ফোন ইনস্টলেশন (Android PWA)
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                Google Chrome
              </span>
            </div>

            {isInstalled ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>অ্যাপটি আপনার মোবাইলের হোম স্ক্রিনে ইতিমধ্যে ইনস্টল করা আছে!</span>
              </div>
            ) : isInstallable ? (
              <button
                onClick={onInstall}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 active:scale-98 transition"
              >
                <Download className="w-4 h-4" />
                <span>সরাসরি ফোনে ইনস্টল করুন (Install App)</span>
              </button>
            ) : (
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  ম্যানুয়াল ইনস্টল পদ্ধতি (৩ সেকেন্ড):
                </p>
                <ol className="list-decimal list-inside space-y-1 text-[12px] text-slate-600 dark:text-slate-400">
                  <li>ব্রাউজারের ওপরের ডানদিকের <strong>তিনটি ডট (⋮)</strong> মেন্যুতে চাপ দিন।</li>
                  <li><strong>"Add to Home screen"</strong> বা <strong>"ইনস্টল অ্যাপ"</strong> সিলেক্ট করুন।</li>
                  <li>অ্যাপ হিসেবে আপনার মোবাইলের স্ক্রিনে চলে আসবে।</li>
                </ol>
              </div>
            )}
          </div>

          {/* iOS / iPhone Section */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              আইফোন ব্যবহারকারীদের জন্য (iOS Safari)
            </span>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 text-[12px]">
              <p>১. Safari ব্রাউজারের নিচের <strong>Share বাটনে</strong> ট্যাপ করুন।</p>
              <p>২. নিচে স্ক্রোল করে <strong>"Add to Home Screen"</strong> বেছে নিন।</p>
            </div>
          </div>

          {/* Direct Link Section */}
          <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                অ্যাপের সরাসরি লিংক (Direct App Link):
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                মোবাইলে ব্রাউজারে খুলুন
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="flex-1 px-3 py-2 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 focus:outline-none select-all"
              />
              <button
                onClick={onCopyLink}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>কপি</span>
              </button>
            </div>
          </div>

          {/* Share Section */}
          <div className="space-y-3 pt-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              সহকর্মীদের সাথে শেয়ার করুন (Share App)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onShare}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-98 transition"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>হোয়াটসঅ্যাপ / মেসেঞ্জার</span>
              </button>

              <button
                onClick={onCopyLink}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-98 transition"
              >
                <Copy className="w-4 h-4 text-slate-500" />
                <span>লিংক কপি করুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            বন্ধ করুন (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
