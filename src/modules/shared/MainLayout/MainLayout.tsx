import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import styles from './MainLayout.module.scss';
import CursorGrid from '../../../components/CursorGrid/CursorGrid';

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.cursorBackground} aria-hidden="true">
        <CursorGrid color="#4ade80" edgeFade={0} />
      </div>

      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
