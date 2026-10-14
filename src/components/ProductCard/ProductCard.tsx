import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';
import type { Product } from '../../types/product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { items: cartItems, add, remove } = useCart();
  const { items: favoriteItems, toggle } = useFavorites();
  const isInCart = cartItems.some(item => item.product.itemId === product.itemId);
  const isFavorite = favoriteItems.some(item => item.itemId === product.itemId);

  return (
    <div className={styles.container}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.name}
      >
        {product.name}
      </Link>
      <div className={styles.prices}>
        <p className={styles.price}>${product.price}</p>
        {product.oldPrice !== undefined && (
          <p className={styles.oldPrice}>${product.oldPrice}</p>
        )}
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
      </div>
      <div className={styles.actions}>
        <div className={styles.cartActions}>
          <button
            className={`${styles.cartButton} ${
              isInCart ? styles.cartButtonAdded : ''
            }`}
            type="button"
            disabled={isInCart}
            onClick={() => add({ product, quantity: 1 })}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>
          {isInCart && (
            <button
              className={styles.removeFromCart}
              type="button"
              aria-label={`Remove ${product.name} from cart`}
              onClick={() => remove(product.itemId)}
            >
              <img src={`${import.meta.env.BASE_URL}img/Close.svg`} alt="" />
            </button>
          )}
        </div>
        <button
          className={styles.favoriteButton}
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          onClick={() => toggle(product)}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/${
              isFavorite ? 'Like-active.svg' : 'Like.svg'
            }`}
            alt=""
            className={styles.favoriteIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
