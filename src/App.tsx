import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LiveChurch from "./components/LiveChurch";
import Ministries from "./components/Ministries";
import Giving from "./components/Giving";
import StaffDashboard from "./components/StaffDashboard";
import GraceAI from "./components/GraceAI";
import ForbesJournalSection from "./components/ForbesJournalSection";
import BlogArticlePage from "./components/BlogArticlePage";

import { Church, Calendar, MapPin, Phone, Mail, Compass, Shield, Clock, Facebook, Youtube, Instagram, Heart, Tv, BookOpen, HeartHandshake, Users, CreditCard, Map, Key, Send, Check, Newspaper } from "lucide-react";

export default function App() {
  // Personalization State
  const [visitorType, setVisitorType] = useState<"new" | "member" | "seeker">("new");
  
  // Accessibility State
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDyslexicFriendly, setIsDyslexicFriendly] = useState(false);
  const [textScale, setTextScale] = useState<"normal" | "large" | "extra">("normal");

  // Admin access state
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // Navigation state: 'home', 'journal', 'blog-article', 'live', 'ministries', 'giving'
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedArticleId, setSelectedArticleId] = useState<string>("blog-1");

  // Mailing list state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setIsSubscribed(false);
    }, 4000);
  };

  // Scroll to top on page redirects/transitions to mimic a new webpage experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  // Apply accessibility classes to document body
  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add("high-contrast-mode");
    } else {
      root.classList.remove("high-contrast-mode");
    }

    if (isDyslexicFriendly) {
      root.classList.add("dyslexia-mode");
    } else {
      root.classList.remove("dyslexia-mode");
    }
  }, [isHighContrast, isDyslexicFriendly]);

  const getTextScaleClass = () => {
    switch (textScale) {
      case "large": return "text-scale-lg";
      case "extra": return "text-scale-xl";
      default: return "";
    }
  };

  return (
    <div 
      className={`min-h-screen bg-navy-dark text-slate-100 flex flex-col font-sans selection:bg-gold selection:text-navy-dark ${getTextScaleClass()}`}
      id="app-root-container"
    >
      {/* Header with Navigation & Personalization controls */}
      <Header 
        visitorType={visitorType}
        setVisitorType={setVisitorType}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isDyslexicFriendly={isDyslexicFriendly}
        setIsDyslexicFriendly={setIsDyslexicFriendly}
        textScale={textScale}
        setTextScale={setTextScale}
        showAdminPortal={showAdminPortal}
        setShowAdminPortal={setShowAdminPortal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Cinematic Hero Segment on Home Page */}
        {currentPage === "home" && (
          <>
            <Hero 
              visitorType={visitorType} 
              setCurrentPage={setCurrentPage}
            />
            
            {/* Elegant visual entry hubs to dedicated ministry pages on the Home landing page */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-navy-dark via-navy-light/10 to-navy-dark text-left" id="home-navigation-hub">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center md:text-left space-y-3 max-w-2xl">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">Explore sanctuary</span>
                  <h3 className="font-display text-3xl md:text-5xl font-black text-white leading-none tracking-tight">Our Dedicated Webpages</h3>
                  <p className="text-sm text-slate-300 font-serif italic">
                    Step inside specialized digital spaces. Each section acts as its own focused web experience for tithing, study, and interactive fellowships.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Journal Webpage Card */}
                  <div 
                    onClick={() => setCurrentPage("journal")}
                    className="group bg-navy-light/25 border border-gold/30 hover:border-gold hover:bg-gold/10 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[220px] shadow"
                  >
                    <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-gold transition-colors">Forbes Journal</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">Read Christian devotionals, news, and leadership intelligence.</p>
                    </div>
                  </div>

                  {/* Live Webpage Card */}
                  <div 
                    onClick={() => setCurrentPage("live")}
                    className="group bg-navy-light/25 border border-white/5 rounded-2xl p-6 hover:border-gold hover:bg-royal-blue/10 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[220px] shadow"
                  >
                    <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <Tv className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-gold transition-colors">Live Broadcast</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">Join services and watch live bilingual restoration worship streams.</p>
                    </div>
                  </div>

                  {/* Ministries Webpage Card */}
                  <div 
                    onClick={() => setCurrentPage("ministries")}
                    className="group bg-navy-light/25 border border-white/5 rounded-2xl p-6 hover:border-gold hover:bg-royal-blue/10 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[220px] shadow"
                  >
                    <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-gold transition-colors">Restoration Circles</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">Test your spiritual gifts and discover active church circles.</p>
                    </div>
                  </div>

                  {/* Giving Webpage Card */}
                  <div 
                    onClick={() => setCurrentPage("giving")}
                    className="group bg-navy-light/25 border border-white/5 rounded-2xl p-6 hover:border-gold hover:bg-royal-blue/10 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[220px] shadow"
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-gold transition-colors">Secure Giving</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-normal">Tithe, support community outreach missions, and sow seeds.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Forbes Style News & Blogs Section directly on Landing Page */}
            <ForbesJournalSection 
              onSelectArticle={(id) => {
                setSelectedArticleId(id);
                setCurrentPage("blog-article");
              }} 
            />
          </>
        )}

        {/* Forbes Journal Dedicated Webpage View */}
        {currentPage === "journal" && (
          <ForbesJournalSection 
            onSelectArticle={(id) => {
              setSelectedArticleId(id);
              setCurrentPage("blog-article");
            }} 
          />
        )}

        {/* Full Webpage Article View (Opens in a new webpage view and NOT as a modal) */}
        {currentPage === "blog-article" && (
          <BlogArticlePage 
            articleId={selectedArticleId}
            onBack={() => setCurrentPage("journal")}
            onSelectArticle={(id) => setSelectedArticleId(id)}
          />
        )}

        {/* Live Broadcast Feed (Dedicated Webpage View) */}
        {currentPage === "live" && <LiveChurch />}

        {/* Ministries & Tribes Segment + Volunteer Matching Quiz (Dedicated Webpage View) */}
        {currentPage === "ministries" && <Ministries />}

        {/* Secure Storehouse & Tithing Sower (Dedicated Webpage View) */}
        {currentPage === "giving" && <Giving />}

        {/* Toggleable Staff back-office telemetry portal */}
        {showAdminPortal && (
          <section className="bg-navy-light/20 border-t border-b border-white/5 py-12" id="admin-telemetry-portal-wrapper">
            <StaffDashboard />
          </section>
        )}
      </main>

      {/* Floating Sparkle AI Welcome Guide */}
      <GraceAI />

      {/* Dynamic Premium Footer with Map Anchor */}
      <footer className="bg-navy-dark border-t border-white/10 pt-16 pb-8 text-left" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-12">
          
          {/* Column 1: Church Bio & Vision */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-blue via-navy-light to-gold/90 border border-gold/40 p-2 shadow-lg shadow-royal-blue/20 flex items-center justify-center shrink-0">
                <Church className="w-5 h-5 text-white drop-shadow" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm tracking-wider text-white">SANCTUARY OF JESUS CHRIST</h4>
                <p className="text-[10px] text-gold tracking-widest uppercase font-bold leading-none mt-1">House of Restoration</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-serif italic">
              "We are an apostolic, multi-lingual, and tech-forward family focused on restoring hope, healing broken hearts, and empowering servants to impact Houston and the globe."
            </p>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" className="p-2.5 bg-white/5 hover:bg-royal-blue hover:text-white rounded-xl text-slate-400 transition-colors" title="Facebook Page">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/channel/UC3N7NUaok4ioUyhdVyB-JsA" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 hover:bg-rose-600 hover:text-white rounded-xl text-slate-400 transition-colors" title="House of Restoration TV Channel">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" className="p-2.5 bg-white/5 hover:bg-royal-blue hover:text-white rounded-xl text-slate-400 transition-colors" title="Instagram Daily devotion">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Weekly Assemblies */}
          <div className="md:col-span-3 space-y-4 text-xs text-slate-300">
            <h5 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/5 pb-2">Weekly Assemblies</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="block text-slate-200">Sunday Early Celebration</strong>
                  <span className="text-[10px] text-slate-400">Praise, Testimonies</span>
                </div>
                <span className="font-mono text-[11px] text-gold text-right shrink-0">10:15 AM SAST</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <strong className="block text-slate-200">Tuesday Online Intercession</strong>
                  <span className="text-[10px] text-slate-400">Online prayer service</span>
                </div>
                <span className="font-mono text-[11px] text-gold text-right shrink-0">9:30 PM SAST</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <strong className="block text-slate-200">Thursday Church Intercession</strong>
                  <span className="text-[10px] text-slate-400">Church intercession service</span>
                </div>
                <span className="font-mono text-[11px] text-gold text-right shrink-0">7:15 PM SAST</span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Directions Map Pin */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/5 pb-2">Find the House</h5>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-royal-blue shrink-0 mt-0.5" />
                <span>11 Lower Maynard Road, Wynberg, Cape Town</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-royal-blue shrink-0" />
                <span>+27 67 998 2100 | +27 74 349 0883</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-royal-blue shrink-0" />
                <span>contact@sjchchurch.org</span>
              </p>
            </div>

            {/* Simulated Vector / Satellite Map container */}
            <div className="bg-navy-light/45 border border-white/10 rounded-xl p-3 flex gap-3 items-center">
              <div className="w-12 h-12 bg-royal-blue/20 rounded-lg flex items-center justify-center text-royal-blue shrink-0">
                <Map className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h6 className="text-[11px] font-bold text-white">Plan Your Journey</h6>
                <p className="text-[9px] text-slate-400">Convenient parking spaces and fully secure Kingdom Kids check-in lobbies are open 30 mins before services.</p>
              </div>
            </div>
          </div>

          {/* Column 4: Join Our Mailing List */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/5 pb-2">Mailing List</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Join our list to receive weekly schedules, event highlights, sermon outlines, and fellowship notices directly to your inbox.
            </p>

            {isSubscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-2.5 text-emerald-400 animate-fadeIn" id="newsletter-success-banner">
                <Check className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-bold">Successfully subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5 text-left" id="newsletter-subscribe-form">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="your.email@address.com"
                    className="w-full bg-navy-light/45 border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                    id="newsletter-email-input"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-royal-blue hover:bg-royal-blue/90 text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                    title="Subscribe to updates"
                    id="newsletter-submit-button"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[9px] text-slate-500 leading-normal">
                  Receive restoration messages and weekly event invites. You can unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Lower Legal Bar & Covenant line */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-4">
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
            <span>© 2026 Sanctuary of Jesus Christ. All Rights Reserved.</span>
            <span className="hidden sm:inline">|</span>
            <a href="#giving" className="hover:text-white transition-colors">Giving Disclosures</a>
            <span className="hidden sm:inline">|</span>
            <button 
              onClick={() => {
                setShowAdminPortal(!showAdminPortal);
                if (!showAdminPortal) {
                  setTimeout(() => {
                    document.getElementById("staff-dashboard")?.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }
              }} 
              className="text-gold font-bold hover:underline cursor-pointer flex items-center gap-1"
              id="btn-footer-admin-toggle"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Pastoral Portal</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 italic font-serif">
            <span>"Restoring hope, rebuilding families."</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </footer>
    </div>
  );
}
