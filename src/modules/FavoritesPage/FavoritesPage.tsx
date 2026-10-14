import React from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './FavoritesPage.module.scss';
import FavoritesRain from '../PixelHearts/FavoritesRain';

export const FavoritesPage: React.FC = () => {
  const { items } = useFavorites();

  return (
    <div className={styles.container}>
      <FavoritesRain />
      <Breadcrumbs items={[{ label: 'Favorites' }]} />
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{items.length} products</p>

      {items.length ? (
        <div className={styles.grid}>
          {items.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>You have no favorite products yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
