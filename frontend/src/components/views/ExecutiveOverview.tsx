import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Building2,
  Cpu,
  Coins,
  Package,
  Bell,
  ArrowUpRight,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';
import {
  executiveOverviewMetrics,
  mockRiskTrendData,
  mockAlerts,
  mockSuppliers,
  mockEarlyWarnings
} from '../../data/mockData';

export const ExecutiveOverview: React.FC = () => {
  const {
    currency,
    setActiveTab,
    openSupplierDetail,
    setHighlightedNetworkPath,
    setCopilotOpen,
    addToast
  } = useApp();

  const metrics = executiveOverviewMetrics;
  const topRiskSuppliers = mockSuppliers.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Header (Exact prompt specification) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Supply Chain Overview</h1>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wide">
              Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time visibility into supplier, logistics, inventory and production risk.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCopilotOpen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-sky-700 to-indigo-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:from-sky-800 hover:to-indigo-800 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200" />
            AI Executive Briefing
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Export Brief
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Exact prompt specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: Overall Risk */}
        <div 
          onClick={() => setActiveTab('early-warnings')}
          className="bg-white p-3.5 rounded-lg border border-red-200 shadow-xs hover:border-red-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Overall Risk</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {metrics.overallRisk.score}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
              {metrics.overallRisk.status}
            </span>
            <span className="text-[10px] text-red-600 font-medium font-mono">{metrics.overallRisk.change}</span>
          </div>
        </div>

        {/* KPI 2: Suppliers at Risk */}
        <div 
          onClick={() => setActiveTab('suppliers')}
          className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Suppliers at Risk</span>
            <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1.5">
            {metrics.suppliersAtRisk.count}
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
            <span>of {metrics.suppliersAtRisk.total} total</span>
            <span className="font-bold text-red-600">{metrics.suppliersAtRisk.criticalCount} Critical</span>
          </div>
        </div>

        {/* KPI 3: Components at Risk */}
        <div 
          onClick={() => setActiveTab('inventory')}
          className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Components at Risk</span>
            <Cpu className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1.5">
            {metrics.componentsAtRisk.count}
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
            <span>of {metrics.componentsAtRisk.total} parts</span>
            <span className="font-bold text-amber-600">{metrics.componentsAtRisk.singleSourceCount} Single Source</span>
          </div>
        </div>

        {/* KPI 4: Production Exposure */}
        <div 
          onClick={() => setActiveTab('early-warnings')}
          className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Production Exposure</span>
            <Coins className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700 font-mono mt-1.5">
            {currency === 'INR' ? formatCurrency(metrics.productionExposure.amountINR, 'INR') : formatCurrency(metrics.productionExposure.amountUSD, 'USD')}
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
            <span>3 Plants affected</span>
            <span className="font-bold text-rose-600">Elevated</span>
          </div>
        </div>

        {/* KPI 5: Stockout Risk */}
        <div 
          onClick={() => setActiveTab('inventory')}
          className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Stockout Risk</span>
            <Package className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1.5">
            {metrics.stockoutRisk.productsCount} <span className="text-xs font-normal text-slate-500">Products</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
            <span>32.4k customers</span>
            <span className="font-bold text-red-600">&lt;14d buffer</span>
          </div>
        </div>

        {/* KPI 6: Critical Alerts */}
        <div 
          onClick={() => setActiveTab('alerts')}
          className="bg-white p-3.5 rounded-lg border border-red-200 shadow-xs hover:border-red-300 transition-all cursor-pointer group bg-gradient-to-b from-white to-red-50/20"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <span>Critical Alerts</span>
            <Bell className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-600 font-mono mt-1.5">
            {metrics.criticalAlerts.count}
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px]">
            <span className="text-slate-500">3 unacknowledged</span>
            <span className="font-bold text-red-700 bg-red-100 px-1 rounded">Urgent</span>
          </div>
        </div>
      </div>

      {/* Hero Disruption Spotlight Banner: Early Warning Highlight */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-lg p-4 text-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
              CRITICAL EARLY WARNING
            </span>
            <span className="text-xs text-sky-200 font-mono">
              Prediction Confidence: <strong className="text-white">91%</strong>
            </span>
          </div>
          <h2 className="text-sm font-bold text-white leading-snug">
            Supplier X disruption could affect Product Y (EV Powertrain X1)
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span>Disruption ETA: <strong className="text-amber-400 font-mono">12 days</strong></span>
            <span>•</span>
            <span>Affected: <strong className="text-white">Factory 02 (Chennai)</strong></span>
            <span>•</span>
            <span>Revenue Exposure: <strong className="text-red-400 font-mono">{currency === 'INR' ? '₹4.8 Cr' : '$5.8M'}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setHighlightedNetworkPath('sup-02');
              setActiveTab('supply-network');
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold border border-slate-700 transition-colors"
          >
            View Impact Path
          </button>
          <button
            onClick={() => {
              setActiveTab('scenarios');
              addToast('Simulation Loaded', 'Loaded 12-day disruption into Scenario Simulator.', 'info');
            }}
            className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Simulate Response</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Grid: Global Risk Map Teaser + Supply Chain Risk Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Supply Chain Risk Trend (30 Days Chart) */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Supply Chain Risk Trend (30 Days)
              </h3>
              <p className="text-[11px] text-slate-500">
                Composite enterprise index vs target safety threshold (45)
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              Current: 72 (Elevated)
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRiskTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[30, 90]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line type="monotone" dataKey="overallRisk" stroke="#dc2626" strokeWidth={2.5} name="Overall Risk" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="logisticsRisk" stroke="#0284c7" strokeWidth={2} name="Logistics Risk" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="supplierRisk" stroke="#d97706" strokeWidth={2} name="Supplier Risk" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="targetThreshold" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" name="Target Safety Limit" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Risk Map Interactive Preview Card */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Global Risk Distribution
              </h3>
              <p className="text-[11px] text-slate-500">
                Active disruption clusters across maritime ports and supplier hubs
              </p>
            </div>
            <button
              onClick={() => setActiveTab('supply-network')}
              className="text-xs text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              Expand Map
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mini Interactive SVG Graphic representing the Map */}
          <div 
            onClick={() => setActiveTab('supply-network')}
            className="h-44 bg-slate-900 rounded-md p-3 relative cursor-pointer group flex items-center justify-center overflow-hidden border border-slate-800"
          >
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Simulated Hotspots */}
            <div className="absolute left-[72%] top-[45%] flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-red-600 animate-ping absolute" />
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[8px] font-bold flex items-center justify-center relative shadow-lg">
                87
              </span>
              <span className="text-[9px] text-red-200 font-semibold mt-1 bg-slate-900/80 px-1 rounded">Shenzhen</span>
            </div>

            <div className="absolute left-[58%] top-[50%] flex flex-col items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-white text-[8px] font-bold flex items-center justify-center shadow-lg">
                68
              </span>
              <span className="text-[9px] text-amber-200 font-semibold mt-0.5 bg-slate-900/80 px-1 rounded">Mumbai (JNPT)</span>
            </div>

            <div className="absolute left-[62%] top-[55%] flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[8px] font-bold flex items-center justify-center shadow-lg">
                85
              </span>
              <span className="text-[9px] text-red-200 font-semibold mt-0.5 bg-slate-900/80 px-1 rounded">Chennai Factory</span>
            </div>

            <div className="absolute left-[40%] top-[35%] flex flex-col items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold flex items-center justify-center shadow-lg">
                24
              </span>
              <span className="text-[9px] text-emerald-200 font-semibold mt-0.5 bg-slate-900/80 px-1 rounded">Germany Hub</span>
            </div>

            <div className="z-10 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded text-white text-xs font-semibold group-hover:scale-105 transition-transform flex items-center gap-1.5">
              <span>Launch Full Geospatial Map</span>
              <ArrowRight className="w-3 h-3 text-sky-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 text-slate-600">
            <span>High Risk Maritime Lanes: <strong className="text-slate-800">Shenzhen → Mumbai (7d delay)</strong></span>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">9 Nodes Monitored</span>
          </div>
        </div>
      </div>

      {/* Lower Row: Critical Alerts Queue + Top Risk Suppliers Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Critical Alerts (4-question framework matching prompt) */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Critical Disruption Alerts
              </h3>
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded border border-red-200">
                5 Active
              </span>
            </div>
            <button
              onClick={() => setActiveTab('alerts')}
              className="text-xs text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              Alert Center
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {mockAlerts.slice(0, 2).map(alert => (
              <div
                key={alert.id}
                className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{alert.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                  {alert.whatHappened}
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                  <span className="text-amber-700 font-medium">ETA: {alert.impactETA.slice(0, 34)}</span>
                  <span className="font-bold text-rose-700 font-mono">
                    {currency === 'INR' ? formatCurrency(alert.exposureINR, 'INR') : formatCurrency(alert.exposureUSD, 'USD')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('alerts')}
            className="w-full mt-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-xs font-semibold text-slate-700 transition-colors text-center"
          >
            Review All 5 Disruption Alerts
          </button>
        </div>

        {/* Top Risk Suppliers */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Top Risk Suppliers
              </h3>
              <p className="text-[11px] text-slate-500">
                Vendors exhibiting highest composite vulnerability
              </p>
            </div>
            <button
              onClick={() => setActiveTab('suppliers')}
              className="text-xs text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              All 52 Suppliers
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2 font-semibold">Supplier</th>
                  <th className="pb-2 font-semibold">Risk Score</th>
                  <th className="pb-2 font-semibold">Delivery %</th>
                  <th className="pb-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topRiskSuppliers.map(sup => {
                  const badge = getRiskBadgeClasses(sup.riskScore);
                  return (
                    <tr key={sup.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2">
                        <div className="font-semibold text-slate-900">{sup.name}</div>
                        <div className="text-[10px] text-slate-400">{sup.city}, {sup.country}</div>
                      </td>
                      <td className="py-2">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold font-mono border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {sup.riskScore}
                        </span>
                      </td>
                      <td className="py-2 font-mono text-slate-700">
                        {sup.deliveryPerformance}%
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => openSupplierDetail(sup.id)}
                          className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 hover:underline"
                        >
                          Profile →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Critical Sourcing Vulnerability: <strong className="text-red-600">8 Single-Sourced Parts</strong></span>
            <button
              onClick={() => setActiveTab('recommendations')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Alternative Sourcing Engine →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
