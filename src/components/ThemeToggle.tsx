import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun size={20} className="text-amber-300 group-hover:rotate-180 transition-transform duration-500" />
      ) : (
        <Moon size={20} className="text-cyan-50 group-hover:rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
