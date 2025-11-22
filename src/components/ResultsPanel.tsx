import { TrendingUp } from 'lucide-react';
import { LOSResult } from '../utils/calculations';
import { useTheme } from '../context/ThemeContext';

interface ResultsPanelProps {
  result: LOSResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  const { isDarkMode } = useTheme();
  const currentStats = [
    {
      label: 'Current Demand',
      value: result.sellOutCases.toFixed(2),
      unit: 'cases',
    },
    {
      label: 'Available Supply',
      value: result.sellInCases.toFixed(2),
      unit: 'cases',
    },
    {
      label: 'Coverage Ratio',
      value: result.currentLos.toFixed(2),
      unit: '%',
      highlight: true,
    },
  ];

  const sellingStats = [
    {
      label: 'Cases to Target',
      value: result.casesNeeded.toFixed(0),
      unit: 'cases',
      highlight: true,
    },
    {
      label: 'Projected Demand',
      value: result.newSellOutHl.toFixed(2),
      unit: 'hl',
    },
    {
      label: 'Projected Coverage',
      value: result.losAfterSelling.toFixed(2),
      unit: '%',
      highlight: true,
    },
  ];

  const receivingStats = [
    {
      label: 'Updated Supply',
      value: result.newSellInHl.toFixed(2),
      unit: 'hl',
    },
    {
      label: 'Updated Capacity',
      value: result.newSellInCases.toFixed(0),
      unit: 'cases',
    },
    {
      label: 'New Coverage',
      value: result.losAfterReceiving.toFixed(2),
      unit: '%',
      highlight: true,
    },
  ];

  const StatCard = ({ stat }: { stat: typeof currentStats[0] }) => (
    <div
      className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
        stat.highlight
          ? isDarkMode
            ? 'bg-gradient-to-br from-slate-700 to-slate-600 border-cyan-500/30 shadow-md'
            : 'bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-300 shadow-md'
          : isDarkMode
          ? 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>{stat.label}</p>
      <p className={`text-2xl font-bold ${
        stat.highlight
          ? isDarkMode ? 'text-cyan-400' : 'text-cyan-700'
          : isDarkMode ? 'text-slate-100' : 'text-slate-900'
      }`}>
        {stat.value}
      </p>
      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{stat.unit}</p>
    </div>
  );

  return (
    <div className={`backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border animate-slideUp space-y-6 transition-all duration-300 ${
      isDarkMode
        ? 'bg-slate-800/90 border-slate-700'
        : 'bg-white/90 border-teal-100'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-700 to-slate-600'
            : 'bg-gradient-to-br from-teal-100 to-cyan-100'
        }`}>
          <TrendingUp size={24} className={isDarkMode ? 'text-cyan-400' : 'text-teal-600'} />
        </div>
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
          Performance Analysis
        </h2>
      </div>

      <div>
        <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>Today's Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentStats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>

      <div className={`border-t pt-6 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>Selling Scenario</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellingStats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>

      <div className={`border-t pt-6 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
          isDarkMode ? 'text-slate-300' : 'text-slate-700'
        }`}>Receiving Scenario</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {receivingStats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
