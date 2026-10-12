import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Loader</h1>
    </div>
  );
};

export default Loader;
