import { getStatusColor, getStatusTextColor } from '../utils/calculations';

interface LOSProgressBarProps {
  currentLos: number;
  desiredLos: number;
  status: string;
}

export function LOSProgressBar({ currentLos, desiredLos, status }: LOSProgressBarProps) {
  const percentage = desiredLos > 0 ? Math.min((currentLos / (desiredLos + 15)) * 100, 100) : Math.min((currentLos / 110) * 100, 100);
  const textColor = getStatusTextColor(status);
  const gradientClass = getStatusColor(status);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-cyan-100 animate-slideUp">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">Coverage Status</h3>
          <div className="text-right">
            <div className={`text-3xl font-bold ${textColor}`}>
              {currentLos.toFixed(2)}%
            </div>
            {desiredLos > 0 && (
              <div className="text-xs text-slate-500">Target: {desiredLos.toFixed(2)}%</div>
            )}
          </div>
        </div>

        <div className="relative h-8 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-200">
          <div
            className={`h-full bg-gradient-to-r ${gradientClass} transition-all duration-500 ease-out flex items-center justify-end pr-3 rounded-full`}
            style={{ width: `${Math.max(percentage, 5)}%` }}
          >
            {percentage > 10 && (
              <span className="text-xs font-bold text-white drop-shadow">{Math.round(percentage)}%</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
        <p className="text-xs text-slate-600 mb-2">
          <span className="font-semibold">Status:</span> <span className={`font-bold ${textColor}`}>{status.toUpperCase()}</span>
        </p>
        <p className="text-xs text-slate-600">
          {desiredLos > 0
            ? `You are ${Math.abs(currentLos - desiredLos).toFixed(1)}% ${currentLos > desiredLos ? 'above' : 'below'} your target`
            : 'Enter Desired LOS to see target comparison'}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Performance Zones</p>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="text-center p-2 rounded-lg bg-red-50 border border-red-100 hover:shadow-md transition-shadow">
            <div className="text-red-600 font-semibold">Critical</div>
            <div className="text-slate-500">&lt;93%</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-green-50 border border-green-100 hover:shadow-md transition-shadow">
            <div className="text-green-600 font-semibold">Optimal</div>
            <div className="text-slate-500">93–103%</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-orange-50 border border-orange-100 hover:shadow-md transition-shadow">
            <div className="text-orange-600 font-semibold">Caution</div>
            <div className="text-slate-500">103–105%</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-cyan-50 border border-cyan-100 hover:shadow-md transition-shadow">
            <div className="text-cyan-600 font-semibold">High</div>
            <div className="text-slate-500">&gt;105%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
