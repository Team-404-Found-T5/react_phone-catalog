import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';

export const MAX_COMPARE = 5;

interface CompareContextType {
  comparedProducts: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [comparedProducts, setComparedProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('compare');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(comparedProducts));
  }, [comparedProducts]);

  const addToCompare = (product: Product): boolean => {
    if (comparedProducts.some(p => p.id === product.id)) return true;
    if (comparedProducts.length >= MAX_COMPARE) return false;

    setComparedProducts(prev => [...prev, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const isInCompare = (productId: string) => {
    return comparedProducts.some(p => p.id === productId);
  };

  const clearCompare = () => {
    setComparedProducts([]);
  };

  return (
    <CompareContext.Provider
      value={{ comparedProducts, addToCompare, removeFromCompare, isInCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within a CompareProvider');
  return context;
};
