import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Target, 
  AlertTriangle, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Search, 
  ArrowUpRight,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Video
} from 'lucide-react';

export default function SelfAuditReport() {
  const [channelUrl, setChannelUrl] = useState('https://youtube.com/@ParitoshAnand');
  const [videoTitle, setVideoTitle] = useState('building a 1Cr business for 2 students in 2 days');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const handleRunAudit = async (e) => {
    e.preventDefault();
    if (!videoTitle) return;

    setLoading(true);
    try {
      const resp = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelUrl, videoTitle })
      });
      const data = await resp.json();
      if (data.success) {
        setReportData(data.report);
      }
    } catch (err) {
      console.error('Audit fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Default initial mock report matching attached design if no audit run yet
  const displayReport = reportData || {
    videoTitle: videoTitle || 'building a 1Cr business for 2 students in 2 days',
    channelUrl: channelUrl || 'Paritosh Anand: Raw & Unfiltered',
    improvementIndex: 88,
    commentsAnalyzed: 135,
    unansweredQuestionsCount: 42,
    trafficCaptureProbability: '94.5%',
    actionableAngles: [
      {
        id: 1,
        demandPct: '30%',
        tag: 'FLAGSHIP - MAXIMUM RETENTION POTENTIAL',
        title: 'Agency Business Model: My Exact Pricing & Client Script',
        retentionDriver: 'showing the actual contract document'
      },
      {
        id: 2,
        demandPct: '25%',
        tag: 'AUTHORITY BUILDER',
        title: 'Scaling From Zero To 10k: The Operational Reality',
        retentionDriver: 'breakdown of my daily operational schedule'
      },
      {
        id: 3,
        demandPct: '20%',
        tag: 'CONTRARIAN ANGLE',
        title: "Stop Watching 'Motivation' Videos And Start Working",
        retentionDriver: "exposing the 'motivational' lie"
      },
      {
        id: 4,
        demandPct: '15%',
        tag: 'UTILITY FOCUSED',
        title: 'How To Find High-Paying Clients For Any Service',
        retentionDriver: 'live walkthrough of cold outreach'
      },
      {
        id: 5,
        demandPct: '10%',
        tag: 'TRANSPARENCY DRIVEN',
        title: 'Real Talk: The Financials Behind My Brand',
        retentionDriver: 'revealing the exact P&L statement'
      }
    ],
    unmetMarketDemands: [
      {
        id: '01',
        title: 'Pricing & Unit Economics',
        description: 'Audience wants to know how to set prices and manage cash flow, not just abstract ideas.',
        demandVolume: '40%'
      },
      {
        id: '02',
        title: 'Direct Mentorship Access',
        description: 'Viewers are desperate for actual contact, not just content comments.',
        demandVolume: '30%'
      },
      {
        id: '03',
        title: 'Step-by-Step Execution Blueprints',
        description: 'They want a roadmap, not a fairy tale story of success.',
        demandVolume: '20%'
      },
      {
        id: '04',
        title: 'Niche-Specific Agency Guides',
        description: 'Generic "agency" talk is becoming stale; they want specific niche playbooks.',
        demandVolume: '10%'
      }
    ],
    contentGaps: [
      {
        id: 'Gap #1',
        title: 'Actual Financial Spreadsheets',
        description: 'Providing downloadable templates would instantly destroy authority of superficial sources.'
      },
      {
        id: 'Gap #2',
        title: 'Contract Negotiation Scripts',
        description: 'None of current content provides the exact words to close high-ticket clients.'
      },
      {
        id: 'Gap #3',
        title: 'Competitor Analysis Walkthroughs',
        description: 'Teaching them how to analyze their own market competitors directly.'
      },
      {
        id: 'Gap #4',
        title: 'Operational Tech Stack Setup',
        description: 'Showing exactly which software/automations are used for scaling.'
      }
    ],
    criticalFrustrations: [
      {
        sentiment: 'CONFUSION',
        complaintCount: '12 Complaints',
        title: 'Lack Of Practical Financials',
        description: 'Viewers feel content is just fluff without unit economics or pricing details.'
      },
      {
        sentiment: 'IMPATIENCE',
        complaintCount: '9 Complaints',
        title: 'Unreachable Mentor Figure',
        description: 'Frustration over creator being unavailable for direct, personal guidance.'
      },
      {
        sentiment: 'ABANDONMENT',
        complaintCount: '7 Complaints',
        title: 'Vague Scaling Advice',
        description: 'Viewers tired of high-level motivation and want granular operational steps.'
      }
    ],
    frictionHeatmap: [
      {
        timestamp: '23:32',
        level: 'High Confusion',
        issue: 'Confusion regarding repeated storytelling of past relationships',
        fix: 'Maintain strict, business-only narrative focus'
      },
      {
        timestamp: '12:15',
        level: 'Low Friction',
        issue: 'Audience overwhelmed by high-level "business" jargon without definitions',
        fix: 'Add glossary pop-ups for business terminology'
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Search Input Bar */}
      <div className="glass-card p-6 border-indigo-500/20">
        <form onSubmit={handleRunAudit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Creator Channel Link</label>
              <input
                type="text"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="https://youtube.com/@yourchannel"
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Video Title to Self-Audit</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter video title..."
                className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-100"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Video...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Run Creator Self-Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* PAGE 1: Overview & Metrics Header (Matching attached Screenshot 1) */}
      <div className="glass-card-light p-8 md:p-12 space-y-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="badge-pill badge-pink">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            CREATOR SELF-AUDIT ACTIVE • OPTIMIZATION POTENTIAL FOUND
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">VIDEO 1 OF 1 ANALYSIS</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
            Creator Retention & Audience Gap Audit
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl leading-relaxed">
            Reverse-engineering your video performance & viewer feedback to capture leaked retention and dominate search algorithms.
          </p>
        </div>

        {/* Video Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-48 h-28 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 border border-slate-300">
            <Video className="w-8 h-8 opacity-60" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <span className="bg-rose-100 text-rose-700 font-bold px-3 py-1 rounded-full text-xs">
                MY VIDEO #1
              </span>
              <span className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs">
                Optimization Index: {displayReport.improvementIndex}%
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{displayReport.videoTitle}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <span>Channel: {displayReport.channelUrl}</span>
              <span>•</span>
              <span>Part of {displayReport.commentsAnalyzed} comments analyzed in this scan</span>
            </p>
          </div>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">COMMENTS ANALYZED</span>
            <div className="text-4xl font-extrabold text-slate-900">{displayReport.commentsAnalyzed}</div>
            <p className="text-xs text-slate-500">Across your video upload</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">UNANSWERED VIEWER QUESTIONS</span>
            <div className="text-4xl font-extrabold text-emerald-600">{displayReport.unansweredQuestionsCount}</div>
            <p className="text-xs text-slate-500">Golden gaps ready for your next video</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">TRAFFIC CAPTURE PROBABILITY</span>
            <div className="text-4xl font-extrabold text-rose-500">{displayReport.trafficCaptureProbability}</div>
            <p className="text-xs text-slate-500">High probability of ranking #1 in search</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">OPTIMIZATION INDEX</span>
            <div className="text-4xl font-extrabold text-rose-500">{displayReport.improvementIndex}%</div>
            <p className="text-xs text-slate-500">Channel target benchmark</p>
          </div>
        </div>
      </div>

      {/* PAGE 2: Action Angles (Matching attached Screenshot 2) */}
      <div className="glass-card-light p-8 md:p-12 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              High-Retention Action Angles (Ready-to-Produce Ideas)
            </h2>
            <p className="text-slate-500 mt-1">
              Synthesized across your audience feedback. Includes title hooks, retention drivers, and tags.
            </p>
          </div>
          <div className="hidden md:block bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">5 Angles</div>
            <div className="text-xs text-indigo-400 font-semibold uppercase">Unlocked</div>
          </div>
        </div>

        <div className="space-y-4">
          {displayReport.actionableAngles.map((angle, idx) => (
            <div key={idx} className="border border-rose-200 rounded-2xl p-6 space-y-4 bg-white hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-extrabold text-slate-400 text-lg">#{angle.id}</span>
                <span className="bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {angle.demandPct} DEMAND • {angle.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{angle.title}</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 inline-block">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Retention Driver: </span>
                <span className="text-sm font-semibold text-slate-800">{angle.retentionDriver}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 3: Unmet Market Demands (Matching attached Screenshot 3) */}
      <div className="glass-card-light p-8 md:p-12 space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Unmet Market Demands (What Viewers Are Begging For)
              </h2>
            </div>
            <p className="text-slate-500">
              Exact topics your audience is requesting in comments that your previous upload didn't fully answer.
            </p>
          </div>
          <span className="hidden md:inline-block bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
            High Search Intent
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayReport.unmetMarketDemands.map((demand, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl p-6 flex justify-between items-start bg-slate-50/50">
              <div className="space-y-2 max-w-xs">
                <span className="text-xs font-bold text-slate-400 font-mono">{demand.id}</span>
                <h4 className="text-xl font-bold text-slate-900">{demand.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{demand.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-slate-900">{demand.demandVolume}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DEMAND VOLUME</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 4: Content Gaps & Structural Holes (Matching attached Screenshot 4) */}
      <div className="glass-card-light p-8 md:p-12 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Content Gaps to Fill in Your Next Video
            </h2>
            <p className="text-slate-500 mt-1">
              Structural gaps in your content strategy. Filling these will capture 100% of viewer intent.
            </p>
          </div>
          <span className="hidden md:inline-block bg-indigo-50 text-indigo-600 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
            Structural Opportunities
          </span>
        </div>

        <div className="space-y-4">
          {displayReport.contentGaps.map((gap, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl p-6 space-y-2 bg-white">
              <h4 className="text-xl font-bold text-slate-900">{gap.id}: {gap.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{gap.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 5: Critical Audience Frustrations (Matching attached Screenshot 5) */}
      <div className="glass-card-light p-8 md:p-12 space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
              <h2 className="text-3xl font-extrabold text-slate-900">
                Critical Audience Frustrations (Viewer Pain Points)
              </h2>
            </div>
            <p className="text-slate-500">
              Where viewers felt confused or impatient in your video. Solve these in your next edit to become the hero.
            </p>
          </div>
          <span className="hidden md:inline-block bg-rose-50 text-rose-600 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
            Leakage Zones
          </span>
        </div>

        <div className="space-y-4">
          {displayReport.criticalFrustrations.map((frust, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl p-6 space-y-3 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  COMMENT SENTIMENT • {frust.sentiment}
                </span>
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                  {frust.complaintCount}
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">{frust.title}</h4>
              <p className="text-slate-600 text-sm">{frust.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 6: Friction Heatmap & Timestamps (Matching attached Screenshot 6) */}
      <div className="glass-card-light p-8 md:p-12 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Friction Heatmap & Timestamp Drop-off Fixes
            </h2>
            <p className="text-slate-500 mt-1">
              Exact timestamps where viewer drop-off or confusion occurs, paired with verified technical fixes.
            </p>
          </div>
          <span className="hidden md:inline-block bg-slate-100 text-slate-600 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider">
            Timestamp Drop-offs
          </span>
        </div>

        <div className="space-y-4">
          {displayReport.frictionHeatmap.map((item, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl p-6 space-y-4 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                  TIMESTAMP {item.timestamp}
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {item.level}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{item.issue}</h4>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-900">Verified Fix: {item.fix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
