import React, { useState } from "react";
import { Book, Sparkles, Smile, MessageCircle, Heart, ShieldAlert, Compass, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";

interface Scripture {
  reference: string;
  text: string;
}

interface StudyResult {
  text: string;
  scriptures: Scripture[];
  devotion: string;
  prayer: string;
  churchGroup: string;
}

const FEELINGS = [
  { label: "Anxious / Worried", value: "anxious and worried about the future" },
  { label: "Grieving / Mourning", value: "grieving a loss and looking for comfort" },
  { label: "Stressed / Burned Out", value: "overwhelmed with work and stress" },
  { label: "Lonely / Forgotten", value: "isolated and seeking community" },
  { label: "Searching / Doubting", value: "searching for truth and spiritual direction" },
  { label: "Grateful / Joyful", value: "grateful and wanting to praise God" },
];

export default function BibleStudy() {
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [customFeeling, setCustomFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StudyResult | null>(null);

  const handleStudy = async (feelingString: string) => {
    if (!feelingString.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/bible-study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeling: feelingString }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Bible study load error:", error);
      // Hardcoded high-quality fallback
      setResult({
        text: "In the quietest moments, know that God is near. His restorative hand is ready to heal any anxious thoughts and lead you into absolute peace.",
        scriptures: [
          { reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
          { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." }
        ],
        devotion: "Experiencing peace begins with a shift in posture. When we cast our cares, we don't just throw them; we place them into the capable hands of the Creator who holds our tomorrow. Trust that He is restructuring your situation even as you read this.",
        prayer: "Lord, I give You my heavy concerns. Guard my mind and fill me with Your supernatural peace that exceeds all human understanding. Amen.",
        churchGroup: "Restoring Grace Support Group & United Prayer Team"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-navy-dark to-navy-light text-white relative">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-royal-blue/20 border border-royal-blue/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-sky-400 font-bold">
            <Book className="w-3.5 h-3.5 text-royal-blue animate-pulse" />
            <span>Interactive Sanctuary</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold">AI Bible Study & Emotional Companion</h2>
          <p className="font-serif italic text-slate-300 text-sm max-w-lg mx-auto">
            "Thy word is a lamp unto my feet, and a light unto my path." Type how you feel, and receive custom devotional guidance, prayers, and scripture anchors instantly.
          </p>
        </div>

        {/* Input panel */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gold text-left">Select how you feel today:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FEELINGS.map((feel) => (
                <button
                  key={feel.label}
                  onClick={() => {
                    setSelectedFeeling(feel.value);
                    setCustomFeeling("");
                    handleStudy(feel.value);
                  }}
                  className={`px-4 py-3 border rounded-xl text-xs font-semibold text-center transition-all ${
                    selectedFeeling === feel.value
                      ? "bg-royal-blue border-royal-blue text-white shadow-lg"
                      : "bg-navy-dark/40 border-white/10 text-slate-300 hover:border-gold hover:text-white"
                  }`}
                  id={`btn-feel-${feel.value.split(" ")[0]}`}
                >
                  {feel.label}
                </button>
              ))}
            </div>
          </div>

          {/* Or custom input */}
          <div className="border-t border-white/5 pt-5 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gold text-left">Or describe your feeling in detail:</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={customFeeling}
                onChange={(e) => {
                  setCustomFeeling(e.target.value);
                  setSelectedFeeling("");
                }}
                placeholder="e.g., I feel stressed about my job interview tomorrow..."
                className="flex-1 bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                id="bible-study-input"
              />
              <button
                onClick={() => handleStudy(customFeeling)}
                disabled={!customFeeling.trim() || loading}
                className="px-6 bg-gradient-to-r from-royal-blue to-blue-600 rounded-xl font-bold hover:shadow-lg text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50"
                id="btn-bible-study-submit"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-gold" />}
                <span>Study</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-royal-blue border-t-gold rounded-full animate-spin" />
              <Book className="w-4 h-4 text-white absolute top-4 left-4" />
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-widest animate-pulse">GENERATING SCRIPTURAL BLUEPRINT...</p>
          </div>
        )}

        {/* Study Result Scroll Card */}
        {result && (
          <div className="glass-panel rounded-3xl border border-gold/30 bg-gradient-to-br from-navy-dark via-navy-light/40 to-navy-dark p-6 md:p-10 shadow-2xl relative overflow-hidden fade-in-up text-left" id="bible-study-result">
            {/* Soft decorative golden line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-royal-blue via-gold to-royal-blue" />
            
            <div className="space-y-6">
              {/* Pastoral Paragraph */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-gold uppercase tracking-widest font-extrabold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Pastoral Guidance
                </span>
                <p className="font-serif italic text-base md:text-lg text-slate-100 leading-relaxed">
                  "{result.text}"
                </p>
              </div>

              {/* Scriptures */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 border-b border-white/5 pb-2">Anchoring Scriptures</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.scriptures?.map((s, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-gold-light text-xs font-bold uppercase tracking-wider font-display">
                        <Book className="w-4 h-4 text-gold shrink-0" />
                        <span>{s.reference}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                        "{s.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devotional study */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 border-b border-white/5 pb-2">Daily Devotion</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.devotion}
                </p>
              </div>

              {/* Personal prayer */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">Prayer of Restoration</h4>
                <p className="text-xs text-slate-200 font-serif italic leading-relaxed">
                  "{result.prayer}"
                </p>
              </div>

              {/* Suggested Church Support Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Community Circle: <strong className="text-white">{result.churchGroup}</strong></span>
                </span>
                <span className="text-[10px] text-slate-400 italic">Restoring you day by day.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
