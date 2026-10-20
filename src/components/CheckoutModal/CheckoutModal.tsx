import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutModal.module.scss';
import {
  playCancelSound,
  playClick2Sound,
  playVictorySound,
} from '../../modules/PixelHearts/sounds';

type Props = {
  isOpen: boolean;
  totalPrice: number;
  totalCount: number;
  onClose: () => void;
  onConfirm: () => void;
};

type Payment = 'card' | 'cash';
type Delivery = 'delivery' | 'pickup';

const PAYMENT_OPTIONS: { value: Payment; label: string }[] = [
  { value: 'card', label: 'Card' },
  { value: 'cash', label: 'Cash' },
];

const DELIVERY_OPTIONS: { value: Delivery; label: string }[] = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'pickup', label: 'Pickup' },
];

const NAME_REGEX = /^\p{L}+(?:[ '’ʼ-]\p{L}+)*$/u;
const PHONE_DIGITS = 9;

const getNameError = (value: string): string => {
  const name = value.trim();

  if (!name) {
    return 'This field is required';
  }

  if (name.length < 2) {
    return 'Enter at least 2 letters';
  }

  if (name.length > 30) {
    return 'Maximum 30 characters';
  }

  if (!NAME_REGEX.test(name)) {
    return 'Use letters only (spaces, hyphen and apostrophe are allowed)';
  }

  return '';
};

const getPhoneError = (digits: string): string => {
  if (digits.length === PHONE_DIGITS) {
    return '';
  }

  if (digits.length === 0) {
    return `Enter ${PHONE_DIGITS} digits after +380`;
  }

  const left = PHONE_DIGITS - digits.length;

  return `${left} ${left === 1 ? 'digit' : 'digits'} left`;
};

const initialTouched = { firstName: false, lastName: false, phone: false };

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  payment: 'card' as Payment,
  delivery: 'delivery' as Delivery,
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
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(initialTouched);

  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      setIsDone(false);
      setForm(initialForm);
      setTouched(initialTouched);
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

  const update = (patch: Partial<typeof initialForm>) =>
    setForm(prev => ({ ...prev, ...patch }));

  const errors = {
    firstName: getNameError(form.firstName),
    lastName: getNameError(form.lastName),
    phone: getPhoneError(form.phone),
  };

  const isValid = !errors.firstName && !errors.lastName && !errors.phone;

  const touch = (field: keyof typeof initialTouched) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const showError = (field: keyof typeof initialTouched) =>
    touched[field] ? errors[field] : '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setTouched({ firstName: true, lastName: true, phone: true });

      const firstInvalid = event.currentTarget.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );

      firstInvalid?.focus();

      return;
    }

    playVictorySound();
    setOrder({ price: totalPrice, count: totalCount });
    setIsDone(true);
    onConfirm();
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/catalog');
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
            playClick2Sound();
            onClose();
          }}
          aria-label="Close"
        >
          <img src="img/Close.svg" alt="" />
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

            <p className={styles.text}>Our manager will contact you shortly.</p>

            <button
              type="button"
              className={styles.primary}
              onClick={handleContinueShopping}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <h2 id="checkout-title" className={styles.title}>
              Checkout
            </h2>

            <p className={styles.summary}>
              {totalCount} {totalCount === 1 ? 'item' : 'items'} for $
              {totalPrice}
            </p>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="co-first" className={styles.label}>
                  First name
                </label>
                <input
                  id="co-first"
                  className={`${styles.input} ${showError('firstName') ? styles.invalid : ''}`}
                  type="text"
                  autoComplete="given-name"
                  maxLength={30}
                  value={form.firstName}
                  aria-invalid={!!showError('firstName')}
                  aria-describedby="co-first-error"
                  onChange={e => update({ firstName: e.target.value })}
                  onBlur={() => touch('firstName')}
                />
                <p id="co-first-error" className={styles.error}>
                  {showError('firstName')}
                </p>
              </div>

              <div className={styles.field}>
                <label htmlFor="co-last" className={styles.label}>
                  Last name
                </label>
                <input
                  id="co-last"
                  className={`${styles.input} ${showError('lastName') ? styles.invalid : ''}`}
                  type="text"
                  autoComplete="family-name"
                  maxLength={30}
                  value={form.lastName}
                  aria-invalid={!!showError('lastName')}
                  aria-describedby="co-last-error"
                  onChange={e => update({ lastName: e.target.value })}
                  onBlur={() => touch('lastName')}
                />
                <p id="co-last-error" className={styles.error}>
                  {showError('lastName')}
                </p>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="co-phone" className={styles.label}>
                Phone
              </label>

              <div
                className={`${styles.phone} ${showError('phone') ? styles.invalid : ''}`}
              >
                <span className={styles.prefix} aria-hidden="true">
                  +380
                </span>
                <input
                  id="co-phone"
                  className={styles.phoneInput}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={form.phone}
                  aria-invalid={!!showError('phone')}
                  aria-describedby="co-phone-error"
                  onChange={e =>
                    update({
                      phone: e.target.value
                        .replace(/\D/g, '')
                        .slice(0, PHONE_DIGITS),
                    })
                  }
                  onBlur={() => touch('phone')}
                />
              </div>

              <p id="co-phone-error" className={styles.error}>
                {showError('phone')}
              </p>
            </div>

            <fieldset className={styles.group}>
              <legend className={styles.label}>Payment</legend>

              <div className={styles.chips}>
                {PAYMENT_OPTIONS.map(option => (
                  <label key={option.value} className={styles.chip}>
                    <input
                      type="radio"
                      name="payment"
                      value={option.value}
                      checked={form.payment === option.value}
                      onChange={() => update({ payment: option.value })}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.group}>
              <legend className={styles.label}>Receiving</legend>

              <div className={styles.chips}>
                {DELIVERY_OPTIONS.map(option => (
                  <label key={option.value} className={styles.chip}>
                    <input
                      type="radio"
                      name="delivery"
                      value={option.value}
                      checked={form.delivery === option.value}
                      onChange={() => update({ delivery: option.value })}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => {
                  playCancelSound();
                  onClose();
                }}
              >
                Cancel
              </button>

              <button type="submit" className={styles.primary}>
                Confirm
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default CheckoutModal;
