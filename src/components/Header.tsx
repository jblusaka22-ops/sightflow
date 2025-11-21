import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 text-white shadow-xl animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
            <TrendingUp size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">SightFlow</h1>
            <p className="text-cyan-50 text-sm sm:text-base">Intelligent LOS Forecasting Platform</p>
          </div>
        </div>
        <p className="text-cyan-50 text-sm sm:text-base mt-3 max-w-2xl">
          Intelligent line-of-sight forecasting for distributors. Analyze current performance, simulate scenarios, and optimize inventory strategy in real-time.
        </p>
      </div>
    </header>
  );
}
