import React from 'react';
import { Users, Lightbulb, ExternalLink, Eye, ThumbsUp, Calendar, Sparkles, TrendingUp } from 'lucide-react';

export default function CompetitorsAndIdeasTab({ competitorVideos = [], otherVideoIdeas = [] }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Competitor Videos in Niche */}
      <div className="glass-card p-6 md:p-8 border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
            <Users className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Competitor Videos in Your Niche</h3>
            <p className="text-xs text-slate-400">Top-ranking longform YouTube videos on the same topic for benchmarking</p>
          </div>
        </div>

        {competitorVideos.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No direct competitor videos found for this topic.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {competitorVideos.map((comp, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 space-y-3 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {comp.thumbnailUrl && (
                    <div className="relative overflow-hidden rounded-lg border border-slate-800">
                      <img 
                        src={comp.thumbnailUrl} 
                        alt={comp.title}
                        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <a
                        href={`https://youtube.com/watch?v=${comp.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="h-6 w-6 text-white" />
                      </a>
                    </div>
                  )}

                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {comp.channelTitle}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 line-clamp-2 transition-colors">
                      {comp.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 font-medium">
                    <Eye className="h-3 w-3 text-cyan-400" />
                    {comp.viewCount} views
                  </span>
                  <a
                    href={`https://youtube.com/watch?v=${comp.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                  >
                    Watch <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Other High-Potential Video Ideas */}
      <div className="glass-card p-6 md:p-8 border-purple-500/30 bg-purple-950/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
            <Lightbulb className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-300 font-heading">Recommended Follow-up Video Ideas</h3>
            <p className="text-xs text-purple-400/80">High-potential content angles to build a bingeable YouTube video series</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {otherVideoIdeas.map((idea, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-purple-900/40 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>
                <h4 className="text-base font-semibold text-slate-100">{idea.title}</h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-purple-300">Concept: </span>
                {idea.concept}
              </p>

              <div className="bg-purple-950/40 border border-purple-800/40 rounded-lg p-2.5 flex items-start gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-pink-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-pink-200 leading-normal">
                  <span className="font-semibold text-pink-400">Target Angle: </span>
                  {idea.targetAngle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
