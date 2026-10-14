import React from 'react';
import styles from './Logo.module.scss';

type Prop = {
  variant: 'header' | 'footer';
}

export const Logo: React.FC<Prop> = ({ variant }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.logoGroup} ${styles[`logo-${variant}`]}`}>
        <img className={styles.logoText} src="public/img/logo.svg" alt="nice gadges logo" />
        <img className={styles.logoOk} src="public/img/okSymbol.png" alt="ok Symbol" />
      </div>
    </div>
  );
};

export default Logo;
