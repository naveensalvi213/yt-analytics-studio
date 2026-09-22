import React, { useState } from 'react';
import { X, Key, Check, AlertCircle, Save } from 'lucide-react';
import { saveApiKeys } from '../services/api';

export default function SettingsModal({ isOpen, onClose, keys, onSaveKeys }) {
  const [youtubeKey, setYoutubeKey] = useState(keys.youtubeApiKey || '');
  const [geminiKey, setGeminiKey] = useState(keys.geminiApiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const newKeys = {
      youtubeApiKey: youtubeKey.trim(),
      geminiApiKey: geminiKey.trim()
    };

    saveApiKeys(newKeys);
    onSaveKeys(newKeys);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card max-w-md w-full p-6 border-slate-700/80 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">API Keys Configuration</h3>
            <p className="text-xs text-slate-400">Configure or override keys used for YouTube & Gemini AI</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              YouTube Data API v3 Key
            </label>
            <input
              type="password"
              value={youtubeKey}
              onChange={(e) => setYoutubeKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-900 border border-slate-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-slate-600 text-xs rounded-lg p-3 outline-none transition-all font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">Used to fetch video details, views, and comments from YouTube.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AQ.Ab8... or AIzaSy..."
              className="w-full bg-slate-900 border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-600 text-xs rounded-lg p-3 outline-none transition-all font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">Used for AI title generation, keyword strategy, and comment sentiment.</p>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Keys saved successfully to browser storage!</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-lg flex items-center gap-1.5 shadow-lg shadow-red-600/20 transition-all active:scale-95"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Keys</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
