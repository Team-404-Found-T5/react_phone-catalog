import React from 'react';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeaderAction } from '../HeaderAction';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';

export const Header: React.FC = () => {
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  return (
    <header id='header'>
      <div className={styles.header}>
        <div className={styles.firstpartHeader}>
          <Logo logoWidth={80}/>
          <Navigation />
        </div>
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
    </header>
  );
};

export default Header;
