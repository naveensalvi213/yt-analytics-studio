const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Call backend to analyze YouTube video metadata, generate titles, keywords, & comment analysis.
 */
export async function analyzeVideoApi({ videoUrl, youtubeApiKey, geminiApiKey }) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoUrl,
        youtubeApiKey: youtubeApiKey || undefined,
        geminiApiKey: geminiApiKey || undefined
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to analyze video.');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Retrieve saved API keys from browser localStorage.
 */
export function getStoredApiKeys() {
  try {
    const saved = localStorage.getItem('yt_analyzer_api_keys');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not read API keys from localStorage:', e);
  }
  return { youtubeApiKey: '', geminiApiKey: '' };
}

/**
 * Save API keys to browser localStorage.
 */
export function saveApiKeys({ youtubeApiKey, geminiApiKey }) {
  try {
    localStorage.setItem(
      'yt_analyzer_api_keys',
      JSON.stringify({ youtubeApiKey, geminiApiKey })
    );
  } catch (e) {
    console.warn('Could not save API keys to localStorage:', e);
  }
}
