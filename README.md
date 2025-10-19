# Math Problem Generator - Developer Assessment Starter Kit

## Overview

This is a starter kit for building an AI-powered math problem generator application. The goal is to create a standalone prototype that uses AI to generate math word problems suitable for Primary 5 students, saves the problems and user submissions to a database, and provides personalized feedback.

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI Integration**: Google Generative AI (Gemini)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd math-problem-generator
```

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → API to find your:
   - Project URL (starts with `https://`)
   - Anon/Public Key

### 3. Set Up Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `database.sql`
3. Click "Run" to create the tables and policies

### 4. Get Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini

### 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and add your actual keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
   GOOGLE_API_KEY=your_actual_google_api_key
   ```

### 6. Install Dependencies

```bash
npm install
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Your Task

### 1. Implement Frontend Logic (`app/page.tsx`)

Complete the TODO sections in the main page component:

- **generateProblem**: Call your API route to generate a new math problem
- **submitAnswer**: Submit the user's answer and get feedback

### 2. Create Backend API Route (`app/api/math-problem/route.ts`)

Create a new API route that handles:

#### POST /api/math-problem (Generate Problem)

- Use Google's Gemini AI to generate a math word problem
- The AI should return JSON with:
  ```json
  {
    "problem_text": "A bakery sold 45 cupcakes...",
    "final_answer": 15
  }
  ```
- Save the problem to `math_problem_sessions` table
- Return the problem and session ID to the frontend

#### POST /api/math-problem/submit (Submit Answer)

- Receive the session ID and user's answer
- Check if the answer is correct
- Use AI to generate personalized feedback based on:
  - The original problem
  - The correct answer
  - The user's answer
  - Whether they got it right or wrong
- Save the submission to `math_problem_submissions` table
- Return the feedback and correctness to the frontend

### 3. Requirements Checklist

- [ ] AI generates appropriate Primary 5 level math problems
- [ ] Problems and answers are saved to Supabase
- [ ] User submissions are saved with feedback
- [ ] AI generates helpful, personalized feedback
- [ ] UI is clean and mobile-responsive
- [ ] Error handling for API failures
- [ ] Loading states during API calls

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add your environment variables in Vercel's project settings
4. Deploy!

## Assessment Submission

When submitting your assessment, provide:

1. **GitHub Repository URL**: Make sure it's public
2. **Live Demo URL**: Your Vercel deployment
3. **Supabase Credentials**: Add these to your README for testing:
   ```
   SUPABASE_URL: https://oezryhsxshgkahhgkinn.supabase.co
   SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lenJ5aHN4c2hna2FoaGdraW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MzAzOTYsImV4cCI6MjA3NjMwNjM5Nn0.YEsepjWdtLSbjBAWOksGXGAAmHPxuT9I_voB2zffEqk
   GOOGLE_API_KEY=AIzaSyAaw2r8K84QeL22ItL2HkTtla3Bw0u7-u0
   ```

## Implementation Notes

_Please fill in this section with any important notes about your implementation, design decisions, challenges faced, or features you're particularly proud of._

### My Implementation:

1. Professional Component Architecture
   Implemented a clean, scalable component structure following industry best practices:

Modular Design: 17+ separate component files organized in logical folders (components/, components/problem-states/, lib/, types/)
Barrel Exports: Created index files for each module, enabling clean imports (import { Header, ScoreBoard } from "@/app/components")
Single Responsibility: Each component has one clear purpose, making the codebase testable and maintainable
TypeScript Excellence: Full type safety with custom interfaces, no any types, proper type exports

File Structure:

app/
├── components/
│ ├── problem-states/ # State-specific components
│ ├── index.ts # Barrel export
│ └── [17 components] # Modular UI components
├── types/
│ ├── math.ts # Core type definitions
│ └── index.ts
└── page.tsx # Main container
lib/
├── audio.ts # Audio utilities
├── streak.ts # Game logic
└── constants.ts

2. Sound Effects System
   Integrated Web Audio API to generate dynamic sound effects for enhanced engagement:

Correct Answers: Ascending musical tones (C-E-G chord progression)
Incorrect Answers: Descending buzz for gentle feedback
Streak Milestones: Power-up sequence when hitting 5-problem streaks
Zero Latency: Sounds generated on-the-fly using browser's native audio context—no external files or loading delays
Graceful Degradation: Try-catch blocks ensure the app works smoothly even when audio isn't supported

Implementation: lib/audio.ts - Reusable utility function with typed sound effects 3. Difficulty Level System
Three-tier difficulty system with AI-powered problem generation:

Easy (Grades 1-2): Addition/subtraction, 1 operation, answers 5-50
Medium (Grades 3-4): Add/subtract/multiply, 1-2 operations, answers 20-150
Hard (Grades 5-6): All four operations, 2-3 operations, answers 50-500
Smart UI: Dropdown selector with color-coded options (green/yellow/red)
Auto-Generation: Changing difficulty immediately generates a new problem at that level
Visual Feedback: Emoji indicators and responsive design for mobile and desktop

Component: app/components/DifficultyDropdown.tsx with full accessibility support 4. Gamification Features
Comprehensive scoring and streak system to motivate young learners:

Points System: 10 points per correct answer
Streak Tracking: Consecutive correct answers with visual messages

2+ streak: "⚡ Keep Going!"
3+ streak: "🌟 Amazing Streak!"
5+ streak: "🔥 ON FIRE!" (with special sound effect)

Visual Celebrations: Confetti animation on correct answers
Error Feedback: Shake animation for incorrect answers
Score Dashboard: Trophy, target, and star icons showing points, streak, and total solved

5. User Experience Enhancements

Sound Toggle: User-friendly button to mute/unmute audio (top-right corner)
Keyboard Support: Press Enter to submit answers for faster interaction
Loading States: Smooth animations during API calls
Error Handling: Graceful error messages with retry options
Mobile Responsive: Fully optimized for all screen sizes
Accessibility: ARIA labels, semantic HTML, keyboard navigation

6. Session-Based Architecture

Session Tracking: Each problem gets a unique session ID for accurate feedback
Database Integration: Problems and submissions saved to Supabase
Context Preservation: Session IDs maintain problem-submission relationships
AI Feedback: Personalized responses based on user's specific answer

Design Decisions:
Component Architecture

Why Modular? Easier to test, maintain, and scale. Each component can be modified without affecting others.
Why Barrel Exports? Cleaner imports, better developer experience, easier refactoring.
Why TypeScript? Type safety prevents bugs, improves autocomplete, and serves as living documentation.

Sound System

No External Files: Programmatic generation keeps the app lightweight and eliminates loading delays
Web Audio API: Native browser support ensures compatibility and instant playback
Pleasant Frequencies: Carefully chosen tones that encourage rather than annoy

Difficulty Levels

Grade-Appropriate: Aligned with actual elementary school curriculum standards
Progressive Challenge: Smooth difficulty curve from simple to complex operations
Immediate Feedback: New problems generate instantly when difficulty changes

Gamification

Multi-Sensory: Visual (confetti, colors), audio (sounds), and textual (messages) feedback
Positive Reinforcement: Celebrates success while being encouraging on mistakes
Clear Progress: Dashboard shows tangible metrics kids can track

Challenges Faced:

1. Web Audio API Browser Support

Problem: Some browsers/contexts don't support Web Audio API
Solution: Wrapped all audio code in try-catch blocks for graceful degradation

2. Audio Context Permissions

Problem: Modern browsers require user interaction to enable audio
Solution: Audio initializes on first answer submission, triggering permission seamlessly

3. Component Organization

Problem: Original monolithic file was difficult to navigate and maintain
Solution: Split into 17+ focused components with clear responsibilities

4. AI Response Consistency

Problem: Gemini responses can vary in format
Solution: Robust parsing with regex matching and validation for problem/answer extraction

5. Mobile Responsiveness

Problem: Difficulty selector was too wide on mobile
Solution: Responsive design with w-full on mobile, sm:w-auto on desktop

Features I'm Proud Of:
🎯 Zero-Configuration Component Imports
typescript// Clean, professional imports
import { Header, ScoreBoard, StartState } from "@/app/components";
No more hunting through folders—everything organized and exported cleanly.
🎵 Instant Audio Feedback
Unlike loading audio files, programmatically generated sounds play instantly with zero network delay, creating immediate feedback that makes the experience feel snappier.
🏗️ Scalable Architecture
The component structure is production-ready. Adding new features (hints, history, leaderboards) is straightforward without refactoring.
♿ Accessibility First

ARIA labels on all interactive elements
Keyboard navigation (Enter to submit)
Sound toggle for sensory sensitivities
Semantic HTML structure

📱 Mobile-First Design
Every component tested and optimized for mobile. Touch-friendly buttons, responsive text sizes, proper spacing.
🎮 Streak Milestone Magic
When kids hit 5-problem streaks, the system automatically plays a special power-up sound and displays "🔥 ON FIRE!" message—creating a magical achievement moment.
🎨 Color Psychology

Green (Easy): Calming, encouraging for beginners
Yellow (Medium): Energetic, signals challenge
Red (Hard): Exciting, achievement-oriented for advanced learners

## Additional Features (Optional)

If you have time, consider adding:

- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Problem history view
- [ ] Score tracking
- [ ] Different problem types (addition, subtraction, multiplication, division)
- [ ] Hints system
- [ ] Step-by-step solution explanations

---

Good luck with your assessment! 🎯
