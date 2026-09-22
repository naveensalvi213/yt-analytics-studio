import React from 'react';
import { HelpCircle, Target, ArrowRight, Lightbulb } from 'lucide-react';

export default function QuestionsTab({ commentAnalysis }) {
  const questions = commentAnalysis?.viewerQuestions || [];
  const actionPlan = commentAnalysis?.creatorActionPlan || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Viewer Questions & FAQs */}
      <div className="glass-card p-6 md:p-8 border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
            <HelpCircle className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">Frequent Viewer Questions & FAQs</h3>
            <p className="text-xs text-slate-400">Questions audience asked in the comments — ideal topics for pinned comments or follow-up videos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No direct questions detected in sample comments.</p>
          ) : (
            questions.map((q, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">{q}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. Actionable Creator Strategy & Recommendations */}
      <div className="glass-card p-6 md:p-8 border-amber-500/30 bg-amber-950/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30">
            <Target className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-300 font-heading">Action Plan for Your Next Upload</h3>
            <p className="text-xs text-amber-400/80">Direct optimizations to boost viewer retention and satisfaction</p>
          </div>
        </div>

        <div className="space-y-3.5">
          {actionPlan.map((action, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-amber-900/40 rounded-xl p-4 flex items-start gap-3.5">
              <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Tip #{idx + 1}</span>
                <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">{action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
