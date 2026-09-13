import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  Bell,
  Bot,
  Building,
  CheckCircle2,
  ChevronDown,
  Globe,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockSuppliers, mockComponents, mockFactories } from '../../data/mockData';

export const TopNav: React.FC = () => {
  const {
    currency,
    toggleCurrency,
    dataFreshness,
    refreshData,
    notificationsOpen,
    setNotificationsOpen,
    setCopilotOpen,
    setActiveTab,
    openSupplierDetail,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('Bharat Mobility & Industrial Corp (EV Div)');
  const searchRef = useRef<HTMLDivElement>(null);

  const orgList = [
    'Bharat Mobility & Industrial Corp (EV Div)',
    'Bharat Powertrains & Chassis Systems',
    'Global Logistics & Freight Operations',
    'Defense & Aerospace Subsystems Group'
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshData();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search matches
  const filteredSuppliers = searchQuery.trim()
    ? mockSuppliers.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const filteredComponents = searchQuery.trim()
    ? mockComponents.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.partNumber.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const filteredFactories = searchQuery.trim()
    ? mockFactories.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.location.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2)
    : [];

  const hasResults = filteredSuppliers.length > 0 || filteredComponents.length > 0 || filteredFactories.length > 0;

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-20 shrink-0 select-none">
      {/* Left: Organization Selector & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        {/* Organization Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Building className="w-3.5 h-3.5 text-sky-700 shrink-0" />
            <span className="max-w-[190px] truncate">{selectedOrg}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {orgDropdownOpen && (
            <div className="absolute left-0 mt-1 w-72 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 text-xs">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Operating Entities
              </div>
              {orgList.map(org => (
                <button
                  key={org}
                  onClick={() => {
                    setSelectedOrg(org);
                    setOrgDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                    selectedOrg === org ? 'text-sky-700 font-semibold bg-sky-50/50' : 'text-slate-700'
                  }`}
                >
                  <span className="truncate">{org}</span>
                  {selectedOrg === org && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar with Autocomplete Dropdown */}
        <div ref={searchRef} className="relative flex-1 max-w-md">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search suppliers, components, factories, routes... (Press /)"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-8 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {searchFocused && searchQuery.trim() && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 text-xs max-h-96 overflow-y-auto">
              {!hasResults ? (
                <div className="p-4 text-center text-slate-400 text-xs">
                  No matching suppliers, components, or facilities found.
                </div>
              ) : (
                <>
                  {filteredSuppliers.length > 0 && (
                    <div className="mb-2">
                      <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Suppliers
                      </div>
                      {filteredSuppliers.map(s => (
                        <button
                          key={s.id}
                          onClick={() => {
                            openSupplierDetail(s.id);
                            setSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{s.name}</div>
                            <div className="text-[10px] text-slate-400">{s.city}, {s.country} • {s.code}</div>
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            s.riskScore >= 75 ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            Risk: {s.riskScore}/100
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredComponents.length > 0 && (
                    <div className="mb-2 border-t border-slate-100 pt-1">
                      <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Components
                      </div>
                      {filteredComponents.map(c => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setActiveTab('inventory');
                            setSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{c.name}</div>
                            <div className="text-[10px] text-slate-400">{c.partNumber} • {c.category}</div>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {c.daysRemaining} days left
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredFactories.length > 0 && (
                    <div className="border-t border-slate-100 pt-1">
                      <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Manufacturing Facilities
                      </div>
                      {filteredFactories.map(f => (
                        <button
                          key={f.id}
                          onClick={() => {
                            setActiveTab('factories');
                            setSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-slate-900">{f.name}</div>
                            <div className="text-[10px] text-slate-400">{f.location}</div>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {f.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Currency Switcher, Freshness, Notifications, AI Copilot */}
      <div className="flex items-center gap-3">
        {/* Currency Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
          <button
            onClick={() => currency !== 'INR' && toggleCurrency()}
            className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
              currency === 'INR'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ₹ INR
          </button>
          <button
            onClick={() => currency !== 'USD' && toggleCurrency()}
            className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
              currency === 'USD'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            $ USD
          </button>
        </div>

        {/* Data Freshness Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-[11px] text-slate-500">
            Data updated <span className="text-slate-800 font-semibold">{dataFreshness}</span>
          </span>
          <button
            onClick={handleRefresh}
            title="Force refresh supplier telemetry"
            className="p-1 text-slate-400 hover:text-sky-700 transition-colors ml-1"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-sky-700' : ''}`} />
          </button>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="relative p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
          title="Risk Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
            5
          </span>
        </button>

        {/* AI Copilot Button */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 text-xs font-semibold transition-colors"
        >
          <Bot className="w-3.5 h-3.5 text-sky-700" />
          <span>Ask Copilot</span>
        </button>
      </div>
    </header>
  );
};
