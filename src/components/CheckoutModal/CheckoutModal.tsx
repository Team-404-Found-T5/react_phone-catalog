import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutModal.module.scss';
import { playCancelSound, playClick2Sound, playVictorySound } from '../../modules/PixelHearts/sounds';

type Props = {
  isOpen: boolean;
  totalPrice: number;
  totalCount: number;
  onClose: () => void;
  onConfirm: () => void;
};

export const CheckoutModal: React.FC<Props> = ({
  isOpen,
  totalPrice,
  totalCount,
  onClose,
  onConfirm,
}) => {
  const [order, setOrder] = useState({ price: 0, count: 0 });
  const [isDone, setIsDone] = useState(false);

  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      setIsDone(false);
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleMouseDown = (event: MouseEvent) => {
      if (event.target === dialog) {
        onClose();
      }
    };

    dialog.addEventListener('mousedown', handleMouseDown);

    return () => {
      dialog.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  const handleConfirm = () => {
    setOrder({ price: totalPrice, count: totalCount });
    setIsDone(true);
    onConfirm();
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/phones');
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      aria-labelledby="checkout-title"
    >
      <div className={styles.window}>
        <button
          type="button"
          className={styles.close}
          onClick={() => {
            playClick2Sound()
            onClose()}}
          aria-label="Close"
        >
          <img src="public/img/Close.svg" alt="" />
        </button>

        {isDone ? (
          <div className={styles.content}>
            <span className={styles.check} aria-hidden="true">
              ✓
            </span>

            <h2 id="checkout-title" className={styles.title}>
              Thank you for your order!
            </h2>

            <p className={styles.text}>
              {order.count} {order.count === 1 ? 'item' : 'items'} for $
              {order.price}. The cart has been cleared.
            </p>

            <button
              type="button"
              className={styles.primary}
              onClick={handleContinueShopping}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className={styles.content}>
            <h2 id="checkout-title" className={styles.title}>
              Do you confirm your order?
            </h2>

            <p className={styles.text}>
              {totalCount} {totalCount === 1 ? 'item' : 'items'} for $
              {totalPrice}
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => {
                  playCancelSound()
                  onClose()}}
              >
                Cancel
              </button>

              <button
                type="button"
                className={styles.primary}
                onClick={() => {
                  playVictorySound()
                  handleConfirm()}}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default CheckoutModal;
