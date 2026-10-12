import React from 'react';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeaderAction } from '../HeaderAction';

export const Header: React.FC = () => {
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  return (
    <div className={styles.header}>
      <h1>Header</h1>
      <div className={styles['right-section']}>
        <HeaderAction
          to="/cart"
          label="Cart"
          icon={<img src="/img/Cart.svg" alt="" />}
          count={cartCount}
        />
        <HeaderAction
          to="/favorites"
          label="Favorites"
          icon={<img src="/img/Favorites.svg" alt="" />}
          count={favoritesCount}
        />
      </div>
    </div>
  );
};

export default Header;
