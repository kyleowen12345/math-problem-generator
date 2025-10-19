interface StreakMessageProps {
  message: string;
}

export function StreakMessage({ message }: StreakMessageProps) {
  if (!message) return null;

  return (
    <div className="mb-3 animate-bounce text-center sm:mb-4">
      <span className="drop-shadow-lg text-xl font-black text-white sm:text-2xl md:text-3xl">
        {message}
      </span>
    </div>
  );
}
