import { Zap } from "lucide-react";

export function LoadingState() {
  return (
    <div className="py-12 text-center">
      <div className="relative mx-auto mb-6 h-32 w-32">
        <Zap
          className="absolute inset-0 m-auto animate-ping text-yellow-500"
          size={50}
        />
      </div>
      <p className="text-xl font-bold text-gray-700">
        Generating a fun math challenge for you...🎨
      </p>
    </div>
  );
}
