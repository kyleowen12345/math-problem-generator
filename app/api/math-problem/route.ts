import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/lib";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

async function generateMathProblem(): Promise<{
  problem_text: string;
  correct_answer: number;
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Generate a single math word problem for elementary school students (grades 3-5). 
The problem should:
- Be a realistic, relatable scenario
- Require 1-3 mathematical operations
- Have a whole number answer between 10 and 200
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
    // Generate problem using Gemini
    const problemData = await generateMathProblem();

    // Save to Supabase
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

    // Return the problem with session ID
    return NextResponse.json({
      problem_text: sessionData.problem_text,
      final_answer: sessionData.correct_answer,
      session_id: sessionData.id,
    });
  } catch (error) {
    console.error("Error in math problem generation:", error);
    return NextResponse.json(
      { error: "Failed to generate problem. Please try again." },
      { status: 500 }
    );
  }
}
