import { createContext, useContext, useReducer, useCallback } from 'react';

const FlipContext = createContext();

const initialState = {
  items: [],
  results: [],
  cart: [],
  settings: {
    tier: -1,
    enchantment: -1,
    quality: 'all',
    cities: ['Fort Sterling', 'Thetford', 'Lymhurst', 'Bridgewatch', 'Martlock', 'Caerleon'],
    maxAgeBM: 60,
    maxAgeCity: 60,
    minProfit: 1000,
    isPremium: true
  },
  loading: false,
  error: null,
  lastUpdate: null
};

function flipReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS': return { ...state, items: action.payload };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_ERROR': return { ...state, error: action.payload, loading: false };
    case 'SET_RESULTS': return { ...state, results: action.payload, loading: false, lastUpdate: new Date().toISOString() };
    case 'UPDATE_SETTING': return { ...state, settings: { ...state.settings, [action.key]: action.value } };
    case 'ADD_TO_CART': return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART': return { ...state, cart: state.cart.filter((_, i) => i !== action.payload) };
    case 'CLEAR_CART': return { ...state, cart: [] };
    default: return state;
  }
}

export function FlipProvider({ children }) {
  const [state, dispatch] = useReducer(flipReducer, initialState);

  const updateSetting = useCallback((key, value) => dispatch({ type: 'UPDATE_SETTING', key, value }), []);
  const addToCart = useCallback((item) => dispatch({ type: 'ADD_TO_CART', payload: item }), []);
  const removeFromCart = useCallback((index) => dispatch({ type: 'REMOVE_FROM_CART', payload: index }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const setItems = useCallback((items) => dispatch({ type: 'SET_ITEMS', payload: items }), []);
  const setResults = useCallback((results) => dispatch({ type: 'SET_RESULTS', payload: results }), []);

  const value = { ...state, updateSetting, addToCart, removeFromCart, clearCart, setItems, setResults };

  return <FlipContext.Provider value={value}>{children}</FlipContext.Provider>;
}

export const useFlip = () => {
  const context = useContext(FlipContext);
  if (!context) throw new Error('useFlip must be used within FlipProvider');
  return context;
};