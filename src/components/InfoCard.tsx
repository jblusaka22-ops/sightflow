import { BookOpen } from 'lucide-react';

export function InfoCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-xl p-6 sm:p-8 border-2 border-blue-200 animate-slideUp">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <BookOpen size={24} className="text-blue-600 mt-1" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Quick Start Guide</h3>
          <p className="text-xs text-slate-600 mt-1">Master LOS forecasting in 4 easy steps</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Input Performance Data</p>
            <p className="text-xs text-slate-600 mt-1">Enter Demand (Sell Out), Supply (Sell In), and Target Coverage</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Monitor Live Coverage</p>
            <p className="text-xs text-slate-600 mt-1">View real-time LOS instantly. Check if you're hitting target (93-103%)</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Simulate Scenarios</p>
            <p className="text-xs text-slate-600 mt-1">Test pending orders or incoming stock. See coverage impact instantly</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Download & Share</p>
            <p className="text-xs text-slate-600 mt-1">Export as PDF for presentations or CSV for spreadsheet analysis</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-blue-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600">93-103%</p>
            <p className="text-xs text-slate-600 mt-1">Target Range</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600">Real-time</p>
            <p className="text-xs text-slate-600 mt-1">Live Calculations</p>
          </div>
        </div>
        <div className="bg-blue-100 rounded-lg p-3 border border-blue-200">
          <p className="text-xs font-semibold text-slate-900 mb-1">Coverage Formula</p>
          <p className="text-xs text-slate-700 font-mono">(Demand ÷ Supply) × 100 = Coverage %</p>
        </div>
      </div>
    </div>
  );
}
