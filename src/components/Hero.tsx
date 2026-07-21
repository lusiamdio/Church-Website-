import React, { useState, useEffect } from "react";
import { Play, Calendar, HeartHandshake, BookOpen, Users, Compass, Check, MapPin, Clock, X, Sparkles } from "lucide-react";

interface HeroProps {
  visitorType: "new" | "member" | "seeker";
  setCurrentPage: (page: string) => void;
}

const backgroundImages = [
  "https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/626447856_122177535308392779_8420774976801370108_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1248&ctp=s2048x1248&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qlvJPjHsD1cQ7kNvwH5PPc1&_nc_oc=AdpH5eEYrW7MMRQJ6BOvRJKP6YnBe3i7R9NBWKS6L15GzySH9gfiMFvgSysB3XPOthw&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=VTWlkeKiMRXXqlgtvlVUDA&_nc_ss=7b2a8&oh=00_AQAHwGUdsCtbTrjIAUxZ52wXLRDUCy0DyOsvY8Ed1RoXoQ&oe=6A65A839",
  "https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/624572825_122177535260392779_319564477502090915_n.jpg?stp=dst-jpg_tt6&cstp=mx1819x817&ctp=s1819x817&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xQ3fzEP6XWgQ7kNvwGVmWtb&_nc_oc=Ado8PxTINxY8P4gZbOHpcRd7BAB0SY__g9lvBNXL8-UCw4Czdt7kmSH_-DncemEulN0&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=uM4YrPh0k3vFtt0lx5lJQw&_nc_ss=7b2a8&oh=00_AQDrYdOvEoMnC3fMFq3YUnfJxuGIYddxfcTxTAzgzQ7X4w&oe=6A65A63F",
  "https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/625009671_122177535212392779_6520615516891370886_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1152&ctp=s2048x1152&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=uqkV763AeHgQ7kNvwHrolBh&_nc_oc=Adod1z2wawJLhO5Az8rLEqifIdQo5PRAJA7Ajsq4KUdi9p_jcBdV9jD_RTY1uCeqWwE&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=uM4YrPh0k3vFtt0lx5lJQw&_nc_ss=7b2a8&oh=00_AQCRDg6qtejfC2a5wsAxkOroqtgzVDHJ0ugwr_lVl-gvSw&oe=6A65955F",
];

export default function Hero({ visitorType, setCurrentPage }: HeroProps) {
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
            /* Seeker Content Card */
            <div className="glass-panel rounded-2xl p-6 border border-gold/30 shadow-2xl relative overflow-hidden fade-in-up" id="personalized-card-seeker">
              <div className="absolute top-0 right-0 bg-gold/25 text-gold-light text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-bl-xl border-l border-b border-white/10 font-display font-extrabold">
                Seeker Blueprint
              </div>
              <h3 className="font-display text-lg font-bold mb-3 text-gold flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Exploring Faith?
              </h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed font-sans">
                It's completely okay to have questions or be searching for community. Welcome to our restoration family!
              </p>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3.5 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleSectionScroll("ministries")}>
                  <div className="bg-gold p-2 rounded-lg text-navy-dark">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-white">Find A Circle</h4>
                    <p className="text-[11px] text-slate-400">Discover small groups and connect with welcoming friends.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleSectionScroll("live")}>
                  <div className="bg-sky-500 p-2 rounded-lg text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-white">Live Service Stream</h4>
                    <p className="text-[11px] text-slate-400">Experience interactive bilingual restoration worship online.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSectionScroll("ministries")}
                className="mt-5 w-full py-3 bg-gradient-to-r from-royal-blue to-blue-600 text-white hover:opacity-90 transition-all font-bold rounded-xl text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer"
                id="btn-goto-study"
              >
                <span>Discover Fellowship Circles</span>
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
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex gap-3 items-center">
                  <Users className="w-5 h-5 text-royal-blue shrink-0" />
                  <div>
                    <h5 className="font-semibold text-xs">Active Restoration Circles</h5>
                    <p className="text-[10px] text-slate-400">Join life groups and volunteer opportunities</p>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2 pt-1">
                  <button
                    onClick={() => handleSectionScroll("ministries")}
                    className="flex-1 py-2.5 text-center border border-white/10 hover:border-royal-blue hover:bg-royal-blue/10 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    id="btn-member-smallgroups"
                  >
                    My Life Group
                  </button>
                  <button
                    onClick={() => handleSectionScroll("giving")}
                    className="flex-1 py-2.5 text-center bg-royal-blue hover:bg-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider"
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
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* Card 2: Join Small Group */}
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

        {/* Card 3: Live Service Status */}
        <div
          onClick={() => handleSectionScroll("live")}
          className="glass-panel p-4 rounded-xl border border-white/5 cursor-pointer glass-card-hover text-left flex flex-col justify-between h-[120px]"
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
