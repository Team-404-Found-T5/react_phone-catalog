import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';
import { CheckoutModal } from '../../components/CheckoutModal/CheckoutModal';
import { useCart } from '../../context/CartContext';
import { usePageLoadingDelay } from '../../hooks/usePageLoadingDelay';
import styles from './CartPage.module.scss';
import { playClick2Sound } from '../PixelHearts/sounds';
import { CartSkeleton } from './CartSkeleton';

export const CartPage: React.FC = () => {
  const { items, remove } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const isLoading = usePageLoadingDelay();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    items.forEach(item => remove(item.product.itemId));
  };

  if (isLoading) {
    return (
      <div className={styles.container} aria-busy="true">
        <BackButton />
        <h1 className={styles.title}>Cart</h1>
        <CartSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <BackButton />

        <h1 className={styles.title}>Cart</h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <img
              className={styles.emptyImage}
              src="img/cart-is-empty.webp"
              alt=""
            />

            <p className={styles.emptyText}>Your cart is empty</p>

            <NavLink to="/catalog" className={styles.emptyLink}>
              Go shopping
            </NavLink>
          </div>
        ) : (
          <div className={styles.content}>
            <ul className={styles.items}>
              {items.map(item => (
                <li key={item.product.itemId}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>

            <section className={styles.summary}>
              <p className={styles.total}>${totalPrice}</p>

              <p className={styles.totalCount}>
                Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </p>

              <hr className={styles.divider} />

              <button
                type="button"
                className={styles.checkout}
                onClick={() => {
                  playClick2Sound();
                  setIsCheckoutOpen(true);
                }}
              >
                Checkout
              </button>
            </section>
          </div>
        )}

        <CheckoutModal
          isOpen={isCheckoutOpen}
          totalPrice={totalPrice}
          totalCount={totalCount}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={handleClearCart}
        />
      </div>
    </>
  );
};

export default CartPage;
