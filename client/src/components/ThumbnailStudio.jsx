import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Download, 
  CheckCircle, 
  Eye, 
  RefreshCw, 
  Layers, 
  Wand2, 
  Cpu, 
  Zap,
  Sliders,
  Check
} from 'lucide-react';

const GENERATION_STEPS = [
  'Analyzing Video Title & Target Niche...',
  'Scouting Top 10 High-CTR YouTube Thumbnails (Excluding Shorts)...',
  'Evaluating 3D Composition & Color Grade with Gemini 2.0 Flash...',
  'Detecting Creator Face & Applying 4K Skin Retouching...',
  'Synthesizing 2-5 Word High-Impact Catchy Text Overlay...',
  'Rendering 4K Nano Banana Pro Thumbnail...'
];

export default function ThumbnailStudio() {
  const [title, setTitle] = useState('How I Built a $100k Business in 7 Days');
  const [faceImage, setFaceImage] = useState(null);
  const [facePreview, setFacePreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFaceImage(file);
      setFacePreview(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!title) return;

    setIsGenerating(true);
    setError(null);
    setResult(null);
    setCurrentStepIndex(0);

    // Animate progress steps in UI
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < GENERATION_STEPS.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 1200);

    try {
      const formData = new FormData();
      formData.append('title', title);
      if (faceImage) {
        formData.append('faceImage', faceImage);
      }

      const response = await fetch('/api/thumbnail/generate', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (data.success) {
        setCurrentStepIndex(GENERATION_STEPS.length - 1);
        setTimeout(() => {
          setResult(data);
          setIsGenerating(false);
        }, 800);
      } else {
        setError(data.error || 'Failed to generate thumbnail.');
        setIsGenerating(false);
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.error('Thumbnail Generation error:', err);
      setError('Connection error while contacting Nano Banana server.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-24">
      {/* Header Banner */}
      <div className="glass-card p-8 md:p-10 border-pink-500/20 text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          <Zap className="w-4 h-4 text-pink-400" /> NANO BANANA AI THUMBNAIL STUDIO
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          High-CTR 3D AI Thumbnail Generator
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          Scouts top YouTube thumbnails, evaluates 3D design quality with Gemini Vision, swaps & 4K retouches creator face, and renders punchy text overlay.
        </p>
      </div>

      {/* Main Generator Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="md:col-span-1 glass-card p-6 space-y-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pink-500" /> Input Parameters
          </h2>

          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Video Title</label>
              <textarea
                rows={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title (e.g. Building a 1Cr business in 2 days)..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm focus:outline-none focus:border-pink-500 text-slate-100 resize-none"
              />
            </div>

            {/* Creator Face Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Creator Face Photo (Optional)</label>
              <div className="border-2 border-dashed border-slate-700 hover:border-pink-500/50 rounded-2xl p-4 text-center transition-all bg-slate-900/50 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                {facePreview ? (
                  <div className="space-y-2">
                    <img src={facePreview} alt="Creator Face" className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-pink-500 shadow-md" />
                    <p className="text-xs text-pink-400 font-medium">✓ Creator Photo Attached</p>
                  </div>
                ) : (
                  <div className="space-y-2 py-4">
                    <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400 font-medium">Upload Face Photo for 4K Retouching</p>
                    <p className="text-[10px] text-slate-500">Or leave empty for 3D graphic thumbnail</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !title}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <Wand2 className="w-5 h-5" />
              <span>Generate Nano Banana Thumbnail</span>
            </button>
          </form>
        </div>

        {/* Studio Canvas / Preview Panel */}
        <div className="md:col-span-2 glass-card p-6 md:p-8 flex flex-col justify-center min-h-[420px] relative overflow-hidden">
          {/* Animated Stepper Loader during Generation */}
          {isGenerating && (
            <div className="space-y-8 text-center my-auto py-8">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-4 border-pink-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                <Cpu className="w-8 h-8 text-pink-500 absolute inset-0 m-auto" />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">Nano Banana Engine Active</h3>
                <p className="text-sm text-pink-400 font-semibold">{GENERATION_STEPS[currentStepIndex]}</p>
              </div>

              {/* Progress Stepper List */}
              <div className="max-w-md mx-auto space-y-2 text-left pt-4">
                {GENERATION_STEPS.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    {idx < currentStepIndex ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : idx === currentStepIndex ? (
                      <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className={idx === currentStepIndex ? 'text-white font-bold' : idx < currentStepIndex ? 'text-slate-400 line-through' : 'text-slate-600'}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Result View */}
          {!isGenerating && result && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="badge-pill badge-green">✓ 4K Nano Banana Render Complete</div>
                  <h3 className="text-2xl font-bold text-white mt-1">Your 4K AI Thumbnail</h3>
                </div>
                <a
                  href={result.generatedThumbnailUrl}
                  download="nano_banana_thumbnail.svg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md"
                >
                  <Download className="w-4 h-4" /> Download 4K Thumbnail
                </a>
              </div>

              {/* Thumbnail Display Canvas */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500/40 shadow-2xl group">
                <img
                  src={result.generatedThumbnailUrl}
                  alt="Generated Nano Banana Thumbnail"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Details & Inspiration Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CATCHY TEXT OVERLAY</span>
                  <p className="text-lg font-black text-amber-400 font-heading">{result.catchyText}</p>
                  <p className="text-xs text-slate-500">{result.retouchStatus}</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">INSPIRATION THUMBNAIL SCOUTED</span>
                  <p className="text-xs font-semibold text-slate-200 line-clamp-1">{result.inspirationTitle}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{result.selectedReasoning}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty State before generation */}
          {!isGenerating && !result && (
            <div className="text-center my-auto py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                <ImageIcon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-300">Ready to Render</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Enter your video title and optional creator photo to start the Nano Banana AI Thumbnail pipeline.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
