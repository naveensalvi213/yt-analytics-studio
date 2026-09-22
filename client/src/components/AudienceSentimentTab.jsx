import React from 'react';
import { Heart, ThumbsDown, MessageSquare, Quote, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AudienceSentimentTab({ commentAnalysis, commentsCount }) {
  const sentiment = commentAnalysis?.sentimentScore || { positivePercent: 75, negativePercent: 15, neutralPercent: 10 };
  const lovedElements = commentAnalysis?.appreciatedElements || [];
  const hatedElements = commentAnalysis?.hatedOrCriticizedElements || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Overall Audience Sentiment Bar */}
      <div className="glass-card p-6 md:p-8 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30">
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Audience Sentiment Analysis</h3>
              <p className="text-xs text-slate-400">Evaluated across {commentsCount || 0} top audience comments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span>{sentiment.positivePercent}% Loved</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
              <span>{sentiment.negativePercent}% Hated/Critical</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-500"></span>
              <span>{sentiment.neutralPercent}% Neutral</span>
            </div>
          </div>
        </div>

        {/* Multi-segment Sentiment Bar */}
        <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden flex border border-slate-800 shadow-inner">
          <div 
            style={{ width: `${sentiment.positivePercent}%` }} 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
            title={`${sentiment.positivePercent}% Appreciated`}
          />
          <div 
            style={{ width: `${sentiment.neutralPercent}%` }} 
            className="bg-slate-600 transition-all duration-1000"
            title={`${sentiment.neutralPercent}% Neutral`}
          />
          <div 
            style={{ width: `${sentiment.negativePercent}%` }} 
            className="bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-1000"
            title={`${sentiment.negativePercent}% Hated / Criticized`}
          />
        </div>
      </div>

      {/* 2. Side-by-Side: Appreciated vs Hated Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GREEN COLUMN: Appreciated / Loved */}
        <div className="glass-card p-6 border-emerald-500/30 bg-emerald-950/10 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-900/40">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Heart className="h-5 w-5 fill-emerald-500/20" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-emerald-300 font-heading">What Audience Loved (Appreciated)</h4>
              <p className="text-xs text-emerald-400/80">Praise, highlights, and positive engagement</p>
            </div>
          </div>

          <div className="space-y-4">
            {lovedElements.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No strong praise detected in sample comments.</p>
            ) : (
              lovedElements.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-emerald-900/40 rounded-xl p-4.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> {item.topic}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.explanation}</p>
                  
                  {item.sampleQuotes && item.sampleQuotes.length > 0 && (
                    <div className="bg-emerald-950/30 border-l-2 border-emerald-500/50 p-2.5 rounded-r-lg space-y-1">
                      {item.sampleQuotes.map((q, qIdx) => (
                        <p key={qIdx} className="text-[11px] text-emerald-200/90 italic flex items-start gap-1.5">
                          <Quote className="h-3 w-3 shrink-0 text-emerald-400 mt-0.5" />
                          <span>"{q}"</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* RED COLUMN: Hated / Criticized */}
        <div className="glass-card p-6 border-rose-500/30 bg-rose-950/10 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-900/40">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
              <ThumbsDown className="h-5 w-5 fill-rose-500/20" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-rose-300 font-heading">What Audience Hated (Criticized)</h4>
              <p className="text-xs text-rose-400/80">Complaints, audio/editing flaws & friction points</p>
            </div>
          </div>

          <div className="space-y-4">
            {hatedElements.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No major complaints or hate detected in comments!</p>
            ) : (
              hatedElements.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-rose-900/40 rounded-xl p-4.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" /> {item.topic}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.explanation}</p>
                  
                  {item.sampleQuotes && item.sampleQuotes.length > 0 && (
                    <div className="bg-rose-950/30 border-l-2 border-rose-500/50 p-2.5 rounded-r-lg space-y-1">
                      {item.sampleQuotes.map((q, qIdx) => (
                        <p key={qIdx} className="text-[11px] text-rose-200/90 italic flex items-start gap-1.5">
                          <Quote className="h-3 w-3 shrink-0 text-rose-400 mt-0.5" />
                          <span>"{q}"</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
