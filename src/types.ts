/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  category: 'Faith' | 'Marriage' | 'Youth' | 'Healing' | 'Leadership' | 'Prayer' | 'Family' | 'Business' | 'Missions';
  series: string;
  description: string;
  youtubeUrl: string;
  summary: string;
  keyPoints: string[];
  bibleReferences: string[];
  discussionQuestions: string[];
  prayer: string;
  reflection: string;
  transcript: string;
  audioUrl?: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  text: string;
  category: 'Urgent' | 'Health' | 'Family' | 'Employment' | 'Marriage' | 'Youth' | 'Financial';
  date: string;
  prayedCount: number;
  isPraiseReport?: boolean;
  aiFollowUp?: {
    message: string;
    verse: string;
    communitySummary: string;
    generatedAt: string;
  };
}

export interface ContinueWatching {
  sermonId: string;
  progressPercent: number; // e.g., 45% watched
  lastWatchedAt: string;
}

export interface UserPreferences {
  explicitInterests: string[];
  viewingHistory: string[]; // List of sermonIds watched or clicked
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  leader: string;
  image: string;
  schedule: string;
  category: string;
  leadersInfo: {
    name: string;
    role: string;
    image: string;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  ageGroup: string;
  volunteerRole?: string;
  image: string;
}

export interface Testimony {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Devotional Intel' | 'Faith & Leadership' | 'Kingdom Business' | 'Family & Culture' | 'Global Intercession' | 'Mind & Wellness';
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: string;
  heroImage: string;
  imageCaption: string;
  isEditorialPick?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  excerpt: string;
  content: {
    openingDropCap: string;
    openingText: string;
    paragraphs: string[];
    subsections: {
      title: string;
      content: string;
    }[];
    pullQuote?: {
      quote: string;
      reference: string;
    };
    takeaways: string[];
    prayer: string;
  };
  relatedIds: string[];
}
