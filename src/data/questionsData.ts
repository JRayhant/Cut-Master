import { QuestionItem } from '../types';

export const questionsData: QuestionItem[] = [
  {
    id: 1,
    questionNumber: '01',
    titleEn: 'What is GSM? How is GSM calculated? What is OZ?',
    titleBn: 'GSM কী? GSM কীভাবে হিসাব করা হয়? OZ কী?',
    category: 'Fabric & Basics',
    answerEn: `GSM (Gram per Square Meter) means the weight of fabric in grams for one square meter of fabric.

Formula:
GSM = Fabric Weight (gram) ÷ Fabric Area (m²)

For example, if 1 m² fabric weighs 170 grams, then:
GSM = 170 g/m²

OZ (Ounce) is another unit used to express fabric weight, especially in denim and woven fabrics.

Approximate conversion:
• 1 OZ = 33.906 GSM
• OZ = GSM ÷ 33.906

Example:
170 GSM ÷ 33.906 = 5.01 OZ`,
    answerBn: `GSM (Gram per Square Meter) হলো ১ বর্গমিটার কাপড়ের ওজন গ্রামে প্রকাশ করা।

সূত্র:
GSM = কাপড়ের মোট ওজন (গ্রাম) ÷ কাপড়ের ক্ষেত্রফল (বর্গমিটার)

উদাহরণস্বরূপ, ১ বর্গমিটার কাপড়ের ওজন ১৭০ গ্রাম হলে তার GSM হবে ১৭০ g/m²।

OZ (আউন্স) হলো কাপড়ের ওজন প্রকাশের আরেকটি আন্তর্জাতিক একক, যা প্রধানত ডেনিম এবং ওভেন ফেব্রিকের ক্ষেত্রে বেশি ব্যবহৃত হয়।

রূপান্তরের নিয়ম:
• ১ OZ = ৩৩.৯০৬ GSM
• OZ = GSM ÷ ৩৩.৯০৬

উদাহরণ:
১৭০ GSM ÷ ৩৩.৯০৬ = ৫.০১ OZ`,
    formula: 'GSM = Weight (g) ÷ Area (m²)  |  1 OZ = 33.906 GSM',
    keyTakeaway: 'GSM = g/m², Denim ও Woven এ বহুল ব্যবহৃত OZ = GSM ÷ 33.906',
    tags: ['gsm', 'oz', 'weight', 'calculation', 'conversion', 'fabric basics'],
  },
  {
    id: 2,
    questionNumber: '02',
    titleEn: 'What are the major types of fabric? Give examples of common garment fabrics.',
    titleBn: 'ফেব্রিক মূলত কত প্রকার ও কী কী? তৈরি পোশাকে ব্যবহৃত সাধারণ কাপড়ের উদাহরণ দিন।',
    category: 'Fabric & Basics',
    answerEn: `The major types of fabric are:

1. Woven Fabric – Made by interlacing two sets of yarns (warp and weft) at right angles.
2. Knit Fabric – Made by interlooping continuous yarns together.
3. Non-Woven Fabric – Made by bonding or mechanically/chemically entangling fibers directly without weaving or knitting.

Common garment fabric examples:
• Woven: Denim, Twill, Poplin, Canvas, Oxford, Flannel
• Knit: Single Jersey, Rib, Interlock, Fleece, Pique, French Terry
• Synthetics & Stretch: Polyester, Nylon, Spandex/Elastane blends`,
    answerBn: `ফেব্রিক মূলত প্রধান ৩ প্রকার:

১. ওভেন ফেব্রিক (Woven Fabric) – Warp (টানা) এবং Weft (পড়েন) সুতা পরস্পরের সাথে ৯০ ডিগ্রি কোণে Interlace (পরস্পর বন্ধন) করে তৈরি হয়।
২. নিট ফেব্রিক (Knit Fabric) – সুতার মাধ্যমে Loop (লুপ) তৈরি করে পরস্পরের সাথে Interlooping পদ্ধতিতে তৈরি হয়।
৩. নন-ওভেন ফেব্রিক (Non-Woven Fabric) – Weaving বা Knitting ছাড়া সরাসরি ফাইবারগুলোকে রাসায়নিক, যান্ত্রিক বা তাপের মাধ্যমে বন্ডিং করে তৈরি করা হয় (যেমন ইন্টারলাইনিং)।

পোশাকে ব্যবহৃত সাধারণ ফেব্রিক:
• ওভেন: কটন, ডেনিম, টুইল, পপলিন, ক্যানভাস
• নিট: সিঙ্গেল জার্সি, রিব, ইন্টারলক, ফ্লিস, পিক
• অন্যান্য: পলিয়েস্টার, নাইলন, স্প্যানডেক্স/ইলাস্টেন`,
    keyTakeaway: 'Woven = Interlacing, Knit = Interlooping, Non-woven = Bonding',
    tags: ['woven', 'knit', 'non-woven', 'fabric types', 'cotton', 'denim'],
  },
  {
    id: 3,
    questionNumber: '03',
    titleEn: 'Describe the importance and impact of RMG in the economic and social development of Bangladesh.',
    titleBn: 'বাংলাদেশের অর্থনৈতিক ও সামাজিক উন্নয়নে তৈরি পোশাক (RMG) খাতের গুরুত্ব ও প্রভাব আলোচনা করুন।',
    category: 'RMG & Bangladesh Economy',
    answerEn: `The Ready-Made Garments (RMG) industry is the backbone of Bangladesh's economy:

1. Employment Generation: Employs over 4 million workers directly and millions indirectly.
2. Women Empowerment: Over 60% of workers are women, bringing financial self-reliance and greater social participation.
3. Foreign Exchange Earnings: Accounts for over 80% of the total export earnings of Bangladesh.
4. Economic & GDP Growth: Drives industrial output and national revenue through port duties, utility usage, and banking.
5. Social Development: Increases household spending on child education, healthcare, and nutrition, lifting millions above the poverty line.
6. Backward Linkages: Spurred vast domestic investments in spinning mills, weaving, dyeing, printing, accessories, cartons, and logistics.
7. Global Apparel Leadership: Positioned Bangladesh as the 2nd largest garment exporter globally.`,
    answerBn: `বাংলাদেশের অর্থনৈতিক ও সামাজিক বিকাশে তৈরি পোশাক (RMG) খাতের অবদান অপরিসীম:

১. কর্মসংস্থান সৃষ্টি – প্রত্যক্ষভাবে ৪০ লাখের বেশি মানুষ এবং পরোক্ষভাবে কোটি মানুষের কর্মসংস্থান সৃষ্টি করেছে।
২. নারী ক্ষমতায়ন – পোশাক খাতের শ্রমিকের ৬০% এরও বেশি নারী, যা গ্রামীণ নারীদের অর্থনৈতিকভাবে স্বাবলম্বী ও সিদ্ধান্ত গ্রহণে সক্ষম করেছে।
৩. বৈদেশিক মুদ্রা অর্জন – দেশের মোট রপ্তানি আয়ের ৮০% এরও বেশি আসে আরএমজি খাত থেকে।
৪. জিডিপি প্রবৃদ্ধি – জাতীয় অর্থনীতি ও শিল্পায়নে সবচেয়ে বড় নিয়ামক হিসেবে কাজ করছে।
৫. সামাজিক উন্নয়ন – শ্রমিকদের নিয়মিত আয়ে জীবনযাত্রার মান, সন্তানদের শিক্ষা ও চিকিৎসা সেবার সুযোগ বৃদ্ধি পেয়েছে।
৬. ব্যাকওয়ার্ড লিংকেজ – স্পিনিং, উইভিং, ডাইং, এক্সেসরিজ, কার্টুন ও পরিবহন খাতের বিশাল বিকাশ ঘটিয়েছে।
৭. আন্তর্জাতিক মর্যাদা – বাংলাদেশকে বিশ্ববাজারে দ্বিতীয় বৃহত্তম পোশাক রপ্তানিকারক দেশ হিসেবে প্রতিষ্ঠিত করেছে।`,
    keyTakeaway: '৮০%+ রপ্তানি আয়, ৪০ লাখ+ কর্মসংস্থান, নারী ক্ষমতায়ন ও ব্যাকওয়ার্ড লিংকেজ উন্নয়ন।',
    tags: ['rmg', 'bangladesh', 'economy', 'women empowerment', 'gdp', 'export'],
  },
  {
    id: 4,
    questionNumber: '04',
    titleEn: 'What is fabric consumption? Calculate the consumption in kg per piece and per dozen: Marker Length = 6.5 yards, Pieces = 10 pcs, Fabric GSM = 170, Width = 70 inches.',
    titleBn: 'ফেব্রিক কনজাম্পশন কী? হিসাব করুন (কেজি/পিস ও কেজি/ডজন): মার্কার দৈর্ঘ্য = ৬.৫ গজ, পিস = ১০ পিস, জিএসএম = ১৭০, ফেব্রিক বহর = ৭০ ইঞ্চি।',
    category: 'Consumption & Math',
    answerEn: `Fabric consumption refers to the exact quantity of fabric required to manufacture a specific garment or a unit of garments (usually calculated per piece or per dozen).

Step-by-Step Calculation:
• Step 1: Convert Marker Length into meters
  1 yard = 0.9144 meter
  6.5 × 0.9144 = 5.9436 meters

• Step 2: Convert Fabric Width into meters
  1 inch = 0.0254 meter
  70 × 0.0254 = 1.778 meters

• Step 3: Calculate Total Marker Fabric Weight
  Weight (kg) = Length (m) × Width (m) × GSM ÷ 1000
  Weight = 5.9436 × 1.778 × 170 ÷ 1000 = 1.7965 kg (for 10 pcs)

• Step 4: Consumption per Piece
  1.7965 ÷ 10 = 0.17965 kg/pc ≈ 0.180 kg/pc (179.65 grams)

• Step 5: Consumption per Dozen
  0.17965 × 12 = 2.1558 kg/dozen ≈ 2.156 kg/dozen

Note: This is pure theoretical marker consumption. Production consumption will add wastage, end bits, defect cuts, and shrinkage factors.`,
    answerBn: `ফেব্রিক কনজাম্পশন হলো নির্দিষ্ট একটি পোশাক বা নির্দিষ্ট পরিমাণ (যেমন ১ পিস বা ১ ডজন) পোশাক তৈরি করতে ঠিক কতটুকু কাপড়ের প্রয়োজন হয় তার পরিমাণ।

ধাপভিত্তিক হিসাব:
১. মার্কার দৈর্ঘ্য মিটারে রূপান্তর:
   ১ গজ = ০.৯১৪৪ মিটার
   ৬.৫ × ০.৯১৪৪ = ৫.৯৪৩৬ মিটার

২. ফেব্রিকের বহর মিটারে রূপান্তর:
   ১ ইঞ্চি = ০.০২৫৪ মিটার
   ৭০ × ০.০২৫৪ = ১.৭৭৮ মিটার

৩. ১০ পিসের মার্কারের মোট কাপড়ের ওজন (কেজি):
   ওজন = দৈর্ঘ্য (মিটার) × বহর (মিটার) × GSM ÷ ১০০০
   = ৫.৯৪৩৬ × ১.৭৭৮ × ১৭০ ÷ ১০০০ = ১.৭৯৬৫ কেজি

৪. প্রতি পিসের কনজাম্পশন:
   ১.৭৯৬৫ ÷ ১০ = ০.১৭৯৬৫ কেজি/পিস ≈ ০.১৮০ কেজি (১৭৯.৬৫ গ্রাম)

৫. প্রতি ডজনের কনজাম্পশন:
   ০.১৭৯৬৫ × ১২ = ২.১৫৫৮ কেজি/ডজন ≈ ২.১৫৬ কেজি/ডজন

ফলাফল:
• Per Piece = 0.180 kg (প্রায়)
• Per Dozen = 2.156 kg (প্রায়)`,
    formula: 'Weight (kg) = Length (m) × Width (m) × GSM ÷ 1000',
    keyTakeaway: 'Per Piece = 0.180 kg, Per Dozen = 2.156 kg',
    tags: ['consumption', 'math', 'calculation', 'gsm', 'yard', 'meter'],
  },
  {
    id: 5,
    questionNumber: '05',
    titleEn: 'A fabric roll weighs 63 kg. GSM is 160 and fabric width is 63 inches. How many meters of fabric are available?',
    titleBn: 'একটি ফেব্রিক রোলের ওজন ৬৩ কেজি। জিএসএম ১৬০ এবং কাপড়ের বহর ৬৩ ইঞ্চি। এই রোলে কত মিটার কাপড় আছে?',
    category: 'Consumption & Math',
    answerEn: `Given Data:
• Total Roll Weight = 63 kg
• GSM = 160
• Fabric Width = 63 inches

Step 1: Convert Width into meters
63 × 0.0254 = 1.6002 meters

Step 2: Formula to find Length from Weight
Length (meters) = [Weight (kg) × 1000] ÷ [GSM × Width (m)]
= (63 × 1000) ÷ (160 × 1.6002)
= 63,000 ÷ 256.032
= 246.06 meters

Final Answer:
Approximately 246.06 meters of fabric are available in the roll.`,
    answerBn: `প্রদত্ত তথ্য:
• রোলের ওজন = ৬৩ কেজি
• GSM = ১৬০
• ফেব্রিকের বহর = ৬৩ ইঞ্চি

ধাপ ১: বহরকে মিটারে রূপান্তর:
৬৩ × ০.০২৫৪ = ১.৬০০২ মিটার

ধাপ ২: দৈর্ঘ্য বের করার সূত্র:
দৈর্ঘ্য (মিটার) = [ওজন (কেজি) × ১০০০] ÷ [GSM × বহর (মিটার)]
= (৬৩ × ১০০০) ÷ (১৬০ × ১.৬০০২)
= ৬৩,০০০ ÷ ২৫৬.০৩২
= ২৪৬.০৬ মিটার

উত্তর:
উক্ত ফেব্রিক রোলে প্রায় ২৪৬.০৬ মিটার কাপড় আছে।`,
    formula: 'Length (m) = [Weight (kg) × 1000] ÷ [GSM × Width (m)]',
    keyTakeaway: 'রোলে কাপড়ের দৈর্ঘ্য = ২৪৬.০৬ মিটার',
    tags: ['roll length', 'meters', 'math', 'gsm', 'weight to length'],
  },
  {
    id: 6,
    questionNumber: '06',
    titleEn: 'Booking consumption is 1.25 kg/dz. GSM 180, width 63". Actual GSM is 180-190 (avg 185) and actual width is 58-60" (avg 59"). Calculate fabric requirement for 5,000 pcs and explain if meter consumption changes.',
    titleBn: 'বুকিং কনজাম্পশন ১.২৫ কেজি/ডজন, জিএসএম ১৮০, বহর ৬৩"। প্রকৃত জিএসএম ১৮০-১৯০ (গড় ১৮৫) এবং বহর ৫৮-৬০" (গড় ৫৯")। ৫,০০০ পিসের জন্য কাপড় লাগবে কত? মিটার কনজাম্পশন বাড়বে না কমবে?',
    category: 'Consumption & Math',
    answerEn: `Booking:
• Consumption = 1.25 kg/dozen, GSM = 180, Width = 63 inches
• Order Quantity = 5,000 pcs = 5,000 ÷ 12 = 416.67 dozen
• Booking Fabric Requirement = 416.67 × 1.25 = 520.83 kg

Actual Condition:
• Average Actual GSM = 185
• Average Actual Width = 59 inches

Comparison & Actual Kg Requirement:
Actual Consumption = Booking Kg × (Actual GSM ÷ Booking GSM) × (Booking Width ÷ Actual Width)
= 520.83 × (185 ÷ 180) × (63 ÷ 59)
= 520.83 × 1.0278 × 1.0678 ≈ 572 kg

Meter Requirement Comparison:
• Booking Meters: (520.83 × 1000) ÷ (180 × 63 × 0.0254) ≈ 1,808 meters
• Actual Meters: (572 × 1000) ÷ (185 × 59 × 0.0254) ≈ 2,063 meters

Conclusion:
Because the actual GSM is higher (+2.78%) and actual width is narrower (-6.35%), both kg consumption (+51.17 kg) and meter requirement (+255 m) increase significantly.`,
    answerBn: `বুকিং তথ্য:
• কনজাম্পশন = ১.২৫ কেজি/ডজন, GSM = ১৮০, বহর = ৬৩"
• মোট অর্ডার = ৫,০০০ পিস = ৪১৬.৬৭ ডজন
• বুকিং ফেব্রিক পরিমাণ = ৪১৬.৬৭ × ১.২৫ = ৫২০.৮৩ কেজি

প্রকৃত অবস্থা:
• গড় প্রকৃত GSM = ১৮৫ (১৮০-১৯০ এর গড়)
• গড় প্রকৃত বহর = ৫৯" (৫৮-৬০ এর গড়)

প্রকৃত কেজির হিসাব:
প্রকৃত ওজন = ৫২০.৮৩ × (১৮৫ ÷ ১৮০) × (৬৩ ÷ ৫৯) ≈ ৫৭২ কেজি

মিটারের তুলনা:
• বুকিং মিটার = ১,৮০৮ মিটার
• প্রকৃত প্রয়োজন = ২,০৬৩ মিটার

উপসংহার:
প্রকৃত GSM বাড়ার কারণে ওজন বেড়েছে এবং বহর কমে যাওয়ার কারণে একই প্যাটার্ন কাটতে বেশি লম্বা মার্কার বা বেশি প্লাই লেগেছে। ফলে কেজি এবং মিটার উভয় কনজাম্পশনই বৃদ্ধি পাবে।`,
    tableData: {
      headers: ['প্যারামিটার', 'বুকিং (Booking)', 'প্রকৃত (Actual)', 'পার্থক্য / প্রভাব'],
      rows: [
        ['GSM', '180', '185', '+5 GSM (ওজন বৃদ্ধি)'],
        ['Width (বহর)', '63 ইঞ্চি', '59 ইঞ্চি', '-4 ইঞ্চি (সংকীর্ণ বহর)'],
        ['মোট ফেব্রিক (KG)', '520.83 kg', '≈ 572 kg', '+51.17 kg অতিরিক্ত প্রয়োজন'],
        ['মোট মিটার (Meter)', '≈ 1,808 m', '≈ 2,063 m', '+255 m অতিরিক্ত প্রয়োজন'],
      ],
    },
    keyTakeaway: 'GSM বাড়লে ও Width কমলে KG ও Meter উভয় কনজাম্পশন বৃদ্ধি পায়।',
    tags: ['booking vs actual', 'consumption variance', 'gsm variance', 'width change'],
  },
  {
    id: 7,
    questionNumber: '07',
    titleEn: 'As a Cutting Executive/Manager, what activities can you take to reduce fabric wastage?',
    titleBn: 'একজন কাটিং এক্সিকিউটিভ বা ম্যানেজার হিসেবে কাপড়ের অপচয় কমাতে আপনি কী কী পদক্ষেপ গ্রহণ করবেন?',
    category: 'Management, KPIs & SMED',
    answerEn: `As a Cutting Executive/Manager, I can reduce fabric wastage through the following 20 core activities:

1. Improve marker efficiency using advanced CAD auto-nesting and manual optimization.
2. Use proper ratio planning to combine high-volume and low-volume sizes in single markers.
3. Control marker length and eliminate unnecessary gaps between pattern pieces.
4. Verify actual usable fabric width of rolls before marker planning.
5. Ensure proper fabric relaxation according to fabric type to avoid shrinkage distortion.
6. Group fabric rolls accurately by shade and shrinkage before lay planning.
7. Strictly control end bits, remnant rolls, and return unused bits to store (EBR).
8. Avoid unnecessary recutting through rigid quality checks at the spreading stage.
9. Ensure correct lay planning (balancing table length vs ply count).
10. Identify and flag fabric defects during spreading to splice accurately at splice marks.
11. Practice optimal roll allocation (grouping similar roll lengths together).
12. Monitor spreading tension to prevent stretched plies that snap back after cutting.
13. Reduce cutting mistakes by regularly calibrating and sharpening cutting knives.
14. Maintain strict bundle control and serial numbering to prevent panel mix-ups.
15. Analyze daily and monthly cutting wastage reports (end loss, edge loss, splice loss).
16. Compare planned consumption vs actual consumption after every completed cut order.
17. Regularly track Marker Efficiency (ME %) targets (aiming for 86%+).
18. Close coordination with CAD, Planning, Store, Merchandising, Sewing, and Quality.
19. Conduct root-cause analysis (5-Why analysis) for excess consumption spikes.
20. Maintain cutting KPIs and incentivize operators for waste reduction.`,
    answerBn: `কাটিং এক্সিকিউটিভ/ম্যানেজার হিসেবে ফেব্রিক অপচয় (Wastage) কমাতে ২০টি বাস্তবসম্মত পদক্ষেপ:

১. মার্কার এফিসিয়েন্সি বৃদ্ধি করা (CAD সফটওয়্যারে নিখুঁত নেস্টিং)।
২. আদর্শ রেশিও প্ল্যানিং (Ratio Planning) তৈরি করা।
৩. মার্কারের অপ্রয়োজনীয় গ্যাপ ও অতিরিক্ত মার্জিন পরিহার করা।
৪. মার্কার তৈরির পূর্বে কাপড়ের প্রকৃত কার্যকর বহর (Cuttable Width) মেপে নেওয়া।
৫. সঠিক সময় ধরে ফেব্রিক রিলাক্সেশন (Relaxation) নিশ্চিত করা।
৬. শেড ও সিঙ্কেজ গ্রুপ অনুযায়ী ফেব্রিক আলাদা করে লে দেওয়া।
৭. কাপড়ের শেষ প্রান্তের টুকরো (End Bits) নিয়ন্ত্রণ ও কার্যকর ব্যবহার।
৮. নির্ভুল স্প্রেডিং ও স্প্লাইসিংয়ের মাধ্যমে অপ্রয়োজনীয় রি-কাট কমানো।
৯. টেবিলের মাপ অনুযায়ী সঠিক লে প্ল্যান (Lay Plan) নির্ধারণ।
১০. কাপড় বিছানোর সময় ডিফেক্ট মার্কিং ও সঠিক স্প্লাইস পয়েন্টে জয়েন্ট দেওয়া।
১১. একই দৈর্ঘ্যের রোল একত্রে ব্যবহার (Roll Allocation)।
১২. স্প্রেডিংয়ের সময় কাপড়ে অতিরিক্ত টান (Tension) নিয়ন্ত্রণ করা।
১৩. কাটিং নাইফ শার্প রাখা যাতে ব্লেড ডিফ্লেকশন ও কাটিং মিসটেক না হয়।
১৪. বান্ডিল ও স্টিকারিং কঠোরভাবে মনিটর করা যাতে পার্টস মিসিং না হয়।
১৫. দৈনিক ও মাসিক অপচয়ের রিপোর্ট (End Loss, Edge Loss, Remnant) বিশ্লেষণ।
১৬. বুকিং কনজাম্পশন বনাম প্রকৃত কনজাম্পশন তুলনা করা।
১৭. নিয়মিত মার্কার ইউটিলাইজেশন পর্যালোচনা করা।
১৮. প্ল্যানিং, মার্চেন্ডাইজিং ও সুইং টিমের সাথে সার্বক্ষণিক সমন্বয়।
১৯. অতিরিক্ত অপচয় হলে রুট-কজ অ্যানালাইসিস (Root-cause analysis) করা।
২০. কাটিং ফ্লোরের অপারেটরদের অপচয় রোধে সচেতন ও পুরস্কৃত করা।`,
    keyTakeaway: 'CAD Marker Efficiency + Strict Spreading Tension + Proper Relaxation + Shrinkage Grouping',
    tags: ['wastage reduction', 'cutting manager', 'marker efficiency', 'ratio plan', 'relaxation'],
  },
  {
    id: 8,
    questionNumber: '08',
    titleEn: 'What is fabric relaxation? How long should different fabrics be relaxed?',
    titleBn: 'ফেব্রিক রিলাক্সেশন কী? বিভিন্ন ধরনের ফেব্রিক কত সময় রিলাক্স করতে হয়?',
    category: 'Fabric Challenges & Denim/Knit',
    answerEn: `Fabric relaxation is the process of unwinding fabric rolls and allowing the fabric to rest in a tension-free state to recover from the stress, tension, and compression induced during knitting/weaving, dyeing, finishing, rolling, and transit.

Typical Practical Relaxation Time Guidelines:
• Cotton Woven: 4–8 hours
• Polyester / Poly-Cotton Woven: 4–8 hours
• Denim: 12–24 hours
• Knit Fabric (100% Cotton): 12–24 hours
• Spandex / Elastane Knit (Lycra): 24–48 hours
• Highly Stretch / Activewear Fabric: 24–48 hours

Important Rule:
There is no universal fixed relaxation time. The exact duration depends on fabric yarn composition, stretch percentage, finishing method, supplier guidelines, and factory environmental conditions.`,
    answerBn: `ফেব্রিক রিলাক্সেশন হলো রোল থেকে কাপড় খুলে টেনশনমুক্ত অবস্থায় নির্দিষ্ট সময় রেখে দেওয়া, যাতে উইভিং, নিটিং, ডাইং, ফিনিশিং ও রোলে জড়ানোর সময় সৃষ্ট অভ্যন্তরীণ টান (Tension) স্বাভাবিক অবস্থায় ফিরে আসে।

সাধারণ সময়সূচি:
• কটন ওভেন: ৪–৮ ঘণ্টা
• পলিয়েস্টার / পলি-কটন ওভেন: ৪–৮ ঘণ্টা
• ডেনিম: ১২–২৪ ঘণ্টা
• নিট ফেব্রিক (১০০% কটন): ১২–২৪ ঘণ্টা
• স্প্যানডেক্স / ইলাস্টেন নিট (লাইক্রা): ২৪–৪৮ ঘণ্টা
• হাই-স্ট্রেচ ফেব্রিক: ২৪–৪৮ ঘণ্টা

গুরুত্বপূর্ণ নোট:
রিলাক্সেশনের সময় ফেব্রিকের ধরন, ইলাস্টিসিটি ও টেস্ট রিপোর্টের ওপর ভিত্তি করে নির্ধারিত হয়। রিলাক্সেশন সঠিকভাবে না হলে কাটিংয়ের পর পার্টস ছোট হয়ে মেজারমেন্ট ফেইল হতে পারে।`,
    tableData: {
      headers: ['ফেব্রিকের ধরন (Fabric Type)', 'প্রস্তাবিত রিলাক্সেশন সময় (Typical Hours)'],
      rows: [
        ['Cotton Woven', '4–8 hours'],
        ['Polyester / Poly-Cotton Woven', '4–8 hours'],
        ['Denim', '12–24 hours'],
        ['Knit Fabric (100% Cotton)', '12–24 hours'],
        ['Spandex / Elastane Knit (Lycra)', '24–48 hours'],
        ['Highly Stretch Activewear', '24–48 hours'],
      ],
    },
    keyTakeaway: 'রিলাক্সেশন না করলে কাটার পর পার্টস সংকুচিত হয়ে মেজারমেন্ট রিজেকশন ঘটে।',
    tags: ['fabric relaxation', 'relaxation hours', 'denim', 'knit', 'spandex', 'lycra'],
  },
  {
    id: 9,
    questionNumber: '09',
    titleEn: 'What is Fabric Inspection? Explain the 4-Point System penalty scale.',
    titleBn: 'ফেব্রিক ইন্সপেকশন কী? ৪-পয়েন্ট সিস্টেমের পেনাল্টি স্কেল ব্যাখ্যা করুন।',
    category: 'Quality & 4-Point System',
    answerEn: `Fabric Inspection is the systematic process of checking raw fabric rolls before cutting to verify visual quality, defect density, shade variation, width consistency, and GSM compliance.

The 4-Point System (ASTM D5430) is the globally accepted standard for assigning penalty points according to defect length or size:

Penalty Point Scale:
• Up to 3 inches defect length: 1 point
• > 3 inches up to 6 inches: 2 points
• > 6 inches up to 9 inches: 3 points
• More than 9 inches (or holes > 1 inch): 4 points

Maximum Penalty: No single defect can receive more than 4 penalty points.
Calculation Formula:
Points per 100 sq. yards = (Total Points × 3600) ÷ (Inspected Length in yards × Cuttable Width in inches)`,
    answerBn: `ফেব্রিক ইন্সপেকশন হলো কাটিং ফ্লোরে কাপড় ব্যবহারের পূর্বে কাপড়ের ত্রুটি, শেড, জিএসএম ও বহর সঠিক আছে কিনা তা আন্তর্জাতিক পদ্ধতিতে পরীক্ষা করা।

৪-পয়েন্ট সিস্টেম (4-Point System) পেনাল্টি স্কেল:
• ৩ ইঞ্চি পর্যন্ত ত্রুটির দৈর্ঘ্য: ১ পয়েন্ট
• ৩ ইঞ্চির বেশি থেকে ৬ ইঞ্চি পর্যন্ত: ২ পয়েন্ট
• ৬ ইঞ্চির বেশি থেকে ৯ ইঞ্চি পর্যন্ত: ৩ পয়েন্ট
• ৯ ইঞ্চির বেশি ত্রুটি (বা ১ ইঞ্চির বড় ছিদ্র): ৪ পয়েন্ট

গুরুত্বপূর্ণ শর্ত:
একটি একক ত্রুটির জন্য সর্বোচ্চ ৪ পয়েন্টের বেশি দেওয়া যায় না। সাধারণত প্রতি ১০০ বর্গগজে ২০ থেকে ২৮ পয়েন্টের কম থাকলে রোলটি কাটিংয়ের জন্য পাস ধরা হয়।`,
    tableData: {
      headers: ['ত্রুটির দৈর্ঘ্য / সাইজ (Defect Size)', 'পেনাল্টি পয়েন্ট (Penalty)'],
      rows: [
        ['Up to 3 inches (৩ ইঞ্চি পর্যন্ত)', '1 Point'],
        ['> 3 to 6 inches (৩ থেকে ৬ ইঞ্চি)', '2 Points'],
        ['> 6 to 9 inches (৬ থেকে ৯ ইঞ্চি)', '3 Points'],
        ['More than 9 inches (৯ ইঞ্চির বেশি)', '4 Points'],
      ],
    },
    formula: 'Points / 100 sq yd = (Total Points × 3600) ÷ (Yards × Fabric Width in inches)',
    keyTakeaway: 'Defect scale: 1pt (<=3"), 2pt (3-6"), 3pt (6-9"), 4pt (>9"). Max 4 pts/defect.',
    tags: ['fabric inspection', '4-point system', 'penalty scale', 'astm d5430', 'quality'],
  },
  {
    id: 10,
    questionNumber: '10',
    titleEn: 'What is a Fabric Defect? List common fabric defects with English and Bengali names, and state the 5 major categories.',
    titleBn: 'ফেব্রিক ডিফেক্ট কী? সাধারণ ফেব্রিক ডিফেক্টগুলোর বাংলা ও ইংরেজি নামের তালিকা দিন এবং প্রধান ৫টি ক্যাটাগরি উল্লেখ করুন।',
    category: 'Quality & 4-Point System',
    answerEn: `Fabric defect means any abnormality, fault, or imperfection found in fabric that impairs its appearance, quality, performance, or cutting suitability.

5 Major Categories of Fabric Defects:
1. Structural Defects (Weaving/Knitting): Slub, Missing End, Missing Pick, Broken End, Broken Pick.
2. Dyeing & Color Defects: Shade Variation, Uneven Dyeing, Color Spot, Barre, Bleed.
3. Physical & Mechanical Defects: Hole, Tear, Cut Mark, Snag, Crease Mark.
4. Finishing Defects: Width Variation, GSM Variation, Bow, Skew, Wrinkles, Pilling.
5. Contamination Defects: Oil Stain, Dirt/Soil, Foreign Fiber, Rust Stain.

Common Fabric Defects:
1. Hole (ছিদ্র)  2. Tear (ছেঁড়া)  3. Cut (কাটা দাগ)  4. Slub (মোটা সুতা)  5. Thick & Thin Place (কোথাও মোটা, কোথাও পাতলা)  6. Missing End (Warp সুতা অনুপস্থিত)  7. Missing Pick (Weft সুতা অনুপস্থিত)  8. Broken End (টানা সুতা ছেঁড়া)  9. Broken Pick (পড়েন সুতা ছেঁড়া)  10. Stain (দাগ)  11. Oil Stain (তেলের দাগ)  12. Dirt/Soil (ময়লা)  13. Color Spot (রঙের ছোপ)  14. Shade Variation (শেডের অমিল)  15. Crease Mark (ভাঁজের দাগ)  16. Bow (বাঁকা ওয়েফট লাইন)  17. Skew (তির্যক বিকৃতি)  18. Uneven Dyeing (অসমান ডাইং)  19. Barre (আড়াআড়ি লাইন)  20. Pin Hole (ছোট ছিদ্র)  21. Needle Line (নিডল দাগ)  22. Snag (সুতা টেনে ওঠা)  23. Contamination (অন্য সুতার ভেজাল)  24. Neps (ছোট গুটি)  25. Wrinkle (কুঁচকানো)  26. Pilling (ফাইবার বল)  27. Width Variation (বহরের পার্থক্য)  28. GSM Variation (ঘনত্বের পার্থক্য)  29. Print Defect (প্রিন্ট মিসটেক)  30. Coating Defect (কোটিং ত্রুটি).`,
    answerBn: `ফেব্রিক ডিফেক্ট হলো কাপড়ের যেকোনো অস্বাভাবিকতা, ত্রুটি বা অসম্পূর্ণতা যা কাপড়ের চেহারা, গুণগত মান, স্থায়িত্ব বা কাটিং প্রক্রিয়ায় সমস্যা সৃষ্টি করে।

প্রধান ৫টি ক্যাটাগরি:
১. গঠনগত ত্রুটি (Structural): Slub, Missing End/Pick, Broken End.
২. ডাইং ও রঙের ত্রুটি (Dyeing & Color): Shade Variation, Uneven Dyeing, Color Spot, Barre.
৩. শারীরিক/মেকানিক্যাল ত্রুটি (Physical): Hole, Tear, Cut, Snag.
৪. ফিনিশিং ত্রুটি (Finishing): Width/GSM Variation, Bow, Skew, Wrinkles.
৫. দাগ ও ভেজাল ত্রুটি (Contamination): Oil Stain, Foreign Fiber, Dirt.`,
    tableData: {
      headers: ['ক্র.', 'Defect Name', 'বাংলা অর্থ', 'ক্যাটাগরি'],
      rows: [
        ['1', 'Hole', 'কাপড়ে ছিদ্র', 'Physical'],
        ['2', 'Tear / Cut', 'ছেঁড়া বা কাটা দাগ', 'Physical'],
        ['3', 'Slub', 'মোটা বা অস্বাভাবিক সুতা', 'Structural'],
        ['4', 'Thick & Thin Place', 'কোথাও মোটা, কোথাও পাতলা', 'Structural'],
        ['5', 'Missing End / Pick', 'টানা বা পড়েন সুতা অনুপস্থিত', 'Structural'],
        ['6', 'Oil Stain / Dirt', 'তেলের দাগ বা ময়লা', 'Contamination'],
        ['7', 'Shade Variation', 'রঙের তারতম্য বা পার্থক্য', 'Dyeing'],
        ['8', 'Bow & Skew', 'বাঁকা বা তির্যক ডিস্টরশন', 'Finishing'],
        ['9', 'Barre Mark', 'আড়াআড়ি দাগের পুনরাবৃত্তি', 'Knitting/Dyeing'],
        ['10', 'Pilling / Neps', 'সারফেসে ছোট সুতার গুটি', 'Finishing'],
      ],
    },
    keyTakeaway: 'Defects ৫ প্রকার: Structural, Dyeing, Physical, Finishing, Contamination.',
    tags: ['fabric defect', 'categories', 'slub', 'hole', 'stain', 'bow', 'skew'],
  },
  {
    id: 11,
    questionNumber: '11',
    titleEn: 'What is a Ratio Plan? Prepare a ratio plan for Order Qty: S=2650, M=2900, L=3050, XL=3500, XXL=2600 (Total 14,700 pcs).',
    titleBn: 'রেশিও প্ল্যান কী? মোট ১৪,৭০০ পিসের অর্ডারের জন্য রেশিও প্ল্যান তৈরি করুন (S=২৬৫০, M=২৯০০, L=৩০৫০, XL=৩৫০০, XXL=২৬০০)।',
    category: 'Ratio & Lay Planning',
    answerEn: `A Ratio Plan (Size Ratio Plan) is a strategic layout configuration used in the garment cutting room to determine how many garments of each size should be combined together in a single marker layout to achieve maximum fabric utilization and meet exact order quantities.

Ratio Plan Table for 14,700 pcs Order:
• Marker 1: S/3, M/3, L/3, XL/4, XXL/3 (Total 16 pcs/marker) × 867 Plies
  Output: S=2601, M=2601, L=2601, XL=3468, XXL=2601 → Total 13,872 pcs
• Marker 2: M/3, L/5 (8 pcs/marker) × 90 Plies
  Output: M=270, L=450 → Total 720 pcs
• Marker 3: S/1, XL/1 (2 pcs/marker) × 32 Plies
  Output: S=32, XL=32 → Total 64 pcs
• Marker 4: S/1, M/1 (2 pcs/marker) × 17 Plies
  Output: S=17, M=17 → Total 34 pcs
• Marker 5: M/2 (2 pcs/marker) × 6 Plies
  Output: M=12 → Total 12 pcs

Total Produced: S=2650, M=2900, L=3051, XL=3500, XXL=2601 (Total = 14,702 pcs, +2 pcs buffer).`,
    answerBn: `রেশিও প্ল্যান (Ratio Plan) হলো বায়ারের অর্ডার অনুযায়ী কাপড়ের মার্কারের মধ্যে প্রতিটি সাইজের অনুপাত নির্ধারণের পরিকল্পনা, যাতে কম মার্কার দৈর্ঘ্যে বেশি পোশাক কাটা যায় এবং কাপড়ের অপচয় ন্যূনতম হয়।

১৪,৭০০ পিসের অর্ডারের সম্পূর্ণ রেশিও প্ল্যান:
মূল মার্কারটিতে ১৬ পিসের রেশিও (S-3, M-3, L-3, XL-4, XXL-3) নিয়ে ৮৬৭ প্লাই দেওয়া হয়েছে যা অর্ডারের ৯৪%+ পূরণ করে। অবশিষ্ট সাইজ ব্যালেন্স করার জন্য ছোট মার্কার লেআউট সাজানো হয়েছে।`,
    tableData: {
      headers: ['Ratio Layout', 'Plies', 'S', 'M', 'L', 'XL', 'XXL', 'Marker Pcs', 'Total Cut'],
      rows: [
        ['S:3, M:3, L:3, XL:4, XXL:3', '867', '2601', '2601', '2601', '3468', '2601', '16 pcs', '13,872'],
        ['M:3, L:5', '90', '0', '270', '450', '0', '0', '8 pcs', '720'],
        ['S:1, XL:1', '32', '32', '0', '0', '32', '0', '2 pcs', '64'],
        ['S:1, M:1', '17', '17', '17', '0', '0', '0', '2 pcs', '34'],
        ['M:2', '6', '0', '12', '0', '0', '0', '2 pcs', '12'],
        ['Grand Total', '1,012', '2,650', '2,900', '3,051', '3,500', '2,601', '-', '14,702'],
      ],
      caption: 'অর্ডার ব্রেকডাউন: S=2650, M=2900, L=3050, XL=3500, XXL=2600 (মোট ১৪,৭০০ পিস)',
    },
    keyTakeaway: 'বড় মার্কার দিয়ে ম্যাক্সিমাম কোয়ান্টিটি কেটে ব্যালেন্স সাইজ ছোট মার্কার দিয়ে পূর্ণ করা হয়।',
    tags: ['ratio plan', 'lay plan', 'marker planning', 'size ratio', 'math breakdown'],
  },
  {
    id: 12,
    questionNumber: '12',
    titleEn: 'What is the difference between Ratio Plan and Lay Plan?',
    titleBn: 'রেশিও প্ল্যান এবং লে প্ল্যানের মধ্যে মূল পার্থক্য কী?',
    category: 'Ratio & Lay Planning',
    answerEn: `Ratio Plan vs Lay Plan Comparison:

• Focus: Ratio Plan focuses on size combination within a marker (e.g., S:2, M:3, L:3, XL:2). Lay Plan focuses on fabric spreading execution (how many plies, table allocation, roll allocation).
• Function: Ratio Plan ensures buyer's size distribution is fulfilled with maximum marker efficiency. Lay Plan controls physical spreading height, fabric layer counts, and cutting output.
• Timing: Ratio Plan is prepared first by CAD/Planning. Lay Plan is prepared to execute physical spreading on the cutting tables.
• Dependency: Ratio Plan depends on order size breakdown and marker efficiency. Lay Plan depends on fabric roll lengths, table length, fabric thickness, and machine capacity.`,
    answerBn: `রেশিও প্ল্যান বনাম লে প্ল্যানের পার্থক্য:

১. রেশিও প্ল্যান: একটি মার্কোরে বিভিন্ন সাইজের অনুপাত কেমন হবে তা নির্ধারণ করে (যেমন: S:2, M:3, L:3)।
২. লে প্ল্যান: কাটিং টেবিলে ঠিক কতটি স্তর বা প্লাই (Plies) সাজানো হবে এবং কয়টি টেবিলে কাজ হবে তা ঠিক করে।
৩. উদ্দেশ্য: রেশিও প্ল্যানের উদ্দেশ্য মার্কারের দক্ষতা বাড়ানো ও সাইজ ব্যালেন্স করা; লে প্ল্যানের উদ্দেশ্য প্রোডাকশন কোয়ান্টিটি ও স্প্রেডিং পরিচালনা করা।`,
    tableData: {
      headers: ['বৈশিষ্ট্য (Feature)', 'রেশিও প্ল্যান (Ratio Plan)', 'লে প্ল্যান (Lay Plan)'],
      rows: [
        ['মূল বিষয়', 'মার্কারে সাইজের অনুপাত বণ্টন', 'টেবিলে প্লাই বা কাপড়ের স্তরের সংখ্যা'],
        ['উদাহরণ', 'S-3, M-3, L-3, XL-4', '৮০ প্লাই × ১৬ পিস মার্কার = ১২৮০ পিস'],
        ['তৈরির সময়', 'মার্কার ও সিএডি তৈরির আগে', 'ফিজিক্যাল স্প্রেডিং ও কাটিংয়ের আগে'],
        ['নিয়ন্ত্রণ করে', 'সাইজ ব্যালেন্স ও মার্কার দক্ষতা', 'উৎপাদন সংখ্যা ও টেবিল ক্যাপাসিটি'],
      ],
    },
    keyTakeaway: 'Ratio Plan = Size Distribution | Lay Plan = Fabric Ply & Quantity Planning',
    tags: ['ratio plan', 'lay plan', 'difference', 'size balance', 'plies'],
  },
  {
    id: 13,
    questionNumber: '13',
    titleEn: 'What are the differences and challenges between Denim and Knit Fabric Cutting?',
    titleBn: 'ডেনিম এবং নিট ফেব্রিক কাটিংয়ের মধ্যে প্রধান পার্থক্য ও চ্যালেঞ্জগুলো কী কী?',
    category: 'Fabric Challenges & Denim/Knit',
    answerEn: `Denim Cutting Challenges:
1. Heavy fabric weight (10 to 14+ OZ) causing rapid operator fatigue and blade heating.
2. Significant shade variation between different rolls and lots.
3. High shrinkage variation after heavy garment wash (enzyme/stone/bleach).
4. Fabric skew, bow, and leg twist tendencies.
5. High cutting resistance requiring heavy-duty vertical straight knives or automated cutters.
6. Knife sharpness is crucial; dull knives cause ragged edges and blade deflection.
7. Ply height must be limited (typically 40–60 plies maximum).
8. Fabric thickness makes drill marks and notches harder to punch accurately.
9. Stretch denim (cotton-spandex) requires strict tension-free spreading.
10. Leg twist must be counteracted by checking fabric torque before marker planning.

Knit Fabric Cutting Challenges:
1. High elasticity and stretchability in both lengthwise and widthwise directions.
2. Fabric relaxation is paramount (12–24h) to prevent post-cut shrinkage.
3. Selvedge curling and rolling along edges.
4. Spirality / twisting distortion in circular knitted tubes.
5. GSM and width variations from roll to roll.
6. Spreading tension must be zero; any pull causes massive dimensional defect.
7. Ply slippage due to soft, smooth jersey fabric layers.
8. Notch depth must be shallow (1/16") to avoid holes after sewing stretch.
9. End-to-end dimensional stability is harder to maintain.
10. Static electricity during automated spreading of synthetic knit blends.`,
    answerBn: `ডেনিম কাটিংয়ের চ্যালেঞ্জ:
১. ভারী ওজন (১০-১৪+ আউন্স), ফলে কাটিং ব্লেডে অতিরিক্ত তাপ ও ঘর্ষণ সৃষ্টি হয়।
২. বিভিন্ন রোলের মধ্যে শেড ভেরিয়েশন খুব বেশি থাকে।
৩. ওয়াশের পর অতিরিক্ত সিঙ্কেজের কারণে প্যাটার্ন এলাউন্স জটিল হয়।
৪. ফেব্রিক স্কিউ ও বো ডিফেক্ট বেশি থাকে।
৫. ভারী নাইফ বা সিএএম অটো কাটার প্রয়োজন হয়।
৬. প্লাই হাইট কম রাখতে হয় (সাধারণত ৪০-৬০ প্লাই)।

নিট কাটিংয়ের চ্যালেঞ্জ:
১. উচ্চ স্থিতিস্থাপকতা (High Stretch), সহজে বেড়ে যায়।
২. বাধ্যতামূলক ১২-২৪ ঘণ্টা রিলাক্সেশন প্রয়োজন।
৩. কাপড়ের প্রান্ত বা সেলভেজ কুঁকড়ে যায় (Edge Curling)।
৪. সার্কুলার নিটে স্পাইরালিটি বা টুইস্টিং সমস্যা থাকে।
৫. স্প্রেডিংয়ের সময় কাপড়ে একটুও টান দেওয়া যাবে না (Zero Tension Spreading)।
৬. প্লাই স্লিপেজ হওয়ার প্রবণতা বেশি থাকে।`,
    keyTakeaway: 'Denim = Weight, Shade & Heavy Cutting | Knit = Stretch, Tension & Relaxation',
    tags: ['denim cutting', 'knit cutting', 'challenges', 'curling', 'spirality', 'tension'],
  },
  {
    id: 14,
    questionNumber: '14',
    titleEn: 'Prepare a manpower layout for 10,000 pcs daily production using Auto Spreading and Auto Cutting.',
    titleBn: 'অটো স্প্রেডিং ও অটো কাটিং ব্যবহার করে প্রতিদিন ১০,০০০ পিস উৎপাদনের জন্য জনবল (Manpower) লেআউট তৈরি করুন।',
    category: 'Management, KPIs & SMED',
    answerEn: `Assumptions:
• Target = 10,000 pcs / 8-hour shift
• Equipment: 1 Automatic Spreader + 1 High-Ply CNC Auto Cutter with moving conveyor table

Suggested Manpower Layout (16 Persons Total):
1. Cutting Executive / In-Charge: 1 Person (Overall production, quality & planning supervision)
2. Cutting Supervisor: 1 Person (Floor execution, table allocation & line balancing)
3. Auto Spreading Operator: 1 Person (Operating automatic spreading carriage & optical sensors)
4. Auto Cutting Operator: 1 Person (CAD file loading, vacuum control & CNC cutter operation)
5. Spreading Helper: 1 Person (Roll feeding, roll changing & edge alignment assistance)
6. Fabric Handler / Loader: 1 Person (Bringing relaxed fabric rolls from relaxation rack to table)
7. Lay End Checker: 1 Person (Verifying ply count, end loss, tension & splice alignment)
8. Numbering / Labeling Operators: 2 Persons (Applying ply stickers to prevent shade mixing)
9. Cutting Quality Checkers (QC): 2 Persons (Top-to-bottom ply matching, notch audit, cut accuracy)
10. Bundling Operators: 2 Persons (Bundling cut panels in 10/20/50 pcs bundles)
11. Bundle Audit / Checker: 1 Person (Barcode scan, bundle quantity verification before dispatch)
12. Cutting Store / Record Keeper: 1 Person (ERP entries, cut production tracking & dispatch slips)
13. Maintenance Technician: 1 Person (Knife sharpening, vacuum seals, compressor & sensor upkeep)
Total = 16 Persons.`,
    answerBn: `দৈনিক ১০,০০০ পিস কাটিংয়ের জন্য ১৬ জনের আদর্শ জনবল তালিকা (Auto Cutter & Auto Spreader):`,
    tableData: {
      headers: ['পদবি / দায়িত্ব (Position)', 'জনবল (Manpower)', 'মূল দায়িত্ব'],
      rows: [
        ['Cutting Executive / Manager', '1', 'সার্বিক পরিকল্পনা, কনজাম্পশন ও ফ্লোর মনিটরিং'],
        ['Cutting Supervisor', '1', 'টেবিল ম্যানেজমেন্ট ও প্রোডাকশন গতি বজায় রাখা'],
        ['Auto Spreader Operator', '1', 'অটো স্প্রেডার মেশিন চালনা ও সেন্সর মনিটরিং'],
        ['Auto Cutter Operator', '1', 'সিএনসি কাটার প্রোগ্রামিং, ভ্যাকুয়াম ও কাটিং চালনা'],
        ['Spreading Helper', '1', 'রোল উঠানো-নামানো ও কাপড় সাজাতে সহায়তা'],
        ['Fabric Handler / Loader', '1', 'রিলাক্সেশন র‍্যাক থেকে ফেব্রিক রোল লোড করা'],
        ['Lay End Checker', '1', 'প্লাই কাউন্ট, টান ও লেয়ারের প্রান্ত পরীক্ষা'],
        ['Numbering / Sticker Operator', '2', 'পার্টস অনুযায়ী প্লাই নাম্বার স্টিকারিং'],
        ['Cutting Quality Checker (QC)', '2', 'কাটা পার্টসের সাইজ, নচ ও টপ-বটম মেজারমেন্ট চেক'],
        ['Bundling Operator', '2', 'কাটিং পার্টস নির্দিষ্ট বান্ডিলে বাঁধা ও ট্যাগিং'],
        ['Bundle Audit / Checker', '1', 'সুইংয়ে পাঠানোর আগে বান্ডিল সংখ্যা ও তথ্য যাচাই'],
        ['Cutting Store / Record', '1', 'উৎপাদন ডাটা এন্ট্রি ও চালান প্রদান'],
        ['Maintenance Technician', '1', 'মেশিন নাইফ, ভ্যাকুয়াম সিল ও সেন্সর রক্ষণাবেক্ষণ'],
        ['সর্বমোট জনবল (Total)', '16 Persons', 'প্রতি শিফটে ১০,০০০ পিস নিখুঁত উৎপাদন'],
      ],
    },
    keyTakeaway: 'অটোমেশন ব্যবহারে ১৬ জনের দক্ষ টিম দিয়ে দৈনিক ১০,০০০ পিস কাটা সম্ভব।',
    tags: ['manpower layout', 'auto cutter', 'auto spreader', '10000 pcs', 'staffing'],
  },
  {
    id: 15,
    questionNumber: '15',
    titleEn: 'Convert the following standard garment cutting units: inch to meter, meter to inch, yard to meter, meter to yard.',
    titleBn: 'কাটিংয়ের গুরুত্বপূর্ণ এককগুলো রূপান্তর করুন: ইঞ্চি থেকে মিটার, মিটার থেকে ইঞ্চি, গজ থেকে মিটার, মিটার থেকে গজ।',
    category: 'Consumption & Math',
    answerEn: `Standard Textile & Cutting Unit Conversions:

• 1 inch = 0.0254 meter
• 1 meter = 39.3701 inches
• 1 yard = 0.9144 meter
• 1 meter = 1.09361 yards
• 1 yard = 3 feet = 36 inches
• 1 meter = 100 cm = 1000 mm
• 1 OZ (Ounce) = 33.906 GSM (g/m²)
• 1 Pound (lb) = 0.453592 kg
• 1 kg = 2.20462 lbs`,
    answerBn: `তৈরি পোশাকে বহুল ব্যবহৃত পরিমাপের রূপান্তর:

• ১ ইঞ্চি = ০.০২৫৪ মিটার
• ১ মিটার = ৩৯.৩৭ ইঞ্চি
• ১ গজ (Yard) = ০.৯১৪৪ মিটার
• ১ মিটার = ১.০৯৩৬ গজ
• ১ গজ = ৩ ফুট = ৩৬ ইঞ্চি
• ১ কেজি = ২.২০৪৬ পাউন্ড
• ১ OZ = ৩৩.৯০৬ GSM`,
    tableData: {
      headers: ['একক (From)', 'রূপান্তরিত একক (To)', 'গুণনীয়ক (Factor)'],
      rows: [
        ['1 Inch', 'Meter', '0.0254 m'],
        ['1 Meter', 'Inches', '39.3701"'],
        ['1 Yard', 'Meter', '0.9144 m'],
        ['1 Meter', 'Yards', '1.0936 yds'],
        ['1 Yard', 'Inches', '36 inches (3 feet)'],
        ['1 OZ/yd²', 'GSM (g/m²)', '33.906 GSM'],
      ],
    },
    keyTakeaway: '1 yard = 0.9144 m | 1 inch = 0.0254 m | 1 m = 39.37 inches',
    tags: ['unit conversion', 'inch', 'meter', 'yard', 'gsm', 'oz'],
  },
  {
    id: 16,
    questionNumber: '16',
    titleEn: 'Write the complete Cutting Workflow Chart, Cutting Procedure, and Cutting SOP.',
    titleBn: 'সম্পূর্ণ কাটিং ওয়ার্কফ্লো চার্ট, কাটিং কাজের ধাপ এবং কাটিং এসওপি (SOP) লিখুন।',
    category: 'Cutting Workflow & SOP',
    answerEn: `A. Cutting Workflow Flowchart:
Order Received → Order & Size Breakdown Check → Fabric Booking & Availability Check → Fabric Inspection (4-Point) → Relaxation → Shade & Shrinkage Grouping → Ratio Planning → CAD Marker Planning → Lay Planning → Spreading → Lay Checking → Cutting → Inspection of Cut Panels → Numbering & Sticker → Bundling → Bundle Audit → Dispatch to Sewing Floor.

B. Cutting Procedure (Core Steps):
1. Review approved Tech Pack and Size Breakdown.
2. Confirm fabric arrival and lab test reports (GSM, width, shrinkage, colorfastness).
3. Inspect rolls under 4-point system.
4. Execute fabric relaxation according to schedule.
5. Segregate rolls into shade bands and shrinkage categories.
6. Create optimized markers in CAD software for approved width.
7. Print marker and prepare lay sheet.
8. Spread fabric maintaining uniform tension and flat alignment.
9. Verify ply height, count, and splice points.
10. Clamp lay, lay marker paper, and execute precision cutting.
11. Inspect cut panels against hard template.
12. Number each layer sequentially with ply stickers.
13. Bundle components and tag with order info.
14. Perform QA bundle audit and issue to sewing.

C. Cutting SOP (Standard Operating Procedure):
Objective: To ensure high dimensional accuracy, zero shade/size mix-up, operator safety, and minimum fabric wastage.
Mandatory Rules:
• Never cut fabric without an approved shrinkage test report.
• Operators must wear metal mesh gloves on the holding hand when operating straight knives.
• Marker must not exceed usable fabric width (exclude selvedge).
• Re-cuts must be cut only from the identical shade band roll.`,
    answerBn: `কাটিং ওয়ার্কফ্লো এবং এসওপি (SOP):

ওয়ার্কফ্লো ধাপ:
অর্ডার প্রাপ্তি → সাইজ ব্রেকডাউন পরীক্ষা → ফেব্রিক রিসিভ ও কোয়ালিটি ইনস্পেকশন → রিলাক্সেশন → শেড ও সিঙ্কেজ গ্রুপিং → সিএডি মার্কার প্ল্যানিং → লে প্ল্যানিং → ফেব্রিক স্প্রেডিং → লে চেকিং → কাটিং → পার্টস ইনস্পেকশন → নাম্বারিং/স্টিকারিং → বান্ডিলিং → অডিট → সুইং ফ্লোরে হস্তান্তর।

কাটিং এসওপির মূল নিয়ম:
• অনুমোদিত সিঙ্কেজ রিপোর্ট ছাড়া কাটিং সম্পূর্ণ নিষিদ্ধ।
• ম্যানুয়াল কাটিং নাইফ ব্যবহারের সময় মেটাল মেশ গ্লাভস পরা বাধ্যতামূলক।
• সেলভেজের ভেতরে মার্কার বহর সীমাবদ্ধ রাখতে হবে।
• কোনো পার্টস রি-কাট করার সময় একই শেড রোলের কাপড় ব্যবহার করতে হবে।`,
    keyTakeaway: 'Inspection → Relaxation → Grouping → Marker → Spreading → Cut → Numbering → Bundling',
    tags: ['workflow', 'sop', 'cutting procedure', 'safety', 'guidelines'],
  },
  {
    id: 17,
    questionNumber: '17',
    titleEn: 'What is Compliance in Garments? Explain 5S methodology.',
    titleBn: 'গার্মেন্টসে কমপ্লায়েন্স কী? 5S মেথডোলজি বিস্তারিত ব্যাখ্যা করুন।',
    category: 'Safety, PPE & 5S',
    answerEn: `Compliance means strictly conforming to national labor laws, fire safety regulations, buyer codes of conduct, environmental guidelines, and occupational health and safety standards.

Examples in Cutting: Fire exits kept unblocked, PPE usage, first aid availability, proper ventilation, and chemical safety.

5S Lean Workplace Organization System:
1. Sort (Seiri / বাছাইকরণ): Eliminate unnecessary items, scrap fabric, and broken tools from the work floor. Keep only what is needed.
2. Set in Order (Seiton / সুবিন্যস্তকরণ): Organize tools so they are easily found. "A place for everything and everything in its place" (designated holders for scissors, blades, chalk, tapes).
3. Shine (Seiso / পরিচ্ছন্নতা): Daily cleaning of cutting tables, machine vacuum paths, and floor to remove fabric dust and oil spills.
4. Standardize (Seiketsu / মানদণ্ড নির্ধারণ): Create standard procedures, visual checklists, and labeled zones across all cutting tables.
5. Sustain (Shitsuke / ধারাবাহিকতা বজায় রাখা): Train workers, conduct regular audits, and maintain self-discipline to sustain 5S every day.`,
    answerBn: `কমপ্লায়েন্স (Compliance) হলো দেশের শ্রম আইন, পরিবেশ আইন, বায়ারের আচরণবিধি (Code of Conduct) এবং পেশাগত স্বাস্থ্য ও নিরাপত্তা নীতি যথাযথভাবে মেনে কারখানা পরিচালনা করা।

5S মেথডোলজি (জাপানি কর্মস্থল ব্যবস্থাপনা):
১. Seiri (Sort - বাছাই): কাটিং ফ্লোর থেকে অপ্রয়োজনীয় জিনিস, পুরোনো কাপড়ের টুকরো ও বাতিল যন্ত্রপাতি সরিয়ে ফেলা।
২. Seiton (Set in Order - সুসজ্জিত করা): প্রয়োজনীয় সরঞ্জামগুলো (কাঁচি, টেপ, মার্কার পেপার) নির্দিষ্ট স্থানে সাজিয়ে রাখা।
৩. Seiso (Shine - পরিষ্কার-পরিচ্ছন্নতা): কাটিং টেবিল, মেশিন ও মেঝে নিয়মিত পরিষ্কার করা যাতে ফেব্রিক ডাস্ট জমে মেশিন নষ্ট বা পিছলে দুর্ঘটনা না ঘটে।
৪. Seiketsu (Standardize - মান নির্ধারণ): পরিষ্কার-পরিচ্ছন্নতার নিয়ম ও চেকলিস্ট তৈরি করে মানদণ্ড বজায় রাখা।
৫. Shitsuke (Sustain - নিয়মানুবর্তিতা): প্রতিদিন এই নিয়ম মেনে চলার জন্য অপারেটরদের প্রশিক্ষণ ও অভ্যাস গড়ে তোলা।`,
    tableData: {
      headers: ['ধাপ (5S Step)', 'জাপানি নাম', 'বাংলা অর্থ', 'কাটিং ফ্লোরে প্রয়োগ'],
      rows: [
        ['1S', 'Seiri (Sort)', 'বাছাই করা', 'অপ্রয়োজনীয় স্ক্র্যাপ ও ওয়েস্টেজ অপসারণ'],
        ['2S', 'Seiton (Set in Order)', 'সুসজ্জিত রাখা', 'কাঁচি, নাইফ ও টুলসের নির্ধারিত স্থান রাখা'],
        ['3S', 'Seiso (Shine)', 'পরিষ্কার করা', 'টেবিল ও মেশিনের ডাস্ট পরিষ্কার করা'],
        ['4S', 'Seiketsu (Standardize)', 'মানদণ্ড নির্ধারণ', 'স্ট্যান্ডার্ড চেকলিস্ট ও সাইনবোর্ড স্থাপন'],
        ['5S', 'Shitsuke (Sustain)', 'শৃঙ্খলা বজায় রাখা', 'নিয়মিত অডিট ও স্বতঃস্ফূর্ত অভ্যাস গঠন'],
      ],
    },
    keyTakeaway: '5S = Sort, Set in order, Shine, Standardize, Sustain. বাড়ায় সেফটি ও প্রোডাক্টিভিটি।',
    tags: ['compliance', '5s', 'lean', 'seiri', 'seiton', 'safety'],
  },
  {
    id: 18,
    questionNumber: '18',
    titleEn: 'What are the dangerous tools in cutting? Describe safety equipment (PPE) and essential safety rules.',
    titleBn: 'কাটিং বিভাগে বিপজ্জনক যন্ত্রপাতি কোনগুলো? সুরক্ষামূলক সরঞ্জাম (PPE) এবং নিরাপত্তা নিয়মাবলী বর্ণনা করুন।',
    category: 'Safety, PPE & 5S',
    answerEn: `Dangerous Tools & Machines in Cutting:
1. Straight Knife Cutting Machine (high-speed oscillating vertical blade)
2. Band Knife Cutting Machine (continuous high-speed band blade)
3. Round Knife Machine
4. End Cutter Blade
5. Fabric Drill & Notcher
6. Heavy Fabric Shears / Scissors
7. Auto Cutter moving beam and vacuum mechanism
8. Knife Sharpening Grinding Stones
9. Spreading Machine Carriage

Essential Safety Equipment (PPE):
• Steel Mesh / Cut-Resistant Gloves: Mandatory for the operator's non-cutting hand.
• Safety Shoes: Steel-toed shoes protecting feet from falling heavy rolls.
• Eye Protection / Safety Glasses: Shielding eyes from broken blade shards during sharpening.
• Dust Mask: Protecting respiratory system from fine fabric lint.
• Ear Protection: Protecting hearing near noisy vacuum blowers.

Essential Safety Rules:
1. Never operate straight knife or band knife without metal mesh glove.
2. Keep machine blade guards adjusted as low as possible to fabric lay surface.
3. Keep hands behind the cutting blade, never ahead of the cut path.
4. Immediately use the Emergency Stop (E-Stop) in case of any irregular sound or obstruction.
5. Disconnect electrical power before changing blades or performing maintenance.`,
    answerBn: `কাটিং বিভাগের বিপজ্জনক যন্ত্রপাতি ও সেফটি:

ঝুঁকিপূর্ণ যন্ত্রপাতি:
১. স্ট্রেইট নাইফ কাটিং মেশিন  ২. ব্যান্ড নাইফ কাটিং মেশিন  ৩. রাউন্ড নাইফ  ৪. ড্রিল মেশিন  ৫. এন্ড কাটার ব্লেড  ৬. সিএনসি অটো কাটার।

প্রয়োজনীয় PPE:
• মেটাল মেশ গ্লাভস (Metal Mesh Glove) – হাত কাটা থেকে সুরক্ষায় কাটারম্যানের জন্য শতভাগ বাধ্যতামূলক।
• সেফটি জুতো (Safety Shoes) – ভারী ফেব্রিক রোল পায়ে পড়া থেকে রক্ষা করতে।
• ডাস্ট মাস্ক (Dust Mask) – ফেব্রিকের ধুলাবালি থেকে ফুসফুসের সুরক্ষায়।
• সেফটি গগলস (Safety Glasses) – ব্লেড শার্পেনিংয়ের সময় আগুনের ফুলকি বা ব্লেডের কণা থেকে চোখের সুরক্ষায়।

নিরাপত্তা নির্দেশিকা:
১. মেটাল গ্লাভস ছাড়া নাইফ মেশিন চালানো যাবে না।
২. মেশিনের সেফটি গার্ড সবসময় প্লাই হাইটের সাথে নামিয়ে রাখতে হবে।
৩. ব্লেডের সামনের দিকে কখনো হাত রাখা যাবে না।
৪. জরুরি পরিস্থিতিতে সাথে সাথে লাল ইমার্জেন্সি বাটন (Emergency Stop) চাপতে হবে।`,
    keyTakeaway: 'Straight Knife অপারেটরে মেটাল মেশ গ্লাভস বাধ্যতামূলক। সেফটি গার্ড ছাড়া চালানো নিষেধ।',
    tags: ['safety', 'ppe', 'metal mesh gloves', 'straight knife', 'band knife', 'danger'],
  },
  {
    id: 19,
    questionNumber: '19',
    titleEn: 'What are the key responsibilities of a Cutting Executive/Manager and key cutting KPIs?',
    titleBn: 'একজন কাটিং এক্সিকিউটিভ বা ম্যানেজারের মূল দায়িত্ব এবং কাটিংয়ের প্রধান KPI গুলো কী কী?',
    category: 'Management, KPIs & SMED',
    answerEn: `Key Responsibilities of a Cutting Executive / Manager:
1. Daily cutting production planning and on-time execution to feed sewing lines.
2. Fabric consumption control to ensure actual fabric usage remains within or below budget.
3. Ratio and lay planning optimization with CAD team to maximize marker efficiency.
4. Monitoring fabric inspection reports, shade grouping, and shrinkage allowances.
5. Tracking fabric wastage categories (End Loss, Edge Loss, Splice Loss, Remnant Bits).
6. Supervising lay height, spreading tension, and cutting accuracy against master patterns.
7. Managing re-cut and short-cut components without stalling sewing lines.
8. Enforcing bundle integrity, serial numbering, and barcode tracking.
9. Ensuring operator safety, PPE compliance, and machine maintenance schedules.
10. Cross-department coordination with Merchandising, Fabric Store, CAD, Planning, and Sewing.

Key Cutting KPIs (Key Performance Indicators):
• Cutting Output / Productivity: Pieces cut per hour / per shift.
• Fabric Utilization & Marker Efficiency (ME %): Target 86%–90%+.
• Fabric Wastage %: Total cutting wastage below budgeted target (typically < 2.5% to 3%).
• Re-cut Percentage: Should be below 0.5% of total cut pieces.
• On-Time Feeding to Sewing: 100% on-time bundle readiness without sewing line starvation.
• Cutting Defect Rate / Accuracy: 99.5%+ first-pass panel audit pass rate.`,
    answerBn: `কাটিং এক্সিকিউটিভ/ম্যানেজারের মূল দায়িত্ব ও কেপিআই (KPI):

প্রধান দায়িত্বসমূহ:
১. সুইং লাইনের রিকোয়ারমেন্ট অনুযায়ী সময়মতো কাটিং নিশ্চিত করা।
২. ফেব্রিক কনজাম্পশন বাজেট সীমার মধ্যে রাখা ও ফেব্রিক সেভিংস বাড়ানো।
৩. সিএডি টিমের সাথে মার্কার দক্ষতা (Marker Efficiency) ও রেশিও প্ল্যান রিভিউ করা।
৪. ফেব্রিক রিলাক্সেশন, শেড গ্রুপিং ও সিঙ্কেজ পর্যবেক্ষণ।
৫. কাটিং অপচয় হ্রাস করা এবং এন্ড বিটস সঠিকভাবে হিসাব রাখা।
৬. সেফটি ও পিপিই পরিধান নিশ্চিত করা।

কাটিংয়ের প্রধান KPI:
• Marker Efficiency (ME%): মার্কার ব্যবহারের দক্ষতা (টার্গেট ৮৬%-৯০%+)।
• Cutting Wastage %: কাটিং ওয়েস্টেজ টার্গেটের মধ্যে রাখা (< ২.৫%-৩%)।
• Re-Cut %: রি-কাটের হার ০.৫% এর নিচে রাখা।
• On-Time Delivery to Sewing: সুইং লাইনে সময়মতো বান্ডিল সরবরাহ।
• Cutting Accuracy %: পার্টসের সাইজ ও মেজারমেন্ট সঠিক রাখা।`,
    keyTakeaway: 'KPI: Marker Efficiency (86%+), Wastage (<2.5%), Re-Cut (<0.5%), On-time sewing feed.',
    tags: ['kpi', 'manager responsibilities', 'cutting head', 'efficiency', 'wastage'],
  },
  {
    id: 20,
    questionNumber: '20',
    titleEn: 'What is Marker Efficiency? How is it calculated, and what factors affect it?',
    titleBn: 'মার্কার এফিসিয়েন্সি কী? এটি কীভাবে গণনা করা হয় এবং কোন বিষয়গুলো এতে প্রভাব ফেলে?',
    category: 'Marker & Fusing',
    answerEn: `Marker Efficiency (ME %) is the percentage of total marker surface area that is occupied by actual garment pattern pieces, compared to the total area of the marker.

Formula:
Marker Efficiency (%) = (Total Area of Garment Pattern Pieces ÷ Total Area of Marker) × 100
Where Total Area of Marker = Marker Length × Usable Fabric Width.

Factors Affecting Marker Efficiency:
1. Size Ratio Combination: Combining diverse sizes (small with large) allows pattern pieces to interlock cleanly.
2. Fabric Width: Wider fabrics generally yield higher nesting flexibility.
3. Pattern Geometry: Curved, irregular pattern pieces (e.g. bras, outerwear) produce more interstitial waste than rectangular pieces.
4. Fabric Grain Line Rules: Strict grain constraints limit pattern rotation (0° vs 180° vs any angle).
5. Stripe / Check Pattern Matching: Plaids and repeat stripes require fixed spacing, dropping efficiency by 5% to 15%.
6. CAD Nesting Software & Planner Skill: Modern AI auto-nesting algorithms combined with experienced CAD markers yield 1%–3% higher efficiency.`,
    answerBn: `মার্কার এফিসিয়েন্সি (ME) হলো মার্কারের মোট ক্ষেত্রফলের শতকরা কতভাগ কার্যকরভাবে পোশাকের প্যাটার্ন পার্টস দ্বারা আবৃত হয়েছে তার হিসাব।

সূত্র:
মার্কার এফিসিয়েন্সি (%) = (প্যাটার্ন পার্টসের মোট ক্ষেত্রফল ÷ মার্কারের মোট ক্ষেত্রফল) × ১০০

প্রভাব বিস্তারকারী উপাদানসমূহ:
১. সাইজ রেশিও: ছোট ও বড় সাইজের চমৎকার সমন্বয় মার্কার দক্ষতা বাড়ায়।
২. কাপড়ের কার্যকর বহর (Cuttable Width): বহর বেশি হলে পার্টস সহজে ইন্টারলক করা যায়।
৩. প্যাটার্নের শেপ: জটিল বা গোল আকারের পার্টসে অপচয় বেশি হয়।
৪. কাপড়ের গ্রেইন লাইন (Grain line): সোজা বা নির্দিষ্ট গ্রেইনে রাখতে হলে ঘোরানোর স্বাধীনতা কমে যায়।
৫. চেক ও স্ট্রাইপ ম্যাচিং: চেক মেলাতে হলে নির্দিষ্ট দূরত্ব বজায় রাখতে হয়, ফলে এফিসিয়েন্সি ৫-১৫% কমে যায়।
৬. মার্কার প্ল্যানারের দক্ষতা ও CAD সফটওয়্যার।`,
    formula: 'Marker Efficiency (%) = (Pattern Area ÷ Marker Area) × 100',
    keyTakeaway: 'মার্কারের মোট জায়গার কত শতাংশ কাপড়ে রূপান্তর হলো। আদর্শ মান ৮৬%-৯০%+',
    tags: ['marker efficiency', 'nesting', 'cad', 'pattern matching', 'grainline'],
  },
  {
    id: 21,
    questionNumber: '21',
    titleEn: 'What is Fabric Shrinkage Compensation? How is it adjusted during cutting or marker making?',
    titleBn: 'ফেব্রিক সিঙ্কেজ কমপেনসেশন কী? কাটিং বা মার্কার তৈরির সময় এটি কীভাবে সমন্বয় করা হয়?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Fabric Shrinkage Compensation is the proportional enlargement of pattern dimensions in CAD prior to cutting so that when the sewn garment shrinks during industrial laundering, garment dyeing, or finishing, it relaxes to the exact buyer-specified dimensions.

Calculation Example:
• Buyer required finished body length = 70 cm
• Tested fabric lengthwise shrinkage = 5% (0.05)
Formula for Pre-Wash Pattern Dimension:
Pre-Wash Dimension = Finished Dimension ÷ (1 − Shrinkage %)
= 70 ÷ (1 − 0.05) = 70 ÷ 0.95 = 73.68 cm

Adjustment in Practice:
In modern CAD systems (Lectra, Gerber, Optitex), the planner inputs the X-axis (lengthwise) and Y-axis (widthwise) shrinkage percentages into the system, which automatically scales all pattern grading and markers uniformly before printing.`,
    answerBn: `ফেব্রিক সিঙ্কেজ কমপেনসেশন (Shrinkage Compensation) হলো ওয়াশের পর কাপড় সংকুচিত হবে জেনে আগে থেকেই প্যাটার্নের দৈর্ঘ্য ও প্রস্থে আনুপাতিক হারে বড় করে নেওয়া, যাতে ওয়াশের পর পোশাকটি বায়ারের কাঙ্ক্ষিত মাপে নিখুঁতভাবে পৌঁছায়।

হিসাবের সূত্র:
প্রাক-কাটিং মাপ (Pre-Wash) = কাঙ্ক্ষিত ফাইনাল মাপ ÷ (১ − সিঙ্কেজ %)

উদাহরণ:
• ফাইনাল বডি লেন্থ লাগবে = ৭০ সেমি
• সিঙ্কেজ টেস্ট রিপোর্ট = ৫% (০.০৫)
প্যাটার্নে মাপ দিতে হবে = ৭০ ÷ (১ − ০.০৫) = ৭০ ÷ ০.৯৫ = ৭৩.৬৮ সেমি।

বাস্তব প্রয়োগ:
CAD সফটওয়্যারে Lengthwise (X) এবং Widthwise (Y) সিঙ্কেজ পার্সেন্টেজ ইনপুট দিলে সিস্টেম স্বয়ংক্রিয়ভাবে প্যাটার্ন স্কেলিং করে মার্কার তৈরি করে।`,
    formula: 'Pre-Wash Pattern Dimension = Finished Dimension ÷ (1 - Shrinkage %)',
    keyTakeaway: 'Pre-Wash Dimension = Finished ÷ (1 - Shrinkage%). CAD-এ X ও Y অক্ষে সমন্বয় করা হয়।',
    tags: ['shrinkage compensation', 'pre-wash calculation', 'cad scaling', 'tolerance'],
  },
  {
    id: 22,
    questionNumber: '22',
    titleEn: 'What precautions should be taken while cutting Check, Plaid, or Stripe Fabric?',
    titleBn: 'চেক বা স্ট্রাইপ ফেব্রিক কাটিং করার সময় কী কী বিশেষ সতর্কতা অবলম্বন করতে হয়?',
    category: 'Fabric Challenges & Denim/Knit',
    answerEn: `Precautions for Check / Stripe / Plaid Fabric:
1. Pattern Matching Criticality: Plaids and stripes must align perfectly at pockets, center front plackets, collars, side seams, and sleeve-to-body lines.
2. Pinning / Gridded Spreading: Table pins or laser line projectors must be used so stripe repeats fall directly on top of each other across every ply.
3. Low Ply Height: Reduce lay height (often 10–20 plies max, or even single-ply) to prevent ply shifting.
4. Minimal Spreading Tension: Excessive tension distorts repeat stripe squares into trapezoids.
5. Rigid Grain Line Placement: Pattern pieces must be pinned strictly square to stripe lines.
6. Block Cutting & Relaying: Complex components are often rough-cut (block-cut), pinned individually, and precision cut.
7. First Cut Audit: The first completed bundle must be sewn and verified before bulk cutting proceeds.`,
    answerBn: `চেক ও স্ট্রাইপ ফেব্রিক কাটিংয়ের সতর্কতা:
১. প্যাটার্ন ম্যাচিং নিশ্চিত করা: পকেট, কলার, বোতামের প্ল্যাকেট ও সাইড সিমের সাথে চেকের লাইন নিখুঁতভাবে মেলাতে হয়।
২. পিনিং ও লেজার গাইড: প্রতিটি প্লাইয়ের চেকের দাগ যেন নিচের প্লাইয়ের দাগের হুবহু ওপর বসে, সেজন্য পিন বা লেজার প্রজেক্টর ব্যবহার করা হয়।
৩. প্লাই সংখ্যা কম রাখা: লেয়ার বেশি হলে নিচের দিকে চেক সরে যায়, তাই সাধারণত ১০-২০ প্লাই বা সিঙ্গেল প্লাই কাটা হয়।
৪. টেনশন নিয়ন্ত্রণ: কাপড় বিছানোর সময় টান পড়লে চেকের বর্গাকার আকৃতি বেঁকে যায়।
৫. ব্লক কাটিং (Block Cutting): গুরুত্বপূর্ণ পার্টসগুলো আগে বড় করে কেটে নিয়ে পরে পিন মেরে নিখুঁতভাবে সাইজ করা হয়।`,
    keyTakeaway: 'পিনিং টেবিল, কম প্লাই হাইট, জিরো টেনশন ও পকেট-প্ল্যাকেটে পারফেক্ট ম্যাচিং।',
    tags: ['stripe matching', 'check fabric', 'plaid', 'pinning table', 'block cutting'],
  },
  {
    id: 23,
    questionNumber: '23',
    titleEn: 'What is Ply Slippage? Why does it occur and how can it be prevented?',
    titleBn: 'প্লাই স্লিপেজ (Ply Slippage) কী? এটি কেন ঘটে এবং কীভাবে প্রতিরোধ করা যায়?',
    category: 'Fabric Challenges & Denim/Knit',
    answerEn: `Ply Slippage occurs when one or more layers of fabric slide or shift out of alignment from their original stacked position during spreading, clamping, or knife cutting.

Main Causes:
1. Slippery fabric surfaces (silk, satin, nylon, micro-polyester).
2. Excessive lay height creating internal shear forces.
3. Dull cutting knife pushing fabric layers laterally instead of shearing them cleanly.
4. Inadequate vacuum pressure in automated CNC cutters.
5. Improper spreading machine carriage braking or uneven tension.

Preventive Measures:
1. Reduce the lay height to a manageable level.
2. Use inter-ply paper, perforated underlay paper, or plastic vacuum foil over the lay.
3. Ensure cutting knives are razor sharp with proper grit grinding frequency.
4. Increase vacuum holding pressure in automated cutting tables.
5. Use end clamps and mechanical edge weights during spreading.`,
    answerBn: `প্লাই স্লিপেজ হলো কাপড় স্প্রেডিং বা কাটিংয়ের সময় এক বা একাধিক লেয়ার তার নিজস্ব স্থান থেকে পিছলে বা সরে যাওয়া।

ঘটার কারণসমূহ:
১. পিচ্ছিল কাপড় (যেমন সিল্ক, স্যাটিন, নাইলন বা সিন্থেটিক)।
২. অতিরিক্ত উঁচু লে দেওয়া (Excessive lay height)।
৩. ভোঁতা কাটিং ব্লেড যা কাপড় কাটার বদলে ঠেলে সরিয়ে দেয়।
৪. অটো কাটারের ভ্যাকুয়াম প্রেশার কম থাকা।

প্রতিরোধের উপায়:
১. প্লাই সংখ্যা বা লে হাইট কমিয়ে ফেলা।
২. ভ্যাকুয়াম পলিথিন ও আন্ডারলে পেপার ব্যবহার করে বাতাস টেনে শক্ত রাখা।
৩. নিয়মিত নাইফ ধার দেওয়া (Sharp blade)।
৪. স্প্রেডিং টেবিলে পর্যাপ্ত ক্ল্যাম্প ও ওয়েট ব্যবহার করা।`,
    keyTakeaway: 'প্লাস্টিক ভ্যাকুয়াম, শার্প ব্লেড ও কম প্লাই হাইট ব্যবহারের মাধ্যমে স্লিপেজ প্রতিরোধ করা যায়।',
    tags: ['ply slippage', 'vacuum', 'blade sharpness', 'lay height', 'silk'],
  },
  {
    id: 24,
    questionNumber: '24',
    titleEn: 'If serious Shade Variation is found within the same roll or between rolls, what immediate actions should you take as Cutting Manager?',
    titleBn: 'একই রোলের ভেতর বা রোলের মাঝে মারাত্মক শেড ভেরিয়েশন পাওয়া গেলে কাটিং ম্যানেজার হিসেবে আপনার তাৎক্ষণিক পদক্ষেপ কী হবে?',
    category: 'Quality & 4-Point System',
    answerEn: `Immediate Actions for Serious Shade Variation:
1. Immediately halt spreading and cutting operations for the affected fabric lot.
2. Quarantine and tag the defective rolls to prevent accidental mixing.
3. Conduct 100% shade banding / shade grouping under standard D65 lightbox illumination.
4. Do NOT mix incompatible shade groups in the same lay; assign separate markers and lays for each approved shade group (e.g. Group A, Group B, Group C).
5. Prepare shade-segregated bundle cards and clear numbering stickers.
6. Notify Quality Control (QC), Merchandising, and Fabric Store managers with physical blanket swatches.
7. Seek buyer's formal approval / concession for marginal shade groups if necessary.
8. Maintain 100% traceability from fabric roll number down to sewn garment bundle.`,
    answerBn: `শেড ভেরিয়েশন দেখা দিলে তাৎক্ষণিক পদক্ষেপ:
১. সাথে সাথে উক্ত লটের স্প্রেডিং ও কাটিং বন্ধ করা।
২. সমস্যাযুক্ত রোলগুলো আলাদা (Quarantine) করে লেবেল লাগানো।
৩. স্ট্যান্ডার্ড লাইটবক্স (D65 light) এর নিচে সম্পূর্ণ কাপড়ের শেড গ্রুপিং বা শেড ব্যান্ডিং করা।
৪. এক লে-তে ভিন্ন ভিন্ন শেডের রোল কখনোই মেশানো যাবে না; শেড অনুযায়ী আলাদা মার্কার ও লে তৈরি করা (Group A, B, C)।
৫. প্রতিটি প্লাইয়ে নিখুঁত স্টিকার নাম্বারিং দেওয়া যাতে একই শেডের পার্টস দিয়েই সম্পূর্ণ পোশাক সেলাই হয়।
৬. মার্চেন্ডাইজার ও বায়ার প্রতিনিধিকে সোয়াচ (Swatch) দেখিয়ে লিখিত অনুমোদন নেওয়া।`,
    keyTakeaway: 'কাজ বন্ধ রাখা → শেড ব্যান্ডিং (A, B, C) → আলাদা লে কাটা → নিখুঁত প্লাই নাম্বারিং।',
    tags: ['shade variation', 'shade grouping', 'd65', 'quarantine', 'numbering'],
  },
  {
    id: 25,
    questionNumber: '25',
    titleEn: 'What are the common troubleshooting issues in an Auto Cutter (CNC Cutting Machine)?',
    titleBn: 'অটো কাটার মেশিনে সাধারণত কী কী সমস্যা (Troubleshooting) দেখা দেয়?',
    category: 'Marker & Fusing',
    answerEn: `Common Auto Cutter Troubleshooting Issues:
1. Vacuum Loss / Bridging: Puncture in surface polythene foil or clogged bristle bed reducing hold-down pressure, causing plies to shift.
2. Blade Deflection: Cutting blade bends when cutting thick lays or dense denim, causing top ply to be larger than bottom ply.
3. Blade Breakage: Caused by dull blade, excessive cutting speed, incorrect sharpening angle, or hitting table hardware.
4. Notch Defect / Missing Notches: Notch knife dull, miscalibrated depth, or clogged with lint.
5. Drill Hole Misalignment: Drill bit dull, motor heating, or wrong X-Y coordinates in marker file.
6. Dimensional Inaccuracy: Machine belt slippage, loose servo motor cables, or wrong shrinkage scale factors.
7. Bristle Block Damage: Cutting blade penetrating too deep into bristle blocks.
8. Overheating of Knife: Insufficient knife chiller lubrication or dull grinding stones.`,
    answerBn: `অটো কাটার মেশিনের সাধারণ সমস্যা ও সমাধান:
১. ভ্যাকুয়াম লস (Vacuum Loss): পলিথিন ফেটে যাওয়া বা ব্রিসল বেড জ্যাম হলে বাতাস টেনে রাখার ক্ষমতা কমে যায় এবং কাপড় নড়ে যায়।
২. ব্লেড ডিফ্লেকশন (Blade Deflection): ব্লেড বেঁকে গিয়ে ওপরের প্লাই ও নিচের প্লাইয়ের মাপের অমিল হওয়া।
৩. ব্লেড ভেঙে যাওয়া (Blade Breakage): অতিরিক্ত গতি, ভোঁতা নাইফ বা ভুল অ্যাঙ্গেলের কারণে।
৪. নচ ত্রুটি (Notch Fault): পার্টসের নচ বা কাটার গভীরতা কম-বেশি হওয়া।
৫. ড্রিল পয়েন্ট মিসপ্লেস: পকেট পজিশনের ড্রিল ফুটো ভুল জায়গায় হওয়া।
৬. কাটিং মেজারমেন্ট অমিল: বেল্ট লুজ বা সার্ভো মোটরের ত্রুটি।`,
    keyTakeaway: 'Vacuum loss, blade deflection, broken knife, notch fault, and drill misalignment.',
    tags: ['auto cutter', 'cnc cutting', 'troubleshooting', 'blade deflection', 'vacuum loss'],
  },
  {
    id: 26,
    questionNumber: '26',
    titleEn: 'What is the Fusing Process and Fusing Quality Control? What are its main parameters?',
    titleBn: 'ফিউজিং প্রসেস এবং ফিউজিং কোয়ালিটি কন্ট্রোল কী? এর প্রধান প্যারামিটারগুলো কী কী?',
    category: 'Marker & Fusing',
    answerEn: `Fusing is the process of bonding an interlining to garment fabric components (e.g. collars, cuffs, pocket flaps, waistbands, plackets) using controlled heat, pressure, and time in a continuous fusing press.

4 Main Fusing Parameters:
1. Temperature: Heat required to melt the resin adhesive (typically 120°C–160°C depending on resin type).
2. Pressure: Mechanical force applied by pressure rollers to press molten adhesive into fabric yarns (typically 2–5 bar).
3. Time / Dwell Time: Duration the fabric remains inside the heating chamber (typically 10–18 seconds).
4. Cooling Rate: Immediate cooling after rollers to solidify the resin bond without creasing.

Fusing Quality Checks:
• Peel Strength Test: Testing bond adhesion strength (using tensile gauge, minimum standard typically 2.5–3.5 N/5cm).
• Bubbling & Delamination: Inspecting for blisters or separation after wash.
• Resin Strike-Through: Checking if molten resin penetrates to fabric face or back.
• Dimensional Stability: Measuring shrinkage of collar/cuff panels before and after fusing.`,
    answerBn: `ফিউজিং হলো নিয়ন্ত্রিত তাপমাত্রা, চাপ এবং সময়ের মাধ্যমে কাপড়ের পার্টসের সাথে ইন্টারলাইনিং (Interlining) আঠালোভাবে জোড়া লাগানোর প্রক্রিয়া (যেমন কলার, কাফ, প্ল্যাকেট)।

প্রধান ৪টি প্যারামিটার:
১. তাপমাত্রা (Temperature): ১২০° থেকে ১৬০° সেলসিয়াস (রেজিন গলানোর জন্য)।
২. চাপ (Pressure): রোলার দ্বারা ২ থেকে ৫ বার চাপ।
৩. সময় (Dwell Time): ১০ থেকে ১৮ সেকেন্ড।
৪. কুলিং (Cooling): দ্রুত ঠান্ডা করে বন্ডিং শক্ত করা।

কোয়ালিটি পরীক্ষা:
• পিল স্ট্রেন্থ টেস্ট (Peel Strength): আঠার টানার শক্তি পরীক্ষা করা।
• বাবলিং ও সেপারেশন: ওয়াশের পর কলার বা কাফে ফোসকা পড়ে কিনা দেখা।
• স্ট্রাইক থ্রু: আঠা কাপড়ের সামনের দিকে ফুটে বের হওয়া রোধ করা।`,
    keyTakeaway: 'প্যারামিটার: Temperature, Pressure, Time & Cooling. টেস্ট: Peel strength & wash test.',
    tags: ['fusing', 'interlining', 'peel strength', 'temperature', 'collar fusing'],
  },
  {
    id: 27,
    questionNumber: '27',
    titleEn: 'What is SMED? How can it be applied in the Garments Cutting Room?',
    titleBn: 'SMED কী? কাটিং ফ্লোরে এটি কীভাবে প্রয়োগ করা যেতে পারে?',
    category: 'Management, KPIs & SMED',
    answerEn: `SMED stands for Single-Minute Exchange of Die. It is a Lean Manufacturing methodology developed by Shigeo Shingo designed to reduce equipment changeover/setup time to less than 10 minutes (single digit).

Application of SMED in Cutting Room:
1. Separate Internal vs External Activities:
   • Internal Activities (done only when table/cutter is stopped): Clamping lay, loading marker paper, aligning blade.
   • External Activities (done while the previous order is still cutting): Fetching rolls from store, unrolling fabric on relaxation racks, loading CAD marker file, preparing bundle tags.
2. Advance Tool Preparation: Keep replacement blades, sharpened scissors, paper tapes, and stickers pre-assembled on mobile trolleys.
3. Quick-Lock Roll Holders: Use pneumatic core-shafts on spreading machines for rapid 1-minute roll changes.
4. Moving Conveyor Cutting Tables: Cut on one table segment while spreading the next lay on the adjacent section, eliminating machine wait time.
5. Standardized Changeover Checklists: Standardized 5-minute setup checklist between cutting style changeovers.`,
    answerBn: `SMED (Single-Minute Exchange of Die) হলো লিন ম্যানুফ্যাকচারিংয়ের একটি পদ্ধতি যার উদ্দেশ্য হলো একটি স্টাইল থেকে অন্য স্টাইলে যাওয়ার মেশিন সেটআপের সময় ১০ মিনিটের নিচে (একক সংখ্যায়) নামিয়ে আনা।

কাটিং রুমে SMED প্রয়োগ:
১. ইন্টারনাল ও এক্সটারনাল কাজ আলাদা করা:
   • এক্সটারনাল কাজ (মেশিন চলাকালীনই সম্পন্ন করা): পরবর্তী লটের কাপড় এনে রিলাক্স করা, সিএডি মার্কার রেডি রাখা, বান্ডিল ট্যাগ লিখে রাখা।
   • ইন্টারনাল কাজ (মেশিন বন্ধ রেখে দ্রুত করা): নাইফ পরিবর্তন ও মার্কার পেপার পাতা।
২. কুইক রিলিজ ফেব্রিক শ্যাফট ব্যবহার: স্প্রেডার মেশিনে দ্রুত রোল চেঞ্জ করা।
৩. মোবাইল টুল ট্রলি: কাটিং নাইফ, কাঁচি ও ক্ল্যাম্প সবসময় হাতের কাছে প্রস্তুত রাখা।
৪. কনভেয়র টেবিল ব্যবহার: এক টেবিলে কাটিং চলার সময়েই পাশের টেবিলে পরবর্তী কাপড়ের লে রেডি রাখা।`,
    keyTakeaway: 'SMED সেটআপ টাইম ১০ মিনিটের নিচে কমায়। মেশিন বন্ধ না রেখে এক্সটারনাল কাজ আগেই শেষ করা।',
    tags: ['smed', 'lean', 'changeover time', 'efficiency', 'cutting room setup'],
  },
  {
    id: 28,
    questionNumber: '28',
    titleEn: 'How do you manage Short-Cut or Re-Cut in the Cutting Department?',
    titleBn: 'কাটিং বিভাগে শর্ট-কাট বা রি-কাট (Re-Cut) কীভাবে সুষ্ঠুভাবে পরিচালনা করবেন?',
    category: 'Cutting Workflow & SOP',
    answerEn: `Re-cut Management Procedure (8 Standard Steps):
1. Defect Identification: Defective, oil-stained, shaded, or dimensionally failed panel rejected by Quality Checker or Sewing Line.
2. Formal Re-cut Slip: An authorized Re-cut Slip is issued detailing Order Number, Style, Color, Size, Component Name (e.g. Sleeve, Collar), Defect Reason, and Quantity.
3. Exact Shade Band Matching: Locate the identical fabric roll or reserved end-bit matching the original ply's shade lot.
4. Proper Grain Line Alignment: Align template with true warp/weft grain line to prevent twisting.
5. Precision Cutting: Cut using band knife or precision straight knife according to master acrylic pattern.
6. Numbering Transfer: Apply replacement sticker matching the exact bundle number and ply index.
7. Quality Audit: Inspect re-cut panel before releasing it to the sewing line.
8. Root Cause Analysis: Log re-cut reasons into daily report to identify whether defect originated from fabric mill, spreading, or cutting error.`,
    answerBn: `রি-কাট (Re-Cut) ম্যানেজমেন্টের ৮টি ধাপ:
১. রিজেকশন শনাক্তকরণ: ফেব্রিক ডিফেক্ট বা কাটিং মিসটেকের কারণে বাতিল পার্টস চিহ্নিত করা।
২. অনুমোদিত রি-কাট স্লিপ: অর্ডার নম্বর, স্টাইল, কালার, সাইজ ও পার্টসের নাম উল্লেখ করে স্লিপ প্রদান।
৩. একই শেড রোলের ফেব্রিক ব্যবহার: মূল প্লাইয়ের সাথে হুবহু শেড মেলানো বাধ্যতামূলক।
৪. গ্রেইন লাইন বজায় রাখা: কাপড়ের সোজা গ্রেইনে প্যাটার্ন বসিয়ে কাটা।
৫. নিখুঁত কাটিং: ব্যান্ড নাইফ দিয়ে মূল এক্রিলিক প্যাটার্ন অনুযায়ী কাটা।
৬. অরিজিনাল স্টিকার নাম্বার প্রদান: আগের বান্ডিলের একই প্লাই নাম্বার লাগানো।
৭. কিউসি চেক: সুইংয়ে হস্তান্তরের আগে মাপ পরীক্ষা করা।
৮. কারণ বিশ্লেষণ: রি-কাট কমানোর জন্য দৈনিক বিশ্লেষণ ও রেকর্ড সংরক্ষণ।`,
    keyTakeaway: 'অফিসিয়াল রি-কাট স্লিপ + একই শেড বিটস + সঠিক গ্রেইন লাইন + অরিজিনাল প্লাই নাম্বার।',
    tags: ['re-cut', 'short-cut', 'shade matching', 'bundle control', 'defect replacement'],
  },
  {
    id: 29,
    questionNumber: '29',
    titleEn: 'Why are WIP (Work in Progress) and Bundle Control important in the Cutting Room?',
    titleBn: 'কাটিং রুমে WIP (Work in Progress) এবং বান্ডিল কন্ট্রোল কেন অত্যন্ত গুরুত্বপূর্ণ?',
    category: 'Cutting Workflow & SOP',
    answerEn: `WIP (Work in Progress) and Bundle Control are the lifeblood of garment production flow:

Importance of Bundle Control:
1. Prevents Size & Shade Mix-Ups: Every cut panel carries an explicit bundle ticket and ply number (e.g. Bundle #12, Size M, Plies 1–20).
2. Maintains Parts Traceability: Front, back, sleeve, and collar cut from the same ply stay together during sewing.
3. Accurate Line Balancing: Ensures operators receive correct quantities without shortages or sewing line blockages.

Importance of WIP Control:
1. Smoothes Production Flow: Prevents bottleneck piles in cutting and starvation in sewing lines.
2. Optimizes Floor Space: Prevents excessive floor crowding and fabric creasing/soiling.
3. Controls Capital Lock-Up: Keeps tied-up fabric inventory to optimal 2 to 3 days of sewing consumption.
4. Enhances First-In, First-Out (FIFO): Guarantees that earlier cuts are sewn first, avoiding aging or shading on shelves.`,
    answerBn: `কাটিংয়ে WIP এবং বান্ডিল নিয়ন্ত্রণের গুরুত্ব:

বান্ডিল কন্ট্রোলের গুরুত্ব:
১. সাইজ ও শেড মিক্সিং প্রতিরোধ: প্রতিটি পার্টসে বান্ডিল ও প্লাই স্টিকার থাকায় ভিন্ন সাইজ বা শেড মেশে না।
২. ট্রেসেবিলিটি বজায় রাখা: কাপড়ের কোন রোলের কোন প্লাই থেকে কাটা হয়েছে তা সহজেই বের করা যায়।
৩. সঠিক গণনা: সুইং লাইনে কাপড় কম পড়ার ঝুঁকি থাকে না।

WIP (Work in Progress) নিয়ন্ত্রণের গুরুত্ব:
১. ব্যালেন্সড প্রোডাকশন: কাটিং ফ্লোরে অতিরিক্ত জটলা তৈরি হয় না এবং সুইং লাইনও বসে থাকে না।
২. ফ্লোর স্পেস সাশ্রয়: মেঝেতে কাটা কাপড়ের স্তূপ জমলে কাপড় ময়লা বা নষ্ট হওয়ার ঝুঁকি থাকে।
৩. FIFO (First In First Out): আগে কাটা পার্টস আগে সুইংয়ে দেওয়া নিশ্চিত করে। সাধারণত ২-৩ দিনের কাটিং স্টক আদর্শ।`,
    keyTakeaway: 'বান্ডিল কন্ট্রোল সাইজ/শেড মিক্সিং রোধ করে; WIP কন্ট্রোল সুইং লাইনের নিরবচ্ছিন্ন প্রবাহ রাখে।',
    tags: ['wip', 'bundle control', 'fifo', 'size mixing', 'numbering'],
  },
  {
    id: 30,
    questionNumber: '30',
    titleEn: 'Describe the eco-social importance and impact of the Ready-Made Garments (RMG) sector in Bangladesh.',
    titleBn: 'বাংলাদেশে তৈরি পোশাক (RMG) খাতের পরিবেশগত ও সামাজিক (Eco-Social) গুরুত্ব ও প্রভাব আলোচনা করুন।',
    category: 'RMG & Bangladesh Economy',
    answerEn: `The RMG sector plays a transformative role across social progress and environmental sustainability:

1. Social Impact:
• Women Empowerment: Transitioned millions of rural women into salaried professionals with personal bank accounts and dignity.
• Poverty Eradication: Worker incomes support family nutrition, housing, and healthcare across rural villages through remittances.
• Education & Health: Lowered child labor and boosted girls' school enrollment rates nationwide.
• Urbanization & Mobility: Accelerated infrastructural development across Dhaka, Gazipur, and Chattogram industrial belts.

2. Environmental Impact & Green Revolution:
• LEED Certified Green Factories: Bangladesh houses over 200+ USGBC LEED certified green garment factories (highest in the world), including top Platinum rated facilities.
• Water & Chemical Management: Adoption of Zero Liquid Discharge (ZLD) and advanced Effluent Treatment Plants (ETP).
• Renewable Energy: Widespread installation of rooftop solar photovoltaic arrays on factory roofs.
• Circular Fashion: Increasing recycling of cutting room scrap clips (Jhoot) into recycled cotton yarns.`,
    answerBn: `বাংলাদেশের আরএমজি খাতের সামাজিক ও পরিবেশগত (Eco-Social) গুরুত্ব:

সামাজিক প্রভাব:
১. গ্রামীণ নারীদের অর্থনৈতিক মুক্তি ও ক্ষমতায়ন।
২. কোটি মানুষের দারিদ্র্য বিমোচন ও জীবনযাত্রার মানোন্নয়ন।
৩. বাল্যবিবাহ হ্রাস ও কন্যা শিশুদের স্কুলে পড়ার হার বৃদ্ধি।
৪. শহরমুখী অর্থনৈতিক গতিশীলতা তৈরি।

পরিবেশগত প্রভাব (সবুজ বিপ্লব):
১. বিশ্বের শীর্ষস্থানীয় LEED সার্টিফাইড গ্রিন ফ্যাক্টরি (২০০টিরও বেশি পরিবেশবান্ধব কারখানা)।
২. আধুনিক ETP প্ল্যান্টের মাধ্যমে শিল্প বর্জ্য ও পানি পরিশোধন।
৩. কারখানার ছাদে সোলার প্যানেল বসিয়ে সৌরবিদ্যুৎ উৎপাদন।
৪. সার্কুলার ফ্যাশন ও কাটিংয়ের ফেলে দেওয়া কাপড়ের টুকরো (ঝুট) রিসাইক্লিং করে নতুন সুতা তৈরি।`,
    keyTakeaway: 'বিশ্বের সর্বাধিক LEED গ্রিন ফ্যাক্টরি, নারী উন্নয়ন ও সার্কুলার টেক্সটাইল রিসাইক্লিং।',
    tags: ['eco-social', 'green factories', 'leed', 'sustainability', 'women empowerment'],
  },
  {
    id: 31,
    questionNumber: '31',
    titleEn: 'What is the economic importance of the Ready-Made Garments (RMG) sector in Bangladesh? (10 Core Points)',
    titleBn: 'বাংলাদেশের অর্থনীতিতে তৈরি পোশাক খাতের গুরুত্ব কী? (১০টি মূল পয়েন্ট)',
    category: 'RMG & Bangladesh Economy',
    answerEn: `10 Core Economic Contributions of Bangladesh RMG:
1. Export Earnings: Generates over $45+ Billion USD annually, contributing > 80% of national export earnings.
2. Employment Engine: Directly employs over 4 million workers and supports 15+ million family dependents.
3. GDP Growth: Directly contributes over 10%–11% to the Gross Domestic Product of Bangladesh.
4. Foreign Currency Reserves: Serves as the primary source of foreign exchange keeping the Bangladesh Taka stable.
5. Backward Linkage Industry Boom: Fostered domestic spinning, weaving, knitting, dyeing, packaging, and accessories sectors.
6. Banking & Insurance Growth: Powers commercial banking through Letters of Credit (LC) and marine insurance.
7. Transportation & Logistics: Generates immense freight demand for ports, shipping lines, container depots, and trucking.
8. Government Revenue: Contributes substantial tax revenues through income tax, corporate tax, and port handling fees.
9. Rural-Urban Remittance: Injected billions into rural village economies, transforming small businesses and agriculture.
10. Global Diplomatic & Trade Standing: Placed Bangladesh as an indispensable global trading partner with EU, US, and UK.`,
    answerBn: `অর্থনীতিতে তৈরি পোশাক খাতের ১০টি মূল অবদান:
১. সর্বোচ্চ রপ্তানি আয়: জাতীয় রপ্তানি আয়ের ৮০% এরও বেশি আসে এই খাত থেকে।
২. ব্যাপক কর্মসংস্থান: ৪০ লাখের বেশি মানুষের সরাসরি রুটি-রুজির উৎস।
৩. জিডিপিতে বড় অবদান: জাতীয় জিডিপির প্রায় ১০-১১% পোশাক খাত থেকে আসে।
৪. বৈদেশিক মুদ্রার রিজার্ভ: দেশের কেন্দ্রীয় ব্যাংকের রিজার্ভের মূল চালিকাশক্তি।
৫. ব্যাকওয়ার্ড লিংকেজ বিকাশ: সুতা, ডাইং ও এক্সেসরিজ শিল্পের বিকাশ ঘটিয়েছে।
৬. ব্যাংকিং ও বীমা খাত: এলসি ও ট্রানজাকশনের মাধ্যমে ব্যাংকিং খাতকে সচল রাখে।
৭. পোর্ট ও পরিবহন ব্যবস্থা: কন্টেইনার, বন্দর ও সড়ক পরিবহন ব্যবসার বিকাশ।
৮. সরকারি রাজস্ব: ট্যাক্স, ভ্যাট ও পোর্ট চার্জের মাধ্যমে রাজস্ব প্রদান।
৯. গ্রামীণ অর্থনীতির চাঙ্গা ভাব: শ্রমিকদের পাঠানো টাকায় গ্রামীণ ব্যবসা-বাণিজ্য প্রসার।
১০. বৈশ্বিক বাণিজ্য অংশীদারিত্ব: বিশ্বদরবারে বাণিজ্যিকভাবে বাংলাদেশের ভাবমূর্তি উজ্জ্বল।`,
    keyTakeaway: '৮০%+ রপ্তানি, ৪০ লাখ+ চাকরি, ১০%+ জিডিপি এবং বৈদেশিক মুদ্রার মূল উৎস।',
    tags: ['economic importance', 'gdp', 'export', 'foreign reserve', 'backward linkage'],
  },
  {
    id: 32,
    questionNumber: '32',
    titleEn: 'What is Skew in fabric?',
    titleBn: 'কাপড়ে স্কিউ (Skew) কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Skew in fabric is a structural distortion where the crosswise filling yarns (in woven fabric) or knitted courses (in knit fabric) are not perpendicular (at 90 degrees) to the lengthwise warp yarns/wales, but instead lie at an angular, diagonal slant across the fabric width.`,
    answerBn: `কাপড়ে স্কিউ (Skew) হলো এমন একটি গঠনগত বিকৃতি যেখানে কাপড়ের আড়াআড়ি সুতা বা কোর্সগুলো (Weft/Courses) লম্বালম্বি সুতার (Warp/Wales) সাথে ৯০ ডিগ্রি সমকোণে না থেকে এক পাশে তির্যক বা কোণাকুণিভাবে অবস্থান করে।`,
    keyTakeaway: 'Crosswise yarns lie diagonally rather than perpendicular to length.',
    tags: ['skew', 'distortion', 'diagonal distortion', 'fabric faults'],
  },
  {
    id: 33,
    questionNumber: '33',
    titleEn: 'What is Bow in fabric?',
    titleBn: 'কাপড়ে বো (Bow) কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Bow in fabric is a distortion where the crosswise filling yarns or knitted courses form a curved, arched, or bow-shaped line instead of a straight horizontal line across the fabric width. It typically curves in the center relative to the edges.`,
    answerBn: `কাপড়ে বো (Bow) হলো এমন একটি বিকৃতি যেখানে কাপড়ের আড়াআড়ি সুতাগুলো সোজা সরলরেখায় না থেকে ধনুকের মতো বাঁকা বা চাপ সৃষ্টি করে কাপড়ের প্রস্থ বরাবর বিস্তৃত থাকে।`,
    keyTakeaway: 'Crosswise yarns curve like an archery bow instead of forming a straight line.',
    tags: ['bow', 'curved distortion', 'fabric faults', 'finishing fault'],
  },
  {
    id: 34,
    questionNumber: '34',
    titleEn: 'What is the fundamental difference between Skew and Bow?',
    titleBn: 'স্কিউ এবং বো এর মধ্যে মৌলিক পার্থক্য কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Difference between Skew and Bow:
• Skew is a DIAGONAL or angular distortion where the crosswise yarn tilts linearly from one selvedge to the other.
• Bow is a CURVED or arched distortion where the crosswise yarn sags or arches in the center while remaining aligned at both selvedges.`,
    answerBn: `Skew বনাম Bow পার্থক্য:
• Skew হলো তির্যক বা কোণাকুণি বিকৃতি (Diagonal tilt)।
• Bow হলো ধনুকের মতো অর্ধচন্দ্রাকৃতি বা বাঁকা বিকৃতি (Curved arch)।`,
    keyTakeaway: 'Skew = তির্যক বা ডায়াগোনাল | Bow = ধনুকের মতো বাঁকা বা কার্ভড।',
    tags: ['difference', 'skew vs bow', 'fabric distortion'],
  },
  {
    id: 35,
    questionNumber: '35',
    titleEn: 'What is Twisting or Spirality in knitted fabric?',
    titleBn: 'নিট কাপড়ে টুইস্টিং বা স্পাইরালিটি (Spirality) কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Twisting or Spirality is the dimensional fault observed in circular knitted fabrics and garments where the knitted loops and side seams rotate or twist around the body axis away from their intended vertical alignment after relaxation or washing.`,
    answerBn: `স্পাইরালিটি (Spirality) বা টুইস্টিং হলো সার্কুলার নিট কাপড়ে লুপের অভ্যন্তরীণ টেনশনের কারণে কাপড়ের সাইড সিম বা উল্লম্ব রেখাগুলো ওয়াশ বা রিলাক্সেশনের পর নিজের অবস্থান থেকে একপাশে ঘুরে বা মোচড় দিয়ে যাওয়া।`,
    keyTakeaway: 'সাইড সিম ঘুরে যাওয়া বা কাপড়ে মোচড় তৈরি হওয়া।',
    tags: ['spirality', 'twisting', 'knit fabric', 'side seam twist'],
  },
  {
    id: 36,
    questionNumber: '36',
    titleEn: 'What causes fabric Skew?',
    titleBn: 'কাপড়ে স্কিউ (Skew) হওয়ার কারণগুলো কী কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Causes of Fabric Skew:
1. Uneven tension across the two sides during stentering or compacting.
2. Misaligned rollers or uneven nip pressure in dyeing and padder machines.
3. Torque in high-twist yarns trying to untwist.
4. Uneven feeding during drying or winding.
5. In circular knitting, improper take-down tension roll alignment.`,
    answerBn: `স্কিউ হওয়ার প্রধান কারণ:
১. স্টেনটার বা কম্প্যাক্টর মেশিনে কাপড়ের দুই মাথায় অসমান টান (Uneven tension) পড়া।
২. ডাইং ও ফিনিশিং রোলারগুলোর মধ্যে অ্যালাইনমেন্ট বা প্রেসারের অমিল।
৩. হাই-টুইস্ট সুতার নিজস্ব ঘূর্ণন প্রবণতা।
৪. ফেব্রিক রোলিং বা উইন্ডিংয়ের সময় অসমান গতি।`,
    keyTakeaway: 'স্টেনটারিং বা ফিনিশিংয়ে রোলারের অসমান টান ও ডাইংয়ের অসম চাপ।',
    tags: ['causes of skew', 'stenter', 'finishing', 'tension'],
  },
  {
    id: 37,
    questionNumber: '37',
    titleEn: 'What causes Bow in fabric?',
    titleBn: 'কাপড়ে বো (Bow) হওয়ার কারণগুলো কী কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Causes of Fabric Bow:
1. Speed variation between the center and selvedges of fabric passing through drying cylinders or stenter frames.
2. Differential friction across expander rollers or bow bars.
3. Selvedges held tightly by stenter pins while the middle lags behind or advances ahead.
4. Uneven padder roller crowning pressure across the machine width.`,
    answerBn: `বো (Bow) হওয়ার কারণ:
১. শুকানোর সিলিন্ডার বা স্টেনটারে কাপড়ের মাঝখানের অংশের তুলনায় দুই ধারের গতি কম বা বেশি হওয়া।
২. স্টেনটার পিনে দুই ধার শক্তভাবে ধরা থাকার সময় মাঝখানের অংশ ঢিলে থাকা বা এগিয়ে যাওয়া।
৩. ফিনিশিং রোলারের মাঝখানে অতিরিক্ত বা কম ঘর্ষণ হওয়া।`,
    keyTakeaway: 'কাপড়ের মাঝখান এবং দুই ধারের গতির পার্থক্যের কারণে ধনুকের মতো বেঁকে যায়।',
    tags: ['causes of bow', 'stenter pins', 'differential speed', 'finishing'],
  },
  {
    id: 38,
    questionNumber: '38',
    titleEn: 'What causes Twisting or Spirality in knit fabric?',
    titleBn: 'নিট কাপড়ে টুইস্টিং বা স্পাইরালিটির কারণ কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Causes of Twisting or Spirality:
1. High twist liveliness in single jersey yarns (unbalanced torsional torque).
2. Number of feeders in circular knitting machines (higher number of feeds = higher spirality angle).
3. Machine gauge and direction of cylinder rotation relative to yarn twist (Z-twist vs S-twist).
4. Insufficient relaxation and improper heat-setting during finishing.
5. Vigorous agitation and heat during garment washing.`,
    answerBn: `টুইস্টিং বা স্পাইরালিটির কারণ:
১. সুতার অভ্যন্তরীণ অতিরিক্ত মোচড় বা টুইস্ট (Yarn Twist Liveliness)।
২. সার্কুলার নিটিং মেশিনে বেশি সংখ্যক ফিডার (Feeder) থাকা।
৩. সুতার টুইস্ট ডিরেকশন (S বা Z) এবং মেশিনের রোটেশন ডিরেকশনের অমিল।
৪. ফিনিশিংয়ে সঠিক হিট-সেটিং ও রিলাক্সেশনের অভাব।
৫. ওয়াশিংয়ের সময় অতিরিক্ত তাপমাত্রা ও মেকানিক্যাল অ্যাজিটেশন।`,
    keyTakeaway: 'সিঙ্গেল জার্সিতে সুতার আনব্যালেন্সড টুইস্ট ও নিটিং ফিডারের সংখ্যা মূল কারণ।',
    tags: ['causes of spirality', 'yarn twist', 'circular knitting', 'feeders'],
  },
  {
    id: 39,
    questionNumber: '39',
    titleEn: 'How do you calculate Skew percentage? Provide formula and calculation for fabric width = 60 inches and maximum skew = 2 inches.',
    titleBn: 'স্কিউ পার্সেন্টেজ কীভাবে বের করবেন? সূত্রসহ ৬০ ইঞ্চি বহর ও ২ ইঞ্চি স্কিউয়ের হিসাব দিন।',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Formula for Skew Percentage:
Skew (%) = (Maximum Skew Deviation ÷ Fabric Width) × 100

Calculation Example:
• Fabric Width = 60 inches
• Maximum Skew Deviation = 2 inches
Skew (%) = (2 ÷ 60) × 100 = 3.33%

Conclusion:
The fabric has a 3.33% skew. If the buyer tolerance is typically maximum 2% or 3%, this lot must be realigned via weft straightener/compactor before cutting.`,
    answerBn: `স্কিউ পার্সেন্টেজের সূত্র:
Skew (%) = (সর্বোচ্চ স্কিউ বিচ্যুতি ÷ কাপড়ের মোট বহর) × ১০০

উদাহরণ:
• কাপড়ের বহর = ৬০ ইঞ্চি
• স্কিউয়ের পরিমাণ = ২ ইঞ্চি
হিসাব:
Skew (%) = (২ ÷ ৬০) × ১০০ = ৩.৩৩%

ফলাফল:
উক্ত কাপড়ে ৩.৩৩% স্কিউ রয়েছে। বায়ারের স্ট্যান্ডার্ড ৩% হলে এই কাপড় পুনরায় স্টেনটারে সোজা করতে হবে।`,
    formula: 'Skew % = (Maximum Skew Deviation ÷ Fabric Width) × 100',
    keyTakeaway: 'Skew % = (Deviation ÷ Width) × 100 = (2 ÷ 60) × 100 = 3.33%',
    tags: ['skew formula', 'calculation', 'deviation', 'percentage', 'math'],
  },
  {
    id: 40,
    questionNumber: '40',
    titleEn: 'How do you measure fabric Skew practically step-by-step?',
    titleBn: 'ব্যবহারিকভাবে কাপড়ে স্কিউ কীভাবে ধাপে ধাপে পরিমাপ করা হয়?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Step-by-step Measurement of Fabric Skew:
1. Sample Conditioning: Fully relax the fabric sample flat on a smooth surface for at least 4 hours.
2. Select Reference Point: Mark a reference crosswise weft yarn or course using fabric chalk.
3. Draw Perpendicular Line: Using a large 90° T-square ruler, draw a line perpendicular to the selvedge from one side.
4. Measure Distance: Measure the maximum distance (deviation in inches/cm) between the 90° reference line and the actual course line at the opposite selvedge.
5. Calculate: Divide measured deviation by full fabric width and multiply by 100.`,
    answerBn: `স্কিউ পরিমাপের বাস্তবসম্মত ধাপ:
১. ফেব্রিক রিলাক্সেশন: কাপড়টি মসৃণ সমতল টেবিলে সম্পূর্ণ টানমুক্তভাবে ৪ ঘণ্টা ছড়িয়ে রাখুন।
২. রেফারেন্স লাইন নির্ধারণ: যেকোনো একটি সুতা বা কোর্স বরাবর চক দিয়ে দাগ টানুন।
৩. সমকোণ তৈরি: একটি বড় T-Square স্কেল সেলভেজের সাথে ৯০ ডিগ্রিতে ধরে সোজা দাগ টানুন।
৪. বিচ্যুতি পরিমাপ: ৯০ ডিগ্রির দাগ থেকে আসল সুতার দাগের মধ্যবর্তী দূরত্ব পরিমাপ করুন।
৫. সূত্র অনুযায়ী স্কিউ পার্সেন্টেজ হিসাব করুন।`,
    keyTakeaway: 'T-Square স্কেল দিয়ে সেলভেজের সাথে ৯০° সোজা লাইন টেনে বিচ্যুতি মাপা হয়।',
    tags: ['measure skew', 't-square', 'practical steps', 'selvedge'],
  },
  {
    id: 41,
    questionNumber: '41',
    titleEn: 'What is the standard test method for Bow and Skew in fabric?',
    titleBn: 'কাপড়ে বো এবং স্কিউ পরীক্ষার আন্তর্জাতিক স্ট্যান্ডার্ড টেস্ট মেথড কোনটি?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `ASTM D3882 is the globally recognized Standard Test Method for determining Bow and Skew in textile fabrics (both woven and knitted).`,
    answerBn: `টেক্সটাইল ফেব্রিকের বো (Bow) এবং স্কিউ (Skew) পরিমাপের আন্তর্জাতিক মানসম্মত পরীক্ষা পদ্ধতি হলো ASTM D3882।`,
    keyTakeaway: 'ASTM D3882 হলো বো এবং স্কিউ টেস্টের আন্তর্জাতিক স্ট্যান্ডার্ড।',
    tags: ['astm d3882', 'bow and skew test', 'standard test method'],
  },
  {
    id: 42,
    questionNumber: '42',
    titleEn: 'What is the standard test method for Skew Change / Spirality in garments after laundering?',
    titleBn: 'লন্ডারিং বা ওয়াশের পর পোশাকে স্কিউ বা স্পাইরালিটি পরিবর্তনের টেস্ট মেথড কোনটি?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `AATCC TM179 (Test Method for Skew Change in Fabric After Home Laundering) is the standard method used to evaluate skew and spirality changes in fabrics and garments after washing.`,
    answerBn: `বাসাবাড়িতে ধোয়ার পর কাপড়ে স্কিউ বা স্পাইরালিটির তারতম্য যাচাই করার আন্তর্জাতিক পদ্ধতি হলো AATCC TM179।`,
    keyTakeaway: 'AATCC TM179 হলো ওয়াশের পর স্কিউ পরিবর্তনের টেস্ট মেথড।',
    tags: ['aatcc tm179', 'skew change', 'spirality after wash', 'laundering test'],
  },
  {
    id: 43,
    questionNumber: '43',
    titleEn: 'What is Shrinkage in fabric?',
    titleBn: 'ফেব্রিক সিঙ্কেজ (Shrinkage) কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Shrinkage is the percentage reduction in fabric dimensions (length, width, or both) after washing, steaming, drying, or industrial finishing processes.`,
    answerBn: `ফেব্রিক সিঙ্কেজ হলো ধোয়া, শুকানো বা ফিনিশিং প্রক্রিয়ার পর কাপড়ের দৈর্ঘ্য বা প্রস্থে সংকুচিত বা হ্রাস পাওয়ার শতকরা হার।`,
    keyTakeaway: 'ওয়াশ বা শুকানোর পর কাপড়ের আকার সংকুচিত হওয়ার শতকরা হার।',
    tags: ['shrinkage', 'definition', 'fabric shrinkage', 'dimensional change'],
  },
  {
    id: 44,
    questionNumber: '44',
    titleEn: 'What are the main types of fabric shrinkage?',
    titleBn: 'ফেব্রিক সিঙ্কেজ প্রধানত কত প্রকার ও কী কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `The two primary types of fabric shrinkage are:
1. Lengthwise Shrinkage: Dimensional reduction along the fabric length / warp / wale direction.
2. Widthwise Shrinkage: Dimensional reduction across the fabric width / weft / course direction.`,
    answerBn: `ফেব্রিক সিঙ্কেজ মূলত ২ প্রকার:
১. লেন্থওয়াইজ সিঙ্কেজ (Lengthwise Shrinkage): কাপড়ের লম্বালম্বি বা দৈর্ঘ্যের দিকে কমে যাওয়া।
২. উইথওয়াইজ সিঙ্কেজ (Widthwise Shrinkage): কাপড়ের আড়াআড়ি বা প্রস্থের দিকে কমে যাওয়া।`,
    keyTakeaway: '১. Lengthwise Shrinkage (দৈর্ঘ্য)  ২. Widthwise Shrinkage (প্রস্থ)',
    tags: ['types of shrinkage', 'lengthwise', 'widthwise'],
  },
  {
    id: 45,
    questionNumber: '45',
    titleEn: 'How do you calculate Lengthwise Shrinkage? Example: Original = 50 cm, After Wash = 47 cm.',
    titleBn: 'লেন্থওয়াইজ সিঙ্কেজ কীভাবে বের করবেন? উদাহরণ: আগের দৈর্ঘ্য = ৫০ সেমি, ধোয়ার পর = ৪৭ সেমি।',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Lengthwise Shrinkage Formula:
Length Shrinkage (%) = [(Original Length − After Wash Length) ÷ Original Length] × 100

Calculation:
• Original Length = 50 cm
• After Wash Length = 47 cm
Shrinkage (%) = [(50 − 47) ÷ 50] × 100
= (3 ÷ 50) × 100 = 6%

Conclusion:
Lengthwise shrinkage is 6%.`,
    answerBn: `লেন্থওয়াইজ সিঙ্কেজ সূত্র:
সিঙ্কেজ (%) = [(পূর্বের দৈর্ঘ্য − ওয়াশের পরের দৈর্ঘ্য) ÷ পূর্বের দৈর্ঘ্য] × ১০০

হিসাব:
• আগের দৈর্ঘ্য = ৫০ সেমি
• ওয়াশের পর = ৪৭ সেমি
হ্রাস পেয়েছে = ৫০ − ৪৭ = ৩ সেমি
সিঙ্কেজ (%) = (৩ ÷ ৫০) × ১০০ = ৬%

উত্তর: লেন্থওয়াইজ সিঙ্কেজ ৬%।`,
    formula: 'Length Shrinkage % = [(Original Length - Wash Length) ÷ Original Length] × 100',
    keyTakeaway: 'সিঙ্কেজ % = [(৫০ - ৪৭) ÷ ৫০] × ১০০ = ৬%',
    tags: ['lengthwise shrinkage', 'formula', 'calculation', 'math'],
  },
  {
    id: 46,
    questionNumber: '46',
    titleEn: 'How do you calculate Widthwise Shrinkage? Example: Original Width = 60 inches, After Wash = 57 inches.',
    titleBn: 'উইথওয়াইজ সিঙ্কেজ কীভাবে বের করবেন? উদাহরণ: পূর্বের বহর = ৬০ ইঞ্চি, ধোয়ার পর = ৫৭ ইঞ্চি।',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Widthwise Shrinkage Formula:
Width Shrinkage (%) = [(Original Width − After Wash Width) ÷ Original Width] × 100

Calculation:
• Original Width = 60 inches
• After Wash Width = 57 inches
Shrinkage (%) = [(60 − 57) ÷ 60] × 100
= (3 ÷ 60) × 100 = 5%

Conclusion:
Widthwise shrinkage is 5%.`,
    answerBn: `উইথওয়াইজ সিঙ্কেজ সূত্র:
সিঙ্কেজ (%) = [(পূর্বের বহর − ওয়াশের পরের বহর) ÷ পূর্বের বহর] × ১০০

হিসাব:
• আগের বহর = ৬০ ইঞ্চি
• ওয়াশের পর = ৫৭ ইঞ্চি
হ্রাস পেয়েছে = ৬০ − ৫৭ = ৩ ইঞ্চি
সিঙ্কেজ (%) = (৩ ÷ ৬০) × ১০০ = ৫%

উত্তর: উইথওয়াইজ সিঙ্কেজ ৫%।`,
    formula: 'Width Shrinkage % = [(Original Width - Wash Width) ÷ Original Width] × 100',
    keyTakeaway: 'সিঙ্কেজ % = [(৬০ - ৫৭) ÷ ৬০] × ১০০ = ৫%',
    tags: ['widthwise shrinkage', 'formula', 'calculation', 'math'],
  },
  {
    id: 47,
    questionNumber: '47',
    titleEn: 'What is the standard test method for fabric dimensional change (shrinkage) after washing?',
    titleBn: 'ধোয়ার পর কাপড়ের মাপের পরিবর্তন (সিঙ্কেজ) পরীক্ষার আন্তর্জাতিক স্ট্যান্ডার্ড কোনটি?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `AATCC TM135 is the internationally recognized Standard Test Method for Dimensional Changes of Fabrics after Home Laundering. (For knit garments, AATCC TM150 is also widely used).`,
    answerBn: `বাসাবাড়িতে ওয়াশের পর কাপড়ের সাইজের পরিবর্তন বা সিঙ্কেজ পরীক্ষার আন্তর্জাতিক পদ্ধতি হলো AATCC TM135।`,
    keyTakeaway: 'AATCC TM135 হলো ফেব্রিক সিঙ্কেজ পরীক্ষার প্রধান স্ট্যান্ডার্ড টেস্ট মেথড।',
    tags: ['aatcc tm135', 'dimensional change', 'shrinkage test'],
  },
  {
    id: 48,
    questionNumber: '48',
    titleEn: 'What is a Shrinkage-wise Pattern and why is it important?',
    titleBn: 'সিঙ্কেজ-ভিত্তিক প্যাটার্ন (Shrinkage-wise Pattern) কী এবং এটি কেন গুরুত্বপূর্ণ?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `A Shrinkage-wise Pattern is a modified master garment pattern engineered by scaling dimensions to compensate for specific fabric lot shrinkage test values.

Why it is Important:
If a pattern is cut without shrinkage compensation, washing causes garments to shrink below buyer measurement tolerances, resulting in fit failure, customer dissatisfaction, and massive shipment rejections.`,
    answerBn: `সিঙ্কেজ-ভিত্তিক প্যাটার্ন হলো ফেব্রিক ল্যাবের সিঙ্কেজ টেস্টের রিপোর্ট অনুযায়ী প্রতিটি সাইজের প্যাটার্নে প্রয়োজনীয় অতিরিক্ত কাপড় (Shrinkage Allowance) যোগ করে তৈরি করা প্যাটার্ন।

গুরুত্ব:
কাপড় ধোয়ার পর ছোট হয়ে যাবে জেনেও যদি প্যাটার্ন বড় না করা হয়, তবে তৈরি পোশাক বায়ারের সাইজ চার্টের চেয়ে ছোট হবে, যা পুরো অর্ডারের শিপমেন্ট বাতিল (Cancellation) ডেকে আনবে।`,
    keyTakeaway: 'ল্যাবের সিঙ্কেজ অনুযায়ী প্যাটার্ন বড় করা। ওয়াশের পর বায়ার স্পেক রক্ষা করে।',
    tags: ['shrinkage pattern', 'pattern engineering', 'buyer tolerance', 'fit'],
  },
  {
    id: 49,
    questionNumber: '49',
    titleEn: 'How do you calculate the required pre-wash pattern dimension for shrinkage? Example: Finished Length = 70 cm, Shrinkage = 5%.',
    titleBn: 'সিঙ্কেজের জন্য ওয়াশের আগের প্যাটার্ন মাপ কীভাবে বের করবেন? উদাহরণ: ফাইনাল দৈর্ঘ্য = ৭০ সেমি, সিঙ্কেজ = ৫%।',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Pre-Wash Pattern Calculation Formula:
Pre-Wash Dimension = Finished Dimension ÷ (1 − Shrinkage %)

Example:
• Target Finished Length = 70 cm
• Fabric Shrinkage = 5% (0.05)
Calculation:
Pre-Wash Dimension = 70 ÷ (1 − 0.05)
= 70 ÷ 0.95 = 73.68 cm

Pre-wash pattern must be cut at approximately 73.7 cm (plus hem/seam allowances).`,
    answerBn: `প্রাক-ওয়াশ প্যাটার্ন মাপের সূত্র:
কাটার পূর্বের মাপ = কাঙ্ক্ষিত ফাইনাল মাপ ÷ (১ − সিঙ্কেজ %)

হিসাব:
• ফাইনাল মাপ লাগবে = ৭০ সেমি
• সিঙ্কেজ = ৫% (০.০৫)
প্যাটার্নে মাপ দিতে হবে = ৭০ ÷ (১ − ০.০৫)
= ৭০ ÷ ০.৯৫ = ৭৩.৬৮ সেমি।

অতএব, সিম এলাউন্স বাদে প্যাটার্ন কাটতে হবে ৭৩.৭ সেমি।`,
    formula: 'Pre-Wash Dimension = Finished Dimension ÷ (1 - Shrinkage %)',
    keyTakeaway: 'Pre-Wash = Finished ÷ (1 - Shrinkage%) = 70 ÷ 0.95 = 73.68 cm',
    tags: ['pre-wash calculation', 'pattern formula', 'shrinkage math'],
  },
  {
    id: 50,
    questionNumber: '50',
    titleEn: 'How are lengthwise and widthwise shrinkage applied to a garment pattern?',
    titleBn: 'পোশাকের প্যাটার্নে লেন্থওয়াইজ এবং উইথওয়াইজ সিঙ্কেজ কীভাবে প্রয়োগ করা হয়?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Application on Garment Patterns:
• Lengthwise Shrinkage is applied along vertical dimensions: Body length, sleeve length, side seam, inseam, outseam, and placket length.
• Widthwise Shrinkage is applied along horizontal dimensions: Half chest width, waist, bottom sweep, bicep width, shoulder width, and sleeve opening.`,
    answerBn: `প্যাটার্নে সিঙ্কেজ প্রয়োগের নিয়ম:
• Lengthwise Shrinkage (লম্বায়): বডি লেন্থ, হাতা লেন্থ (Sleeve length), সাইড সিম, ইনসিম ও প্ল্যাকেটের লম্বায় যোগ করা হয়।
• Widthwise Shrinkage (প্রস্থে): চেস্টের বহর (Half Chest), কোমর (Waist), বটম, বাইসেপ ও শোল্ডারের চওড়ায় যোগ করা হয়।`,
    keyTakeaway: 'Lengthwise = Body/Sleeve Length | Widthwise = Chest/Waist/Shoulder Width',
    tags: ['pattern application', 'lengthwise vs widthwise', 'chest', 'sleeve'],
  },
  {
    id: 51,
    questionNumber: '51',
    titleEn: 'What is the relationship between shrinkage and pattern making? What problems occur if shrinkage is ignored?',
    titleBn: 'সিঙ্কেজ এবং প্যাটার্ন তৈরির মধ্যে সম্পর্ক কী? সিঙ্কেজ উপেক্ষা করলে কী সমস্যা হয়?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Relationship:
Pattern making and fabric shrinkage are directly interdependent. A CAD pattern designer cannot finalize bulk production markers without verified shrinkage test reports.

Disasters if Ignored:
1. Complete size failure (a Large size shrinking into a Small or Medium).
2. Asymmetrical puckering along seams because thread does not shrink at the same rate.
3. Garment fit issues causing restricted movement and tightness.
4. Total order rejection during Final Random Inspection (FRI) resulting in air shipments or monetary compensation.`,
    answerBn: `সম্পর্ক এবং অবহেলার পরিণতি:
সিঙ্কেজ রিপোর্ট ছাড়া বাল্ক মার্কার তৈরি করা অসম্ভব।

সিঙ্কেজ উপেক্ষা করার মারাত্মক পরিণতি:
১. পুরো লট সাইজে ফেইল করা (যেমন L সাইজের পোশাক ওয়াশ হয়ে M সাইজ হয়ে যাওয়া)।
২. সিমে কুঁচকে যাওয়া বা প্যাকার হওয়া।
৩. ফিটিং নষ্ট হয়ে বায়ারের ইন্সপেকশনে পুরো শিপমেন্ট রিজেক্ট হওয়া।`,
    keyTakeaway: 'সিঙ্কেজ না মানলে পোশাক আকারে ছোট হয়ে পুরো শিপমেন্ট বাতিল হয়।',
    tags: ['shrinkage disaster', 'pattern making', 'fit failure', 'rejection'],
  },
  {
    id: 52,
    questionNumber: '52',
    titleEn: 'What problems can Skew and Twisting/Spirality cause in garments?',
    titleBn: 'কাপড়ে স্কিউ এবং টুইস্টিং/স্পাইরালিটির কারণে পোশাকে কী কী সমস্যা সৃষ্টি হয়?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Problems Caused by Skew & Spirality:
1. Side Seam Rotation: Side seams twist towards the front or back of the body when worn.
2. Hemline Asymmetry: Uneven bottom hemline sagging at one side.
3. Stripe / Check Misalignment: Horizontal stripes run diagonally across the body.
4. Pocket and Placket Distortion: Chest pockets tilt diagonally, looking crooked.
5. Inability to Fold & Pack: Garments cannot be folded flat into polybags neatly.`,
    answerBn: `স্কিউ এবং স্পাইরালিটির কারণে তৈরি পোশাকে সৃষ্ট ত্রুটি:
১. সাইড সিম মোচড় খাওয়া: জামার দুই পাশের সেলাই ঘুরে সামনের বা পেছনের পেটে চলে আসে।
২. নিচের হেম অসমান হওয়া: একপাশ ঝুলে পড়ে।
৩. চেকের লাইন তির্যক হয়ে যাওয়া।
৪. পকেট ও প্ল্যাকেট বাঁকা হয়ে যাওয়া।
৫. প্যাকেজিং সমস্যা: পলি প্যাকে সমান করে ভাঁজ করা যায় না।`,
    keyTakeaway: 'সাইড সিম ঘুরে পেটে আসা, পকেট বাঁকা হওয়া এবং ভাঁজ করে প্যাকিং করতে না পারা।',
    tags: ['side seam twist', 'skew problems', 'folding defect', 'crooked pocket'],
  },
  {
    id: 53,
    questionNumber: '53',
    titleEn: 'What is the difference between Shrinkage & Spirality, and Skew vs Twisting?',
    titleBn: 'Shrinkage বনাম Spirality এবং Skew বনাম Twisting এর মধ্যে পার্থক্য কী?',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Core Comparisons:
• Shrinkage vs Spirality: Shrinkage is a scalar reduction in linear dimension (shorter or narrower in length/width). Spirality is a rotational / angular distortion around the garment body axis.
• Skew vs Twisting: Skew is a fabric-level angular displacement of yarns before sewing. Twisting / Spirality is the garment-level rotational torque seen especially along knitted side seams after washing.`,
    answerBn: `মৌলিক পার্থক্য:
• Shrinkage বনাম Spirality: সিঙ্কেজ হলো কাপড়ের আকার ছোট হওয়া (দৈর্ঘ্য বা প্রস্থে)। আর স্পাইরালিটি হলো পোশাকের সেলাই ঘুরে যাওয়া বা মোচড় খাওয়া।
• Skew বনাম Twisting: স্কিউ হলো ফেব্রিকের সুতা তির্যক হওয়া; আর টুইস্টিং হলো তৈরি পোশাকে সাইড সিমের ঘূর্ণন।`,
    keyTakeaway: 'Shrinkage = মাপ ছোট হওয়া | Spirality = সেলাই ঘুরে যাওয়া।',
    tags: ['comparison', 'shrinkage vs spirality', 'skew vs twisting'],
  },
  {
    id: 54,
    questionNumber: '54',
    titleEn: 'What should a Cutting Manager check before making the final marker, and what is the practical process from fabric testing to cutting?',
    titleBn: 'ফাইনাল মার্কার তৈরির পূর্বে কাটিং ম্যানেজার কী কী চেক করবেন এবং টেস্ট থেকে কাটিং পর্যন্ত বাস্তবসম্মত ধাপগুলো কী?',
    category: 'Cutting Workflow & SOP',
    answerEn: `12 Crucial Checks Before Final Marker:
1. Usable cuttable fabric width (excluding selvedge).
2. Tested fabric GSM compliance.
3. Required relaxation completion.
4. Lengthwise shrinkage percentage.
5. Widthwise shrinkage percentage.
6. Skew percentage (< 2%–3%).
7. Bow percentage.
8. Spirality / twisting angle.
9. 4-point defect penalty density.
10. Shade grouping allocation.
11. Grain line rules and stripe repeats.
12. Approved master acrylic pattern and shrinkage allowance.

Practical Process Flow:
Fabric Inspection (4-Point) → Tension-free Relaxation → Width & GSM Verification → Lab Shrinkage & Skew Test → Spirality Evaluation → CAD Pattern Scaling → Marker Making & Ratio Plan → Spreading & Lay Planning → Precision Cutting → Panel Audit.`,
    answerBn: `ফাইনাল মার্কারের পূর্বে ১২টি আবশ্যকীয় চেক:
১. কাট্যাবল ফেব্রিক বহর (সেলভেজ বাদে)।
২. জিএসএম মান।
৩. পর্যাপ্ত রিলাক্সেশন সম্পন্ন হয়েছে কিনা।
৪. লেন্থওয়াইজ সিঙ্কেজ।
৫. উইথওয়াইজ সিঙ্কেজ।
৬. স্কিউ পার্সেন্টেজ।
৭. বো পার্সেন্টেজ।
৮. স্পাইরালিটি বা টুইস্টিং।
৯. ৪-পয়েন্ট ডিফেক্ট পয়েন্ট।
১০. শেড গ্রুপিং।
১১. গ্রেইন লাইন ও চেক ম্যাচিং রুলস।
১২. বায়ার অনুমোদিত প্যাটার্ন।

বাস্তবসম্মত কাজের প্রবাহ:
ইন্সপেকশন → রিলাক্সেশন → বহর ও জিএসএম চেক → সিঙ্কেজ টেস্ট → স্কিউ/বো চেক → প্যাটার্ন স্কেলিং → মার্কার মেকিং → স্প্রেডিং → কাটিং → পার্টস অডিট।`,
    keyTakeaway: '১২টি চেক: Width, GSM, Relaxation, Shrinkage (L & W), Skew, Bow, Spirality, Defects, Shade, Pattern.',
    tags: ['pre-marker checks', 'process flow', 'cutting manager audit'],
  },
  {
    id: 55,
    questionNumber: '55',
    titleEn: 'Give a comprehensive summary interview answer about Skew, Shrinkage, and Twisting in the Cutting Room.',
    titleBn: 'কাটিং ইন্টারভিউয়ের জন্য স্কিউ, সিঙ্কেজ এবং টুইস্টিং সম্পর্কে একটি সম্পূর্ণ সারসংক্ষেপ উত্তর দিন।',
    category: 'Skew, Bow, Spirality & Shrinkage',
    answerEn: `Master Interview Summary Answer:
"Skew is the angular, diagonal distortion of crosswise filling yarns or courses relative to the fabric length.

Shrinkage is the percentage reduction in fabric length or width after industrial laundering or finishing.

Twisting or Spirality is the rotational displacement of circular knitted loops and garment side seams around the body axis after washing.

In professional garments cutting management, all three parameters must be scientifically tested in the fabric lab (using ASTM D3882 for skew/bow, AATCC TM135 for shrinkage, and AATCC TM179 for spirality) and rigorously factored into fabric relaxation, CAD pattern grading, and marker planning before cutting to ensure zero size failure, perfect side-seam alignment, and 100% on-spec buyer satisfaction."`,
    answerBn: `ইন্টারভিউয়ের জন্য মাস্টার সামারি উত্তর:
"স্কিউ (Skew) হলো কাপড়ের আড়াআড়ি সুতা লম্বালম্বি সুতার সাথে ৯০ ডিগ্রিতে না থেকে একপাশে তির্যক হওয়া।

সিঙ্কেজ (Shrinkage) হলো ধোয়া বা শুকানোর পর কাপড়ের দৈর্ঘ্য বা প্রস্থে সংকুচিত হওয়ার শতকরা হার।

টুইস্টিং বা স্পাইরালিটি (Spirality) হলো নিট কাপড়ের অভ্যন্তরীণ টেনশনের কারণে ওয়াশের পর সাইড সিম বা সেলাই ঘুরে যাওয়া।

কাটিং রুমের একজন পেশাদার হিসেবে এই তিনটি মান ল্যাব টেস্টের (ASTM D3882, AATCC TM135, AATCC TM179) মাধ্যমে পরীক্ষা করে প্যাটার্ন ও মার্কার তৈরির সময় প্রয়োজনীয় এলাউন্স নিশ্চিত করতে হয়, যাতে ওয়াশের পর বায়ারের সাইজ ও কোয়ালিটি শতভাগ বজায় থাকে।"`,
    keyTakeaway: 'Skew = তির্যক সুতা, Shrinkage = ছোট হওয়া, Spirality = সেলাই ঘুরে যাওয়া। ল্যাব টেস্ট ছাড়া কাটিং নয়।',
    tags: ['interview summary', 'master answer', 'skew', 'shrinkage', 'spirality'],
  },
];
