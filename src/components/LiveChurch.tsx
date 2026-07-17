import React, { useState, useEffect, useRef } from "react";
import { Play, Flame, Heart, Share2, Users, Send, Smile, Clock, DollarSign, Sparkles, MessageSquare, Plus, Check } from "lucide-react";

const CHAT_SIMULATOR_PRESETS = [
  { user: "Sister Evelyn", text: "Amen! Standing on Joel 2:25. Rebuilding my gates today!" },
  { user: "Brother Juan", text: "Prophetess Maria, thank you for that word on perfect peace. It silenced my anxiety!" },
  { user: "Aunt Sophia", text: "Such a beautiful acoustic worship atmosphere today! Glory to Jesus!" },
  { user: "Pastor Caleb", text: "Welcome church family! Praying for complete physical healing in homes today." },
  { user: "Deacon Thomas", text: "Amen! Sowing my tithing seed of faith with joy." },
  { user: "Elena R.", text: "Our family is watching together from Houston! This is home." },
];

export default function LiveChurch() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Chat simulator state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>(CHAT_SIMULATOR_PRESETS.slice(0, 4));
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Micro donation preset inside stream
  const [showMicroGive, setShowMicroGive] = useState(false);
  const [microGiveSuccess, setMicroGiveSuccess] = useState(false);
  const [microAmount, setMicroAmount] = useState(25);

  // Calculate countdown to next Sunday 9:00 AM
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      // Target: Next Sunday 9:00 AM
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
      nextSunday.setHours(9, 0, 0, 0);

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

  // Chat simulator feed additions
  useEffect(() => {
    const interval = setInterval(() => {
      const users = ["Christopher E.", "Sister Clara", "Matthew H.", "Theresa S.", "Brother Gabriel", "Missionary Luke"];
      const messages = [
        "Preach, Apostle David! Hallelujah!",
        "Restoration is my portion in 2026!",
        "Praying for peace in families right now.",
        "Yes! God will restore what the locusts have eaten.",
        "Greetings from Austin! Watching online.",
        "Praise hands! Complete healing!"
      ];

      const randUser = users[Math.floor(Math.random() * users.length)];
      const randText = messages[Math.floor(Math.random() * messages.length)];

      setChatMessages((prev) => [
        ...prev,
        { user: randUser, text: randText }
      ]);
    }, 12000); // Add simulated text every 12 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { user: "You (Guest)", text: chatInput }
    ]);
    setChatInput("");
  };

  const handleMicroGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMicroGiveSuccess(true);
    setTimeout(() => {
      setMicroGiveSuccess(false);
      setShowMicroGive(false);
    }, 3000);
  };

  return (
    <section id="live" className="py-20 px-4 md:px-8 bg-navy-dark text-white text-left relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-rose-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 live-indicator" />
            <span>Streaming Sanctuary</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Live Broadcast Portal</h2>
          <p className="font-serif italic text-slate-300 text-sm max-w-lg mx-auto">
            Can't join us in person? Connect into the Sanctuary live stream, participate in real-time chat, submit prayer, and sow tithes from anywhere globally.
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
              <p className="text-xs text-slate-400 mt-0.5">Sunday morning Bilingual Worship & Apostolic Teaching begins at 9:00 AM CST.</p>
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

        {/* Live streaming structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stream Player Left Column */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-black aspect-video rounded-3xl overflow-hidden border border-white/15 relative group shadow-2xl">
              {/* Actual Youtube Live stream placeholder or HillSong/Elevation style church worship video */}
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=0"
                title="Sanctuary of Jesus Christ Live Stream Broadcast"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Stream info details */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 p-2">
              <div className="text-left space-y-1">
                <h3 className="font-display font-bold text-lg text-white">Sunday English Celebration Service (Live Broadcast)</h3>
                <p className="text-xs text-slate-400">By Lead Pastors Apostle David and Prophetess Maria Martinez</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/15 px-3 py-1.5 rounded-full text-xs text-slate-300">
                  <Users className="w-4 h-4 text-royal-blue" />
                  <span>247 watching now</span>
                </span>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Sanctuary Live Stream", url: window.location.href });
                    } else {
                      alert("Stream link copied to clipboard!");
                    }
                  }}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-gold rounded-xl transition-all"
                  title="Share Stream"
                  id="btn-stream-share"
                >
                  <Share2 className="w-4 h-4 text-slate-300 hover:text-gold" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chat & Quick Actions Right Column */}
          <div className="lg:col-span-4 flex flex-col h-[480px] lg:h-auto border border-white/10 bg-navy-light/20 rounded-3xl overflow-hidden relative shadow-2xl">
            {/* Header */}
            <div className="px-4 py-3.5 bg-navy-dark/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gold" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Live Service Chat</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest font-extrabold animate-pulse">
                Active
              </span>
            </div>

            {/* Chat Box Scrolling List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-dark/15 text-left scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div key={i} className="space-y-1 bg-white/5 border border-white/5 rounded-2xl p-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-sky-300">{msg.user}</span>
                    <span className="text-[8px] text-slate-500">Live</span>
                  </div>
                  <p className="text-[11px] text-slate-200">{msg.text}</p>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat quick chips presets */}
            <div className="px-3.5 py-1.5 bg-navy-dark/40 border-t border-white/5 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button
                onClick={() => {
                  setChatMessages((prev) => [...prev, { user: "You (Guest)", text: "Praise God! What a powerful word!" }]);
                }}
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-slate-300 hover:text-white"
              >
                Praise God! 🙌
              </button>
              <button
                onClick={() => {
                  setChatMessages((prev) => [...prev, { user: "You (Guest)", text: "Amen! Believing for physical healing today." }]);
                }}
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-slate-300 hover:text-white"
              >
                Amen! 🙏
              </button>
              <button
                onClick={() => {
                  setChatMessages((prev) => [...prev, { user: "You (Guest)", text: "Greetings to Pastors Martinez from my family." }]);
                }}
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-slate-300 hover:text-white"
              >
                Blessings! ✨
              </button>
            </div>

            {/* Bottom Actions input */}
            <div className="p-3 bg-navy-dark/80 border-t border-white/10 space-y-2">
              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send a chat message to other members..."
                  className="flex-1 bg-navy-dark border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                  id="live-chat-input"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2.5 bg-royal-blue hover:bg-blue-600 rounded-xl text-white transition-colors disabled:opacity-40"
                  id="btn-live-chat-send"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Instant Stream Actions (Pray / Quick Give) */}
              <div className="flex gap-2 justify-between pt-1">
                <button
                  onClick={() => setShowMicroGive(!showMicroGive)}
                  className="flex-1 py-1.5 bg-gradient-to-r from-gold to-yellow-600 hover:shadow-lg text-navy-dark font-bold text-[10px] rounded-lg uppercase tracking-wide flex items-center justify-center gap-1 cursor-pointer"
                  id="btn-stream-quickgive"
                >
                  <DollarSign className="w-3 h-3" />
                  <span>Sow Seed</span>
                </button>
                <button
                  onClick={() => {
                    setChatMessages((prev) => [...prev, { user: "You (Guest)", text: "🙏 [Prayer submitted] Asking for spiritual strength." }]);
                  }}
                  className="flex-1 py-1.5 bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-bold text-[10px] rounded-lg uppercase tracking-wide flex items-center justify-center gap-1 cursor-pointer"
                  id="btn-stream-quickprayer"
                >
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                  <span>Request Prayer</span>
                </button>
              </div>
            </div>

            {/* Micro Donation Form Pop-up Inside Panel */}
            {showMicroGive && (
              <div className="absolute inset-x-0 bottom-0 bg-navy-dark/95 border-t border-white/15 p-4 space-y-4 shadow-2xl z-10 transition-all duration-300">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-[10px] font-bold uppercase text-gold">Sow Micro Seed Instantly</span>
                  <button onClick={() => setShowMicroGive(false)} className="text-xs text-slate-400 hover:text-white">Cancel</button>
                </div>

                {microGiveSuccess ? (
                  <div className="text-center py-4 space-y-1.5">
                    <Check className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
                    <h5 className="font-bold text-xs">Offering Sown!</h5>
                    <p className="text-[10px] text-slate-300">Thank you for your ${microAmount} tithes offering. God bless!</p>
                  </div>
                ) : (
                  <form onSubmit={handleMicroGiveSubmit} className="space-y-3 text-left">
                    <div className="grid grid-cols-3 gap-1.5">
                      {[10, 25, 50].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setMicroAmount(amt)}
                          className={`py-1.5 text-center text-xs font-semibold rounded-lg border transition-all ${
                            microAmount === amt ? "bg-royal-blue border-royal-blue text-white" : "bg-white/5 border-white/10 text-slate-400"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Donor Name"
                        className="flex-1 bg-navy-dark border border-white/15 rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 bg-gold hover:bg-yellow-600 text-navy-dark font-bold text-[10px] uppercase rounded-lg"
                      >
                        Sow ${microAmount}
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
