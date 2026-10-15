import React, { useEffect } from 'react';
import styles from './MobileMenu.module.scss';
import { Navigation } from '../Navigation';
import { HeaderAction } from '../HeaderAction';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

interface Prop {
  show: boolean;
  closeModal: () => void;
}

export const MobileMenu: React.FC<Prop> = ({ show, closeModal }) => {
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  return (
    <div className={`${styles.container} ${show ? styles.show : ''}`}>
      <Navigation varinant="modal" handleCloseModal={closeModal} />
      <div className={styles.ordersgroup}>
        <HeaderAction
          closeModal={closeModal}
          to="/cart"
          label="Cart"
          icon={<img src="img/Cart.svg" alt="cartSvg" />}
          count={cartCount}
          variant="modal"
        />
        <HeaderAction
          closeModal={closeModal}
          to="/favorites"
          label="Favorites"
          icon={<img src="img/Favorites.svg" alt="FavoritedSvg" />}
          count={favoritesCount}
          variant="modal"
        />
      </div>
    </div>
  );
};

export default MobileMenu;
