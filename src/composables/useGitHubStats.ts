import { ref } from 'vue';

// Define types for the GitHub data
export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubData {
  total: {
    lastYear: number;
    [key: string]: any;
  };
  contributions: ContributionDay[];
}

// Singleton state to share data across components
const heatmapData = ref<ContributionDay[]>([]);
const totalContributions = ref<number>(0);
const currentStreak = ref<number>(0);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

export function useGitHubStats() {
  
  async function fetchGitHubContributions(username: string = 'fabienstrauss') {
    // If we already have data, don't fetch again unless forced (caching strategy)
    if (heatmapData.value.length > 0) {
      return { heatmapData, totalContributions, currentStreak, isLoading, error };
    }

    isLoading.value = true;
    error.value = null;

    try {
      // Using GitHub's unofficial API endpoint for contribution data
      const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
      console.log('Fetching GitHub data from:', url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub data: ${response.status} ${response.statusText}`);
      }

      const data: GitHubData = await response.json();
      
      // Process Data
      let total = 0;
      if (typeof data.total === 'number') {
        total = data.total;
      } else if (data.total && typeof data.total.lastYear === 'number') {
        total = data.total.lastYear;
      }
      totalContributions.value = total;

      // Set heatmap data
      heatmapData.value = data.contributions.map((contribution: any) => ({
        date: contribution.date,
        count: contribution.count || 0,
        level: contribution.level || 0
      }));

      // Calculate current streak
      let streak = 0;
      // Reverse iterate from the end (today)
      // Note: The API usually returns data ending today or yesterday. 
      // We check from the last entry backwards.
      const reversedContribs = [...heatmapData.value].reverse();
      
      // Find the index of "today" or the last valid entry
      // Sometimes the last entry might be "tomorrow" in some timezones or today with 0 if morning.
      // We just iterate backwards.
      for (const day of reversedContribs) {
        if (day.count > 0) {
          streak++;
        } else {
          // If it's the very first checked day (today) and it's 0, it might just be early morning.
          // But technically streak is broken or not started for today.
          // Common streak logic often allows "today 0" if "yesterday > 0".
          // For simplicity here: strict streak.
           if (streak > 0) break; // End of streak
        }
      }
      currentStreak.value = streak;

    } catch (err: any) {
      console.error('Error fetching GitHub contributions:', err);
      error.value = err.message || 'Unknown error';
      // Use fallback data on error
      const fallback = getFallbackData();
      heatmapData.value = fallback.contributions;
      totalContributions.value = fallback.total;
      currentStreak.value = 0;
    } finally {
      isLoading.value = false;
    }

    return { heatmapData, totalContributions, currentStreak, isLoading, error };
  }

  function getFallbackData() {
    // Fallback data based on typical GitHub activity
    const contributions: ContributionDay[] = [];
    const today = new Date();
    const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    // Generate 365 days of fallback data
    for (let i = 0; i < 365; i++) {
      const date = new Date(yearAgo);
      date.setDate(date.getDate() + i);

      // Create realistic pattern - more activity on weekdays, some random variation
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseActivity = isWeekend ? Math.random() * 2 : Math.random() * 8;
      const count = Math.floor(baseActivity);

      contributions.push({
        date: date.toISOString().split('T')[0],
        count: count,
        level: count > 0 ? 1 : 0 // Simplified level
      });
    }

    const total = contributions.reduce((sum, day) => sum + day.count, 0);

    return {
      total: total,
      contributions: contributions
    };
  }

  return {
    heatmapData,
    totalContributions,
    currentStreak,
    isLoading,
    error,
    fetchGitHubContributions
  };
}
