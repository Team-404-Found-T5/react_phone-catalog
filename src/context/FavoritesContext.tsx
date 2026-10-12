import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/product';

export interface FavoritesContextValue {
  items: Product[];
  add: (product: Product) => void;
  remove: (itemId: string) => void;
  toggle: (product: Product) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

const FAVORITES_STORAGE_KEY = 'favorites';

function readFavorites(): Product[] {
  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    const parsedFavorites: unknown = JSON.parse(storedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      throw new Error('Favorites data must be an array');
    }

    return parsedFavorites as Product[];
  } catch {
    localStorage.removeItem(FAVORITES_STORAGE_KEY);

    return [];
  }
}

export const FavoritesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [items, setItems] = useState<Product[]>(readFavorites);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((product: Product) => {
    setItems(currentItems => {
      if (currentItems.some(item => item.itemId === product.itemId)) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  }, []);

  const remove = useCallback((itemId: string) => {
    setItems(currentItems =>
      currentItems.filter(item => item.itemId !== itemId),
    );
  }, []);

  const toggle = useCallback((product: Product) => {
    setItems(currentItems => {
      const isFavorite = currentItems.some(
        item => item.itemId === product.itemId,
      );

      return isFavorite
        ? currentItems.filter(item => item.itemId !== product.itemId)
        : [...currentItems, product];
    });
  }, []);

  const contextValue = useMemo(
    () => ({ items, add, remove, toggle }),
    [items, add, remove, toggle],
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
