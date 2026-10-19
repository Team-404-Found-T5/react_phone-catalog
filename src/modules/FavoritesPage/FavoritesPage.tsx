import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';
import FavoritesRain from '../PixelHearts/FavoritesRain';

export const FavoritesPage: React.FC = () => {
  const { items, toggle } = useFavorites();

  const handleClearFavorites = () => {
    items.forEach(item => toggle(item));
  };

  return (
    <div className={styles.container}>
      <FavoritesRain />
      <Breadcrumbs items={[{ label: 'Favorites' }]} />
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{items.length} products</p>

      {items.length > 0 && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClearFavorites}
        >
          Clear all
        </button>
      )}

      {items.length ? (
        <div className={styles.grid}>
          {items.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <img
            className={styles.emptyImage}
            src="img/favourites-is-empty.png"
            alt=""
          />

          <p className={styles.emptyText}>You have no favorite products yet.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
