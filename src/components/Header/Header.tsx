import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { SwitchBgButtons } from '../SwitchBgButtons/SwitchBgButtons';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeaderAction } from '../HeaderAction';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { BurgerButton } from '../BurgerButton';
import { playBoxOpenSound } from '../../modules/PixelHearts/sounds';
import { MobileMenu } from '../MobileMenu';
import { SearchInput } from '../SearchInput';
import { NavLink } from 'react-router-dom';

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

    const [theme, setTheme] = useState(() => {
      const savedTheme = localStorage.getItem('theme');

      if (savedTheme === 'dark') {
        return 'dark';
      }

      return 'light';
    });

    useEffect(() => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('theme', theme);
    }, [theme]);

  return (
    <header className={styles.headerHeader}>
      <div className={styles.container}>
        <div className={styles.firstpartHeader}>
          <NavLink to="/home">
            <Logo variant="header" />
          </NavLink>

          <div className={styles.navWrapper}>
            <Navigation />
          </div>
        </div>

        <SearchInput />

        <div>
          <div className={styles.rightSectionCartAndFav}>
            <SwitchBgButtons theme={theme} setTheme={setTheme}/>
            <HeaderAction
              playBoxOpenSound={playBoxOpenSound}
              to="/cart"
              label="Cart"
              icon={<img src="img/Cart.svg" alt="cartSvg" />}
              count={cartCount}
            />

            <HeaderAction
              playBoxOpenSound={playBoxOpenSound}
              to="/favorites"
              label="Favorites"
              icon={<img src="img/Favorites.svg" alt="FavoritedSvg" />}
              count={favoritesCount}
            />
          </div>

          <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
        <MobileMenu show={isMenuOpen} closeModal={closeMenu} theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
};

export default Header;
