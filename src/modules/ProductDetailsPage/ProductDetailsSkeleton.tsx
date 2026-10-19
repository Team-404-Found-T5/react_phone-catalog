import React from 'react';
import type { ProductCategory } from '../../types/product';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import styles from './ProductDetailsSkeleton.module.scss';

type Props = {
  category: ProductCategory | null;
};

export const ProductDetailsSkeleton: React.FC<Props> = ({ category }) => (
  <div className={styles.container} aria-busy="true" role="status" aria-label="Loading product">
    <div className={styles.header}>
      {category && (
        <Breadcrumbs
          items={[
            {
              label: category.charAt(0).toUpperCase() + category.slice(1),
              to: `/${category}`,
            },
          ]}
        />
      )}
      <BackButton />
      <SkeletonBlock className={styles.title} />
    </div>
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        <SkeletonBlock className={styles.thumbnail} />
        <SkeletonBlock className={styles.thumbnail} />
      </div>
      <div className={styles.mainImageWrapper}>
        <SkeletonBlock className={styles.mainImage} />
      </div>
    </div>
  </div>
);
