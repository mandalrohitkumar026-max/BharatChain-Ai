import { Currency, RiskLevel } from '../types';

export function formatCurrency(
  value: number,
  currency: Currency,
  options?: {
    isCroreOrMillion?: boolean;
    isLakhOrThousand?: boolean;
    unitPrice?: boolean;
  }
): string {
  if (currency === 'INR') {
    if (options?.unitPrice) {
      return `₹${value.toLocaleString('en-IN')}`;
    }
    if (options?.isLakhOrThousand) {
      return `₹${value.toFixed(1)} L`;
    }
    // Default or isCrore
    return `₹${value.toFixed(1)} Cr`;
  } else {
    // USD
    if (options?.unitPrice) {
      return `$${value.toFixed(2)}`;
    }
    if (options?.isLakhOrThousand) {
      // In USD, Lakhs corresponds to Thousands ($K)
      return `$${value.toFixed(1)}K`;
    }
    // Default or Millions
    return `$${value.toFixed(1)}M`;
  }
}

export function getRiskLevelFromScore(score: number): RiskLevel {
  if (score >= 75) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

export function getRiskBadgeClasses(levelOrScore: RiskLevel | number): {
  bg: string;
  text: string;
  border: string;
  dot: string;
  label: string;
} {
  const level: RiskLevel = typeof levelOrScore === 'number' 
    ? getRiskLevelFromScore(levelOrScore) 
    : levelOrScore;

  switch (level) {
    case 'critical':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-500',
        label: 'Critical'
      };
    case 'high':
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        dot: 'bg-orange-500',
        label: 'High Risk'
      };
    case 'medium':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
        label: 'Medium Risk'
      };
    case 'low':
    default:
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
        label: 'Low Risk'
      };
  }
}

export function formatLargeNumber(val: number): string {
  return val.toLocaleString('en-IN');
}
