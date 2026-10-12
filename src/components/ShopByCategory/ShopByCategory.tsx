import React from 'react';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory: React.FC = () => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>
    </div>
  );
};

export default ShopByCategory;
