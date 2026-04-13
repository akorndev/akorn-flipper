import { useState, useEffect, useCallback } from 'react';
import { useFlip } from './context/FlipContext';
import Header from './components/Header';
import SettingsPanel from './components/SettingsPanel';
import ResultsTable from './components/ResultsTable';
import CartPanel from './components/CartPanel';
import { fetchItemsDatabase, fetchMarketData, generateFilteredItemIds } from './api/albionApi';
import { calculateFlipProfits } from './utils/profitCalculator';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { items, settings, setResults, setItems } = useFlip();

  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode); }, [darkMode]);

  useEffect(() => {
    const load = async () => {
      try { const data = await fetchItemsDatabase(); setItems(data); } catch(e) { console.error(e); setItems([]); }
    };
    load();
  }, [setItems]);

  const handleFind = useCallback(async () => {
    if (items.length === 0) { setError("Item database not loaded yet."); return; }
    setLoading(true); setError(null);
    try {
      const ids = generateFilteredItemIds(items, settings);
      const data = await fetchMarketData(ids, settings.cities, settings.quality);
      setResults(calculateFlipProfits(data, items, settings));
    } catch (err) { setError(err.message || "Failed to fetch data"); }
    finally { setLoading(false); }
  }, [items, settings, setResults]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onRefresh={handleFind} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200">⚠️ {error}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <SettingsPanel onFindFlips={handleFind} isLoading={loading} />
            <CartPanel />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <ResultsTable />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700">AlbionFlipper Modern • Not affiliated with Sandbox Interactive</footer>
    </div>
  );
}
export default App;