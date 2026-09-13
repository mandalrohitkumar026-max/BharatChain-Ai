import React from 'react';
import {
  FileBarChart,
  TrendingUp,
  Globe,
  Coins,
  Cpu,
  Truck,
  Building2,
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

export const RiskAnalytics: React.FC = () => {
  const { currency, addToast } = useApp();

  // 1. Delivery Performance & Volatility by Logistics Corridor
  const corridorData = [
    { corridor: 'Shenzhen-JNPT', onTime: 71, delayDays: 7 },
    { corridor: 'Kaohsiung-Chennai', onTime: 78, delayDays: 6 },
    { corridor: 'Rotterdam-Mumbai', onTime: 84, delayDays: 3 },
    { corridor: 'Tokyo-Bengaluru', onTime: 96, delayDays: 0 },
    { corridor: 'Frankfurt-Delhi', onTime: 97, delayDays: 0 },
    { corridor: 'Busan-Chennai', onTime: 76, delayDays: 7 },
  ];

  // 2. Inventory Depletion vs Safety Threshold
  const inventoryBurnData = [
    { day: 'Day 1', stock: 18000, safetyLimit: 6000 },
    { day: 'Day 4', stock: 13500, safetyLimit: 6000 },
    { day: 'Day 7', stock: 9000, safetyLimit: 6000 },
    { day: 'Day 10', stock: 4500, safetyLimit: 6000 },
    { day: 'Day 12', stock: 1500, safetyLimit: 6000 },
    { day: 'Day 14', stock: 0, safetyLimit: 6000 },
  ];

  // 3. Production Exposure by Plant
  const plantExposureData = [
    { plant: 'Factory 02 Chennai', exposureINR: 4.8, exposureUSD: 5.8 },
    { plant: 'Factory 01 Pune', exposureINR: 3.8, exposureUSD: 4.6 },
    { plant: 'Factory 03 Gurgaon', exposureINR: 2.1, exposureUSD: 2.5 },
    { plant: 'Factory 05 Hosur', exposureINR: 1.9, exposureUSD: 2.3 },
    { plant: 'Factory 04 Sanand', exposureINR: 1.6, exposureUSD: 1.9 },
  ];

  // 4. Commodity Price Index
  const commodityTrend = [
    { month: 'Apr', lithium: 100, galliumNitride: 100, copper: 100 },
    { month: 'May', lithium: 104, galliumNitride: 103, copper: 101 },
    { month: 'Jun', lithium: 112, galliumNitride: 107, copper: 103 },
    { month: 'Jul', lithium: 119, galliumNitride: 114, copper: 102 },
    { month: 'Aug', lithium: 124, galliumNitride: 122, copper: 106 },
    { month: 'Sep', lithium: 128, galliumNitride: 129, copper: 108 },
  ];

  const handleExportData = () => {
    addToast('Analytics Data Exported', 'Downloaded complete risk telemetry dataset in XLSX format.', 'success');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Risk Analytics & Trends</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              Executive Analytics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Empirical historical distributions of lead time volatility, factory exposure, inventory burn curves, and raw commodity price indices.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          Export Dataset
        </button>
      </div>

      {/* 4 Clean Executive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Production Exposure by Assembly Hub */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Production Value Exposure by Assembly Hub
              </h3>
              <p className="text-[11px] text-slate-500">
                Unfulfilled revenue potential from current component buffer shortages
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-rose-700">
              Total: {currency === 'INR' ? '₹14.2 Cr' : '$17.1M'}
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plantExposureData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} unit={currency === 'INR' ? ' Cr' : 'M'} />
                <YAxis dataKey="plant" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
                />
                <Bar
                  dataKey={currency === 'INR' ? 'exposureINR' : 'exposureUSD'}
                  fill="#e11d48"
                  radius={[0, 4, 4, 0]}
                  name={currency === 'INR' ? 'Exposure (₹ Cr)' : 'Exposure ($M)'}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Inventory Burn-Down Curve (Power Controller) */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Inventory Depletion vs Safety Threshold
              </h3>
              <p className="text-[11px] text-slate-500">
                Power Controller 800V GaN consumption trajectory over next 14 days
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
              Stockout Day 12
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={inventoryBurnData}>
                <defs>
                  <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="stock" stroke="#d97706" strokeWidth={2.5} fill="url(#stockGrad)" name="Remaining Units" />
                <Line type="monotone" dataKey="safetyLimit" stroke="#dc2626" strokeWidth={1.5} strokeDasharray="4 4" name="Critical Safety Buffer" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Logistics Corridor Delays */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Transit Delay by Freight Corridor
              </h3>
              <p className="text-[11px] text-slate-500">
                Days of delay added to contractual maritime & air ETA
              </p>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Days added</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={corridorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="corridor" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="d" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
                />
                <Bar dataKey="delayDays" fill="#0284c7" radius={[4, 4, 0, 0]} name="Delay (Days)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Critical Raw Commodity Price Trends */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Upstream Commodity Price Trends (Indexed Apr=100)
              </h3>
              <p className="text-[11px] text-slate-500">
                Lithium hydroxide, Gallium Nitride substrate, and high-purity copper
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700">GaN +29%</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={commodityTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[95, 135]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '6px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Line type="monotone" dataKey="lithium" stroke="#8b5cf6" strokeWidth={2} name="Lithium Hydroxide" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="galliumNitride" stroke="#ea580c" strokeWidth={2.5} name="GaN Substrate" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="copper" stroke="#059669" strokeWidth={1.5} name="Electrolytic Copper" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
