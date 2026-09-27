import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUp, ListFilter } from 'lucide-react';

interface FloatingNavProps {
  isVisible: boolean;
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  onScrollToTop: () => void;
  onOpenQuickJump?: () => void;
  label?: string;
  hasPrevious: boolean;
  hasNext: boolean;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  isVisible,
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  onScrollToTop,
  onOpenQuickJump,
  label = 'Item',
  hasPrevious,
  hasNext,
}) => {
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Floating page navigation"
    >
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/80 text-white">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          aria-label="Previous item"
          title="Previous (Left Arrow key)"
          className={`flex items-center justify-center w-11 h-11 rounded-xl transition ${
            hasPrevious
              ? 'bg-slate-800 text-white hover:bg-emerald-600 active:scale-95'
              : 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Status / Quick Jump Trigger */}
        <button
          onClick={onOpenQuickJump}
          title="Click to jump to any question"
          className="flex items-center gap-1.5 px-3 h-11 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition"
        >
          <ListFilter className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono tabular-nums">
            {currentIndex + 1}
            <span className="text-slate-400 font-normal"> / </span>
            {totalItems}
          </span>
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next item"
          title="Next (Right Arrow key)"
          className={`flex items-center justify-center w-11 h-11 rounded-xl transition ${
            hasNext
              ? 'bg-slate-800 text-white hover:bg-emerald-600 active:scale-95'
              : 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scroll To Top Button */}
        <button
          onClick={onScrollToTop}
          aria-label="Scroll to top"
          title="Scroll to Top"
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition active:scale-95"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
