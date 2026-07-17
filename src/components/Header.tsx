import React, { useState } from "react";
import { Cross, Users, BookOpen, HeartHandshake, CreditCard, Shield, Accessibility, Smile, Sparkles, Sliders, Volume2, Type, Eye, Check } from "lucide-react";

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
}: HeaderProps) {
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "live", label: "Live", icon: Sparkles },
    { id: "sermons", label: "Sermons", icon: BookOpen },
    { id: "prayer", label: "Pray", icon: HeartHandshake },
    { id: "ministries", label: "Ministries", icon: Users },
    { id: "giving", label: "Give", icon: CreditCard },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-navy-light/30 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("hero")} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="church-header-logo"
        >
          <div className="bg-royal-blue p-2 rounded-xl group-hover:bg-gold transition-colors duration-300 shadow">
            <span className="text-sm font-extrabold text-white">⛪</span>
          </div>
          <div className="text-left">
            <h1 className="font-display font-extrabold text-sm md:text-base tracking-tight leading-none text-white group-hover:text-gold transition-colors">
              SANCTUARY OF JESUS CHRIST
            </h1>
            <p className="text-[9px] text-slate-300 uppercase tracking-widest font-bold leading-none mt-0.5">
              House of Restoration
            </p>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-royal-blue text-white shadow-md shadow-royal-blue/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                id={`nav-anchor-${item.id}`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls Area */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* AI Persona Selector Slider */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex items-center shadow-inner">
            <button
              onClick={() => setVisitorType("new")}
              className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all ${
                visitorType === "new" ? "bg-royal-blue text-white shadow" : "text-slate-400 hover:text-white"
              }`}
              title="Content tailored for first-time guests"
              id="switch-persona-new"
            >
              Newcomer 🌟
            </button>
            <button
              onClick={() => setVisitorType("seeker")}
              className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all ${
                visitorType === "seeker" ? "bg-royal-blue text-white shadow" : "text-slate-400 hover:text-white"
              }`}
              title="Content tailored for spiritual seekers & study"
              id="switch-persona-seeker"
            >
              Seeker 🧭
            </button>
            <button
              onClick={() => setVisitorType("member")}
              className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all ${
                visitorType === "member" ? "bg-royal-blue text-white shadow" : "text-slate-400 hover:text-white"
              }`}
              title="Content tailored for members and regular servers"
              id="switch-persona-member"
            >
              Member 🛡️
            </button>
          </div>

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

          {/* Pastoral Admin Switcher */}
          <button
            onClick={() => setShowAdminPortal(!showAdminPortal)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
              showAdminPortal
                ? "bg-gold border-gold text-navy-dark"
                : "border-white/10 text-slate-300 bg-white/5 hover:border-gold hover:text-gold"
            }`}
            id="btn-header-admin-portal"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Staff Portal</span>
          </button>
        </div>
      </div>
    </header>
  );
}
