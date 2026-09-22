import React from 'react';
import { Youtube, Sparkles, Settings } from 'lucide-react';

export default function Header({ keys, onOpenSettings }) {
  const hasYtKey = Boolean(keys.youtubeApiKey);
  const hasGeminiKey = Boolean(keys.geminiApiKey);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-red-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Youtube className="h-5 w-5 text-red-500 fill-red-500/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">YT Creator AI Studio</h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> LOCAL PRO
              </span>
            </div>
            <p className="text-xs text-slate-400">Video Title, Keyword & Audience Comment Sentiment Analyzer</p>
          </div>
        </div>

        {/* API Keys Status & Settings */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${hasYtKey ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400'}`}></span>
              <span className="text-slate-300 font-medium">YouTube API</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${hasGeminiKey ? 'bg-purple-400 animate-pulse' : 'bg-purple-400'}`}></span>
              <span className="text-slate-300 font-medium">Gemini AI</span>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm"
          >
            <Settings className="h-4 w-4 text-slate-400" />
            <span>API Keys</span>
          </button>
        </div>
      </div>
    </header>
  );
}
