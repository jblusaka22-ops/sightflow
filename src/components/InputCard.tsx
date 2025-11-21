import { BarChart3 } from 'lucide-react';

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
  const currentLos = sellOutHl && sellInHl
    ? ((parseFloat(sellOutHl) / parseFloat(sellInHl)) * 100).toFixed(2)
    : null;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-cyan-100 animate-slideUp">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-lg">
            <BarChart3 size={24} className="text-cyan-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Performance Metrics</h2>
        </div>
        {currentLos && (
          <div className="text-right animate-countUp">
            <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Real-time LOS</div>
            <div className="text-2xl font-bold text-cyan-600">{currentLos}%</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Demand (Sell Out) — hl
          </label>
          <input
            type="number"
            value={sellOutHl}
            onChange={(e) => setSellOutHl(e.target.value)}
            placeholder="e.g., 822"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
          />
          <p className="text-xs text-slate-500 mt-1">Total volume sold directly to consumers/end users</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Supply (Sell In) — hl
          </label>
          <input
            type="number"
            value={sellInHl}
            onChange={(e) => setSellInHl(e.target.value)}
            placeholder="e.g., 1005"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
          />
          <p className="text-xs text-slate-500 mt-1">Total inventory available in distribution channel</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Target LOS — %
          </label>
          <input
            type="number"
            value={desiredLos}
            onChange={(e) => setDesiredLos(e.target.value)}
            placeholder="e.g., 93"
            step="0.1"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
          />
          <p className="text-xs text-slate-500 mt-1">Target coverage (Recommended: 93–105%)</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pending Orders — cases (optional)
          </label>
          <input
            type="number"
            value={pendingOrders}
            onChange={(e) => setPendingOrders(e.target.value)}
            placeholder="e.g., 1500"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
          />
          <p className="text-xs text-slate-500 mt-1">Outstanding orders that will impact LOS</p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Incoming Stock — cases (optional)
          </label>
          <input
            type="number"
            value={receivedStock}
            onChange={(e) => setReceivedStock(e.target.value)}
            placeholder="e.g., 2000"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
          />
          <p className="text-xs text-slate-500 mt-1">Expected shipments to increase available inventory</p>
        </div>
      </div>
    </div>
  );
}
