import { Trash2, Copy } from 'lucide-react';
import { useFlip } from '../context/FlipContext';
import { formatMoney } from '../utils/formatters';

export default function CartPanel() {
  const { cart, removeFromCart, clearCart } = useFlip();
  const total = cart.reduce((s, i) => s + (i.profit||0), 0);

  const copy = () => navigator.clipboard.writeText(cart.map(i => `${i.name} (${i.city}): ${formatMoney(i.profit)} profit`).join('\n'));

  if (cart.length === 0) return <div className="card p-6 text-center text-gray-500">Click <span className="text-green-500">+ Cart</span> to add flips</div>;

  return (
    <div className="card">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold">🛒 Cart ({cart.length})</h3>
        <div className="flex space-x-2">
          <button onClick={copy} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><Copy className="w-4 h-4"/></button>
          <button onClick={clearCart} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 className="w-4 h-4"/></button>
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
        {cart.map((item, i) => (
          <div key={i} className="p-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div><div className="text-sm font-medium truncate">{item.name}</div><div className="text-xs text-gray-500">{item.city} • T{item.tier}.{item.enchantment} • Q{item.quality}</div></div>
            <div className="text-right"><div className="text-sm font-bold text-green-600">+{formatMoney(item.profit)}</div><button onClick={() => removeFromCart(i)} className="text-xs text-red-500 mt-1">Remove</button></div>
          </div>
        ))}
      </div>
      {total > 0 && <div className="p-4 bg-green-50 dark:bg-green-900/20 border-t border-green-200 dark:border-green-800 flex justify-between font-bold"><span>Est. Total:</span><span className="text-green-600">{formatMoney(total)}</span></div>}
    </div>
  );
}