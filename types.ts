export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export type OzzyState = 'idle' | 'focusing' | 'happy' | 'sleeping' | 'levelup';

export interface InteractiveHabit {
  id: string;
  title: string;
  category: 'health' | 'work' | 'mind' | 'social';
  streak: number;
  completed: boolean;
}

export interface FocusSession {
  isActive: boolean;
  timeLeft: number;
  duration: number;
  sessionCount: number;
}

