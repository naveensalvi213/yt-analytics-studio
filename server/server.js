import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { 
  extractVideoId, 
  fetchSingleVideoDetails, 
  fetchVideoComments, 
  searchTopLongformVideos 
} from './services/youtubeService.js';
import { 
  analyzeVideoContentAndComments, 
  generateCreatorSelfAudit, 
  selectBestThumbnailWithGemini 
} from './services/geminiService.js';
import { generateNanoBananaThumbnail } from './services/thumbnailEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Root route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #f8fafc; height: 100vh;">
      <h1 style="color: #38bdf8;">⚡ YT Video & Audience Comment Analyzer Backend</h1>
      <p>Status: <strong style="color: #4ade80;">Running (Port ${PORT})</strong></p>
      <p>Web App URL: <a href="http://localhost:3000" style="color: #ec4899; font-weight: bold;">http://localhost:3000</a></p>
    </div>
  `);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    youtubeKeyConfigured: Boolean(process.env.YOUTUBE_API_KEY),
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

/**
 * POST /api/analyze-video
 * Main Endpoint for Video Metadata, High-CTR Titles, SEO Keywords, and Audience Comment Analysis
 */
app.post('/api/analyze-video', async (req, res) => {
  try {
    const { videoUrl, youtubeApiKey, geminiApiKey } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Please enter a valid YouTube Video URL or Video ID.' });
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return res.status(400).json({ 
        error: 'Could not parse a valid YouTube Video ID from your input. Please provide a standard link like https://www.youtube.com/watch?v=... or an 11-character Video ID.' 
      });
    }

    const ytKey = youtubeApiKey || process.env.YOUTUBE_API_KEY;
    const geminiKey = geminiApiKey || process.env.GEMINI_API_KEY || ytKey;

    if (!ytKey) {
      return res.status(400).json({ error: 'YouTube API key is missing. Please configure it in your Settings or server environment.' });
    }

    console.log(`[API /analyze-video] Fetching details & comments for Video ID: ${videoId}`);

    // 1. Fetch Video Metadata
    const videoDetails = await fetchSingleVideoDetails(videoId, ytKey);

    // 2. Fetch Top Comments (up to 100)
    const comments = await fetchVideoComments(videoId, ytKey, 100);
    console.log(`[API /analyze-video] Extracted ${comments.length} audience comments.`);

    // 3. Fetch Competitor Videos in Niche
    const competitorVideos = await searchTopLongformVideos(videoDetails.title, ytKey, 6, videoId);
    console.log(`[API /analyze-video] Found ${competitorVideos.length} competitor videos.`);

    // 4. Analyze Content & Comments with Gemini AI
    const analysis = await analyzeVideoContentAndComments(videoDetails, comments, geminiKey);

    res.json({
      success: true,
      videoDetails,
      commentsCount: comments.length,
      competitorVideos,
      analysis
    });
  } catch (error) {
    console.error('Error in /api/analyze-video:', error.message);
    res.status(500).json({ 
      error: 'Failed to analyze video and comments.', 
      details: error.message 
    });
  }
});

/**
 * POST /api/audit (Legacy audit endpoint)
 */
app.post('/api/audit', async (req, res) => {
  try {
    const { channelUrl, videoTitle } = req.body;
    if (!videoTitle) {
      return res.status(400).json({ error: 'videoTitle is required.' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const topVideos = await searchTopLongformVideos(videoTitle, apiKey, 3);
    let comments = [];

    if (topVideos.length > 0 && topVideos[0].id) {
      comments = await fetchVideoComments(topVideos[0].id, apiKey, 30);
    }

    const report = await generateCreatorSelfAudit(
      channelUrl || 'https://youtube.com/@creator',
      videoTitle,
      comments,
      process.env.GEMINI_API_KEY
    );

    res.json({ success: true, report });
  } catch (error) {
    console.error('Error in /api/audit:', error);
    res.status(500).json({ error: 'Failed to generate audit report.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`🚀 YT Video & Comment Analyzer Backend Port ${PORT}`);
  console.log(`================================================`);
});
