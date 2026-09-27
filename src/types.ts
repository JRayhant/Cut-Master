export type AppMode =
  | 'home'
  | 'questions'
  | 'abbreviations'
  | 'calculator'
  | 'research'
  | 'voice-chat'
  | 'settings'
  | 'install';

export interface Abbreviation {
  id: string;
  term: string;
  fullForm: string;
  banglaMeaning: string;
  category: 'General Quality (QC/QA)' | 'Cutting Section (কাটিং বিভাগ)' | string;
  context?: string;
  isCustom?: boolean;
  createdAt?: string;
}

export interface QuestionItem {
  id: number;
  questionNumber: string;
  titleEn: string;
  titleBn: string;
  category:
    | 'Fabric & Basics'
    | 'RMG & Bangladesh Economy'
    | 'Consumption & Math'
    | 'Quality & 4-Point System'
    | 'Ratio & Lay Planning'
    | 'Fabric Challenges & Denim/Knit'
    | 'Cutting Workflow & SOP'
    | 'Safety, PPE & 5S'
    | 'Management, KPIs & SMED'
    | 'Marker & Fusing'
    | 'Skew, Bow, Spirality & Shrinkage'
    | string;
  answerEn: string;
  answerBn: string;
  formula?: string;
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
  keyTakeaway?: string;
  tags: string[];
  isCustom?: boolean;
  createdAt?: string;
}

export type CategoryFilter = 'All' | QuestionItem['category'];

export type ThemeMode = 'light' | 'medium' | 'dark';

export interface VoiceSettings {
  autoVoice: boolean;
  speed: 'slow' | 'medium' | 'fast';
  gender: 'female' | 'male' | 'default';
  language: 'bilingual' | 'en' | 'bn';
  volume: number;
  pitch: number;
}
