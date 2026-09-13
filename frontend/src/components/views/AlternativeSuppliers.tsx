import React, { useState } from 'react';
import {
  GitPullRequestDraft,
  Building2,
  TrendingDown,
  Clock,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Sliders,
  Sparkles,
  FileCheck2,
  FileText,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';
import { mockAlternativeComparisons } from '../../data/mockData';

export const AlternativeSuppliers: React.FC = () => {
  const { currency, addToast, setActiveTab } = useApp();

  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [allocationPct, setAllocationPct] = useState<number>(40); // Move 40% of procurement volume

  const currentCase = mockAlternativeComparisons[selectedCaseIdx] || mockAlternativeComparisons[0];

  // Dynamic calculations based on allocation percentage
  const allocationFactor = allocationPct / 40;
  const dynamicAdditionalCostINR = Number((currentCase.additionalCostINR * allocationFactor).toFixed(1));
  const dynamicAdditionalCostUSD = Number((currentCase.additionalCostUSD * allocationFactor).toFixed(1));
  const dynamicAvoidedLossINR = Number((currentCase.avoidedProductionLossINR * Math.min(1.4, allocationFactor)).toFixed(2));
  const dynamicAvoidedLossUSD = Number((currentCase.avoidedProductionLossUSD * Math.min(1.4, allocationFactor)).toFixed(2));
  const dynamicRoi = Number(((dynamicAvoidedLossINR * 100) / dynamicAdditionalCostINR).toFixed(1));

  const handleExecuteShift = () => {
    addToast(
      'Volume Shift Contract Created',
      `Allocated ${allocationPct}% volume to ${currentCase.recommendedSupplier.name}. Purchase order forwarded to ERP SAP Ariba.`,
      'success'
    );
  };

  const handleGenerateMemo = () => {
    addToast(
      'Procurement Memo Exported',
      'Dual-sourcing business case memo downloaded as Executive Approval PDF.',
      'info'
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Alternative Supplier Intelligence Engine</h1>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wide">
              AI Trade-off Optimization
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated qualification, dual-sourcing economics, and contract volume reallocation for at-risk vendors.
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-2">
          {mockAlternativeComparisons.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCaseIdx(i);
                setAllocationPct(c.suggestedVolumeShiftPct);
              }}
              className={`px-3 py-1.5 text-xs rounded-md font-semibold border transition-all ${
                selectedCaseIdx === i
                  ? 'bg-sky-50 text-sky-800 border-sky-300 ring-1 ring-sky-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.componentName}
            </button>
          ))}
        </div>
      </div>

      {/* Head to Head Comparison Grid (Matches Prompt Specification) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Current At-Risk Supplier */}
        <div className="bg-white rounded-lg border-2 border-red-200 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl">
            Current Disrupted Source
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Primary Contracted Vendor
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {currentCase.currentSupplier.name}
              </h2>
              <div className="text-xs text-slate-500">
                Origin: <span className="font-semibold text-slate-700">{currentCase.currentSupplier.country}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-red-50 rounded-md border border-red-200">
                <div className="text-[10px] font-bold uppercase text-red-600">Risk Score</div>
                <div className="text-xl font-black text-red-700 font-mono mt-0.5">
                  {currentCase.currentSupplier.riskScore}
                </div>
                <div className="text-[10px] text-red-600 font-medium">Critical Threat</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                <div className="text-[10px] font-bold uppercase text-slate-500">Unit Cost</div>
                <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                  {currency === 'INR' ? `₹${currentCase.currentSupplier.unitCostINR}` : `$${currentCase.currentSupplier.unitCostUSD}`}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">per unit</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                <div className="text-[10px] font-bold uppercase text-slate-500">Lead Time</div>
                <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                  {currentCase.currentSupplier.leadTimeDays}d
                </div>
                <div className="text-[10px] text-rose-600 font-medium">+7d delay transit</div>
              </div>
            </div>

            <div className="p-3 bg-red-50/50 border border-red-200 rounded-md text-xs text-red-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                Vulnerability Assessment:
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Yantian port dwell time congestion and regional typhoon warnings are preventing cargo vessel clearance. Buffer stock expires in 11 days.
              </p>
            </div>
          </div>
        </div>

        {/* Right: AI Recommended Alternative Supplier */}
        <div className="bg-white rounded-lg border-2 border-emerald-300 p-5 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl">
            AI Recommended Alternative
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Qualified Secondary Partner
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">
                {currentCase.recommendedSupplier.name}
              </h2>
              <div className="text-xs text-slate-500">
                Origin: <span className="font-semibold text-slate-700">{currentCase.recommendedSupplier.country}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200">
                <div className="text-[10px] font-bold uppercase text-emerald-700">Risk Score</div>
                <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                  {currentCase.recommendedSupplier.riskScore}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">Low Risk</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                <div className="text-[10px] font-bold uppercase text-slate-500">Unit Cost</div>
                <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                  {currency === 'INR' ? `₹${currentCase.recommendedSupplier.unitCostINR}` : `$${currentCase.recommendedSupplier.unitCostUSD}`}
                </div>
                <div className="text-[10px] text-amber-600 font-medium">+8% premium</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200">
                <div className="text-[10px] font-bold uppercase text-emerald-700">Lead Time</div>
                <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">
                  {currentCase.recommendedSupplier.leadTimeDays}d
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">-11 days faster</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                <div className="text-[10px] font-bold uppercase text-slate-500">Available Cap.</div>
                <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
                  {currentCase.recommendedSupplier.capacity}%
                </div>
                <div className="text-[10px] text-slate-500 font-medium">Immediate ramp</div>
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Audit & Compliance Readiness:
              </div>
              <ul className="space-y-1 text-xs text-slate-700">
                {currentCase.qualifications.map((q, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Volume Allocation & Clear Business Trade-off Box */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-lg p-5 text-white shadow-md border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h3 className="text-sm font-bold text-white">
                AI Recommendation: Move {allocationPct}% Procurement Volume to {currentCase.recommendedSupplier.name}
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Quantified business trade-off between marginal unit purchase price and avoided factory stoppage penalties.
            </p>
          </div>

          <span className="text-xs font-mono font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30 px-3 py-1 rounded">
            ROI Multiplier: {dynamicRoi}x
          </span>
        </div>

        {/* Volume Allocation Slider */}
        <div className="space-y-2 bg-slate-800/80 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Reallocate Procurement Volume to Secondary Supplier:</span>
            <span className="text-sm font-bold text-sky-400 font-mono">
              {allocationPct}% Shifted
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={allocationPct}
            onChange={e => setAllocationPct(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>10% (Emergency sample)</span>
            <span>40% (Recommended balance)</span>
            <span>60% (High risk hedge)</span>
            <span>80% (Primary swap)</span>
          </div>
        </div>

        {/* Trade-off Financial Balance Sheet (Prompt Specifications) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-800/90 p-3.5 rounded-lg border border-slate-700">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Additional Procurement Cost
            </div>
            <div className="text-xl font-bold text-amber-300 font-mono mt-1">
              {currency === 'INR' ? formatCurrency(dynamicAdditionalCostINR, 'INR', { isLakhOrThousand: true }) : formatCurrency(dynamicAdditionalCostUSD, 'USD', { isLakhOrThousand: true })}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">8% premium on shifted volume</div>
          </div>

          <div className="bg-slate-800/90 p-3.5 rounded-lg border border-slate-700">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Estimated Avoided Production Loss
            </div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
              {currency === 'INR' ? formatCurrency(dynamicAvoidedLossINR, 'INR') : formatCurrency(dynamicAvoidedLossUSD, 'USD')}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Plant idle & OEM SLA penalties</div>
          </div>

          <div className="bg-slate-800/90 p-3.5 rounded-lg border border-slate-700">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Net Financial Protection
            </div>
            <div className="text-xl font-bold text-white font-mono mt-1">
              {currency === 'INR' 
                ? `₹${(dynamicAvoidedLossINR - dynamicAdditionalCostINR * 0.01).toFixed(2)} Cr` 
                : `$${(dynamicAvoidedLossUSD - dynamicAdditionalCostUSD * 0.001).toFixed(2)}M`}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5">Positive enterprise ROI</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
          <button
            onClick={handleGenerateMemo}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            Download Approval Memo
          </button>
          <button
            onClick={handleExecuteShift}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Authorize {allocationPct}% Volume Reallocation
          </button>
        </div>
      </div>
    </div>
  );
};
