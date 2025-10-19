import { Loader2, Zap } from "lucide-react";

export function LoadingState() {
  return (
    <div className="py-12 text-center">
      <div className="relative mx-auto mb-6 h-32 w-32">
        <Loader2
          className="absolute inset-0 m-auto animate-spin text-blue-500"
          size={64}
        />
        <Zap
          className="absolute inset-0 m-auto animate-ping text-yellow-400"
          size={32}
        />
      </div>
      <p className="text-xl font-bold text-gray-700">
        Creating your problem... 🎨
      </p>
    </div>
  );
}
