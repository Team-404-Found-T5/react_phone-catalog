import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.container} role="status" aria-label="Loading">
      <span className={styles.spinner} aria-hidden="true" />
    </div>
  );
};

export default Loader;
