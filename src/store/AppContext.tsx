import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CartItem, Property, User } from '../types';

interface AppState {
  cart: CartItem[];
  favorites: string[];
  user: User | null;
  isCartOpen: boolean;
  currentPage: string;
  currentPropertyId: string | null;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'NAVIGATE'; payload: { page: string; propertyId?: string } };

const initialState: AppState = {
  cart: [],
  favorites: [],
  user: null,
  isCartOpen: false,
  currentPage: 'home',
  currentPropertyId: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find(item => item.property.id === action.payload.property.id);
      if (exists) return state;
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.property.id !== action.payload) };
    case 'TOGGLE_FAVORITE': {
      const isFav = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFav
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    }
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'OPEN_CART':
      return { ...state, isCartOpen: true };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'NAVIGATE':
      return {
        ...state,
        currentPage: action.payload.page,
        currentPropertyId: action.payload.propertyId ?? null,
        isCartOpen: false,
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  navigate: (page: string, propertyId?: string) => void;
  addToCart: (property: Property, action: CartItem['action']) => void;
  removeFromCart: (propertyId: string) => void;
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  isInCart: (propertyId: string) => boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigate = (page: string, propertyId?: string) => {
    dispatch({ type: 'NAVIGATE', payload: { page, propertyId } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (property: Property, action: CartItem['action']) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { property, action, addedAt: new Date().toISOString() },
    });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeFromCart = (propertyId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: propertyId });
  };

  const toggleFavorite = (propertyId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: propertyId });
  };

  const isFavorite = (propertyId: string) => state.favorites.includes(propertyId);
  const isInCart = (propertyId: string) => state.cart.some(item => item.property.id === propertyId);

  return (
    <AppContext.Provider value={{ state, dispatch, navigate, addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
