import React, { useState } from 'react';
import {
  Boxes,
  AlertTriangle,
  Clock,
  Search,
  ArrowRight,
  TrendingDown,
  ShieldAlert,
  Sliders,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockComponents } from '../../data/mockData';
import { formatLargeNumber } from '../../utils/formatters';

export const InventoryRisk: React.FC = () => {
  const { setActiveTab, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'stockout_likely' | 'single_source'>('all');

  const filteredComponents = mockComponents.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.partNumber.toLowerCase().includes(search.toLowerCase()) || c.supplierName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === 'all' ||
      (filterType === 'stockout_likely' && c.daysRemaining <= 14) ||
      (filterType === 'single_source' && c.isSingleSource);
    return matchesSearch && matchesFilter;
  });

  const stockoutCount = mockComponents.filter(c => c.daysRemaining <= 14).length;
  const singleSourceCount = mockComponents.filter(c => c.isSingleSource).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Inventory Risk Intelligence</h1>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wide">
              Burn-Rate Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of plant burn rates, pipeline in-transit inventory, and predictive stockout thresholds.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded transition-all ${
              filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Parts ({mockComponents.length})
          </button>
          <button
            onClick={() => setFilterType('stockout_likely')}
            className={`px-3 py-1 rounded transition-all ${
              filterType === 'stockout_likely' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stockout Likely ({stockoutCount})
          </button>
          <button
            onClick={() => setFilterType('single_source')}
            className={`px-3 py-1 rounded transition-all ${
              filterType === 'single_source' ? 'bg-white text-amber-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Single Source ({singleSourceCount})
          </button>
        </div>
      </div>

      {/* Featured Example Spotlight: Power Controller (Exact prompt specification) */}
      <div className="bg-white rounded-lg border-2 border-red-200 p-5 shadow-xs bg-gradient-to-r from-red-50/40 via-white to-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                CRITICAL STOCKOUT HAZARD
              </span>
              <span className="text-xs font-mono text-slate-400">Part: PC-800V-X4</span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Power Controller 800V GaN (Component A)
            </h2>
            <div className="text-xs text-slate-600">
              Supplier: <strong className="text-slate-800">Shenzhen Micro Dynamics (Supplier X)</strong> • Affected:{' '}
              <strong className="text-slate-800">Factory 02 Chennai (EV Powertrain X1)</strong>
            </div>
          </div>

          {/* 5 Exact fields from user prompt */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Inventory</div>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">18,000 units</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Daily Consumption</div>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">1,500 units</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Inventory Coverage</div>
              <div className="text-base font-bold text-amber-600 font-mono mt-0.5">12 days</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Supplier Delay</div>
              <div className="text-base font-bold text-rose-600 font-mono mt-0.5">15 days</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Prediction</div>
              <span className="inline-block px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold mt-0.5">
                🔴 Stockout likely
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-600">
            Disruption Delta: <strong>Supply buffer exhausts 3 days before next container arrival at Chennai Port.</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('recommendations');
                addToast('Alternative Sourcing', 'Triggering volume shift for Power Controller.', 'info');
              }}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              Dual-Source with Titan Precision
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table (All Critical Components) */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        {/* Search Header */}
        <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search components or part numbers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium">
            Showing {filteredComponents.length} components
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-2.5 px-4">Component</th>
                <th className="py-2.5 px-3">Primary Supplier</th>
                <th className="py-2.5 px-3 text-right">Current Inventory</th>
                <th className="py-2.5 px-3 text-right">Daily Consumption</th>
                <th className="py-2.5 px-3 text-right">Incoming Supply</th>
                <th className="py-2.5 px-3 text-center">Days Remaining</th>
                <th className="py-2.5 px-4 text-center">Prediction</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComponents.slice(0, 15).map(cmp => {
                const isStockoutLikely = cmp.daysRemaining <= 14;
                const isModerate = cmp.daysRemaining > 14 && cmp.daysRemaining <= 25;

                return (
                  <tr key={cmp.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <span>{cmp.name}</span>
                        {cmp.isSingleSource && (
                          <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                            Sole Source
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {cmp.partNumber} • {cmp.category}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-700">
                      <div className="font-medium">{cmp.supplierName}</div>
                      <div className="text-[10px] text-slate-400">Lead: {cmp.leadTimeDays} days</div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-medium text-slate-800">
                      {formatLargeNumber(cmp.currentInventory)}
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-medium text-slate-800">
                      {formatLargeNumber(cmp.dailyConsumption)}/day
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-medium text-slate-600">
                      {formatLargeNumber(cmp.incomingSupply)}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                        isStockoutLikely ? 'bg-red-50 text-red-700 border border-red-200' : isModerate ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {cmp.daysRemaining} days
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {isStockoutLikely ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                          🔴 Stockout likely
                        </span>
                      ) : isModerate ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          🟡 Watchlist
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          🟢 Buffer Secure
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isStockoutLikely ? (
                        <button
                          onClick={() => {
                            setActiveTab('recommendations');
                            addToast('Expedite Triggered', `Loaded alternative supplier options for ${cmp.name}`, 'info');
                          }}
                          className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 hover:underline"
                        >
                          Find Alternative →
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400">Normal</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
