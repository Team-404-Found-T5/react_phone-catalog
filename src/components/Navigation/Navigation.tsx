import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { playClickSound } from '../../modules/PixelHearts/sounds';

interface Prop {
  varinant?: 'modal';
  handleCloseModal?: () => void;
}

export const Navigation: React.FC<Prop> = ({ varinant, handleCloseModal }) => {
  const handleClick = () => {
    playClickSound();
    handleCloseModal?.();
  };

  return (
    <nav className={styles.nav}>
      <ul className={`${styles.navLinks} ${styles[`navList-${varinant}`]}`}>
        <li className={styles.item}>
          <NavLink
            onClick={handleClick}
            to="/"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            onClick={handleClick}
            to="/phones"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            onClick={handleClick}
            to="/tablets"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            tablets
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            onClick={handleClick}
            to="/accessories"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
