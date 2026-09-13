import React, { useState } from 'react';
import {
  Network,
  Building2,
  Cpu,
  Factory as FactoryIcon,
  Package,
  Warehouse,
  Users,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Clock,
  Coins,
  CheckCircle2,
  Filter,
  RefreshCw,
  Search,
  Sliders,
  GitPullRequestDraft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';

interface NetworkNode {
  id: string;
  type: 'supplier' | 'component' | 'factory' | 'product' | 'warehouse' | 'customer';
  label: string;
  subLabel: string;
  riskScore: number;
  status: 'critical' | 'high' | 'medium' | 'low';
  daysLeft?: number;
  revenueExposureINR?: number;
  revenueExposureUSD?: number;
  customerCount?: number;
  tier: number;
}

interface NetworkConnection {
  from: string;
  to: string;
  isHighRisk?: boolean;
}

export const SupplyNetwork: React.FC = () => {
  const {
    currency,
    highlightedNetworkPath,
    setHighlightedNetworkPath,
    setActiveTab,
    openSupplierDetail,
    addToast
  } = useApp();

  const [selectedNodeId, setSelectedNodeId] = useState<string>(highlightedNetworkPath || 'sup-02');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Structured multi-tier nodes
  const nodes: NetworkNode[] = [
    // TIER 1: SUPPLIERS
    { id: 'sup-02', type: 'supplier', label: 'Supplier X (Shenzhen Micro)', subLabel: 'Shenzhen, China • Tier 1', riskScore: 87, status: 'critical', tier: 1 },
    { id: 'sup-01', type: 'supplier', label: 'ABC Components Ltd', subLabel: 'Pune, India • Tier 1', riskScore: 86, status: 'critical', tier: 1 },
    { id: 'sup-06', type: 'supplier', label: 'Hsinchu Silicon Foundries', subLabel: 'Hsinchu, Taiwan • Tier 1', riskScore: 74, status: 'high', tier: 1 },
    { id: 'sup-03', type: 'supplier', label: 'Titan Precision (Backup)', subLabel: 'Bengaluru, India • Tier 2', riskScore: 21, status: 'low', tier: 1 },
    { id: 'sup-04', type: 'supplier', label: 'GlobalTech Semi (Backup)', subLabel: 'Tokyo, Japan • Tier 1', riskScore: 32, status: 'low', tier: 1 },

    // TIER 2: RAW MATERIALS / COMPONENTS
    { id: 'cmp-01', type: 'component', label: 'Component A (Power Controller 800V)', subLabel: 'AEC-Q101 GaN Inverter Driver', riskScore: 88, status: 'critical', daysLeft: 11, tier: 2 },
    { id: 'cmp-02', type: 'component', label: 'Microcontroller Telematics Core', subLabel: '32-Bit Lockstep CAN-FD', riskScore: 84, status: 'critical', daysLeft: 12, tier: 2 },
    { id: 'cmp-04', type: 'component', label: 'BMS Cell Balancing ASIC', subLabel: '16-Channel High-Voltage', riskScore: 78, status: 'high', daysLeft: 11, tier: 2 },
    { id: 'cmp-07', type: 'component', label: 'Die-Cast Aluminum Enclosure', subLabel: 'IP67 Liquid Cooled', riskScore: 42, status: 'medium', daysLeft: 16, tier: 2 },

    // TIER 3: FACTORIES
    { id: 'fac-02', type: 'factory', label: 'Factory 02 (Chennai EV Plant)', subLabel: 'Sriperumbudur Hub • Line 1 & 3', riskScore: 85, status: 'critical', tier: 3 },
    { id: 'fac-01', type: 'factory', label: 'Factory 01 (Pune Powertrain)', subLabel: 'Chakan MIDC • Line 2', riskScore: 76, status: 'high', tier: 3 },
    { id: 'fac-03', type: 'factory', label: 'Factory 03 (Gurgaon Electronics)', subLabel: 'Manesar Complex • Line 4', riskScore: 48, status: 'medium', tier: 3 },

    // TIER 4: PRODUCTS
    { id: 'prd-01', type: 'product', label: 'Product Y (EV Powertrain X1)', subLabel: '800V High-Efficiency System', riskScore: 89, status: 'critical', revenueExposureINR: 4.8, revenueExposureUSD: 5.8, customerCount: 12400, tier: 4 },
    { id: 'prd-05', type: 'product', label: 'Battery Pack Pro 75kWh', subLabel: 'Liquid Cooled Traction Pack', riskScore: 78, status: 'high', revenueExposureINR: 3.2, revenueExposureUSD: 3.9, customerCount: 8900, tier: 4 },
    { id: 'prd-03', type: 'product', label: 'Telematics Control Unit Gen-4', subLabel: 'Connected Vehicle Telematics', riskScore: 62, status: 'medium', revenueExposureINR: 2.1, revenueExposureUSD: 2.5, customerCount: 14000, tier: 4 },

    // TIER 5: WAREHOUSES & HUBS
    { id: 'wh-01', type: 'warehouse', label: 'Central Finished Goods Hub', subLabel: 'Bhiwandi Logistic Park', riskScore: 64, status: 'high', tier: 5 },
    { id: 'wh-02', type: 'warehouse', label: 'Southern Distribution Hub', subLabel: 'Oragadam Warehouse #4', riskScore: 79, status: 'critical', tier: 5 },

    // TIER 6: END CUSTOMERS
    { id: 'cst-01', type: 'customer', label: '12,400 Commercial & OEM Customers', subLabel: 'Tier-1 Automakers & Fleet Operators', riskScore: 88, status: 'critical', customerCount: 12400, tier: 6 }
  ];

  // Connections mapping upstream -> downstream
  const connections: NetworkConnection[] = [
    { from: 'sup-02', to: 'cmp-01', isHighRisk: true },
    { from: 'sup-01', to: 'cmp-02', isHighRisk: true },
    { from: 'sup-06', to: 'cmp-04', isHighRisk: true },
    { from: 'sup-03', to: 'cmp-01', isHighRisk: false },
    { from: 'sup-04', to: 'cmp-04', isHighRisk: false },

    { from: 'cmp-01', to: 'fac-02', isHighRisk: true },
    { from: 'cmp-01', to: 'fac-01', isHighRisk: true },
    { from: 'cmp-02', to: 'fac-03', isHighRisk: true },
    { from: 'cmp-04', to: 'fac-02', isHighRisk: true },
    { from: 'cmp-07', to: 'fac-01', isHighRisk: false },

    { from: 'fac-02', to: 'prd-01', isHighRisk: true },
    { from: 'fac-02', to: 'prd-05', isHighRisk: true },
    { from: 'fac-01', to: 'prd-01', isHighRisk: true },
    { from: 'fac-03', to: 'prd-03', isHighRisk: false },

    { from: 'prd-01', to: 'wh-02', isHighRisk: true },
    { from: 'prd-05', to: 'wh-02', isHighRisk: true },
    { from: 'prd-03', to: 'wh-01', isHighRisk: false },

    { from: 'wh-02', to: 'cst-01', isHighRisk: true }
  ];

  // Compute downstream nodes given active selection
  const getDownstreamNodes = (startNodeId: string): Set<string> => {
    const visited = new Set<string>([startNodeId]);
    const queue = [startNodeId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      connections
        .filter(conn => conn.from === current)
        .forEach(conn => {
          if (!visited.has(conn.to)) {
            visited.add(conn.to);
            queue.push(conn.to);
          }
        });
    }
    return visited;
  };

  const downstreamSet = getDownstreamNodes(selectedNodeId);

  // Group nodes by tier
  const tiers = [
    { tier: 1, title: 'Tier 1 / Suppliers', icon: Building2 },
    { tier: 2, title: 'Raw Material / Components', icon: Cpu },
    { tier: 3, title: 'Manufacturing Plants', icon: FactoryIcon },
    { tier: 4, title: 'Finished Products', icon: Package },
    { tier: 5, title: 'Warehousing & Logistics', icon: Warehouse },
    { tier: 6, title: 'End Customers / Demand', icon: Users },
  ];

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setHighlightedNetworkPath(nodeId);
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Interactive Supply Chain Network</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              Signature Graph
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multi-tier dependency mapping from raw supplier origin to final customer delivery.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Preset Disruption Scenarios:</span>
          <button
            onClick={() => handleSelectNode('sup-02')}
            className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all border ${
              selectedNodeId === 'sup-02'
                ? 'bg-red-50 text-red-800 border-red-300 ring-1 ring-red-400'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Supplier X Disruption (Shenzhen)
          </button>
          <button
            onClick={() => handleSelectNode('sup-01')}
            className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all border ${
              selectedNodeId === 'sup-01'
                ? 'bg-red-50 text-red-800 border-red-300 ring-1 ring-red-400'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            ABC Components (Pune)
          </button>
          <button
            onClick={() => handleSelectNode('sup-06')}
            className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all border ${
              selectedNodeId === 'sup-06'
                ? 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Hsinchu Silicon (Taiwan)
          </button>
        </div>
      </div>

      {/* Signature Telemetry Impact Banner (Prompt Specifications) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-lg p-4 text-white shadow-md border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                Active Downstream Disruption Path
              </span>
            </div>

            {/* Impact Path Flow */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-sky-300">
                Supplier X (Shenzhen Micro)
              </span>
              <span className="text-red-400 font-bold">↓</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300">
                Component A (Power Controller)
              </span>
              <span className="text-red-400 font-bold">↓</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-orange-300">
                Factory 02 (Chennai EV Plant)
              </span>
              <span className="text-red-400 font-bold">↓</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-rose-300">
                Product Y (EV Powertrain X1)
              </span>
              <span className="text-red-400 font-bold">↓</span>
              <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-600 text-red-200 font-bold">
                12,400 customers
              </span>
            </div>
          </div>

          {/* Key Metric Badges */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Disruption ETA</div>
              <div className="text-sm font-bold text-amber-400 font-mono">12 days</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Revenue at Risk</div>
              <div className="text-sm font-bold text-red-400 font-mono">
                {currency === 'INR' ? '₹4.8 Cr' : '$5.8M'}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Inventory Remaining</div>
              <div className="text-sm font-bold text-amber-400 font-mono">11 days</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Risk Level</div>
              <span className="inline-block px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold">
                Critical
              </span>
            </div>
          </div>
        </div>

        {/* Quick Mitigation Triggers */}
        <div className="mt-3 pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="text-slate-300 text-xs">
            Recommended Mitigation: <span className="text-white font-semibold">Move 60% procurement volume to Titan Precision / GlobalTech Japan.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('scenarios');
                addToast('Scenario Simulator', 'Loaded 30-day Supplier X disruption into Simulator.', 'info');
              }}
              className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3 h-3" />
              Simulate Response
            </button>
            <button
              onClick={() => {
                setActiveTab('recommendations');
                addToast('Alternative Sourcing', 'Opening dual-sourcing comparison matrix.', 'info');
              }}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <GitPullRequestDraft className="w-3 h-3" />
              Alternative Sourcing
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Tier Graph Canvas */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto min-h-[560px]">
        <div className="text-[11px] text-slate-500 mb-3 flex items-center justify-between">
          <span>Click any supplier or node below to highlight its cascading downstream supply chain paths:</span>
          <span className="text-[11px] font-mono text-slate-400">
            Downstream Impact highlighted in <span className="text-rose-600 font-bold">Red Ring & Border</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 min-w-[1020px]">
          {tiers.map((col) => {
            const ColIcon = col.icon;
            const tierNodes = nodes.filter(n => n.tier === col.tier);

            return (
              <div key={col.tier} className="bg-white/80 rounded-lg border border-slate-200 p-2.5 flex flex-col gap-2">
                {/* Column Header */}
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200 text-slate-700 font-semibold text-xs">
                  <ColIcon className="w-3.5 h-3.5 text-sky-700" />
                  <span className="truncate">{col.title}</span>
                </div>

                {/* Nodes in this Tier */}
                <div className="space-y-2 flex-1">
                  {tierNodes.map(node => {
                    const isSelected = selectedNodeId === node.id;
                    const isDownstream = downstreamSet.has(node.id);
                    const badge = getRiskBadgeClasses(node.riskScore);

                    let cardStyle = 'border-slate-200 bg-white hover:border-slate-300';
                    if (isSelected) {
                      cardStyle = 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-300 shadow-sm';
                    } else if (isDownstream) {
                      cardStyle = 'border-red-400 bg-red-50/40 ring-1 ring-red-300 shadow-xs';
                    }

                    return (
                      <div
                        key={node.id}
                        onClick={() => handleSelectNode(node.id)}
                        className={`p-2.5 rounded-md border transition-all cursor-pointer select-none text-xs relative group ${cardStyle}`}
                      >
                        {/* Status pill & risk badge */}
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                            Risk: {node.riskScore}/100
                          </span>
                          {node.daysLeft !== undefined && (
                            <span className="text-[9px] font-mono font-semibold text-amber-700 bg-amber-100/70 px-1 rounded">
                              {node.daysLeft}d supply
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <div className="font-semibold text-slate-900 leading-snug line-clamp-2">
                          {node.label}
                        </div>

                        {/* SubLabel */}
                        <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                          {node.subLabel}
                        </div>

                        {/* Metrics footer if present */}
                        {node.customerCount && (
                          <div className="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                            <span className="text-slate-500">Exposed Customers:</span>
                            <span className="font-bold text-rose-700 font-mono">{node.customerCount.toLocaleString()}</span>
                          </div>
                        )}

                        {/* Connection indicator */}
                        {isDownstream && !isSelected && (
                          <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[8px] flex items-center justify-center font-bold">
                            !
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
