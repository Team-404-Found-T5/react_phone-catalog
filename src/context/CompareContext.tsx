import { createContext, PropsWithChildren, useContext } from 'react';
import { Product } from '../types/product';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const MAX_COMPARE = 5;

type CompareContextValue = {
  comparedProducts: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export const CompareProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [comparedProducts, setComparedProducts] = useLocalStorage<Product[]>(
    'compare',
    [],
  );

  const addToCompare = (product: Product) => {
    if (comparedProducts.some(item => item.id === product.id)) {
      return true;
    }

    if (comparedProducts.length >= MAX_COMPARE) {
      return false;
    }

    setComparedProducts(current => [...current, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setComparedProducts(current =>
      current.filter(product => product.id !== productId),
    );
  };

  const isInCompare = (productId: string) =>
    comparedProducts.some(product => product.id === productId);

  const clearCompare = () => setComparedProducts([]);

  return (
    <CompareContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = (): CompareContextValue => {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }

  return context;
};
