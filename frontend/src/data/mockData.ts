import {
  Supplier,
  Component,
  Factory,
  Product,
  Shipment,
  PortCongestion,
  RiskAlert,
  EarlyWarning,
  AlternativeComparison
} from '../types';

// ==========================================
// 1. SUPPLIERS (52 Realistic Global & Indian)
// ==========================================
export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-01',
    name: 'ABC Components Ltd',
    code: 'SUP-IND-01',
    country: 'India',
    countryCode: 'IN',
    city: 'Pune',
    riskScore: 86,
    deliveryPerformance: 81,
    financialRisk: 'High',
    logisticsRisk: 'High',
    capacity: 92,
    componentsCount: 4,
    status: 'Critical',
    riskBreakdown: {
      financial: 84,
      delivery: 88,
      geopolitical: 42,
      weather: 65,
      transportation: 80,
      cyber: 38,
      capacity: 92
    },
    historicalTrend: [
      { month: 'Apr', score: 38 },
      { month: 'May', score: 45 },
      { month: 'Jun', score: 56 },
      { month: 'Jul', score: 71 },
      { month: 'Aug', score: 82 },
      { month: 'Sep', score: 86 },
    ],
    affectedComponents: ['cmp-01', 'cmp-02', 'cmp-15', 'cmp-22'],
    affectedProducts: ['prd-01', 'prd-02', 'prd-04', 'prd-07', 'prd-11', 'prd-14'],
    affectedFactories: ['fac-02', 'fac-01'],
    inventoryCoverageDays: 11,
    recommendedAction: 'Diversify 40% of procurement volume to Supplier Z (Titan Precision).',
    alternativeSupplierId: 'sup-03',
    contact: {
      lead: 'Ramesh Kulkarni',
      email: 'r.kulkarni@abccomponents.in',
      phone: '+91 98201 44821'
    },
    spendAnnualINR: 42.5,
    spendAnnualUSD: 5.1,
    singleSourceRisk: true,
    coordinates: [18.5204, 73.8567]
  },
  {
    id: 'sup-02',
    name: 'Shenzhen Micro Dynamics',
    code: 'SUP-CHN-04',
    country: 'China',
    countryCode: 'CN',
    city: 'Shenzhen',
    riskScore: 87,
    deliveryPerformance: 76,
    financialRisk: 'Medium',
    logisticsRisk: 'Critical',
    capacity: 95,
    componentsCount: 12,
    status: 'Critical',
    riskBreakdown: {
      financial: 54,
      delivery: 89,
      geopolitical: 78,
      weather: 91,
      transportation: 94,
      cyber: 62,
      capacity: 95
    },
    historicalTrend: [
      { month: 'Apr', score: 52 },
      { month: 'May', score: 58 },
      { month: 'Jun', score: 64 },
      { month: 'Jul', score: 72 },
      { month: 'Aug', score: 81 },
      { month: 'Sep', score: 87 },
    ],
    affectedComponents: ['cmp-01', 'cmp-05', 'cmp-09', 'cmp-18'],
    affectedProducts: ['prd-01', 'prd-03', 'prd-05', 'prd-09'],
    affectedFactories: ['fac-02', 'fac-04'],
    inventoryCoverageDays: 12,
    recommendedAction: 'Move 60% procurement volume to GlobalTech Japan immediately.',
    alternativeSupplierId: 'sup-04',
    contact: {
      lead: 'Wei Zhang',
      email: 'w.zhang@shenzhenmicro.cn',
      phone: '+86 755 8329 1044'
    },
    spendAnnualINR: 78.0,
    spendAnnualUSD: 9.4,
    singleSourceRisk: true,
    coordinates: [22.5431, 114.0579]
  },
  {
    id: 'sup-03',
    name: 'Titan Precision Instruments',
    code: 'SUP-IND-08',
    country: 'India',
    countryCode: 'IN',
    city: 'Bengaluru',
    riskScore: 21,
    deliveryPerformance: 98,
    financialRisk: 'Low',
    logisticsRisk: 'Low',
    capacity: 68,
    componentsCount: 6,
    status: 'Low Risk',
    riskBreakdown: {
      financial: 18,
      delivery: 22,
      geopolitical: 15,
      weather: 20,
      transportation: 25,
      cyber: 24,
      capacity: 68
    },
    historicalTrend: [
      { month: 'Apr', score: 24 },
      { month: 'May', score: 22 },
      { month: 'Jun', score: 25 },
      { month: 'Jul', score: 20 },
      { month: 'Aug', score: 22 },
      { month: 'Sep', score: 21 },
    ],
    affectedComponents: ['cmp-01', 'cmp-03'],
    affectedProducts: ['prd-01', 'prd-02'],
    affectedFactories: ['fac-01'],
    inventoryCoverageDays: 34,
    recommendedAction: 'Primary candidate for dual-sourcing ABC Components volume.',
    contact: {
      lead: 'Ananya Rao',
      email: 'a.rao@titanprecision.co.in',
      phone: '+91 80 4122 9000'
    },
    spendAnnualINR: 28.0,
    spendAnnualUSD: 3.4,
    singleSourceRisk: false,
    coordinates: [12.9716, 77.5946]
  },
  {
    id: 'sup-04',
    name: 'GlobalTech Semiconductor Corp',
    code: 'SUP-JPN-02',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Tokyo',
    riskScore: 32,
    deliveryPerformance: 95,
    financialRisk: 'Low',
    logisticsRisk: 'Medium',
    capacity: 74,
    componentsCount: 8,
    status: 'Stable',
    riskBreakdown: {
      financial: 22,
      delivery: 34,
      geopolitical: 30,
      weather: 35,
      transportation: 40,
      cyber: 28,
      capacity: 74
    },
    historicalTrend: [
      { month: 'Apr', score: 35 },
      { month: 'May', score: 32 },
      { month: 'Jun', score: 30 },
      { month: 'Jul', score: 36 },
      { month: 'Aug', score: 34 },
      { month: 'Sep', score: 32 },
    ],
    affectedComponents: ['cmp-01', 'cmp-06', 'cmp-12'],
    affectedProducts: ['prd-01', 'prd-05'],
    affectedFactories: ['fac-02'],
    inventoryCoverageDays: 28,
    recommendedAction: 'Maintain current allocation; evaluate as alternate for power controllers.',
    contact: {
      lead: 'Kenji Sato',
      email: 'k-sato@globaltech-semi.co.jp',
      phone: '+81 3 5555 0192'
    },
    spendAnnualINR: 65.0,
    spendAnnualUSD: 7.8,
    singleSourceRisk: false,
    coordinates: [35.6762, 139.6503]
  },
  {
    id: 'sup-05',
    name: 'Nova Parts GmbH',
    code: 'SUP-DEU-01',
    country: 'Germany',
    countryCode: 'DE',
    city: 'Stuttgart',
    riskScore: 24,
    deliveryPerformance: 97,
    financialRisk: 'Low',
    logisticsRisk: 'Low',
    capacity: 64,
    componentsCount: 3,
    status: 'Low Risk',
    riskBreakdown: {
      financial: 20,
      delivery: 25,
      geopolitical: 28,
      weather: 15,
      transportation: 22,
      cyber: 19,
      capacity: 64
    },
    historicalTrend: [
      { month: 'Apr', score: 26 },
      { month: 'May', score: 25 },
      { month: 'Jun', score: 28 },
      { month: 'Jul', score: 22 },
      { month: 'Aug', score: 25 },
      { month: 'Sep', score: 24 },
    ],
    affectedComponents: ['cmp-08', 'cmp-14'],
    affectedProducts: ['prd-04', 'prd-06'],
    affectedFactories: ['fac-01', 'fac-03'],
    inventoryCoverageDays: 45,
    recommendedAction: 'Reliable Tier-1 partner; low risk profile.',
    contact: {
      lead: 'Marcus Becker',
      email: 'm.becker@novaparts.de',
      phone: '+49 711 8920 110'
    },
    spendAnnualINR: 38.0,
    spendAnnualUSD: 4.6,
    singleSourceRisk: false,
    coordinates: [48.7758, 9.1829]
  },
  {
    id: 'sup-06',
    name: 'Hsinchu Silicon Foundries',
    code: 'SUP-TWN-03',
    country: 'Taiwan',
    countryCode: 'TW',
    city: 'Hsinchu',
    riskScore: 74,
    deliveryPerformance: 88,
    financialRisk: 'Low',
    logisticsRisk: 'High',
    capacity: 98,
    componentsCount: 14,
    status: 'High Risk',
    riskBreakdown: {
      financial: 25,
      delivery: 68,
      geopolitical: 88,
      weather: 72,
      transportation: 75,
      cyber: 70,
      capacity: 98
    },
    historicalTrend: [
      { month: 'Apr', score: 62 },
      { month: 'May', score: 66 },
      { month: 'Jun', score: 68 },
      { month: 'Jul', score: 71 },
      { month: 'Aug', score: 73 },
      { month: 'Sep', score: 74 },
    ],
    affectedComponents: ['cmp-04', 'cmp-10', 'cmp-25'],
    affectedProducts: ['prd-02', 'prd-03', 'prd-08'],
    affectedFactories: ['fac-02', 'fac-05'],
    inventoryCoverageDays: 14,
    recommendedAction: 'Establish safety stock buffer of +21 days due to geopolitical sea-lane tension.',
    contact: {
      lead: 'Chien-Ming Chen',
      email: 'cm.chen@hsfoundry.com.tw',
      phone: '+886 3 578 0221'
    },
    spendAnnualINR: 92.0,
    spendAnnualUSD: 11.1,
    singleSourceRisk: true,
    coordinates: [24.8138, 120.9675]
  },
  {
    id: 'sup-07',
    name: 'Sanand Castings & Alloys',
    code: 'SUP-IND-14',
    country: 'India',
    countryCode: 'IN',
    city: 'Sanand',
    riskScore: 68,
    deliveryPerformance: 84,
    financialRisk: 'Medium',
    logisticsRisk: 'Medium',
    capacity: 88,
    componentsCount: 5,
    status: 'High Risk',
    riskBreakdown: {
      financial: 62,
      delivery: 71,
      geopolitical: 20,
      weather: 55,
      transportation: 64,
      cyber: 30,
      capacity: 88
    },
    historicalTrend: [
      { month: 'Apr', score: 45 },
      { month: 'May', score: 50 },
      { month: 'Jun', score: 58 },
      { month: 'Jul', score: 62 },
      { month: 'Aug', score: 65 },
      { month: 'Sep', score: 68 },
    ],
    affectedComponents: ['cmp-07', 'cmp-19'],
    affectedProducts: ['prd-01', 'prd-04'],
    affectedFactories: ['fac-01', 'fac-06'],
    inventoryCoverageDays: 16,
    recommendedAction: 'Inspect furnace maintenance schedule and raw pig iron inventory.',
    contact: {
      lead: 'Deepak Patel',
      email: 'dpatel@sanandcastings.com',
      phone: '+91 2717 298100'
    },
    spendAnnualINR: 31.0,
    spendAnnualUSD: 3.7,
    singleSourceRisk: false,
    coordinates: [22.9924, 72.3814]
  },
  {
    id: 'sup-08',
    name: 'Seoul Advanced Cathodes',
    code: 'SUP-KOR-02',
    country: 'South Korea',
    countryCode: 'KR',
    city: 'Seoul',
    riskScore: 48,
    deliveryPerformance: 91,
    financialRisk: 'Low',
    logisticsRisk: 'Medium',
    capacity: 82,
    componentsCount: 6,
    status: 'Stable',
    riskBreakdown: {
      financial: 32,
      delivery: 45,
      geopolitical: 52,
      weather: 40,
      transportation: 48,
      cyber: 38,
      capacity: 82
    },
    historicalTrend: [
      { month: 'Apr', score: 40 },
      { month: 'May', score: 42 },
      { month: 'Jun', score: 46 },
      { month: 'Jul', score: 47 },
      { month: 'Aug', score: 49 },
      { month: 'Sep', score: 48 },
    ],
    affectedComponents: ['cmp-11', 'cmp-28'],
    affectedProducts: ['prd-05', 'prd-09'],
    affectedFactories: ['fac-02'],
    inventoryCoverageDays: 24,
    recommendedAction: 'Monitor lithium precursor pricing indexed contracts.',
    contact: {
      lead: 'Min-ho Park',
      email: 'mhpark@seoulcathodes.co.kr',
      phone: '+82 2 3404 1120'
    },
    spendAnnualINR: 84.0,
    spendAnnualUSD: 10.1,
    singleSourceRisk: true,
    coordinates: [37.5665, 126.9780]
  },
  {
    id: 'sup-09',
    name: 'Chennai Harness Systems',
    code: 'SUP-IND-19',
    country: 'India',
    countryCode: 'IN',
    city: 'Chennai',
    riskScore: 35,
    deliveryPerformance: 94,
    financialRisk: 'Low',
    logisticsRisk: 'Low',
    capacity: 76,
    componentsCount: 7,
    status: 'Stable',
    riskBreakdown: {
      financial: 28,
      delivery: 32,
      geopolitical: 18,
      weather: 45,
      transportation: 30,
      cyber: 25,
      capacity: 76
    },
    historicalTrend: [
      { month: 'Apr', score: 32 },
      { month: 'May', score: 34 },
      { month: 'Jun', score: 33 },
      { month: 'Jul', score: 38 },
      { month: 'Aug', score: 36 },
      { month: 'Sep', score: 35 },
    ],
    affectedComponents: ['cmp-13', 'cmp-24'],
    affectedProducts: ['prd-01', 'prd-03', 'prd-07'],
    affectedFactories: ['fac-02', 'fac-03'],
    inventoryCoverageDays: 31,
    recommendedAction: 'Stable performance, local supplier with low border transit friction.',
    contact: {
      lead: 'Karthik Subramanian',
      email: 'karthik.s@chennaiharness.in',
      phone: '+91 44 2819 0300'
    },
    spendAnnualINR: 22.4,
    spendAnnualUSD: 2.7,
    singleSourceRisk: false,
    coordinates: [13.0827, 80.2707]
  },
  {
    id: 'sup-10',
    name: 'Detroit Automotive Sensors',
    code: 'SUP-USA-05',
    country: 'United States',
    countryCode: 'US',
    city: 'Detroit',
    riskScore: 41,
    deliveryPerformance: 92,
    financialRisk: 'Low',
    logisticsRisk: 'Medium',
    capacity: 70,
    componentsCount: 5,
    status: 'Stable',
    riskBreakdown: {
      financial: 24,
      delivery: 38,
      geopolitical: 35,
      weather: 30,
      transportation: 55,
      cyber: 45,
      capacity: 70
    },
    historicalTrend: [
      { month: 'Apr', score: 39 },
      { month: 'May', score: 41 },
      { month: 'Jun', score: 40 },
      { month: 'Jul', score: 42 },
      { month: 'Aug', score: 43 },
      { month: 'Sep', score: 41 },
    ],
    affectedComponents: ['cmp-16', 'cmp-30'],
    affectedProducts: ['prd-06', 'prd-10'],
    affectedFactories: ['fac-01'],
    inventoryCoverageDays: 26,
    recommendedAction: 'Air cargo route consolidation to reduce transatlantic tariffs.',
    contact: {
      lead: 'Sarah Jenkins',
      email: 'sjenkins@detroitsensors.com',
      phone: '+1 313 555 0184'
    },
    spendAnnualINR: 44.0,
    spendAnnualUSD: 5.3,
    singleSourceRisk: false,
    coordinates: [42.3314, -83.0458]
  },
  // Additional 42 suppliers to provide rich enterprise density
  ...Array.from({ length: 42 }).map((_, idx) => {
    const idNum = idx + 11;
    const countries = [
      { c: 'India', code: 'IN', cities: ['Gurgaon', 'Faridabad', 'Hyderabad', 'Ahmedabad', 'Coimbatore', 'Jamshedpur'], lat: 20.5937, lng: 78.9629 },
      { c: 'Vietnam', code: 'VN', cities: ['Hai Phong', 'Ho Chi Minh', 'Da Nang'], lat: 14.0583, lng: 108.2772 },
      { c: 'Germany', code: 'DE', cities: ['Munich', 'Frankfurt', 'Dortmund'], lat: 51.1657, lng: 10.4515 },
      { c: 'Japan', code: 'JP', cities: ['Osaka', 'Nagoya', 'Kyoto'], lat: 36.2048, lng: 138.2529 },
      { c: 'Taiwan', code: 'TW', cities: ['Tainan', 'Taichung', 'Taipei'], lat: 23.6978, lng: 120.9605 },
      { c: 'Mexico', code: 'MX', cities: ['Monterrey', 'Saltillo', 'Tijuana'], lat: 23.6345, lng: -102.5528 }
    ];
    const countryObj = countries[idx % countries.length];
    const city = countryObj.cities[idx % countryObj.cities.length];
    const score = Math.floor(18 + ((idx * 17) % 73));
    const status = score >= 75 ? 'Critical' : score >= 60 ? 'High Risk' : score >= 35 ? 'Stable' : 'Low Risk';
    const delivery = Math.max(72, Math.min(99, 100 - Math.floor(score * 0.28)));
    
    return {
      id: `sup-${idNum}`,
      name: `${city} ${['Precision', 'Dynamics', 'Tech Alloys', 'Electromech', 'Polymers', 'Microtech', 'Motors', 'Logix'][idx % 8]}`,
      code: `SUP-${countryObj.code}-${idNum.toString().padStart(2, '0')}`,
      country: countryObj.c,
      countryCode: countryObj.code,
      city,
      riskScore: score,
      deliveryPerformance: delivery,
      financialRisk: (score > 70 ? 'High' : score > 45 ? 'Medium' : 'Low') as 'Low' | 'Medium' | 'High' | 'Critical',
      logisticsRisk: (score > 65 ? 'High' : score > 40 ? 'Medium' : 'Low') as 'Low' | 'Medium' | 'High' | 'Critical',
      capacity: 60 + (idx * 3) % 38,
      componentsCount: 2 + (idx % 9),
      status: status as 'Critical' | 'High Risk' | 'Stable' | 'Low Risk',
      riskBreakdown: {
        financial: Math.min(95, score + (idx % 15) - 7),
        delivery: Math.min(95, score + 4),
        geopolitical: countryObj.c === 'Taiwan' || countryObj.c === 'China' ? 82 : 30 + (idx % 20),
        weather: 25 + (idx % 40),
        transportation: score > 50 ? 68 : 32,
        cyber: 20 + (idx % 35),
        capacity: 60 + (idx % 35)
      },
      historicalTrend: [
        { month: 'Apr', score: Math.max(15, score - 12) },
        { month: 'May', score: Math.max(15, score - 8) },
        { month: 'Jun', score: Math.max(15, score - 4) },
        { month: 'Jul', score: Math.max(15, score - 2) },
        { month: 'Aug', score: score },
        { month: 'Sep', score },
      ],
      affectedComponents: [`cmp-${(idx % 30) + 1}`, `cmp-${((idx + 5) % 30) + 1}`],
      affectedProducts: [`prd-${(idx % 12) + 1}`],
      affectedFactories: [`fac-${(idx % 6) + 1}`],
      inventoryCoverageDays: Math.floor(8 + (100 - score) * 0.4),
      recommendedAction: score > 70 ? 'Audit contingency inventory and activate alternative supplier RFQ.' : 'Standard quarterly vendor evaluation.',
      contact: {
        lead: `Procurement Lead ${idNum}`,
        email: `contact@sup${idNum}-${city.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `+${countryObj.code === 'IN' ? '91' : countryObj.code === 'DE' ? '49' : '1'} 555 010${idNum}`
      },
      spendAnnualINR: Number((12 + (idx * 3.7) % 65).toFixed(1)),
      spendAnnualUSD: Number(((12 + (idx * 3.7) % 65) * 0.12).toFixed(1)),
      singleSourceRisk: score > 68,
      coordinates: [countryObj.lat + (idx % 5) * 0.5, countryObj.lng + (idx % 5) * 0.5] as [number, number]
    };
  })
];

// ==========================================
// 2. COMPONENTS (100+ Catalog Items)
// ==========================================
export const mockComponents: Component[] = [
  {
    id: 'cmp-01',
    name: 'Power Controller 800V GaN',
    partNumber: 'PC-800V-X4',
    category: 'Power Electronics',
    tier: 1,
    currentInventory: 18000,
    dailyConsumption: 1500,
    incomingSupply: 10500,
    daysRemaining: 12,
    supplierId: 'sup-02',
    supplierName: 'Shenzhen Micro Dynamics',
    alternateSupplierId: 'sup-04',
    stockoutRisk: true,
    unitCostINR: 8400,
    unitCostUSD: 101,
    leadTimeDays: 18,
    affectedProducts: ['prd-01', 'prd-02'],
    isSingleSource: true,
    specifications: 'Automotive Grade AEC-Q101 Qualified Gallium Nitride Inverter Driver'
  },
  {
    id: 'cmp-02',
    name: 'Microcontroller Telematics Core',
    partNumber: 'MCU-TEL-32B',
    category: 'Semiconductors',
    tier: 1,
    currentInventory: 9400,
    dailyConsumption: 850,
    incomingSupply: 4000,
    daysRemaining: 11,
    supplierId: 'sup-01',
    supplierName: 'ABC Components Ltd',
    alternateSupplierId: 'sup-03',
    stockoutRisk: true,
    unitCostINR: 3200,
    unitCostUSD: 38.5,
    leadTimeDays: 16,
    affectedProducts: ['prd-01', 'prd-03', 'prd-07'],
    isSingleSource: true,
    specifications: '32-Bit Dual-Core Lockstep CAN-FD / Ethernet Gateway'
  },
  {
    id: 'cmp-03',
    name: 'Lithium NMC-811 Cathode Foil',
    partNumber: 'CAT-NMC-811',
    category: 'Battery Materials',
    tier: 2,
    currentInventory: 42000,
    dailyConsumption: 2800,
    incomingSupply: 25000,
    daysRemaining: 15,
    supplierId: 'sup-08',
    supplierName: 'Seoul Advanced Cathodes',
    alternateSupplierId: 'sup-05',
    stockoutRisk: false,
    unitCostINR: 14200,
    unitCostUSD: 171,
    leadTimeDays: 24,
    affectedProducts: ['prd-05', 'prd-09'],
    isSingleSource: false,
    specifications: 'High-density 260 Wh/kg coated cathode roll 450mm width'
  },
  {
    id: 'cmp-04',
    name: 'BMS Cell Balancing ASIC',
    partNumber: 'ASIC-BMS-16C',
    category: 'Semiconductors',
    tier: 1,
    currentInventory: 14200,
    dailyConsumption: 1200,
    incomingSupply: 0,
    daysRemaining: 11,
    supplierId: 'sup-06',
    supplierName: 'Hsinchu Silicon Foundries',
    alternateSupplierId: 'sup-04',
    stockoutRisk: true,
    unitCostINR: 2100,
    unitCostUSD: 25.3,
    leadTimeDays: 28,
    affectedProducts: ['prd-01', 'prd-05'],
    isSingleSource: true,
    specifications: '16-channel daisy-chained high-voltage battery monitor'
  },
  {
    id: 'cmp-05',
    name: 'Silicon Carbide (SiC) MOSFET Array',
    partNumber: 'SIC-MOS-1200',
    category: 'Power Electronics',
    tier: 1,
    currentInventory: 26000,
    dailyConsumption: 1800,
    incomingSupply: 15000,
    daysRemaining: 14,
    supplierId: 'sup-02',
    supplierName: 'Shenzhen Micro Dynamics',
    alternateSupplierId: 'sup-04',
    stockoutRisk: true,
    unitCostINR: 11500,
    unitCostUSD: 138,
    leadTimeDays: 22,
    affectedProducts: ['prd-01', 'prd-04'],
    isSingleSource: true,
    specifications: '1200V 350A automotive half-bridge power module'
  },
  {
    id: 'cmp-06',
    name: 'Precision Shunt Resistor 500A',
    partNumber: 'RES-SNT-500',
    category: 'Passive Components',
    tier: 2,
    currentInventory: 55000,
    dailyConsumption: 1600,
    incomingSupply: 30000,
    daysRemaining: 34,
    supplierId: 'sup-04',
    supplierName: 'GlobalTech Semiconductor Corp',
    alternateSupplierId: 'sup-03',
    stockoutRisk: false,
    unitCostINR: 650,
    unitCostUSD: 7.8,
    leadTimeDays: 9,
    affectedProducts: ['prd-01', 'prd-02', 'prd-03'],
    isSingleSource: false,
    specifications: '0.1 mOhm electron beam welded low TCR current sensor'
  },
  {
    id: 'cmp-07',
    name: 'Die-Cast Aluminum Inverter Enclosure',
    partNumber: 'ENC-AL-6061',
    category: 'Mechanical Castings',
    tier: 1,
    currentInventory: 18500,
    dailyConsumption: 1100,
    incomingSupply: 12000,
    daysRemaining: 16,
    supplierId: 'sup-07',
    supplierName: 'Sanand Castings & Alloys',
    alternateSupplierId: 'sup-05',
    stockoutRisk: false,
    unitCostINR: 4800,
    unitCostUSD: 57.8,
    leadTimeDays: 14,
    affectedProducts: ['prd-01', 'prd-04'],
    isSingleSource: false,
    specifications: 'IP67 waterproof rated CNC-machined liquid cooling jacket'
  },
  {
    id: 'cmp-08',
    name: 'Automotive High-Voltage Relay 1000V',
    partNumber: 'REL-HV-1000',
    category: 'Electromechanical',
    tier: 1,
    currentInventory: 22000,
    dailyConsumption: 750,
    incomingSupply: 15000,
    daysRemaining: 29,
    supplierId: 'sup-05',
    supplierName: 'Nova Parts GmbH',
    alternateSupplierId: 'sup-03',
    stockoutRisk: false,
    unitCostINR: 5200,
    unitCostUSD: 62.6,
    leadTimeDays: 12,
    affectedProducts: ['prd-04', 'prd-06'],
    isSingleSource: false,
    specifications: 'Ceramic hermetically sealed contactor with economizer coil'
  },
  ...Array.from({ length: 94 }).map((_, idx) => {
    const id = idx + 9;
    const catList = ['Sensors', 'Wiring Harness', 'Connectors', 'Thermal Interface', 'Fasteners', 'Optical Encoders', 'Capacitors', 'Magnetics'];
    const cat = catList[idx % catList.length];
    const isAtRisk = (idx % 4 === 0) || (idx === 15) || (idx === 22);
    const supIndex = (idx % 20);
    const daily = 300 + (idx * 45) % 1800;
    const days = isAtRisk ? 9 + (idx % 5) : 25 + (idx % 35);
    const costINR = 400 + (idx * 270) % 9000;
    
    return {
      id: `cmp-${id.toString().padStart(2, '0')}`,
      name: `${cat} Series-${100 + idx} Pro`,
      partNumber: `PT-${cat.slice(0, 3).toUpperCase()}-${(1000 + idx)}`,
      category: cat,
      tier: (idx % 3 + 1) as 1 | 2 | 3,
      currentInventory: daily * days,
      dailyConsumption: daily,
      incomingSupply: daily * 10,
      daysRemaining: days,
      supplierId: mockSuppliers[supIndex].id,
      supplierName: mockSuppliers[supIndex].name,
      alternateSupplierId: mockSuppliers[(supIndex + 2) % mockSuppliers.length].id,
      stockoutRisk: days <= 14,
      unitCostINR: costINR,
      unitCostUSD: Number((costINR * 0.012).toFixed(1)),
      leadTimeDays: 10 + (idx % 20),
      affectedProducts: [`prd-${(idx % 10) + 1}`, `prd-${((idx + 3) % 10) + 1}`],
      isSingleSource: idx % 3 === 0,
      specifications: `Industrial grade automotive specification rev 4.2 #${idx}`
    };
  })
];

// ==========================================
// 3. FACTORIES (20 Manufacturing Plants)
// ==========================================
export const mockFactories: Factory[] = [
  {
    id: 'fac-01',
    name: 'Pune Integrated Powertrain Complex',
    code: 'FAC-PUN-01',
    location: 'Chakan, Pune, Maharashtra',
    country: 'India',
    manager: 'Rajesh Nair',
    capacityUtilization: 94,
    productionExposureINR: 3.8,
    productionExposureUSD: 4.6,
    criticalComponentsAtRisk: 6,
    status: 'At Risk',
    products: ['prd-01', 'prd-02', 'prd-04'],
    coordinates: [18.7562, 73.8596]
  },
  {
    id: 'fac-02',
    name: 'Factory 02 — Chennai EV Gigafactory',
    code: 'FAC-MAA-02',
    location: 'Sriperumbudur, Chennai, Tamil Nadu',
    country: 'India',
    manager: 'Venkatesh Raman',
    capacityUtilization: 96,
    productionExposureINR: 4.8,
    productionExposureUSD: 5.8,
    criticalComponentsAtRisk: 14,
    status: 'Disrupted',
    products: ['prd-01', 'prd-03', 'prd-05'],
    coordinates: [12.9698, 79.9452]
  },
  {
    id: 'fac-03',
    name: 'Gurgaon Electronics Assembly Plant',
    code: 'FAC-DEL-03',
    location: 'Manesar, Gurgaon, Haryana',
    country: 'India',
    manager: 'Sunita Sharma',
    capacityUtilization: 88,
    productionExposureINR: 2.1,
    productionExposureUSD: 2.5,
    criticalComponentsAtRisk: 4,
    status: 'At Risk',
    products: ['prd-06', 'prd-07'],
    coordinates: [28.3588, 76.9380]
  },
  {
    id: 'fac-04',
    name: 'Sanand Stamping & Motors Unit',
    code: 'FAC-AMD-04',
    location: 'Sanand GIDC, Gujarat',
    country: 'India',
    manager: 'Bhavesh Joshi',
    capacityUtilization: 82,
    productionExposureINR: 1.6,
    productionExposureUSD: 1.9,
    criticalComponentsAtRisk: 3,
    status: 'Operational',
    products: ['prd-04', 'prd-08'],
    coordinates: [22.9912, 72.3789]
  },
  {
    id: 'fac-05',
    name: 'Hosur Precision Micro-Assembly',
    code: 'FAC-HOS-05',
    location: 'Hosur, Tamil Nadu',
    country: 'India',
    manager: 'Priya Krishnan',
    capacityUtilization: 91,
    productionExposureINR: 1.9,
    productionExposureUSD: 2.3,
    criticalComponentsAtRisk: 5,
    status: 'At Risk',
    products: ['prd-02', 'prd-09'],
    coordinates: [12.7409, 77.8253]
  },
  {
    id: 'fac-06',
    name: 'Noida Advanced Telematics Plant',
    code: 'FAC-NOI-06',
    location: 'Greater Noida, Uttar Pradesh',
    country: 'India',
    manager: 'Amitabh Sen',
    capacityUtilization: 79,
    productionExposureINR: 1.2,
    productionExposureUSD: 1.4,
    criticalComponentsAtRisk: 2,
    status: 'Operational',
    products: ['prd-07', 'prd-10'],
    coordinates: [28.4744, 77.5040]
  },
  ...Array.from({ length: 14 }).map((_, idx) => {
    const id = idx + 7;
    const cities = [
      { name: 'Bengaluru Battery Lab', loc: 'Peenya, Bengaluru', lat: 13.0285, lng: 77.5197 },
      { name: 'Jamshedpur Heavy Chassis Unit', loc: 'Adityapur, Jamshedpur', lat: 22.7847, lng: 86.1558 },
      { name: 'Pantnagar Compact Vehicle Unit', loc: 'Pantnagar, Uttarakhand', lat: 29.0270, lng: 79.4930 },
      { name: 'Dharwad Heavy Commercial Plant', loc: 'Belur, Dharwad', lat: 15.4589, lng: 75.0078 },
      { name: 'Kalyani Eastern Assembly Plant', loc: 'Kalyani, West Bengal', lat: 22.9751, lng: 88.4345 },
      { name: 'Coimbatore Foundry & Motors', loc: 'Peelamedu, Coimbatore', lat: 11.0267, lng: 77.0116 },
      { name: 'Alwar Precision Extrusions', loc: 'MIA Alwar, Rajasthan', lat: 27.5530, lng: 76.6346 }
    ];
    const c = cities[idx % cities.length];
    return {
      id: `fac-${id.toString().padStart(2, '0')}`,
      name: `${c.name} #${id}`,
      code: `FAC-IN-${id.toString().padStart(2, '0')}`,
      location: c.loc,
      country: 'India',
      manager: `Plant Director ${id}`,
      capacityUtilization: 75 + (idx * 4) % 23,
      productionExposureINR: Number((0.8 + (idx * 0.3) % 2.5).toFixed(1)),
      productionExposureUSD: Number(((0.8 + (idx * 0.3) % 2.5) * 0.12).toFixed(1)),
      criticalComponentsAtRisk: (idx % 3),
      status: (idx % 5 === 0 ? 'At Risk' : 'Operational') as 'Operational' | 'At Risk' | 'Bottlenecked' | 'Disrupted',
      products: [`prd-${(idx % 8) + 1}`],
      coordinates: [c.lat, c.lng] as [number, number]
    };
  })
];

// ==========================================
// 4. PRODUCTS (30 Finished Goods)
// ==========================================
export const mockProducts: Product[] = [
  {
    id: 'prd-01',
    name: 'Product Y — EV Powertrain X1 (800V)',
    sku: 'EV-PT-800X',
    category: 'Electric Powertrains',
    monthlyVolume: 8500,
    revenueINR: 142.0,
    revenueUSD: 17.1,
    customerCount: 12400,
    status: 'Critical Risk',
    factoryId: 'fac-02',
    factoryName: 'Factory 02 — Chennai EV Gigafactory',
    keyComponents: ['cmp-01', 'cmp-02', 'cmp-04', 'cmp-05', 'cmp-07']
  },
  {
    id: 'prd-02',
    name: 'High-Torque Inverter Module Dual-Core',
    sku: 'INV-DC-900',
    category: 'Power Converters',
    monthlyVolume: 6200,
    revenueINR: 88.0,
    revenueUSD: 10.6,
    customerCount: 8900,
    status: 'At Risk',
    factoryId: 'fac-01',
    factoryName: 'Pune Integrated Powertrain Complex',
    keyComponents: ['cmp-01', 'cmp-06']
  },
  {
    id: 'prd-03',
    name: 'Telematics Control Unit Gen-4',
    sku: 'TCU-4G-LTE',
    category: 'Connected Vehicle Electronics',
    monthlyVolume: 14000,
    revenueINR: 64.0,
    revenueUSD: 7.7,
    customerCount: 24500,
    status: 'At Risk',
    factoryId: 'fac-03',
    factoryName: 'Gurgaon Electronics Assembly Plant',
    keyComponents: ['cmp-02', 'cmp-06']
  },
  {
    id: 'prd-04',
    name: 'Commercial EV Motor Controller 350kW',
    sku: 'CTR-COMM-350',
    category: 'Commercial Drive Systems',
    monthlyVolume: 3400,
    revenueINR: 76.0,
    revenueUSD: 9.1,
    customerCount: 4200,
    status: 'At Risk',
    factoryId: 'fac-04',
    factoryName: 'Sanand Stamping & Motors Unit',
    keyComponents: ['cmp-01', 'cmp-07', 'cmp-08']
  },
  {
    id: 'prd-05',
    name: 'Liquid-Cooled Battery Pack Pro (75 kWh)',
    sku: 'BAT-75KWH-PRO',
    category: 'Traction Batteries',
    monthlyVolume: 5100,
    revenueINR: 210.0,
    revenueUSD: 25.3,
    customerCount: 16800,
    status: 'Critical Risk',
    factoryId: 'fac-02',
    factoryName: 'Factory 02 — Chennai EV Gigafactory',
    keyComponents: ['cmp-03', 'cmp-04']
  },
  ...Array.from({ length: 25 }).map((_, idx) => {
    const id = idx + 6;
    const catList = ['Automotive ECU', 'Sensors Hub', 'Charging Station Pro', 'Digital Cockpit Screen', 'Active Suspension Unit'];
    const cat = catList[idx % catList.length];
    const isAtRisk = idx % 4 === 0;
    return {
      id: `prd-${id.toString().padStart(2, '0')}`,
      name: `${cat} Ultra-${id * 10}`,
      sku: `SKU-${cat.slice(0, 3).toUpperCase()}-${id * 100}`,
      category: cat,
      monthlyVolume: 2000 + (idx * 400) % 9000,
      revenueINR: Number((25 + (idx * 9) % 90).toFixed(1)),
      revenueUSD: Number(((25 + (idx * 9) % 90) * 0.12).toFixed(1)),
      customerCount: 1500 + (idx * 750) % 18000,
      status: (isAtRisk ? 'At Risk' : 'Normal') as 'Normal' | 'At Risk' | 'Critical Risk',
      factoryId: `fac-${(idx % 6) + 1}`,
      factoryName: mockFactories[idx % 6].name,
      keyComponents: [`cmp-${(idx % 8) + 1}`]
    };
  })
];

// ==========================================
// 5. SHIPMENTS (Logistics Intelligence)
// ==========================================
export const mockShipments: Shipment[] = [
  {
    id: 'shp-01',
    trackingNumber: 'SC48291',
    originPort: 'Shenzhen Port (Yantian)',
    destPort: 'JNPT Port (Nhava Sheva, Mumbai)',
    originCountry: 'China',
    destCountry: 'India',
    carrier: 'Evergreen Marine / Line 12',
    componentId: 'cmp-01',
    componentName: 'Power Controller 800V GaN',
    originalETA: '18 Sep',
    updatedETA: '25 Sep',
    delayDays: 7,
    status: 'Delayed',
    riskLevel: 'critical',
    transitMode: 'Maritime',
    coordinates: [15.2993, 85.8245] // Bay of Bengal / Indian Ocean
  },
  {
    id: 'shp-02',
    trackingNumber: 'SC51044',
    originPort: 'Kaohsiung Port',
    destPort: 'Chennai Port',
    originCountry: 'Taiwan',
    destCountry: 'India',
    carrier: 'Maersk Line / AE7',
    componentId: 'cmp-04',
    componentName: 'BMS Cell Balancing ASIC',
    originalETA: '15 Sep',
    updatedETA: '21 Sep',
    delayDays: 6,
    status: 'Delayed',
    riskLevel: 'high',
    transitMode: 'Maritime',
    coordinates: [13.0827, 85.2707]
  },
  {
    id: 'shp-03',
    trackingNumber: 'SC78902',
    originPort: 'Rotterdam Port',
    destPort: 'JNPT Port (Nhava Sheva, Mumbai)',
    originCountry: 'Netherlands',
    destCountry: 'India',
    carrier: 'Hapag-Lloyd / Red Sea Express',
    componentId: 'cmp-08',
    componentName: 'Automotive High-Voltage Relay 1000V',
    originalETA: '20 Sep',
    updatedETA: '23 Sep',
    delayDays: 3,
    status: 'Delayed',
    riskLevel: 'medium',
    transitMode: 'Maritime',
    coordinates: [24.8607, 67.0011]
  },
  {
    id: 'shp-04',
    trackingNumber: 'SC99142',
    originPort: 'Tokyo Haneda Air Cargo',
    destPort: 'Bengaluru Kempegowda Cargo Terminal',
    originCountry: 'Japan',
    destCountry: 'India',
    carrier: 'ANA Cargo / NH8501',
    componentId: 'cmp-06',
    componentName: 'Precision Shunt Resistor 500A',
    originalETA: '10 Sep',
    updatedETA: '10 Sep',
    delayDays: 0,
    status: 'On Schedule',
    riskLevel: 'low',
    transitMode: 'Air Cargo',
    coordinates: [19.0760, 72.8777]
  },
  {
    id: 'shp-05',
    trackingNumber: 'SC33481',
    originPort: 'Busan Port',
    destPort: 'Chennai Port',
    originCountry: 'South Korea',
    destCountry: 'India',
    carrier: 'Hyundai Merchant Marine',
    componentId: 'cmp-03',
    componentName: 'Lithium NMC-811 Cathode Foil',
    originalETA: '22 Sep',
    updatedETA: '29 Sep',
    delayDays: 7,
    status: 'Delayed',
    riskLevel: 'high',
    transitMode: 'Maritime',
    coordinates: [10.8231, 106.6297]
  },
  {
    id: 'shp-06',
    trackingNumber: 'SC66190',
    originPort: 'Frankfurt Air Hub',
    destPort: 'Delhi IGI Cargo Gateway',
    originCountry: 'Germany',
    destCountry: 'India',
    carrier: 'Lufthansa Cargo / LH8220',
    componentId: 'cmp-10',
    componentName: 'Optical Encoders Series-101 Pro',
    originalETA: '12 Sep',
    updatedETA: '12 Sep',
    delayDays: 0,
    status: 'On Schedule',
    riskLevel: 'low',
    transitMode: 'Air Cargo',
    coordinates: [28.5562, 77.1000]
  },
  {
    id: 'shp-07',
    trackingNumber: 'SC81900',
    originPort: 'Singapore Keppel Terminal',
    destPort: 'JNPT Port (Nhava Sheva, Mumbai)',
    originCountry: 'Singapore',
    destCountry: 'India',
    carrier: 'Ocean Network Express (ONE)',
    componentId: 'cmp-12',
    componentName: 'Connectors Series-103 Pro',
    originalETA: '14 Sep',
    updatedETA: '18 Sep',
    delayDays: 4,
    status: 'Customs Hold',
    riskLevel: 'high',
    transitMode: 'Maritime',
    coordinates: [1.3521, 103.8198]
  }
];

// ==========================================
// 6. PORT CONGESTIONS
// ==========================================
export const mockPortCongestions: PortCongestion[] = [
  {
    id: 'prt-01',
    port: 'Shenzhen Port (Yantian & Shekou)',
    city: 'Shenzhen',
    country: 'China',
    congestionIndex: 8.7,
    avgWaitDays: 6.4,
    status: 'Severe',
    riskScore: 87,
    coordinates: [22.5744, 114.2753]
  },
  {
    id: 'prt-02',
    port: 'JNPT (Nhava Sheva, Mumbai)',
    city: 'Mumbai',
    country: 'India',
    congestionIndex: 6.8,
    avgWaitDays: 4.1,
    status: 'Congested',
    riskScore: 68,
    coordinates: [18.9499, 72.9515]
  },
  {
    id: 'prt-03',
    port: 'Port of Singapore',
    city: 'Singapore',
    country: 'Singapore',
    congestionIndex: 7.2,
    avgWaitDays: 4.8,
    status: 'Congested',
    riskScore: 72,
    coordinates: [1.2644, 103.8222]
  },
  {
    id: 'prt-04',
    port: 'Port of Rotterdam',
    city: 'Rotterdam',
    country: 'Netherlands',
    congestionIndex: 5.4,
    avgWaitDays: 2.8,
    status: 'Moderate',
    riskScore: 54,
    coordinates: [51.9244, 4.4777]
  },
  {
    id: 'prt-05',
    port: 'Port of Kaohsiung',
    city: 'Kaohsiung',
    country: 'Taiwan',
    congestionIndex: 7.9,
    avgWaitDays: 5.2,
    status: 'Congested',
    riskScore: 79,
    coordinates: [22.6163, 120.2982]
  }
];

// ==========================================
// 7. AI EARLY WARNINGS
// ==========================================
export const mockEarlyWarnings: EarlyWarning[] = [
  {
    id: 'ew-01',
    severity: 'critical',
    title: 'Supplier X disruption could affect Product Y',
    supplierId: 'sup-02',
    supplierName: 'Shenzhen Micro Dynamics (Supplier X)',
    componentId: 'cmp-01',
    componentName: 'Power Controller 800V GaN (Component A)',
    factoryId: 'fac-02',
    factoryName: 'Factory 02 — Chennai EV Gigafactory',
    productId: 'prd-01',
    productName: 'Product Y — EV Powertrain X1 (800V)',
    predictedDisruptionDays: 12,
    confidence: 91,
    revenueExposureINR: 4.8, // ₹4.8 Cr
    revenueExposureUSD: 5.8, // $5.8 M
    rootCauseAnalysis: [
      'Severe typhoon contingency warning triggered around Pearl River Delta shipping lanes.',
      'Port of Shenzhen container dwell time spiked by +42% over the last 72 hours.',
      'Supplier delivery telemetry indicates component transit delay of +7 days vs contractual schedule.',
      'Factory 02 has only 11 days of safety buffer stock at current consumption rate of 1,500 units/day.'
    ],
    recommendedAction: 'Move 60% procurement volume to Supplier Z (GlobalTech Japan / Titan Precision).',
    alternativeSupplierId: 'sup-04',
    alternativeSupplierName: 'GlobalTech Japan / Titan Precision',
    volumeShiftPct: 60,
    customersAffected: 12400,
    inventoryCoverageDays: 11
  },
  {
    id: 'ew-02',
    severity: 'critical',
    title: 'Single-Source BMS ASIC shortage threatening Factory 01 Powertrain Line',
    supplierId: 'sup-06',
    supplierName: 'Hsinchu Silicon Foundries',
    componentId: 'cmp-04',
    componentName: 'BMS Cell Balancing ASIC',
    factoryId: 'fac-01',
    factoryName: 'Pune Integrated Powertrain Complex',
    productId: 'prd-05',
    productName: 'Liquid-Cooled Battery Pack Pro (75 kWh)',
    predictedDisruptionDays: 14,
    confidence: 88,
    revenueExposureINR: 3.2,
    revenueExposureUSD: 3.9,
    rootCauseAnalysis: [
      'Strait maritime cargo rerouting causing vessel turnaround backlog.',
      'Incoming wafer lot inspection reported 8.4% micro-crack defects.',
      'Zero secondary supplier currently qualified for AEC-Q100 Rev G spec.'
    ],
    recommendedAction: 'Expedite air freight charter batch from alternate Osaka fabrication cleanroom.',
    alternativeSupplierId: 'sup-04',
    alternativeSupplierName: 'GlobalTech Semiconductor Corp',
    volumeShiftPct: 40,
    customersAffected: 8900,
    inventoryCoverageDays: 11
  },
  {
    id: 'ew-03',
    severity: 'high',
    title: 'ABC Components foundry power rationing threatening Stamping Lines',
    supplierId: 'sup-01',
    supplierName: 'ABC Components Ltd',
    componentId: 'cmp-02',
    componentName: 'Microcontroller Telematics Core',
    factoryId: 'fac-03',
    factoryName: 'Gurgaon Electronics Assembly Plant',
    productId: 'prd-03',
    productName: 'Telematics Control Unit Gen-4',
    predictedDisruptionDays: 16,
    confidence: 84,
    revenueExposureINR: 2.1,
    revenueExposureUSD: 2.5,
    rootCauseAnalysis: [
      'Local grid transformer maintenance scheduled for 6 days in Chakan MIDC zone.',
      'Vendor working capital liquidity stress flagged by Euler Hermes telemetry.'
    ],
    recommendedAction: 'Transfer 40% harness buffer to Titan Precision Bengaluru.',
    alternativeSupplierId: 'sup-03',
    alternativeSupplierName: 'Titan Precision Instruments',
    volumeShiftPct: 40,
    customersAffected: 6200,
    inventoryCoverageDays: 12
  }
];

// ==========================================
// 8. RISK ALERTS (Alert Center)
// ==========================================
export const mockAlerts: RiskAlert[] = [
  {
    id: 'alt-01',
    title: 'Critical Port Congestion at Shenzhen Yantian Hub',
    severity: 'critical',
    timestamp: '14 minutes ago',
    category: 'Logistics',
    whatHappened: 'Severe container terminal congestion with average vessel wait times surging from 2.1 days to 6.4 days due to localized storm surge and customs inspection strikes.',
    whyItMatters: 'Shipment #SC48291 carrying 10,500 critical 800V GaN Power Controllers has been delayed by +7 days, threatening Factory 02 production halt.',
    impactETA: 'Production line starvation in 12 days',
    recommendedAction: 'Re-route upcoming batch via Hong Kong Air Cargo Gateway or activate volume shift to Titan Precision.',
    affectedSupplierId: 'sup-02',
    affectedSupplierName: 'Shenzhen Micro Dynamics',
    affectedComponentId: 'cmp-01',
    affectedComponentName: 'Power Controller 800V GaN',
    affectedFactoryId: 'fac-02',
    affectedFactoryName: 'Factory 02 — Chennai EV Gigafactory',
    exposureINR: 4.8,
    exposureUSD: 5.8,
    resolved: false
  },
  {
    id: 'alt-02',
    title: 'Financial Health Deterioration — ABC Components',
    severity: 'critical',
    timestamp: '1 hour ago',
    category: 'Financial',
    whatHappened: 'Supplier Altman Z-score degraded below 1.4 into distress zone; two bank credit lines restricted pending statutory tax audit.',
    whyItMatters: 'Supplier ABC manufactures 4 sole-sourced automotive microcontrollers used across 6 high-volume vehicle platforms.',
    impactETA: 'Potential procurement halt in 16 days',
    recommendedAction: 'Authorize early invoice discounting on receivables while expediting tooling transfer to Titan Precision.',
    affectedSupplierId: 'sup-01',
    affectedSupplierName: 'ABC Components Ltd',
    affectedComponentId: 'cmp-02',
    affectedComponentName: 'Microcontroller Telematics Core',
    affectedFactoryId: 'fac-01',
    affectedFactoryName: 'Pune Integrated Powertrain Complex',
    exposureINR: 3.6,
    exposureUSD: 4.3,
    resolved: false
  },
  {
    id: 'alt-03',
    title: 'Geopolitical Maritime Caution in Taiwan Strait Corridor',
    severity: 'high',
    timestamp: '3 hours ago',
    category: 'Geopolitical',
    whatHappened: 'Naval live-fire exercises declared along primary commercial sea-lanes leading from Kaohsiung to Singapore transshipment corridor.',
    whyItMatters: 'Commercial freight ships taking 350 nautical mile detour around Luzon Strait, adding 4 to 6 transit days to maritime shipments.',
    impactETA: 'Affecting shipments arriving between 20 Sep - 28 Sep',
    recommendedAction: 'Request priority allocation and split consignment across air freight charters.',
    affectedSupplierId: 'sup-06',
    affectedSupplierName: 'Hsinchu Silicon Foundries',
    affectedComponentId: 'cmp-04',
    affectedComponentName: 'BMS Cell Balancing ASIC',
    affectedFactoryId: 'fac-02',
    affectedFactoryName: 'Factory 02 — Chennai EV Gigafactory',
    exposureINR: 2.9,
    exposureUSD: 3.5,
    resolved: false
  },
  {
    id: 'alt-04',
    title: 'Monsoon Flooding Disrupting Sanand Logistics Arteries',
    severity: 'medium',
    timestamp: '5 hours ago',
    category: 'Weather',
    whatHappened: 'Severe localized waterlogging across Ahmedabad-Sanand highway slowing heavy container vehicle movement.',
    whyItMatters: 'Inter-factory transfer of stamped chassis brackets experiencing 24-48 hour logistical delays.',
    impactETA: 'Buffer inventory reduces impact to minor schedule buffer',
    recommendedAction: 'Switch to alternate Western Dedicated Freight Corridor rail link.',
    affectedSupplierId: 'sup-07',
    affectedSupplierName: 'Sanand Castings & Alloys',
    affectedComponentId: 'cmp-07',
    affectedComponentName: 'Die-Cast Aluminum Inverter Enclosure',
    affectedFactoryId: 'fac-04',
    affectedFactoryName: 'Sanand Stamping & Motors Unit',
    exposureINR: 0.9,
    exposureUSD: 1.1,
    resolved: false
  },
  {
    id: 'alt-05',
    title: 'Ransomware Incident at Tier-2 Logistics Provider',
    severity: 'medium',
    timestamp: '8 hours ago',
    category: 'Cyber',
    whatHappened: 'Regional customs clearing partner experienced encrypted EDI server lockout affecting clearance paperwork at JNPT terminal.',
    whyItMatters: 'Manual paperwork clearance required for 14 import containers carrying active electronics.',
    impactETA: 'Estimated 36-hour clearance delay',
    recommendedAction: 'Deploy internal customs expediting taskforce with manual bill of entry processing.',
    affectedSupplierId: 'sup-04',
    affectedSupplierName: 'GlobalTech Semiconductor Corp',
    affectedComponentId: 'cmp-06',
    affectedComponentName: 'Precision Shunt Resistor 500A',
    affectedFactoryId: 'fac-01',
    affectedFactoryName: 'Pune Integrated Powertrain Complex',
    exposureINR: 0.6,
    exposureUSD: 0.7,
    resolved: false
  }
];

// ==========================================
// 9. ALTERNATIVE SUPPLIER COMPARISONS
// ==========================================
export const mockAlternativeComparisons: AlternativeComparison[] = [
  {
    id: 'alt-cmp-01',
    componentId: 'cmp-01',
    componentName: 'Power Controller 800V GaN',
    currentSupplier: {
      id: 'sup-02',
      name: 'Shenzhen Micro Dynamics (Supplier X)',
      country: 'China',
      riskScore: 86,
      unitCostINR: 100, // prompt example: ₹100/unit
      unitCostUSD: 1.20,
      leadTimeDays: 18,
      capacity: 95
    },
    recommendedSupplier: {
      id: 'sup-03',
      name: 'Titan Precision / Supplier Z',
      country: 'India',
      riskScore: 21,
      unitCostINR: 108, // prompt example: ₹108/unit
      unitCostUSD: 1.30,
      leadTimeDays: 7, // prompt example: 7 days
      capacity: 68 // prompt example: 68%
    },
    suggestedVolumeShiftPct: 40, // prompt: Move 40% of procurement volume to Supplier Z
    additionalCostINR: 12.8, // prompt example: ₹12.8 L
    additionalCostUSD: 15.4, // Thousands USD
    avoidedProductionLossINR: 1.7, // prompt example: ₹1.7 Cr
    avoidedProductionLossUSD: 2.05, // Millions USD
    roiMultiplier: 13.3,
    qualifications: [
      'Automotive IATF 16949 Certified facility',
      'Dual-line surface mount capacity ready with 48-hour tooling ramp',
      'Zero customs exposure with local INR settlement'
    ]
  },
  {
    id: 'alt-cmp-02',
    componentId: 'cmp-04',
    componentName: 'BMS Cell Balancing ASIC',
    currentSupplier: {
      id: 'sup-06',
      name: 'Hsinchu Silicon Foundries',
      country: 'Taiwan',
      riskScore: 74,
      unitCostINR: 2100,
      unitCostUSD: 25.3,
      leadTimeDays: 28,
      capacity: 98
    },
    recommendedSupplier: {
      id: 'sup-04',
      name: 'GlobalTech Semiconductor Corp',
      country: 'Japan',
      riskScore: 32,
      unitCostINR: 2260,
      unitCostUSD: 27.2,
      leadTimeDays: 11,
      capacity: 74
    },
    suggestedVolumeShiftPct: 50,
    additionalCostINR: 16.4,
    additionalCostUSD: 19.8,
    avoidedProductionLossINR: 2.4,
    avoidedProductionLossUSD: 2.9,
    roiMultiplier: 14.6,
    qualifications: [
      'AEC-Q100 Grade 1 Qualified',
      'Tokyo Haneda express air-corridor verified',
      'Pre-approved engineering change order (ECO) on file'
    ]
  }
];

// ==========================================
// 10. EXECUTIVE OVERVIEW METRICS
// ==========================================
export const executiveOverviewMetrics = {
  overallRisk: {
    score: 72,
    scale: 100,
    status: 'High Risk' as const,
    change: '+4 points vs last week',
    direction: 'up' as const
  },
  suppliersAtRisk: {
    count: 18,
    total: 52,
    criticalCount: 5,
    change: '+2 this month'
  },
  componentsAtRisk: {
    count: 34,
    total: 102,
    singleSourceCount: 14,
    change: '+6 flagged'
  },
  productionExposure: {
    amountINR: 8.4, // ₹8.4 Cr
    amountUSD: 10.1, // $10.1 M
    affectedPlantsCount: 3,
    status: 'Elevated'
  },
  stockoutRisk: {
    productsCount: 7, // 7 Products
    totalProducts: 30,
    criticalCustomersExposed: 32400
  },
  criticalAlerts: {
    count: 5,
    unread: 3,
    requiresActionCount: 4
  }
};

// ==========================================
// 11. RISK TREND (30 Days)
// ==========================================
export const mockRiskTrendData = [
  { date: 'Aug 08', overallRisk: 52, logisticsRisk: 48, supplierRisk: 54, targetThreshold: 45 },
  { date: 'Aug 13', overallRisk: 55, logisticsRisk: 50, supplierRisk: 58, targetThreshold: 45 },
  { date: 'Aug 18', overallRisk: 58, logisticsRisk: 54, supplierRisk: 61, targetThreshold: 45 },
  { date: 'Aug 23', overallRisk: 63, logisticsRisk: 62, supplierRisk: 64, targetThreshold: 45 },
  { date: 'Aug 28', overallRisk: 66, logisticsRisk: 68, supplierRisk: 65, targetThreshold: 45 },
  { date: 'Sep 02', overallRisk: 70, logisticsRisk: 78, supplierRisk: 69, targetThreshold: 45 },
  { date: 'Sep 07', overallRisk: 72, logisticsRisk: 82, supplierRisk: 74, targetThreshold: 45 }
];
