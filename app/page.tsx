"use client";

import { useEffect, useState } from "react";

// Components
import {
  BackgroundDecorations,
  ConfettiEffect,
  SoundToggle,
  Header,
  ScoreBoard,
  StreakMessage,
  TipsCard,
  ErrorAlert,
  StartState,
  LoadingState,
  ProblemDisplay,
  AnswerInput,
  ResultDisplay,
} from "@/app/components";

// Types & Utils
import type { MathProblem, SubmissionResult } from "@/types";
import { playSoundEffect, getStreakMessage, STREAK_THRESHOLDS } from "@/lib";

export default function MathAdventure() {
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
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  useEffect(() => {
    if (!shake) return;
    const timer = setTimeout(() => setShake(false), 500);
    return () => clearTimeout(timer);
  }, [shake]);

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
        const newStreak = streak + 1;
        setStreak(newStreak);
        setShowConfetti(true);
        if (soundEnabled) {
          if (newStreak >= STREAK_THRESHOLDS.FIRE) {
            playSoundEffect("levelup");
          } else {
            playSoundEffect("success");
          }
        }
      } else {
        setStreak(0);
        setShake(true);
        if (soundEnabled) playSoundEffect("error");
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

  const solvedCount = Math.floor(score / 10);
  const streakMessage = getStreakMessage(streak);

  return (
    <div className="relative min-h-screen overflow-hidden bg-blue-400 p-8 px-4">
      <BackgroundDecorations />
      {showConfetti && <ConfettiEffect />}

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-4 flex justify-end">
          <SoundToggle
            enabled={soundEnabled}
            onToggle={() => setSoundEnabled(!soundEnabled)}
          />
        </div>

        <Header />
        <ScoreBoard score={score} streak={streak} solvedCount={solvedCount} />
        <StreakMessage message={streakMessage} />

        <div
          className={`mb-6 transform rounded-xl bg-white p-4 shadow-2xl transition-all md:p-8 ${
            shake ? "animate-shake" : ""
          }`}
        >
          {error && <ErrorAlert message={error} />}
          {!problem && !loading && <StartState onStart={generateProblem} />}
          {loading && <LoadingState />}
          {problem && !loading && (
            <>
              <ProblemDisplay
                problem={problem}
                onNewProblem={handleNewProblem}
                disabled={submitting}
              />
              {!result && (
                <AnswerInput
                  userAnswer={userAnswer}
                  submitting={submitting}
                  onUserAnswerChange={setUserAnswer}
                  onSubmitAnswer={submitAnswer}
                />
              )}
              {result && (
                <ResultDisplay
                  result={result}
                  onNewProblem={handleNewProblem}
                />
              )}
            </>
          )}
        </div>

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
