import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import type { Product } from '../types/product';

type ProductsState = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

export const useProducts = (): ProductsState => {
  const [state, setState] = useState<ProductsState>({
    products: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isActive = true;

    getProducts()
      .then(products => {
        if (isActive) {
          setState({ products, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setState({
            products: [],
            isLoading: false,
            error:
              error instanceof Error
                ? error
                : new Error('Failed to load products'),
          });
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return state;
};
