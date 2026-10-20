import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductCard.module.scss';
import type { Product } from '../../types/product';
import { PixelHearts } from '../../modules/PixelHearts/PixelHearts';
import {
  playCartAddSound,
  playCartRemoveSound,
} from '../../modules/PixelHearts/sounds';
import SpecularButton from '../SpecularButton/SpecularButton';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { items: cartItems, add, remove } = useCart();
  const { items: favoriteItems, toggle } = useFavorites();
  const isInCart = cartItems.some(
    item => item.product.itemId === product.itemId,
  );
  const isFavorite = favoriteItems.some(item => item.itemId === product.itemId);

  return (
    <div className={styles.container}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
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
          {isInCart ? (
            <button
              className={`${styles.cartButton} ${styles.cartButtonAdded}`}
              type="button"
              disabled
            >
              Added to cart
            </button>
          ) : (
            <SpecularButton
              className={styles.cartButton}
              type="button"
              size="sm"
              radius={0}
              tintOpacity={0}
              textColor="var(--color-button-text)"
              lineColor="#ffffff"
              baseColor="#ffffff"
              idleIntensity={0}
              proximity={120}
              style={{ backgroundColor: 'var(--color-button-background)' }}
              onClick={() => {
                playCartAddSound();
                add({ product, quantity: 1 });
              }}
            >
              Add to cart
            </SpecularButton>
          )}
          {isInCart && (
            <button
              className={styles.removeFromCart}
              type="button"
              aria-label={`Remove ${product.name} from cart`}
              onClick={() => {
                playCartRemoveSound();
                remove(product.itemId);
              }}
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
          onClick={e => {
            PixelHearts(e);
            toggle(product);
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}img/${
              isFavorite ? 'Heart.svg' : 'Like.svg'
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
