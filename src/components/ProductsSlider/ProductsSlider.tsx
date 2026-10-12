import React from 'react';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default ProductsSlider;
