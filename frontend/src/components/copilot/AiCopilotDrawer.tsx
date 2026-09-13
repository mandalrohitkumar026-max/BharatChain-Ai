import React, { useState } from 'react';
import {
  X,
  Bot,
  Send,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Sliders,
  Building2,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

interface CopilotResponse {
  id: string;
  query: string;
  finding: string;
  evidence: string[];
  impact: string;
  recommendation: string;
  actions: {
    label: string;
    type: 'simulate' | 'create_action' | 'view_supplier' | 'network';
    targetId?: string;
  }[];
}

export const AiCopilotDrawer: React.FC = () => {
  const {
    copilotOpen,
    setCopilotOpen,
    currency,
    setActiveTab,
    openSupplierDetail,
    setHighlightedNetworkPath,
    addToast
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<CopilotResponse[]>([
    {
      id: 'msg-init',
      query: 'Which suppliers are most dangerous right now?',
      finding: 'Shenzhen Micro Dynamics (Supplier X) and ABC Components Ltd exhibit critical vulnerability signals threatening line stoppages across Chennai and Pune assembly hubs.',
      evidence: [
        'Shenzhen Micro: Port Yantian container dwell times spiked +42% with typhoon warning; +7 days shipping delay on GaN power controllers.',
        'ABC Components: Altman Z-score degraded to 1.38 (Distress zone) with 2 working capital credit lines curtailed.',
        'Both suppliers control 8 sole-sourced components with less than 12 days safety stock on site.'
      ],
      impact: `Immediate production exposure of ${currency === 'INR' ? '₹8.4 Cr' : '$10.1M'} across EV Powertrain X1 (12,400 customers) and Telematics ECU lines within 12–16 days.`,
      recommendation: 'Initiate immediate 40%–60% volume shift to qualified secondary sources (Titan Precision Instruments & GlobalTech Japan) and secure air-freight buffer consignment.',
      actions: [
        { label: 'Simulate Response', type: 'simulate' },
        { label: 'View Supplier Profile', type: 'view_supplier', targetId: 'sup-02' },
        { label: 'Highlight Network Path', type: 'network', targetId: 'sup-02' }
      ]
    }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!copilotOpen) return null;

  const quickPrompts = [
    'Which suppliers are most dangerous right now?',
    'What products could face shortages next month?',
    'What happens if Supplier X fails?',
    'Find all single-source components.',
    'Which supplier should we diversify first?',
    'Give me the cheapest mitigation strategy.'
  ];

  const handleQuery = (queryText: string) => {
    if (!queryText.trim()) return;
    setIsAnalyzing(true);
    setInput('');

    setTimeout(() => {
      let response: CopilotResponse;
      const q = queryText.toLowerCase();

      if (q.includes('what happens if supplier x fails') || q.includes('supplier x')) {
        response = {
          id: Math.random().toString(),
          query: queryText,
          finding: 'A 30-day failure of Supplier X (Shenzhen Micro Dynamics) triggers an immediate cascading starvation of Factory 02 Chennai assembly.',
          evidence: [
            'Current inventory on-hand: 18,000 units (12 days buffer remaining).',
            'No incoming sea freight arriving before Day 19 due to Yantian port congestion.',
            'GaN 800V Controller is currently single-sourced with 0 local secondary inventory.'
          ],
          impact: `Production stoppage by Day 13; -14% total vehicle production output; ${currency === 'INR' ? '₹8.2 Cr' : '$9.8M'} revenue at risk; 12,400 vehicle deliveries deferred.`,
          recommendation: 'Execute emergency qualification with Titan Precision (Bengaluru) at ₹108/unit (7-day lead time) for 40% volume, and air freight 5,000 units from GlobalTech Tokyo.',
          actions: [
            { label: 'Simulate 30-Day Failure', type: 'simulate' },
            { label: 'Execute Dual-Sourcing Plan', type: 'create_action' },
            { label: 'View Downstream Path', type: 'network', targetId: 'sup-02' }
          ]
        };
      } else if (q.includes('single-source') || q.includes('single source')) {
        response = {
          id: Math.random().toString(),
          query: queryText,
          finding: 'Identified 14 single-source components across 3 critical vehicle architectures with zero pre-qualified backup.',
          evidence: [
            'Component PC-800V-X4 (Power Controller) solely manufactured by Shenzhen Micro.',
            'Component ASIC-BMS-16C (BMS Balancing ASIC) produced exclusively in Hsinchu, Taiwan.',
            'Average requalification and PPAP cycle time for automotive grade silicon is 42 days.'
          ],
          impact: `Combined downstream value at risk exceeds ${currency === 'INR' ? '₹24.5 Cr' : '$29.4M'} if any maritime or fab disruption exceeds 14 days.`,
          recommendation: 'Contractual dual-sourcing mandate: accelerate tooling replication with Titan Precision and Osaka Cleanrooms under Framework Agreement Section 8.',
          actions: [
            { label: 'Open Components Catalog', type: 'create_action' },
            { label: 'Simulate Dual-Source Economics', type: 'simulate' }
          ]
        };
      } else if (q.includes('cheapest') || q.includes('mitigation')) {
        response = {
          id: Math.random().toString(),
          query: queryText,
          finding: 'Optimal Cost-to-Risk trade-off achieved by transferring 40% allocation to Titan Precision Instruments.',
          evidence: [
            'Titan unit price is ₹108 vs Shenzhen ₹100 (+8% unit premium).',
            'Lead time drops from 18 days to 7 days (61% reduction in pipeline inventory).',
            'Zero foreign currency volatility and zero maritime demurrage risk.'
          ],
          impact: `Additional procurement expense: ${currency === 'INR' ? '₹12.8 Lakhs' : '$15.4K'}. Avoided factory downtime and penalty losses: ${currency === 'INR' ? '₹1.70 Crores' : '$2.05M'} (ROI Multiplier: 13.3x).`,
          recommendation: 'Approve immediate PO reallocation for 4,200 units/week to Titan Precision.',
          actions: [
            { label: 'Authorize Allocation Shift', type: 'create_action' },
            { label: 'View Trade-off Model', type: 'simulate' }
          ]
        };
      } else if (q.includes('shortage') || q.includes('next month')) {
        response = {
          id: Math.random().toString(),
          query: queryText,
          finding: 'Three product lines face confirmed component deficits within the next 28 days unless corrective logistics are initiated.',
          evidence: [
            'Product Y (EV Powertrain X1): Power Controller stockouts at Day 12.',
            'Product 05 (75 kWh Battery Pack): BMS ASIC stockouts at Day 15.',
            'Product 03 (Telematics Gen-4): Microcontroller buffer expires at Day 16.'
          ],
          impact: `Factory 01 (Pune) and Factory 02 (Chennai) will idle Line 2 and Line 4, impacting 21,300 scheduled vehicles.`,
          recommendation: 'Issue immediate emergency air charter for 15,000 ASICs from Tokyo and divert European vessel to Nhava Sheva express berth.',
          actions: [
            { label: 'Open Scenario Simulator', type: 'simulate' },
            { label: 'Review Affected Products', type: 'network', targetId: 'sup-01' }
          ]
        };
      } else {
        response = {
          id: Math.random().toString(),
          query: queryText,
          finding: `Dynamic analysis of "${queryText}": Multiple multi-tier risk indicators mapped across active supply lines.`,
          evidence: [
            'Correlation detected between Pearl River weather advisory and Mumbai port vessel arrival schedules.',
            'Tier-1 financial solvency metrics in Western India industrial corridors show localized cash flow stress.',
            'Buffer stock coverage currently tracks below minimum target safety levels for 34 parts.'
          ],
          impact: `Potential enterprise production exposure currently estimated at ${currency === 'INR' ? '₹8.4 Cr' : '$10.1M'} across 3 assembly plants.`,
          recommendation: 'Audit critical inventory buffers, engage qualified secondary vendors, and simulate production impact curves.',
          actions: [
            { label: 'Run What-If Simulation', type: 'simulate' },
            { label: 'Inspect Supply Network', type: 'network', targetId: 'sup-02' }
          ]
        };
      }

      setMessages(prev => [response, ...prev]);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleAction = (action: CopilotResponse['actions'][0]) => {
    if (action.type === 'simulate') {
      setActiveTab('scenarios');
      setCopilotOpen(false);
      addToast('Scenario Loaded', 'Pre-configured simulation parameters transferred to Scenario Simulator.', 'info');
    } else if (action.type === 'view_supplier') {
      if (action.targetId) {
        openSupplierDetail(action.targetId);
      } else {
        setActiveTab('suppliers');
      }
      setCopilotOpen(false);
    } else if (action.type === 'network') {
      setHighlightedNetworkPath(action.targetId || 'sup-02');
      setActiveTab('supply-network');
      setCopilotOpen(false);
      addToast('Network Path Highlighted', 'Full downstream disruption propagation path active.', 'info');
    } else if (action.type === 'create_action') {
      addToast('Action Created', 'Mitigation task assigned to Procurement Operations Taskforce.', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setCopilotOpen(false)}
        className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 to-sky-950 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight">AI Supply Chain Copilot</h3>
                  <span className="text-[10px] bg-sky-400/20 text-sky-200 font-mono px-1.5 py-0.2 rounded border border-sky-400/30">
                    Enterprise Engine v4.2
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Continuous reasoning across suppliers, transit telemetry, inventories, and plant capacity
                </p>
              </div>
            </div>
            <button
              onClick={() => setCopilotOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-sky-600" />
              Executive Inquiries
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuery(prompt)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 transition-all text-left shadow-2xs"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Content / Conversation Stream */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {isAnalyzing && (
              <div className="p-4 rounded-lg bg-sky-50/70 border border-sky-200 flex items-center gap-3 text-xs text-sky-900 animate-pulse">
                <Bot className="w-5 h-5 text-sky-700 animate-spin" />
                <div>
                  <div className="font-semibold">Synthesizing multi-tier supply chain telemetry...</div>
                  <div className="text-[11px] text-sky-700">Evaluating BOM dependencies, shipping dwell times, and cash-flow health</div>
                </div>
              </div>
            )}

            {messages.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-lg bg-white shadow-xs overflow-hidden">
                {/* User Query Banner */}
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-sky-600" />
                    Query: &ldquo;{item.query}&rdquo;
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Structured Response</span>
                </div>

                <div className="p-4 space-y-3.5 text-xs">
                  {/* Finding */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Finding
                    </div>
                    <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 font-medium leading-relaxed">
                      {item.finding}
                    </div>
                  </div>

                  {/* Evidence */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-sky-600" />
                      Telemetry Evidence
                    </div>
                    <ul className="space-y-1.5 text-slate-700 pl-1">
                      {item.evidence.map((ev, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-rose-600" />
                      Business Impact
                    </div>
                    <div className="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-rose-900 font-medium leading-relaxed">
                      {item.impact}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      Recommended Action
                    </div>
                    <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium leading-relaxed">
                      {item.recommendation}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase mr-1">
                      Actions:
                    </span>
                    {item.actions.map((act, actIdx) => (
                      <button
                        key={actIdx}
                        onClick={() => handleAction(act)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 font-semibold text-xs transition-colors shadow-2xs"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3 text-sky-700" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Input Field */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleQuery(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask anything about suppliers, disruption ETA, single-source risks, costs..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2 border border-slate-200 rounded-md text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-600 focus:border-sky-600"
              />
              <button
                type="submit"
                disabled={!input.trim() || isAnalyzing}
                className="px-4 py-2 bg-sky-700 text-white rounded-md text-xs font-semibold hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Analyze</span>
              </button>
            </form>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              Powered by ChainSentinel Multi-Tier Disruption Graph & Heuristic Risk Reasoning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
