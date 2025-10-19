"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

interface MathProblem {
  problem_text: string;
  final_answer: number;
  session_id: string;
}

interface SubmissionResult {
  is_correct: boolean;
  feedback: string;
  correct_answer: number;
}

const CONFETTI_ITEMS = ["🎉", "🎊", "⭐", "✨", "🌟"];
const STREAK_THRESHOLDS = {
  FIRE: 5,
  AMAZING: 3,
  KEEP_GOING: 2,
};

export default function Home() {
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const generateProblem = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setUserAnswer("");

    try {
      const response = await fetch("/api/math-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to generate problem");
      const data = await response.json();
      setProblem(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      console.error("Error generating problem:", err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!problem || !userAnswer.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/math-problem/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: problem.session_id,
          user_answer: parseFloat(userAnswer),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit answer");
      const data = await response.json();
      setResult(data);

      if (data.is_correct) {
        setScore((prev) => prev + 10);
        setStreak((prev) => prev + 1);
        setShowConfetti(true);
      } else {
        setStreak(0);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      console.error("Error submitting answer:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewProblem = () => {
    setProblem(null);
    setUserAnswer("");
    setResult(null);
    setError(null);
    generateProblem();
  };

  const getStreakMessage = () => {
    if (streak >= STREAK_THRESHOLDS.FIRE) return "🔥 ON FIRE! 🔥";
    if (streak >= STREAK_THRESHOLDS.AMAZING) return "🌟 Amazing Streak!";
    if (streak >= STREAK_THRESHOLDS.KEEP_GOING) return "⚡ Keep Going!";
    return "";
  };

  const solvedCount = Math.floor(score / 10);

  return (
    <div className="relative min-h-screen overflow-hidden bg-blue-400 px-4 py-8">
      {/* Animated Background */}
      <BackgroundDecorations />

      {/* Confetti */}
      {showConfetti && <ConfettiEffect />}

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <Header />

        {/* Score Board */}
        <ScoreBoard score={score} streak={streak} solvedCount={solvedCount} />

        {/* Streak Message */}
        {streak > 1 && <StreakMessage message={getStreakMessage()} />}

        {/* Main Card */}
        <MainCard
          problem={problem}
          loading={loading}
          error={error}
          submitting={submitting}
          userAnswer={userAnswer}
          result={result}
          shake={shake}
          onGenerateProblem={generateProblem}
          onSubmitAnswer={submitAnswer}
          onNewProblem={handleNewProblem}
          onUserAnswerChange={setUserAnswer}
        />

        {/* Tips Footer */}
        <TipsCard />
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

// Component: Background Decorations
function BackgroundDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-10 top-20 animate-bounce text-6xl opacity-20">
        🎈
      </div>
      <div className="absolute right-20 top-40 animate-pulse text-5xl opacity-20">
        ⭐
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce text-6xl opacity-20">
        🎨
      </div>
      <div className="absolute bottom-40 right-10 animate-pulse text-5xl opacity-20">
        ✨
      </div>
    </div>
  );
}

// Component: Confetti Effect
function ConfettiEffect() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            fontSize: "24px",
          }}
        >
          {CONFETTI_ITEMS[Math.floor(Math.random() * CONFETTI_ITEMS.length)]}
        </div>
      ))}
    </div>
  );
}

// Component: Header
function Header() {
  return (
    <div className="mb-4 text-center sm:mb-6">
      <div className="mb-3 inline-block transform rounded-xl bg-white px-4 py-3 shadow-lg transition-transform hover:scale-105 sm:mb-4 sm:px-8 sm:py-4">
        <h1 className="bg-blue-500 bg-clip-text text-3xl font-black text-transparent sm:text-4xl md:text-5xl">
          MATH ADVENTURE!
        </h1>
      </div>
      <p className="drop-shadow-lg px-4 text-base font-bold text-white sm:text-lg md:text-xl">
        Solve problems and become a Math Champion!
      </p>
    </div>
  );
}

// Component: Score Board
interface ScoreBoardProps {
  score: number;
  streak: number;
  solvedCount: number;
}

function ScoreBoard({ score, streak, solvedCount }: ScoreBoardProps) {
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

// Component: Streak Message
interface StreakMessageProps {
  message: string;
}

function StreakMessage({ message }: StreakMessageProps) {
  return (
    <div className="mb-3 animate-bounce text-center sm:mb-4">
      <span className="drop-shadow-lg text-xl font-black text-white sm:text-2xl md:text-3xl">
        {message}
      </span>
    </div>
  );
}

// Component: Tips Card
function TipsCard() {
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-xl">
      <p className="text-lg text-gray-700">
        <span className="text-2xl font-black text-yellow-500">💡 Pro Tip:</span>{" "}
        <span className="font-semibold">
          Read carefully, think it through, and have fun learning! 🌈
        </span>
      </p>
    </div>
  );
}

// Component: Main Card
interface MainCardProps {
  problem: MathProblem | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
  userAnswer: string;
  result: SubmissionResult | null;
  shake: boolean;
  onGenerateProblem: () => void;
  onSubmitAnswer: () => void;
  onNewProblem: () => void;
  onUserAnswerChange: (value: string) => void;
}

function MainCard({
  problem,
  loading,
  error,
  submitting,
  userAnswer,
  result,
  shake,
  onGenerateProblem,
  onSubmitAnswer,
  onNewProblem,
  onUserAnswerChange,
}: MainCardProps) {
  return (
    <div
      className={`mb-6 transform rounded-xl bg-white p-4 shadow-2xl transition-all md:p-8 ${
        shake ? "animate-shake" : ""
      }`}
    >
      {/* Error State */}
      {error && <ErrorAlert message={error} />}

      {/* Start State */}
      {!problem && !loading && <StartState onStart={onGenerateProblem} />}

      {/* Loading State */}
      {loading && <LoadingState />}

      {/* Problem State */}
      {problem && !loading && (
        <ProblemState
          problem={problem}
          userAnswer={userAnswer}
          result={result}
          submitting={submitting}
          onUserAnswerChange={onUserAnswerChange}
          onSubmitAnswer={onSubmitAnswer}
          onNewProblem={onNewProblem}
        />
      )}
    </div>
  );
}

// Sub-component: Error Alert
interface ErrorAlertProps {
  message: string;
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-6 flex animate-pulse gap-3 rounded-xl border-2 border-red-300 bg-red-100 p-4">
      <AlertCircle className="mt-0.5 flex-shrink-0 text-red-500" size={24} />
      <div>
        <p className="text-lg font-bold text-red-800">Oops!</p>
        <p className="text-red-500">{message}</p>
      </div>
    </div>
  );
}

// Sub-component: Start State
interface StartStateProps {
  onStart: () => void;
}

function StartState({ onStart }: StartStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-6 flex h-32 w-32 animate-pulse items-center justify-center rounded-full bg-blue-400 shadow-xl">
        <span className="text-7xl">🎯</span>
      </div>
      <h2 className="mb-3 text-3xl font-black text-blue-500">
        Ready for a Math Challenge?
      </h2>
      <p className="mb-6 text-lg text-gray-500">
        {"Let's solve some awesome problems together! 💪"}
      </p>
      <button
        onClick={onStart}
        className="mx-auto flex transform items-center gap-2 rounded-xl bg-blue-500 px-12 py-4 font-black text-xl text-white shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Sparkles size={24} />
        Start Adventure!
        <Sparkles size={24} />
      </button>
    </div>
  );
}

// Sub-component: Loading State
function LoadingState() {
  return (
    <div className="py-12 text-center">
      <div className="relative mx-auto mb-6 h-32 w-32">
        <Loader2
          className="absolute inset-0 m-auto animate-spin text-blue-500"
          size={64}
        />
        <Zap
          className="absolute inset-0 m-auto animate-ping text-yellow-400"
          size={32}
        />
      </div>
      <p className="text-xl font-bold text-gray-700">
        Creating your problem... 🎨
      </p>
    </div>
  );
}

// Sub-component: Problem State
interface ProblemStateProps {
  problem: MathProblem;
  userAnswer: string;
  result: SubmissionResult | null;
  submitting: boolean;
  onUserAnswerChange: (value: string) => void;
  onSubmitAnswer: () => void;
  onNewProblem: () => void;
}

function ProblemState({
  problem,
  userAnswer,
  result,
  submitting,
  onUserAnswerChange,
  onSubmitAnswer,
  onNewProblem,
}: ProblemStateProps) {
  return (
    <div>
      {/* Problem Header */}
      <div className="mb-4 sm:mb-6">
        <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:mb-4 sm:flex-row sm:items-center">
          <h3 className="flex items-center gap-2 text-xl font-black text-blue-500 sm:text-2xl">
            <span className="text-2xl sm:text-3xl">📝</span> Your Challenge:
          </h3>
          <NewProblemButton onClick={onNewProblem} disabled={submitting} />
        </div>
        <div className="rounded-xl border-l-4 bg-blue-50 p-4 shadow-lg sm:border-l-8 sm:p-6 md:p-8">
          <p className="text-base font-medium leading-relaxed text-gray-800 sm:text-lg md:text-xl">
            {problem.problem_text}
          </p>
        </div>
      </div>

      {/* Answer Input */}
      {!result && (
        <AnswerInput
          userAnswer={userAnswer}
          submitting={submitting}
          onUserAnswerChange={onUserAnswerChange}
          onSubmitAnswer={onSubmitAnswer}
        />
      )}

      {/* Result */}
      {result && <ResultDisplay result={result} onNewProblem={onNewProblem} />}
    </div>
  );
}

// Sub-component: New Problem Button
interface NewProblemButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function NewProblemButton({ onClick, disabled }: NewProblemButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-xl bg-blue-100 px-3 py-1.5 text-base font-bold text-blue-500 transition-transform hover:scale-105 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-lg"
    >
      <RefreshCw size={18} />
      New Problem
    </button>
  );
}

// Sub-component: Answer Input
interface AnswerInputProps {
  userAnswer: string;
  submitting: boolean;
  onUserAnswerChange: (value: string) => void;
  onSubmitAnswer: () => void;
}

function AnswerInput({
  userAnswer,
  submitting,
  onUserAnswerChange,
  onSubmitAnswer,
}: AnswerInputProps) {
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
          onKeyPress={(e) => e.key === "Enter" && onSubmitAnswer()}
          placeholder="Type your answer here..."
          disabled={submitting}
          className="flex-1 rounded-xl border-4 border-blue-300 p-4 text-lg font-bold text-black outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-gray-100 md:text-xl"
        />
        <SubmitButton
          submitting={submitting}
          disabled={!userAnswer.trim()}
          onClick={onSubmitAnswer}
        />
      </div>
    </div>
  );
}

// Sub-component: Submit Button
interface SubmitButtonProps {
  submitting: boolean;
  disabled: boolean;
  onClick: () => void;
}

function SubmitButton({ submitting, disabled, onClick }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || submitting}
      className="flex transform items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-4 font-black text-lg text-white shadow-lg transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:transform-none md:text-xl disabled:bg-gray-400"
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
  );
}

// Sub-component: Result Display
interface ResultDisplayProps {
  result: SubmissionResult;
  onNewProblem: () => void;
}

function ResultDisplay({ result, onNewProblem }: ResultDisplayProps) {
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
        className="mx-auto flex transform items-center gap-2 rounded-xl bg-blue-500 px-12 py-4 font-black text-xl text-white shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Sparkles size={28} />
        Next Challenge!
        <Sparkles size={28} />
      </button>
    </div>
  );
}
