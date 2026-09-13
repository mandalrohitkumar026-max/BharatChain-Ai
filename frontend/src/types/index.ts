export type Currency = 'INR' | 'USD';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Supplier {
  id: string;
  name: string;
  code: string;
  country: string;
  countryCode: string;
  city: string;
  riskScore: number; // 0 - 100
  deliveryPerformance: number; // percentage
  financialRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  logisticsRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  capacity: number; // percentage
  componentsCount: number;
  status: 'Critical' | 'High Risk' | 'Stable' | 'Low Risk';
  riskBreakdown: {
    financial: number;
    delivery: number;
    geopolitical: number;
    weather: number;
    transportation: number;
    cyber: number;
    capacity: number;
  };
  historicalTrend: { month: string; score: number }[];
  affectedComponents: string[];
  affectedProducts: string[];
  affectedFactories: string[];
  inventoryCoverageDays: number;
  recommendedAction: string;
  alternativeSupplierId?: string;
  contact: {
    lead: string;
    email: string;
    phone: string;
  };
  spendAnnualINR: number; // in Crores
  spendAnnualUSD: number; // in Millions
  singleSourceRisk: boolean;
  coordinates: [number, number]; // [lat, lng]
}

export interface Component {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  tier: 1 | 2 | 3;
  currentInventory: number;
  dailyConsumption: number;
  incomingSupply: number;
  daysRemaining: number;
  supplierId: string;
  supplierName: string;
  alternateSupplierId?: string;
  stockoutRisk: boolean;
  unitCostINR: number;
  unitCostUSD: number;
  leadTimeDays: number;
  affectedProducts: string[];
  isSingleSource: boolean;
  specifications: string;
}

export interface Factory {
  id: string;
  name: string;
  code: string;
  location: string;
  country: string;
  manager: string;
  capacityUtilization: number; // percentage
  productionExposureINR: number; // Crores
  productionExposureUSD: number; // Millions
  criticalComponentsAtRisk: number;
  status: 'Operational' | 'At Risk' | 'Bottlenecked' | 'Disrupted';
  products: string[];
  coordinates: [number, number];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  monthlyVolume: number;
  revenueINR: number; // Crores/year
  revenueUSD: number; // Millions/year
  customerCount: number;
  status: 'Normal' | 'At Risk' | 'Critical Risk';
  factoryId: string;
  factoryName: string;
  keyComponents: string[];
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  originPort: string;
  destPort: string;
  originCountry: string;
  destCountry: string;
  carrier: string;
  componentId: string;
  componentName: string;
  originalETA: string;
  updatedETA: string;
  delayDays: number;
  status: 'On Schedule' | 'Delayed' | 'Critical Delay' | 'Customs Hold';
  riskLevel: RiskLevel;
  transitMode: 'Maritime' | 'Air Cargo' | 'Express Freight';
  coordinates: [number, number];
}

export interface PortCongestion {
  id: string;
  port: string;
  city: string;
  country: string;
  congestionIndex: number; // 0 - 10
  avgWaitDays: number;
  status: 'Normal' | 'Moderate' | 'Congested' | 'Severe';
  riskScore: number;
  coordinates: [number, number];
}

export interface RiskAlert {
  id: string;
  title: string;
  severity: RiskLevel;
  timestamp: string;
  category: 'Supplier' | 'Logistics' | 'Weather' | 'Geopolitical' | 'Cyber' | 'Financial';
  whatHappened: string;
  whyItMatters: string;
  impactETA: string;
  recommendedAction: string;
  affectedSupplierId?: string;
  affectedSupplierName?: string;
  affectedComponentId?: string;
  affectedComponentName?: string;
  affectedFactoryId?: string;
  affectedFactoryName?: string;
  exposureINR: number; // Crores
  exposureUSD: number; // Millions
  resolved: boolean;
}

export interface EarlyWarning {
  id: string;
  severity: RiskLevel;
  title: string;
  supplierId: string;
  supplierName: string;
  componentId: string;
  componentName: string;
  factoryId: string;
  factoryName: string;
  productId: string;
  productName: string;
  predictedDisruptionDays: number;
  confidence: number;
  revenueExposureINR: number; // Crores
  revenueExposureUSD: number; // Millions
  rootCauseAnalysis: string[];
  recommendedAction: string;
  alternativeSupplierId: string;
  alternativeSupplierName: string;
  volumeShiftPct: number;
  customersAffected: number;
  inventoryCoverageDays: number;
}

export interface ScenarioParams {
  type: 'supplier_failure' | 'supplier_delay' | 'port_closure' | 'factory_shutdown' | 'commodity_price_increase' | 'transport_disruption' | 'demand_increase';
  targetId: string;
  durationDays: number;
  severityMultiplier: number;
}

export interface SimulationResult {
  productionImpactPct: number;
  revenueAtRiskINR: number;
  revenueAtRiskUSD: number;
  customersAffected: number;
  additionalProcurementCostINR: number; // in Lakhs
  additionalProcurementCostUSD: number; // in Thousands
  stockoutsCount: number;
  aiRecommendations: {
    title: string;
    description: string;
    tradeoff: string;
    actionLabel: string;
  }[];
}

export interface AlternativeComparison {
  id: string;
  componentId: string;
  componentName: string;
  currentSupplier: {
    id: string;
    name: string;
    country: string;
    riskScore: number;
    unitCostINR: number;
    unitCostUSD: number;
    leadTimeDays: number;
    capacity: number;
  };
  recommendedSupplier: {
    id: string;
    name: string;
    country: string;
    riskScore: number;
    unitCostINR: number;
    unitCostUSD: number;
    leadTimeDays: number;
    capacity: number;
  };
  suggestedVolumeShiftPct: number;
  additionalCostINR: number; // Lakhs
  additionalCostUSD: number; // Thousands
  avoidedProductionLossINR: number; // Crores
  avoidedProductionLossUSD: number; // Millions
  roiMultiplier: number;
  qualifications: string[];
}
