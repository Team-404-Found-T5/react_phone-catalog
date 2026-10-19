import React, { useEffect, useRef } from 'react';
import { developers } from '../../types/developers';
import styles from './ContactsModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ContactsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
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

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      aria-labelledby="contacts-title"
    >
      <div className={styles.window}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <img src="img/Close.svg" alt="" />
        </button>

        <h2 id="contacts-title" className={styles.title}>
          Contacts
        </h2>

        <ul className={styles.list}>
          {developers.map(dev => (
            <li key={dev.id} className={styles.card}>
              <img className={styles.photo} src={dev.photo} alt={dev.name} />

              <h3 className={styles.name}>{dev.name}</h3>
              <p className={styles.role}>{dev.role}</p>

              <div className={styles.links}>
                <a
                  className={styles.link}
                  href={`https://t.me/${dev.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${dev.name} on Telegram`}
                >
                  <img src="img/Telegram.svg" alt="" />
                </a>

                <a
                  className={styles.link}
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${dev.name} on GitHub`}
                >
                  <img src="img/Github.svg" alt="" />
                </a>

                {dev.linkedin && (
                  <a
                    className={styles.link}
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${dev.name} on LinkedIn`}
                  >
                    <img src="img/Linkedin.svg" alt="" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
};

export default ContactsModal;
