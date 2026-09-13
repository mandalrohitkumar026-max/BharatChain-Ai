import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Currency, Supplier } from '../types';
import { mockSuppliers } from '../data/mockData';

export type NavTab = 
  | 'overview'
  | 'early-warnings'
  | 'supply-network'
  | 'suppliers'
  | 'components'
  | 'factories'
  | 'inventory'
  | 'logistics'
  | 'scenarios'
  | 'recommendations'
  | 'alerts'
  | 'reports'
  | 'landing';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currency: Currency;
  toggleCurrency: () => void;
  selectedSupplier: Supplier | null;
  setSelectedSupplier: (supplier: Supplier | null) => void;
  openSupplierDetail: (supplierId: string) => void;
  selectedLocationId: string | null;
  setSelectedLocationId: (id: string | null) => void;
  highlightedNetworkPath: string | null;
  setHighlightedNetworkPath: (supplierId: string | null) => void;
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  dataFreshness: string;
  refreshData: () => void;
  toasts: Toast[];
  addToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  simulationPreset: string | null;
  setSimulationPreset: (preset: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [highlightedNetworkPath, setHighlightedNetworkPath] = useState<string | null>('sup-02');
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [dataFreshness, setDataFreshness] = useState<string>('2 minutes ago');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [simulationPreset, setSimulationPreset] = useState<string | null>(null);

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'INR' ? 'USD' : 'INR'));
    addToast(
      'Currency Switched',
      currency === 'INR' ? 'Switched display currency to USD ($)' : 'Switched display currency to INR (₹)',
      'info'
    );
  };

  const openSupplierDetail = (supplierId: string) => {
    const found = mockSuppliers.find(s => s.id === supplierId);
    if (found) {
      setSelectedSupplier(found);
    }
  };

  const refreshData = () => {
    setDataFreshness('Just now');
    addToast('Telemetry Synchronized', 'All supplier feeds, shipping telemetry, and weather signals updated.', 'success');
  };

  const addToast = (title: string, message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currency,
        toggleCurrency,
        selectedSupplier,
        setSelectedSupplier,
        openSupplierDetail,
        selectedLocationId,
        setSelectedLocationId,
        highlightedNetworkPath,
        setHighlightedNetworkPath,
        copilotOpen,
        setCopilotOpen,
        notificationsOpen,
        setNotificationsOpen,
        dataFreshness,
        refreshData,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        simulationPreset,
        setSimulationPreset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
