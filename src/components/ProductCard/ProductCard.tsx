import React from 'react';
import styles from './ProductCard.module.scss';
import type { Product } from '../../types/product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <p className={styles.name}>{product.name}</p>
      <p className={styles.price}>${product.price}</p>

      <div className={styles.divider}></div>

      <div className={styles.specs}>
        <p className={styles.screen}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </p>
        <p className={styles.capacity}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </p>
        <p className={styles.ram}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.cartButton} type="button">
          Add to cart
        </button>
        <button
          className={styles.favoriteButton}
          type="button"
          aria-label="Add to favorites"
        >
          <img
            src={`${import.meta.env.BASE_URL}img/Favorites.svg`}
            alt=""
            className={styles.favoriteIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
