import React from 'react';
import styles from './Logo.module.scss';

type Prop = {
  variant: 'header' | 'footer';
};

export const Logo: React.FC<Prop> = ({ variant }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.logoGroup} ${styles[`logo-${variant}`]}`}>
        <img
          className={styles.logoText}
          src={`${import.meta.env.BASE_URL}img/logo.svg`}
          alt="404 Gadgets"
        />
      </div>
    </div>
  );
};

export default Logo;
