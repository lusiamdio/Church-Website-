import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LiveChurch from "./components/LiveChurch";
import SermonLibrary from "./components/SermonLibrary";
import BibleStudy from "./components/BibleStudy";
import PrayerCenter from "./components/PrayerCenter";
import Ministries from "./components/Ministries";
import Giving from "./components/Giving";
import StaffDashboard from "./components/StaffDashboard";
import GraceAI from "./components/GraceAI";

import { Calendar, MapPin, Phone, Mail, Compass, Shield, Clock, Facebook, Youtube, Instagram, Heart } from "lucide-react";

export default function App() {
  // Personalization State
  const [visitorType, setVisitorType] = useState<"new" | "member" | "seeker">("new");
  
  // Accessibility State
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDyslexicFriendly, setIsDyslexicFriendly] = useState(false);
  const [textScale, setTextScale] = useState<"normal" | "large" | "extra">("normal");

  // Admin access state
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // External trigger navigation for sermons
  const [selectedSermonId, setSelectedSermonId] = useState<string | null>(null);

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

  const handleSermonSelection = (sermonId: string) => {
    setSelectedSermonId(sermonId);
    const element = document.getElementById("sermons");
    element?.scrollIntoView({ behavior: "smooth" });
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
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Cinematic Hero Segment */}
        <Hero 
          visitorType={visitorType} 
          triggerSermonOpen={handleSermonSelection}
        />

        {/* Live Broadcast Feed */}
        <LiveChurch />

        {/* Dynamic Netflix-style Sermon Catalog */}
        <SermonLibrary 
          selectedSermonId={selectedSermonId} 
          clearSermonSelection={() => setSelectedSermonId(null)}
        />

        {/* Interactive AI Bible Study Scroll */}
        <BibleStudy />

        {/* Interactive Intercession Board / Prayer Wall */}
        <PrayerCenter />

        {/* Ministries & Tribes Segment + Volunteer Matching Quiz */}
        <Ministries />

        {/* Secure Storehouse & Tithing Sower */}
        <Giving />

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
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-royal-blue to-gold rounded-xl flex items-center justify-center text-white font-extrabold shadow">
                ⛪
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm tracking-wider text-white">SANCTUARY OF JESUS CHRIST</h4>
                <p className="text-[10px] text-gold tracking-widest uppercase font-bold leading-none">House of Restoration</p>
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
              <a href="https://youtube.com" target="_blank" className="p-2.5 bg-white/5 hover:bg-royal-blue hover:text-white rounded-xl text-slate-400 transition-colors" title="Youtube Streams">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" className="p-2.5 bg-white/5 hover:bg-royal-blue hover:text-white rounded-xl text-slate-400 transition-colors" title="Instagram Daily devotion">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Weekly Assemblies */}
          <div className="md:col-span-4 space-y-4 text-xs text-slate-300">
            <h5 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/5 pb-2">Weekly Assemblies</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <strong className="block text-slate-200">Sunday Early Bilingual Celebration</strong>
                  <span className="text-[10px] text-slate-400">Praise, Testimonies, & Kid's Check-in</span>
                </div>
                <span className="font-mono text-[11px] text-gold text-right shrink-0">9:00 AM CST</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <strong className="block text-slate-200">Sunday English Celebration Service</strong>
                  <span className="text-[10px] text-slate-400">Main worship gathering & Apostolic message</span>
                </div>
                <span className="font-mono text-[11px] text-gold text-right shrink-0">11:30 AM CST</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <strong className="block text-slate-200">Wednesday Healing & Prayer Night</strong>
                  <span className="text-[10px] text-slate-400">Deep intercessory prayer & Prophetic altar</span>
                </div>
                <span className="font-mono text-[11px] text-gold text-right shrink-0">7:00 PM CST</span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Directions Map Pin */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="font-display font-bold uppercase tracking-widest text-white border-b border-white/5 pb-2">Find the House</h5>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-royal-blue shrink-0 mt-0.5" />
                <span>1200 Restoration Way, Houston, TX 77001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-royal-blue shrink-0" />
                <span>+1 (800) 555-RESTORE</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-royal-blue shrink-0" />
                <span>contact@restorationhouse.org</span>
              </p>
            </div>

            {/* Simulated Vector / Satellite Map container */}
            <div className="bg-navy-light/45 border border-white/10 rounded-xl p-3 flex gap-3 items-center">
              <div className="w-12 h-12 bg-royal-blue/20 rounded-lg flex items-center justify-center text-royal-blue shrink-0">
                🗺️
              </div>
              <div className="text-left">
                <h6 className="text-[11px] font-bold text-white">Plan Your Journey</h6>
                <p className="text-[9px] text-slate-400">Convenient parking spaces and fully secure Kingdom Kids check-in lobbies are open 30 mins before services.</p>
              </div>
            </div>
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
              className="text-gold font-bold hover:underline cursor-pointer"
              id="btn-footer-admin-toggle"
            >
              Pastoral Portal 🔑
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
