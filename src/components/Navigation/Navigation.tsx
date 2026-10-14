import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navLinks}>
        <li className={styles.item}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/phones"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/tablets"
            className={({ isActive }) => isActive ? `${styles.links} ${styles.active}` : styles.links}
          >
            tablets
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
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
