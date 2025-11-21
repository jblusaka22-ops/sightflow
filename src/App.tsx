import { useState, useMemo } from 'react';
import { useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { InputCard } from './components/InputCard';
import { InfoCard } from './components/InfoCard';
import { LOSProgressBar } from './components/LOSProgressBar';
import { SmartSuggestions } from './components/SmartSuggestions';
import { ResultsPanel } from './components/ResultsPanel';
import { ComparisonView } from './components/ComparisonView';
import { ScenarioButtons } from './components/ScenarioButtons';
import { ExportButtons } from './components/ExportButtons';
import { Footer } from './components/Footer';
import { calculateLOS } from './utils/calculations';

export default function App() {
  const { isDarkMode } = useTheme();
  const [sellOutHl, setSellOutHl] = useState<string>('');
  const [sellInHl, setSellInHl] = useState<string>('');
  const [desiredLos, setDesiredLos] = useState<string>('');
  const [pendingOrders, setPendingOrders] = useState<string>('');
  const [receivedStock, setReceivedStock] = useState<string>('');

  const result = useMemo(() => {
    return calculateLOS({
      sellOutHl: parseFloat(sellOutHl) || 0,
      sellInHl: parseFloat(sellInHl) || 0,
      desiredLos: parseFloat(desiredLos) || 0,
      pendingOrders: parseFloat(pendingOrders) || 0,
      receivedStock: parseFloat(receivedStock) || 0,
    });
  }, [sellOutHl, sellInHl, desiredLos, pendingOrders, receivedStock]);

  const hasValidInputs = sellOutHl && sellInHl && desiredLos;
  const showCurrentLos = sellOutHl && sellInHl;

  const handleAddCases = (cases: number) => {
    const current = parseFloat(pendingOrders) || 0;
    setPendingOrders((current + cases).toString());
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50'
    }`}>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {!hasValidInputs && !showCurrentLos && <InfoCard />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <InputCard
              sellOutHl={sellOutHl}
              setSellOutHl={setSellOutHl}
              sellInHl={sellInHl}
              setSellInHl={setSellInHl}
              desiredLos={desiredLos}
              setDesiredLos={setDesiredLos}
              pendingOrders={pendingOrders}
              setPendingOrders={setPendingOrders}
              receivedStock={receivedStock}
              setReceivedStock={setReceivedStock}
            />

            {showCurrentLos && (
              <LOSProgressBar
                currentLos={result.currentLos}
                desiredLos={parseFloat(desiredLos) || 0}
                status={result.losStatus}
              />
            )}

            {hasValidInputs && (
              <>

                <ResultsPanel result={result} />

                <ComparisonView result={result} desiredLos={parseFloat(desiredLos) || 0} />

                <ScenarioButtons onAddCases={handleAddCases} />

                <ExportButtons
                  sellOutHl={parseFloat(sellOutHl)}
                  sellInHl={parseFloat(sellInHl)}
                  desiredLos={parseFloat(desiredLos)}
                  pendingOrders={parseFloat(pendingOrders) || 0}
                  receivedStock={parseFloat(receivedStock) || 0}
                  result={result}
                />
              </>
            )}

            {!hasValidInputs && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border-2 border-dashed border-cyan-200 text-center animate-slideUp">
                <p className="text-slate-600 text-lg font-medium">
                  {showCurrentLos
                    ? 'Add Desired LOS to see full predictions and scenarios'
                    : 'Enter Sell Out and Sell In to get started'}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Suggestions */}
          {hasValidInputs && (
            <div className="lg:col-span-1 space-y-6 sm:space-y-8">
              <SmartSuggestions
                status={result.losStatus}
                currentLos={result.currentLos}
                desiredLos={result.desiredLos}
              />

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 rounded-xl shadow-xl p-6 space-y-4 animate-slideUp border border-slate-700">
                <h3 className="text-lg font-bold text-cyan-300">Key Metrics</h3>
                <div className="space-y-3">
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-sm text-slate-400">Current LOS</p>
                    <p className="text-2xl font-bold text-cyan-400">
                      {result.currentLos.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-sm text-slate-400">Predicted LOS</p>
                    <p className="text-2xl font-bold text-teal-400">
                      {result.predictedLos.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <p className="text-sm text-slate-400">Cases to Target</p>
                    <p className="text-2xl font-bold text-amber-400">
                      {result.casesNeeded.toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
