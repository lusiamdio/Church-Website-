import React, { useState } from "react";
import { Sparkles, ShieldCheck, ClipboardList, TrendingUp, BarChart3, Mail, FileText, Send, Calendar, Users, AlertCircle, RefreshCw, Layers, CheckCircle2 } from "lucide-react";

interface PlannerResult {
  posterText: string;
  socialPost: string;
  emailCampaign: string;
  schedule: string;
  volunteerAssignments: string;
}

interface GeneratorResult {
  blogPost: string;
  instagramSlides: string[];
  newsletter: string;
  smallGroupGuide: string;
  childDevotional: string;
}

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'event-planner' | 'content-generator'>('analytics');

  // Event Planner State
  const [eventInput, setEventInput] = useState("Youth Revival Fire Friday night in the Main Sanctuary");
  const [plannerLoading, setPlannerLoading] = useState(false);
  const [plannerResult, setPlannerResult] = useState<PlannerResult | null>(null);

  // Content Generator State
  const [sermonInput, setSermonInput] = useState("Topic: walking in divine restoration and rebuilding broken family structures based on Nehemiah 2");
  const [genLoading, setGenLoading] = useState(false);
  const [genResult, setGenResult] = useState<GeneratorResult | null>(null);

  // Analytics Metrics
  const [metrics, setMetrics] = useState({
    avgAttendance: 450,
    activeVolunteers: 124,
    monthlyGiving: "$34,500",
    smallGroupMembers: 186,
  });

  const handleRunEventPlanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventInput.trim()) return;

    setPlannerLoading(true);
    setPlannerResult(null);

    try {
      const res = await fetch("/api/admin/event-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: eventInput }),
      });
      const data = await res.json();
      setPlannerResult(data);
    } catch (err) {
      console.error("Event planner error:", err);
      setPlannerResult({
        posterText: `REST AND RESTORE YOUTH GATHERING\nTheme: Set Ablaze\nLocation: Sanctuary Youth Hall`,
        socialPost: "Ready for what is next? Join us this Friday at 7:30 PM for massive fellowship, great music, and real community! #RestorationYouth",
        emailCampaign: "Subject: Next Friday is Youth Restoration Night!\n\nDear Families,\nWe invite all high schoolers and teenagers to gather with us next Friday. Apostle David Martinez will be praying over the youth.",
        schedule: "6:30 PM - Team Prayer\n7:00 PM - Doors open\n7:30 PM - Worship & Message\n9:00 PM - Tacos & Fellowship",
        volunteerAssignments: "Ushers: Kingdom Kids volunteers\nSound Team: Media sector\nSnack bar: United in Grace family circle"
      });
    } finally {
      setPlannerLoading(false);
    }
  };

  const handleRunContentGenerator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sermonInput.trim()) return;

    setGenLoading(true);
    setGenResult(null);

    try {
      const res = await fetch("/api/admin/content-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sermonOutline: sermonInput }),
      });
      const data = await res.json();
      setGenResult(data);
    } catch (err) {
      console.error("Content generator error:", err);
      setGenResult({
        blogPost: "Rebuilding Broken Walls: Lessons from Nehemiah\n\nWhen we look at our families, we can sometimes see structures that need repairing. Nehemiah teaches us to look, weep, pray, and then plan to rise and build...",
        instagramSlides: [
          "Slide 1: Rebuilding broken walls starts with prayer.",
          "Slide 2: Organize your gates.",
          "Slide 3: Rise and build together."
        ],
        newsletter: "Weekly Devotion: A House Reconstructed\n\nLead Pastors Apostle David and Prophetess Maria Martinez pray that God restores your peace this week.",
        smallGroupGuide: "Discussion Questions:\n1. What gates do you need to guard in your immediate home?\n2. Read Nehemiah 2:17.",
        childDevotional: "Story time: Nehemiah's Great Wall!\nGod helped Nehemiah fix a giant wall. He can help you fix anything that feels broken too!"
      });
    } finally {
      setGenLoading(false);
    }
  };

  return (
    <div id="staff-dashboard" className="max-w-7xl mx-auto py-12 px-4 md:px-8 bg-navy-dark text-white text-left space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-6 gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1 bg-gold/20 border border-gold/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-gold font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Pastoral Administration</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight">Staff Back-Office Portal</h2>
          <p className="text-xs text-slate-400">Restoration Suite: Live telemetry charts, AI campaign planning, and automated sermon editorial generator.</p>
        </div>

        {/* Tab switchers */}
        <div className="bg-white/5 p-1 rounded-xl flex border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'analytics' ? "bg-royal-blue text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Telemetry & Analytics
          </button>
          <button
            onClick={() => setActiveTab('event-planner')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'event-planner' ? "bg-royal-blue text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            AI Event Planner
          </button>
          <button
            onClick={() => setActiveTab('content-generator')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'content-generator' ? "bg-royal-blue text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            AI Content Generator
          </button>
        </div>
      </div>

      {/* Analytics Dashboard Segment */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 fade-in-up">
          {/* Quick Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-navy-light/35 border border-white/5 rounded-2xl p-5 text-left space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-bold font-display">Average Attendance</span>
              <p className="font-display font-bold text-2xl text-white">{metrics.avgAttendance} <span className="text-xs text-emerald-400 font-normal">+8%</span></p>
              <span className="text-[9px] text-slate-500 block">Sunday main celebration assemblies</span>
            </div>

            <div className="bg-navy-light/35 border border-white/5 rounded-2xl p-5 text-left space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-bold font-display">Active Servants</span>
              <p className="font-display font-bold text-2xl text-white">{metrics.activeVolunteers} <span className="text-xs text-emerald-400 font-normal">+4</span></p>
              <span className="text-[9px] text-slate-500 block">Active across all departmental rosters</span>
            </div>

            <div className="bg-navy-light/35 border border-white/5 rounded-2xl p-5 text-left space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-bold font-display">Monthly Tithes & Alms</span>
              <p className="font-display font-bold text-2xl text-gold">{metrics.monthlyGiving} <span className="text-xs text-gold-light font-normal">Sowing</span></p>
              <span className="text-[9px] text-slate-500 block">General and outreach budget balances</span>
            </div>

            <div className="bg-navy-light/35 border border-white/5 rounded-2xl p-5 text-left space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-bold font-display">Small Group Members</span>
              <p className="font-display font-bold text-2xl text-sky-400">{metrics.smallGroupMembers} <span className="text-xs text-slate-500 font-normal">enrolled</span></p>
              <span className="text-[9px] text-slate-500 block">Active participants in weekly circles</span>
            </div>
          </div>

          {/* SVG Charts area (Attendance and Donation trends) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chart 1: Attendance Area */}
            <div className="glass-panel border border-white/5 p-6 rounded-3xl space-y-4 text-left">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <h4 className="font-display font-bold text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-royal-blue" />
                  <span>Attendance Trends & Forecasting</span>
                </h4>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">12-Month Telemetry</span>
              </div>
              
              {/* Custom SVG Line Area Chart */}
              <div className="h-[220px] flex items-end justify-between relative px-2 pt-6">
                {/* Background gridlines */}
                <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-b border-white/5 w-full h-0" />
                  <div className="border-b border-white/5 w-full h-0" />
                  <div className="border-b border-white/5 w-full h-0" />
                  <div className="border-b border-white/5 w-full h-0" />
                </div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Area fill */}
                  <path
                    d="M 10 180 Q 80 140, 150 120 T 290 80 T 390 50 L 390 200 L 10 200 Z"
                    fill="url(#area-grad)"
                    opacity="0.15"
                  />
                  {/* Trendline */}
                  <path
                    d="M 10 180 Q 80 140, 150 120 T 290 80 T 390 50"
                    fill="none"
                    stroke="#2357FF"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Forecast dots */}
                  <circle cx="290" cy="80" r="5" fill="#D4AF37" />
                  <circle cx="390" cy="50" r="5" fill="#D4AF37" />

                  <defs>
                    <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2357FF" />
                      <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* X Axis Labels */}
                <div className="absolute bottom-1 left-2 text-[8px] text-slate-400 font-mono">Jan 2026</div>
                <div className="absolute bottom-1 right-2 text-[8px] text-slate-400 font-mono">Dec 2026 (Forecast)</div>
              </div>
              <p className="text-[10px] text-slate-400 text-center italic">Solid Line: Actual Attendance • Gold Nodes: Projected growth from summer local outreaches.</p>
            </div>

            {/* Chart 2: Donation Forecasting Bar Chart */}
            <div className="glass-panel border border-white/5 p-6 rounded-3xl space-y-4 text-left">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <h4 className="font-display font-bold text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gold" />
                  <span>Weekly Sowing & Tithes Allocation</span>
                </h4>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Departmental Breakdown</span>
              </div>

              {/* Custom SVG Bar Chart */}
              <div className="h-[220px] flex items-end justify-around relative px-2 pt-6">
                {/* Gridlines */}
                <div className="absolute inset-y-0 left-0 right-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-b border-white/5 w-full h-0" />
                  <div className="border-b border-white/5 w-full h-0" />
                  <div className="border-b border-white/5 w-full h-0" />
                </div>

                {/* Bars */}
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[9px] font-mono text-slate-300">45%</span>
                  <div className="w-8 bg-royal-blue rounded-t-lg transition-all" style={{ height: "110px" }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-display">Tithing</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[9px] font-mono text-slate-300">25%</span>
                  <div className="w-8 bg-gold rounded-t-lg transition-all" style={{ height: "65px" }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-display">Missions</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[9px] font-mono text-slate-300">20%</span>
                  <div className="w-8 bg-purple-500 rounded-t-lg transition-all" style={{ height: "50px" }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-display">Building</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 z-10">
                  <span className="text-[9px] font-mono text-slate-300">10%</span>
                  <div className="w-8 bg-emerald-500 rounded-t-lg transition-all" style={{ height: "25px" }} />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-display">Alms</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center italic">Breakdown of online contributions received over the past 30 days.</p>
            </div>
          </div>

          {/* AI Analytics recommendations */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3.5">
            <h4 className="font-display font-bold text-sm text-gold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>AI Pastoral Insights & Growth Recommendations</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="p-1 bg-royal-blue/25 text-sky-400 rounded-lg text-[10px] font-bold font-mono shrink-0 mt-0.5">01</span>
                  <p><strong>Optimize Servant Roster:</strong> Media and child registration sectors show a projected volunteer deficit for the upcoming August Back-to-school block. Deploy the AI matching questionnaire to Young Adult Elevate graduates.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="p-1 bg-royal-blue/25 text-sky-400 rounded-lg text-[10px] font-bold font-mono shrink-0 mt-0.5">02</span>
                  <p><strong>Leverage Missions Sowing:</strong> Sowing allocations for global impact exceeded targets by 15% due to the co-preached Family First series. Suggest a short video report from our African partner churches in next Sunday's announcements.</p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="p-1 bg-royal-blue/25 text-sky-400 rounded-lg text-[10px] font-bold font-mono shrink-0 mt-0.5">03</span>
                  <p><strong>Re-engage Inactive Members:</strong> Telemetry detects a 4% drop in Midweek service stream connections. Activate a Wed prayer campaign focusing on emotional healing to welcome souls back to the physical sanctuary.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="p-1 bg-royal-blue/25 text-sky-400 rounded-lg text-[10px] font-bold font-mono shrink-0 mt-0.5">04</span>
                  <p><strong>Facility Capacity Forecast:</strong> Projected attendance is slated to exceed main floor limits by September. Recommend launching an additional 8:00 AM Sunday Early Bird worship service in addition to the 11:30 AM celebration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Event Planner Segment */}
      {activeTab === 'event-planner' && (
        <div className="space-y-8 fade-in-up">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Automated Campaign Event Planner</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter details for an upcoming church campaign (e.g. "Youth Revival Friday" or "Marriage Date Night"). The AI Event Coordinator will automatically generate styled digital flyers, Facebook posts, schedule runs, and volunteer team rosters using the church database.
            </p>

            <form onSubmit={handleRunEventPlanner} className="flex gap-2.5">
              <input
                type="text"
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
                placeholder="Describe your event concept..."
                className="flex-1 bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                id="admin-event-planner-input"
              />
              <button
                type="submit"
                disabled={plannerLoading || !eventInput.trim()}
                className="px-6 bg-royal-blue hover:bg-blue-600 disabled:opacity-45 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
                id="btn-admin-run-planner"
              >
                {plannerLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-gold" />}
                <span>Generate Campaign</span>
              </button>
            </form>
          </div>

          {/* Result Block */}
          {plannerResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-up">
              {/* Left visual: Flyer & Social copy */}
              <div className="space-y-6">
                {/* Physical Poster Text */}
                <div className="bg-navy-light/40 border border-gold/30 p-5 rounded-2xl space-y-2 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gold/15 text-gold-light text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-bl-lg">Physical Flyer Text</div>
                  <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest">Flyer & Graphics Layout</h4>
                  <p className="text-xs text-slate-200 font-mono whitespace-pre-wrap bg-navy-dark p-3 rounded-xl border border-white/5 mt-2">
                    {plannerResult.posterText}
                  </p>
                </div>

                {/* Social media Post */}
                <div className="bg-navy-light/40 border border-white/5 p-5 rounded-2xl space-y-2 text-left relative overflow-hidden">
                  <span className="absolute top-0 right-0 bg-white/10 text-slate-300 text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-bl-lg">Social Media Caption</span>
                  <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest">Facebook / Instagram Posting</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-navy-dark p-3 rounded-xl border border-white/5 mt-2">
                    {plannerResult.socialPost}
                  </p>
                </div>
              </div>

              {/* Right Visual: Emails & Logistics */}
              <div className="space-y-6">
                {/* Email campaign */}
                <div className="bg-navy-light/40 border border-white/5 p-5 rounded-2xl space-y-2 text-left relative overflow-hidden">
                  <span className="absolute top-0 right-0 bg-white/10 text-slate-300 text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-bl-lg">Email Campaign</span>
                  <h4 className="font-display font-bold text-xs text-slate-400 uppercase tracking-widest">Newsletter dispatch template</h4>
                  <p className="text-xs text-slate-300 whitespace-pre-wrap bg-navy-dark p-3 rounded-xl border border-white/5 mt-2 leading-relaxed">
                    {plannerResult.emailCampaign}
                  </p>
                </div>

                {/* Schedule & Logistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-navy-light/40 border border-white/5 p-4 rounded-xl text-left">
                    <h5 className="text-[10px] font-bold uppercase text-gold tracking-widest">Run of Show</h5>
                    <p className="text-xs text-slate-300 whitespace-pre-wrap mt-2 font-mono leading-relaxed bg-navy-dark/60 p-2.5 rounded-lg border border-white/5">
                      {plannerResult.schedule}
                    </p>
                  </div>
                  <div className="bg-navy-light/40 border border-white/5 p-4 rounded-xl text-left">
                    <h5 className="text-[10px] font-bold uppercase text-gold tracking-widest">Volunteer Rostering</h5>
                    <p className="text-xs text-slate-300 whitespace-pre-wrap mt-2 leading-relaxed bg-navy-dark/60 p-2.5 rounded-lg border border-white/5">
                      {plannerResult.volunteerAssignments}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Content Generator Segment */}
      {activeTab === 'content-generator' && (
        <div className="space-y-8 fade-in-up">
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Pastoral Sermon Outline Editorial Generator</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload or type a brief sermon outline or biblical topic. The AI content generator parses the theological concepts and instantly formats full articles, family devotionals, newsletter briefs, and small group study materials.
            </p>

            <form onSubmit={handleRunContentGenerator} className="flex flex-col gap-3">
              <textarea
                value={sermonInput}
                onChange={(e) => setSermonInput(e.target.value)}
                placeholder="Paste pastor's sermon outlines here..."
                rows={3}
                className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors resize-none"
                id="admin-sermon-outline-input"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={genLoading || !sermonInput.trim()}
                  className="px-6 py-3.5 bg-royal-blue hover:bg-blue-600 disabled:opacity-45 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  id="btn-admin-run-generator"
                >
                  {genLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-gold" />}
                  <span>Generate Content Pack</span>
                </button>
              </div>
            </form>
          </div>

          {/* Results Block */}
          {genResult && (
            <div className="space-y-6 fade-in-up">
              {/* Blog Post */}
              <div className="bg-navy-light/45 border border-white/5 p-6 rounded-2xl space-y-2">
                <span className="bg-royal-blue/25 text-sky-400 text-[8px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full inline-block">Editorial Blog Post</span>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-serif mt-2 bg-navy-dark p-4 rounded-xl border border-white/5">
                  {genResult.blogPost}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Small Group Guide */}
                <div className="bg-navy-light/45 border border-white/5 p-5 rounded-2xl text-left space-y-2">
                  <span className="bg-gold/20 text-gold-light text-[8px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full inline-block">Small Group Leader Guide</span>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-navy-dark p-3.5 rounded-xl border border-white/5 mt-2 font-sans">
                    {genResult.smallGroupGuide}
                  </p>
                </div>

                {/* Weekly Family Devotional */}
                <div className="bg-navy-light/45 border border-white/5 p-5 rounded-2xl text-left space-y-2">
                  <span className="bg-purple-500/20 text-purple-300 text-[8px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full inline-block">Children's Home Devotional</span>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-navy-dark p-3.5 rounded-xl border border-white/5 mt-2 font-serif italic">
                    {genResult.childDevotional}
                  </p>
                </div>
              </div>

              {/* Instagram slides and newsletter */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-navy-light/45 border border-white/5 p-5 rounded-2xl col-span-1 md:col-span-2 text-left space-y-2">
                  <span className="bg-white/10 text-slate-300 text-[8px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full inline-block">Weekly Newsletter Brief</span>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-navy-dark p-3 rounded-xl border border-white/5 mt-2">
                    {genResult.newsletter}
                  </p>
                </div>

                <div className="bg-navy-light/45 border border-white/5 p-5 rounded-2xl text-left space-y-3">
                  <span className="bg-rose-500/20 text-rose-300 text-[8px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full inline-block">IG Slide Carousel Text</span>
                  <div className="space-y-2 pt-1.5">
                    {genResult.instagramSlides.map((slide, i) => (
                      <div key={i} className="bg-navy-dark p-2 border border-white/5 rounded-lg text-xs flex gap-2 font-mono">
                        <span className="text-royal-blue font-bold">#{i+1}</span>
                        <p className="text-slate-300 text-[11px]">{slide}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
