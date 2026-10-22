import { createContext, PropsWithChildren, useContext } from 'react';
import { CartItem } from '../types/cart';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface CartContextValue {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart', []);

  const add = (item: CartItem) => {
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
  };

  const remove = (itemId: string) => {
    setItems(currentItems =>
      currentItems.filter(item => item.product.itemId !== itemId),
    );
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      remove(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.itemId === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  return (
    <CartContext.Provider value={{ items, add, remove, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
