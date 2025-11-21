import { BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface InputCardProps {
  sellOutHl: string;
  setSellOutHl: (value: string) => void;
  sellInHl: string;
  setSellInHl: (value: string) => void;
  desiredLos: string;
  setDesiredLos: (value: string) => void;
  pendingOrders: string;
  setPendingOrders: (value: string) => void;
  receivedStock: string;
  setReceivedStock: (value: string) => void;
}

export function InputCard({
  sellOutHl,
  setSellOutHl,
  sellInHl,
  setSellInHl,
  desiredLos,
  setDesiredLos,
  pendingOrders,
  setPendingOrders,
  receivedStock,
  setReceivedStock,
}: InputCardProps) {
  const { isDarkMode } = useTheme();

  const currentLos = sellOutHl && sellInHl
    ? ((parseFloat(sellOutHl) / parseFloat(sellInHl)) * 100).toFixed(2)
    : null;

  const handleNumericInput = (value: string, setter: (value: string) => void) => {
    if (value === '' || value === '-' || !isNaN(parseFloat(value))) {
      setter(value);
    }
  };

  return (
    <div className={`backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border animate-slideUp transition-all duration-300 ${
      isDarkMode
        ? 'bg-slate-800/90 border-slate-700'
        : 'bg-white/90 border-cyan-100'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-700 to-slate-600'
              : 'bg-gradient-to-br from-cyan-100 to-teal-100'
          }`}>
            <BarChart3 size={24} className={isDarkMode ? 'text-cyan-400' : 'text-cyan-600'} />
          </div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Performance Metrics
          </h2>
        </div>
        {currentLos && (
          <div className="text-right animate-countUp">
            <div className={`text-xs uppercase tracking-wide font-semibold ${
              isDarkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Real-time LOS</div>
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
              {currentLos}%
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Demand (Sell Out) — hl
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={sellOutHl}
            onChange={(e) => handleNumericInput(e.target.value, setSellOutHl)}
            placeholder="e.g., 822"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
              isDarkMode
                ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'
            }`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Total volume sold directly to consumers/end users
          </p>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Supply (Sell In) — hl
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={sellInHl}
            onChange={(e) => handleNumericInput(e.target.value, setSellInHl)}
            placeholder="e.g., 1005"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
              isDarkMode
                ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'
            }`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Total inventory available in distribution channel
          </p>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Target LOS — %
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={desiredLos}
            onChange={(e) => handleNumericInput(e.target.value, setDesiredLos)}
            placeholder="e.g., 93"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
              isDarkMode
                ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'
            }`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Target coverage (Recommended: 93–105%)
          </p>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Pending Orders — cases (optional)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={pendingOrders}
            onChange={(e) => handleNumericInput(e.target.value, setPendingOrders)}
            placeholder="e.g., 1500"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
              isDarkMode
                ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'
            }`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Outstanding orders that will impact LOS
          </p>
        </div>
      </div>

      <div className={`pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Incoming Stock — cases (optional)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={receivedStock}
            onChange={(e) => handleNumericInput(e.target.value, setReceivedStock)}
            placeholder="e.g., 2000"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
              isDarkMode
                ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200'
            }`}
          />
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Expected shipments to increase available inventory
          </p>
        </div>
      </div>
    </div>
  );
}
