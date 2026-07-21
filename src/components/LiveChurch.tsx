import React, { useState, useEffect } from "react";
import { Heart, Share2, Users, Clock, DollarSign, Sparkles, Check, CheckCircle, Youtube, ExternalLink } from "lucide-react";

export default function LiveChurch() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Interactive action states
  const [showMicroGive, setShowMicroGive] = useState(false);
  const [microGiveSuccess, setMicroGiveSuccess] = useState(false);
  const [microAmount, setMicroAmount] = useState(25);
  const [donorName, setDonorName] = useState("");

  // Calculate countdown to next Sunday 10:15 AM SAST
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // Target: Next Sunday 10:15 AM SAST
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
      nextSunday.setHours(10, 15, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff <= 0) {
        // If Sunday service is active, display 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMicroGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMicroGiveSuccess(true);
    setTimeout(() => {
      setMicroGiveSuccess(false);
      setShowMicroGive(false);
      setDonorName("");
    }, 4000);
  };

  return (
    <section id="live" className="py-20 px-4 md:px-8 bg-navy-dark text-white text-left relative">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-rose-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 live-indicator" />
            <span>Streaming Sanctuary</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Live Broadcast Portal</h2>
          <p className="font-serif italic text-slate-300 text-sm max-w-lg mx-auto">
            Can't join us in person? Connect into the Sanctuary live stream and sow seed offerings from anywhere globally.
          </p>
        </div>

        {/* Live status & countdown bar */}
        <div className="glass-panel border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center gap-4 text-left">
            <div className="bg-rose-500 p-3 rounded-full text-white animate-pulse">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">Next Sunday Worship Assembly</h4>
              <p className="text-xs text-slate-400 mt-0.5">Sunday morning Early Celebration - Praise & Testimonies begins at 10:15 AM SAST.</p>
            </div>
          </div>

          {/* Countdown timer ticking */}
          <div className="flex items-center gap-3 md:gap-4 select-none">
            <div className="bg-navy-dark border border-white/10 p-3 rounded-xl min-w-[60px] text-center shadow">
              <span className="font-display font-bold text-lg md:text-xl text-gold">{timeLeft.days}</span>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">Days</span>
            </div>
            <div className="bg-navy-dark border border-white/10 p-3 rounded-xl min-w-[60px] text-center shadow">
              <span className="font-display font-bold text-lg md:text-xl text-gold">{timeLeft.hours}</span>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">Hrs</span>
            </div>
            <div className="bg-navy-dark border border-white/10 p-3 rounded-xl min-w-[60px] text-center shadow">
              <span className="font-display font-bold text-lg md:text-xl text-gold">{timeLeft.minutes}</span>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">Min</span>
            </div>
            <div className="bg-navy-dark border border-white/10 p-3 rounded-xl min-w-[60px] text-center shadow">
              <span className="font-display font-bold text-lg md:text-xl text-gold">{timeLeft.seconds}</span>
              <span className="block text-[8px] uppercase tracking-wider text-slate-400 mt-0.5">Sec</span>
            </div>
          </div>
        </div>

        {/* Central Theater Mode Player */}
        <div className="space-y-6">
          <div className="bg-black aspect-video rounded-3xl overflow-hidden border border-white/15 relative group shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/live_stream?channel=UC3N7NUaok4ioUyhdVyB-JsA"
              title="House of Restoration TV Live Stream Broadcast"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* YouTube Channel Access Banner */}
          <div className="bg-gradient-to-r from-rose-950/40 via-navy-light/40 to-rose-950/40 border border-rose-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-600/30">
                <Youtube className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  House of Restoration TV
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 font-mono font-bold px-2 py-0.5 rounded border border-rose-500/30">UC3N7NUaok4ioUyhdVyB-JsA</span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">Official YouTube Channel for Sunday worship, live broadcasts & teachings.</p>
              </div>
            </div>

            <a
              href="https://www.youtube.com/channel/UC3N7NUaok4ioUyhdVyB-JsA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/20 hover:scale-105 shrink-0"
              id="btn-open-youtube-channel"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Broadcast Information & Interaction Center */}
          <div className="bg-navy-light/20 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div className="text-left space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Stream Status: Active Broadcast</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 flex items-center gap-1">
                    <Youtube className="w-3 h-3" /> @HouseofRestorationtv
                  </span>
                </div>
                <h3 className="font-display font-black text-xl md:text-2xl text-white">Sunday Early Celebration (Live Worship Assembly)</h3>
                <p className="text-xs text-slate-300">Presided by Lead Pastors Apostle David & Prophetess Maria Martinez</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs text-slate-300">
                  <Users className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span>247 watching online</span>
                </span>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "House of Restoration TV Live Stream", url: "https://www.youtube.com/channel/UC3N7NUaok4ioUyhdVyB-JsA" });
                    } else {
                      navigator.clipboard.writeText("https://www.youtube.com/channel/UC3N7NUaok4ioUyhdVyB-JsA");
                      alert("House of Restoration TV YouTube channel link copied to clipboard!");
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold rounded-xl text-xs text-slate-200 transition-all cursor-pointer"
                  title="Share Stream"
                  id="btn-stream-share"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-300" />
                  <span>Share Broadcast</span>
                </button>
              </div>
            </div>

            {/* Micro Quick Interaction Buttons */}
            <div className="flex justify-center">
              {/* Quick Sow Seed Button */}
              <button
                onClick={() => {
                  setShowMicroGive(!showMicroGive);
                }}
                className={`w-full max-w-md py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer border ${
                  showMicroGive 
                    ? "bg-gold border-gold text-navy-dark shadow-lg shadow-gold/10" 
                    : "bg-gold/10 hover:bg-gold/20 border-gold/30 text-gold hover:border-gold"
                }`}
                id="btn-stream-quickgive"
              >
                <DollarSign className="w-4 h-4" />
                <span>Sow Instant Worship Offering</span>
              </button>
            </div>

            {/* Quick Sowing Interactive Container */}
            {showMicroGive && (
              <div className="bg-navy-dark/60 border border-gold/30 rounded-2xl p-5 md:p-6 space-y-4 fade-in-up" id="quick-sow-container">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span className="text-xs font-bold uppercase tracking-wider text-gold">Sow Micro Seed Offering</span>
                  </div>
                  <button 
                    onClick={() => setShowMicroGive(false)} 
                    className="text-[10px] text-slate-400 hover:text-white uppercase tracking-widest font-bold"
                  >
                    Hide
                  </button>
                </div>

                {microGiveSuccess ? (
                  <div className="text-center py-6 space-y-2">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                    <h5 className="font-display font-black text-base text-white">Offering Received!</h5>
                    <p className="text-xs text-slate-300">Thank you, {donorName || "Beloved"}, for your seed offering of ${microAmount}. May God restore it tenfold!</p>
                  </div>
                ) : (
                  <form onSubmit={handleMicroGiveSubmit} className="space-y-4 text-left">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sow a quick seed of support for the restoration broadcast. Select an amount or enter your name below:
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[15, 30, 60].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setMicroAmount(amt)}
                          className={`py-2.5 text-center text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            microAmount === amt 
                              ? "bg-gold border-gold text-navy-dark" 
                              : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Your full name"
                        className="flex-1 bg-navy-dark/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gold hover:bg-yellow-600 text-navy-dark font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Sow ${microAmount} Seed
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}


          </div>
        </div>
      </div>
    </section>
  );
}
