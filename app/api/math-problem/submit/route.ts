import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/lib";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

async function generateFeedback(
  problem_text: string,
  user_answer: number,
  correct_answer: number,
  isCorrect: boolean
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const resultStatus = isCorrect ? "CORRECT" : "INCORRECT";
  const prompt = `You are an encouraging elementary school math tutor. 
A student answered a math problem and got it ${resultStatus}.

Problem: ${problem_text}
Student's answer: ${user_answer}
Correct answer: ${correct_answer}

${
  isCorrect
    ? "Write a short, encouraging message (2-3 sentences) praising their correct answer and effort. Include an emoji!"
    : "Write a short, encouraging message (2-3 sentences) that tells them the correct answer, explains it briefly, and encourages them to try again without making them feel bad. Include an emoji!"
}

Keep the tone warm, supportive, and age-appropriate for elementary school students.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, user_answer } = body;

    if (!session_id || user_answer === undefined || user_answer === null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the original problem from the database
    const { data: dbData, error: fetchError } = await supabase
      .from("math_problem_sessions")
      .select("*")
      .eq("id", session_id)
      .single();

    if (fetchError || !dbData) {
      return NextResponse.json(
        { error: "Problem session not found" },
        { status: 404 }
      );
    }

    const sessionData = dbData;
    const isCorrect = Math.abs(user_answer - sessionData.correct_answer) < 0.01;

    // Generate AI feedback
    const feedback = await generateFeedback(
      sessionData.problem_text,
      user_answer,
      sessionData.correct_answer,
      isCorrect
    );

    // Save submission to database
    const { error: insertError } = await supabase
      .from("math_problem_submissions")
      .insert({
        session_id: session_id,
        user_answer: user_answer,
        is_correct: isCorrect,
        feedback_text: feedback,
      });

    if (insertError) {
      console.error("Error saving submission:", insertError);
      throw new Error("Failed to save submission");
    }

    // Return result
    return NextResponse.json({
      is_correct: isCorrect,
      feedback: feedback,
      correct_answer: sessionData.correct_answer,
    });
  } catch (error) {
    console.error("Error in answer submission:", error);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 }
    );
  }
}
