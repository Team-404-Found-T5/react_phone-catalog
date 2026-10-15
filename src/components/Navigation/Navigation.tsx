import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface Prop {
  varinant?: 'modal';
  handleCloseModal?: () => void;
}

export const Navigation: React.FC<Prop> = ({ varinant, handleCloseModal }) => {
  return (
    <nav className={styles.nav}>
      <ul className={`${styles.navLinks} ${styles[`navList-${varinant}`]}`}>
        <li className={styles.item}>
          <NavLink
            onClick={handleCloseModal}
            to="/"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            onClick={handleCloseModal}
            to="/phones"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            onClick={handleCloseModal}
            to="/tablets"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            tablets
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            onClick={handleCloseModal}
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
