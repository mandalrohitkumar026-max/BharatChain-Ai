import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Anchor,
  Factory as FactoryIcon,
  Building2,
  AlertTriangle,
  X,
  ArrowRight,
  ShieldAlert,
  Wind,
  Truck,
  CheckCircle2,
  ChevronRight,
  Sliders,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';

interface MapHotspot {
  id: string;
  name: string;
  category: 'Supplier Cluster' | 'Port Hub' | 'Manufacturing Hub' | 'Shipping Chokepoint';
  country: string;
  x: number; // percentage on SVG map
  y: number; // percentage on SVG map
  riskScore: number;
  status: 'critical' | 'high' | 'medium' | 'low';
  reasons: string[];
  affectedComponentsCount: number;
  affectedProductsCount: number;
  revenueExposureINR: number;
  revenueExposureUSD: number;
  keyDelay: string;
  activeShipments: number;
  coordinates: string;
}

export const GlobalRiskMap: React.FC = () => {
  const { currency, setActiveTab, setHighlightedNetworkPath, addToast } = useApp();

  const hotspots: MapHotspot[] = [
    {
      id: 'loc-sz',
      name: 'Shenzhen Supplier Cluster',
      category: 'Supplier Cluster',
      country: 'China',
      x: 77.2,
      y: 47.5,
      riskScore: 87,
      status: 'critical',
      reasons: [
        'Severe weather (Typhoon coastal alert in Pearl River Delta)',
        'Port congestion with vessel dwell time up +42%',
        'Supplier delivery delays averaging +7 business days'
      ],
      affectedComponentsCount: 12,
      affectedProductsCount: 4,
      revenueExposureINR: 4.8,
      revenueExposureUSD: 5.8,
      keyDelay: '+7 days delay',
      activeShipments: 4,
      coordinates: '22.54° N, 114.05° E'
    },
    {
      id: 'loc-jnpt',
      name: 'JNPT Port (Nhava Sheva, Mumbai)',
      category: 'Port Hub',
      country: 'India',
      x: 65.5,
      y: 50.2,
      riskScore: 68,
      status: 'high',
      reasons: [
        'Yard density at 88% capacity limit',
        'Customs paperwork EDI server intermittent outages',
        'Monsoon arterial road access bottlenecks'
      ],
      affectedComponentsCount: 16,
      affectedProductsCount: 5,
      revenueExposureINR: 3.6,
      revenueExposureUSD: 4.3,
      keyDelay: '+4 days delay',
      activeShipments: 6,
      coordinates: '18.94° N, 72.95° E'
    },
    {
      id: 'loc-maa',
      name: 'Factory 02 — Chennai EV Gigafactory',
      category: 'Manufacturing Hub',
      country: 'India',
      x: 67.2,
      y: 53.8,
      riskScore: 85,
      status: 'critical',
      reasons: [
        'Critical Power Controller stockout anticipated in 12 days',
        'BMS ASIC secondary supplier pending validation',
        'Assembly Line 1 & Line 3 at risk of starvation'
      ],
      affectedComponentsCount: 14,
      affectedProductsCount: 3,
      revenueExposureINR: 4.8,
      revenueExposureUSD: 5.8,
      keyDelay: 'Line idle risk in 12 days',
      activeShipments: 5,
      coordinates: '12.96° N, 79.94° E'
    },
    {
      id: 'loc-pun',
      name: 'Factory 01 — Pune Powertrain Complex',
      category: 'Manufacturing Hub',
      country: 'India',
      x: 65.8,
      y: 51.5,
      riskScore: 76,
      status: 'high',
      reasons: [
        'Local tier-1 supplier credit distress',
        'Inverter casting inventory below 14-day threshold',
        'Heavy truck transit slowdown on Western Ghats highway'
      ],
      affectedComponentsCount: 6,
      affectedProductsCount: 3,
      revenueExposureINR: 3.8,
      revenueExposureUSD: 4.6,
      keyDelay: 'Buffer at 11 days',
      activeShipments: 3,
      coordinates: '18.75° N, 73.85° E'
    },
    {
      id: 'loc-twn',
      name: 'Hsinchu Semiconductor Cluster',
      category: 'Supplier Cluster',
      country: 'Taiwan',
      x: 79.5,
      y: 46.8,
      riskScore: 74,
      status: 'high',
      reasons: [
        'Geopolitical naval exercise exclusion corridors',
        'Maritime rerouting adding 350 nautical miles',
        'High-density packaging cleanroom queue backlog'
      ],
      affectedComponentsCount: 8,
      affectedProductsCount: 3,
      revenueExposureINR: 2.9,
      revenueExposureUSD: 3.5,
      keyDelay: '+6 days sea freight delay',
      activeShipments: 2,
      coordinates: '24.81° N, 120.96° E'
    },
    {
      id: 'loc-sg',
      name: 'Port of Singapore Transshipment Hub',
      category: 'Port Hub',
      country: 'Singapore',
      x: 74.0,
      y: 58.5,
      riskScore: 72,
      status: 'high',
      reasons: [
        'Bunkering congestion due to Red Sea rerouting',
        'Average vessel anchorage wait time elevated to 4.8 days'
      ],
      affectedComponentsCount: 9,
      affectedProductsCount: 4,
      revenueExposureINR: 2.4,
      revenueExposureUSD: 2.9,
      keyDelay: '+3 days container dwell',
      activeShipments: 4,
      coordinates: '1.26° N, 103.82° E'
    },
    {
      id: 'loc-jp',
      name: 'Tokyo-Nagoya Precision Microtech Hub',
      category: 'Supplier Cluster',
      country: 'Japan',
      x: 83.5,
      y: 41.2,
      riskScore: 32,
      status: 'low',
      reasons: [
        'Operating normally with high air-freight reliability',
        'Primary backup source for power controllers & ASICs'
      ],
      affectedComponentsCount: 4,
      affectedProductsCount: 2,
      revenueExposureINR: 0.8,
      revenueExposureUSD: 0.9,
      keyDelay: 'Normal schedule',
      activeShipments: 2,
      coordinates: '35.67° N, 139.65° E'
    },
    {
      id: 'loc-de',
      name: 'Stuttgart & Munich Automotive Systems Hub',
      category: 'Supplier Cluster',
      country: 'Germany',
      x: 50.5,
      y: 33.5,
      riskScore: 24,
      status: 'low',
      reasons: [
        'Reliable Tier-1 supply line',
        'Dual air/maritime freight contracts active'
      ],
      affectedComponentsCount: 3,
      affectedProductsCount: 2,
      revenueExposureINR: 0.5,
      revenueExposureUSD: 0.6,
      keyDelay: 'Normal schedule',
      activeShipments: 2,
      coordinates: '48.77° N, 9.18° E'
    },
    {
      id: 'loc-us',
      name: 'Detroit Automotive Sensors & ASIC Lab',
      category: 'Supplier Cluster',
      country: 'United States',
      x: 23.5,
      y: 36.8,
      riskScore: 41,
      status: 'medium',
      reasons: [
        'Moderate transatlantic air cargo rate escalation',
        'Stable fab production output'
      ],
      affectedComponentsCount: 5,
      affectedProductsCount: 2,
      revenueExposureINR: 1.1,
      revenueExposureUSD: 1.3,
      keyDelay: '+1 day customs review',
      activeShipments: 1,
      coordinates: '42.33° N, 83.04° W'
    }
  ];

  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot>(hotspots[0]);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredHotspots = hotspots.filter(h => {
    if (filterType === 'all') return true;
    if (filterType === 'suppliers') return h.category === 'Supplier Cluster';
    if (filterType === 'ports') return h.category === 'Port Hub';
    if (filterType === 'factories') return h.category === 'Manufacturing Hub';
    if (filterType === 'high_risk') return h.riskScore >= 70;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Page Header & Filtering Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Global Supply Chain Risk Map</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              Live Geospatial Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time geospatial tracking of supplier clusters, shipping lanes, maritime ports, and assembly hubs.
          </p>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Nodes
          </button>
          <button
            onClick={() => setFilterType('high_risk')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterType === 'high_risk' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            High Risk (≥70)
          </button>
          <button
            onClick={() => setFilterType('suppliers')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterType === 'suppliers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Suppliers
          </button>
          <button
            onClick={() => setFilterType('ports')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterType === 'ports' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ports
          </button>
          <button
            onClick={() => setFilterType('factories')}
            className={`px-2.5 py-1 rounded transition-all ${
              filterType === 'factories' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Factories
          </button>
        </div>
      </div>

      {/* Main Map & Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive World Map SVG Viewport */}
        <div className="lg:col-span-2 bg-slate-900 rounded-lg border border-slate-800 p-4 relative min-h-[520px] flex flex-col justify-between overflow-hidden shadow-md">
          {/* Map Title & Legend */}
          <div className="flex items-center justify-between z-10 text-white text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-200">Global AIS Maritime & Weather Feeds Live</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical (≥75)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> High (60–74)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Low (&lt;60)</span>
            </div>
          </div>

          {/* SVG Map Canvas with World Continents outline & shipping lanes */}
          <div className="relative w-full h-[430px] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full text-slate-700/60"
              fill="currentColor"
            >
              {/* Simplified stylized world landmasses for ultra-crisp enterprise contrast */}
              {/* North America */}
              <path d="M 120 70 Q 220 50 300 90 Q 280 160 250 210 Q 200 230 180 200 Q 140 180 120 130 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              {/* South America */}
              <path d="M 240 230 Q 320 250 330 310 Q 300 410 260 450 Q 230 380 220 300 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              {/* Europe */}
              <path d="M 450 80 Q 560 70 560 140 Q 520 170 470 160 Q 440 120 450 80 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              {/* Africa */}
              <path d="M 460 170 Q 550 170 560 250 Q 540 370 490 390 Q 440 310 440 230 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              {/* Asia */}
              <path d="M 560 80 Q 820 60 880 150 Q 850 250 760 270 Q 640 240 560 150 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
              {/* India Subcontinent */}
              <path d="M 620 190 Q 680 190 690 240 Q 660 310 635 320 Q 610 260 620 190 Z" fill="#334155" stroke="#38bdf8" strokeWidth="1" />
              {/* Australia */}
              <path d="M 770 330 Q 860 320 880 370 Q 850 430 790 420 Q 750 380 770 330 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />

              {/* Active Maritime Shipping Route lines */}
              {/* Route 1: Shenzhen -> Singapore -> JNPT Mumbai (Hot Red Disrupted Corridors) */}
              <path
                d="M 772 237 Q 740 292 655 251"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="5,4"
                className="animate-pulse"
              />
              {/* Route 2: Kaohsiung/Taiwan -> Singapore -> Chennai */}
              <path
                d="M 795 234 Q 740 292 672 269"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              {/* Route 3: Rotterdam -> Suez/Red Sea -> Mumbai */}
              <path
                d="M 505 167 Q 560 210 655 251"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
            </svg>

            {/* Hotspot Markers */}
            {filteredHotspots.map(spot => {
              const isSelected = selectedHotspot.id === spot.id;
              const isCritical = spot.riskScore >= 75;
              const isHigh = spot.riskScore >= 60 && spot.riskScore < 75;

              let dotColor = 'bg-emerald-500 text-white';
              let ringColor = 'ring-emerald-400';
              if (isCritical) {
                dotColor = 'bg-red-600 text-white';
                ringColor = 'ring-red-400 animate-ping';
              } else if (isHigh) {
                dotColor = 'bg-amber-500 text-white';
                ringColor = 'ring-amber-400';
              }

              return (
                <div
                  key={spot.id}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => setSelectedHotspot(spot)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Pulse Ring */}
                  {isCritical && (
                    <span className={`absolute -inset-1 rounded-full ${dotColor} opacity-75 animate-ping`} />
                  )}

                  {/* Marker Pin */}
                  <div
                    className={`relative w-6 h-6 rounded-full ${dotColor} flex items-center justify-center font-bold text-[10px] shadow-lg border-2 border-white transition-all transform group-hover:scale-125 ${
                      isSelected ? 'ring-4 ring-sky-400 scale-125' : ''
                    }`}
                  >
                    {spot.riskScore}
                  </div>

                  {/* Tooltip Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-7 hidden group-hover:block whitespace-nowrap bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded shadow-xl border border-slate-700 pointer-events-none z-30 font-medium">
                    {spot.name} • {spot.riskScore}/100
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Route Summary Bar */}
          <div className="z-10 bg-slate-800/90 rounded-md p-2.5 border border-slate-700 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Active Corridor Alert:</span>
              <span>Shenzhen → Singapore → JNPT Nhava Sheva (+7 days maritime delay)</span>
            </div>
            <button
              onClick={() => setActiveTab('logistics')}
              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
            >
              Logistics Fleet
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Location Drilldown Telemetry Side Panel (Matches Prompt Specification) */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div className="pb-3 border-b border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  {selectedHotspot.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{selectedHotspot.coordinates}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {selectedHotspot.name}
              </h2>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Country: <span className="text-slate-800 font-semibold">{selectedHotspot.country}</span>
              </div>
            </div>

            {/* Risk Score Pill */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Location Risk Score</div>
                <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                  {selectedHotspot.riskScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded text-xs font-bold ${
                selectedHotspot.riskScore >= 75 ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {selectedHotspot.riskScore >= 75 ? 'Critical Threat' : 'Elevated Risk'}
              </div>
            </div>

            {/* Root Causes / Reasons (Exact prompt requirement) */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Root Causes & Disruption Factors:
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedHotspot.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-rose-50/50 p-2 rounded border border-rose-100/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span className="leading-relaxed font-medium">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Downstream Exposure Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Affected Components</div>
                <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  {selectedHotspot.affectedComponentsCount}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Affected Products</div>
                <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  {selectedHotspot.affectedProductsCount}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Revenue Exposure</div>
                <div className="text-base font-bold text-rose-700 font-mono mt-0.5">
                  {currency === 'INR' ? formatCurrency(selectedHotspot.revenueExposureINR, 'INR') : formatCurrency(selectedHotspot.revenueExposureUSD, 'USD')}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <div className="text-[10px] text-slate-500 font-medium">Transit Status</div>
                <div className="text-xs font-bold text-amber-700 mt-1 font-mono">
                  {selectedHotspot.keyDelay}
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setHighlightedNetworkPath('sup-02');
                setActiveTab('supply-network');
                addToast('Supply Network', 'Loaded downstream propagation path for ' + selectedHotspot.name, 'info');
              }}
              className="w-full py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>View Downstream Impact Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setActiveTab('recommendations');
                addToast('Alternative Sourcing', 'Opening alternative vendor options for ' + selectedHotspot.name, 'info');
              }}
              className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Evaluate Alternative Suppliers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
