import React from 'react';
import {
  X,
  Building2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Clock,
  Coins,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Sliders,
  GitPullRequestDraft,
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
  CartesianGrid
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Supplier } from '../../types';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';

interface SupplierDetailModalProps {
  supplier: Supplier;
  onClose: () => void;
}

export const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ supplier, onClose }) => {
  const { currency, setActiveTab, setHighlightedNetworkPath, addToast } = useApp();

  const badge = getRiskBadgeClasses(supplier.riskScore);

  const riskCategories = [
    { label: 'Financial Risk', value: supplier.riskBreakdown.financial },
    { label: 'Delivery Risk', value: supplier.riskBreakdown.delivery },
    { label: 'Geopolitical Risk', value: supplier.riskBreakdown.geopolitical },
    { label: 'Weather Risk', value: supplier.riskBreakdown.weather },
    { label: 'Transportation Risk', value: supplier.riskBreakdown.transportation },
    { label: 'Cyber Risk', value: supplier.riskBreakdown.cyber },
    { label: 'Capacity Risk', value: supplier.riskBreakdown.capacity }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-700 text-white flex items-center justify-center font-bold text-sm">
              {supplier.countryCode}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{supplier.name}</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                  {supplier.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {supplier.city}, {supplier.country} • Code: {supplier.code} • Annual Spend:{' '}
                <strong className="text-slate-700">
                  {currency === 'INR' ? `₹${supplier.spendAnnualINR} Cr` : `$${supplier.spendAnnualUSD}M`}
                </strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Top Metric Cards (Prompt specifications) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Risk Score</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                {supplier.riskScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Components</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                {supplier.affectedComponents.length}
              </div>
              <div className="text-[10px] text-slate-500">affected</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Products</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                {supplier.affectedProducts.length}
              </div>
              <div className="text-[10px] text-slate-500">affected</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-400">Factories</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                {supplier.affectedFactories.length}
              </div>
              <div className="text-[10px] text-slate-500">affected</div>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold uppercase text-amber-700">Coverage</div>
              <div className="text-2xl font-black text-amber-800 font-mono mt-0.5">
                {supplier.inventoryCoverageDays}d
              </div>
              <div className="text-[10px] text-amber-700 font-medium">buffer stock</div>
            </div>
          </div>

          {/* 7-Dimensional Risk Breakdown (Exact prompt requirement) */}
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              7-Dimension Risk Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {riskCategories.map((cat, idx) => {
                const isHigh = cat.value >= 75;
                const isMedium = cat.value >= 50 && cat.value < 75;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                      <span>{cat.label}</span>
                      <span className={`font-mono font-bold ${isHigh ? 'text-red-600' : isMedium ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {cat.value} / 100
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isHigh ? 'bg-red-500' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${cat.value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Historical Risk Trend (Prompt specification) */}
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Historical Risk Score Trend (6 Months)
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Monthly Audit Points</span>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={supplier.historicalTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#ea580c" strokeWidth={2.5} dot={{ r: 3 }} name="Risk Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Action Box (Exact prompt requirement) */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              AI Recommended Action
            </div>
            <p className="text-xs font-semibold text-amber-950 leading-relaxed">
              {supplier.recommendedAction}
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span>Contact: <strong className="text-slate-900">{supplier.contact.lead}</strong></span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 font-mono text-[11px]">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {supplier.contact.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {supplier.contact.phone}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              setHighlightedNetworkPath(supplier.id);
              setActiveTab('supply-network');
              onClose();
            }}
            className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            View in Supply Network Graph
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('scenarios');
                onClose();
                addToast('Simulator Loaded', `Loaded ${supplier.name} into What-If Simulator.`, 'info');
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              Simulate Failure
            </button>
            <button
              onClick={() => {
                setActiveTab('recommendations');
                onClose();
                addToast('Alternative Sourcing', `Evaluating secondary sources for ${supplier.name}.`, 'info');
              }}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <GitPullRequestDraft className="w-3.5 h-3.5" />
              Diversify Procurement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
