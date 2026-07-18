import React, { useState, useEffect } from "react";
import { Heart, Share2, Users, Clock, DollarSign, Sparkles, Check, CheckCircle } from "lucide-react";

export default function LiveChurch() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Interactive action states
  const [showMicroGive, setShowMicroGive] = useState(false);
  const [microGiveSuccess, setMicroGiveSuccess] = useState(false);
  const [microAmount, setMicroAmount] = useState(25);
  const [donorName, setDonorName] = useState("");
  
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);
  const [prayerText, setPrayerText] = useState("");
  const [showPrayerForm, setShowPrayerForm] = useState(false);

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

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    setPrayerSubmitted(true);
    setTimeout(() => {
      setPrayerSubmitted(false);
      setShowPrayerForm(false);
      setPrayerText("");
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
            Can't join us in person? Connect into the Sanctuary live stream, submit digital prayer cards, and sow seed offerings from anywhere globally.
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
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=0"
              title="Sanctuary of Jesus Christ Live Stream Broadcast"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Broadcast Information & Interaction Center */}
          <div className="bg-navy-light/20 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div className="text-left space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Stream Status: Active Broadcast</span>
                </div>
                <h3 className="font-display font-black text-xl md:text-2xl text-white">Sunday Early Celebration (Live Worship Assembly)</h3>
                <p className="text-xs text-slate-300">Presided by Lead Pastors Apostle David & Prophetess Maria Martinez</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs text-slate-300">
                  <Users className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span>247 watching online</span>
                </span>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Sanctuary Live Stream", url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Stream link copied to clipboard!");
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quick Sow Seed Button */}
              <button
                onClick={() => {
                  setShowMicroGive(!showMicroGive);
                  setShowPrayerForm(false);
                }}
                className={`py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer border ${
                  showMicroGive 
                    ? "bg-gold border-gold text-navy-dark shadow-lg shadow-gold/10" 
                    : "bg-gold/10 hover:bg-gold/20 border-gold/30 text-gold hover:border-gold"
                }`}
                id="btn-stream-quickgive"
              >
                <DollarSign className="w-4 h-4" />
                <span>Sow Instant Worship Offering</span>
              </button>

              {/* Quick Prayer Request Button */}
              <button
                onClick={() => {
                  setShowPrayerForm(!showPrayerForm);
                  setShowMicroGive(false);
                }}
                className={`py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer border ${
                  showPrayerForm
                    ? "bg-royal-blue border-royal-blue text-white shadow-lg shadow-royal-blue/10"
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 hover:text-white hover:border-white/30"
                }`}
                id="btn-stream-quickprayer"
              >
                <Heart className="w-4 h-4" />
                <span>Submit Live Prayer Card</span>
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

            {/* Quick Prayer Submission Interactive Container */}
            {showPrayerForm && (
              <div className="bg-navy-dark/60 border border-royal-blue/30 rounded-2xl p-5 md:p-6 space-y-4 fade-in-up" id="quick-prayer-container">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Submit Live Intercession request</span>
                  </div>
                  <button 
                    onClick={() => setShowPrayerForm(false)} 
                    className="text-[10px] text-slate-400 hover:text-white uppercase tracking-widest font-bold"
                  >
                    Hide
                  </button>
                </div>

                {prayerSubmitted ? (
                  <div className="text-center py-6 space-y-2">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                    <h5 className="font-display font-black text-base text-white">Prayer Sent to Altar!</h5>
                    <p className="text-xs text-slate-300">Your petition has been submitted instantly. Our intercessors are praying over this right now.</p>
                  </div>
                ) : (
                  <form onSubmit={handlePrayerSubmit} className="space-y-4 text-left">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Your prayer request will be sent directly to the prayer center and added to the intercessory list:
                    </p>
                    <div className="space-y-3">
                      <textarea
                        required
                        value={prayerText}
                        onChange={(e) => setPrayerText(e.target.value)}
                        placeholder="Write your brief prayer request here (e.g. family restore, physical healing, peace)..."
                        rows={3}
                        className="w-full bg-navy-dark/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-royal-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                        >
                          Submit to Altar
                        </button>
                      </div>
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
