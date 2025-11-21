import { TrendingUp } from 'lucide-react';
import { LOSResult } from '../utils/calculations';

interface ResultsPanelProps {
  result: LOSResult;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
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
          ? 'bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-300 shadow-md'
          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
      }`}
    >
      <p className="text-xs text-slate-600 font-semibold uppercase tracking-wide mb-1">{stat.label}</p>
      <p className={`text-2xl font-bold ${stat.highlight ? 'text-cyan-700' : 'text-slate-900'}`}>
        {stat.value}
      </p>
      <p className="text-xs text-slate-500 mt-1">{stat.unit}</p>
    </div>
  );

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-teal-100 animate-slideUp space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg">
          <TrendingUp size={24} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Performance Analysis</h2>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Today's Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentStats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Selling Scenario</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellingStats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">Receiving Scenario</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {receivingStats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
