import { Sparkles } from "lucide-react";

interface StartStateProps {
  onStart: () => void;
}

export function StartState({ onStart }: StartStateProps) {
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
        className="mx-auto flex transform items-center gap-2 rounded-xl bg-blue-500 p-4 font-black text-xl text-white shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Sparkles size={24} />
        Start Adventure!
        <Sparkles size={24} />
      </button>
    </div>
  );
}
