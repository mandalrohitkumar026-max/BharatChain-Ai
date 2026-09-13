import React from 'react';
import { X, Bell, AlertTriangle, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockAlerts } from '../../data/mockData';
import { formatCurrency, getRiskBadgeClasses } from '../../utils/formatters';

export const NotificationsDrawer: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen, setActiveTab, currency } = useApp();

  if (!notificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setNotificationsOpen(false)}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-red-100 text-red-700 rounded-md">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Live Risk Alerts</h3>
                <p className="text-[11px] text-slate-500">5 active disruption signals detected</p>
              </div>
            </div>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-3 space-y-2">
            {mockAlerts.map(alert => {
              const badge = getRiskBadgeClasses(alert.severity);
              return (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 transition-all text-xs"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {badge.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{alert.timestamp}</span>
                  </div>

                  <h4 className="font-semibold text-slate-900 mb-1 leading-snug">
                    {alert.title}
                  </h4>

                  <p className="text-slate-600 line-clamp-2 mb-2 text-[11px] leading-relaxed">
                    {alert.whatHappened}
                  </p>

                  <div className="flex items-center justify-between text-[11px] bg-slate-100/70 p-2 rounded border border-slate-200/60 font-medium">
                    <span className="text-slate-600">Exposure:</span>
                    <span className="font-bold text-rose-700 font-mono">
                      {currency === 'INR' ? formatCurrency(alert.exposureINR, 'INR') : formatCurrency(alert.exposureUSD, 'USD')}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500 font-medium">
                      ETA: {alert.impactETA.slice(0, 32)}...
                    </span>
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        setActiveTab('alerts');
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:text-sky-800"
                    >
                      Resolve
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
            <button
              onClick={() => {
                setNotificationsOpen(false);
                setActiveTab('alerts');
              }}
              className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-md text-xs font-semibold text-slate-700 shadow-xs"
            >
              Open Full Risk Alert Center (5)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
