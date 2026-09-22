import fetch from 'node-fetch';

/**
 * Decode HTML entities like &#39;, &quot;, &amp;, &lt;, &gt;
 */
export function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

/**
 * Extract 11-character YouTube Video ID from various URL formats or raw string.
 */
export function extractVideoId(input) {
  if (!input) return null;
  const trimmed = input.trim();
  
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

function parseIsoDuration(duration) {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0, 10);
  const minutes = parseInt(match[2] || 0, 10);
  const seconds = parseInt(match[3] || 0, 10);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Fetch detailed metadata for a single YouTube video by video ID.
 */
export async function fetchSingleVideoDetails(videoId, apiKey) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(`YouTube API Error: ${data.error.message || JSON.stringify(data.error)}`);
    }

    if (!data.items || data.items.length === 0) {
      throw new Error(`No video found with ID "${videoId}". Please check the Video URL or ID.`);
    }

    const video = data.items[0];
    const snippet = video.snippet || {};
    const stats = video.statistics || {};
    const thumbnails = snippet.thumbnails || {};

    const thumbnailUrl = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url;

    return {
      id: video.id,
      title: decodeHtmlEntities(snippet.title || 'Untitled Video'),
      description: decodeHtmlEntities(snippet.description || ''),
      channelTitle: decodeHtmlEntities(snippet.channelTitle || 'Unknown Channel'),
      channelId: snippet.channelId || '',
      publishedAt: snippet.publishedAt || '',
      tags: (snippet.tags || []).map(t => decodeHtmlEntities(t)),
      thumbnailUrl: thumbnailUrl || '',
      viewCount: parseInt(stats.viewCount || '0', 10).toLocaleString(),
      likeCount: parseInt(stats.likeCount || '0', 10).toLocaleString(),
      commentCount: parseInt(stats.commentCount || '0', 10).toLocaleString(),
      rawViewCount: stats.viewCount || '0',
      rawLikeCount: stats.likeCount || '0',
      rawCommentCount: stats.commentCount || '0',
      duration: video.contentDetails?.duration || ''
    };
  } catch (error) {
    console.error(`[YouTube API] Error fetching video details for ${videoId}:`, error.message);
    throw error;
  }
}

/**
 * Fetch top comments from a YouTube video for audience sentiment & review analysis.
 */
export async function fetchVideoComments(videoId, apiKey, maxComments = 100) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=${Math.min(maxComments, 100)}&order=relevance&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.warn(`[YouTube API] Comment threads warning for ${videoId}:`, data.error.message);
      return [];
    }

    if (!data.items) return [];

    return data.items.map(item => {
      const comment = item.snippet?.topLevelComment?.snippet || {};
      const cleanText = (comment.textDisplay || '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .trim();

      return {
        author: decodeHtmlEntities(comment.authorDisplayName || 'Anonymous Viewer'),
        text: decodeHtmlEntities(cleanText),
        likeCount: comment.likeCount || 0,
        publishedAt: comment.publishedAt || ''
      };
    }).filter(c => c.text.length > 0);
  } catch (error) {
    console.error(`[YouTube API] Error fetching comments for ${videoId}:`, error.message);
    return [];
  }
}

export async function searchTopLongformVideos(queryTitle, apiKey, maxResults = 10, excludeVideoId = null) {
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(queryTitle)}&type=video&maxResults=20&key=${apiKey}`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    const videoIds = data.items
      .map(item => item.id?.videoId)
      .filter(id => Boolean(id) && id !== excludeVideoId);

    if (videoIds.length === 0) return [];

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${apiKey}`;
    const detailsResp = await fetch(detailsUrl);
    const detailsData = await detailsResp.json();

    if (!detailsData.items) return [];

    const longformVideos = detailsData.items.filter(item => {
      const seconds = parseIsoDuration(item.contentDetails?.duration);
      return seconds > 60;
    }).slice(0, maxResults);

    return longformVideos.map(video => {
      const snippet = video.snippet || {};
      const thumbnails = snippet.thumbnails || {};
      const thumbnailUrl = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url;

      return {
        id: video.id,
        title: decodeHtmlEntities(snippet.title || ''),
        channelTitle: decodeHtmlEntities(snippet.channelTitle || ''),
        channelId: snippet.channelId || '',
        thumbnailUrl: thumbnailUrl || '',
        viewCount: parseInt(video.statistics?.viewCount || '0', 10).toLocaleString(),
        likeCount: parseInt(video.statistics?.likeCount || '0', 10).toLocaleString(),
        commentCount: parseInt(video.statistics?.commentCount || '0', 10).toLocaleString(),
        rawViewCount: video.statistics?.viewCount || '0',
        publishedAt: snippet.publishedAt || ''
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube API competitor videos:', error.message);
    return [];
  }
}
