
// Pricing configuration based on business requirements
export const PRICING_RULES = {
  'Small Shop': {
    'Week Days': { rentType: 'Day Wise', costPerUnit: 1000 },
    'Week Ends': { rentType: 'Hour Wise', costPerUnit: 750 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 1500 },
  },
  'Medium Shop': {
    'Week Days': { rentType: 'Day Wise', costPerUnit: 3000 },
    'Week Ends': { rentType: 'Day Wise', costPerUnit: 1250 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 6000 },
  },
  'Large Shop': {
    'Week Days': { rentType: 'Day Wise', costPerUnit: 10000 },
    'Week Ends': { rentType: 'Day Wise', costPerUnit: 3000 },
    'Public Holidays': { rentType: 'Day Wise', costPerUnit: 9000 },
  },
  'Atrium - North and West': {
    'Week Days': { rentType: 'Hour Wise', costPerUnit: 600 },
    'Week Ends': { rentType: 'Hour Wise', costPerUnit: 1000 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 2000 },
  },
  'Atrium - South': {
    'Week Days': { rentType: 'Hour Wise', costPerUnit: 750 },
    'Week Ends': { rentType: 'Hour Wise', costPerUnit: 1500 },
    'Public Holidays': { rentType: 'Hour Wise', costPerUnit: 3000 },
  },
  'Cinema Theater': {
    'All Days': { rentType: 'Week Wise', costPerUnit: 100000 },
  },
  'Marketing Banner Space': {
    'Week Days': { rentType: 'SqFt', costPerUnit: 1000 },
    'Week Ends': { rentType: 'SqFt', costPerUnit: 2500 },
    'Public Holidays': { rentType: 'SqFt', costPerUnit: 5000 },
  },
};

// Helper function to determine duration based on date
export function getDurationForDate(date) {
  const dayOfWeek = new Date(date).getDay();
  
  // Check if it's a public holiday (simplified - you might want to use a proper holiday library)
  const publicHolidays = [
    '2024-01-26', // Republic Day
    '2024-08-15', // Independence Day
    '2024-10-02', // Gandhi Jayanti
    // Add more holidays as needed
  ];
  
  const dateString = new Date(date).toISOString().split('T')[0];
  
  if (publicHolidays.includes(dateString)) {
    return 'Public Holidays';
  } else if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
    return 'Week Ends';
  } else {
    return 'Week Days';
  }
}

// Main pricing calculation function
export function calculateBookingCost(spaceType, duration, unitsBooked, startDate, endDate, sizeInSqFt = 1) {
  const pricingRule = PRICING_RULES[spaceType]?.[duration];
  
  if (!pricingRule) {
    throw new Error(`No pricing rule found for ${spaceType} during ${duration}`);
  }
  
  const { rentType, costPerUnit } = pricingRule;
  let totalCost = 0;
  let calculatedUnits = unitsBooked;
  
  switch (rentType) {
    case 'Day Wise':
      totalCost = costPerUnit * unitsBooked;
      break;
    case 'Hour Wise':
      totalCost = costPerUnit * unitsBooked;
      break;
    case 'Week Wise':
      totalCost = costPerUnit * unitsBooked;
      break;
    case 'SqFt':
      // For marketing banners, cost is per sqft per day
      const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      totalCost = costPerUnit * sizeInSqFt * days;
      calculatedUnits = sizeInSqFt * days;
      break;
    default:
      throw new Error(`Unknown rent type: ${rentType}`);
  }
  
  return {
    totalCost,
    costPerUnit,
    rentType,
    unitsBooked: calculatedUnits,
    breakdown: {
      baseRate: costPerUnit,
      units: calculatedUnits,
      total: totalCost,
    },
  };
}

// Function to get available rent types for a space type
export function getAvailableRentTypes(spaceType) {
  const rules = PRICING_RULES[spaceType];
  if (!rules) return [];
  
  return Object.values(rules).map(rule => rule.rentType);
}

// Function to get pricing for all durations of a space type
export function getSpaceTypePricing(spaceType) {
  return PRICING_RULES[spaceType] || {};
}

// Function to apply discount
export function applyDiscount(totalCost, discountPercentage) {
  const discountAmount = (totalCost * discountPercentage) / 100;
  return {
    originalCost: totalCost,
    discountAmount,
    discountPercentage,
    finalCost: totalCost - discountAmount,
  };
}
