import { useState, useEffect, useRef, useCallback } from 'react';

// TypeScript interfaces for Web Speech API SpeechRecognition
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onstart: ((this: ISpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export interface VoiceCommandFeedback {
  text: string;
  status: 'listening' | 'recognized' | 'no-match' | 'action-executed' | 'error';
  transcript?: string;
}

interface UseVoiceCommanderProps {
  onCommand: (spokenText: string) => { matched: boolean; feedbackMessage: string };
  speakFeedback?: (text: string) => void;
  initialLang?: 'bn-BD' | 'en-US';
}

export function useVoiceCommander({ onCommand, speakFeedback, initialLang = 'bn-BD' }: UseVoiceCommanderProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [feedback, setFeedback] = useState<VoiceCommandFeedback | null>(null);
  const [commandLang, setCommandLang] = useState<'bn-BD' | 'en-US'>(initialLang);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      setIsSupported(true);
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = commandLang;

      recognition.onstart = () => {
        setIsListening(true);
        setFeedback({
          text: commandLang === 'bn-BD' 
            ? 'শুনছি... আপনার কমান্ড বা শব্দ বলুন (যেমন: GSM, Skew, প্রশ্ন ৫, Next)'
            : 'Listening... Speak your command or topic (e.g., GSM, Skew, Question 5, Next)',
          status: 'listening',
        });
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const lastResultIndex = event.resultIndex;
        const transcript = event.results[lastResultIndex][0].transcript.trim();

        if (transcript) {
          const result = onCommand(transcript);

          if (result.matched) {
            setFeedback({
              text: result.feedbackMessage,
              status: 'action-executed',
              transcript,
            });
            if (speakFeedback) {
              speakFeedback(result.feedbackMessage);
            }
          } else {
            const noMatchMsg = 'No match / কোনো মিল খুঁজে পাওয়া যায়নি';
            setFeedback({
              text: noMatchMsg,
              status: 'no-match',
              transcript,
            });
            if (speakFeedback) {
              speakFeedback('No match');
            }
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setFeedback({
            text: `ভয়েস ইনপুটে সমস্যা হয়েছে (${event.error})`,
            status: 'error',
          });
        } else {
          setFeedback({
            text: 'No match (কোনো কথা শোনা যায়নি)',
            status: 'no-match',
          });
          if (speakFeedback) {
            speakFeedback('No match');
          }
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [onCommand, speakFeedback, commandLang]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = commandLang;
        recognitionRef.current.start();
      } catch {
        // In case already active
      }
    }
  }, [isListening, commandLang]);

  const toggleLang = useCallback(() => {
    setCommandLang((prev) => (prev === 'bn-BD' ? 'en-US' : 'bn-BD'));
  }, []);

  return {
    isListening,
    isSupported,
    feedback,
    setFeedback,
    toggleListening,
    commandLang,
    setCommandLang,
    toggleLang,
  };
}
