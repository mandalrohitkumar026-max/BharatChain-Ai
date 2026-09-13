import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Building2,
  Cpu,
  Factory as FactoryIcon,
  Package,
  Users,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Globe,
  Truck,
  DollarSign,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useApp();

  // Interactive Disruption Propagation Hero Demo
  const [propagationStep, setPropagationStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const triggerPropagation = () => {
    setIsSimulating(true);
    setPropagationStep(1);

    const steps = [1, 2, 3, 4, 5];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setPropagationStep(step);
        if (step === 5) {
          setIsSimulating(false);
        }
      }, (idx + 1) * 700);
    });
  };

  const resetPropagation = () => {
    setPropagationStep(1);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-base tracking-tight">ChainSentinel</span>
              <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200 uppercase">AI</span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#hero" className="hover:text-slate-900 transition-colors">Platform</a>
          <a href="#workflow" className="hover:text-slate-900 transition-colors">Signature Workflow</a>
          <a href="#features" className="hover:text-slate-900 transition-colors">Intelligence Engine</a>
          <a href="#roi" className="hover:text-slate-900 transition-colors">Enterprise ROI</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('overview')}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section (Exact prompt specification) */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800 mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Next-Generation Supply Chain Risk Intelligence</span>
        </div>

        {/* Hero Heading (Exact prompt text) */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Predict Supply Chain Disruptions Before They Stop Production.
        </h1>

        {/* Subtitle (Exact prompt text) */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          AI-powered supply-chain intelligence connecting global events, supplier risk, logistics, inventory and production into one decision platform.
        </p>

        {/* Hero Buttons (Exact prompt buttons) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('early-warnings')}
            className="px-5 py-3 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-sm font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <span>Explore Risk Intelligence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className="px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-md text-sm font-semibold flex items-center gap-2 transition-all shadow-2xs"
          >
            <Play className="w-4 h-4 text-sky-700" />
            <span>View Demo</span>
          </button>
        </div>

        {/* Hero Visualization: Interactive Disruption Propagation Widget (Exact prompt requirement) */}
        <div className="mt-14 p-6 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white shadow-lg text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <h3 className="text-sm font-bold text-slate-900">
                  Live Disruption Propagation Simulator
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Watch a Tier-1 supplier bottleneck propagate downstream into factory starvation and customer delivery failure.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerPropagation}
                disabled={isSimulating}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Play className="w-3 h-3" />
                <span>Simulate Port Typhoon Shockwave</span>
              </button>
              <button
                onClick={resetPropagation}
                className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-md text-xs"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-6 relative">
            {/* Step 1: Supplier */}
            <div className={`p-4 rounded-lg border transition-all ${
              propagationStep >= 1 ? 'border-red-400 bg-red-50/70 ring-2 ring-red-200' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Tier-1 Supplier</span>
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Supplier X</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Shenzhen Micro Dynamics</div>
              <div className="mt-3 text-[10px] font-mono font-bold text-red-700 bg-white p-1 rounded border border-red-200">
                +7d Port Congestion
              </div>
            </div>

            {/* Step 2: Component */}
            <div className={`p-4 rounded-lg border transition-all ${
              propagationStep >= 2 ? 'border-amber-400 bg-amber-50/70 ring-2 ring-amber-200' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Critical Component</span>
                <Cpu className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Component A</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Power Controller 800V</div>
              <div className="mt-3 text-[10px] font-mono font-bold text-amber-800 bg-white p-1 rounded border border-amber-200">
                11d Buffer Left
              </div>
            </div>

            {/* Step 3: Factory */}
            <div className={`p-4 rounded-lg border transition-all ${
              propagationStep >= 3 ? 'border-orange-400 bg-orange-50/70 ring-2 ring-orange-200' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Assembly Plant</span>
                <FactoryIcon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Factory 02</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Chennai EV Gigafactory</div>
              <div className="mt-3 text-[10px] font-mono font-bold text-orange-800 bg-white p-1 rounded border border-orange-200">
                Line 1 Starvation
              </div>
            </div>

            {/* Step 4: Product */}
            <div className={`p-4 rounded-lg border transition-all ${
              propagationStep >= 4 ? 'border-rose-400 bg-rose-50/70 ring-2 ring-rose-200' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>Finished Goods</span>
                <Package className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-bold text-slate-900 text-sm">Product Y</div>
              <div className="text-[11px] text-slate-500 mt-0.5">EV Powertrain X1</div>
              <div className="mt-3 text-[10px] font-mono font-bold text-rose-800 bg-white p-1 rounded border border-rose-200">
                -14% Monthly Volume
              </div>
            </div>

            {/* Step 5: Customer */}
            <div className={`p-4 rounded-lg border transition-all ${
              propagationStep >= 5 ? 'border-red-600 bg-red-100 ring-2 ring-red-300' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <span>End Customers</span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-bold text-slate-900 text-sm">12,400 Customers</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Fleet & OEM Backlog</div>
              <div className="mt-3 text-[10px] font-mono font-bold text-red-900 bg-white p-1 rounded border border-red-300">
                ₹4.8 Cr Revenue Exposure
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">
              ChainSentinel Autonomous Resolution: <strong className="text-emerald-700">Move 40% procurement to Titan Precision Instruments. Net ROI: 13.3x.</strong>
            </span>
            <button
              onClick={() => setActiveTab('supply-network')}
              className="font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
            >
              Explore In Full App Shell →
            </button>
          </div>
        </div>
      </section>

      {/* Signature Workflow Section (Exact prompt specification: DETECT → PREDICT → UNDERSTAND → SIMULATE → RECOMMEND → ACT) */}
      <section id="workflow" className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Closed-Loop Operational Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              The 6-Step Signature Resilience Loop
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Transform unstructured supply telemetry into proactive business decisions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { step: '01', name: 'DETECT', desc: 'Continuous global tracking across AIS ships, weather, and supplier financial telemetry.' },
              { step: '02', name: 'PREDICT', desc: 'Bayesian causal reasoning forecasting line starvation horizons 10–25 days ahead.' },
              { step: '03', name: 'UNDERSTAND', desc: 'Root-cause explanation answering exactly WHY the risk exists across tiers.' },
              { step: '04', name: 'SIMULATE', desc: 'Interactive what-if stress testing modeling production drops and financial exposure.' },
              { step: '05', name: 'RECOMMEND', desc: 'Dual-sourcing optimization engine quantifying unit cost vs avoided factory downtime.' },
              { step: '06', name: 'ACT', desc: 'Automated work-order generation, ERP purchase orders, and air charter allocation.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-1.5 text-xs">
                <div className="text-[10px] font-mono font-bold text-sky-700">{item.step}</div>
                <div className="font-bold text-slate-900 text-sm tracking-tight">{item.name}</div>
                <p className="text-slate-600 text-[11px] leading-relaxed mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Intelligence Engine (Section 16 in prompt) */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
            Comprehensive Risk Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            The Core Intelligence Engine
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            6 specialized intelligence layers monitoring every potential point of failure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Supplier Risk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Altman Z-score financial health, delivery punctuality, machine capacity constraints, and historical vendor reliability.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">External & Geopolitical</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Naval choke points, Taiwan Strait corridors, regional strikes, export restrictions, and severe weather anomalies.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Logistics & Port Congestion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Live AIS container vessel dwell times, customs clearing delays at JNPT Mumbai & Yantian, and carrier ETA variance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Market & Commodity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time spot indices for Gallium Nitride, Lithium hydroxide, copper, currency exchange rate shifts, and demand shocks.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-orange-50 text-orange-700 flex items-center justify-center font-bold">
              <FactoryIcon className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Operational & Plant Capacity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Factory bottleneck detection, machine downtime, workforce availability, and regional industrial grid power rationing.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Cyber & IT Outage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sub-tier EDI server lockouts, vendor cybersecurity incidents, ransomware interruptions, and port customs system status.
            </p>
          </div>
        </div>
      </section>

      {/* ROI & Bottom CTA Banner */}
      <section id="roi" className="bg-slate-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Ready to Protect Your Production Lines?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Join Fortune 500 manufacturers and enterprise procurement directors utilizing ChainSentinel AI to preempt supply catastrophes.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-md text-sm transition-all shadow-lg"
            >
              Enter Enterprise Platform
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-md text-sm border border-slate-700 transition-all"
            >
              Run Scenario Simulator
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            © 2026 ChainSentinel AI Inc. All rights reserved. Enterprise Supply Chain Risk Intelligence.
          </div>
          <div className="flex items-center justify-center gap-6 font-medium text-slate-600">
            <span>SOC2 Type II Certified</span>
            <span>ISO 27001 Compliant</span>
            <span>IATF 16949 Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
