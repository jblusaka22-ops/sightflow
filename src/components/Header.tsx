import { TrendingUp } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { isDarkMode } = useTheme();

  return (
    <header className={`shadow-2xl animate-fadeIn transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-slate-100'
        : 'bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 text-white'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
              isDarkMode ? 'bg-slate-600/30' : 'bg-white/20'
            }`}>
              <TrendingUp size={28} className={isDarkMode ? 'text-cyan-400' : 'text-white'} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">SightFlow</h1>
              <p className={`text-sm sm:text-base ${
                isDarkMode ? 'text-slate-300' : 'text-cyan-50'
              }`}>Intelligent LOS Forecasting Platform</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <p className={`text-sm sm:text-base mt-3 max-w-2xl ${
          isDarkMode ? 'text-slate-300' : 'text-cyan-50'
        }`}>
          Intelligent line-of-sight forecasting for distributors. Analyze current performance, simulate scenarios, and optimize inventory strategy in real-time.
        </p>
      </div>
    </header>
  );
}
