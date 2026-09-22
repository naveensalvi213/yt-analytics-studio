# YouTube Video & Audience Comment Analyzer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a locally hosted full-stack web application that uses YouTube Data API v3 and Google Gemini API to analyze any YouTube video, generate high-CTR video titles and SEO keywords, and categorize audience comments into appreciated (loved) vs. hated (criticized) feedback, top viewer questions, and creator action items.

**Architecture:** Express.js backend on port 5000 providing `/api/analyze-video`, communicating with YouTube Data API v3 and `@google/generative-ai`. React + Vite + Tailwind CSS frontend on port 3000 rendering a YouTube Creator Studio dark dashboard.

**Tech Stack:** Node.js, Express, `@google/generative-ai`, `node-fetch`, React 18, Vite, Tailwind CSS, Lucide React icons.

## Global Constraints
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`
- Secrets read from `server/.env` with optional runtime overrides passed from frontend UI
- Strict JSON output format from Gemini API for predictable frontend parsing

---

### Task 1: Update YouTube API Service
**Files:**
- Modify: `c:/Users/navee/Downloads/YT AI/server/services/youtubeService.js`

**Interfaces:**
- Consumes: `videoIdOrUrl` (string), `apiKey` (string)
- Produces: `getVideoMetadata(videoId, apiKey)`, `fetchVideoComments(videoId, apiKey, maxComments)`

- [ ] **Step 1: Implement helper to extract videoId from YouTube URLs or direct IDs**
- [ ] **Step 2: Implement `getVideoDetails(videoId, apiKey)` in `youtubeService.js` to fetch snippet and statistics from `https://www.googleapis.com/youtube/v3/videos`**
- [ ] **Step 3: Enhance `fetchVideoComments(videoId, apiKey, maxComments)` to fetch up to 100 comment threads and extract plain text**
- [ ] **Step 4: Verify YouTube service functions via a standalone node test script in `server/scratch/testYoutubeService.js`**

---

### Task 2: Implement Gemini Analysis Service
**Files:**
- Modify: `c:/Users/navee/Downloads/YT AI/server/services/geminiService.js`

**Interfaces:**
- Consumes: `videoDetails` (object), `comments` (array), `geminiApiKey` (string)
- Produces: `analyzeVideoContentAndComments(videoDetails, comments, geminiApiKey)` returning JSON structured result object

- [ ] **Step 1: Write `analyzeVideoContentAndComments` prompt asking Gemini 2.0 Flash / 1.5 Flash for JSON output**
- [ ] **Step 2: Add JSON cleanup helper to extract valid JSON block from raw response text**
- [ ] **Step 3: Handle fallback gracefully if comment list is empty or comments disabled on video**
- [ ] **Step 4: Verify Gemini service output structure via standalone test script in `server/scratch/testGeminiService.js`**

---

### Task 3: Build Express API Route `/api/analyze-video`
**Files:**
- Modify: `c:/Users/navee/Downloads/YT AI/server/server.js`

**Interfaces:**
- Consumes: `POST /api/analyze-video` `{ videoUrl, youtubeApiKey, geminiApiKey }`
- Produces: JSON response with `{ success: true, videoDetails, analysis }` or `{ error: string }`

- [ ] **Step 1: Add `/api/analyze-video` POST handler in `server/server.js`**
- [ ] **Step 2: Validate URL/ID parameter and resolve API keys from request body or `process.env`**
- [ ] **Step 3: Connect `youtubeService` and `geminiService` pipelines**
- [ ] **Step 4: Test endpoint with `curl` or test script**

---

### Task 4: Create Frontend API Service & State Management
**Files:**
- Create: `c:/Users/navee/Downloads/YT AI/client/src/services/api.js`

**Interfaces:**
- Consumes: Backend API `http://localhost:5000/api/analyze-video`
- Produces: `analyzeVideoApi({ videoUrl, youtubeApiKey, geminiApiKey })`

- [ ] **Step 1: Create `client/src/services/api.js` with `fetch` requests and error handling**
- [ ] **Step 2: Add local storage helpers to save and load API keys in browser**

---

### Task 5: Build React Dashboard & Creator Studio UI
**Files:**
- Create: `c:/Users/navee/Downloads/YT AI/client/src/components/Header.jsx`
- Create: `c:/Users/navee/Downloads/YT AI/client/src/components/VideoInput.jsx`
- Create: `c:/Users/navee/Downloads/YT AI/client/src/components/TitleKeywordsTab.jsx`
- Create: `c:/Users/navee/Downloads/YT AI/client/src/components/AudienceSentimentTab.jsx`
- Create: `c:/Users/navee/Downloads/YT AI/client/src/components/QuestionsTab.jsx`
- Create: `c:/Users/navee/Downloads/YT AI/client/src/components/SettingsModal.jsx`
- Modify: `c:/Users/navee/Downloads/YT AI/client/src/App.jsx`

- [ ] **Step 1: Build `Header.jsx` with API Key Status indicator and Settings trigger**
- [ ] **Step 2: Build `VideoInput.jsx` with YouTube URL parser input, Analyze button, and loading animation**
- [ ] **Step 3: Build `TitleKeywordsTab.jsx` for 5 high-CTR AI Titles with strategy badges and organized Keyword Tag Clouds with Copy All buttons**
- [ ] **Step 4: Build `AudienceSentimentTab.jsx` for side-by-side Loved (Appreciated) vs. Hated (Criticized) comments with quotes and overall sentiment bar**
- [ ] **Step 5: Build `QuestionsTab.jsx` for Viewer FAQs and Creator Action Plan**
- [ ] **Step 6: Build `SettingsModal.jsx` for configuring/overriding API keys**
- [ ] **Step 7: Connect components in `App.jsx` with tabbed navigation and sample video triggers**

---

### Task 6: System Verification & Local Execution
- [ ] **Step 1: Start Express backend on port 5000**
- [ ] **Step 2: Start Vite frontend on port 3000**
- [ ] **Step 3: Perform live end-to-end test analyzing a YouTube video**
- [ ] **Step 4: Verify title/keyword generation and loved vs hated comment classification**
