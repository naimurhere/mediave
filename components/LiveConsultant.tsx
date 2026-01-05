
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, PhoneOff, X, AlertCircle } from 'lucide-react';

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveConsultant: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startSession = async () => {
    setError(null);
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      setError("API Key is missing. Please set the API_KEY environment variable.");
      return;
    }

    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            if (audioContextRef.current && streamRef.current) {
              const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
              const scriptProcessor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
              
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const l = inputData.length;
                const int16 = new Int16Array(l);
                for (let i = 0; i < l; i++) {
                  int16[i] = inputData[i] * 32768;
                }
                const pcmBlob = {
                  data: encode(new Uint8Array(int16.buffer)),
                  mimeType: 'audio/pcm;rate=16000',
                };
                sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
              };
              
              source.connect(scriptProcessor);
              scriptProcessor.connect(audioContextRef.current.destination);
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent!.outputTranscription!.text);
            }
            if (message.serverContent?.turnComplete) {
              setTranscription("");
            }

            const parts = message.serverContent?.modelTurn?.parts || [];
            for (const part of parts) {
              const base64Audio = part.inlineData?.data;
              if (base64Audio && outputAudioContextRef.current) {
                const ctx = outputAudioContextRef.current;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.addEventListener('ended', () => sourcesRef.current.delete(source));
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => {
            console.error('Live API Error:', e);
            setError("Connection error occurred. Please check your API key.");
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: "You are the Mediave Head Strategist. Your goal is to brainstorm viral hooks and scaling tactics with potential clients. Be energetic, data-driven, and very concise. Your name is Wave.",
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start session:', err);
      setError("Failed to initialize session. Ensure your API key is correct.");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setTranscription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative my-auto">
        <button 
          onClick={stopSession}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-8 md:p-12 text-center">
          <div className="flex justify-center mb-8 md:mb-10">
            <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center transition-all duration-1000 ${
              isActive ? 'bg-sky-600 shadow-[0_0_80px_rgba(14,165,233,0.5)]' : 'bg-slate-800'
            }`}>
              {isActive && (
                <div className="absolute inset-0">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="absolute inset-0 rounded-full border border-sky-400/30 animate-ping" style={{ animationDelay: `${i * 0.4}s` }} />
                  ))}
                </div>
              )}
              {isActive ? <Mic className="text-white relative z-10" size={40} /> : <PhoneOff className="text-slate-600" size={40} />}
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-black mb-4">
            {isConnecting ? 'Syncing with Wave...' : isActive ? 'Wave is Listening' : 'Live Content Audit'}
          </h3>
          
          {error ? (
            <div className="flex flex-col items-center gap-4 mb-8 bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
              <AlertCircle className="text-red-500" size={32} />
              <p className="text-red-400 text-sm font-medium">{error}</p>
              <p className="text-slate-500 text-xs">Set your key as <strong>API_KEY</strong> in environment variables.</p>
            </div>
          ) : (
            <p className="text-slate-400 mb-8 md:mb-10 max-w-sm mx-auto leading-relaxed text-sm md:text-base">
              {isActive ? "Speak naturally about your content goals. Wave will respond with high-impact strategy." : "Connect instantly with our AI Head of Strategy for a real-time brainstorming session."}
            </p>
          )}

          {transcription && (
            <div className="mb-8 md:mb-10 p-5 md:p-6 bg-slate-950/80 rounded-2xl md:rounded-3xl border border-white/5 min-h-[80px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sky-300 text-base md:text-lg italic font-bold">"{transcription}"</p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            {!isActive && !isConnecting ? (
              <button 
                onClick={startSession}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-full transition-all flex items-center justify-center gap-3 shadow-lg shadow-sky-600/20 active:scale-95"
              >
                <Mic size={20} /> START DISCOVERY CALL
              </button>
            ) : (
              <button 
                onClick={stopSession}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-red-500/10 hover:bg-red-600 hover:text-white text-red-500 font-black border border-red-500/20 rounded-full transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <PhoneOff size={20} /> END SESSION
              </button>
            )}
          </div>
          
          <p className="mt-8 text-[9px] md:text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">Secure End-to-End Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default LiveConsultant;
