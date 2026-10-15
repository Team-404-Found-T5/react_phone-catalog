import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeaderAction } from '../HeaderAction';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { BurgerButton } from '../BurgerButton';
import { MobileMenu } from '../MobileMenu';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <header className={styles.headerHeader}>
      <div className={styles.container}>
        <div className={styles.firstpartHeader}>
          <a href='#header' onClick={toTop}><Logo variant='header' /></a>
          <div className={styles.navWrapper}>
            <Navigation />
          </div>
        </div>

        <div>
          <div className={styles.rightSectionCartAndFav}>
            <HeaderAction
              to="/cart"
              label="Cart"
              icon={<img src="img/Cart.svg" alt="cartSvg" />}
              count={cartCount}
            />
            <HeaderAction
              to="/favorites"
              label="Favorites"
              icon={<img src="img/Favorites.svg" alt="FavoritedSvg" />}
              count={favoritesCount}
            />
          </div>
          <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        <MobileMenu show={isMenuOpen} closeModal={closeMenu} />
      </div>
    </header>
  );
};

export default Header;
