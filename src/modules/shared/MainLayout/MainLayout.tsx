import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
