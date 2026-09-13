import React, { useState } from 'react';
import {
  Building2,
  Search,
  ArrowUpDown,
  Filter,
  ExternalLink,
  ShieldAlert,
  ChevronDown,
  Download,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Supplier } from '../../types';
import { mockSuppliers } from '../../data/mockData';
import { getRiskBadgeClasses } from '../../utils/formatters';
import { SupplierDetailModal } from './SupplierDetailModal';

export const SuppliersList: React.FC = () => {
  const { openSupplierDetail, selectedSupplier, setSelectedSupplier, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('all');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<'riskScore' | 'deliveryPerformance' | 'capacity' | 'name'>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Unique countries list
  const countries = Array.from(new Set(mockSuppliers.map(s => s.country))).sort();

  // Filter logic
  const filteredSuppliers = mockSuppliers
    .filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase());
      const matchesRisk = selectedRiskFilter === 'all' || 
        (selectedRiskFilter === 'critical' && s.riskScore >= 75) ||
        (selectedRiskFilter === 'high' && s.riskScore >= 60 && s.riskScore < 75) ||
        (selectedRiskFilter === 'medium' && s.riskScore >= 35 && s.riskScore < 60) ||
        (selectedRiskFilter === 'low' && s.riskScore < 35);
      const matchesCountry = selectedCountryFilter === 'all' || s.country === selectedCountryFilter;
      const matchesStatus = selectedStatusFilter === 'all' || s.status === selectedStatusFilter;

      return matchesSearch && matchesRisk && matchesCountry && matchesStatus;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? (aVal as string).localeCompare(bVal as string) : (bVal as string).localeCompare(aVal as string);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["Supplier,Country,Risk Score,Delivery Performance,Financial Risk,Logistics Risk,Capacity,Components,Status"].join(",") + "\n" +
      filteredSuppliers.map(s => `"${s.name}","${s.country}",${s.riskScore},${s.deliveryPerformance}%,"${s.financialRisk}","${s.logisticsRisk}",${s.capacity}%,${s.componentsCount},"${s.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chainsentinel_suppliers_risk_matrix.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Suppliers CSV Exported', 'Downloaded complete supplier intelligence data file.', 'success');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Supplier Intelligence Directory</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              {filteredSuppliers.length} Monitored
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous financial solvency, delivery reliability, geopolitical exposure, and operational capacity tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search supplier by name, code, or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-600 focus:bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Risk Level Filter */}
          <select
            value={selectedRiskFilter}
            onChange={e => setSelectedRiskFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:ring-1 focus:ring-sky-600 focus:bg-white"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical (&ge;75)</option>
            <option value="high">High Risk (60–74)</option>
            <option value="medium">Medium Risk (35–59)</option>
            <option value="low">Low Risk (&lt;35)</option>
          </select>

          {/* Country Filter */}
          <select
            value={selectedCountryFilter}
            onChange={e => setSelectedCountryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:ring-1 focus:ring-sky-600 focus:bg-white"
          >
            <option value="all">All Countries</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={e => setSelectedStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:ring-1 focus:ring-sky-600 focus:bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="Critical">Critical</option>
            <option value="High Risk">High Risk</option>
            <option value="Stable">Stable</option>
            <option value="Low Risk">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Supplier Table (9 Columns matching prompt requirements) */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Supplier</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Country</th>
                <th
                  onClick={() => handleSort('riskScore')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Risk Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('deliveryPerformance')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Delivery Performance</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Financial Risk</th>
                <th className="py-3 px-3">Logistics Risk</th>
                <th
                  onClick={() => handleSort('capacity')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Capacity</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Components</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.map((supplier) => {
                const badge = getRiskBadgeClasses(supplier.riskScore);
                const isSelected = selectedSupplier?.id === supplier.id;

                return (
                  <tr
                    key={supplier.id}
                    onClick={() => openSupplierDetail(supplier.id)}
                    className={`hover:bg-slate-50/90 cursor-pointer transition-colors ${
                      isSelected ? 'bg-sky-50/50' : ''
                    }`}
                  >
                    {/* Supplier */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{supplier.name}</span>
                        {supplier.singleSourceRisk && (
                          <span className="text-[9px] bg-red-100 text-red-700 px-1 rounded font-normal">Sole Source</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {supplier.code} • {supplier.city}
                      </div>
                    </td>

                    {/* Country */}
                    <td className="py-3 px-3 font-medium text-slate-700">
                      {supplier.country}
                    </td>

                    {/* Risk Score */}
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs border ${badge.bg} ${badge.text} ${badge.border}`}>
                        {supplier.riskScore}
                      </span>
                    </td>

                    {/* Delivery Performance */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-slate-800">
                          {supplier.deliveryPerformance}%
                        </span>
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              supplier.deliveryPerformance >= 90 ? 'bg-emerald-500' : supplier.deliveryPerformance >= 80 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${supplier.deliveryPerformance}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Financial Risk */}
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${
                        supplier.financialRisk === 'Critical' || supplier.financialRisk === 'High' ? 'text-red-700 font-bold' : supplier.financialRisk === 'Medium' ? 'text-amber-700' : 'text-emerald-700'
                      }`}>
                        {supplier.financialRisk}
                      </span>
                    </td>

                    {/* Logistics Risk */}
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${
                        supplier.logisticsRisk === 'Critical' || supplier.logisticsRisk === 'High' ? 'text-red-700 font-bold' : supplier.logisticsRisk === 'Medium' ? 'text-amber-700' : 'text-emerald-700'
                      }`}>
                        {supplier.logisticsRisk}
                      </span>
                    </td>

                    {/* Capacity */}
                    <td className="py-3 px-3 font-mono font-medium text-slate-700">
                      {supplier.capacity}%
                    </td>

                    {/* Components */}
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                      {supplier.componentsCount}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                        {supplier.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Supplier Modal View */}
      {selectedSupplier && (
        <SupplierDetailModal
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}
    </div>
  );
};
