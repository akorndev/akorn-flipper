export const calculateFlipProfits = (marketData, items, params) => {
  const { maxAgeBM, maxAgeCity, minProfit, isPremium } = params;
  const tax = isPremium ? 0.97 : 0.94;
  const cityOrder = ["Black Market", "Fort Sterling", "Thetford", "Lymhurst", "Bridgewatch", "Martlock", "Caerleon"];
  const citiesData = cityOrder.map(city => marketData.filter(item => item.city === city));
  const now = Date.now();
  const results = [];

  citiesData.slice(1).forEach((cityItems, idx) => {
    const cityName = cityOrder[idx + 1];
    const bmItems = citiesData[0];

    cityItems.forEach(cityItem => {
      const bmItem = bmItems.find(b => b.item_id === cityItem.item_id && b.quality === cityItem.quality);
      if (!bmItem?.buy_price_max || !cityItem.sell_price_min) return;

      const bmAge = Math.round((now - new Date(bmItem.buy_price_max_date + 'Z').getTime()) / 60000);
      const cityAge = Math.round((now - new Date(cityItem.sell_price_min_date + 'Z').getTime()) / 60000);

      if (bmAge > maxAgeBM || cityAge > maxAgeCity) return;

      const profit = Math.round((bmItem.buy_price_max * tax) - cityItem.sell_price_min);
      if (profit < minProfit) return;

      const itemInfo = items.find(i => i.item_id === cityItem.item_id);
      results.push({
        ...cityItem,
        name: itemInfo?.name || cityItem.item_id,
        tier: cityItem.item_id.charAt(1),
        city: cityName,
        profit,
        percentileProfit: Math.round(1000 * (profit / cityItem.sell_price_min)) / 10,
        bmPrice: bmItem.buy_price_max,
        bmAge,
        cityAge
      });
    });
  });
  return results.sort((a, b) => b.profit - a.profit);
};