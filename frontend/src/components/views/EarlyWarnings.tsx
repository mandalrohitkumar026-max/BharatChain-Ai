import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Clock,
  Coins,
  Factory as FactoryIcon,
  CheckCircle2,
  Building2,
  Sliders,
  Sparkles,
  Zap,
  Activity,
  Layers,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';
import { mockEarlyWarnings } from '../../data/mockData';

export const EarlyWarnings: React.FC = () => {
  const {
    currency,
    setActiveTab,
    setHighlightedNetworkPath,
    openSupplierDetail,
    addToast
  } = useApp();

  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredWarnings = mockEarlyWarnings.filter(w => {
    if (filterSeverity === 'all') return true;
    return w.severity === filterSeverity;
  });

  const handleCreateAction = (warningTitle: string) => {
    addToast('Action Created', `Mitigation work-order dispatched to Procurement & Supply Chain Director for: "${warningTitle}"`, 'success');
  };

  const handleSimulate = (warningId: string) => {
    setActiveTab('scenarios');
    addToast('Scenario Loaded', 'Simulation model configured from Early Warning telemetry.', 'info');
  };

  const handleViewImpact = (supplierId: string) => {
    setHighlightedNetworkPath(supplierId);
    setActiveTab('supply-network');
    addToast('Network Path Highlighted', 'Full downstream supply network propagation active.', 'info');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">AI Early Warning System</h1>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded border border-red-200 uppercase tracking-wide">
              Predictive AI Disruption Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous Bayesian causal reasoning predicting factory line stoppages 10–25 days before physical material starvation.
          </p>
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1 rounded transition-all ${
              filterSeverity === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Warnings ({mockEarlyWarnings.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-3 py-1 rounded transition-all ${
              filterSeverity === 'critical' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Critical Only (2)
          </button>
          <button
            onClick={() => setFilterSeverity('high')}
            className={`px-3 py-1 rounded transition-all ${
              filterSeverity === 'high' ? 'bg-white text-orange-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            High Risk (1)
          </button>
        </div>
      </div>

      {/* Warning Cards List */}
      <div className="space-y-4">
        {filteredWarnings.map((warning) => {
          const badge = getRiskBadgeClasses(warning.severity);

          return (
            <div
              key={warning.id}
              className="bg-white rounded-lg border-2 border-slate-200 hover:border-slate-300 shadow-xs overflow-hidden transition-all"
            >
              {/* Header Bar */}
              <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border ${badge.bg} ${badge.text} ${badge.border}`}>
                    <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                    {badge.label}
                  </span>
                  <h2 className="text-sm font-bold text-slate-900">
                    {warning.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500 font-medium">
                    Prediction Confidence:
                  </span>
                  <span className="font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {warning.confidence}%
                  </span>
                </div>
              </div>

              {/* Body: Key Metrics & Deep Dive */}
              <div className="p-5 space-y-4">
                {/* 4 Core Metrics Grid (Exact prompt fields) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Predicted Disruption
                    </div>
                    <div className="text-xl font-black text-amber-600 font-mono mt-1">
                      {warning.predictedDisruptionDays} days
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">ETA to assembly halt</div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Affected Factory
                    </div>
                    <div className="text-sm font-bold text-slate-900 truncate mt-1">
                      {warning.factoryName}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Assembly Line 1 & Line 3</div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Revenue Exposure
                    </div>
                    <div className="text-xl font-black text-rose-700 font-mono mt-1">
                      {currency === 'INR' ? formatCurrency(warning.revenueExposureINR, 'INR') : formatCurrency(warning.revenueExposureUSD, 'USD')}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{warning.customersAffected.toLocaleString()} customers</div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Inventory Remaining
                    </div>
                    <div className="text-xl font-black text-slate-800 font-mono mt-1">
                      {warning.inventoryCoverageDays} days
                    </div>
                    <div className="text-[11px] text-rose-600 font-semibold mt-0.5">Deficit in {warning.predictedDisruptionDays - warning.inventoryCoverageDays} days</div>
                  </div>
                </div>

                {/* Explanation: WHY The Risk Exists (Explicit prompt requirement) */}
                <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-4">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-sky-700" />
                    Root Cause Telemetry Analysis (WHY This Disruption Exists)
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {warning.rootCauseAnalysis.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Mitigation Action Banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      AI Recommended Mitigation Action:
                    </div>
                    <div className="font-semibold text-emerald-950 text-xs leading-relaxed">
                      {warning.recommendedAction}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('recommendations');
                      addToast('Alternative Sourcing', 'Transferred procurement target to alternative vendor.', 'info');
                    }}
                    className="shrink-0 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>Open Dual-Sourcing Engine</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Action Buttons (Exact prompt specifications: View Impact, Simulate Response, Create Action) */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleViewImpact(warning.supplierId)}
                    className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    View Impact
                  </button>

                  <button
                    onClick={() => handleSimulate(warning.id)}
                    className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Sliders className="w-3.5 h-3.5 text-sky-700" />
                    Simulate Response
                  </button>

                  <button
                    onClick={() => handleCreateAction(warning.title)}
                    className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    Create Action
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
