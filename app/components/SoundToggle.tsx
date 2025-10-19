import { Volume2, VolumeX } from "lucide-react";

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-bold text-blue-500 shadow-lg transition-transform hover:scale-105"
      aria-label={enabled ? "Disable sound" : "Enable sound"}
    >
      {enabled ? (
        <>
          <Volume2 size={20} />
          <span className="hidden sm:inline">Sound ON</span>
        </>
      ) : (
        <>
          <VolumeX size={20} />
          <span className="hidden sm:inline">Sound OFF</span>
        </>
      )}
    </button>
  );
}
