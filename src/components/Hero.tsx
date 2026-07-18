import React, { useState, useEffect } from "react";
import { Play, Calendar, HeartHandshake, BookOpen, Users, Compass, Check, MapPin, Clock, X, Sparkles } from "lucide-react";

interface HeroProps {
  visitorType: "new" | "member" | "seeker";
  triggerSermonOpen: (sermonId: string) => void;
  setCurrentPage: (page: string) => void;
}

const backgroundImages = [
  "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=1600", // Glorious sanctuary lighting
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600", // Cinematic Worship
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600", // Inspiring Sunrise
];

export default function Hero({ visitorType, triggerSermonOpen, setCurrentPage }: HeroProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  
  // RSVP Form details
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpDate, setRsvpDate] = useState("Sunday 10:15 AM");
  const [rsvpKidsCount, setRsvpKidsCount] = useState(0);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Background rotater
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName && rsvpEmail) {
      setRsvpSubmitted(true);
    }
  };

  const handleSectionScroll = (id: string) => {
    if (id === "live") {
      setCurrentPage("live");
    } else if (id === "sermons") {
      setCurrentPage("sermons");
    } else if (id === "prayer" || id === "bible-study-result" || id === "bible-study-input") {
      setCurrentPage("prayer");
    } else if (id === "ministries") {
      setCurrentPage("ministries");
    } else if (id === "giving") {
      setCurrentPage("giving");
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between text-white overflow-hidden py-12 px-4 md:px-8 text-left">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(5, 11, 20, 0.75), rgba(5, 11, 20, 0.98)), url(${img})`,
              opacity: bgIndex === i ? 1 : 0,
              transform: bgIndex === i ? "scale(1.03)" : "scale(1.0)",
            }}
          />
        ))}
        {/* Sacred soft gold and purple lights overlay */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-royal-blue/20 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gold/10 rounded-full filter blur-[100px] pointer-events-none" />
      </div>

      {/* Main Core Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col lg:flex-row items-center gap-12 pt-6">
        {/* Left column: Headings */}
        <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-royal-blue/20 border border-royal-blue/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-300">
            <Compass className="w-3.5 h-3.5 text-royal-blue" />
            <span>Welcome to the House of Restoration</span>
          </div>

          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9]">
            Welcome<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 font-black">Home.</span>
          </h1>

          <p className="font-serif italic text-xl md:text-2xl text-slate-200">
            Experience God's Presence. Grow in Faith. Impact the World.
          </p>

          <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
            We are a vibrant, Spirit-filled church family led by Apostle David & Prophetess Maria Martinez, dedicated to walking in apostolic grace, restoring families, and training leaders.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={() => setIsRsvpOpen(true)}
              className="px-8 py-4 bg-royal-blue text-white rounded-full font-bold text-sm tracking-widest uppercase shadow-lg shadow-royal-blue/30 hover:scale-105 transition-transform duration-300 cursor-pointer"
              id="btn-plan-visit"
            >
              Plan Your Visit
            </button>
            <button
              onClick={() => handleSectionScroll("live")}
              className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/10 hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center gap-2"
              id="btn-watch-live-hero"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Live</span>
            </button>
          </div>
        </div>

        {/* Right column: AI Personalized Card */}
        <div className="w-full lg:w-[420px]">
          {visitorType === "new" && (
            /* New Visitor Content Card */
            <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden fade-in-up" id="personalized-card-new">
              <div className="absolute top-0 right-0 bg-gold/20 text-gold-light text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-bl-xl border-l border-b border-white/10 font-display font-extrabold">
                New Visitor Guide
              </div>
              <h3 className="font-display text-lg font-bold mb-3 text-white">First Time Here?</h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed font-sans">
                We are excited to meet you! Here is a quick guide to what you can expect when you join us this Sunday:
              </p>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3.5 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="bg-royal-blue p-2 rounded-lg text-white">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-white">Sunday Early Celebration</h4>
                    <p className="text-[11px] text-slate-400">Praise, Testimonies • 10:15 AM SAST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="bg-gold p-2 rounded-lg text-navy-dark">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-white">Location & Welcome</h4>
                    <p className="text-[11px] text-slate-400">11 Lower Maynard Road, Wynberg, Cape Town</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="bg-sky-500 p-2 rounded-lg text-white">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-white">Kingdom Kids Church</h4>
                    <p className="text-[11px] text-slate-400">Safe check-in and beautiful worship/lessons for kids ages 1-11.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsRsvpOpen(true)}
                className="mt-5 w-full py-3 bg-white text-navy-dark hover:bg-gold hover:text-navy-dark transition-colors font-bold rounded-xl text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer"
                id="btn-rsvp-guest"
              >
                Let Us Know You're Coming
              </button>
            </div>
          )}

          {visitorType === "seeker" && (
            /* Seeker Content Card (AI Bible Study / Hope Focus) */
            <div className="glass-panel rounded-2xl p-6 border border-gold/30 shadow-2xl relative overflow-hidden fade-in-up" id="personalized-card-seeker">
              <div className="absolute top-0 right-0 bg-gold/25 text-gold-light text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-bl-xl border-l border-b border-white/10 font-display font-extrabold">
                Seeker Blueprint
              </div>
              <h3 className="font-display text-lg font-bold mb-3 text-gold flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Exploring Faith?
              </h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed font-sans">
                It's completely okay to have questions, doubts, or feel anxious. God's restorative word is here to anchor your soul. Try our interactive tools:
              </p>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3.5 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleSectionScroll("bible-study-result")}>
                  <div className="bg-gold p-2 rounded-lg text-navy-dark">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-white">AI Bible Companion</h4>
                    <p className="text-[11px] text-slate-400">Type how you feel, and receive custom devotional care and prayers instantly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleSectionScroll("prayer")}>
                  <div className="bg-rose-500 p-2 rounded-lg text-white">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-white">Prayer Wall</h4>
                    <p className="text-[11px] text-slate-400">Submit requests or view prayers from our beautiful intercession family.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSectionScroll("bible-study-input")}
                className="mt-5 w-full py-3 bg-gradient-to-r from-royal-blue to-blue-600 text-white hover:opacity-90 transition-all font-bold rounded-xl text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer"
                id="btn-goto-study"
              >
                <span>Soothe Your Soul Now</span>
              </button>
            </div>
          )}

          {visitorType === "member" && (
            /* Regular Member Personalized Content Card */
            <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden fade-in-up" id="personalized-card-member">
              <div className="absolute top-0 right-0 bg-royal-blue/30 text-sky-300 text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-bl-xl border-l border-b border-white/10 font-display font-extrabold">
                Member Hub
              </div>
              <h3 className="font-display text-lg font-bold mb-3">Welcome Back, Family!</h3>
              
              <div className="space-y-4 text-left">
                {/* Last watched sermon recommendation */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase text-gold font-bold tracking-wider">Continue Watching</span>
                    <span className="text-[10px] text-slate-400 font-mono">80% watched</span>
                  </div>
                  <h4 className="font-bold text-xs leading-tight mb-1">The Architecture of Restoration</h4>
                  <p className="text-[10px] text-slate-400 mb-2">By Apostle David Martinez</p>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="bg-royal-blue h-full w-[80%]" />
                  </div>
                  <button
                    onClick={() => triggerSermonOpen("s1")}
                    className="mt-2 text-[10px] text-sky-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                    id="btn-continue-sermon"
                  >
                    <Play className="w-3 h-3 fill-sky-400 hover:fill-white" /> Resume Sermon Study
                  </button>
                </div>

                {/* Study Recommendation */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex gap-3 items-center">
                  <BookOpen className="w-5 h-5 text-royal-blue shrink-0" />
                  <div>
                    <h5 className="font-semibold text-xs">Today's Study</h5>
                    <p className="text-[10px] text-slate-400">Restoration Devotional & Weekly Scriptures</p>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2 pt-1">
                  <button
                    onClick={() => handleSectionScroll("ministries")}
                    className="flex-1 py-2 text-center border border-white/10 hover:border-royal-blue hover:bg-royal-blue/10 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    id="btn-member-smallgroups"
                  >
                    My Life Group
                  </button>
                  <button
                    onClick={() => handleSectionScroll("giving")}
                    className="flex-1 py-2 text-center bg-royal-blue hover:bg-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    id="btn-member-give"
                  >
                    Manage Giving
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cards (Bottom section) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Upcoming Event */}
        <div
          onClick={() => handleSectionScroll("ministries")}
          className="glass-panel p-4 rounded-xl border border-white/5 cursor-pointer glass-card-hover text-left flex flex-col justify-between h-[120px]"
          id="hero-card-event"
        >
          <div className="flex items-center justify-between text-gold">
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Event</span>
          </div>
          <div>
            <h4 className="font-bold text-xs truncate">Prophetic Restoration</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">July 24, 7:00 PM</p>
          </div>
        </div>

        {/* Card 2: Prayer Request */}
        <div
          onClick={() => handleSectionScroll("prayer")}
          className="glass-panel p-4 rounded-xl border border-white/5 cursor-pointer glass-card-hover text-left flex flex-col justify-between h-[120px]"
          id="hero-card-prayer"
        >
          <div className="flex items-center justify-between text-rose-400">
            <HeartHandshake className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Prayer</span>
          </div>
          <div>
            <h4 className="font-bold text-xs">Submit Request</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">We stand with you</p>
          </div>
        </div>

        {/* Card 3: Latest Sermon */}
        <div
          onClick={() => triggerSermonOpen("s1")}
          className="glass-panel p-4 rounded-xl border border-white/5 cursor-pointer glass-card-hover text-left flex flex-col justify-between h-[120px]"
          id="hero-card-sermon"
        >
          <div className="flex items-center justify-between text-sky-400">
            <BookOpen className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Sermon</span>
          </div>
          <div>
            <h4 className="font-bold text-xs truncate">Divine Architecture</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Apostle David Martinez</p>
          </div>
        </div>

        {/* Card 4: Join Small Group */}
        <div
          onClick={() => handleSectionScroll("ministries")}
          className="glass-panel p-4 rounded-xl border border-white/5 cursor-pointer glass-card-hover text-left flex flex-col justify-between h-[120px]"
          id="hero-card-groups"
        >
          <div className="flex items-center justify-between text-purple-400">
            <Users className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-wider font-bold">Connect</span>
          </div>
          <div>
            <h4 className="font-bold text-xs">Join Small Group</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Find family & friends</p>
          </div>
        </div>

        {/* Card 5: Live Service Status */}
        <div
          onClick={() => handleSectionScroll("live")}
          className="glass-panel p-4 rounded-xl border border-white/5 cursor-pointer glass-card-hover text-left flex flex-col justify-between h-[120px] col-span-2 md:col-span-1"
          id="hero-card-live"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-emerald-400">STANDBY</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Services</span>
          </div>
          <div>
            <h4 className="font-bold text-xs">Live Countdown</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Worship with us live</p>
          </div>
        </div>
      </div>

      {/* "Plan Your Visit" RSVP Modal */}
      {isRsvpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/95 backdrop-blur-md" id="rsvp-modal">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 md:p-8 border border-white/15 shadow-2xl relative fade-in-up">
            <button
              onClick={() => {
                setIsRsvpOpen(false);
                setRsvpSubmitted(false);
                setRsvpName("");
                setRsvpEmail("");
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              id="btn-close-rsvp"
            >
              <X className="w-5 h-5" />
            </button>

            {!rsvpSubmitted ? (
              <>
                <div className="text-center mb-6 text-left">
                  <div className="mx-auto w-12 h-12 bg-royal-blue/20 rounded-full flex items-center justify-center mb-2.5 text-royal-blue">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-center">Plan Your Visit</h3>
                  <p className="text-xs text-slate-300 mt-1 text-center">We can't wait to welcome you! Fill out this form and we'll have a host waiting for you at the front doors.</p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Samuel Martinez"
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="rsvp-input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="e.g. samuel@gmail.com"
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="rsvp-input-email"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service Date/Time</label>
                      <select
                        value={rsvpDate}
                        onChange={(e) => setRsvpDate(e.target.value)}
                        className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                        id="rsvp-select-date"
                      >
                        <option value="Sunday 10:15 AM">Sunday 10:15 AM</option>
                        <option value="Tuesday 9:30 PM">Tuesday 9:30 PM</option>
                        <option value="Thursday 7:15 PM">Thursday 7:15 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bringing Kids (Ages 1-11)?</label>
                      <input
                        type="number"
                        min="0"
                        max="8"
                        value={rsvpKidsCount}
                        onChange={(e) => setRsvpKidsCount(parseInt(e.target.value) || 0)}
                        className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-royal-blue transition-colors"
                        id="rsvp-input-kids"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-royal-blue font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-royal-blue/20 cursor-pointer"
                    id="btn-submit-rsvp"
                  >
                    Confirm My Welcome Package
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">See You There, {rsvpName}!</h3>
                <p className="text-sm text-slate-300 mt-2 max-w-sm mx-auto">
                  Your Welcome Package has been generated and sent to <span className="font-semibold text-white">{rsvpEmail}</span>.
                </p>

                <div className="my-6 p-4 bg-white/5 border border-white/15 rounded-xl text-left text-xs space-y-3 max-w-sm mx-auto">
                  <h4 className="font-bold text-center text-gold border-b border-white/10 pb-2 uppercase tracking-widest text-[10px]">Your Digital Guest Pass</h4>
                  <p className="flex justify-between"><span>Guest:</span> <strong className="text-white">{rsvpName}</strong></p>
                  <p className="flex justify-between"><span>Selected Service:</span> <strong className="text-white">{rsvpDate}</strong></p>
                  {rsvpKidsCount > 0 && (
                    <p className="flex justify-between"><span>Kingdom Kids Registered:</span> <strong className="text-white">{rsvpKidsCount} children</strong></p>
                  )}
                  <p className="text-[10px] text-slate-400 text-center italic pt-1">Present this screen at the Guest Welcome Lounge for free coffee & a customized study Bible!</p>
                </div>

                <button
                  onClick={() => {
                    setIsRsvpOpen(false);
                    setRsvpSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-white text-navy-dark hover:bg-gold hover:text-navy-dark rounded-xl font-bold text-xs uppercase tracking-wide transition-colors"
                  id="btn-close-rsvp-success"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
