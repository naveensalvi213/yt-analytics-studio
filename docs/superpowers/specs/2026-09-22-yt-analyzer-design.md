# Design Specification: YouTube Video & Audience Comment Analyzer

**Date**: 2026-09-22
**Status**: Approved

## 1. Overview
The YouTube Video & Audience Comment Analyzer is a locally hosted full-stack application designed for YouTube creators. It integrates YouTube Data API v3 and Google Gemini API to analyze any YouTube video, generate high-CTR titles and SEO keywords, and categorize audience comments into appreciated vs. hated feedback, top questions, and actionable creator recommendations.

---

## 2. Architecture & Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons.
- **Backend**: Node.js, Express, `@google/generative-ai` SDK, `node-fetch`.
- **APIs**:
  - **YouTube Data API v3**: Fetches video metadata (`videos` endpoint) and comment threads (`commentThreads` endpoint).
  - **Google Gemini 2.0 Flash / Gemini 1.5 Flash**: Processes video metadata and comment transcripts to generate structured JSON analytical reports.

---

## 3. Core API Endpoints

### 3.1 `POST /api/analyze-video`
- **Request Body**:
  ```json
  {
    "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
    "youtubeApiKey": "optional_override",
    "geminiApiKey": "optional_override"
  }
  ```
- **Execution Flow**:
  1. Extract `videoId` from YouTube URL/ID string using regex parser.
  2. Call YouTube Data API v3 `/videos` endpoint for title, description, channel info, view count, like count, comment count, thumbnails.
  3. Call YouTube Data API v3 `/commentThreads` endpoint for top 100 comments (including top-level comments and comment text).
  4. Construct Gemini prompt requesting strict JSON response.
  5. Parse Gemini response and return structured result object to frontend.

- **Response Schema**:
  ```json
  {
    "success": true,
    "videoDetails": {
      "id": "string",
      "title": "string",
      "channelTitle": "string",
      "thumbnailUrl": "string",
      "viewCount": "string",
      "likeCount": "string",
      "commentCount": "string",
      "publishedAt": "string"
    },
    "analysis": {
      "suggestedTitles": [
        {
          "title": "string",
          "strategy": "string",
          "hookType": "Curiosity / Urgency / Value"
        }
      ],
      "keywords": {
        "primaryTags": ["string"],
        "secondaryTags": ["string"],
        "longTailKeywords": ["string"],
        "hashtags": ["string"]
      },
      "commentAnalysis": {
        "sentimentScore": {
          "positivePercent": 75,
          "negativePercent": 15,
          "neutralPercent": 10
        },
        "appreciatedElements": [
          {
            "topic": "string",
            "explanation": "string",
            "sampleQuotes": ["string"]
          }
        ],
        "hatedOrCriticizedElements": [
          {
            "topic": "string",
            "explanation": "string",
            "sampleQuotes": ["string"]
          }
        ],
        "viewerQuestions": ["string"],
        "creatorActionPlan": ["string"]
      }
    }
  }
  ```

---

## 4. Frontend UI Components

1. **Header & API Key Manager**:
   - Status indicators showing connected YouTube API & Gemini API.
   - Settings Modal to view/edit API keys.

2. **Video Search & Selection**:
   - Search input accepting YouTube URLs (`youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/shorts/...`) or raw Video IDs.
   - Quick sample video launcher for instant local testing.

3. **Dashboard View**:
   - **Video Header**: Displays thumbnail, current title, channel name, views, likes, comments count.
   - **Tab 1: AI Titles & SEO Keywords Studio**:
     - 5 AI Suggested Titles with copy buttons and strategy tags.
     - Organized Tag Cloud (Primary, Long-tail, Hashtags) with "Copy All Tags" feature.
   - **Tab 2: Audience Feedback (Loved vs. Hated)**:
     - Side-by-side green (Appreciated) and red (Criticized/Hated) insight cards.
     - Viewer quote highlights and sentiment progress bar.
   - **Tab 3: Viewer Questions & Creator Recommendations**:
     - Key questions asked in comments.
     - Actionable recommendations for the next video.

---

## 5. Verification Plan

- Run Express backend on port 5000 and verify `/api/health` and `/api/analyze-video`.
- Run Vite dev server on port 3000 and verify full UI workflow.
- Test with a live YouTube video URL to verify comment retrieval and Gemini JSON analysis.
