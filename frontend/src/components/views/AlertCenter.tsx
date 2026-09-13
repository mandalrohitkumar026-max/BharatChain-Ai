import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Clock,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Filter,
  Coins,
  Building2,
  Cpu,
  Factory as FactoryIcon,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAlerts } from '../../data/mockData';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';

export const AlertCenter: React.FC = () => {
  const { currency, setActiveTab, setHighlightedNetworkPath, addToast } = useApp();

  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  const handleResolve = (id: string, title: string) => {
    setResolvedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    addToast('Alert Acknowledged', `Disruption mitigation protocol assigned for "${title}".`, 'success');
  };

  const filteredAlerts = mockAlerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Risk Alert Center</h1>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded border border-red-200 uppercase tracking-wide">
              {mockAlerts.length} Active Incident Feeds
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured 4-question breakdown for every operational disruption signal impacting manufacturing lines.
          </p>
        </div>

        {/* Severity Tabs matching Prompt: 🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Low */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1 rounded transition-all ${
              filterSeverity === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Alerts ({mockAlerts.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterSeverity === 'critical' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔴 Critical (2)
          </button>
          <button
            onClick={() => setFilterSeverity('high')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterSeverity === 'high' ? 'bg-white text-orange-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🟠 High (1)
          </button>
          <button
            onClick={() => setFilterSeverity('medium')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterSeverity === 'medium' ? 'bg-white text-amber-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🟡 Medium (2)
          </button>
        </div>
      </div>

      {/* Alert Cards with 4-Question Framework (Exact prompt specification) */}
      <div className="space-y-3.5">
        {filteredAlerts.map(alert => {
          const isResolved = resolvedIds.has(alert.id);
          const badge = getRiskBadgeClasses(alert.severity);

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-lg border transition-all p-5 shadow-xs ${
                isResolved
                  ? 'border-slate-200 opacity-60 bg-slate-50/50'
                  : alert.severity === 'critical'
                  ? 'border-red-200 hover:border-red-300'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Alert Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.label}
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
                    {alert.category}
                  </span>
                  <h2 className="text-sm font-bold text-slate-900">
                    {alert.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {alert.timestamp}
                  </span>
                  <span className="font-mono font-bold text-rose-700">
                    Exposure: {currency === 'INR' ? formatCurrency(alert.exposureINR, 'INR') : formatCurrency(alert.exposureUSD, 'USD')}
                  </span>
                </div>
              </div>

              {/* 4-Question Structured Framework Grid (Prompt Requirement) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3 text-xs">
                {/* 1. What happened? */}
                <div className="p-3 bg-slate-50 rounded-md border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    1. What happened?
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {alert.whatHappened}
                  </p>
                </div>

                {/* 2. Why does it matter? */}
                <div className="p-3 bg-slate-50 rounded-md border border-slate-200/80 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    2. Why does it matter?
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {alert.whyItMatters}
                  </p>
                </div>

                {/* 3. When could it impact production? */}
                <div className="p-3 bg-amber-50/60 rounded-md border border-amber-200/80 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    3. When could it impact production?
                  </div>
                  <p className="text-amber-950 font-semibold leading-relaxed">
                    {alert.impactETA}
                  </p>
                </div>

                {/* 4. What should we do? */}
                <div className="p-3 bg-emerald-50/60 rounded-md border border-emerald-200/80 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    4. What should we do?
                  </div>
                  <p className="text-emerald-950 font-semibold leading-relaxed">
                    {alert.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3 text-slate-500">
                  {alert.affectedSupplierName && (
                    <span>Supplier: <strong className="text-slate-800">{alert.affectedSupplierName}</strong></span>
                  )}
                  {alert.affectedFactoryName && (
                    <span>Factory: <strong className="text-slate-800">{alert.affectedFactoryName}</strong></span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {alert.affectedSupplierId && (
                    <button
                      onClick={() => {
                        setHighlightedNetworkPath(alert.affectedSupplierId || 'sup-02');
                        setActiveTab('supply-network');
                      }}
                      className="px-2.5 py-1 text-slate-700 hover:bg-slate-100 rounded font-semibold text-xs border border-slate-200 transition-colors"
                    >
                      Inspect Path
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setActiveTab('scenarios');
                      addToast('Simulate Disruption', 'Loaded alert parameters into scenario simulator.', 'info');
                    }}
                    className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded font-semibold text-xs border border-sky-200 transition-colors"
                  >
                    Simulate Disruption
                  </button>
                  <button
                    onClick={() => handleResolve(alert.id, alert.title)}
                    disabled={isResolved}
                    className={`px-3 py-1 rounded font-semibold text-xs flex items-center gap-1 transition-colors ${
                      isResolved
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isResolved ? 'Action Dispatched' : 'Authorize Action'}
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
