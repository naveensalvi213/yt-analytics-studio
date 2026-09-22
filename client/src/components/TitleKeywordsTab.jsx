import React, { useState } from 'react';
import { Copy, Check, Sparkles, Tag, Hash, Compass, ArrowUpRight } from 'lucide-react';

export default function TitleKeywordsTab({ analysis }) {
  const [copiedTitleIndex, setCopiedTitleIndex] = useState(null);
  const [copiedTags, setCopiedTags] = useState(false);

  const titles = analysis?.suggestedTitles || [];
  const keywords = analysis?.keywords || {};

  const handleCopyTitle = (titleText, index) => {
    navigator.clipboard.writeText(titleText);
    setCopiedTitleIndex(index);
    setTimeout(() => setCopiedTitleIndex(null), 2000);
  };

  const handleCopyAllTags = () => {
    const allTags = [
      ...(keywords.primaryTags || []),
      ...(keywords.secondaryTags || []),
      ...(keywords.longTailKeywords || [])
    ].join(', ');
    
    navigator.clipboard.writeText(allTags);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. AI High-CTR Title Suggestions */}
      <div className="glass-card p-6 md:p-8 border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-500/20 to-rose-500/20 rounded-xl border border-amber-500/30">
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">High-CTR Title Recommendations</h3>
              <p className="text-xs text-slate-400">Optimized for high YouTube algorithm click-through rates and viewer curiosity</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {titles.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4.5 transition-all group relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Option #{idx + 1}
                    </span>
                    {item.hookType && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {item.hookType}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-semibold text-slate-300">Strategy: </span>
                    {item.strategy}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyTitle(item.title, idx)}
                  className="self-start sm:self-center shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95"
                >
                  {copiedTitleIndex === idx ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Title</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SEO Keywords & Hashtags Hub */}
      <div className="glass-card p-6 md:p-8 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
              <Tag className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">SEO Keywords & Video Tags</h3>
              <p className="text-xs text-slate-400">Target tags and long-tail phrases to maximize YouTube search indexing</p>
            </div>
          </div>

          <button
            onClick={handleCopyAllTags}
            className="self-start sm:self-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition-all active:scale-95"
          >
            {copiedTags ? (
              <>
                <Check className="h-4 w-4" />
                <span>All Tags Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy All Studio Tags</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Tags */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" /> Primary Video Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {(keywords.primaryTags || []).map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs font-medium bg-cyan-950/60 text-cyan-200 border border-cyan-800/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Secondary Tags */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5" /> Secondary Search Phrases
            </h4>
            <div className="flex flex-wrap gap-2">
              {(keywords.secondaryTags || []).map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-950/60 text-blue-200 border border-blue-800/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Long-tail Keywords */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowUpRight className="h-3.5 w-3.5" /> Long-Tail Search Queries
            </h4>
            <div className="flex flex-wrap gap-2">
              {(keywords.longTailKeywords || []).map((kw, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/60 text-purple-200 border border-purple-800/50">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Video Hashtags */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5" /> Video Description Hashtags
            </h4>
            <div className="flex flex-wrap gap-2">
              {(keywords.hashtags || []).map((ht, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-pink-950/60 text-pink-300 border border-pink-800/50">
                  {ht.startsWith('#') ? ht : `#${ht}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
