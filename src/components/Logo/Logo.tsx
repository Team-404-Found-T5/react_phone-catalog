import React from 'react';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Logo</h1>
    </div>
  );
};

export default Logo;
