export type Difficulty = "easy" | "medium" | "hard";

export interface MathProblem {
  problem_text: string;
  final_answer: number;
  session_id: string;
  difficulty?: Difficulty;
}

export interface SubmissionResult {
  is_correct: boolean;
  feedback: string;
  correct_answer: number;
}
