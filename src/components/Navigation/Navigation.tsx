import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { playClickSound } from '../../modules/PixelHearts/sounds';

interface Prop {
  varinant?: 'modal';
  handleCloseModal?: () => void;
}

export const Navigation: React.FC<Prop> = ({ varinant, handleCloseModal }) => {
  const [isSubmenuClosed, setIsSubmenuClosed] = useState(false);

  const handleClick = () => {
    playClickSound();
    setIsSubmenuClosed(true);
    handleCloseModal?.();
  };

  return (
    <nav className={styles.nav}>
      <ul className={`${styles.navLinks} ${styles[`navList-${varinant}`]}`}>
        <li className={styles.item}>
          <NavLink
            onClick={handleClick}
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.links} ${styles.active}` : styles.links
            }
          >
            Home
          </NavLink>
        </li>
        <li
          className={`${styles.item} ${styles.catalogItem} ${
            isSubmenuClosed ? styles.closed : ''
          }`}
          onMouseEnter={() => setIsSubmenuClosed(false)}
        >
          <NavLink
            onClick={handleClick}
            to="/catalog"
            className={({ isActive }) =>
              isActive ? `${styles.links} ${styles.active}` : styles.links
            }
          >
            Catalog
          </NavLink>
          <ul className={styles.submenu}>
            <li>
              <NavLink
                onClick={handleClick}
                to="/phones"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.submenuLink} ${styles.submenuActive}`
                    : styles.submenuLink
                }
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleClick}
                to="/tablets"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.submenuLink} ${styles.submenuActive}`
                    : styles.submenuLink
                }
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleClick}
                to="/accessories"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.submenuLink} ${styles.submenuActive}`
                    : styles.submenuLink
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
