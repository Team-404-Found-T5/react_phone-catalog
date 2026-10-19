import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <NavLink to="/" className={styles.link} aria-label="Home">
            <img src="img/Home.svg" alt="" />
          </NavLink>
        </li>

        {items.map(item => (
          <li
            key={`${item.label}-${item.to ?? 'current'}`}
            className={styles.item}
          >
            <img src="img/ArrowRight-disabled.svg" alt="" />

            {item.to ? (
              <NavLink to={item.to} className={styles.link}>
                {item.label}
              </NavLink>
            ) : (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
