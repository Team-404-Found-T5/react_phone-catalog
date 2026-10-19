import React from 'react';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import styles from './CartSkeleton.module.scss';

export const CartSkeleton: React.FC = () => (
  <ul className={styles.list} aria-hidden="true">
    {Array.from({ length: 3 }, (_, index) => (
      <li className={styles.item} key={index}>
        <SkeletonBlock className={styles.remove} />
        <SkeletonBlock className={styles.image} />
        <div className={styles.name}>
          <SkeletonBlock className={styles.nameLine} />
          <SkeletonBlock className={styles.nameLineShort} />
        </div>
        <div className={styles.quantity}>
          <SkeletonBlock className={styles.counterButton} />
          <SkeletonBlock className={styles.quantityCount} />
          <SkeletonBlock className={styles.counterButton} />
        </div>
        <SkeletonBlock className={styles.price} />
      </li>
    ))}
  </ul>
);
