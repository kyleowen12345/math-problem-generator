import { RefreshCw } from "lucide-react";
import type { MathProblem } from "@/types/math";

interface ProblemDisplayProps {
  problem: MathProblem;
  onNewProblem: () => void;
  disabled: boolean;
}

export function ProblemDisplay({
  problem,
  onNewProblem,
  disabled,
}: ProblemDisplayProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:items-center">
        <h3 className="flex items-center gap-2 text-xl font-black text-blue-500 sm:text-2xl">
          <span className="text-2xl sm:text-3xl">📝</span> Your Challenge:
        </h3>
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
