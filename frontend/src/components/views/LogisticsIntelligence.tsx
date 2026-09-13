import React, { useState } from 'react';
import {
  Truck,
  Anchor,
  AlertTriangle,
  Clock,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Search,
  CheckCircle2,
  Navigation,
  Globe,
  Sliders,
  Plane
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockShipments, mockPortCongestions } from '../../data/mockData';
import { getRiskBadgeClasses } from '../../utils/formatters';

export const LogisticsIntelligence: React.FC = () => {
  const { setActiveTab, setHighlightedNetworkPath, addToast } = useApp();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredShipments = mockShipments.filter(s => {
    const matchesSearch = s.trackingNumber.toLowerCase().includes(search.toLowerCase()) || s.originPort.toLowerCase().includes(search.toLowerCase()) || s.componentName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const featuredShipment = mockShipments[0]; // Shipment #SC48291

  const handleReroute = (trackingNo: string) => {
    addToast('Expedited Freight Authorized', `Air express consignment triggered to bypass maritime delay on #${trackingNo}.`, 'success');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900">Logistics & Freight Telemetry</h1>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded border border-sky-200 uppercase tracking-wide">
              Active In-Transit Tracking
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time AIS vessel coordinates, port dwell times, ETA variance tracking, and customs bottleneck detection.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded transition-all ${
              filterStatus === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Shipments ({mockShipments.length})
          </button>
          <button
            onClick={() => setFilterStatus('Delayed')}
            className={`px-3 py-1 rounded transition-all ${
              filterStatus === 'Delayed' ? 'bg-white text-red-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Delayed (4)
          </button>
          <button
            onClick={() => setFilterStatus('On Schedule')}
            className={`px-3 py-1 rounded transition-all ${
              filterStatus === 'On Schedule' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            On Schedule (2)
          </button>
        </div>
      </div>

      {/* Featured Shipment Spotlight: Shipment #SC48291 (Exact prompt specification) */}
      <div className="bg-white rounded-lg border-2 border-red-200 p-5 shadow-xs bg-gradient-to-r from-red-50/40 via-white to-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                CRITICAL TRANSIT DELAY
              </span>
              <span className="text-xs font-mono font-bold text-slate-700">
                Shipment #{featuredShipment.trackingNumber}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              {featuredShipment.carrier} • Container Lot 44A
            </h2>
            <div className="text-xs text-slate-600">
              Affected Component: <strong className="text-slate-900">{featuredShipment.componentName}</strong> • Maritime Vessel in Bay of Bengal
            </div>
          </div>

          {/* Prompt Specified Fields */}
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Origin</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">Shenzhen</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Destination</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">Mumbai (JNPT)</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Original ETA</div>
              <div className="text-base font-bold text-slate-600 font-mono mt-0.5">18 Sep</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Updated ETA</div>
              <div className="text-base font-bold text-red-600 font-mono mt-0.5">25 Sep</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Delay</div>
              <div className="text-base font-bold text-red-600 font-mono mt-0.5">+7 days</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center px-2">
              <div className="text-[10px] uppercase font-bold text-slate-400">Risk</div>
              <span className="inline-block px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-bold mt-0.5">
                High
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-600">
            Root Cause: <strong>Yantian port anchorage wait surge + Typhoon detour around Luzon Strait.</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleReroute(featuredShipment.trackingNumber)}
              className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plane className="w-3.5 h-3.5" />
              Expedite Air Charter Backup
            </button>
            <button
              onClick={() => {
                setHighlightedNetworkPath('sup-02');
                setActiveTab('supply-network');
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              View Factory Impact Path
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Port Congestion Live Monitor */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Global Port Congestion Index
            </h3>
            <p className="text-[11px] text-slate-500">
              Average anchorage wait times and container terminal capacity bottlenecks
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Real-time AIS feed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {mockPortCongestions.map(port => {
            const isSevere = port.congestionIndex >= 8.0;
            const isHigh = port.congestionIndex >= 6.5 && port.congestionIndex < 8.0;

            return (
              <div
                key={port.id}
                className={`p-3 rounded-lg border ${
                  isSevere ? 'bg-red-50/50 border-red-200' : isHigh ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{port.country}</span>
                  <span className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded ${
                    isSevere ? 'bg-red-600 text-white' : isHigh ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {port.congestionIndex} / 10
                  </span>
                </div>
                <div className="font-bold text-slate-900 mt-1 truncate">{port.city}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">{port.port}</div>
                <div className="mt-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500">Avg Wait:</span>
                  <span className="font-bold font-mono text-slate-800">{port.avgWaitDays} days</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Freight Consignments Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search shipment by #, port, component..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium">
            {filteredShipments.length} Active Vessels & Flights
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-2.5 px-4">Shipment #</th>
                <th className="py-2.5 px-3">Carrier / Mode</th>
                <th className="py-2.5 px-3">Origin</th>
                <th className="py-2.5 px-3">Destination</th>
                <th className="py-2.5 px-3">Component</th>
                <th className="py-2.5 px-3 text-center">Original ETA</th>
                <th className="py-2.5 px-3 text-center">Updated ETA</th>
                <th className="py-2.5 px-3 text-center">Delay</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredShipments.map(shp => {
                const isDelayed = shp.delayDays > 0;
                return (
                  <tr key={shp.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      #{shp.trackingNumber}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      <div className="font-medium">{shp.carrier}</div>
                      <div className="text-[10px] text-slate-400">{shp.transitMode}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {shp.originPort}
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      {shp.destPort}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">
                      {shp.componentName}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-slate-500">
                      {shp.originalETA}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">
                      {shp.updatedETA}
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      {isDelayed ? (
                        <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                          +{shp.delayDays} days
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium">0d</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                        shp.status === 'Delayed' ? 'bg-red-50 text-red-700 border-red-200' : shp.status === 'Customs Hold' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {shp.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
