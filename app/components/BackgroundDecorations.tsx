export function BackgroundDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-10 top-20 animate-bounce text-6xl opacity-20">
        🎈
      </div>
      <div className="absolute right-20 top-40 animate-pulse text-5xl opacity-20">
        ⭐
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce text-6xl opacity-20">
        🎨
      </div>
      <div className="absolute bottom-40 right-10 animate-pulse text-5xl opacity-20">
        ✨
      </div>
    </div>
  );
}
