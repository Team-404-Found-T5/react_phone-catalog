import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import type { Product } from '../../types/product';
import { ProductCardActions } from './ProductCardActions';

interface ProductCardProps {
  product: Product;
  compare?: boolean;
  isInView?: boolean;
}

export const ProductCard = ({
  product,
  compare = false,
  isInView = false,
}: ProductCardProps) => {
  const productLink = `/${product.category}/${product.itemId}`;
  const cardClassName = `${styles.container} ${isInView ? styles.inView : ''}`;

  return (
    <div className={cardClassName}>
      <Link to={productLink}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </Link>
      <Link to={productLink} className={styles.name}>
        {product.name}
      </Link>
      <div className={styles.priceAndCompareBlock}>
        <div className={styles.prices}>
          <p className={styles.price}>${product.price}</p>
          {product.oldPrice !== undefined && (
            <p className={styles.oldPrice}>${product.oldPrice}</p>
          )}
        </div>
      </div>

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
        {compare && (
          <>
            <p className={styles.ram}>
              <span className={styles.specLabel}>Category</span>
              <span className={styles.specValue}>{product.category}</span>
            </p>
            <p className={styles.ram}>
              <span className={styles.specLabel}>Year</span>
              <span className={styles.specValue}>{product.year}</span>
            </p>
          </>
        )}
      </div>
      <ProductCardActions product={product} />
    </div>
  );
};

export default ProductCard;
