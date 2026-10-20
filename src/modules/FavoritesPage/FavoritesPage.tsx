import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { useFavorites } from '../../context/FavoritesContext';
import { usePageLoadingDelay } from '../../hooks/usePageLoadingDelay';
import styles from './FavoritesPage.module.scss';
import FavoritesRain from '../PixelHearts/FavoritesRain';

export const FavoritesPage: React.FC = () => {
  const { items, toggle } = useFavorites();
  const isLoading = usePageLoadingDelay();

  const handleClearFavorites = () => {
    items.forEach(item => toggle(item));
  };

  return (
    <div className={styles.container} aria-busy={isLoading}>
      <FavoritesRain />
      <Breadcrumbs items={[{ label: 'Favorites' }]} />
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{items.length} products</p>

      {!isLoading && items.length > 0 && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClearFavorites}
        >
          Clear all
        </button>
      )}

      {items.length > 0 ? (
        <div className={styles.grid}>
          {isLoading ? (
            <ProductCardSkeleton count={items.length} />
          ) : (
            items.map(product => (
              <ProductCard key={product.itemId} product={product} />
            ))
          )}
        </div>
      ) : isLoading ? null : (
        <div className={styles.empty}>
          <img
            className={styles.emptyImage}
            src="img/favourites-is-empty.webp"
            alt=""
          />

          <p className={styles.emptyText}>You have no favorite products yet.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
