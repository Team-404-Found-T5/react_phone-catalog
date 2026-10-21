import React, { useEffect } from 'react';
import styles from './MobileMenu.module.scss';
import { Navigation } from '../Navigation';
import { HeaderAction } from '../HeaderAction';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';
import SwitchBgButtons from '../SwitchBgButtons/SwitchBgButtons';
import { useMatch } from 'react-router-dom';

interface Prop {
  theme: string;
  setTheme: (param: string) => void;
  show: boolean;
  closeModal: () => void;
}

export const MobileMenu: React.FC<Prop> = ({ show, closeModal, theme, setTheme }) => {
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();
  const { comparedProducts } = useCompare();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;
  const isCartPage = useMatch({ path: '/cart', end: true }) !== null;
  const compareCount = comparedProducts.length;

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
      <SwitchBgButtons variant="modal" theme={theme} setTheme={setTheme} />
      <div className={styles.ordersgroup}>
        <HeaderAction
          closeModal={closeModal}
          to="/compare"
          label="compare"
          icon={<img src="img/compareSvg.svg" alt="compareSvg" />}
          count={compareCount}
          variant="modal"
        />
        <HeaderAction
          closeModal={closeModal}
          to="/cart"
          label="Cart"
          icon={
            <img
              src={
                isCartPage ? 'img/Chest-opened.svg' : 'img/Chest-closed.svg'
              }
              width="24"
              height="24"
              alt="Cart"
            />
          }
          count={cartCount}
          variant="modal"
        />
        <HeaderAction
          closeModal={closeModal}
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
          variant="modal"
        />
      </div>
    </div>
  );
};

export default MobileMenu;
