import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItem as CartItemData } from '../../types/cart';
import styles from './CartItem.module.scss';
import { playCartRemoveSound, playMinusSound, playPlusSound } from '../../modules/PixelHearts/sounds';

type Props = {
  item: CartItemData;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { remove, updateQuantity } = useCart();
  const { product, quantity } = item;

  const link = `/${product.category}/${product.itemId}`;

  return (
    <article className={styles.item}>
      <button
        type="button"
        className={styles.remove}
        onClick={() => {
          playCartRemoveSound()
          remove(product.itemId)}}
        aria-label={`Remove ${product.name} from cart`}
      >
        <img src="img/Close.svg" alt="" />
      </button>

      <NavLink to={link} className={styles.imageLink}>
        <img
          className={styles.image}
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </NavLink>

      <NavLink to={link} className={styles.name}>
        {product.name}
      </NavLink>

      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.counterButton}
          onClick={() => {
            playMinusSound()
            updateQuantity(product.itemId, quantity - 1)}}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <img src="img/Minus.svg" alt="" />
        </button>

        <span className={styles.count}>{quantity}</span>

        <button
          type="button"
          className={styles.counterButton}
          onClick={() => {
            playPlusSound()
            updateQuantity(product.itemId, quantity + 1)}}
          aria-label="Increase quantity"
        >
          <img src="img/Plus.svg" alt="" />
        </button>
      </div>

      <p className={styles.price}>${product.price * quantity}</p>
    </article>
  );
};

export default CartItem;
