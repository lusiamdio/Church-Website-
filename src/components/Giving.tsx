import React, { useState } from "react";
import { CreditCard, Sparkles, Heart, DollarSign, Wallet, ShieldCheck, Check, Info, Award } from "lucide-react";

export default function Giving() {
  const [giveAmount, setGiveAmount] = useState<number>(50);
  const [giveFund, setGiveFund] = useState("Tithes & General Offerings");
  const [giveFrequency, setGiveFrequency] = useState("One-time");
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Form Details
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

  // Dynamic Impact text based on giveAmount
  const getImpactDescription = (amount: number) => {
    if (amount < 20) {
      return {
        label: "Kingdom Kids Snack & Lesson",
        text: `Your seed of $${amount} funds complete Bible lessons, colored workbooks, and healthy snacks for 3 children in our Kingdom Kids Sunday assemblies.`
      };
    } else if (amount < 75) {
      return {
        label: "Hands of Hope Family Groceries",
        text: `Your contribution of $${amount} buys 1 full box of nutritious dry goods, rice, beans, milk, and canned vegetables, feeding 10 low-income families in Cape Town.`
      };
    } else if (amount < 200) {
      return {
        label: "Missions Scriptural Distribution",
        text: `Your donation of $${amount} finances the printing and delivery of 15 premium translation study Bibles to remote underground church planters in global missions.`
      };
    } else if (amount < 400) {
      return {
        label: "Young Adults Leadership Scholarship",
        text: `Your offering of $${amount} covers the full registration, study notebooks, and meal tickets for 2 local university students to attend our leadership academy summits.`
      };
    } else if (amount < 800) {
      return {
        label: "Community Blocks Revival Outreach",
        text: `Your gift of $${amount} sponsors an outdoor block party, providing a portable sound system, face painting stations, and free literature for local neighborhoods.`
      };
    } else {
      return {
        label: "Satellite & Digital Media Broadcast",
        text: `An extraordinary contribution of $${amount} directly funds 1 whole week of bilingual satellite radio and digital video broadcasting, reaching thousands of homes.`
      };
    }
  };

  const impact = getImpactDescription(giveAmount);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (donorName && donorEmail && (paymentMethod !== "card" || cardNumber)) {
      setCheckoutSubmitted(true);
    }
  };

  return (
    <section id="giving" className="py-20 px-4 md:px-8 bg-navy-dark text-white text-left relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-royal-blue/20 border border-royal-blue/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-sky-400 font-bold">
            <Heart className="w-3.5 h-3.5 text-royal-blue animate-pulse" />
            <span>Storehouse of Grace</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight">Sowing and Giving</h2>
          <p className="font-serif italic text-slate-300 text-sm max-w-lg mx-auto">
            "Give, and it will be given to you: good measure, pressed down, shaken together, and running over." Support our restoration assignments locally and globally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Giving Impact Visualization & Sliders */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>Real-Time Giving Impact</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Move the slider to choose your contribution level. Watch the card update to see the direct spiritual and humanitarian impact your seed of faith achieves:
              </p>

              {/* Slider Input */}
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center bg-navy-dark/40 border border-white/5 rounded-2xl p-4">
                  <span className="text-xs text-slate-400 font-semibold font-display uppercase tracking-wider">Donation Amount</span>
                  <div className="flex items-center gap-1 text-gold text-2xl font-bold">
                    <span>$</span>
                    <input
                      type="number"
                      value={giveAmount}
                      onChange={(e) => setGiveAmount(parseInt(e.target.value) || 0)}
                      className="w-24 bg-transparent border-none text-right font-display text-2xl font-bold text-gold focus:outline-none"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min="5"
                  max="1200"
                  step="5"
                  value={giveAmount}
                  onChange={(e) => setGiveAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-royal-blue"
                  id="giving-amount-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold">
                  <span>$5 (Kingdom Kids)</span>
                  <span>$100 (Bibles)</span>
                  <span>$500 (Outreaches)</span>
                  <span>$1,000+ (Media Broadcasts)</span>
                </div>
              </div>

              {/* Impact Display Card */}
              <div className="bg-gradient-to-r from-navy-light to-royal-blue/30 border border-royal-blue/20 rounded-2xl p-5 space-y-2 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gold/5 rounded-full filter blur-xl" />
                <span className="bg-gold/25 border border-gold/30 text-gold-light text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full inline-block">
                  {impact.label}
                </span>
                <h4 className="font-display font-bold text-base mt-2 text-white">How Your Gift Restores Lives</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                  "{impact.text}"
                </p>

                <div className="pt-3 border-t border-white/5 mt-4 flex justify-between items-center text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Secure Allocation</span>
                  <span>Wynberg • Cape Town, South Africa</span>
                </div>
              </div>

              {/* Secure Info banner */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-3.5 items-start">
                <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Sanctuary of Jesus Christ is a registered non-profit organization (NPO). All gifts are tax-deductible according to Section 18A regulations. Annual digital giving statements are automatically delivered via email for tax records.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Giving Form Checkout */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
              
              {checkoutSubmitted && (
                <div className="absolute inset-0 bg-navy-dark/95 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-7 h-7 animate-bounce" />
                  </div>
                  
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gold uppercase tracking-widest font-extrabold block">Spiritual Giving Covenant</span>
                      <h4 className="font-display font-bold text-xl text-white">Seed Planted Successfully!</h4>
                    </div>
                    
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{donorName}</strong>! Your donation of <strong className="text-gold">${giveAmount}</strong> has been secured for <strong className="text-white">{giveFund}</strong> ({giveFrequency}).
                    </p>

                    {/* Receipt visual card */}
                    <div className="border border-white/15 bg-white/5 rounded-2xl p-4 text-left text-xs space-y-2.5 font-mono">
                      <h5 className="font-bold font-display text-center text-gold uppercase text-[10px] tracking-widest border-b border-white/10 pb-1.5">Sowing Covenant Certificate</h5>
                      <p className="flex justify-between"><span>Donor Name:</span> <span className="text-white font-bold">{donorName}</span></p>
                      <p className="flex justify-between"><span>Sown Amount:</span> <span className="text-gold font-bold">${giveAmount}.00</span></p>
                      <p className="flex justify-between"><span>Sowing Fund:</span> <span className="text-white font-bold">{giveFund}</span></p>
                      <p className="flex justify-between"><span>Frequency:</span> <span className="text-white font-bold">{giveFrequency}</span></p>
                      <p className="flex justify-between"><span>Confirmation ID:</span> <span className="text-white font-bold">SO-REST-{Date.now().toString().slice(-6)}</span></p>
                      <p className="text-[9px] text-slate-400 text-center italic pt-1 font-sans">A formal tax-deductible receipt has been dispatched to {donorEmail}.</p>
                    </div>

                    <button
                      onClick={() => {
                        setCheckoutSubmitted(false);
                        setDonorName("");
                        setDonorEmail("");
                        setCardNumber("");
                        setCardExpiry("");
                        setCardCvv("");
                      }}
                      className="px-6 py-2.5 bg-white hover:bg-gold text-navy-dark hover:text-navy-dark font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                    >
                      Sow Another Seed
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleCheckout} className="space-y-4">
                <h3 className="font-display font-bold text-lg flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-gold" />
                  <span>Secure Giving Terminal</span>
                </h3>

                {/* Fund selections */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">Select Giving Fund</label>
                    <select
                      value={giveFund}
                      onChange={(e) => setGiveFund(e.target.value)}
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="giving-select-fund"
                    >
                      <option value="Tithes & General Offerings">Tithes & Offerings</option>
                      <option value="Global Missions Impact">Global Missions</option>
                      <option value="Building Rebuilding Project">Building Fund</option>
                      <option value="Hands of Hope Almsgiving">Alms / Outreach</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">Frequency</label>
                    <select
                      value={giveFrequency}
                      onChange={(e) => setGiveFrequency(e.target.value)}
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="giving-select-frequency"
                    >
                      <option value="One-time">One-Time Sowing</option>
                      <option value="Weekly recurring">Weekly Tithe</option>
                      <option value="Bi-weekly recurring">Bi-Weekly Sowing</option>
                      <option value="Monthly recurring">Monthly Covenant Partner</option>
                    </select>
                  </div>
                </div>

                {/* Personal particulars */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Rachel Martinez"
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="giving-input-name"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="rachel@gmail.com"
                      className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors"
                      id="giving-input-email"
                    />
                  </div>
                </div>

                {/* Payment Method selectors */}
                <div className="border-t border-white/5 pt-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2">Sowing Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-2 px-3 border rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "card" ? "bg-royal-blue/20 border-royal-blue text-white" : "bg-navy-dark border-white/10 text-slate-300"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" /> <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("applepay");
                        setCardNumber("1234"); // Bypass trigger
                      }}
                      className={`py-2 px-3 border rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "applepay" ? "bg-royal-blue/20 border-royal-blue text-white" : "bg-navy-dark border-white/10 text-slate-300"
                      }`}
                    >
                      <Wallet className="w-3.5 h-3.5 text-slate-300" /> <span>Apple Pay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("googlepay");
                        setCardNumber("1234");
                      }}
                      className={`py-2 px-3 border rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "googlepay" ? "bg-royal-blue/20 border-royal-blue text-white" : "bg-navy-dark border-white/10 text-slate-300"
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5 text-slate-300" /> <span>Google Pay</span>
                    </button>
                  </div>
                </div>

                {/* Card Fields */}
                {paymentMethod === "card" ? (
                  <div className="space-y-3.5 bg-navy-dark/40 border border-white/5 p-4 rounded-2xl">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">Credit Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="4111 2222 3333 4444"
                        maxLength={19}
                        className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors font-mono"
                        id="giving-card-number"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors font-mono"
                          id="giving-card-expiry"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1">CVV</label>
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-navy-dark border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-royal-blue transition-colors font-mono"
                          id="giving-card-cvv"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-xs text-center text-slate-300">
                    Sowing via <strong className="text-white capitalize">{paymentMethod}</strong>. Express payment triggers will open on confirmation.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-royal-blue to-blue-600 hover:from-blue-600 hover:to-royal-blue font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-royal-blue/25 flex items-center justify-center gap-1.5"
                  id="btn-giving-pay"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Sow Seed of ${giveAmount} Now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
