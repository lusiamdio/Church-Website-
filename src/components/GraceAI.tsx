import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Volume2, VolumeX, Mic, MicOff, Languages } from "lucide-react";
import { Message } from "../types";

const LANGUAGES = [
  { code: "English", label: "English (US)" },
  { code: "Spanish", label: "Español (ES)" },
  { code: "Portuguese", label: "Português (PT)" },
  { code: "French", label: "Français (FR)" },
  { code: "Swahili", label: "Kiswahili (KE)" },
  { code: "Zulu", label: "isiZulu (ZA)" },
  { code: "Xitsonga", label: "Xitsonga (ZA)" },
  { code: "Lingala", label: "Lingála (CG)" },
];

const SUGGESTIONS = [
  { label: "What are service times?", prompt: "What are the service times and schedules for Sunday and midweek services?" },
  { label: "Where is the church?", prompt: "Where is the church located and how can I get directions?" },
  { label: "Children's ministry?", prompt: "Tell me about your children's church and how check-in works." },
  { label: "How can I give?", prompt: "What are the ways to securely give tithes or offerings online?" },
  { label: "Who are the pastors?", prompt: "Tell me about Lead Pastors Apostle David and Prophetess Maria Martinez." },
];

export default function GraceAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLanguage, setUserLanguage] = useState("English");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! Welcome to our church. I'm Grace AI, your virtual guide. How can I help you worship, connect, grow spiritually, or serve today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle native Web Speech synthesis (TTS)
  const speakText = (text: string) => {
    if (!isTtsEnabled || !window.speechSynthesis) return;
    // Cancel ongoing speech
    window.speechSynthesis.cancel();
    
    // Clean text of markdown
    const cleanedText = text.replace(/[*#_`~-]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    
    // Choose appropriate voice/language if possible
    if (userLanguage === "Spanish") utterance.lang = "es-ES";
    else if (userLanguage === "Portuguese") utterance.lang = "pt-PT";
    else if (userLanguage === "French") utterance.lang = "fr-FR";
    else utterance.lang = "en-US";
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userLanguage
        }),
      });

      const data = await response.json();
      
      const aiResponseText = data.text || "I'm sorry, I couldn't process that. Please check back shortly.";
      
      const aiMessage: Message = {
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
      speakText(aiResponseText);
    } catch (error) {
      console.error("Grace AI chat error:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "I am having difficulty communicating with our theological server right now. To help you in the meantime, our Sunday Early Celebration is at 10:15 AM, Tuesday Online Intercession is at 9:30 PM, and Thursday Church Intercession is at 7:15 PM (SAST). How else can I assist?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Panel */}
      {isOpen && (
        <div 
          className="glass-panel w-[350px] sm:w-[400px] h-[550px] rounded-2xl border border-white/15 shadow-2xl flex flex-col mb-4 overflow-hidden fade-in-up"
          id="grace-ai-panel"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-light to-royal-blue px-4 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gold/15 border border-gold/30 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  Grace AI
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-slate-300">Sanctuary Spiritual Guide</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
                  title="Select Language"
                  id="btn-grace-lang"
                >
                  <Languages className="w-4 h-4" />
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-8 bg-navy-dark border border-white/10 rounded-xl py-1.5 w-[140px] shadow-2xl z-20 max-h-[160px] overflow-y-auto">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setUserLanguage(lang.code);
                          setShowLangMenu(false);
                          setMessages((prev) => [
                            ...prev,
                            {
                              sender: "ai",
                              text: `I have updated my language to ${lang.label}. How can I assist you in this language?`,
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            }
                          ]);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-white/5 ${
                          userLanguage === lang.code ? "text-gold font-bold bg-white/5" : "text-slate-300"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* TTS Switcher */}
              <button
                onClick={() => {
                  const val = !isTtsEnabled;
                  setIsTtsEnabled(val);
                  if (!val && window.speechSynthesis) window.speechSynthesis.cancel();
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isTtsEnabled ? "bg-gold/20 text-gold" : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
                title="Speak Responses (Text To Speech)"
                id="btn-grace-tts"
              >
                {isTtsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
                id="btn-grace-close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-dark/30">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-md ${
                    msg.sender === "user"
                      ? "bg-royal-blue text-white rounded-tr-none"
                      : "bg-navy-light text-slate-200 border border-white/5 rounded-tl-none font-sans"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="block text-[8px] text-right mt-1 opacity-60 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-navy-light border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-300 flex items-center gap-1.5 shadow-md">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestions area */}
          <div className="px-3 py-2 bg-navy-dark/40 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSendMessage(s.prompt)}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-300 hover:text-white hover:bg-royal-blue hover:border-royal-blue transition-all shrink-0"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Footer Input Form */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-navy-dark/80 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask Grace AI in ${userLanguage}...`}
              className="flex-1 bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
              id="grace-ai-input"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-royal-blue hover:bg-blue-600 disabled:opacity-40 rounded-xl transition-colors text-white"
              id="btn-grace-send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-royal-blue to-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-royal-blue/30 transform hover:scale-105 transition-all duration-300 relative group cursor-pointer border border-white/10"
        id="btn-grace-ai-toggle"
      >
        <div className="absolute inset-0 bg-gold rounded-full filter blur-[15px] opacity-10 group-hover:opacity-35 transition-opacity" />
        {isOpen ? (
          <X className="w-6 h-6 rotate-90 transition-transform duration-300" />
        ) : (
          <MessageSquare className="w-6 h-6 animate-pulse" />
        )}
      </button>
    </div>
  );
}
