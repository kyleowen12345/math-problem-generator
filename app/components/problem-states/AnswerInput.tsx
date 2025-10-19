import { CheckCircle2, Loader2 } from "lucide-react";

interface AnswerInputProps {
  userAnswer: string;
  submitting: boolean;
  onUserAnswerChange: (value: string) => void;
  onSubmitAnswer: () => void;
}

export function AnswerInput({
  userAnswer,
  submitting,
  onUserAnswerChange,
  onSubmitAnswer,
}: AnswerInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userAnswer.trim() && !submitting) {
      onSubmitAnswer();
    }
  };

  return (
    <div className="mb-6">
      <label className="mb-3 flex items-center gap-2 text-xl font-black text-blue-500">
        <span className="text-2xl">💡</span> Your Answer:
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => onUserAnswerChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your answer here..."
          disabled={submitting}
          className="w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-lg font-semibold text-gray-900 placeholder-gray-400 transition-all duration-300 hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-50"
          aria-label="Your answer"
        />
        <button
          onClick={onSubmitAnswer}
          disabled={!userAnswer.trim() || submitting}
          className="flex transform items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-4 font-black text-lg text-white shadow-lg transition-all duration-200 hover:scale-105 disabled:transform-none disabled:cursor-not-allowed disabled:bg-gray-400 md:text-xl"
          aria-label="Submit answer"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Checking...
            </>
          ) : (
            <>
              <CheckCircle2 size={24} />
              Submit!
            </>
          )}
        </button>
      </div>
    </div>
  );
}
