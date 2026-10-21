import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { SwitchBgButtons } from '../SwitchBgButtons/SwitchBgButtons';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';
import { HeaderAction } from '../HeaderAction';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { BurgerButton } from '../BurgerButton';
import { playBoxOpenSound } from '../../modules/PixelHearts/sounds';
import { MobileMenu } from '../MobileMenu';
import { SearchInput } from '../SearchInput';
import { NavLink, useMatch } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCartPage = useMatch({ path: '/cart', end: true }) !== null;
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();
  const { comparedProducts } = useCompare();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;
  const compareCount = comparedProducts.length;

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const next = !prev;
      window.dispatchEvent(
        new CustomEvent('mobile-menu-visibility', {
          detail: { isOpen: next },
        }),
      );
      return next;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(prev => {
      if (prev) {
        window.dispatchEvent(
          new CustomEvent('mobile-menu-visibility', {
            detail: { isOpen: false },
          }),
        );
      }
      return false;
    });
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
            <SwitchBgButtons theme={theme} setTheme={setTheme} />
            <div className={styles.navlinksHeader}>
              <div className={styles.dots}>. . . </div>
              <HeaderAction
                playBoxOpenSound={playBoxOpenSound}
                to="/compare"
                label="compare"
                icon={
                  <img
                    className={styles.compareIcon}
                    src="img/compareSvg.svg"
                    alt="compareSvg"
                  />
                }
                count={compareCount}
              />
              <HeaderAction
                playBoxOpenSound={playBoxOpenSound}
                to="/cart"
                label="Cart"
                icon={
                  <img
                    src={
                      isCartPage
                        ? 'img/Chest-opened.svg'
                        : 'img/Chest-closed.svg'
                    }
                    width="24"
                    height="24"
                    alt="Cart"
                  />
                }
                count={cartCount}
              />
              <HeaderAction
                playBoxOpenSound={playBoxOpenSound}
                to="/favorites"
                label="Favorites"
                icon={
                  <img
                    src="img/Heart.svg"
                    width="24"
                    height="24"
                    alt="Favorites"
                  />
                }
                count={favoritesCount}
              />
            </div>
          </div>

          <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
        <MobileMenu
          show={isMenuOpen}
          closeModal={closeMenu}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
    </header>
  );
};

export default Header;
