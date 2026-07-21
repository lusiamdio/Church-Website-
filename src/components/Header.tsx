import React, { useState } from "react";
import { Church, Users, BookOpen, HeartHandshake, CreditCard, Shield, Accessibility, Smile, Sparkles, Sliders, Volume2, Type, Eye, Check, ChevronDown, Home, Compass, Newspaper } from "lucide-react";

interface HeaderProps {
  visitorType: "new" | "member" | "seeker";
  setVisitorType: (val: "new" | "member" | "seeker") => void;
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean) => void;
  isDyslexicFriendly: boolean;
  setIsDyslexicFriendly: (val: boolean) => void;
  textScale: "normal" | "large" | "extra";
  setTextScale: (val: "normal" | "large" | "extra") => void;
  showAdminPortal: boolean;
  setShowAdminPortal: (val: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({
  visitorType,
  setVisitorType,
  isHighContrast,
  setIsHighContrast,
  isDyslexicFriendly,
  setIsDyslexicFriendly,
  textScale,
  setTextScale,
  showAdminPortal,
  setShowAdminPortal,
  currentPage,
  setCurrentPage,
}: HeaderProps) {
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownItems = [
    { id: "journal", label: "Forbes Journal", icon: Newspaper, desc: "Christian Devotionals & News" },
    { id: "live", label: "Live", icon: Sparkles, desc: "Bilingual Streams & Worship" },
    { id: "ministries", label: "Ministries", icon: Users, desc: "Tribes, Small Groups & Circles" },
    { id: "giving", label: "Give", icon: CreditCard, desc: "Tithes, Offerings & Seeds" },
  ];

  const handleDropdownSelect = (id: string) => {
    setIsDropdownOpen(false);
    setCurrentPage(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-navy-light/30 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleDropdownSelect("home")} 
          className="flex items-center gap-3 cursor-pointer group"
          id="church-header-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-blue via-navy-light to-gold/90 border border-gold/40 p-2 shadow-lg shadow-royal-blue/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-gold transition-all duration-300">
            <Church className="w-5 h-5 text-white drop-shadow" />
          </div>
          <div className="text-left">
            <h1 className="font-display font-extrabold text-sm md:text-base tracking-tight leading-none text-white group-hover:text-gold transition-colors">
              SANCTUARY OF JESUS CHRIST
            </h1>
            <p className="text-[9px] text-gold uppercase tracking-widest font-bold leading-none mt-1">
              House of Restoration
            </p>
          </div>
        </div>

        {/* Navigation Dropdown (Dropbox for Ministries) */}
        <div className="relative" id="ministries-dropbox-container">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-royal-blue/10 hover:bg-royal-blue/25 text-gold border border-gold/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow shadow-gold/5 hover:border-gold cursor-pointer"
            id="btn-ministries-dropbox"
          >
            <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            <span>Ministries Dropdown</span>
            {currentPage !== "home" && (
              <span className="ml-1 px-2 py-0.5 bg-royal-blue text-white rounded text-[9px] lowercase font-normal capitalize">
                {currentPage}
              </span>
            )}
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-2 bg-navy-dark border border-gold/35 rounded-2xl p-2 w-[240px] shadow-2xl z-50 text-left fade-in-up"
              id="ministries-dropbox-menu"
            >
              <div className="px-3 py-1.5 border-b border-white/5 mb-1.5 flex justify-between items-center">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold">Ministries & Pages</span>
                <button 
                  onClick={() => handleDropdownSelect("home")}
                  className="text-[9px] text-sky-400 hover:text-white flex items-center gap-0.5"
                  title="Go to Home"
                >
                  <Home className="w-3 h-3" /> Home
                </button>
              </div>

              <div className="space-y-1">
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleDropdownSelect(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-royal-blue text-white font-bold"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                      id={`dropbox-link-${item.id}`}
                    >
                      <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-slate-300 group-hover:text-white"}`}>
                        <Icon className="w-4 h-4 shrink-0" />
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-none">{item.label}</div>
                        <div className={`text-[9px] mt-0.5 leading-none ${isActive ? "text-sky-200" : "text-slate-400"}`}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Controls Area */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Accessibility Hub Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowAccessMenu(!showAccessMenu)}
              className={`p-2 rounded-xl border transition-all ${
                showAccessMenu ? "bg-gold border-gold text-navy-dark" : "border-white/10 text-slate-300 hover:border-gold hover:text-white bg-white/5"
              }`}
              title="WCAG Accessibility Control Panel"
              id="btn-accessibility-hub"
            >
              <Accessibility className="w-4 h-4" />
            </button>

            {/* Accessibility Settings Dropdown Overlay */}
            {showAccessMenu && (
              <div className="absolute right-0 top-11 bg-navy-dark border border-white/15 rounded-2xl p-4 w-[280px] shadow-2xl z-50 space-y-4 text-left fade-in-up">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">Accessibility Desk</h4>
                  <button onClick={() => setShowAccessMenu(false)} className="text-[10px] text-slate-400 hover:text-gold">Hide</button>
                </div>

                {/* Dyslexia Mode Toggle */}
                <div className="space-y-1">
                  <label className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-royal-blue" />
                      <span>Dyslexia-Friendly Font</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={isDyslexicFriendly}
                      onChange={(e) => setIsDyslexicFriendly(e.target.checked)}
                      className="accent-royal-blue"
                      id="accessibility-check-dyslexic"
                    />
                  </label>
                  <p className="text-[8px] text-slate-400 leading-tight">Overrides body text to highly legible letter forms with spacious character kerning.</p>
                </div>

                {/* High Contrast Mode Toggle */}
                <div className="space-y-1">
                  <label className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-royal-blue" />
                      <span>High Contrast Palette</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={isHighContrast}
                      onChange={(e) => setIsHighContrast(e.target.checked)}
                      className="accent-royal-blue"
                      id="accessibility-check-contrast"
                    />
                  </label>
                  <p className="text-[8px] text-slate-400 leading-tight">Increases foreground and background color ratios to meet strict AAA benchmarks.</p>
                </div>

                {/* Text Sizing sliders */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-royal-blue" />
                    <span>Text Sizing Scale</span>
                  </span>
                  <div className="grid grid-cols-3 gap-1 bg-white/5 rounded-lg p-1">
                    <button
                      onClick={() => setTextScale("normal")}
                      className={`py-1 text-[9px] font-bold rounded ${
                        textScale === "normal" ? "bg-royal-blue text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setTextScale("large")}
                      className={`py-1 text-[9px] font-bold rounded ${
                        textScale === "large" ? "bg-royal-blue text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Large
                    </button>
                    <button
                      onClick={() => setTextScale("extra")}
                      className={`py-1 text-[9px] font-bold rounded ${
                        textScale === "extra" ? "bg-royal-blue text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Extra
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
