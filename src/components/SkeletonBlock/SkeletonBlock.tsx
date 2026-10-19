import React from 'react';
import styles from './SkeletonBlock.module.scss';

type Props = {
  className?: string;
};

export const SkeletonBlock: React.FC<Props> = ({ className }) => (
  <span
    aria-hidden="true"
    className={`${styles.block} ${className ?? ''}`}
  />
);
