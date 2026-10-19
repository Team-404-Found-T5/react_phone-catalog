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
          alt="nice gadges logo"
        /> */}
        <svg className={styles.logoText}>
          <use href={`${import.meta.env.BASE_URL}img/logo.svg`}></use>
        </svg>
        <img
          className={styles.logoOk}
          src={`${import.meta.env.BASE_URL}img/okSymbol.webp`}
          alt="ok Symbol"
        />
      </div>
    </div>
  );
};

export default Logo;
