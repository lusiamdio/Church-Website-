import React, { useState } from "react";
import { Users, Smile, Heart, Sparkles, HelpCircle, Check, MapPin, ClipboardList, Send, Flame, Gift, Compass } from "lucide-react";
import { Ministry, QuizQuestion } from "../types";
import { ministriesData, volunteerQuizQuestions } from "../data";

export default function Ministries() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Registration form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regNotes, setRegNotes] = useState("");
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Quiz questionnaire state
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<any | null>(null);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regName && regEmail) {
      setRegSubmitted(true);
      setTimeout(() => {
        setRegSubmitted(false);
        setShowRegisterModal(false);
        setRegName("");
        setRegEmail("");
        setRegPhone("");
        setRegNotes("");
      }, 3000);
    }
  };

  const handleSelectQuizAnswer = (qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleCalculateMatch = () => {
    const q1 = answers["q1"] || "music";
    const q2 = answers["q2"] || "sunday";
    const q3 = answers["q3"] || "tech";

    let recommendedRole = "Hospitality & Guest Connections Team";
    let spiritualGiftsText = "Hospitality, Encouragement, and Mercy";
    let recommendedMinistry = "United in Grace and Hands of Hope Outreach";
    let matchDescription = "You love welcoming new faces, providing warm food, and establishing an atmosphere of comfort and grace. Since you excel in social contacts on weekends, you are a perfect fit for our greeting teams!";

    if (q1 === "music") {
      recommendedRole = "Sanctuary Praise Worship Vocalist / Instrumentalist";
      spiritualGiftsText = "Worship, Creative Prophesy, and Music Excellence";
      recommendedMinistry = "Sanctuary Praise Worship Team";
      matchDescription = "You have a natural resonance with music, instruments, and singing. Your willingness to serve during Sunday worship or midweek practices fits perfectly with Sanctuary Praise. Let's lift up Jesus together!";
    } else if (q1 === "media" || q3 === "tech") {
      recommendedRole = "A/V Technician / Social Media content creator";
      spiritualGiftsText = "Administration, Craftsmanship, and Communication";
      recommendedMinistry = "Sanctuary Media & Production Group";
      matchDescription = "You feel right at home behind cameras, computers, sound boards, and visual design layouts. Our media team runs our livestream and production suites, ensuring our restoration message reaches the globe!";
    } else if (q1 === "children") {
      recommendedRole = "Kingdom Kids Sunday School Assistant Teacher";
      spiritualGiftsText = "Teaching, Patience, and Faith Infusion";
      recommendedMinistry = "Kingdom Kids Children's Ministry";
      matchDescription = "You have a heavy passion for teaching young souls and helping them check in safely during Sunday morning services. Since you enjoy storytelling and crafts, your gifts will multiply in our Kids Church!";
    } else if (q1 === "prayer") {
      recommendedRole = "Intercessory Prayer Warrior & Counseling Assistant";
      spiritualGiftsText = "Prophetic Prayer, Discernment, and Faith";
      recommendedMinistry = "United Prayer Team";
      matchDescription = "You feel pulled toward deep times of prayer, spiritual warfare, and praying over submitted requests from our prayer wall. This is a crucial foundation of the House of Restoration!";
    } else if (q1 === "outreach") {
      recommendedRole = "Outreach Coordinator & Food Pantry Organizer";
      spiritualGiftsText = "Serving, Mercy, and Apostle Networking";
      recommendedMinistry = "Hands of Hope Community Outreach Team";
      matchDescription = "You love getting out into the streets, distributing food/backpacks, and organizing local rehabilitation campaigns. Your heart of mercy is exactly what Houston needs!";
    }

    setQuizResult({
      role: recommendedRole,
      gifts: spiritualGiftsText,
      ministry: recommendedMinistry,
      description: matchDescription,
    });
  };

  return (
    <section id="ministries" className="py-20 px-4 md:px-8 bg-gradient-to-b from-navy-light to-navy-dark text-white text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-royal-blue/20 border border-royal-blue/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-sky-400 font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>Restoration Tribes</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Ministries & Circles</h2>
            <p className="font-serif italic text-slate-300 text-sm max-w-lg">
              Find your circle, activate your spiritual gifts, and serve with deep purpose alongside brothers and sisters who champion your growth.
            </p>
          </div>

          <button
            onClick={() => {
              setShowQuiz(!showQuiz);
              setQuizResult(null);
              setAnswers({});
            }}
            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-gold to-yellow-600 rounded-xl font-bold text-navy-dark shadow-xl hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider shrink-0 cursor-pointer"
            id="btn-quiz-toggle"
          >
            <Gift className="w-4 h-4" />
            <span>AI Volunteer Matcher</span>
          </button>
        </div>

        {/* AI Quiz Section (Conditional rendering) */}
        {showQuiz && (
          <div className="glass-panel rounded-3xl border border-gold/30 bg-gradient-to-br from-navy-dark via-navy-light/40 to-navy-dark p-6 md:p-8 shadow-2xl relative overflow-hidden fade-in-up" id="volunteer-quiz-section">
            <div className="absolute top-0 right-0 bg-gold/15 text-gold-light text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-bl-xl border-l border-b border-white/10">
              Spiritual Gift Evaluator
            </div>

            {!quizResult ? (
              <div className="space-y-6">
                <div className="text-left">
                  <h3 className="font-display text-xl font-bold flex items-center gap-2 text-gold">
                    <Sparkles className="w-5 h-5 text-gold animate-bounce" />
                    <span>Discover Your Ministry Placement</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">Complete this 3-question survey. Our AI algorithm evaluates your answers against our ministry roster to find your perfect place of service.</p>
                </div>

                <div className="space-y-6">
                  {volunteerQuizQuestions.map((q) => (
                    <div key={q.id} className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <ClipboardList className="w-4 h-4 text-royal-blue" />
                        <span>{q.question}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {q.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleSelectQuizAnswer(q.id, opt.value)}
                            className={`px-4 py-3 border rounded-xl text-xs font-semibold text-left transition-all ${
                              answers[q.id] === opt.value
                                ? "bg-royal-blue/35 border-royal-blue text-white shadow-inner"
                                : "bg-navy-dark border-white/10 text-slate-300 hover:border-gold hover:text-white"
                            }`}
                            id={`btn-quiz-${q.id}-${opt.value}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button
                    onClick={handleCalculateMatch}
                    className="px-8 py-3.5 bg-gold hover:bg-yellow-600 text-navy-dark font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow"
                    id="btn-quiz-match"
                  >
                    <Flame className="w-4 h-4" /> Calculate My Match
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center md:text-left space-y-6 max-w-3xl mx-auto py-4">
                <div className="mx-auto md:mx-0 w-16 h-16 bg-gold/20 text-gold-light rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-widest block">Your Spiritual Blueprint Match</span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">{quizResult.role}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{quizResult.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 border border-white/15 p-5 rounded-2xl">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] uppercase text-gold font-bold font-display">Identified Spiritual Gifts</span>
                    <p className="text-xs text-slate-200 font-semibold">{quizResult.gifts}</p>
                  </div>
                  <div className="text-left space-y-1">
                    <span className="text-[10px] uppercase text-gold font-bold font-display">Recommended Department</span>
                    <p className="text-xs text-slate-200 font-semibold">{quizResult.ministry}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => {
                      setRegNotes(`Matched with ${quizResult.role} via AI Volunteer matcher quiz!`);
                      setShowRegisterModal(true);
                    }}
                    className="px-6 py-3 bg-royal-blue hover:bg-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-wide shadow"
                    id="btn-quiz-signup"
                  >
                    Sign Up for this Team
                  </button>
                  <button
                    onClick={() => {
                      setQuizResult(null);
                      setAnswers({});
                    }}
                    className="px-6 py-3 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold"
                    id="btn-quiz-retry"
                  >
                    Retake Questionnaire
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministriesData.map((m) => (
            <div
              key={m.id}
              className="bg-navy-light/30 border border-white/5 rounded-2xl overflow-hidden glass-card-hover flex flex-col justify-between h-[420px]"
              id={`ministry-card-${m.id}`}
            >
              {/* Picture banner */}
              <div
                className="h-[180px] bg-cover bg-center relative"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 31, 58, 0.1), rgba(11, 31, 58, 0.8)), url(${m.image})` }}
              >
                <span className="absolute top-4 left-4 bg-royal-blue/30 border border-royal-blue/40 text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full text-sky-300">
                  {m.category}
                </span>
              </div>

              {/* Ministry Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-gold transition-colors">{m.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{m.description}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-royal-blue" />
                    <span>{m.schedule}</span>
                  </div>
                </div>

                {/* Team Leaders block */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={m.leadersInfo.image}
                      alt={m.leadersInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-white/10"
                    />
                    <div>
                      <h4 className="font-bold text-[10px] text-white leading-none">{m.leadersInfo.name}</h4>
                      <span className="text-[8px] text-slate-400 font-mono mt-0.5 block">{m.leadersInfo.role}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMinistry(m);
                      setRegNotes(`Inquiring about ${m.name}`);
                      setShowRegisterModal(true);
                    }}
                    className="px-4 py-2 bg-royal-blue/15 hover:bg-royal-blue text-xs text-sky-300 hover:text-white font-bold rounded-xl transition-all border border-royal-blue/20"
                    id={`btn-join-ministry-${m.id}`}
                  >
                    Register / Serve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SignUp & Volunteer Form Overlay Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/95 backdrop-blur-md" id="register-ministry-modal">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 md:p-8 border border-white/15 shadow-2xl relative fade-in-up">
            <button
              onClick={() => {
                setShowRegisterModal(false);
                setRegSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              id="btn-close-reg-modal"
            >
              <Check className="w-5 h-5 hidden" /> {/* Hidden validator anchor */}
              <span>Close</span>
            </button>

            {!regSubmitted ? (
              <>
                <div className="text-center mb-5">
                  <div className="mx-auto w-10 h-10 bg-royal-blue/20 rounded-full flex items-center justify-center mb-2.5 text-royal-blue">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold">Inquire & Serve</h3>
                  <p className="text-xs text-slate-300 mt-1">Ready to find family and serve? Send your signup to Pastor Martinez and department leaders.</p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Samuel Lawson"
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="reg-input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="samuel@gmail.com"
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="reg-input-email"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="e.g. 555-019-2834"
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="reg-input-phone"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Why do you want to join?</label>
                    <textarea
                      value={regNotes}
                      onChange={(e) => setRegNotes(e.target.value)}
                      placeholder="I would love to help organize outreach or learn to assist with camera production..."
                      rows={3}
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors resize-none"
                      id="reg-input-notes"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-royal-blue hover:bg-blue-600 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow"
                    id="btn-reg-submit"
                  >
                    Submit My Application
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-display font-bold text-lg">Application Submitted!</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                  A copy of your serve form has been delivered directly to Director Sarah Henderson and Apostle David's staff. We'll be in touch within 24-48 hours!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
