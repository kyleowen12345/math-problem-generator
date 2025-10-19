import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/lib";
import type { Difficulty } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const difficultyPrompts = {
  easy: {
    grade: "grades 1-2",
    operations: "addition and subtraction only",
    answerRange: "5 and 50",
    complexity: "1 operation",
  },
  medium: {
    grade: "grades 3-4",
    operations: "addition, subtraction, and multiplication",
    answerRange: "20 and 150",
    complexity: "1-2 operations",
  },
  hard: {
    grade: "grades 5-6",
    operations:
      "all four operations (addition, subtraction, multiplication, division)",
    answerRange: "50 and 500",
    complexity: "2-3 operations",
  },
};

async function generateMathProblem(difficulty: Difficulty = "easy"): Promise<{
  problem_text: string;
  correct_answer: number;
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const config = difficultyPrompts[difficulty];

  const prompt = `Generate a single math word problem for elementary school students (${config.grade}). 
The problem should:
- Be a realistic, relatable scenario
- Use ${config.operations}
- Require ${config.complexity}
- Have a whole number answer between ${config.answerRange}
- Be clear and unambiguous

Format your response EXACTLY as follows with no additional text:
PROBLEM: [The complete word problem]
ANSWER: [The numerical answer only]`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // Parse the response
  const problemMatch = responseText.match(/PROBLEM:\s*([\s\S]+?)ANSWER:/);
  const answerMatch = responseText.match(/ANSWER:\s*(\d+)/);

  if (!problemMatch || !answerMatch) {
    throw new Error("Failed to parse Gemini response");
  }

  const problem_text = problemMatch[1].trim();
  const correct_answer = parseInt(answerMatch[1], 10);

  return { problem_text, correct_answer };
}

export async function POST(request: NextRequest) {
  try {
    let difficulty: Difficulty = "easy";

    // Safely parse request body
    try {
      const body = await request.json();
      difficulty = body.difficulty || "easy";
    } catch (e) {
      // If body is empty or invalid, use default
      console.error("Using default difficulty: easy");
    }

    // Validate difficulty
    if (!["easy", "medium", "hard"].includes(difficulty)) {
      difficulty = "easy";
    }

    // Generate problem using Gemini with difficulty
    const problemData = await generateMathProblem(difficulty);

    // Save to Supabase (without difficulty)
    const { data: sessionData, error: dbError } = await supabase
      .from("math_problem_sessions")
      .insert({
        problem_text: problemData.problem_text,
        correct_answer: problemData.correct_answer,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save problem to database");
    }

    // Return the problem with session ID and difficulty
    return NextResponse.json({
      problem_text: sessionData.problem_text,
      final_answer: sessionData.correct_answer,
      session_id: sessionData.id,
      difficulty, // Include difficulty in response but not in DB
    });
  } catch (error) {
    console.error("Error in math problem generation:", error);
    return NextResponse.json(
      { error: "Failed to generate problem. Please try again." },
      { status: 500 }
    );
  }
}
