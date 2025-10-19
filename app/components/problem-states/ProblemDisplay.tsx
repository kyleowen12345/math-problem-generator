import { RefreshCw } from "lucide-react";
import type { MathProblem } from "@/types";

interface ProblemDisplayProps {
  problem: MathProblem;
  onNewProblem: () => void;
  disabled: boolean;
}

const difficultyEmoji = {
  easy: "🌱",
  medium: "⚡",
  hard: "🔥",
};

const difficultyColors = {
  easy: "bg-green-100 text-green-700 border-green-300",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  hard: "bg-red-100 text-red-700 border-red-300",
};

export function ProblemDisplay({
  problem,
  onNewProblem,
  disabled,
}: ProblemDisplayProps) {
  const difficulty = problem.difficulty || "easy";

  return (
    <div className="mb-4 sm:mb-6">
      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:items-center">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <h3 className="flex items-center gap-2 text-xl font-black text-blue-500 sm:text-2xl">
            <span className="text-2xl sm:text-3xl">📝</span> Your Challenge:
          </h3>
          {problem.difficulty && (
            <span
              className={`inline-flex items-center gap-1 rounded-full border-2 px-3 py-1 text-sm font-bold w-fit ${difficultyColors[difficulty]}`}
            >
              <span>{difficultyEmoji[difficulty]}</span>
              <span className="capitalize">{difficulty}</span>
            </span>
          )}
        </div>
        <button
          onClick={onNewProblem}
          disabled={disabled}
          className="flex items-center gap-2 rounded-xl bg-blue-100 px-3 py-1.5 text-base font-bold text-blue-500 transition-transform hover:scale-105 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-lg"
          aria-label="Generate new problem"
        >
          <RefreshCw size={18} />
          <span className="hidden md:block">New Problem</span>
        </button>
      </div>
      <div className="rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4 shadow-lg sm:border-l-8 sm:p-6 md:p-8">
        <p className="text-base font-medium leading-relaxed text-gray-800 sm:text-lg md:text-xl">
          {problem.problem_text}
        </p>
      </div>
    </div>
  );
}
