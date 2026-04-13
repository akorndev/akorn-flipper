const API_BASE = "https://www.albionflipper.ml/api/v2/stats/Prices/";

export const fetchMarketData = async (itemIds, cities, quality = 'all') => {
  const locations = [...cities, "Black Market"].join(",");
  const qualities = quality === 'all' ? "0,1,2,3,4,5" : quality;
  const url = `${API_BASE}${itemIds.join(",")}?locations=${locations}&qualities=${qualities}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
};

export const fetchItemsDatabase = async () => {
  try {
    const res = await fetch('/items_raw.txt');
    if (!res.ok) return [];
    const text = await res.text();
    return text.split("\n")
      .filter(line => line.trim() && line.includes(':'))
      .map(line => {
        const [id, ench, ...name] = line.split(':');
        return { item_id: id.trim(), tier: id.charAt(1), enchantment: parseInt(ench)||0, name: name.join(':').trim() };
      });
  } catch { return []; }
};

export const generateFilteredItemIds = (items, filters) => {
  return items.filter(i => {
    if (filters.tier !== -1 && i.tier !== filters.tier.toString()) return false;
    if (filters.enchantment !== -1 && i.enchantment !== filters.enchantment) return false;
    return true;
  }).map(i => i.item_id);
};