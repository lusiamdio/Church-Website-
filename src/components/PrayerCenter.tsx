import React, { useState, useEffect } from "react";
import { HeartHandshake, Sparkles, User, Calendar, MessageSquarePlus, Check, Flame, Heart, AlertTriangle, Loader } from "lucide-react";
import { PrayerRequest } from "../types";

const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: "p1",
    name: "Diana Lawson",
    text: "Please pray for my mother who is undergoing heart surgery this Tuesday morning. We are praying for steady hands for the surgeons and complete, rapid restoration of her heart function. We trust in Jehovah Rapha!",
    category: "Urgent",
    date: "July 16, 2026",
    prayedCount: 38
  },
  {
    id: "p2",
    name: "Samuel & Rachel",
    text: "Praise Report! We submitted a prayer request last month for our marriage on the brink of separation. After attending the United in Grace couples date night and receiving pastoral counselling, God has completely healed our relationship. We are restored and in love again!",
    category: "Marriage",
    date: "July 14, 2026",
    prayedCount: 52,
    isPraiseReport: true
  },
  {
    id: "p3",
    name: "Brother Benjamin",
    text: "Praying for financial restoration. I was laid off from my warehouse role two weeks ago. I am trusting God for a new door in Texas with a salary sufficient to take care of my three children. God is my provider!",
    category: "Financial",
    date: "July 11, 2026",
    prayedCount: 24
  },
  {
    id: "p4",
    name: "Youth Leader Chloe",
    text: "Praying for our upcoming Youth Revival Night on Friday! We are praying for a massive harvest of youth souls in Houston, that they will break free from depression, find their identities in Christ, and be set on fire!",
    category: "Youth",
    date: "July 9, 2026",
    prayedCount: 47,
    isPraiseReport: false
  }
];

export default function PrayerCenter() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState<any>("Urgent");
  const [isPraise, setIsPraise] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // AI-driven follow-up state
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync with Local Storage
  useEffect(() => {
    const saved = localStorage.getItem("restoration_prayers");
    if (saved) {
      try {
        setPrayers(JSON.parse(saved));
      } catch (e) {
        setPrayers(INITIAL_PRAYERS);
      }
    } else {
      setPrayers(INITIAL_PRAYERS);
    }
  }, []);

  const savePrayers = (list: PrayerRequest[]) => {
    setPrayers(list);
    localStorage.setItem("restoration_prayers", JSON.stringify(list));
  };

  const fetchFollowUp = async (prayer: PrayerRequest) => {
    if (prayer.aiFollowUp) {
      // Toggle if already exists
      setExpandedId(expandedId === prayer.id ? null : prayer.id);
      return;
    }

    setLoadingId(prayer.id);
    try {
      const res = await fetch("/api/prayer-followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: prayer.name,
          text: prayer.text,
          category: prayer.category,
          prayedCount: prayer.prayedCount,
        }),
      });

      if (!res.ok) throw new Error("Failed to load");

      const data = await res.json();
      const updated = prayers.map((p) => {
        if (p.id === prayer.id) {
          return {
            ...p,
            aiFollowUp: {
              message: data.message,
              verse: data.verse,
              communitySummary: data.communitySummary,
              generatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            },
          };
        }
        return p;
      });

      savePrayers(updated);
      setExpandedId(prayer.id);

      // Save to user prayer list for sermon recommendations
      const inferredNeeds = JSON.parse(localStorage.getItem("inferred_needs") || "[]");
      if (!inferredNeeds.includes(prayer.category)) {
        inferredNeeds.push(prayer.category);
        localStorage.setItem("inferred_needs", JSON.stringify(inferredNeeds));
        // Dispatch custom event to notify SermonLibrary
        window.dispatchEvent(new Event("prayer-needs-updated"));
      }

    } catch (error) {
      console.error("AI Follow-up generation error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newPrayer: PrayerRequest = {
      id: `p-${Date.now()}`,
      name,
      text,
      category,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      prayedCount: 1,
      isPraiseReport: isPraise
    };

    const updated = [newPrayer, ...prayers];
    savePrayers(updated);

    // Track user-submitted prayer categories for sermon library recommendations
    const inferredNeeds = JSON.parse(localStorage.getItem("inferred_needs") || "[]");
    if (!inferredNeeds.includes(category)) {
      inferredNeeds.push(category);
      localStorage.setItem("inferred_needs", JSON.stringify(inferredNeeds));
      window.dispatchEvent(new Event("prayer-needs-updated"));
    }
    
    setName("");
    setText("");
    setIsPraise(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handlePray = (id: string) => {
    const updated = prayers.map((p) => {
      if (p.id === id) {
        return { ...p, prayedCount: p.prayedCount + 1 };
      }
      return p;
    });
    savePrayers(updated);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Urgent": return "bg-rose-500/25 text-rose-400 border-rose-500/40";
      case "Health": return "bg-emerald-500/25 text-emerald-400 border-emerald-500/40";
      case "Financial": return "bg-gold/20 text-gold-light border-gold/30";
      case "Marriage": return "bg-pink-500/25 text-pink-400 border-pink-500/40";
      case "Youth": return "bg-purple-500/25 text-purple-400 border-purple-500/40";
      default: return "bg-royal-blue/20 text-sky-400 border-royal-blue/30";
    }
  };

  return (
    <section id="prayer" className="py-20 px-4 md:px-8 bg-navy-dark text-white relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Form submission */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-rose-400 font-bold">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Altar of Intercession</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Prayer Center</h2>
            <p className="font-serif italic text-slate-300 text-sm">
              "For where two or three are gathered together in my name, there am I in the midst of them." Submit your needs or praise reports to our Pastors and Prayer warriors.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
            {submitted && (
              <div className="absolute inset-0 bg-navy-dark/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-display font-bold text-lg">Request Received!</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xs">
                  Your petition has been added to our electronic Prayer Wall. Our intercessors and Lead Pastors Apostle David and Prophetess Maria Martinez pray over every submission.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display font-bold text-base text-white mb-2 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-gold" />
                <span>Submit Petitions & Praises</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name (or Anonymous)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rodriguez"
                  className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                  required
                  id="prayer-input-name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Prayer Petition or Praise Report details</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="State your petition or praise report clearly so our prayer circle can align with you in faith..."
                  rows={4}
                  className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors resize-none"
                  required
                  id="prayer-input-text"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                    id="prayer-select-category"
                  >
                    <option value="Urgent">Urgent 🔥</option>
                    <option value="Health">Healing / Health 🩺</option>
                    <option value="Family">Family / Children 🏠</option>
                    <option value="Financial">Financial / Job 💼</option>
                    <option value="Marriage">Marriage 💍</option>
                    <option value="Youth">Youth ⚡</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer bg-navy-dark/40 border border-white/15 rounded-xl px-4 py-3 text-xs text-slate-300 hover:text-white select-none">
                    <input
                      type="checkbox"
                      checked={isPraise}
                      onChange={(e) => setIsPraise(e.target.checked)}
                      className="accent-royal-blue"
                      id="prayer-checkbox-praise"
                    />
                    <span>Praise Report 🎉</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-royal-blue font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg"
                id="btn-prayer-submit"
              >
                Place on Prayer Altar
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Public Prayer Wall scrollboard */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="font-display font-bold text-lg flex items-center gap-2 text-white">
              <Flame className="text-gold w-5 h-5" />
              <span>Restoration Prayer Wall</span>
            </h3>
            <span className="bg-royal-blue/25 text-sky-400 text-[10px] font-mono px-3 py-1 rounded-full border border-royal-blue/30 font-bold uppercase">
              {prayers.length} active circles
            </span>
          </div>

          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 scrollbar-thin">
            {prayers.map((prayer) => (
              <div
                key={prayer.id}
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:border-gold/30 ${
                  prayer.isPraiseReport ? "bg-emerald-500/5 border-emerald-500/20" : "border-white/5"
                }`}
                id={`prayer-wall-card-${prayer.id}`}
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-white/5 rounded-xl">
                      <User className="w-4 h-4 text-royal-blue" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-white">{prayer.name}</h4>
                      <span className="text-[10px] text-slate-400">{prayer.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {prayer.isPraiseReport && (
                      <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full">
                        Praise Report
                      </span>
                    )}
                    <span className={`text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full border ${getCategoryColor(prayer.category)}`}>
                      {prayer.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-serif italic mb-4">
                  "{prayer.text}"
                </p>

                <div className="border-t border-white/5 pt-3.5 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePray(prayer.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 rounded-xl text-xs text-slate-300 hover:text-rose-400 font-bold transition-all"
                      id={`btn-pray-increment-${prayer.id}`}
                    >
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span>Pray for this ({prayer.prayedCount})</span>
                    </button>

                    <button
                      onClick={() => fetchFollowUp(prayer)}
                      disabled={loadingId === prayer.id}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/25 hover:border-gold/40 text-gold-light text-xs rounded-xl font-bold transition-all disabled:opacity-50"
                      id={`btn-ai-followup-${prayer.id}`}
                    >
                      {loadingId === prayer.id ? (
                        <Loader className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      <span>{prayer.aiFollowUp ? "View AI Care Letter" : "Grace AI Follow-Up"}</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Pastors are praying
                  </span>
                </div>

                {/* Expanded AI Care Letter Section */}
                {expandedId === prayer.id && prayer.aiFollowUp && (
                  <div className="mt-5 pt-5 border-t border-white/10 space-y-4 animate-fadeIn" id={`ai-followup-panel-${prayer.id}`}>
                    <div className="flex items-center gap-2 text-gold">
                      <Sparkles className="w-4 h-4" />
                      <h5 className="text-[11px] font-extrabold uppercase tracking-wider font-display">🛡️ AI Pastoral Care Letter</h5>
                    </div>

                    {/* Encapsulating Message */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed font-sans">
                      <p>{prayer.aiFollowUp.message}</p>
                    </div>

                    {/* Bible Scripture */}
                    <div className="bg-gold/10 border border-gold/15 rounded-2xl p-4 text-left">
                      <span className="text-[9px] uppercase font-bold text-gold tracking-widest block mb-1">Restoration Scripture</span>
                      <p className="text-xs text-slate-100 font-serif italic">"{prayer.aiFollowUp.verse.split(" - ")[1] || prayer.aiFollowUp.verse}"</p>
                      <span className="block text-[10px] text-gold font-bold mt-2 text-right">— {prayer.aiFollowUp.verse.split(" - ")[0]}</span>
                    </div>

                    {/* Community Focus */}
                    <div className="bg-royal-blue/10 border border-royal-blue/15 rounded-2xl p-4 text-xs text-slate-300 leading-relaxed font-sans flex items-start gap-2.5">
                      <div className="bg-royal-blue/20 p-2 rounded-lg text-royal-blue">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-sky-400 tracking-wider block mb-0.5">Community Intercession</span>
                        <p>{prayer.aiFollowUp.communitySummary}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
