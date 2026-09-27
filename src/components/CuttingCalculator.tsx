import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Sparkles, Scale, RefreshCw } from 'lucide-react';

export const CuttingCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consumption' | 'gsm' | 'roll' | 'shrinkage' | 'skew'>('consumption');

  // 1. Consumption state
  const [markerYards, setMarkerYards] = useState<number>(6.5);
  const [markerPcs, setMarkerPcs] = useState<number>(10);
  const [consGsm, setConsGsm] = useState<number>(170);
  const [consWidthInches, setConsWidthInches] = useState<number>(70);

  // 2. GSM state
  const [inputGsm, setInputGsm] = useState<number>(170);
  const [inputOz, setInputOz] = useState<number>(5.01);

  // 3. Roll Length state
  const [rollWeightKg, setRollWeightKg] = useState<number>(63);
  const [rollGsm, setRollGsm] = useState<number>(160);
  const [rollWidthInches, setRollWidthInches] = useState<number>(63);

  // 4. Shrinkage Pattern state
  const [finishedDimCm, setFinishedDimCm] = useState<number>(70);
  const [shrinkagePercent, setShrinkagePercent] = useState<number>(5);

  // 5. Skew % state
  const [skewDeviation, setSkewDeviation] = useState<number>(2);
  const [skewWidth, setSkewWidth] = useState<number>(60);

  // Calculations:
  // Consumption:
  const lengthMeters = markerYards * 0.9144;
  const widthMeters = consWidthInches * 0.0254;
  const totalMarkerWeightKg = (lengthMeters * widthMeters * consGsm) / 1000;
  const perPcKg = markerPcs > 0 ? totalMarkerWeightKg / markerPcs : 0;
  const perDozenKg = perPcKg * 12;

  // Roll Length:
  const rollWidthM = rollWidthInches * 0.0254;
  const rollLengthMeters =
    rollGsm > 0 && rollWidthM > 0 ? (rollWeightKg * 1000) / (rollGsm * rollWidthM) : 0;
  const rollLengthYards = rollLengthMeters * 1.09361;

  // Shrinkage:
  const preWashDim =
    shrinkagePercent < 100 ? finishedDimCm / (1 - shrinkagePercent / 100) : 0;

  // Skew:
  const calculatedSkewPercent =
    skewWidth > 0 ? (skewDeviation / skewWidth) * 100 : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Calculator className="w-4 h-4" />
            <span>GARMENTS CUTTING MATHEMATICS & TOOLS</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            ইন্টারঅ্যাক্টিভ কাটিং ক্যালকুলেটর
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            ভাইভা ও ফ্যাক্টরি টেস্টের জটিল হিসাবগুলো নিমেষেই নির্ভুল সমাধান করুন।
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('consumption')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'consumption'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Consumption (কেজি/ডজন)
          </button>
          <button
            onClick={() => setActiveTab('gsm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'gsm'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            GSM ⇄ OZ
          </button>
          <button
            onClick={() => setActiveTab('roll')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'roll'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Roll Length
          </button>
          <button
            onClick={() => setActiveTab('shrinkage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'shrinkage'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Shrinkage Pattern
          </button>
          <button
            onClick={() => setActiveTab('skew')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'skew'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Skew %
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'consumption' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ১. মার্কার থেকে ফেব্রিক কনজাম্পশন হিসাব (কেজি/পিস ও কেজি/ডজন)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              সূত্র: Weight (kg) = Length (m) × Width (m) × GSM ÷ 1000
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                মার্কার দৈর্ঘ্য (Yards)
              </label>
              <input
                type="number"
                step="0.1"
                value={markerYards}
                onChange={(e) => setMarkerYards(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                = {lengthMeters.toFixed(3)} মিটার
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                মার্কারের পিস সংখ্যা (Pcs)
              </label>
              <input
                type="number"
                value={markerPcs}
                onChange={(e) => setMarkerPcs(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">পোশাক সংখ্যা</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                ফেব্রিক GSM (g/m²)
              </label>
              <input
                type="number"
                value={consGsm}
                onChange={(e) => setConsGsm(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">কাপড়ের ঘনত্ব</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                কাপড়ের বহর (Width in Inches)
              </label>
              <input
                type="number"
                value={consWidthInches}
                onChange={(e) => setConsWidthInches(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                = {widthMeters.toFixed(3)} মিটার
              </span>
            </div>
          </div>

          {/* Results Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-4">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>গণনাকৃত ফলাফল (Calculated Results):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block mb-1">
                  ১০ পিসের মোট মার্কার ফেব্রিক ওজন
                </span>
                <span className="text-xl font-bold font-mono text-white">
                  {totalMarkerWeightKg.toFixed(4)} <span className="text-xs font-sans text-emerald-400">kg</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                <span className="text-[11px] text-emerald-300 block mb-1">
                  প্রতি পিসের কনজাম্পশন (Per Piece)
                </span>
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {perPcKg.toFixed(3)} <span className="text-sm font-sans">kg/pc</span>
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                  ({(perPcKg * 1000).toFixed(1)} grams)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block mb-1">
                  প্রতি ডজনের কনজাম্পশন (Per Dozen)
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {perDozenKg.toFixed(3)} <span className="text-sm font-sans text-emerald-400">kg/dz</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gsm' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ২. GSM এবং OZ রূপান্তর (Conversion)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              আন্তর্জাতিক সূত্র: 1 OZ = 33.906 GSM | OZ = GSM ÷ 33.906
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* GSM to OZ */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                GSM লিখুন → OZ দেখুন
              </span>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Fabric GSM:</label>
                <input
                  type="number"
                  value={inputGsm}
                  onChange={(e) => {
                    const g = parseFloat(e.target.value) || 0;
                    setInputGsm(g);
                  }}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-base font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs block text-emerald-600 dark:text-emerald-400">
                  Equivalent OZ (আউন্স):
                </span>
                <span className="text-2xl font-bold font-mono">
                  {(inputGsm / 33.906).toFixed(2)}{' '}
                  <span className="text-xs font-sans">OZ/yd²</span>
                </span>
              </div>
            </div>

            {/* OZ to GSM */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                OZ লিখুন → GSM দেখুন
              </span>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Fabric OZ:</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputOz}
                  onChange={(e) => {
                    const oz = parseFloat(e.target.value) || 0;
                    setInputOz(oz);
                  }}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl text-base font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                <span className="text-xs block text-blue-600 dark:text-blue-400">
                  Equivalent GSM (g/m²):
                </span>
                <span className="text-2xl font-bold font-mono">
                  {(inputOz * 33.906).toFixed(1)}{' '}
                  <span className="text-xs font-sans">GSM</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roll' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ৩. রোলের ওজন থেকে কাপড়ের দৈর্ঘ্য নির্ণয় (Meters / Yards)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              সূত্র: Length (m) = [Weight (kg) × 1000] ÷ [GSM × Width (m)]
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                রোলের ওজন (Weight in kg)
              </label>
              <input
                type="number"
                value={rollWeightKg}
                onChange={(e) => setRollWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                ফেব্রিক GSM (g/m²)
              </label>
              <input
                type="number"
                value={rollGsm}
                onChange={(e) => setRollGsm(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                ফেব্রিক বহর (Width in Inches)
              </label>
              <input
                type="number"
                value={rollWidthInches}
                onChange={(e) => setRollWidthInches(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Box */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block mb-1">মোট উপলব্ধ কাপড়ের দৈর্ঘ্য:</span>
              <div className="text-3xl font-black font-mono text-emerald-400">
                {rollLengthMeters.toFixed(2)} <span className="text-sm font-sans text-white">Meters</span>
              </div>
            </div>
            <div className="sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs text-slate-400 block mb-1">গজ এককে (Yards):</span>
              <div className="text-2xl font-bold font-mono text-white">
                {rollLengthYards.toFixed(2)} <span className="text-sm font-sans text-slate-400">Yards</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shrinkage' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ৪. সিঙ্কেজ কমপেনসেশন প্যাটার্ন ক্যালকুলেটর
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              সূত্র: Pre-Wash Pattern Dimension = Finished Dimension ÷ (1 − Shrinkage %)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                বায়ারের কাঙ্ক্ষিত ফাইনাল মাপ (Finished Dimension)
              </label>
              <input
                type="number"
                step="0.5"
                value={finishedDimCm}
                onChange={(e) => setFinishedDimCm(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                যেমন: বডি লেন্থ ৭০ সেমি বা চেস্ট ৬০ সেমি
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                ল্যাব টেস্টে প্রাপ্ত সিঙ্কেজ (Shrinkage %)
              </label>
              <input
                type="number"
                step="0.1"
                value={shrinkagePercent}
                onChange={(e) => setShrinkagePercent(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                যেমন: 5% সিঙ্কেজ হলে লিখুন 5
              </span>
            </div>
          </div>

          {/* Results Box */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-emerald-400 block mb-1">
                কাটিং প্যাটার্নে প্রাক-ওয়াশ কাটার সাইজ (Pre-Wash Pattern Size):
              </span>
              <div className="text-3xl font-black font-mono text-emerald-400">
                {preWashDim.toFixed(2)} <span className="text-sm font-sans text-white">cm</span>
              </div>
            </div>
            <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 max-w-xs">
              <span className="font-semibold text-white">নোট:</span> ওয়াশের পর {shrinkagePercent}% সংকুচিত হয়ে এটি পুরোপুরি {finishedDimCm} সেমিতে পরিণত হবে।
            </div>
          </div>
        </div>
      )}

      {activeTab === 'skew' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ৫. স্কিউ পার্সেন্টেজ ক্যালকুলেটর (Skew %)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              সূত্র: Skew (%) = (Maximum Skew Deviation ÷ Fabric Width) × 100
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                সর্বোচ্চ স্কিউ বিচ্যুতি (Maximum Deviation)
              </label>
              <input
                type="number"
                step="0.1"
                value={skewDeviation}
                onChange={(e) => setSkewDeviation(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">যেমন: ২ ইঞ্চি</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                কাপড়ের মোট বহর (Fabric Width)
              </label>
              <input
                type="number"
                value={skewWidth}
                onChange={(e) => setSkewWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">যেমন: ৬০ ইঞ্চি</span>
            </div>
          </div>

          {/* Results Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block mb-1">গণনাকৃত স্কিউ শতাংশ:</span>
              <div className="text-3xl font-black font-mono text-emerald-400">
                {calculatedSkewPercent.toFixed(2)}%
              </div>
            </div>
            <div className="text-xs text-slate-300 bg-slate-800/80 p-3 rounded-xl border border-slate-700 max-w-xs">
              {calculatedSkewPercent <= 2.5 ? (
                <span className="text-emerald-400 font-semibold">
                  ✓ গ্রহণযোগ্য সীমা (Within typical 2.5% tolerance)
                </span>
              ) : (
                <span className="text-amber-400 font-semibold">
                  ⚠️ উচ্চ বিচ্যুতি (High Skew). স্টেনটারে পুনরায় সোজা করতে হবে।
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
