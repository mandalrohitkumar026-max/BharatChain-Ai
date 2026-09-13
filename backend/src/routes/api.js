import { Router } from 'express';
import { mockSuppliers, mockComponents, mockFactories, mockProducts, mockShipments, mockPortCongestions, mockEarlyWarnings, mockAlerts, mockAlternativeComparisons, executiveOverviewMetrics, mockRiskTrendData } from '../data/mockData.js';
export const apiRouter = Router();
// Health Check
apiRouter.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'ChainSentinel AI Enterprise Engine',
        version: '4.2.0',
        monitoredNodes: {
            suppliers: mockSuppliers.length,
            components: mockComponents.length,
            factories: mockFactories.length,
            products: mockProducts.length,
            shipments: mockShipments.length
        }
    });
});
// Executive Overview
apiRouter.get('/overview', (_req, res) => {
    res.json({
        metrics: executiveOverviewMetrics,
        riskTrends: mockRiskTrendData,
        featuredDisruption: mockEarlyWarnings[0],
        activeAlertsCount: mockAlerts.length,
        userProfile: {
            name: 'Rohit Kumar',
            role: 'VP Global Supply Chain',
            organization: 'Bharat Mobility & Industrial Group'
        }
    });
});
// Early Warnings
apiRouter.get('/early-warnings', (req, res) => {
    const { severity } = req.query;
    let data = mockEarlyWarnings;
    if (severity && severity !== 'all') {
        data = data.filter(w => w.severity === severity);
    }
    res.json({ count: data.length, data });
});
// Suppliers List & Search/Filter
apiRouter.get('/suppliers', (req, res) => {
    const { search, country, risk, status } = req.query;
    let results = [...mockSuppliers];
    if (search && typeof search === 'string') {
        const q = search.toLowerCase();
        results = results.filter(s => s.name.toLowerCase().includes(q) ||
            s.code.toLowerCase().includes(q) ||
            s.city.toLowerCase().includes(q));
    }
    if (country && country !== 'all') {
        results = results.filter(s => s.country === country);
    }
    if (status && status !== 'all') {
        results = results.filter(s => s.status === status);
    }
    if (risk && risk !== 'all') {
        if (risk === 'critical')
            results = results.filter(s => s.riskScore >= 75);
        else if (risk === 'high')
            results = results.filter(s => s.riskScore >= 60 && s.riskScore < 75);
        else if (risk === 'medium')
            results = results.filter(s => s.riskScore >= 35 && s.riskScore < 60);
        else if (risk === 'low')
            results = results.filter(s => s.riskScore < 35);
    }
    res.json({
        total: results.length,
        countries: Array.from(new Set(mockSuppliers.map(s => s.country))).sort(),
        data: results
    });
});
// Single Supplier Profile
apiRouter.get('/suppliers/:id', (req, res) => {
    const { id } = req.params;
    const supplier = mockSuppliers.find(s => s.id === id);
    if (!supplier) {
        res.status(404).json({ error: 'Supplier not found' });
        return;
    }
    const affectedComponentsData = mockComponents.filter(c => supplier.affectedComponents.includes(c.id));
    const affectedFactoriesData = mockFactories.filter(f => supplier.affectedFactories.includes(f.id));
    res.json({
        supplier,
        affectedComponents: affectedComponentsData,
        affectedFactories: affectedFactoriesData
    });
});
// Components Catalog & Stockout Risk
apiRouter.get('/components', (req, res) => {
    const { category, singleSource, stockoutLikely } = req.query;
    let data = [...mockComponents];
    if (category && category !== 'all') {
        data = data.filter(c => c.category === category);
    }
    if (singleSource === 'true') {
        data = data.filter(c => c.isSingleSource);
    }
    if (stockoutLikely === 'true') {
        data = data.filter(c => c.daysRemaining <= 14);
    }
    res.json({
        total: data.length,
        criticalStockouts: mockComponents.filter(c => c.daysRemaining <= 14).length,
        singleSourceCount: mockComponents.filter(c => c.isSingleSource).length,
        data
    });
});
// Factories Exposure
apiRouter.get('/factories', (_req, res) => {
    res.json({
        total: mockFactories.length,
        operational: mockFactories.filter(f => f.status === 'Operational').length,
        atRisk: mockFactories.filter(f => f.status !== 'Operational').length,
        data: mockFactories
    });
});
// Logistics & Shipments
apiRouter.get('/shipments', (req, res) => {
    const { status } = req.query;
    let data = [...mockShipments];
    if (status && status !== 'all') {
        data = data.filter(s => s.status === status);
    }
    res.json({
        totalShipments: data.length,
        delayedCount: mockShipments.filter(s => s.delayDays > 0).length,
        portCongestion: mockPortCongestions,
        shipments: data
    });
});
// Scenario Simulator Calculation Engine
apiRouter.post('/simulate', (req, res) => {
    const { scenarioType = 'supplier_failure', durationDays = 30, severityPct = 100 } = req.body;
    const durationFactor = Number(durationDays) / 30;
    const severityFactor = Number(severityPct) / 100;
    const productionImpact = -Math.min(48, Math.round(14 * Math.sqrt(durationFactor) * severityFactor));
    const revenueAtRiskINR = Number((8.2 * durationFactor * severityFactor).toFixed(1));
    const revenueAtRiskUSD = Number((revenueAtRiskINR * 0.12).toFixed(1));
    const customersAffected = Math.round(12400 * Math.min(2.5, durationFactor * severityFactor));
    const additionalProcurementCostINR = Number((34 * durationFactor * (0.8 + 0.2 * severityFactor)).toFixed(1));
    const additionalProcurementCostUSD = Number((additionalProcurementCostINR * 1.2).toFixed(1));
    res.json({
        scenarioType,
        durationDays,
        severityPct,
        results: {
            productionImpactPct: productionImpact,
            revenueAtRiskINR,
            revenueAtRiskUSD,
            customersAffected,
            additionalProcurementCostINR,
            additionalProcurementCostUSD,
            stockoutsCount: Math.round(4 * Math.sqrt(durationFactor))
        },
        playbook: [
            {
                title: 'Dual-Source Split',
                action: 'Reallocate 40% procurement volume to Titan Precision Instruments.',
                avoidedLossINR: 7.4,
                roi: '13.3x'
            },
            {
                title: 'Air Charter Backup',
                action: 'Reserve 5,000 units emergency consignment via Tokyo Haneda gateway.'
            },
            {
                title: 'Factory Line Rebalancing',
                action: 'Re-sequence assembly run to prioritize high-margin EV Powertrain X1.'
            }
        ]
    });
});
// Alternative Sourcing Engine
apiRouter.get('/alternatives', (_req, res) => {
    res.json({
        comparisons: mockAlternativeComparisons
    });
});
// AI Supply Chain Copilot
apiRouter.post('/copilot', (req, res) => {
    const { query = '' } = req.body;
    const q = query.toLowerCase();
    let response;
    if (q.includes('supplier x') || q.includes('fail')) {
        response = {
            query,
            finding: 'A 30-day failure of Supplier X (Shenzhen Micro Dynamics) triggers an immediate cascading starvation of Factory 02 Chennai assembly.',
            evidence: [
                'Current inventory on-hand: 18,000 units (12 days buffer remaining).',
                'No incoming sea freight arriving before Day 19 due to Yantian port congestion.',
                'GaN 800V Controller is currently single-sourced with 0 local secondary inventory.'
            ],
            impact: 'Production stoppage by Day 13; -14% total vehicle production output; ₹8.2 Cr revenue at risk; 12,400 vehicle deliveries deferred.',
            recommendation: 'Execute emergency qualification with Titan Precision (Bengaluru) at ₹108/unit (7-day lead time) for 40% volume, and air freight 5,000 units from GlobalTech Tokyo.',
            actions: ['Simulate 30-Day Failure', 'Execute Dual-Sourcing Plan', 'View Downstream Path']
        };
    }
    else if (q.includes('single-source') || q.includes('single source')) {
        response = {
            query,
            finding: 'Identified 14 single-source components across 3 critical vehicle architectures with zero pre-qualified backup.',
            evidence: [
                'Component PC-800V-X4 (Power Controller) solely manufactured by Shenzhen Micro.',
                'Component ASIC-BMS-16C (BMS Balancing ASIC) produced exclusively in Hsinchu, Taiwan.',
                'Average requalification and PPAP cycle time for automotive grade silicon is 42 days.'
            ],
            impact: 'Combined downstream value at risk exceeds ₹24.5 Cr if any maritime or fab disruption exceeds 14 days.',
            recommendation: 'Contractual dual-sourcing mandate: accelerate tooling replication with Titan Precision and Osaka Cleanrooms under Framework Agreement Section 8.',
            actions: ['Open Components Catalog', 'Simulate Dual-Source Economics']
        };
    }
    else {
        response = {
            query,
            finding: 'Shenzhen Micro Dynamics (Supplier X) and ABC Components Ltd exhibit critical vulnerability signals threatening line stoppages.',
            evidence: [
                'Shenzhen Micro: Port Yantian dwell times spiked +42% with typhoon advisory; +7 days shipping delay on GaN controllers.',
                'ABC Components: Altman Z-score degraded to 1.38 (Distress zone) with restricted working capital lines.',
                'Both suppliers control 8 sole-sourced components with less than 12 days safety stock on site.'
            ],
            impact: 'Immediate production exposure of ₹8.4 Cr across EV Powertrain X1 (12,400 customers) and Telematics ECU lines within 12–16 days.',
            recommendation: 'Initiate immediate 40%–60% volume shift to qualified secondary sources (Titan Precision Instruments & GlobalTech Japan) and secure air-freight buffer consignment.',
            actions: ['Simulate Response', 'View Supplier Profile', 'Highlight Network Path']
        };
    }
    res.json(response);
});
// Risk Alerts
apiRouter.get('/alerts', (req, res) => {
    const { severity } = req.query;
    let data = [...mockAlerts];
    if (severity && severity !== 'all') {
        data = data.filter(a => a.severity === severity);
    }
    res.json({
        total: data.length,
        criticalCount: mockAlerts.filter(a => a.severity === 'critical').length,
        alerts: data
    });
});
