import React, { useState } from 'react';
import {
  FileBarChart,
  FileDown,
  Share2,
  Printer,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Coins,
  Cpu,
  Truck,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

interface ReportDoc {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  keyMetric: string;
  status: 'Ready' | 'Scheduled';
}

export const ReportsView: React.FC = () => {
  const { currency, addToast } = useApp();

  const reports: ReportDoc[] = [
    {
      id: 'rep-01',
      title: 'Daily Supply Chain Risk & Disruption Briefing',
      category: 'Daily Risk Report',
      date: 'Today, 06:00 IST',
      summary: 'Comprehensive morning assessment of maritime vessel arrival delays, sole-source component buffers, and Tier-1 credit deterioration.',
      keyMetric: `3 Active Alerts • ${currency === 'INR' ? '₹8.4 Cr' : '$10.1M'} Production Exposure`,
      status: 'Ready'
    },
    {
      id: 'rep-02',
      title: 'Global Supplier Risk & Solvency Audit Q3',
      category: 'Supplier Risk Report',
      date: '05 Sep 2026',
      summary: 'Detailed financial health breakdown of 52 active Tier-1 and Tier-2 suppliers across India, China, Japan, Taiwan, and Germany.',
      keyMetric: '5 Critical Suppliers • 14 Single-Source Vulnerabilities',
      status: 'Ready'
    },
    {
      id: 'rep-03',
      title: 'Plant Production Exposure & Revenue At Risk',
      category: 'Production Exposure Report',
      date: '04 Sep 2026',
      summary: 'Factory-by-factory exposure matrix mapping assembly line starvation horizons across Chennai EV Gigafactory and Pune Complex.',
      keyMetric: '12,400 Commercial Deliveries Threatened',
      status: 'Ready'
    },
    {
      id: 'rep-04',
      title: 'Logistics Corridors & Port Dwell Analysis',
      category: 'Logistics Risk Report',
      date: '03 Sep 2026',
      summary: 'AIS shipping telemetry report tracking container dwell times at Port Yantian (Shenzhen) and Nhava Sheva (JNPT Mumbai).',
      keyMetric: '+7 Days Maritime Delay on Core Power Controllers',
      status: 'Ready'
    },
    {
      id: 'rep-05',
      title: 'Executive Board Summary: Q3 Supply Chain Resilience',
      category: 'Executive Summary',
      date: '01 Sep 2026',
      summary: 'Strategic C-suite briefing on supply chain dual-sourcing progress, ROI on alternate vendors, and capital expenditure hedging.',
      keyMetric: '13.3x ROI on Titan Precision Dual-Sourcing',
      status: 'Ready'
    }
  ];

  const [activeReport, setActiveReport] = useState<ReportDoc>(reports[0]);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleExportPDF = () => {
    window.print();
    addToast('PDF Print Triggered', `Generating formatted PDF for "${activeReport.title}".`, 'success');
  };

  const handleExportCSV = () => {
    addToast('CSV Downloaded', `Exported raw telemetry for "${activeReport.title}".`, 'success');
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Executive Reports & Intelligence Briefings</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              Audit Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Board-level resilience dossiers, supplier risk audits, and factory downtime liability reports.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV
          </button>
          <button
            onClick={handleShare}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            Share Report
          </button>
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Grid: Report Selector + Document Previewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Reports List (Prompt Specifications) */}
        <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Standard Reports Dossiers
          </div>
          {reports.map((rep) => {
            const isSelected = activeReport.id === rep.id;
            return (
              <div
                key={rep.id}
                onClick={() => setActiveReport(rep)}
                className={`p-3 rounded-lg border cursor-pointer transition-all text-xs space-y-1 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/50 shadow-2xs ring-1 ring-sky-300'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-sky-700 uppercase tracking-wider">{rep.category}</span>
                  <span className="text-slate-400 font-mono">{rep.date}</span>
                </div>
                <div className="font-bold text-slate-900 leading-snug">
                  {rep.title}
                </div>
                <div className="text-[11px] font-mono text-slate-600 truncate font-semibold">
                  {rep.keyMetric}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Formatted Document Preview (Executive Style) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6 shadow-xs space-y-5 text-xs">
          {/* Document Header */}
          <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase text-sky-700 font-bold">
                ChainSentinel AI • Confidential Executive Dossier
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-1">
                {activeReport.title}
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">
                Target Entity: <strong className="text-slate-800">Bharat Mobility & Industrial Group</strong> • Generated: {activeReport.date}
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
              Audit Status: Verified
            </span>
          </div>

          {/* Executive Summary Paragraph */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Executive Abstract
            </div>
            <p className="text-slate-800 leading-relaxed font-medium">
              {activeReport.summary}
            </p>
          </div>

          {/* Key Findings Matrix */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Key Risk Findings & Telemetry Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <div className="text-[10px] font-bold uppercase text-rose-700">Production Exposure</div>
                <div className="text-lg font-black text-rose-800 font-mono mt-0.5">
                  {currency === 'INR' ? '₹8.40 Cr' : '$10.10M'}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Line 1 & Line 3 at risk</div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-[10px] font-bold uppercase text-amber-700">Buffer Horizon</div>
                <div className="text-lg font-black text-amber-800 font-mono mt-0.5">
                  11 Days
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Stockout before arrival</div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="text-[10px] font-bold uppercase text-emerald-700">Avoidable Loss</div>
                <div className="text-lg font-black text-emerald-800 font-mono mt-0.5">
                  {currency === 'INR' ? '₹7.40 Cr' : '$8.90M'}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Via Titan Precision shift</div>
              </div>
            </div>
          </div>

          {/* Actionable Playbook Execution Steps */}
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Procurement & Operations Next Steps
            </h3>
            <ul className="space-y-1.5 text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Execute 40% PO reallocation to Titan Precision Instruments under Framework Agreement.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Reserve emergency 5,000-unit air cargo charter batch via Tokyo Haneda gateway.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Place customs liaison on standby at Nhava Sheva (JNPT) terminal for manual Bill of Entry clearance.</span>
              </li>
            </ul>
          </div>

          {/* Signoff block */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-slate-400 text-[11px]">
            <div>Prepared by: <strong>ChainSentinel Autonomous Risk Engine</strong></div>
            <div>Approved by: <strong>Rohit Kumar, VP Supply Chain</strong></div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Share Report with Leadership</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-mono"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Generate a secure, encrypted link with role-based access for stakeholders:
            </p>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-md font-mono text-xs text-slate-700 select-all">
              https://chainsentinel.ai/reports/share/{activeReport.id}?token=auth_7f1a3b4
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://chainsentinel.ai/reports/share/${activeReport.id}?token=auth_7f1a3b4`);
                  setShowShareModal(false);
                  addToast('Link Copied', 'Encrypted report URL copied to clipboard.', 'success');
                }}
                className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-xs font-semibold"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
