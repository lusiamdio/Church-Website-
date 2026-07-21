import React, { useState } from "react";
import { blogsData } from "../data/blogsData";
import { BlogPost } from "../types";
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Newspaper, 
  Flame, 
  ExternalLink,
  Search,
  ChevronRight
} from "lucide-react";

interface ForbesJournalSectionProps {
  onSelectArticle: (articleId: string) => void;
}

export default function ForbesJournalSection({ onSelectArticle }: ForbesJournalSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Devotional Intel",
    "Faith & Leadership",
    "Kingdom Business",
    "Family & Culture",
    "Global Intercession",
    "Mind & Wellness"
  ];

  // Filter articles based on category and search
  const filteredArticles = blogsData.filter((article) => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Editorial Pick / Hero Main Story
  const mainHeroArticle = blogsData.find((b) => b.isEditorialPick) || blogsData[0];

  // Trending stories sorted by rank
  const trendingArticles = blogsData.filter((b) => b.isTrending).sort((a, b) => (a.trendingRank || 0) - (b.trendingRank || 0));

  // Remaining articles for secondary grid
  const secondaryArticles = filteredArticles.filter((b) => b.id !== mainHeroArticle.id);

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-navy-dark via-navy-light/15 to-navy-dark text-left relative overflow-hidden" id="forbes-news-journal-section">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-royal-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Forbes Journal Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-navy-dark bg-gold px-3 py-1 rounded shadow flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5 text-navy-dark" /> Forbes Style Editorial
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Daily Christian Devotionals & Insights
              </span>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              House of Restoration <span className="text-gold italic font-serif">Journal</span>
            </h2>
            <p className="text-sm md:text-base text-slate-300 font-sans leading-relaxed">
              In-depth Christian reflections, kingdom leadership analyses, and daily devotional intel for believers seeking biblical clarity in modern culture.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-light/40 border border-white/10 focus:border-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Category Pills Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-gold" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-gold text-navy-dark border-gold shadow-lg shadow-gold/20 scale-105"
                  : "bg-navy-light/30 text-slate-300 border-white/10 hover:border-gold/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Forbes Landing Layout Grid: Hero Spotlight + Trending Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Hero Featured Article (Lg 8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            <div 
              onClick={() => onSelectArticle(mainHeroArticle.id)}
              className="group bg-navy-light/20 border border-white/10 hover:border-gold/60 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-2xl relative flex flex-col"
              id="forbes-hero-article-card"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={mainHeroArticle.heroImage}
                  alt={mainHeroArticle.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-navy-dark bg-gold px-3 py-1 rounded shadow-md">
                    {mainHeroArticle.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-rose-600 px-3 py-1 rounded shadow-md flex items-center gap-1">
                    <Flame className="w-3 h-3 text-white animate-bounce" /> FORBES EDITORIAL PICK
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 text-xs font-mono text-slate-200 bg-navy-dark/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  {mainHeroArticle.readTime}
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <h3 className="font-display text-2xl md:text-3xl font-black text-white group-hover:text-gold transition-colors leading-tight">
                  {mainHeroArticle.title}
                </h3>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans line-clamp-3">
                  {mainHeroArticle.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={mainHeroArticle.author.avatar}
                      alt={mainHeroArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-gold/50"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{mainHeroArticle.author.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{mainHeroArticle.publishedAt}</p>
                    </div>
                  </div>

                  <button className="px-5 py-2.5 bg-gold hover:bg-gold-light text-navy-dark font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md group-hover:translate-x-1">
                    <span>Read Webpage Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Articles 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondaryArticles.slice(0, 4).map((article) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article.id)}
                  className="group bg-navy-light/20 border border-white/5 hover:border-gold/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xl"
                >
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-navy-dark bg-gold px-2.5 py-0.5 rounded shadow">
                        {article.category}
                      </span>
                    </div>
                    <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-300 bg-navy-dark/80 px-2 py-0.5 rounded border border-white/10">
                      {article.readTime}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-extrabold text-base text-white group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-normal">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400">
                      <span className="text-slate-300 font-sans font-bold">{article.author.name}</span>
                      <span className="text-gold group-hover:underline flex items-center gap-1 font-bold">
                        Read Story <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Trending & Most Read Devotionals (Lg 4 columns) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-navy-light/20 border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-wider text-xs">
                    Forbes Most Read
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Top 4 Devotionals</span>
              </div>

              <div className="space-y-6">
                {trendingArticles.map((trend, idx) => (
                  <div
                    key={trend.id}
                    onClick={() => onSelectArticle(trend.id)}
                    className="group flex items-start gap-4 cursor-pointer pb-5 border-b border-white/5 last:border-b-0 last:pb-0"
                  >
                    <span className="font-display text-3xl font-black text-gold/40 group-hover:text-gold transition-colors shrink-0 font-mono w-8">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-sky-400">
                        {trend.category}
                      </span>
                      <h4 className="font-display font-bold text-xs text-white group-hover:text-gold transition-colors leading-snug line-clamp-2">
                        {trend.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <span>{trend.author.name}</span>
                        <span>•</span>
                        <span>{trend.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Devotional Newsletter Callout */}
              <div className="bg-gradient-to-br from-royal-blue/30 via-navy-light/40 to-gold/10 border border-gold/30 rounded-2xl p-5 space-y-3 pt-6">
                <div className="w-9 h-9 bg-gold/20 text-gold rounded-xl flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-display font-black text-sm text-white">Daily Forbes Devotional Briefing</h4>
                <p className="text-xs text-slate-300">
                  Receive Apostle David & Prophetess Maria's morning spiritual intelligence delivered directly to your inbox.
                </p>
                <div className="flex gap-2 pt-1">
                  <input
                    type="email"
                    placeholder="Enter email..."
                    className="bg-navy-dark/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold flex-1"
                  />
                  <button className="px-3 py-2 bg-gold text-navy-dark font-extrabold rounded-xl text-xs cursor-pointer hover:bg-gold-light transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
