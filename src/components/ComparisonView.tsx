import { TrendingDown, TrendingUp } from 'lucide-react';
import { LOSResult } from '../utils/calculations';
import { useTheme } from '../context/ThemeContext';

interface ComparisonViewProps {
  result: LOSResult;
  desiredLos: number;
}

export function ComparisonView({ result, desiredLos }: ComparisonViewProps) {
  const { isDarkMode } = useTheme();
  const scenarios = [
    {
      name: 'Current State',
      los: result.currentLos,
      description: 'Your coverage level right now',
      icon: null,
    },
    {
      name: 'After Sales',
      los: result.losAfterSelling,
      description: 'Coverage if cases are sold at target',
      icon: TrendingDown,
    },
    {
      name: 'After Restocking',
      los: result.losAfterReceiving,
      description: 'Coverage with incoming inventory',
      icon: TrendingUp,
    },
    {
      name: 'With Orders',
      los: result.predictedLos,
      description: 'Coverage including pending orders',
      icon: null,
    },
  ];

  const getScenarioStatus = (los: number) => {
    if (los < 93) return { label: 'Critical', color: 'text-red-600 bg-red-50 border-red-200' };
    if (los <= 103) return { label: 'Optimal', color: 'text-green-600 bg-green-50 border-green-200' };
    if (los <= 105) return { label: 'Caution', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    return { label: 'High', color: 'text-cyan-600 bg-cyan-50 border-cyan-200' };
  };

  const baseClass = isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-teal-100';
  const titleClass = isDarkMode ? 'text-slate-100' : 'text-slate-900';
  const cardClass = (isDarkMode: boolean, highlight?: boolean) => {
    if (isDarkMode) {
      return highlight ? 'bg-slate-700/50' : 'bg-slate-700/50 border-slate-600';
    }
    return highlight ? 'bg-slate-700/50' : 'bg-slate-50 border-slate-200';
  };

  return (
    <div className={`backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border animate-slideUp transition-all duration-300 ${baseClass}`}>
      <h3 className={`text-lg font-bold mb-4 ${titleClass}`}>
        Coverage Impact Analysis
      </h3>

      <div className="space-y-3">
        {scenarios.map((scenario, idx) => {
          const status = getScenarioStatus(scenario.los);
          const Icon = scenario.icon;
          const variance = scenario.los - desiredLos;
          const isTargetMet = scenario.los >= 93 && scenario.los <= 103;

          return (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 transition-all ${isDarkMode ? 'bg-slate-700/50' : status.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {Icon && <Icon size={16} className={isDarkMode ? 'text-cyan-400' : ''} />}
                    <h4 className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {scenario.name}
                    </h4>
                  </div>
                  <p className={`text-xs mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {scenario.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-slate-900'}`}>
                      {scenario.los.toFixed(2)}%
                    </span>
                    <div className="text-xs">
                      {variance !== 0 && (
                        <>
                          <p className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                          </p>
                          <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>vs target</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${isDarkMode ? 'bg-slate-600/50 text-slate-200' : status.color}`}>
                  {status.label}
                </div>
              </div>

              {isTargetMet && (
                <div className="mt-2 pt-2 border-t border-current border-opacity-30">
                  <p className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                    ✓ Meets target range
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={`mt-4 p-3 rounded-lg border transition-all duration-300 ${isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
        <p className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          <span className="font-semibold">Insight:</span> Use scenarios to identify which actions bring coverage closest to your target range (93-103%).
        </p>
      </div>
    </div>
  );
}
