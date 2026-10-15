import React from 'react';
import styles from './ProductsSlider.module.scss';
import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            className={styles.prevButton}
            type="button"
            aria-label="Previous products"
          >
            <img
              src="img/ArrowLeft-active.svg"
              alt=""
              className={styles.arrowIcon}
            />
          </button>
          <button
            className={styles.nextButton}
            type="button"
            aria-label="Next products"
          >
            <img
              src="img/ArrowRight-active.svg"
              alt=""
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.productsList}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSlider;
