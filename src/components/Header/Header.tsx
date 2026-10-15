import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeaderAction } from '../HeaderAction';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { BurgerButton } from '../BurgerButton';
import { playBoxOpenSound } from '../../modules/PixelHearts/sounds';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.headerHeader}>
      <div className={styles.container}>
        <div className={styles.firstpartHeader}>
          <Logo variant='header' />
          <div className={styles.navWrapper}>
            <Navigation />
          </div>
        </div>

        <div className={styles.rightSection}>
          <HeaderAction
            onClick={() => {
              playBoxOpenSound()
            }}
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
          <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
          <Navigation />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
