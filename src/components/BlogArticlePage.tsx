import React, { useEffect, useState } from "react";
import { BlogPost } from "../types";
import { blogsData } from "../data/blogsData";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Bookmark, 
  Check, 
  BookOpen, 
  Sparkles, 
  User, 
  ExternalLink, 
  Quote, 
  ChevronRight,
  Printer,
  Facebook,
  Twitter,
  Heart
} from "lucide-react";

interface BlogArticlePageProps {
  articleId: string;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
}

export default function BlogArticlePage({ articleId, onBack, onSelectArticle }: BlogArticlePageProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(142);

  // Find article by ID, default to first if not found
  const article: BlogPost = blogsData.find((b) => b.id === articleId) || blogsData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [articleId]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } else {
      alert(`Article URL: ${url}`);
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  // Find related articles
  const relatedArticles = blogsData.filter((b) => b.id !== article.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-navy-dark text-slate-100 pb-24 text-left font-sans" id="blog-article-full-webpage">
      {/* Top Editorial Breadcrumb & Navigation Bar */}
      <div className="sticky top-0 z-40 bg-navy-dark/95 backdrop-blur-md border-b border-white/10 py-3.5 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="px-3.5 py-1.5 bg-white/5 hover:bg-gold hover:text-navy-dark text-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-white/10"
              id="btn-back-to-blogs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Journal</span>
            </button>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-block text-xs font-mono font-bold text-gold uppercase tracking-widest">
              Forbes Style Christian Editorial
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                liked 
                  ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30" 
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              }`}
              title="Like Article"
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
              <span className="text-[11px] font-mono">{likeCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Share Webpage Link"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold text-[11px]">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-gold" />
                  <span className="hidden sm:inline text-[11px]">Share</span>
                </>
              )}
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl text-xs transition-all cursor-pointer border ${
                bookmarked 
                  ? "bg-gold text-navy-dark border-gold font-bold" 
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              }`}
              title="Bookmark Story"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-navy-dark" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Webpage Container */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 md:pt-12 space-y-10">
        
        {/* Article Header Metadata */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-mono font-black uppercase tracking-widest text-navy-dark bg-gold px-3 py-1 rounded-md shadow-md">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">•</span>
            <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {article.publishedAt}
            </span>
            <span className="text-xs text-slate-400 font-mono">•</span>
            <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {article.readTime}
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 ml-auto">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Verified Editorial
            </span>
          </div>

          {/* Headline Title */}
          <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Subtitle / Executive Summary Box */}
          <div className="bg-navy-light/40 border-l-4 border-gold p-5 rounded-r-2xl text-slate-200 text-base md:text-lg font-serif italic leading-relaxed">
            "{article.subtitle}"
          </div>

          {/* Forbes Style Author Byline Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold/60 shadow-lg shrink-0"
              />
              <div>
                <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                  {article.author.name}
                  <span className="text-[10px] bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded font-mono font-bold">Contributor</span>
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-0.5">{article.author.role}</p>
                <p className="text-[11px] text-slate-400 font-serif italic mt-1 max-w-lg hidden sm:block">
                  {article.author.bio}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-sky-500 hover:text-white text-slate-300 rounded-lg transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-blue-600 hover:text-white text-slate-300 rounded-lg transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={() => window.print()}
                className="p-2 bg-white/5 hover:bg-white/20 text-slate-300 rounded-lg transition-colors"
                title="Print Webpage"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Featured Image */}
        <figure className="space-y-2">
          <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent opacity-60" />
          </div>
          {article.imageCaption && (
            <figcaption className="text-xs text-slate-400 italic font-serif text-center px-4">
              {article.imageCaption}
            </figcaption>
          )}
        </figure>

        {/* Main Article Content (Forbes Typography & Layout) */}
        <div className="space-y-8 text-slate-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-sans">
          
          {/* Opening Paragraph with Forbes Drop Cap */}
          <p className="text-slate-100 text-lg md:text-xl font-sans leading-relaxed">
            <span className="float-left text-5xl md:text-6xl font-black font-display text-gold pr-3 pt-1 leading-none">
              {article.content.openingDropCap}
            </span>
            {article.content.openingText}
          </p>

          {/* Standard Paragraphs */}
          {article.content.paragraphs.map((paragraph, idx) => (
            <p key={idx} className="text-slate-200 leading-relaxed font-sans">
              {paragraph}
            </p>
          ))}

          {/* Pull Quote Block (Forbes Callout Style) */}
          {article.content.pullQuote && (
            <div className="my-10 bg-gradient-to-r from-gold/10 via-navy-light/40 to-navy-light/20 border-l-4 border-gold rounded-r-3xl p-6 md:p-8 space-y-3 relative shadow-2xl">
              <Quote className="w-10 h-10 text-gold/30 absolute top-4 right-6 pointer-events-none" />
              <blockquote className="font-serif text-xl md:text-2xl font-bold text-gold italic leading-snug">
                "{article.content.pullQuote.quote}"
              </blockquote>
              <cite className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-300 not-italic">
                — {article.content.pullQuote.reference}
              </cite>
            </div>
          )}

          {/* Subsections with H2 headings */}
          {article.content.subsections.map((sub, idx) => (
            <section key={idx} className="space-y-3 pt-4">
              <h2 className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold inline-block" />
                {sub.title}
              </h2>
              <p className="text-slate-300 leading-relaxed font-sans text-base md:text-lg">
                {sub.content}
              </p>
            </section>
          ))}

          {/* Key Takeaways Box */}
          {article.content.takeaways && article.content.takeaways.length > 0 && (
            <div className="my-10 bg-navy-light/30 border border-gold/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xl">
              <h3 className="font-display font-extrabold text-lg text-gold flex items-center gap-2 uppercase tracking-wider text-xs">
                <BookOpen className="w-4 h-4 text-gold" />
                Key Devotional Takeaways
              </h3>
              <ul className="space-y-3">
                {article.content.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-slate-200">
                    <span className="w-5 h-5 bg-gold/20 text-gold rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Devotional Prayer Block */}
          {article.content.prayer && (
            <div className="bg-gradient-to-br from-royal-blue/20 via-navy-light/40 to-navy-dark border border-sky-500/30 rounded-3xl p-6 md:p-8 space-y-3 shadow-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                Pastoral Reflection & Prayer
              </span>
              <h4 className="font-display font-extrabold text-lg text-white">A Prayer for Your Season</h4>
              <p className="font-serif italic text-slate-200 text-base leading-relaxed">
                "{article.content.prayer}"
              </p>
            </div>
          )}
        </div>

        {/* Extended Author Bio Card */}
        <div className="bg-navy-light/30 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gold shadow-xl shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gold">About the Author</span>
            <h3 className="font-display font-black text-xl text-white">{article.author.name}</h3>
            <p className="text-xs text-gold font-bold">{article.author.role}</p>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">{article.author.bio}</p>
          </div>
        </div>

        {/* Bottom Related Articles Section */}
        <section className="pt-12 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gold">House of Restoration Journal</span>
              <h3 className="font-display text-2xl font-black text-white">More Devotional Articles</h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-gold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Journal Stories</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.id)}
                className="group bg-navy-light/20 border border-white/5 rounded-2xl overflow-hidden hover:border-gold hover:bg-navy-light/40 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest text-navy-dark bg-gold px-2.5 py-0.5 rounded shadow">
                    {rel.category}
                  </span>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <h4 className="font-display font-extrabold text-sm text-white group-hover:text-gold transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-white/5">
                    <span>{rel.author.name}</span>
                    <span>{rel.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Return Button */}
        <div className="text-center pt-8">
          <button
            onClick={onBack}
            className="px-8 py-3.5 bg-gradient-to-r from-royal-blue via-navy-light to-gold text-navy-dark font-extrabold rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to House of Restoration Journal</span>
          </button>
        </div>
      </div>
    </article>
  );
}
