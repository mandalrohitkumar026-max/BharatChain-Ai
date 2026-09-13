import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { NotificationsDrawer } from './components/layout/NotificationsDrawer';
import { AiCopilotDrawer } from './components/copilot/AiCopilotDrawer';
import { ToastContainer } from './components/common/ToastContainer';

// Views
import { ExecutiveOverview } from './components/views/ExecutiveOverview';
import { EarlyWarnings } from './components/views/EarlyWarnings';
import { SupplyNetwork } from './components/views/SupplyNetwork';
import { SuppliersList } from './components/views/SuppliersList';
import { ComponentsList } from './components/views/ComponentsList';
import { FactoriesList } from './components/views/FactoriesList';
import { InventoryRisk } from './components/views/InventoryRisk';
import { LogisticsIntelligence } from './components/views/LogisticsIntelligence';
import { ScenarioSimulator } from './components/views/ScenarioSimulator';
import { AlternativeSuppliers } from './components/views/AlternativeSuppliers';
import { AlertCenter } from './components/views/AlertCenter';
import { ReportsView } from './components/views/ReportsView';
import { LandingPage } from './components/landing/LandingPage';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  // If viewing the Commercial Landing Page
  if (activeTab === 'landing') {
    return <LandingPage />;
  }

  // Enterprise B2B SaaS Application Shell
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100/70 font-sans text-slate-900">
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navigation */}
        <TopNav />

        {/* Dynamic Main View Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && <ExecutiveOverview />}
            {activeTab === 'early-warnings' && <EarlyWarnings />}
            {activeTab === 'supply-network' && <SupplyNetwork />}
            {activeTab === 'suppliers' && <SuppliersList />}
            {activeTab === 'components' && <ComponentsList />}
            {activeTab === 'factories' && <FactoriesList />}
            {activeTab === 'inventory' && <InventoryRisk />}
            {activeTab === 'logistics' && <LogisticsIntelligence />}
            {activeTab === 'scenarios' && <ScenarioSimulator />}
            {activeTab === 'recommendations' && <AlternativeSuppliers />}
            {activeTab === 'alerts' && <AlertCenter />}
            {activeTab === 'reports' && <ReportsView />}
          </div>
        </main>
      </div>

      {/* Drawers & Modals */}
      <NotificationsDrawer />
      <AiCopilotDrawer />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
