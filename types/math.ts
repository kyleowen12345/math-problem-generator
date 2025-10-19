export interface MathProblem {
  problem_text: string;
  final_answer: number;
  session_id: string;
}

export interface SubmissionResult {
  is_correct: boolean;
  feedback: string;
  correct_answer: number;
}
