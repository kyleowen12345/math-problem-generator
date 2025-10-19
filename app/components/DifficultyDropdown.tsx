import { ChevronDown } from "lucide-react";
import type { Difficulty } from "@/types";

interface DifficultyDropdownProps {
  selected: Difficulty;
  onChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const difficultyOptions = {
  easy: {
    label: "Easy",
    emoji: "🌱",
    description: "Grades 1-2",
    color: "text-green-600",
  },
  medium: {
    label: "Medium",
    emoji: "⚡",
    description: "Grades 3-4",
    color: "text-yellow-600",
  },
  hard: {
    label: "Hard",
    emoji: "🔥",
    description: "Grades 5-6",
    color: "text-red-600",
  },
};

export function DifficultyDropdown({
  selected,
  onChange,
  disabled = false,
}: DifficultyDropdownProps) {
  const selectedOption = difficultyOptions[selected];

  return (
    <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-3">
      <label className="flex items-center gap-2 text-lg font-black text-white">
        <span className="text-xl">🎯</span>
        <span className="inline">Difficulty:</span>
      </label>
      <div className="relative w-full sm:w-auto">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value as Difficulty)}
          disabled={disabled}
          className={`
            w-full appearance-none rounded-xl bg-white px-6 py-3 pr-12 text-base font-bold shadow-lg
            transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200
            sm:w-auto sm:text-lg
            ${selectedOption.color}
            ${
              disabled
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:scale-105"
            }
          `}
          aria-label="Select difficulty level"
        >
          {(Object.keys(difficultyOptions) as Difficulty[]).map((diff) => (
            <option key={diff} value={diff}>
              {difficultyOptions[diff].emoji} {difficultyOptions[diff].label} -{" "}
              {difficultyOptions[diff].description}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 ${selectedOption.color}`}
          size={20}
        />
      </div>
    </div>
  );
}
