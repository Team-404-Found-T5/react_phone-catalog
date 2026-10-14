import React from 'react';
import styles from './Logo.module.scss';

type Prop = {
  logoWidth: number;
}

export const Logo: React.FC<Prop> = ({ logoWidth }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoGroup} style={{'--logo-width': `${logoWidth}px`} as React.CSSProperties & Record<string, string>}>
        <img className={styles.logoText} src="public/img/logo.svg" alt="nice gadges logo" />
        <img className={styles.logoOk} src="public/img/okSymbol.png" alt="ok Symbol" />
      </div>
    </div>
  );
};

export default Logo;
