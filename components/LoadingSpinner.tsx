// components/LoadingSpinner.tsx
'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
}