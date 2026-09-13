import React, { useState } from 'react';
import { Cpu, Search, AlertTriangle, ShieldCheck, ArrowRight, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockComponents } from '../../data/mockData';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';

export const ComponentsList: React.FC = () => {
  const { currency, setActiveTab, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = Array.from(new Set(mockComponents.map(c => c.category))).sort();

  const filtered = mockComponents.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.partNumber.toLowerCase().includes(search.toLowerCase()) || c.supplierName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Components & Bill-of-Materials Catalog</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              {filtered.length} Parts Tracked
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sole-source risk detection, Tier-1/2 BOM mapping, and inventory coverage buffer status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('inventory');
            }}
            className="px-3 py-1.5 bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 rounded-md text-xs font-semibold"
          >
            Open Inventory Risk Monitor →
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search component by part #, name, or supplier..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-600 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:ring-1 focus:ring-sky-600 focus:bg-white"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3 px-4">Component Name & Part #</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Tier</th>
                <th className="py-3 px-3">Primary Supplier</th>
                <th className="py-3 px-3 text-right">Unit Price</th>
                <th className="py-3 px-3 text-center">Coverage</th>
                <th className="py-3 px-3 text-center">Sourcing Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.slice(0, 20).map(cmp => (
                <tr key={cmp.id} className="hover:bg-slate-50/90 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{cmp.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{cmp.partNumber}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">{cmp.category}</td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-slate-600">Tier-{cmp.tier}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{cmp.supplierName}</td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-slate-800">
                    {currency === 'INR' ? `₹${cmp.unitCostINR.toLocaleString()}` : `$${cmp.unitCostUSD.toFixed(1)}`}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                      cmp.daysRemaining <= 14 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {cmp.daysRemaining}d
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {cmp.isSingleSource ? (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                        Sole Sourced
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Dual Sourced
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setActiveTab('recommendations');
                        addToast('Alternate Engine', `Loaded secondary sources for ${cmp.name}.`, 'info');
                      }}
                      className="text-[11px] font-semibold text-sky-700 hover:text-sky-800 hover:underline"
                    >
                      Evaluate →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
