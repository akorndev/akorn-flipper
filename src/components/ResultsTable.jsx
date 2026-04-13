import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { useFlip } from '../context/FlipContext';
import { formatMoney, formatAge, getTierColor } from '../utils/formatters';

export default function ResultsTable() {
  const { results, addToCart, settings } = useFlip();
  const [sort, setSort] = useState({ key: 'profit', dir: 'desc' });

  const sorted = useMemo(() => {
    const arr = [...results];
    if (sort.key) arr.sort((a, b) => sort.dir === 'asc' ? a[sort.key] - b[sort.key] : b[sort.key] - a[sort.key]);
    return arr;
  }, [results, sort]);

  if (results.length === 0) return <div className="card p-12 text-center text-gray-500">No flips found. Adjust filters or wait for market updates.</div>;

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <tr>
              {[['tier','Tier'],['name','Item'],['profit','Profit'],['percentileProfit','%'],['bmPrice','BM Buy'],['sell_price_min','City Sell'],['city','City'],['','']].map(([k,l]) => (
                <th key={k} onClick={() => k && setSort({key:k, dir: sort.key===k && sort.dir==='desc'?'asc':'desc'})} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-white/10">
                  {l} {sort.key===k && (sort.dir==='asc'?<ChevronUp className="w-4 h-4 inline"/>:<ChevronDown className="w-4 h-4 inline"/>)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sorted.map((item, i) => (
              <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors">
                <td className={`px-4 py-3 whitespace-nowrap text-sm font-mono font-bold ${getTierColor(item.tier)}`}>{item.tier}.{item.enchantment}</td>
                <td className="px-4 py-3"><div className="text-sm font-medium">{item.name}</div><div className="text-xs text-gray-500">Q{item.quality} • BM:{formatAge(item.bmAge)} • City:{formatAge(item.cityAge)}</div></td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-600">{formatMoney(item.profit)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{item.percentileProfit}%</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{formatMoney(item.bmPrice)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{formatMoney(item.sell_price_min)}</td>
                <td className="px-4 py-3 whitespace-nowrap"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs">{item.city}</span></td>
                <td className="px-4 py-3"><button onClick={() => addToCart(item)} className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg"><Plus className="w-4 h-4"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm text-gray-500">
        <span>{sorted.length} profitable flips</span><span>Tax: {settings.isPremium?'3%':'6%'}</span>
      </div>
    </div>
  );
}