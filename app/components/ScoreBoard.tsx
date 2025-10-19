import { Trophy, Target, Star } from "lucide-react";

interface ScoreBoardProps {
  score: number;
  streak: number;
  solvedCount: number;
}

interface ScoreBoardItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

function ScoreBoardItem({ icon, value, label }: ScoreBoardItemProps) {
  return (
    <div className="transform rounded-xl bg-white p-4 text-center shadow-xl transition-transform hover:scale-105">
      {icon}
      <p className="text-3xl font-bold text-blue-500">{value}</p>
      <p className="text-sm font-semibold text-gray-500">{label}</p>
    </div>
  );
}

export function ScoreBoard({ score, streak, solvedCount }: ScoreBoardProps) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <ScoreBoardItem
        icon={<Trophy className="mx-auto mb-2 text-yellow-500" size={32} />}
        value={score}
        label="Points"
      />
      <ScoreBoardItem
        icon={<Target className="mx-auto mb-2 text-blue-500" size={32} />}
        value={streak}
        label="Streak"
      />
      <ScoreBoardItem
        icon={<Star className="mx-auto mb-2 text-red-500" size={32} />}
        value={solvedCount}
        label="Solved"
      />
    </div>
  );
}
