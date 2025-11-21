import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { getSuggestion, getStatusBgColor, getStatusTextColor } from '../utils/calculations';

interface SmartSuggestionsProps {
  status: string;
  currentLos: number;
  desiredLos: number;
}

export function SmartSuggestions({ status, currentLos, desiredLos }: SmartSuggestionsProps) {
  const suggestion = getSuggestion(status, currentLos, desiredLos);
  const bgColor = getStatusBgColor(status);
  const textColor = getStatusTextColor(status);

  const getIcon = () => {
    switch (status) {
      case 'critical':
        return <AlertCircle size={24} className="text-red-600" />;
      case 'optimal':
        return <CheckCircle size={24} className="text-green-600" />;
      case 'caution':
        return <AlertTriangle size={24} className="text-orange-600" />;
      case 'high':
        return <Info size={24} className="text-cyan-600" />;
      default:
        return <Info size={24} className="text-slate-600" />;
    }
  };

  return (
    <div className={`rounded-xl shadow-xl p-6 sm:p-8 border-2 ${bgColor} animate-slideUp backdrop-blur-sm`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 pt-1">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${textColor} mb-2`}>
            {status === 'critical'
              ? 'Urgent Action Needed'
              : status === 'optimal'
              ? 'Optimal Performance'
              : status === 'caution'
              ? 'Close Monitoring Required'
              : 'Optimization Opportunity'}
          </h3>
          <p className={`text-sm ${textColor} opacity-90 leading-relaxed`}>{suggestion}</p>
          <div className="mt-3 pt-3 border-t border-current border-opacity-20">
            <p className={`text-xs font-semibold uppercase tracking-wide ${textColor} opacity-75`}>
              Recommended Action
            </p>
            <p className={`text-xs ${textColor} opacity-85 mt-1`}>
              {status === 'critical'
                ? 'Push sales initiatives or adjust supply chain timing immediately'
                : status === 'optimal'
                ? 'Maintain current execution and track demand weekly'
                : status === 'caution'
                ? 'Contact suppliers about delivery optimization and timing'
                : 'Coordinate with sales and procurement on inventory reduction'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
