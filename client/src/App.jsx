import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoInput from './components/VideoInput';
import TitleKeywordsTab from './components/TitleKeywordsTab';
import AudienceSentimentTab from './components/AudienceSentimentTab';
import CompetitorsAndIdeasTab from './components/CompetitorsAndIdeasTab';
import QuestionsTab from './components/QuestionsTab';
import SettingsModal from './components/SettingsModal';
import { analyzeVideoApi, getStoredApiKeys } from './services/api';
import { 
  Sparkles, 
  MessageSquare, 
  Tag, 
  Heart, 
  HelpCircle, 
  Eye, 
  ThumbsUp, 
  Calendar, 
  ExternalLink,
  Users
} from 'lucide-react';

export default function App() {
  const [keys, setKeys] = useState({ youtubeApiKey: '', geminiApiKey: '' });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [activeTab, setActiveTab] = useState('titles_keywords'); // 'titles_keywords' | 'audience_sentiment' | 'questions_action'

  useEffect(() => {
    const stored = getStoredApiKeys();
    setKeys(stored);
  }, []);

  const handleAnalyze = async (videoUrl) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeVideoApi({
        videoUrl,
        youtubeApiKey: keys.youtubeApiKey,
        geminiApiKey: keys.geminiApiKey
      });

      setAnalysisData(result);
      setActiveTab('titles_keywords');
    } catch (err) {
      setError(err.message || 'Failed to analyze video. Please check your URL or API key settings.');
    } finally {
      setLoading(false);
    }
  };

  const videoDetails = analysisData?.videoDetails;
  const analysis = analysisData?.analysis;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Header Bar */}
      <Header 
        keys={keys} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {/* URL Input Bar */}
        <VideoInput 
          onAnalyze={handleAnalyze} 
          loading={loading} 
          error={error} 
        />

        {/* Loading Skeleton */}
        {loading && (
          <div className="glass-card p-12 text-center max-w-3xl mx-auto my-8 animate-pulse space-y-4">
            <div className="h-12 w-12 bg-red-500/20 border border-red-500/30 rounded-full mx-auto flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-red-400 animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-white">Analyzing Video & Comments...</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Fetching video statistics, extracting top comments via YouTube API, and categorizing audience sentiment with Gemini AI.
            </p>
          </div>
        )}

        {/* Analysis Results Display */}
        {analysisData && !loading && (
          <div className="space-y-6 my-8 animate-fade-in">
            
            {/* Video Overview Banner */}
            <div className="glass-card p-6 border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {videoDetails?.thumbnailUrl && (
                  <div className="relative group shrink-0">
                    <img 
                      src={videoDetails.thumbnailUrl} 
                      alt={videoDetails.title}
                      className="w-44 h-24 object-cover rounded-xl border border-slate-800 shadow-md group-hover:scale-[1.02] transition-transform" 
                    />
                    <a 
                      href={`https://youtube.com/watch?v=${videoDetails.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </a>
                  </div>
                )}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      {videoDetails?.channelTitle}
                    </span>
                    {videoDetails?.publishedAt && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(videoDetails.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-white leading-snug line-clamp-2">
                    {videoDetails?.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Eye className="h-3.5 w-3.5 text-cyan-400" />
                      {videoDetails?.viewCount} Views
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <ThumbsUp className="h-3.5 w-3.5 text-emerald-400" />
                      {videoDetails?.likeCount} Likes
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
                      {analysisData?.commentsCount} Comments Analyzed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Navigation Bar */}
            <div className="flex items-center border-b border-slate-800 gap-2 overflow-x-auto pb-0.5">
              <button
                onClick={() => setActiveTab('titles_keywords')}
                className={`px-5 py-3 text-xs md:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
                  activeTab === 'titles_keywords'
                    ? 'bg-slate-900 text-amber-400 border-slate-700/80 border-b-2 border-b-amber-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                <Tag className="h-4 w-4" />
                <span>AI Titles & SEO Keywords</span>
              </button>

              <button
                onClick={() => setActiveTab('audience_sentiment')}
                className={`px-5 py-3 text-xs md:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
                  activeTab === 'audience_sentiment'
                    ? 'bg-slate-900 text-emerald-400 border-slate-700/80 border-b-2 border-b-emerald-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                <Heart className="h-4 w-4" />
                <span>Loved vs. Hated Comments</span>
              </button>

              <button
                onClick={() => setActiveTab('competitors_ideas')}
                className={`px-5 py-3 text-xs md:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
                  activeTab === 'competitors_ideas'
                    ? 'bg-slate-900 text-cyan-400 border-slate-700/80 border-b-2 border-b-cyan-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Competitors & Video Ideas</span>
              </button>

              <button
                onClick={() => setActiveTab('questions_action')}
                className={`px-5 py-3 text-xs md:text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
                  activeTab === 'questions_action'
                    ? 'bg-slate-900 text-purple-400 border-slate-700/80 border-b-2 border-b-purple-400'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Viewer FAQs & Action Plan</span>
              </button>
            </div>

            {/* Tab Content Active Views */}
            <div className="pt-2">
              {activeTab === 'titles_keywords' && (
                <TitleKeywordsTab analysis={analysis} />
              )}

              {activeTab === 'audience_sentiment' && (
                <AudienceSentimentTab 
                  commentAnalysis={analysis?.commentAnalysis} 
                  commentsCount={analysisData?.commentsCount} 
                />
              )}

              {activeTab === 'competitors_ideas' && (
                <CompetitorsAndIdeasTab 
                  competitorVideos={analysisData?.competitorVideos} 
                  otherVideoIdeas={analysis?.otherVideoIdeas} 
                />
              )}

              {activeTab === 'questions_action' && (
                <QuestionsTab commentAnalysis={analysis?.commentAnalysis} />
              )}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-4 text-center text-xs text-slate-600">
        <p>⚡ YouTube Creator AI Studio • Running Locally on Port 3000</p>
      </footer>

      {/* API Key Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        keys={keys}
        onSaveKeys={(newKeys) => setKeys(newKeys)}
      />
    </div>
  );
}
