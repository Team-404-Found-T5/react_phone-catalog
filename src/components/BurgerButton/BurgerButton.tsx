import React from 'react';
import styles from './BurgerButton.module.scss';

export const BurgerButton: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Burger Button</h1>
    </div>
  );
};

export default BurgerButton;
