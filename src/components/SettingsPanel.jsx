import { useFlip } from '../context/FlipContext';

export default function SettingsPanel({ onFindFlips, isLoading }) {
  const { settings, updateSetting } = useFlip();
  const cities = ['Fort Sterling', 'Thetford', 'Lymhurst', 'Bridgewatch', 'Martlock', 'Caerleon'];

  return (
    <div className="card p-6 space-y-5">
      <h3 className="text-lg font-semibold">⚙️ Flip Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tier</label>
          <select value={settings.tier} onChange={e => updateSetting('tier', parseInt(e.target.value))} className="input-field">
            <option value={-1}>All (4-8)</option>
            {[4,5,6,7,8].map(t => <option key={t} value={t}>Tier {t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Enchantment</label>
          <select value={settings.enchantment} onChange={e => updateSetting('enchantment', parseInt(e.target.value))} className="input-field">
            <option value={-1}>All</option>
            {[0,1,2,3].map(e => <option key={e} value={e}>+{e}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Quality</label>
        <select value={settings.quality} onChange={e => updateSetting('quality', e.target.value)} className="input-field">
          <option value="all">All</option>
          <option value="1">Normal</option><option value="2">Good</option><option value="3">Outstanding</option><option value="4">Excellent</option><option value="5">Masterpiece</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Source Cities</label>
        <div className="grid grid-cols-2 gap-2">
          {cities.map(city => (
            <label key={city} className="flex items-center space-x-2 text-sm cursor-pointer">
              <input type="checkbox" checked={settings.cities.includes(city)} onChange={e => updateSetting('cities', e.target.checked ? [...settings.cities, city] : settings.cities.filter(c => c !== city))} className="rounded text-blue-600" />
              <span>{city}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div><label className="block text-sm font-medium mb-1">Min Profit</label><input type="number" value={settings.minProfit} onChange={e => updateSetting('minProfit', parseInt(e.target.value)||0)} className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Max BM Age (min)</label><input type="number" value={settings.maxAgeBM} onChange={e => updateSetting('maxAgeBM', parseInt(e.target.value)||60)} className="input-field" /></div>
        <div><label className="block text-sm font-medium mb-1">Max City Age (min)</label><input type="number" value={settings.maxAgeCity} onChange={e => updateSetting('maxAgeCity', parseInt(e.target.value)||60)} className="input-field" /></div>
      </div>
      <label className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer">
        <input type="checkbox" checked={settings.isPremium} onChange={e => updateSetting('isPremium', e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
        <span className="text-sm font-medium">Premium Account (3% tax)</span>
      </label>
      <button onClick={onFindFlips} disabled={isLoading} className="btn-primary w-full py-3 text-lg">
        {isLoading ? <><svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Fetching...</> : '🔍 Find Profitable Flips!'}
      </button>
    </div>
  );
}