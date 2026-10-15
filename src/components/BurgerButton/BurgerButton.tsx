import React from 'react';
import styles from './BurgerButton.module.scss';
interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerButton: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <div className={styles.container}>
      <button className={`${styles.burgerButton} ${isOpen ? styles.isOpen : ''}`} onClick={onClick}>
        <div className={`${styles.burgerLine} ${styles.firstLine}`}></div>
        <div className={`${styles.burgerLine} ${styles.secondLine}`}></div>
        <div className={`${styles.burgerLine} ${styles.thirdLine}`}></div>
      </button>
    </div>
  );
};

export default BurgerButton;
