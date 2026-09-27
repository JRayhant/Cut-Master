import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  User,
  Send,
  RotateCcw,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Radio,
  Briefcase,
  Play,
  Square,
  RefreshCw,
  Sliders,
  HelpCircle,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { VoiceSettings } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

interface VoiceChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceSettings: VoiceSettings;
  onCopy: (text: string) => void;
  showToast: (msg: string) => void;
  inlineMode?: boolean;
  onBack?: () => void;
}

export const VoiceChatModal: React.FC<VoiceChatModalProps> = ({
  isOpen,
  onClose,
  voiceSettings,
  onCopy,
  showToast,
  inlineMode = false,
  onBack,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        'আসসালামু আলাইকুম! আমি কাটমাস্টার এআই। মানুষের মতো মুখে মুখে কথা বলুন—আমি আপনার কথা শুনে মুখে উত্তর দেব এবং প্রশ্ন শেষ হলে স্বয়ংক্রিয়ভাবে আবার আপনার কথা শুনব। "আমার ভাইভা নাও" বললে আমি একে একে ইন্টারভিউ প্রশ্ন করব!',
      timestamp: new Date(),
    },
  ]);

  const [textInput, setTextInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [continuousMode, setContinuousMode] = useState(true); // Auto duplex conversation
  const [showHistory, setShowHistory] = useState(false);
  const [chatLang, setChatLang] = useState<'bn-BD' | 'en-US'>('bn-BD');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [conversationStatus, setConversationStatus] = useState<
    'idle' | 'listening' | 'evaluating' | 'speaking'
  >('idle');

  const recognitionRef = useRef<any>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);
  const autoListenTimeoutRef = useRef<any>(null);

  // Sync refs
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Gentle audio chime to notify the candidate that AI is now listening
  const playListeningChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.23);
    } catch {
      // ignore
    }
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, liveTranscript, isThinking]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (conversationStatus === 'speaking') {
      setConversationStatus('idle');
    }
  }, [conversationStatus]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (autoListenTimeoutRef.current) {
      clearTimeout(autoListenTimeoutRef.current);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  // Start listening with safe browser initialization
  const startListening = useCallback(() => {
    if (isSpeakingRef.current) {
      stopSpeaking();
    }

    if (!recognitionRef.current) {
      showToast('আপনার ব্রাউজারে স্পিচ রিকগনিশন সাপোর্ট পাওয়া যায়নি। টাইপ করে চ্যাট করুন।');
      return;
    }

    try {
      // Abort any lingering instance
      try {
        recognitionRef.current.abort();
      } catch {}

      recognitionRef.current.lang = chatLang;
      recognitionRef.current.start();
      setIsListening(true);
      setConversationStatus('listening');
      playListeningChime();
    } catch {
      // If already started or browser state pending
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
            setIsListening(true);
            setConversationStatus('listening');
          } catch {}
        }, 150);
      } catch {}
    }
  }, [chatLang, playListeningChime, showToast, stopSpeaking]);

  // Speak AI response using Web Speech Synthesis
  const speakAIResponse = useCallback(
    (text: string, onFinish?: () => void) => {
      if (!('speechSynthesis' in window)) {
        if (onFinish) onFinish();
        return;
      }

      try {
        window.speechSynthesis.cancel();

        // Clean markdown and non-verbal artifacts for pure human vocal quality
        const speechText = text
          .replace(/[*#`_>-]/g, '')
          .replace(/\(.*?\)/g, '')
          .replace(/Q\.\s*\d+/gi, 'প্রশ্ন')
          .trim();

        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.rate =
          voiceSettings.speed === 'slow' ? 0.85 : voiceSettings.speed === 'fast' ? 1.2 : 1.0;
        utterance.pitch = voiceSettings.gender === 'female' ? 1.15 : 0.95;
        utterance.lang = chatLang;

        utterance.onstart = () => {
          setIsSpeaking(true);
          setConversationStatus('speaking');
        };

        const handleSpeechEnd = () => {
          setIsSpeaking(false);
          setConversationStatus('idle');
          if (onFinish) onFinish();
        };

        utterance.onend = handleSpeechEnd;
        utterance.onerror = (e) => {
          console.warn('Speech synthesis utterance error:', e);
          handleSpeechEnd();
        };

        // Select best available Bangla/English voice if exists
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const matchedVoice = voices.find((v) => {
            const name = v.name.toLowerCase();
            if (chatLang.startsWith('bn') && v.lang.startsWith('bn')) return true;
            if (
              voiceSettings.gender === 'female' &&
              (name.includes('female') ||
                name.includes('samantha') ||
                name.includes('zira') ||
                name.includes('natural'))
            ) {
              return true;
            }
            return false;
          });
          if (matchedVoice) {
            utterance.voice = matchedVoice;
          }
        }

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error('Speech synthesis error:', e);
        setIsSpeaking(false);
        setConversationStatus('idle');
        if (onFinish) onFinish();
      }
    },
    [voiceSettings, chatLang]
  );

  // Send message to AI endpoint and handle auto-listening upon answer completion
  const sendMessage = useCallback(
    async (userText: string) => {
      const trimmed = userText.trim();
      if (!trimmed) return;

      // Stop any speech or listening currently happening
      stopSpeaking();
      stopListening();

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsThinking(true);
      setConversationStatus('evaluating');
      setLiveTranscript('');

      try {
        const historyForAPI = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch('/api/voice-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: historyForAPI,
            message: trimmed,
          }),
        });

        if (!response.ok) {
          throw new Error('সার্ভার থেকে উত্তর পাওয়া যায়নি');
        }

        const data = await response.json();
        const aiReply = data.reply || 'আমি আপনার কথা বুঝতে পেরেছি।';

        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content: aiReply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);

        // AUTO-SPOKEN ANSWER -> AUTO LISTEN FOR CANDIDATE'S REPLY!
        speakAIResponse(aiReply, () => {
          // If continuous voice mode is enabled, wait a brief polite breath (400ms) then auto-listen!
          if (continuousMode && isOpen) {
            autoListenTimeoutRef.current = setTimeout(() => {
              startListening();
            }, 400);
          }
        });
      } catch (err: any) {
        console.error('Voice chat error:', err);
        setIsThinking(false);
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          content:
            'আমি আপনার কথাটি শুনেছি। কাটিং ভাইভার জন্য প্রশ্ন করতে পারেন অথবা "আমার ভাইভা নাও" বলুন।',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
        speakAIResponse(errorMsg.content, () => {
          if (continuousMode && isOpen) {
            autoListenTimeoutRef.current = setTimeout(() => {
              startListening();
            }, 400);
          }
        });
      }
    },
    [messages, continuousMode, isOpen, speakAIResponse, startListening, stopListening, stopSpeaking]
  );

  // Setup Web Speech Recognition
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      stopListening();
      return;
    }

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = chatLang;

      recognition.onstart = () => {
        setIsListening(true);
        setConversationStatus('listening');
        setLiveTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setLiveTranscript(interim);
        }

        if (final) {
          setLiveTranscript(final);
          try {
            recognition.stop();
          } catch {}
          setIsListening(false);
          sendMessage(final);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition status:', event.error);
        setIsListening(false);
        if (conversationStatus === 'listening') {
          setConversationStatus('idle');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (conversationStatus === 'listening') {
          setConversationStatus('idle');
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      stopListening();
    };
  }, [isOpen, chatLang, sendMessage, stopListening, stopSpeaking]);

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleInterruptAndSpeak = () => {
    stopSpeaking();
    setTimeout(() => {
      startListening();
    }, 150);
  };

  const handleCopyMessage = (id: string, text: string) => {
    onCopy(text);
    setCopiedId(id);
    showToast('মেসেজটি কপি করা হয়েছে');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Mock interview prompt trigger
  const handleStartMockInterview = () => {
    const prompt =
      'আসসালামু আলাইকুম। আমার গার্মেন্টস কাটিং লিখিত ও ভাইভা মক ইন্টারভিউ শুরু করুন। আমাকে একে একে প্রশ্ন করুন, আমি উত্তর দেব।';
    sendMessage(prompt);
  };

  if (!isOpen) return null;

  const innerContent = (
    <div
      className={`relative w-full ${
        inlineMode ? 'max-w-3xl mx-auto h-[82vh] max-h-[780px]' : 'max-w-2xl h-[92vh] max-h-[800px]'
      } flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-colors`}
    >
      {/* Top Header Bar */}
      <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-slate-900 via-[#0a233e] to-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                মানুষের মতো এআই ভয়েস কথোপকথন
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                লাইভ ডুও
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              এআই প্রশ্ন করবে, শেষে স্বয়ংক্রিয়ভাবে আপনার কথা শুনবে (হাতে ক্লিক করতে হবে না)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language Selector */}
          <button
            onClick={() => setChatLang((prev) => (prev === 'bn-BD' ? 'en-US' : 'bn-BD'))}
            title="ভয়েস ইনপুট ভাষা পরিবর্তন করুন"
            className="text-xs px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition"
          >
            {chatLang === 'bn-BD' ? '🇧🇩 বাংলা' : '🇺🇸 English'}
          </button>

          {/* Close Button */}
          {!inlineMode && (
            <button
              onClick={() => {
                stopSpeaking();
                stopListening();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Human-like Voice Orb & Conversational Arena */}
      <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 text-center overflow-y-auto relative bg-radial from-emerald-950/20 via-slate-900/10 to-transparent">
        {/* Top Status & Mode Banner */}
        <div className="w-full flex flex-col items-center gap-2">
          {/* Active Status Badge */}
          {isListening ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/40 text-xs sm:text-sm font-bold animate-pulse shadow-sm shadow-rose-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span>🎙️ শুনছি... আপনার উত্তর বা প্রশ্ন বলুন (এআই শুনছে)</span>
            </div>
          ) : isThinking ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/40 text-xs sm:text-sm font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>উত্তরের মূল্যায়ন ও পরবর্তী প্রশ্ন তৈরি হচ্ছে...</span>
            </div>
          ) : isSpeaking ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-xs sm:text-sm font-bold shadow-sm shadow-emerald-500/20">
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>🔊 এআই কথা বলছে — কথা শেষ হলেই আপনার উত্তর স্বয়ংক্রিয় শুনবে</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
              <Headphones className="w-3.5 h-3.5 text-emerald-500" />
              <span>হ্যান্ডস-ফ্রি অনবরত কথোপকথন মোড সক্রিয়</span>
            </div>
          )}
        </div>

        {/* Central Voice Orb with Fluid Audio Waves */}
        <div className="relative my-3 flex flex-col items-center justify-center">
          {/* Animated Wave Rings */}
          {(isListening || isSpeaking) && (
            <>
              <div
                className={`absolute w-52 h-52 rounded-full animate-ping opacity-20 pointer-events-none ${
                  isListening ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
              />
              <div
                className={`absolute w-40 h-40 rounded-full animate-pulse opacity-40 pointer-events-none ${
                  isListening ? 'bg-rose-600' : 'bg-emerald-600'
                }`}
              />
            </>
          )}

          {/* Interactive Pulsing Mic Orb */}
          <button
            onClick={isSpeaking ? handleInterruptAndSpeak : toggleMic}
            aria-label={isListening ? 'Stop listening' : 'Start speaking'}
            className={`relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 ${
              isListening
                ? 'bg-gradient-to-tr from-rose-600 via-rose-500 to-red-500 text-white shadow-rose-600/40 ring-4 ring-rose-400/50 scale-105'
                : isSpeaking
                ? 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white shadow-emerald-600/40 ring-4 ring-emerald-400/50'
                : 'bg-gradient-to-tr from-slate-800 to-slate-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-slate-900/30 hover:scale-105'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-12 h-12 animate-pulse" />
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">শুনছি...</span>
                <span className="text-[9px] opacity-80">মুখের কথা বলুন</span>
              </>
            ) : isSpeaking ? (
              <>
                <Volume2 className="w-12 h-12 animate-bounce" />
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">বলছি...</span>
                <span className="text-[9px] opacity-80">বাধা দিতে চাপুন</span>
              </>
            ) : (
              <>
                <Mic className="w-12 h-12" />
                <span className="text-[11px] font-bold mt-1">কথা শুরু করুন</span>
                <span className="text-[9px] opacity-80">মাইকে চাপ দিন</span>
              </>
            )}
          </button>

          {/* Subtitle / Real-time Spoken Transcript */}
          <div className="w-full max-w-lg min-h-[64px] flex items-center justify-center px-2 py-1 mt-3">
            {liveTranscript ? (
              <p className="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-4 py-2.5 rounded-2xl border border-rose-200 dark:border-rose-900 shadow-sm animate-pulse">
                🗣️ "{liveTranscript}"
              </p>
            ) : isSpeaking ? (
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 line-clamp-2 bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                "{messages[messages.length - 1]?.content}"
              </p>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                স্বয়ংক্রিয় মোড: এআই কথা শেষ করলেই মাইক অন হয়ে আপনার উত্তর শুনবে।
              </p>
            )}
          </div>
        </div>

        {/* Quick Action Chips & Controls */}
        <div className="w-full space-y-2.5">
          {/* If speaking: Allow quick interrupt */}
          {isSpeaking && (
            <button
              onClick={handleInterruptAndSpeak}
              className="mx-auto flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600 transition animate-bounce"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>কথা থামিয়ে আমার কথা শুনুন (Interrupt)</span>
            </button>
          )}

          {/* Prompt Starters */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs">
            <button
              onClick={handleStartMockInterview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/30 transition"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>👔 মক ভাইভা শুরু করুন</span>
            </button>

            <button
              onClick={() => sendMessage('৪-পয়েন্ট সিস্টেমে পেনাল্টি পয়েন্ট কীভাবে হিসাব করে?')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700 transition"
            >
              🔍 ৪-পয়েন্ট সিস্টেম
            </button>

            <button
              onClick={() => sendMessage('GSM কীভাবে হিসাব করে এবং ওভেন কাপড়ে ১ ওজ কত জিএসএম?')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700 transition"
            >
              📐 GSM হিসাব
            </button>

            <button
              onClick={() => setContinuousMode((prev) => !prev)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                continuousMode
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/40 text-emerald-600 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              <Radio className="w-3 h-3" />
              <span>স্বয়ংক্রিয় শুনবে: {continuousMode ? 'চালু ✓' : 'বন্ধ ✕'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Transcript & Typing Area */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 shrink-0">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setShowHistory((prev) => !prev)}
            className="flex items-center gap-1.5 font-bold hover:text-emerald-500 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
            <span>চ্যাট হিস্টোরি ও ট্রান্সক্রিপ্ট ({messages.length})</span>
            {showHistory ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              setMessages([
                {
                  id: 'welcome',
                  role: 'model',
                  content:
                    'আসসালামু আলাইকুম! নতুন করে কথা শুরু করুন। কী জানতে চান বা ভাইভা দিতে চান বলুন।',
                  timestamp: new Date(),
                },
              ]);
            }}
            className="hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1 px-2 py-0.5 rounded-md"
          >
            <RotateCcw className="w-3 h-3" />
            <span>রিসেট</span>
          </button>
        </div>

        {/* Transcript Scroll Area (visible when expanded) */}
        {showHistory && (
          <div
            ref={chatScrollRef}
            className="max-h-48 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100 dark:divide-slate-800 text-xs"
          >
            {messages.map((msg) => (
              <div key={msg.id} className="pt-2 first:pt-0 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold">
                    {msg.role === 'user' ? (
                      <>
                        <User className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-rose-600 dark:text-rose-400">আপনি:</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">কাটমাস্টার এআই:</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {msg.role === 'model' && (
                      <button
                        onClick={() => speakAIResponse(msg.content)}
                        title="পুনরায় ভয়েসে শুনুন"
                        className="p-1 text-slate-400 hover:text-emerald-500"
                      >
                        <Play className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      title="কপি করুন"
                      className="p-1 text-slate-400 hover:text-emerald-500"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-slate-800 dark:text-slate-200 pl-5 whitespace-pre-line leading-relaxed">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Typing Fallback Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(textInput);
              setTextInput('');
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="মুখে না বলে এখানে লিখেও প্রশ্ন পাঠাতে পারেন..."
              className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={!textInput.trim() || isThinking}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">পাঠান</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  if (inlineMode) {
    return innerContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-hidden">
      {innerContent}
    </div>
  );
};
