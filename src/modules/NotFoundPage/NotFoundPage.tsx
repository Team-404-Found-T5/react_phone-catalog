import React from 'react';
import styles from './NotFoundPage.module.scss';
import { NavLink } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>

      <NavLink to="/" className={styles.link}>
        Go home
      </NavLink>

      <img className={styles.image} src="img/page-not-found.png" alt="" />
    </div>
  );
};

export default NotFoundPage;
