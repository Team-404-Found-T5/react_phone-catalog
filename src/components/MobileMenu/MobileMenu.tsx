import React from 'react';
import styles from './MobileMenu.module.scss';

export const MobileMenu: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="/img/mobile-menu-logo.svg"
          alt="Nice Gadgets"
          className={styles.logo}
        />
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close menu"
        >
          <img
            src="/img/Close.svg"
            alt=""
            className={styles.closeIcon}
          />
        </button>
      </div>
      <div className={styles.menuItems}>
        <button className={styles.menuItem} type="button">
          HOME
        </button>
        <button className={styles.menuItem} type="button">
          PHONES
        </button>
        <button className={styles.menuItem} type="button">
          TABLETS
        </button>
        <button className={styles.menuItem} type="button">
          ACCESSORIES
        </button>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.favorites}
          type="button"
          aria-label="Favorites"
        >
          <img
            src="/img/Favorites.svg"
            alt=""
            className={styles.favoritesIcon}
          />
        </button>
        <button className={styles.cart} type="button" aria-label="Cart">
          <img
            src="/img/Cart.svg"
            alt=""
            className={styles.cartIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
