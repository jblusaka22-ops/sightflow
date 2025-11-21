import { Plus, Zap } from 'lucide-react';

interface ScenarioButtonsProps {
  onAddCases: (cases: number) => void;
}

export function ScenarioButtons({ onAddCases }: ScenarioButtonsProps) {
  const scenarios = [
    { cases: 500, label: 'Small' },
    { cases: 1000, label: 'Medium' },
    { cases: 1500, label: 'Large' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-cyan-100 animate-slideUp">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={20} className="text-amber-500" />
        <h3 className="text-lg font-bold text-slate-900">Test Order Scenarios</h3>
      </div>
      <p className="text-xs text-slate-600 mb-4">Simulate order volumes and see real-time coverage impact:</p>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {scenarios.map(({ cases, label }) => (
          <button
            key={cases}
            onClick={() => onAddCases(cases)}
            className="flex flex-col items-center justify-center gap-1 px-3 py-4 bg-gradient-to-br from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl active:scale-95 transform hover:-translate-y-0.5 group"
          >
            <Plus size={18} />
            <span className="text-xs sm:text-sm">+{cases}</span>
            <span className="text-xs opacity-75">{label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200">
        <p className="text-xs text-slate-700">
          <span className="font-semibold">How it works:</span> Each button adds to Pending Orders, updating your projected coverage instantly. Use to test demand scenarios.
        </p>
      </div>
    </div>
  );
}
