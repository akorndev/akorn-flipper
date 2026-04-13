export const formatMoney = (amount) => {
  if (amount == null) return '-';
  const abs = Math.abs(amount);
  if (abs >= 1e9) return `${(abs/1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${(abs/1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${(abs/1e3).toFixed(1)}K`;
  return abs.toLocaleString();
};

export const formatAge = (min) => min == null || min === Infinity ? '∞' : min < 60 ? `${min}m` : `${Math.round(min/60)}h`;

export const getTierColor = (t) => ({4:'text-blue-500',5:'text-green-500',6:'text-purple-500',7:'text-orange-500',8:'text-red-500'}[t] || 'text-gray-500');