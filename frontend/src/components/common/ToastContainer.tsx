import React from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let Icon = Info;
        let borderClass = 'border-sky-300 bg-white';
        let iconClass = 'text-sky-600';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderClass = 'border-emerald-300 bg-white';
          iconClass = 'text-emerald-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-300 bg-white';
          iconClass = 'text-amber-600';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-300 bg-white';
          iconClass = 'text-rose-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg transition-all transform translate-y-0 text-xs ${borderClass}`}
          >
            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconClass}`} />
            <div className="flex-1 pr-1">
              <div className="font-semibold text-slate-900">{toast.title}</div>
              <div className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
