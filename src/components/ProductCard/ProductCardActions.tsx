import React from 'react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';
import type { Product } from '../../types/product';
import { PixelHearts } from '../../modules/PixelHearts/PixelHearts';
import {
  playCartAddSound,
  playCartRemoveSound,
} from '../../modules/PixelHearts/sounds';
import styles from './ProductCard.module.scss';

type Props = { product: Product };

export const ProductCardActions: React.FC<Props> = ({ product }) => {
  const { items: cartItems, add, remove } = useCart();
  const { items: favoriteItems, toggle } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const isInCart = cartItems.some(
    item => item.product.itemId === product.itemId,
  );
  const isFavorite = favoriteItems.some(item => item.itemId === product.itemId);
  const isCompared = isInCompare(product.id);

  const addToCart = () => {
    playCartAddSound();
    add({ product, quantity: 1 });
  };

  const removeFromCart = () => {
    playCartRemoveSound();
    remove(product.itemId);
  };

  const toggleCompare = () => {
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    PixelHearts(event);
    toggle(product);
  };

  return (
    <div className={styles.actions}>
      <div className={styles.cartActions}>
        <button
          className={`${styles.cartButton} ${
            isInCart ? styles.cartButtonAdded : ''
          }`}
          type="button"
          disabled={isInCart}
          onClick={addToCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        {isInCart && (
          <button
            className={styles.removeFromCart}
            type="button"
            aria-label={`Remove ${product.name} from cart`}
            onClick={removeFromCart}
          >
            <img src={`${import.meta.env.BASE_URL}img/Close.svg`} alt="" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={toggleCompare}
        className={`${styles['compare-btn']} ${
          isCompared ? styles['btn-active'] : ''
        }`}
        aria-label="Add to compare"
      >
        <img
          className={styles.compareIcon}
          src={`${import.meta.env.BASE_URL}img/compareSvg.svg`}
          alt=""
        />
      </button>
      <button
        className={styles.favoriteButton}
        type="button"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isFavorite}
        onClick={toggleFavorite}
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
  );
};
