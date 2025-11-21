import { Download, FileText } from 'lucide-react';
import { exportPDF, exportCSV } from '../utils/export';
import { LOSResult } from '../utils/calculations';

interface ExportButtonsProps {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
  pendingOrders: number;
  receivedStock: number;
  result: LOSResult;
}

export function ExportButtons({
  sellOutHl,
  sellInHl,
  desiredLos,
  pendingOrders,
  receivedStock,
  result,
}: ExportButtonsProps) {
  const handleExportPDF = async () => {
    try {
      await exportPDF({
        sellOutHl,
        sellInHl,
        desiredLos,
        pendingOrders,
        receivedStock,
        result,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF');
    }
  };

  const handleExportCSV = () => {
    try {
      exportCSV({
        sellOutHl,
        sellInHl,
        desiredLos,
        pendingOrders,
        receivedStock,
        result,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV');
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 border border-cyan-100 animate-slideUp">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Save & Share Results</h3>
      <p className="text-xs text-slate-600 mb-4">Download your LOS analysis for presentations or deeper analysis:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl active:scale-95 transform hover:-translate-y-0.5 group"
        >
          <FileText size={18} className="group-hover:rotate-6 transition-transform" />
          <span className="text-sm sm:text-base">Export PDF</span>
        </button>
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl active:scale-95 transform hover:-translate-y-0.5 group"
        >
          <Download size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm sm:text-base">Export CSV</span>
        </button>
      </div>
      <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">PDF</span> for sharing and printing • <span className="font-semibold">CSV</span> for spreadsheet analysis
        </p>
      </div>
    </div>
  );
}
