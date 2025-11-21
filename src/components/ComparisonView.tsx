import { TrendingDown, TrendingUp } from 'lucide-react';
import { LOSResult } from '../utils/calculations';

interface ComparisonViewProps {
  result: LOSResult;
  desiredLos: number;
}

export function ComparisonView({ result, desiredLos }: ComparisonViewProps) {
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

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-teal-100 animate-slideUp">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Coverage Impact Analysis</h3>

      <div className="space-y-3">
        {scenarios.map((scenario, idx) => {
          const status = getScenarioStatus(scenario.los);
          const Icon = scenario.icon;
          const variance = scenario.los - desiredLos;
          const isTargetMet = scenario.los >= 93 && scenario.los <= 103;

          return (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 transition-all ${status.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {Icon && <Icon size={16} />}
                    <h4 className="font-semibold text-slate-900">{scenario.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{scenario.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-slate-900">
                      {scenario.los.toFixed(2)}%
                    </span>
                    <div className="text-xs">
                      {variance !== 0 && (
                        <>
                          <p className="font-semibold text-slate-600">
                            {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                          </p>
                          <p className="text-slate-500">vs target</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}>
                  {status.label}
                </div>
              </div>

              {isTargetMet && (
                <div className="mt-2 pt-2 border-t border-current border-opacity-30">
                  <p className="text-xs font-semibold text-green-700">✓ Meets target range</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">Insight:</span> Use scenarios to identify which actions bring coverage closest to your target range (93-103%).
        </p>
      </div>
    </div>
  );
}
