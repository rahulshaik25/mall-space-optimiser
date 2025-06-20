
import { SpaceType, Duration, RentType } from '../types';

export interface PricingCalculation {
  costPerUnit: number;
  totalCost: number;
  breakdown: {
    baseRate: number;
    units: number;
    discount?: number;
    finalRate: number;
  };
}

// Pricing table as per requirements
const PRICING_TABLE: Record<string, Record<Duration, { rentType: RentType; costPerUnit: number }>> = {
  'Small Shop': {
    'Week Days': { rentType: 'Day Wise', costPerUnit: 1000 },
    'Week Ends': { rentType: 'Hour Wise', costPerUnit: 750 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 1500 },
    'All Days': { rentType: 'Day Wise', costPerUnit: 1000 } // fallback
  },
  'Medium Shop': {
    'Week Days': { rentType: 'Day Wise', costPerUnit: 3000 },
    'Week Ends': { rentType: 'Day Wise', costPerUnit: 1250 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 6000 },
    'All Days': { rentType: 'Day Wise', costPerUnit: 3000 } // fallback
  },
  'Large Shop': {
    'Week Days': { rentType: 'Day Wise', costPerUnit: 10000 },
    'Week Ends': { rentType: 'Day Wise', costPerUnit: 3000 },
    'Public Holidays': { rentType: 'Day Wise', costPerUnit: 9000 },
    'All Days': { rentType: 'Day Wise', costPerUnit: 10000 } // fallback
  },
  'Atrium - North and West': {
    'Week Days': { rentType: 'Hour Wise', costPerUnit: 600 },
    'Week Ends': { rentType: 'Hour Wise', costPerUnit: 1000 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 2000 },
    'All Days': { rentType: 'Hour Wise', costPerUnit: 600 } // fallback
  },
  'Atrium - South': {
    'Week Days': { rentType: 'Hour Wise', costPerUnit: 750 },
    'Week Ends': { rentType: 'Hour Wise', costPerUnit: 1500 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 3000 },
    'All Days': { rentType: 'Hour Wise', costPerUnit: 750 } // fallback
  },
  'Cinema Theater': {
    'Week Days': { rentType: 'Week Wise', costPerUnit: 100000 },
    'Week Ends': { rentType: 'Week Wise', costPerUnit: 100000 },
    'Public Holidays': { rentType: 'Week Wise', costPerUnit: 100000 },
    'All Days': { rentType: 'Week Wise', costPerUnit: 100000 }
  },
  'Marketing Banner Space': {
    'Week Days': { rentType: 'SqFt', costPerUnit: 1000 },
    'Week Ends': { rentType: 'SqFt', costPerUnit: 2500 },
    'Public Holidays': { rentType: 'SqFt', costPerUnit: 5000 },
    'All Days': { rentType: 'SqFt', costPerUnit: 1000 } // fallback
  }
};

export function calculatePricing(
  spaceType: SpaceType,
  duration: Duration,
  units: number,
  discountPercentage: number = 0
): PricingCalculation {
  const pricing = PRICING_TABLE[spaceType]?.[duration];
  
  if (!pricing) {
    throw new Error(`Pricing not found for ${spaceType} during ${duration}`);
  }

  const baseRate = pricing.costPerUnit;
  const subtotal = baseRate * units;
  const discount = (subtotal * discountPercentage) / 100;
  const finalRate = baseRate - (baseRate * discountPercentage) / 100;
  const totalCost = subtotal - discount;

  return {
    costPerUnit: finalRate,
    totalCost,
    breakdown: {
      baseRate,
      units,
      discount: discountPercentage > 0 ? discount : undefined,
      finalRate
    }
  };
}

export function getRentTypeForSpace(spaceType: SpaceType, duration: Duration): RentType {
  const pricing = PRICING_TABLE[spaceType]?.[duration];
  return pricing?.rentType || 'Day Wise';
}

export function getBasePriceForSpace(spaceType: SpaceType, duration: Duration): number {
  const pricing = PRICING_TABLE[spaceType]?.[duration];
  return pricing?.costPerUnit || 0;
}

export function getDurationOptions(spaceType: SpaceType): Duration[] {
  const spacePricing = PRICING_TABLE[spaceType];
  if (!spacePricing) return [];
  
  return Object.keys(spacePricing) as Duration[];
}

export function isValidSpaceTypeDurationCombo(spaceType: SpaceType, duration: Duration): boolean {
  return Boolean(PRICING_TABLE[spaceType]?.[duration]);
}

// Utility to suggest optimal pricing based on utilization
export function suggestOptimalPricing(
  currentUtilization: number,
  targetUtilization: number,
  currentPrice: number
): { suggestedPrice: number; reason: string } {
  if (currentUtilization < targetUtilization * 0.7) {
    // Low utilization - suggest price reduction
    const reduction = Math.min(30, (targetUtilization - currentUtilization) * 50);
    return {
      suggestedPrice: currentPrice * (1 - reduction / 100),
      reason: `Reduce price by ${reduction.toFixed(1)}% to increase utilization`
    };
  } else if (currentUtilization > targetUtilization * 1.2) {
    // High utilization - suggest price increase
    const increase = Math.min(20, (currentUtilization - targetUtilization) * 30);
    return {
      suggestedPrice: currentPrice * (1 + increase / 100),
      reason: `Increase price by ${increase.toFixed(1)}% due to high demand`
    };
  }
  
  return {
    suggestedPrice: currentPrice,
    reason: 'Current pricing is optimal'
  };
}
