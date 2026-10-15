import React, { useEffect, useRef } from 'react';
import styles from './RightsModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const RightsModal: React.FC<Props> = ({ isOpen, onClose }) => {
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

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      aria-labelledby="rights-title"
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

        <h2 id="rights-title" className={styles.title}>
          Rights
        </h2>

        <div className={styles.content}>
          <p className={styles.text}>
            Nice Gadgets is an educational project created by Team 404 Found
            as part of the Mate academy course. It is not a real store: no
            orders are processed and no payments are accepted.
          </p>

          <p className={styles.text}>
            All brand names, logos and product images belong to their
            respective owners and are used for demonstration purposes only.
          </p>

          <p className={styles.text}>
            The source code of this project is available on GitHub.
          </p>

          <p className={styles.copyright}>
            © 2026 Team 404 Found. All rights reserved.
          </p>
        </div>
      </div>
    </dialog>
  );
};

export default RightsModal;
