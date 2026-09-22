import React, { useState } from 'react';
import { Search, Sparkles, Youtube, Link2, AlertCircle } from 'lucide-react';

export default function VideoInput({ onAnalyze, loading, error }) {
  const [urlInput, setUrlInput] = useState('');

  const sampleVideos = [
    { title: 'Rick Astley - Never Gonna Give You Up', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Veritasium - The Science of Everything', url: 'https://www.youtube.com/watch?v=fJIGDo5V8kI' },
    { title: 'MKBHD - Smartphone Awards', url: 'https://www.youtube.com/watch?v=X5z2v-7bXy0' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onAnalyze(urlInput.trim());
  };

  const handleSampleClick = (url) => {
    setUrlInput(url);
    onAnalyze(url);
  };

  return (
    <div className="glass-card p-6 md:p-8 max-w-4xl mx-auto my-6 border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-heading mb-2">
          Analyze Any YouTube Video
        </h2>
        <p className="text-sm text-slate-400">
          Paste your YouTube video link to extract comments, evaluate audience sentiment (Loved vs. Hated), and generate viral titles & SEO keywords.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 max-w-3xl mx-auto">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center gap-2">
            <Link2 className="h-5 w-5 text-red-500" />
          </div>

          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste YouTube Video URL (e.g. https://www.youtube.com/watch?v=... or ID)"
            className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20 text-white placeholder-slate-500 text-sm md:text-base rounded-xl py-3.5 pl-12 pr-36 md:pr-40 outline-none transition-all shadow-inner"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !urlInput.trim()}
            className="absolute right-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white font-medium text-xs md:text-sm px-4 md:px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Analyze Video</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-300 text-xs md:text-sm max-w-3xl mx-auto animate-fade-in">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-rose-200">Analysis Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Quick Test Samples */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
        <span className="text-slate-500 font-medium">Quick Test Links:</span>
        {sampleVideos.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSampleClick(sample.url)}
            disabled={loading}
            className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5"
          >
            <Youtube className="h-3 w-3 text-red-500" />
            <span>{sample.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
