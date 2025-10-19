export const STREAK_THRESHOLDS = {
  FIRE: 5,
  AMAZING: 3,
  KEEP_GOING: 2,
} as const;

export const getStreakMessage = (streak: number): string => {
  if (streak >= STREAK_THRESHOLDS.FIRE) return "🔥 ON FIRE! 🔥";
  if (streak >= STREAK_THRESHOLDS.AMAZING) return "🌟 Amazing Streak!";
  if (streak >= STREAK_THRESHOLDS.KEEP_GOING) return "⚡ Keep Going!";
  return "";
};
