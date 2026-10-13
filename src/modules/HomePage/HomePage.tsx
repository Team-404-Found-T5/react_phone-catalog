import React from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  return (
    <>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <BannerSlider />

      <section className={styles.section}>
        <ProductsSlider title="Brand new models" />
      </section>

      <section className={styles.section}>
        <ShopByCategory />
      </section>

      <section className={styles.section}>
        <ProductsSlider title="Hot prices" />
      </section>
    </>
  );
};

export default HomePage;
