import React, { useState, useEffect, useRef } from "react";
import { Search, BookOpen, Clock, User, Award, Sparkles, Send, Play, FileText, ChevronRight, Volume2, X, MessageSquare, Headphones, RotateCcw, Loader } from "lucide-react";
import { Sermon, Message } from "../types";
import { sermonsData } from "../data";

interface SermonLibraryProps {
  selectedSermonId: string | null;
  clearSermonSelection: () => void;
}

export default function SermonLibrary({ selectedSermonId, clearSermonSelection }: SermonLibraryProps) {
  const [sermons, setSermons] = useState<Sermon[]>(sermonsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Drawer/Overlay state
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [activeTab, setActiveTab] = useState<'ai-summary' | 'transcript' | 'ask-ai'>('ai-summary');

  // Sermon Assistant Chat State
  const [askAiQuery, setAskAiQuery] = useState("");
  const [aiHistory, setAiHistory] = useState<Message[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const aiChatEndRef = useRef<HTMLDivElement>(null);

  // Sound Podcast mockup
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Growth, Recommendations, and History Tracking state
  const [explicitInterests, setExplicitInterests] = useState<string[]>([]);
  const [viewingHistory, setViewingHistory] = useState<string[]>([]);
  const [continueWatching, setContinueWatching] = useState<any[]>([]);
  const [inferredNeeds, setInferredNeeds] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isRecommendLoading, setIsRecommendLoading] = useState(false);
  const [watchProgress, setWatchProgress] = useState<number>(0);

  // Recalculate or Sync recommendations with backend
  const triggerRecommendationSync = async () => {
    setIsRecommendLoading(true);
    try {
      const interests = JSON.parse(localStorage.getItem("sermon_explicit_interests") || "[]");
      const history = JSON.parse(localStorage.getItem("sermon_viewing_history") || "[]");
      const infNeeds = JSON.parse(localStorage.getItem("inferred_needs") || "[]");

      // Model prayer requests from the inferred list
      const prayersContext = infNeeds.map((cat: string) => ({
        category: cat,
        text: `User requested prayer / intercession in category ${cat}`
      }));

      const res = await fetch("/api/sermon-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          viewingHistory: history,
          explicitInterests: interests,
          prayerRequests: prayersContext,
          allSermons: sermonsData
        })
      });

      if (!res.ok) throw new Error("Recommendation retrieval failed");
      const data = await res.json();
      setRecommendations(data);
    } catch (error) {
      console.error("AI Recommendations Error:", error);
    } finally {
      setIsRecommendLoading(false);
    }
  };

  // Sync Preferences on Mount & Load custom event handlers
  useEffect(() => {
    const interests = JSON.parse(localStorage.getItem("sermon_explicit_interests") || "[]");
    const history = JSON.parse(localStorage.getItem("sermon_viewing_history") || "[]");
    const continuations = JSON.parse(localStorage.getItem("sermon_continue_watching") || "[]");
    const infNeeds = JSON.parse(localStorage.getItem("inferred_needs") || "[]");

    setExplicitInterests(interests);
    setViewingHistory(history);
    setContinueWatching(continuations);
    setInferredNeeds(infNeeds);

    // Run initial recommendations query
    triggerRecommendationSync();

    const handlePrayerNeedsUpdate = () => {
      const updatedNeeds = JSON.parse(localStorage.getItem("inferred_needs") || "[]");
      setInferredNeeds(updatedNeeds);
      triggerRecommendationSync();
    };

    window.addEventListener("prayer-needs-updated", handlePrayerNeedsUpdate);
    return () => {
      window.removeEventListener("prayer-needs-updated", handlePrayerNeedsUpdate);
    };
  }, []);

  const handleInterestToggle = (interest: string) => {
    let updated = [...explicitInterests];
    if (updated.includes(interest)) {
      updated = updated.filter(i => i !== interest);
    } else {
      updated.push(interest);
    }
    setExplicitInterests(updated);
    localStorage.setItem("sermon_explicit_interests", JSON.stringify(updated));
    triggerRecommendationSync();
  };

  const handleProgressChange = (progressPercent: number) => {
    setWatchProgress(progressPercent);
    if (!selectedSermon) return;

    // 1. Log to history
    const history = JSON.parse(localStorage.getItem("sermon_viewing_history") || "[]");
    if (!history.includes(selectedSermon.id)) {
      history.push(selectedSermon.id);
      localStorage.setItem("sermon_viewing_history", JSON.stringify(history));
      setViewingHistory(history);
    }

    // 2. Track unfinished playback progress
    let continuations = JSON.parse(localStorage.getItem("sermon_continue_watching") || "[]");
    continuations = continuations.filter((c: any) => c.sermonId !== selectedSermon.id);

    if (progressPercent > 0 && progressPercent < 100) {
      continuations.push({
        sermonId: selectedSermon.id,
        progressPercent: progressPercent,
        lastWatchedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
      });
    }

    localStorage.setItem("sermon_continue_watching", JSON.stringify(continuations));
    setContinueWatching(continuations);
  };

  // Map incoming external triggers
  useEffect(() => {
    if (selectedSermonId) {
      const match = sermonsData.find((s) => s.id === selectedSermonId);
      if (match) {
        setSelectedSermon(match);
        setActiveTab('ai-summary');

        // Initialize progress
        const continuations = JSON.parse(localStorage.getItem("sermon_continue_watching") || "[]");
        const matchCW = continuations.find((c: any) => c.sermonId === match.id);
        setWatchProgress(matchCW ? matchCW.progressPercent : 0);
      }
    }
  }, [selectedSermonId]);

  // Handle category / search filters
  useEffect(() => {
    let filtered = sermonsData;
    if (activeCategory !== "All") {
      filtered = filtered.filter((s) => s.category === activeCategory);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.speaker.toLowerCase().includes(q) ||
          s.series.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.bibleReferences.some((r) => r.toLowerCase().includes(q))
      );
    }
    setSermons(filtered);
  }, [searchTerm, activeCategory]);

  // Auto scroll in sermon AI chat
  useEffect(() => {
    aiChatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiHistory, isAiLoading]);

  const categories = ["All", "Faith", "Marriage", "Youth", "Healing", "Leadership", "Prayer", "Family", "Business", "Missions"];

  // Run Sermon Companion Question
  const handleAskSermonAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSermon || !askAiQuery.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: askAiQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiHistory((prev) => [...prev, userMsg]);
    setAskAiQuery("");
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/sermon-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sermonTitle: selectedSermon.title,
          sermonScriptures: selectedSermon.bibleReferences.join(", "),
          question: userMsg.text,
          history: aiHistory,
        }),
      });

      const data = await res.json();
      const reply = data.text || "Grace to you. That is a thoughtful scripture reference. Let's study deeper!";

      setAiHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error("Sermon AI error:", error);
      setAiHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "I am having difficulty accessing our pastoral sermon library database right now, but always remember that we should seek the Holy Spirit for revelation of scriptures! Let me know if you would like to read the transcript.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section id="sermons" className="py-20 px-4 md:px-8 bg-navy-dark text-white relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-royal-blue/20 border border-royal-blue/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-sky-400 font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Tabernacle</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Sermon Library</h2>
          <p className="font-serif italic text-slate-300 text-sm max-w-lg mx-auto">
            Abide in the spoken Word of God. Feed your soul with our dynamic video library, full transcripts, and AI-powered sermon mentors.
          </p>
        </div>

        {/* AI Spiritual Desk Panel */}
        <div className="glass-panel border border-white/10 rounded-3xl p-6 md:p-8 space-y-8 bg-gradient-to-br from-navy-light/20 to-navy-dark/40 shadow-2xl relative overflow-hidden text-left" id="ai-spiritual-desk">
          {/* Absolute decorative gradient glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/5 blur-3xl rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gold animate-pulse">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-display font-bold text-lg text-white">Grace AI Spiritual Desk</h3>
              </div>
              <p className="text-xs text-slate-300">Customized spiritual nutrition based on your growth needs and prayers.</p>
            </div>
            
            <button
              onClick={triggerRecommendationSync}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer text-slate-300 hover:text-white"
              id="btn-recalculate-recommendations"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Recalculate
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sub-column (Col span 4): Interests and Growth areas */}
            <div className="lg:col-span-4 space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Growth Focus Areas
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Select areas of life or spiritual focus where you are seeking study materials and guidance.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.filter(c => c !== "All").map((cat) => {
                  const isSelected = explicitInterests.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => handleInterestToggle(cat)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gold/15 text-gold-light border-gold/30 shadow-lg shadow-gold/5"
                          : "bg-white/5 text-slate-300 border-transparent hover:border-white/10 hover:text-white"
                      }`}
                      id={`interest-toggle-${cat}`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {inferredNeeds.length > 0 && (
                <div className="pt-3.5 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 block">Inferred from prayer wall</span>
                  <div className="flex flex-wrap gap-1.5">
                    {inferredNeeds.map((need) => (
                      <span key={need} className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Seeking {need}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sub-column (Col span 8): Continue watching and Recommended Sermons */}
            <div className="lg:col-span-8 space-y-6">
              {/* 1. Continue Watching Section */}
              {continueWatching.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 animate-spin-slow" /> Continue Watching
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {continueWatching.map((cw) => {
                      const sermon = sermonsData.find(s => s.id === cw.sermonId);
                      if (!sermon) return null;
                      return (
                        <div
                          key={cw.sermonId}
                          className="bg-navy-light/20 border border-white/5 hover:border-gold/20 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all"
                          id={`continue-watching-card-${cw.sermonId}`}
                        >
                          <div className="space-y-1">
                            <span className="text-[9px] text-gold uppercase tracking-widest font-bold">{sermon.series}</span>
                            <h5 className="font-bold text-xs leading-snug line-clamp-1 text-white">{sermon.title}</h5>
                            <p className="text-[10px] text-slate-400">Paused on {cw.lastWatchedAt}</p>
                          </div>

                          <div className="space-y-2">
                            {/* Progress Bar */}
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-gold h-full rounded-full" style={{ width: `${cw.progressPercent}%` }} />
                            </div>

                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">{cw.progressPercent}% complete</span>
                              <button
                                onClick={() => {
                                  setSelectedSermon(sermon);
                                  setWatchProgress(cw.progressPercent);
                                }}
                                className="text-gold-light hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                                id={`btn-resume-${cw.sermonId}`}
                              >
                                <Play className="w-3 h-3 fill-gold-light text-transparent" /> Resume
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Personalized AI Recommendations Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold" /> Pastoral Recommendations
                </h4>

                {isRecommendLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-2 border border-white/5 rounded-2xl bg-white/[0.01]">
                    <Loader className="w-6 h-6 animate-spin text-gold" />
                    <p className="text-xs text-slate-400">Counseling sermon library database...</p>
                  </div>
                ) : recommendations?.recommendations?.length > 0 ? (
                  <div className="space-y-3">
                    {/* Spiritual Season summary */}
                    {recommendations.spiritualFocus && (
                      <p className="text-xs text-slate-200 italic font-serif leading-relaxed bg-gold/5 border border-gold/15 p-3 rounded-xl mb-4">
                        "Spiritual season focus: {recommendations.spiritualFocus}"
                      </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendations.recommendations.map((rec: any, idx: number) => {
                        const sermon = sermonsData.find(s => s.id === rec.sermonId);
                        if (!sermon) return null;
                        return (
                          <div
                            key={rec.sermonId || idx}
                            onClick={() => {
                              setSelectedSermon(sermon);
                              // Check if there's unfinished watch progress
                              const matchCW = continueWatching.find(c => c.sermonId === sermon.id);
                              setWatchProgress(matchCW ? matchCW.progressPercent : 0);
                            }}
                            className="bg-navy-light/30 border border-white/10 hover:border-gold/30 rounded-2xl p-4 text-left flex flex-col justify-between space-y-3 hover:bg-navy-light/50 transition-all cursor-pointer relative overflow-hidden group"
                            id={`recommendation-card-${rec.sermonId}`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] uppercase font-bold text-sky-400">{sermon.category}</span>
                                <span className="text-[9px] font-mono text-slate-400">{sermon.duration}</span>
                              </div>
                              <h5 className="font-display font-bold text-xs text-white group-hover:text-gold transition-colors">{sermon.title}</h5>
                              <span className="text-[10px] text-slate-400 block">{sermon.speaker}</span>
                            </div>

                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-[10px] text-slate-300 leading-relaxed font-sans italic relative">
                              <span className="absolute top-1 left-2 text-gold/30 font-serif text-lg leading-none">“</span>
                              <p className="pl-3.5 pr-1.5">{rec.reasoning}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
                    <p className="text-xs text-slate-400">Select focus areas on the left to activate your personalized pastoral recommendations stream.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters/Search area */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/5 pb-6">
          {/* Categories Tab slider */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-royal-blue text-white shadow-lg shadow-royal-blue/20"
                    : "text-slate-400 hover:text-white bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-[320px] shrink-0">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search speaker, topic, bible verse..."
              className="w-full bg-navy-light/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-royal-blue transition-colors"
              id="sermon-search-input"
            />
          </div>
        </div>

        {/* Sermon Grid (Netflix style) */}
        {sermons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sermons.map((sermon) => (
              <div
                key={sermon.id}
                onClick={() => {
                  setSelectedSermon(sermon);
                  setActiveTab('ai-summary');
                  setAiHistory([
                    {
                      sender: "ai",
                      text: `Hello! I am your AI study companion for the sermon "${sermon.title}". Feel free to ask me anything about the points, biblical scriptures, or how to apply this word!`,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);

                  // Initialize progress
                  const continuations = JSON.parse(localStorage.getItem("sermon_continue_watching") || "[]");
                  const matchCW = continuations.find((c: any) => c.sermonId === sermon.id);
                  setWatchProgress(matchCW ? matchCW.progressPercent : 0);

                  // Add to viewing history
                  const updatedHistory = [...viewingHistory];
                  if (!updatedHistory.includes(sermon.id)) {
                    updatedHistory.push(sermon.id);
                    localStorage.setItem("sermon_viewing_history", JSON.stringify(updatedHistory));
                    setViewingHistory(updatedHistory);
                    triggerRecommendationSync();
                  }
                }}
                className="bg-navy-light/30 border border-white/5 rounded-2xl overflow-hidden glass-card-hover cursor-pointer text-left flex flex-col justify-between h-[360px]"
                id={`sermon-card-${sermon.id}`}
              >
                {/* Visual Header using subtle overlay gradient */}
                <div className="relative h-[160px] bg-gradient-to-br from-navy-light to-royal-blue/40 flex items-center justify-center border-b border-white/5 group">
                  <div className="absolute top-3.5 left-3.5 bg-royal-blue/30 border border-royal-blue/40 px-2.5 py-1 rounded-full text-[9px] font-bold text-sky-300">
                    {sermon.category}
                  </div>
                  <div className="absolute top-3.5 right-3.5 bg-black/40 px-2.5 py-1 rounded-full text-[9px] font-mono text-slate-300">
                    {sermon.duration}
                  </div>
                  <div className="bg-white/15 p-4 rounded-full group-hover:bg-gold group-hover:scale-110 transition-all duration-300 shadow-xl shadow-black/20">
                    <Play className="w-6 h-6 text-white group-hover:text-navy-dark fill-white" />
                  </div>
                </div>

                {/* Sermon metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-gold uppercase tracking-widest font-bold font-display">{sermon.series}</span>
                    <h3 className="font-display font-bold text-base leading-tight text-white line-clamp-2 hover:text-gold transition-colors">{sermon.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{sermon.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-4 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-royal-blue" /> {sermon.speaker}</span>
                    <span>{sermon.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-navy-light/10 border border-white/5 rounded-2xl">
            <p className="text-slate-400 text-sm">No sermons found matching your criteria. Try adjusting your search filters.</p>
          </div>
        )}
      </div>

      {/* Cinematic Sermon Viewer Drawer / Modal Overlay */}
      {selectedSermon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/95 backdrop-blur-md" id="sermon-viewer-overlay">
          <div className="glass-panel w-full max-w-6xl h-[90vh] rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden relative fade-in-up">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedSermon(null);
                clearSermonSelection();
              }}
              className="absolute top-5 right-5 z-20 p-2 bg-black/50 hover:bg-black/80 text-slate-300 hover:text-white rounded-full transition-colors"
              id="btn-close-sermon"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Bar Video Container */}
            <div className="h-[45%] md:h-[50%] bg-black relative shrink-0">
              <iframe
                src={selectedSermon.youtubeUrl}
                title={selectedSermon.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                id="sermon-iframe-player"
              />
            </div>

            {/* Bottom Section: Tabs & Insights */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-navy-dark/90">
              {/* Left Column: Sermon Core Data */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5 border-r border-white/10 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-gold uppercase tracking-widest font-extrabold">{selectedSermon.series}</span>
                    <h2 className="font-display text-2xl font-bold mt-1 text-white">{selectedSermon.title}</h2>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-royal-blue" /> {selectedSermon.speaker}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-royal-blue" /> {selectedSermon.duration}</span>
                      <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-gold" /> {selectedSermon.category}</span>
                      <span>{selectedSermon.date}</span>
                    </div>
                  </div>

                  {/* Watch Progress simulator slider inside Drawer */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[240px] space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                      <span>Simulate Playback</span>
                      <span className="font-mono text-gold-light">{watchProgress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={watchProgress}
                      onChange={(e) => handleProgressChange(parseInt(e.target.value))}
                      className="w-full accent-gold cursor-pointer"
                      id="drawer-progress-slider"
                    />
                    <div className="flex items-center justify-between text-[8px] text-slate-400">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100% (Completed)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-white/5 border border-white/5 rounded-xl p-3.5">{selectedSermon.description}</p>

                {/* Sub-tabs inside Left Panel */}
                <div className="flex border-b border-white/10 gap-2">
                  <button
                    onClick={() => setActiveTab('ai-summary')}
                    className={`pb-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all ${
                      activeTab === 'ai-summary' ? "border-gold text-gold" : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" /> AI Study Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('transcript')}
                    className={`pb-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all ${
                      activeTab === 'transcript' ? "border-gold text-gold" : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" /> Full Transcript
                  </button>
                </div>

                {/* Left Panel Tab Contents */}
                {activeTab === 'ai-summary' && (
                  <div className="space-y-5 py-2 fade-in-up">
                    {/* Summary */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">AI Summary</h4>
                      <p className="text-xs text-slate-200 leading-relaxed font-serif italic">{selectedSermon.summary}</p>
                    </div>

                    {/* Key points */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">Key Takeaways</h4>
                      <ul className="space-y-1.5">
                        {selectedSermon.keyPoints.map((pt, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-gold shrink-0 mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Scriptures */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">Bible References</h4>
                      <div className="space-y-2">
                        {selectedSermon.bibleReferences.map((ref, i) => (
                          <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3 text-xs leading-relaxed">
                            <strong className="block text-slate-300 font-display text-[10px] uppercase tracking-wider">{ref.split(" - ")[0]}</strong>
                            <p className="text-slate-400 italic mt-0.5 font-serif">"{ref.split(" - ")[1]}"</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">Reflection Questions</h4>
                      <div className="space-y-2">
                        {selectedSermon.discussionQuestions.map((q, i) => (
                          <div key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                            <span className="font-bold text-royal-blue">{i + 1}.</span>
                            <p>{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personal Prayer */}
                    <div className="bg-gold/10 border border-gold/15 p-4 rounded-xl space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gold-light flex items-center gap-1">Prayer Points</h4>
                      <p className="text-xs text-slate-200 italic font-serif leading-relaxed">"{selectedSermon.prayer}"</p>
                    </div>
                  </div>
                )}

                {activeTab === 'transcript' && (
                  <div className="py-2 space-y-4 fade-in-up">
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-serif">
                      {selectedSermon.transcript}
                    </p>
                    {/* Audio Player */}
                    <div className="bg-navy-light/40 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                      <div className="bg-royal-blue p-3.5 rounded-full text-white shrink-0 hover:bg-gold hover:text-navy-dark cursor-pointer transition-colors" onClick={() => setIsPlayingAudio(!isPlayingAudio)}>
                        {isPlayingAudio ? <Headphones className="w-5 h-5 animate-bounce" /> : <Play className="w-5 h-5 fill-white shrink-0" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400">Sermon Audio Podcast</span>
                        <h4 className="font-bold text-xs text-white">Listen to {selectedSermon.title}</h4>
                        <div className="flex items-center gap-1.5 h-5 mt-1.5">
                          {/* Animated voice soundbars */}
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((b) => (
                            <span
                              key={b}
                              className="bg-royal-blue w-[3px] rounded-full transition-all duration-300"
                              style={{
                                height: isPlayingAudio ? `${Math.floor(Math.random() * 20) + 4}px` : "6px",
                                animation: isPlayingAudio ? `livePulse ${1 + Math.random()}s infinite` : "none"
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Ask AI Sermon Companion Panel */}
              <div className="w-full md:w-[350px] lg:w-[400px] flex flex-col h-full bg-navy-dark border-t md:border-t-0 md:border-l border-white/10 shrink-0">
                <div className="px-4 py-3 bg-navy-light/30 border-b border-b-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gold" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Sermon Companion AI</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Theological Engine</span>
                </div>

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {aiHistory.map((m, idx) => (
                    <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-2xl px-3.5 py-2 text-[11px] leading-relaxed shadow ${
                        m.sender === 'user' ? "bg-royal-blue text-white rounded-tr-none" : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-none font-sans"
                      }`}>
                        <p>{m.text}</p>
                        <span className="block text-[8px] text-right mt-1 opacity-60 font-mono">{m.timestamp}</span>
                      </div>
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-3.5 py-2 text-[11px] text-slate-400 flex items-center gap-1">
                        <span className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                  <div ref={aiChatEndRef} />
                </div>

                {/* Input form */}
                <form onSubmit={handleAskSermonAi} className="p-3 bg-navy-dark border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={askAiQuery}
                    onChange={(e) => setAskAiQuery(e.target.value)}
                    placeholder="Ask AI e.g. What does Joel 2 mean?"
                    className="flex-1 bg-navy-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                    id="sermon-ai-input"
                  />
                  <button
                    type="submit"
                    disabled={!askAiQuery.trim() || isAiLoading}
                    className="p-2.5 bg-royal-blue hover:bg-blue-600 disabled:opacity-45 rounded-xl transition-colors text-white"
                    id="btn-sermon-ai-send"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
