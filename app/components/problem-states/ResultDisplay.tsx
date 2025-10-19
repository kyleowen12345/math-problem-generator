import { Sparkles } from "lucide-react";
import type { SubmissionResult } from "@/types/math";

interface ResultDisplayProps {
  result: SubmissionResult;
  onNewProblem: () => void;
}

export function ResultDisplay({ result, onNewProblem }: ResultDisplayProps) {
  const isCorrect = result.is_correct;

  return (
    <div className="space-y-4">
      <div
        className={`transform rounded-xl border-4 px-4 py-8 transition-all md:p-8 ${
          isCorrect
            ? "border-green-400 bg-green-50"
            : "border-yellow-400 bg-yellow-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className={isCorrect ? "animate-bounce text-6xl" : "text-6xl"}>
            {isCorrect ? "🎉" : "🤔"}
          </div>
          <div className="flex-1">
            <h4
              className={`mb-3 text-3xl font-black ${
                isCorrect ? "text-green-700" : "text-yellow-700"
              }`}
            >
              {isCorrect
                ? "AWESOME! You got it! 🎊"
                : "Good Try! Keep Going! 💪"}
            </h4>
            <p className="mb-3 text-lg font-medium leading-relaxed text-gray-800">
              {result.feedback}
            </p>
            {!isCorrect && (
              <div className="mt-4 rounded-xl border-2 border-yellow-300 bg-white p-4">
                <p className="text-lg text-gray-700">
                  <span className="font-black text-yellow-500">
                    🎯 Correct answer:
                  </span>{" "}
                  <span className="text-2xl font-black text-yellow-700">
                    {result.correct_answer}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onNewProblem}
        className="mx-auto flex w-full transform items-center justify-center gap-5 rounded-xl bg-blue-500 p-4 font-black text-xl text-white shadow-lg transition-all duration-200 hover:scale-105"
        aria-label="Get next challenge"
      >
        <Sparkles size={28} />
        Next Challenge!
        <Sparkles size={28} />
      </button>
    </div>
  );
}
