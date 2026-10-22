import { createContext, PropsWithChildren, useContext } from 'react';
import { Product } from '../types/product';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface FavoritesContextValue {
  items: Product[];
  add: (product: Product) => void;
  remove: (itemId: string) => void;
  toggle: (product: Product) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export const FavoritesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [items, setItems] = useLocalStorage<Product[]>('favorites', []);

  const add = (product: Product) => {
    setItems(currentItems => {
      if (currentItems.some(item => item.itemId === product.itemId)) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  };

  const remove = (itemId: string) => {
    setItems(currentItems =>
      currentItems.filter(item => item.itemId !== itemId),
    );
  };

  const toggle = (product: Product) => {
    setItems(currentItems => {
      const isFavorite = currentItems.some(
        item => item.itemId === product.itemId,
      );

      return isFavorite
        ? currentItems.filter(item => item.itemId !== product.itemId)
        : [...currentItems, product];
    });
  };

  return (
    <FavoritesContext.Provider value={{ items, add, remove, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
