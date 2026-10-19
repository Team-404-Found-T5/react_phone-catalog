import React from 'react';
import styles from './ProductCardSkeleton.module.scss';

type Props = {
  count?: number;
};

export const ProductCardSkeleton: React.FC<Props> = ({ count = 1 }) => (
  <div className={styles.list} aria-hidden="true">
    {Array.from({ length: count }, (_, index) => (
      <article className={styles.card} key={index}>
        <div className={`${styles.image} ${styles.shimmer}`} />
        <div className={styles.name}>
          <span className={`${styles.nameLine} ${styles.shimmer}`} />
          <span className={`${styles.nameLineShort} ${styles.shimmer}`} />
        </div>
        <div className={styles.prices}>
          <div className={`${styles.price} ${styles.shimmer}`} />
          <div className={`${styles.oldPrice} ${styles.shimmer}`} />
        </div>
        <div className={styles.divider} />
        <div className={styles.specs}>
          {Array.from({ length: 3 }, (_, rowIndex) => (
            <div className={styles.spec} key={rowIndex}>
              <span className={`${styles.specLabel} ${styles.shimmer}`} />
              <span className={`${styles.specValue} ${styles.shimmer}`} />
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <div className={`${styles.cartButton} ${styles.shimmer}`} />
          <div className={`${styles.favoriteButton} ${styles.shimmer}`} />
        </div>
      </article>
    ))}
  </div>
);

export default ProductCardSkeleton;
