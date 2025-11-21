export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-12 mt-16 border-t border-cyan-900/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-cyan-300 mb-3">Platform</h3>
            <p className="text-sm leading-relaxed">
              Intelligent line-of-sight forecasting designed for supply chain optimization.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-3">Core Features</h3>
            <ul className="text-sm space-y-2">
              <li>• Real-time coverage analysis</li>
              <li>• Multi-scenario forecasting</li>
              <li>• Instant performance insights</li>
              <li>• Report export (PDF/CSV)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-3">Key Metrics</h3>
            <ul className="text-sm space-y-2">
              <li>• Current LOS: live calculation</li>
              <li>• Target validation: 93-105%</li>
              <li>• Demand vs supply: real-time</li>
              <li>• Impact analysis: instant</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-3">About</h3>
            <p className="text-sm leading-relaxed">
              Built for distributors and supply chain professionals who need instant, accurate LOS forecasting.
            </p>
          </div>
        </div>

        <div className="border-t border-cyan-900/30 pt-6">
          <div className="text-center">
            <p className="text-sm">© {new Date().getFullYear()} SightFlow. Precision LOS forecasting.</p>
            <p className="text-xs text-slate-500 mt-2">Helping distributors optimize inventory and maximize performance</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
