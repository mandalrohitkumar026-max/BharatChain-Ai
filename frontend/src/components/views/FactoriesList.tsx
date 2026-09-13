import React from 'react';
import { Factory as FactoryIcon, MapPin, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockFactories } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export const FactoriesList: React.FC = () => {
  const { currency, setActiveTab, setHighlightedNetworkPath, addToast } = useApp();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Manufacturing Facilities & Plant Exposure</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              {mockFactories.length} Assembly Hubs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Assembly line throughput monitoring, capacity utilization, and direct downstream disruption liability.
          </p>
        </div>

        <button
          onClick={() => {
            setHighlightedNetworkPath('sup-02');
            setActiveTab('supply-network');
          }}
          className="px-3 py-1.5 bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 rounded-md text-xs font-semibold"
        >
          View Factory Supply Graph →
        </button>
      </div>

      {/* Factories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFactories.slice(0, 9).map(fac => {
          const isAtRisk = fac.status === 'Disrupted' || fac.status === 'At Risk';

          return (
            <div
              key={fac.id}
              className={`bg-white rounded-lg border p-4 shadow-xs transition-all space-y-3 ${
                fac.status === 'Disrupted'
                  ? 'border-red-300 ring-1 ring-red-200'
                  : isAtRisk
                  ? 'border-amber-300'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">{fac.code}</div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug mt-0.5">{fac.name}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{fac.location}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  fac.status === 'Disrupted'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : fac.status === 'At Risk'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {fac.status}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-slate-100">
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-[9px] font-bold uppercase text-slate-400">Capacity</div>
                  <div className="text-sm font-bold text-slate-800 font-mono mt-0.5">{fac.capacityUtilization}%</div>
                </div>

                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-[9px] font-bold uppercase text-slate-400">Exposure</div>
                  <div className="text-sm font-bold text-rose-700 font-mono mt-0.5">
                    {currency === 'INR' ? `₹${fac.productionExposureINR} Cr` : `$${fac.productionExposureUSD}M`}
                  </div>
                </div>

                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-[9px] font-bold uppercase text-slate-400">Critical Parts</div>
                  <div className="text-sm font-bold text-amber-600 font-mono mt-0.5">{fac.criticalComponentsAtRisk}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Plant Director: <strong>{fac.manager}</strong></span>
                <button
                  onClick={() => {
                    setActiveTab('scenarios');
                    addToast('Simulation Loaded', `Modeling plant disruption parameters for ${fac.name}.`, 'info');
                  }}
                  className="text-sky-700 hover:text-sky-800 font-semibold text-[11px]"
                >
                  Simulate Line Halt →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
