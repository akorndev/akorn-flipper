import { Sun, Moon, RefreshCw, ShoppingCart } from 'lucide-react';
import { useFlip } from '../context/FlipContext';

export default function Header({ darkMode, setDarkMode, onRefresh }) {
  const { cart, lastUpdate } = useFlip();
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AlbionFlipper Pro</h1>
            <p className="text-xs text-gray-500">{lastUpdate ? `Updated: ${new Date(lastUpdate).toLocaleTimeString()}` : 'Ready to flip'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={onRefresh} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><RefreshCw className="w-5 h-5" /></button>
          <button onClick={() => { setDarkMode(!darkMode); document.documentElement.classList.toggle('dark', !darkMode); }} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="relative">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{cart.length}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}