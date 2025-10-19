import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="mb-6 flex animate-pulse gap-3 rounded-xl border-2 border-red-300 bg-red-100 p-4">
      <AlertCircle className="mt-0.5 flex-shrink-0 text-red-500" size={24} />
      <div>
        <p className="text-lg font-bold text-red-800">Oops!</p>
        <p className="text-red-500">{message}</p>
      </div>
    </div>
  );
}
