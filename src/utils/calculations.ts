const HECTOLITER_TO_CASE = 0.09;

export interface LOSData {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
  pendingOrders: number;
  receivedStock: number;
}

export interface LOSResult {
  currentLos: number;
  sellOutCases: number;
  sellInCases: number;
  casesNeeded: number;
  newSellOutHl: number;
  newSellOutCases: number;
  losAfterSelling: number;
  newSellInHl: number;
  newSellInCases: number;
  losAfterReceiving: number;
  adjustedSellOut: number;
  predictedLos: number;
  losStatus: 'critical' | 'optimal' | 'caution' | 'high';
}

export function calculateLOS(data: LOSData): LOSResult {
  const { sellOutHl, sellInHl, desiredLos, pendingOrders, receivedStock } = data;

  if (!sellOutHl || !sellInHl) {
    return getEmptyResult();
  }

  const sellOutCases = sellOutHl / HECTOLITER_TO_CASE;
  const sellInCases = sellInHl / HECTOLITER_TO_CASE;
  const currentLos = (sellOutHl / sellInHl) * 100;

  const casesNeeded = desiredLos > 0 ? (desiredLos * sellInCases) / 100 - sellOutCases : 0;
  const newSellOutHl = desiredLos > 0 ? (casesNeeded * HECTOLITER_TO_CASE) + sellOutHl : sellOutHl;
  const newSellOutCases = newSellOutHl / HECTOLITER_TO_CASE;
  const losAfterSelling = (newSellOutHl / sellInHl) * 100;

  const newSellInHl = receivedStock > 0 ? (receivedStock * HECTOLITER_TO_CASE) + sellInHl : sellInHl;
  const newSellInCases = newSellInHl / HECTOLITER_TO_CASE;
  const losAfterReceiving = (sellOutHl / newSellInHl) * 100;

  const adjustedSellOut = sellOutCases + pendingOrders;
  const predictedLos = (adjustedSellOut / sellInCases) * 100;

  const losStatus = getLosStatus(currentLos);

  return {
    currentLos,
    sellOutCases,
    sellInCases,
    casesNeeded,
    newSellOutHl,
    newSellOutCases,
    losAfterSelling,
    newSellInHl,
    newSellInCases,
    losAfterReceiving,
    adjustedSellOut,
    predictedLos,
    losStatus,
  };
}

function getLosStatus(los: number): 'critical' | 'optimal' | 'caution' | 'high' {
  if (los < 93) return 'critical';
  if (los <= 103) return 'optimal';
  if (los <= 105) return 'caution';
  return 'high';
}

function getEmptyResult(): LOSResult {
  return {
    currentLos: 0,
    sellOutCases: 0,
    sellInCases: 0,
    casesNeeded: 0,
    newSellOutHl: 0,
    newSellOutCases: 0,
    losAfterSelling: 0,
    newSellInHl: 0,
    newSellInCases: 0,
    losAfterReceiving: 0,
    adjustedSellOut: 0,
    predictedLos: 0,
    losStatus: 'optimal',
  };
}

export function getSuggestion(status: string, currentLos: number, desiredLos: number): string {
  if (status === 'critical') {
    return `Coverage is critically low at ${currentLos.toFixed(1)}%. You need to accelerate sales velocity or reduce incoming inventory to approach your ${desiredLos.toFixed(0)}% target.`;
  }
  if (status === 'optimal') {
    return `Excellent performance at ${currentLos.toFixed(1)}%! You're within the optimal range. Continue monitoring demand patterns and maintain current supply chain execution.`;
  }
  if (status === 'caution') {
    return `Coverage is elevated at ${currentLos.toFixed(1)}%. Monitor demand closely and consider coordinating with suppliers to adjust future shipment timing.`;
  }
  if (status === 'high') {
    return `Coverage is significantly high at ${currentLos.toFixed(1)}%. Coordinate with suppliers to optimize future orders, or accelerate sales initiatives to rebalance inventory.`;
  }
  return 'Analyze your coverage performance and adjust supply accordingly.';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'critical':
      return 'from-red-600 to-red-700';
    case 'optimal':
      return 'from-green-600 to-green-700';
    case 'caution':
      return 'from-orange-600 to-orange-700';
    case 'high':
      return 'from-cyan-600 to-teal-600';
    default:
      return 'from-slate-600 to-slate-700';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'critical':
      return 'bg-red-50 border-red-200';
    case 'optimal':
      return 'bg-green-50 border-green-200';
    case 'caution':
      return 'bg-orange-50 border-orange-200';
    case 'high':
      return 'bg-cyan-50 border-cyan-200';
    default:
      return 'bg-slate-50 border-slate-200';
  }
}

export function getStatusTextColor(status: string): string {
  switch (status) {
    case 'critical':
      return 'text-red-700';
    case 'optimal':
      return 'text-green-700';
    case 'caution':
      return 'text-orange-700';
    case 'high':
      return 'text-cyan-700';
    default:
      return 'text-slate-700';
  }
}
