import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItem } from '../types/cart';

export interface CartContextValue {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = 'cart';

function readCart(): CartItem[] {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    const parsedCart: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      throw new Error('Cart data must be an array');
    }

    return parsedCart as CartItem[];
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);

    return [];
  }
}

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((item: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        currentItem => currentItem.product.itemId === item.product.itemId,
      );

      if (!existingItem) {
        return [...currentItems, item];
      }

      return currentItems.map(currentItem =>
        currentItem.product.itemId === item.product.itemId
          ? { ...currentItem, quantity: currentItem.quantity + item.quantity }
          : currentItem,
      );
    });
  }, []);

  const remove = useCallback((itemId: string) => {
    setItems(currentItems =>
      currentItems.filter(item => item.product.itemId !== itemId),
    );
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity < 1) {
        remove(itemId);

        return;
      }

      setItems(currentItems =>
        currentItems.map(item =>
          item.product.itemId === itemId ? { ...item, quantity } : item,
        ),
      );
    },
    [remove],
  );

  const contextValue = useMemo(
    () => ({ items, add, remove, updateQuantity }),
    [items, add, remove, updateQuantity],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
