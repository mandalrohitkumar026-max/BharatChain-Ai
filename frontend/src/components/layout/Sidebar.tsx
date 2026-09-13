import React from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  Network,
  Building2,
  Cpu,
  Factory as FactoryIcon,
  Boxes,
  Truck,
  Sliders,
  GitPullRequestDraft,
  Bell,
  FileBarChart,
  Bot,
  Settings,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, setCopilotOpen } = useApp();

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'early-warnings', label: 'Risk Intelligence', icon: AlertTriangle, badge: '3 Active', badgeColor: 'bg-red-100 text-red-700 border-red-200' },
    { id: 'supply-network', label: 'Supply Network', icon: Network },
    { id: 'suppliers', label: 'Suppliers', icon: Building2, badge: '52', badgeColor: 'bg-slate-100 text-slate-700 border-slate-200' },
    { id: 'components', label: 'Components', icon: Cpu },
    { id: 'factories', label: 'Factories', icon: FactoryIcon },
    { id: 'inventory', label: 'Inventory', icon: Boxes, badge: '7 Risk', badgeColor: 'bg-amber-100 text-amber-700 border-amber-200' },
    { id: 'logistics', label: 'Logistics', icon: Truck, badge: '7 Transit', badgeColor: 'bg-sky-100 text-sky-700 border-sky-200' },
    { id: 'scenarios', label: 'Scenarios', icon: Sliders },
    { id: 'recommendations', label: 'Recommendations', icon: GitPullRequestDraft, badge: 'New', badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: '5', badgeColor: 'bg-red-500 text-white border-transparent font-bold' },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-sky-700 flex items-center justify-center text-white shadow-sm ring-1 ring-sky-800">
            <ShieldCheck className="w-5 h-5 text-sky-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-base tracking-tight leading-none">
                ChainSentinel
              </span>
              <span className="text-[10px] uppercase font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200 tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 tracking-tight">
              Supply Chain Risk Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Signature Workflow Strip */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200">
        <div className="text-[9px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
          Signature Operational Loop
        </div>
        <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 font-medium">
          <span className="text-sky-700 font-bold">DETECT</span>
          <span className="text-slate-300">→</span>
          <span className="text-amber-700 font-bold">PREDICT</span>
          <span className="text-slate-300">→</span>
          <span className="text-rose-700 font-bold">SIMULATE</span>
          <span className="text-slate-300">→</span>
          <span className="text-emerald-700 font-bold">ACT</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 pb-1.5">
          Core Platform
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-sky-50 text-sky-900 font-semibold shadow-xs ring-1 ring-sky-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-sky-700' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded border ${
                      item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-sky-600" />}
              </div>
            </button>
          );
        })}

        <div className="pt-3 pb-1">
          <button
            onClick={() => setActiveTab('landing')}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Public Landing Page</span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
              Demo
            </span>
          </button>
        </div>
      </nav>

      {/* Bottom Actions & User Profile */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 space-y-2">
        {/* AI Copilot Quick Launch */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-gradient-to-r from-sky-700 to-indigo-700 text-white text-xs font-medium shadow-sm hover:from-sky-800 hover:to-indigo-800 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-sky-200 animate-pulse-slow" />
            <span>AI Supply Copilot</span>
          </div>
          <span className="text-[10px] bg-white/20 text-white font-mono px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </button>

        {/* User Card */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold shrink-0">
              RK
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-900 truncate">Rohit Kumar</div>
              <div className="text-[10px] text-slate-500 truncate">VP Global Supply Chain</div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('reports')}
            title="Settings & Config" 
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
