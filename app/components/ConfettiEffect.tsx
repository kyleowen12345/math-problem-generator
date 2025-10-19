import { CONFETTI_ITEMS } from "@/lib/constants";

export function ConfettiEffect() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            fontSize: "24px",
          }}
        >
          {CONFETTI_ITEMS[Math.floor(Math.random() * CONFETTI_ITEMS.length)]}
        </div>
      ))}
    </div>
  );
}
