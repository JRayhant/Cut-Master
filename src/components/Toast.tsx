import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  type?: 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'success' }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/95 dark:bg-slate-100/95 text-white dark:text-slate-900 rounded-xl shadow-xl backdrop-blur-md border border-slate-700/50 dark:border-slate-300 text-sm font-medium transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-sky-400 dark:text-sky-600 shrink-0" />
      )}
      <span className="truncate max-w-[280px] sm:max-w-md">{message}</span>
      <button
        onClick={onClose}
        className="ml-1 p-0.5 text-slate-400 hover:text-white dark:hover:text-slate-900 rounded focus:outline-none"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
