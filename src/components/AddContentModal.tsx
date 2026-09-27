import React, { useState, useEffect } from 'react';
import {
  X,
  PlusCircle,
  BookOpen,
  Layers,
  Save,
  Check,
  Trash2,
  Edit3,
  Download,
  Upload,
  Sparkles,
  HelpCircle,
  Tag,
  Calculator,
  ArrowRight,
  Eye,
  FileText,
} from 'lucide-react';
import { QuestionItem, Abbreviation } from '../types';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'question' | 'abbreviation' | 'manage';
  onAddQuestion: (question: QuestionItem) => void;
  onUpdateQuestion: (question: QuestionItem) => void;
  onDeleteQuestion: (id: number) => void;
  onAddAbbreviation: (abbr: Abbreviation) => void;
  onUpdateAbbreviation: (abbr: Abbreviation) => void;
  onDeleteAbbreviation: (id: string) => void;
  customQuestions: QuestionItem[];
  customAbbreviations: Abbreviation[];
  showToast: (msg: string) => void;
  suggestedNextNumber?: string;
  initialCategory?: string;
  initialRelatedTopic?: string;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'question',
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddAbbreviation,
  onUpdateAbbreviation,
  onDeleteAbbreviation,
  customQuestions,
  customAbbreviations,
  showToast,
  suggestedNextNumber = '56',
  initialCategory = 'Fabric & Basics',
  initialRelatedTopic = '',
}) => {
  const [activeTab, setActiveTab] = useState<'question' | 'abbreviation' | 'manage'>(initialTab);

  // Editing state
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [editingAbbrId, setEditingAbbrId] = useState<string | null>(null);

  // Question Form State (pre-filled with offline sequential number)
  const [qNumber, setQNumber] = useState(suggestedNextNumber);
  const [qTitleBn, setQTitleBn] = useState('');
  const [qTitleEn, setQTitleEn] = useState('');
  const [qAnswerBn, setQAnswerBn] = useState('');
  const [qAnswerEn, setQAnswerEn] = useState('');
  const [qCategory, setQCategory] = useState<string>(initialCategory);
  const [qCustomCategory, setQCustomCategory] = useState('');
  const [qFormula, setQFormula] = useState('');
  const [qKeyTakeaway, setQKeyTakeaway] = useState('');
  const [qTags, setQTags] = useState(initialRelatedTopic);
  const [showQuestionPreview, setShowQuestionPreview] = useState(false);

  // Synchronize when opened or suggested props change
  useEffect(() => {
    if (isOpen && editingQuestionId === null) {
      setActiveTab(initialTab);
      setQNumber(suggestedNextNumber);
      if (initialCategory) setQCategory(initialCategory);
      if (initialRelatedTopic) setQTags(initialRelatedTopic);
    }
  }, [isOpen, initialTab, suggestedNextNumber, initialCategory, initialRelatedTopic, editingQuestionId]);

  // Abbreviation Form State
  const [abbrTerm, setAbbrTerm] = useState('');
  const [abbrFullForm, setAbbrFullForm] = useState('');
  const [abbrMeaningBn, setAbbrMeaningBn] = useState('');
  const [abbrCategory, setAbbrCategory] = useState<string>('Cutting Section (কাটিং বিভাগ)');
  const [abbrCustomCategory, setAbbrCustomCategory] = useState('');
  const [abbrContext, setAbbrContext] = useState('');
  const [showAbbrPreview, setShowAbbrPreview] = useState(false);

  // Standard category lists
  const standardQuestionCategories = [
    'Fabric & Basics',
    'RMG & Bangladesh Economy',
    'Consumption & Math',
    'Quality & 4-Point System',
    'Ratio & Lay Planning',
    'Fabric Challenges & Denim/Knit',
    'Cutting Workflow & SOP',
    'Safety, PPE & 5S',
    'Management, KPIs & SMED',
    'Marker & Fusing',
    'Skew, Bow, Spirality & Shrinkage',
    'অন্যান্য (Custom)',
  ];

  const standardAbbrCategories = [
    'Cutting Section (কাটিং বিভাগ)',
    'General Quality (QC/QA)',
    'Merchandising & Sourcing',
    'Production & IE',
    'অন্যান্য (Custom)',
  ];

  // Handle Question Submission
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTitleBn.trim() || !qAnswerBn.trim()) {
      showToast('দয়া করে প্রশ্নের শিরোনাম ও বাংলা উত্তর প্রদান করুন!');
      return;
    }

    const finalCategory =
      qCategory === 'অন্যান্য (Custom)'
        ? qCustomCategory.trim() || 'Custom Cutting Topic'
        : qCategory;

    const tagsArray = qTags
      ? qTags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
      : ['custom', finalCategory.toLowerCase()];

    if (editingQuestionId !== null) {
      // Update
      const updated: QuestionItem = {
        id: editingQuestionId,
        questionNumber: qNumber.trim() || `C-${editingQuestionId}`,
        titleBn: qTitleBn.trim(),
        titleEn: qTitleEn.trim() || qTitleBn.trim(),
        answerBn: qAnswerBn.trim(),
        answerEn: qAnswerEn.trim() || qAnswerBn.trim(),
        category: finalCategory,
        formula: qFormula.trim() || undefined,
        keyTakeaway: qKeyTakeaway.trim() || undefined,
        tags: tagsArray,
        isCustom: true,
      };
      onUpdateQuestion(updated);
      showToast('প্রশ্নটি সফলভাবে আপডেট করা হয়েছে!');
      setEditingQuestionId(null);
    } else {
      // Create new with offline sequential question numbering
      const resolvedNumber = qNumber.trim() || suggestedNextNumber || String(55 + customQuestions.length + 1);
      const parsedNum = parseInt(resolvedNumber.replace(/\D/g, ''), 10);
      const newId = !isNaN(parsedNum) ? parsedNum * 1000 + (customQuestions.length + 1) : Date.now();

      const newQuestion: QuestionItem = {
        id: newId,
        questionNumber: resolvedNumber,
        titleBn: qTitleBn.trim(),
        titleEn: qTitleEn.trim() || qTitleBn.trim(),
        answerBn: qAnswerBn.trim(),
        answerEn: qAnswerEn.trim() || qAnswerBn.trim(),
        category: finalCategory,
        formula: qFormula.trim() || undefined,
        keyTakeaway: qKeyTakeaway.trim() || undefined,
        tags: tagsArray,
        isCustom: true,
        createdAt: new Date().toISOString(),
      };
      onAddQuestion(newQuestion);
      showToast(`প্রশ্ন ${resolvedNumber} অফলাইন ক্রমানুসারে যুক্ত হয়েছে!`);
    }

    // Reset Form
    resetQuestionForm();
  };

  const resetQuestionForm = () => {
    setQNumber(suggestedNextNumber);
    setQTitleBn('');
    setQTitleEn('');
    setQAnswerBn('');
    setQAnswerEn('');
    setQFormula('');
    setQKeyTakeaway('');
    setQTags(initialRelatedTopic);
    setEditingQuestionId(null);
  };

  const startEditQuestion = (q: QuestionItem) => {
    setEditingQuestionId(q.id);
    setQNumber(q.questionNumber);
    setQTitleBn(q.titleBn);
    setQTitleEn(q.titleEn);
    setQAnswerBn(q.answerBn);
    setQAnswerEn(q.answerEn);
    if (standardQuestionCategories.includes(q.category)) {
      setQCategory(q.category);
    } else {
      setQCategory('অন্যান্য (Custom)');
      setQCustomCategory(q.category);
    }
    setQFormula(q.formula || '');
    setQKeyTakeaway(q.keyTakeaway || '');
    setQTags(q.tags ? q.tags.join(', ') : '');
    setActiveTab('question');
  };

  // Handle Abbreviation Submission
  const handleSaveAbbreviation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abbrTerm.trim() || !abbrFullForm.trim() || !abbrMeaningBn.trim()) {
      showToast('দয়া করে শব্দসংক্ষেপ, পূর্ণরূপ ও বাংলা অর্থ প্রদান করুন!');
      return;
    }

    const finalCategory =
      abbrCategory === 'অন্যান্য (Custom)'
        ? abbrCustomCategory.trim() || 'Custom Abbreviation'
        : abbrCategory;

    if (editingAbbrId !== null) {
      // Update
      const updated: Abbreviation = {
        id: editingAbbrId,
        term: abbrTerm.trim().toUpperCase(),
        fullForm: abbrFullForm.trim(),
        banglaMeaning: abbrMeaningBn.trim(),
        category: finalCategory,
        context: abbrContext.trim() || undefined,
        isCustom: true,
      };
      onUpdateAbbreviation(updated);
      showToast('অ্যাব্রেভিয়েশন আপডেট সম্পন্ন হয়েছে!');
      setEditingAbbrId(null);
    } else {
      // Create new
      const newId = `custom_abbr_${Date.now()}`;
      const newAbbr: Abbreviation = {
        id: newId,
        term: abbrTerm.trim().toUpperCase(),
        fullForm: abbrFullForm.trim(),
        banglaMeaning: abbrMeaningBn.trim(),
        category: finalCategory,
        context: abbrContext.trim() || undefined,
        isCustom: true,
        createdAt: new Date().toISOString(),
      };
      onAddAbbreviation(newAbbr);
      showToast('নতুন অ্যাব্রেভিয়েশন যুক্ত হয়েছে!');
    }

    resetAbbrForm();
  };

  const resetAbbrForm = () => {
    setAbbrTerm('');
    setAbbrFullForm('');
    setAbbrMeaningBn('');
    setAbbrContext('');
    setEditingAbbrId(null);
  };

  const startEditAbbr = (abbr: Abbreviation) => {
    setEditingAbbrId(abbr.id);
    setAbbrTerm(abbr.term);
    setAbbrFullForm(abbr.fullForm);
    setAbbrMeaningBn(abbr.banglaMeaning);
    if (standardAbbrCategories.includes(abbr.category)) {
      setAbbrCategory(abbr.category);
    } else {
      setAbbrCategory('অন্যান্য (Custom)');
      setAbbrCustomCategory(abbr.category);
    }
    setAbbrContext(abbr.context || '');
    setActiveTab('abbreviation');
  };

  // Add Bonus Ready-Made Pack
  const handleLoadBonusPack = () => {
    const bonusQuestions: QuestionItem[] = [
      {
        id: Date.now() + 101,
        questionNumber: `B-${customQuestions.length + 1}`,
        titleBn: 'ফ্যাব্রিকে বোয়িং (Bowing) এবং স্কিউনেস (Skewness) কীভাবে পরীক্ষা করা হয়?',
        titleEn: 'How to test and calculate Fabric Bowing and Skewness (ASTM D3882)?',
        answerBn:
          'ফ্যাব্রিকের উইফ্ট বা ফিলিং সুতা যদি সোজা না থেকে ধণুকের মতো বেঁকে যায় তাকে Bowing বলে। আর সুতা তির্যকভাবে বাঁকা হয়ে কোণাকুণি চলে গেলে তাকে Skewness বা Torquing বলে। ASTM D3882 মেথড অনুযায়ী ফ্যাব্রিকের প্রান্ত বরাবর লম্ব দাগ টেনে সর্বোচ্চ বিচ্যুতি ইঞ্চি এককে মেপে শতকরা হার হিসাব করা হয়। নিট ও টুইল ফ্যাব্রিকে ৩% এর বেশি স্কিউনেস হলে কাটিংয়ে সমস্যা সৃষ্টি হয়।',
        answerEn:
          'Bowing is a distortion in fabric where weft or filling yarns lie in an arched curve. Skewness is an angular displacement where filling yarns are not perpendicular to warp yarns. Measured per ASTM D3882 standard using Bowing % = (Maximum Bow / Fabric Width) * 100.',
        category: 'Skew, Bow, Spirality & Shrinkage',
        formula: 'Bowing % = (Maximum Arc Deflection / Usable Width) × 100',
        keyTakeaway: 'টুইল ও নিট কাপড়ে ৩% বা ৪% এর বেশি স্কিউনেস থাকলে পার্টস টুইস্টিং হয়ে যাবে।',
        tags: ['bowing', 'skewness', 'astm d3882', 'spirality', 'fabric testing'],
        isCustom: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 102,
        questionNumber: `B-${customQuestions.length + 2}`,
        titleBn: 'কাটিং রুমে ফ্যাব্রিক প্লাই বা লে হাইট (Ply Height) কীভাবে নির্ধারণ করবেন?',
        titleEn: 'How to determine Fabric Lay Height / Ply Count in Cutting Room?',
        answerBn:
          'লে হাইট নির্ভর করে ফ্যাব্রিকের ধরন, জিএসএম, নাইফ ব্লেডের উচ্চতা এবং অটোমেটিক কাটার ক্যাপাসিটির ওপর। ডেনিম ও মোটা কাপড়ে সাধারণত ৫০ থেকে ৮০ প্লাই, সিঙ্গেল জার্সি নিটে ১০০ থেকে ১২০ প্লাই এবং ফাইন ওভেন কাপড়ে ১৫০ থেকে ২৫০ প্লাই পর্যন্ত লে দেওয়া যায়। বেশি উঁচু লে দিলে ওপরের পার্টসের সাথে নিচের পার্টসের মাপে ব্যবধান (Layer variation/Knife deflection) দেখা দিতে পারে।',
        answerEn:
          'Lay height depends on fabric type, thickness/GSM, cutting machine knife capacity, and vacuum compression. Standard plies: Denim 50-80 plies, Knit Single Jersey 100-120 plies, Lightweight woven up to 200 plies.',
        category: 'Ratio & Lay Planning',
        formula: 'Max Plies = (Knife Height - 1.5 inch clearance) ÷ Single Ply Thickness',
        keyTakeaway: 'লে বেশি উঁচু হলে নাইফ ডিফ্লেকশন ও প্যাটার্ন ডিফেক্ট দেখা দেয়।',
        tags: ['lay height', 'ply count', 'knife deflection', 'cutting table'],
        isCustom: true,
        createdAt: new Date().toISOString(),
      },
    ];

    const bonusAbbrs: Abbreviation[] = [
      {
        id: `bonus_${Date.now()}_1`,
        term: 'SAM',
        fullForm: 'Standard Allowed Minute',
        banglaMeaning:
          'একটি নির্দিষ্ট অপারেশন সম্পন্ন করতে একজন যোগ্যতাসম্পন্ন অপারেটরের নির্ধারিত স্ট্যান্ডার্ড কাজের সময় (মিনিটে)।',
        category: 'Cutting Section (কাটিং বিভাগ)',
        context: 'কাটিং ও সুইং লাইনের ক্যাপাসিটি এবং কস্টিং নির্ধারণে অপরিহার্য।',
        isCustom: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: `bonus_${Date.now()}_2`,
        term: 'DHU',
        fullForm: 'Defect per Hundred Units',
        banglaMeaning:
          '১০০ পিস পোশাক বা কাটিং পার্টসে মোট কতটি ত্রুটি পাওয়া গেছে তার সংখ্যা। (মোট ডিফেক্ট / মোট চেক সংখ্যা) × ১০০।',
        category: 'General Quality (QC/QA)',
        context: 'কাটিং কোয়ালিটি অডিটে DHU ৩% এর নিচে রাখার লক্ষ্য থাকে।',
        isCustom: true,
        createdAt: new Date().toISOString(),
      },
    ];

    bonusQuestions.forEach((q) => onAddQuestion(q));
    bonusAbbrs.forEach((a) => onAddAbbreviation(a));
    showToast('২টি বোনাস প্রশ্ন ও ২টি অ্যাব্রেভিয়েশন সফলভাবে যুক্ত হয়েছে!');
  };

  // Export custom data to JSON
  const handleExportJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      customQuestions,
      customAbbreviations,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cutmaster-custom-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('আপনার কাস্টম ডেটা JSON ফাইল হিসেবে ডাউনলোড হয়েছে!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                নতুন প্রশ্ন ও অ্যাব্রেভিয়েশন যোগ করুন
              </h3>
              <p className="text-xs text-slate-300">
                আপনার প্রয়োজনীয় ভাইভা প্রশ্ন বা শব্দসংক্ষেপ যুক্ত করুন এবং নিয়মিত অনুশীলন করুন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 pt-2 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('question')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'question'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{editingQuestionId ? 'প্রশ্ন সম্পাদনা' : 'নতুন প্রশ্ন যোগ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('abbreviation')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'abbreviation'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{editingAbbrId ? 'অ্যাব্রেভিয়েশন সম্পাদনা' : 'নতুন অ্যাব্রেভিয়েশন যোগ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition ml-auto ${
              activeTab === 'manage'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>
              আমার তালিকা ({customQuestions.length + customAbbreviations.length})
            </span>
          </button>
        </div>

        {/* Tab 1: ADD / EDIT QUESTION */}
        {activeTab === 'question' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    প্রশ্ন নম্বর (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={qNumber}
                    onChange={(e) => setQNumber(e.target.value)}
                    placeholder="যেমন: C-101"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={qCategory}
                    onChange={(e) => setQCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {standardQuestionCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {qCategory === 'অন্যান্য (Custom)' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    কাস্টম ক্যাটাগরির নাম লিখুন *
                  </label>
                  <input
                    type="text"
                    value={qCustomCategory}
                    onChange={(e) => setQCustomCategory(e.target.value)}
                    placeholder="যেমন: CAD Cutting Software or Fusing Process"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              )}

              {/* Title Bengali */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  প্রশ্নের শিরোনাম (বাংলায়) *
                </label>
                <input
                  type="text"
                  required
                  value={qTitleBn}
                  onChange={(e) => setQTitleBn(e.target.value)}
                  placeholder="যেমন: ফ্যাব্রিক স্প্রেডিং কাকে বলে এবং এর প্রধান উদ্দেশ্য কী?"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                />
              </div>

              {/* Title English */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Question Title (in English) (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={qTitleEn}
                  onChange={(e) => setQTitleEn(e.target.value)}
                  placeholder="e.g.: What is fabric spreading and what is its main objective?"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                />
              </div>

              {/* Answer Bengali */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বিস্তারিত উত্তর (বাংলায়) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={qAnswerBn}
                  onChange={(e) => setQAnswerBn(e.target.value)}
                  placeholder="প্রশ্নের বিস্তারিত ও প্রাতিষ্ঠানিক উত্তর লিখুন..."
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                />
              </div>

              {/* Answer English */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Answer (in English) (ঐচ্ছিক)
                </label>
                <textarea
                  rows={3}
                  value={qAnswerEn}
                  onChange={(e) => setQAnswerEn(e.target.value)}
                  placeholder="Enter standard technical answer in English..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                />
              </div>

              {/* Formula & Key Takeaway */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5 text-emerald-500" />
                    <span>সূত্র বা হিসাব (ঐচ্ছিক)</span>
                  </label>
                  <input
                    type="text"
                    value={qFormula}
                    onChange={(e) => setQFormula(e.target.value)}
                    placeholder="যেমন: Spreading Loss % = (Wastage / Total) * 100"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>ভাইভা কি-পয়েন্ট (ঐচ্ছিক)</span>
                  </label>
                  <input
                    type="text"
                    value={qKeyTakeaway}
                    onChange={(e) => setQKeyTakeaway(e.target.value)}
                    placeholder="যেমন: স্প্রেডিংয়ের সময় প্লাই টেনশন শূন্য রাখতে হয়"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>ট্যাগ (কমা দিয়ে লিখুন)</span>
                </label>
                <input
                  type="text"
                  value={qTags}
                  onChange={(e) => setQTags(e.target.value)}
                  placeholder="যেমন: spreading, lay, wastage, cutting room"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowQuestionPreview((prev) => !prev)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showQuestionPreview ? 'প্রিভিউ বন্ধ' : 'কার্ড প্রিভিউ দেখুন'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {editingQuestionId && (
                    <button
                      type="button"
                      onClick={resetQuestionForm}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      বাতিল
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingQuestionId ? 'প্রশ্ন আপডেট করুন' : 'প্রশ্ন সংরক্ষণ করুন'}</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Live Preview of Question Card */}
            {showQuestionPreview && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                    PREVIEW CARD
                  </span>
                  <span className="text-xs text-slate-500">{qCategory}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {qTitleBn || 'প্রশ্নের শিরোনাম এখানে প্রদর্শিত হবে'}
                </h4>
                {qTitleEn && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">{qTitleEn}</p>
                )}
                <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  {qAnswerBn || 'বিস্তারিত উত্তর এখানে দেখা যাবে...'}
                </div>
                {qFormula && (
                  <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                    Formula: {qFormula}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: ADD / EDIT ABBREVIATION */}
        {activeTab === 'abbreviation' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            <form onSubmit={handleSaveAbbreviation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শব্দসংক্ষেপ (Term) *
                  </label>
                  <input
                    type="text"
                    required
                    value={abbrTerm}
                    onChange={(e) => setAbbrTerm(e.target.value)}
                    placeholder="যেমন: CAD, SAM, FOB"
                    className="w-full px-3 py-2 text-xs sm:text-sm uppercase font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none tracking-wider"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={abbrCategory}
                    onChange={(e) => setAbbrCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {standardAbbrCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {abbrCategory === 'অন্যান্য (Custom)' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    কাস্টম ক্যাটাগরি *
                  </label>
                  <input
                    type="text"
                    value={abbrCustomCategory}
                    onChange={(e) => setAbbrCustomCategory(e.target.value)}
                    placeholder="যেমন: Textile Testing Standards"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              )}

              {/* Full Form */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  পূর্ণরূপ (Full Form in English) *
                </label>
                <input
                  type="text"
                  required
                  value={abbrFullForm}
                  onChange={(e) => setAbbrFullForm(e.target.value)}
                  placeholder="যেমন: Computer Aided Design / Standard Allowed Minute"
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-emerald-600 dark:text-emerald-400"
                />
              </div>

              {/* Bengali Meaning */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  বাংলা অর্থ ও সহজ ব্যাখ্যা *
                </label>
                <textarea
                  required
                  rows={3}
                  value={abbrMeaningBn}
                  onChange={(e) => setAbbrMeaningBn(e.target.value)}
                  placeholder="গার্মেন্টস কাটিং বা ফ্যাক্টরি প্রেক্ষাপটে এর সহজ বাংলা অর্থ লিখুন..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                />
              </div>

              {/* Context / Interview Tip */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>ভাইভা টিপস বা কাজের ব্যবহার (ঐচ্ছিক)</span>
                </label>
                <input
                  type="text"
                  value={abbrContext}
                  onChange={(e) => setAbbrContext(e.target.value)}
                  placeholder="যেমন: কাটিং মার্কার তৈরি এবং অটো কাটার চালানোর জন্য ব্যবহৃত হয়"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAbbrPreview((prev) => !prev)}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showAbbrPreview ? 'প্রিভিউ বন্ধ' : 'ফ্ল্যাশকার্ড প্রিভিউ'}</span>
                </button>

                <div className="flex items-center gap-2">
                  {editingAbbrId && (
                    <button
                      type="button"
                      onClick={resetAbbrForm}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      বাতিল
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingAbbrId ? 'অ্যাব্রেভিয়েশন আপডেট' : 'অ্যাব্রেভিয়েশন সংরক্ষণ'}</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Live Preview of Abbreviation Flashcard */}
            {showAbbrPreview && (
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-900 to-[#0e2a47] text-white border border-slate-700 space-y-2 mt-4 text-center">
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">
                  {abbrCategory} · FLASHCARD PREVIEW
                </span>
                <h3 className="text-3xl font-extrabold text-white tracking-wider">
                  {abbrTerm || 'TERM'}
                </h3>
                <p className="text-sm font-semibold text-emerald-300">
                  {abbrFullForm || 'Full Form in English'}
                </p>
                <div className="text-xs text-slate-200 pt-2 border-t border-slate-700/60">
                  {abbrMeaningBn || 'বাংলা অর্থ ও ব্যাখ্যা'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: MANAGE MY ADDED ITEMS */}
        {activeTab === 'manage' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Quick Actions Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  আপনার যোগ করা মোট আইটেম:
                </span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {customQuestions.length} টি প্রশ্ন, {customAbbreviations.length} টি অ্যাব্রেভিয়েশন
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoadBonusPack}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1 transition"
                  title="কাটিং সংক্রান্ত এক্সট্রা প্রশ্ন ও অ্যাব্রেভিয়েশন যোগ করুন"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>বোনাস প্যাক যোগ</span>
                </button>

                {(customQuestions.length > 0 || customAbbreviations.length > 0) && (
                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition"
                    title="ব্যাকআপ ডাউনলোড করুন"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ব্যাকআপ (JSON)</span>
                  </button>
                )}
              </div>
            </div>

            {/* List of Custom Questions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>আমার যোগ করা প্রশ্নসমূহ ({customQuestions.length})</span>
              </h4>

              {customQuestions.length === 0 ? (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500">
                  আপনি এখনও কোনো নিজস্ব প্রশ্ন যোগ করেননি। উপরে "নতুন প্রশ্ন যোগ" ট্যাবে চাপ দিয়ে প্রশ্ন যুক্ত করুন।
                </div>
              ) : (
                <div className="space-y-2.5">
                  {customQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                            {q.questionNumber}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {q.category}
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                          {q.titleBn}
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                          {q.answerBn}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEditQuestion(q)}
                          title="সম্পাদনা করুন"
                          className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700 transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('আপনি কি এই প্রশ্নটি মুছে ফেলতে চান?')) {
                              onDeleteQuestion(q.id);
                              showToast('প্রশ্নটি মুছে ফেলা হয়েছে');
                            }
                          }}
                          title="মুছে ফেলুন"
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* List of Custom Abbreviations */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>আমার যোগ করা শব্দসংক্ষেপ ({customAbbreviations.length})</span>
              </h4>

              {customAbbreviations.length === 0 ? (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500">
                  আপনি এখনও কোনো নিজস্ব অ্যাব্রেভিয়েশন যোগ করেননি।
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {customAbbreviations.map((abbr) => (
                    <div
                      key={abbr.id}
                      className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2 shadow-xs"
                    >
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                            {abbr.term}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">
                            ({abbr.category})
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {abbr.fullForm}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {abbr.banglaMeaning}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEditAbbr(abbr)}
                          title="সম্পাদনা করুন"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('আপনি কি এই শব্দসংক্ষেপটি মুছে ফেলতে চান?')) {
                              onDeleteAbbreviation(abbr.id);
                              showToast('অ্যাব্রেভিয়েশন মুছে ফেলা হয়েছে');
                            }
                          }}
                          title="মুছে ফেলুন"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
