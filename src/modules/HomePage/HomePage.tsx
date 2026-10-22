import React, { useMemo } from 'react';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import type { Product } from '../../types/product';
import type { ProductCategory } from '../../types/product';
import { useProducts } from '../../hooks/useProducts';
import styles from './HomePage.module.scss';

const SLIDER_LIMIT = 12;

const TITLE_WORDS = [
  { text: 'Welcome' },
  { text: 'to' },
  { text: '404', accent: true },
  { text: 'Gadgets' },
  { text: 'store!' },
];

const getModelKey = (product: Product): string => {
  const variantStart = product.itemId.search(/-(?:\d+(?:gb|tb)|\d+mm)-/i);
  const modelId =
    variantStart === -1
      ? product.itemId
      : product.itemId.slice(0, variantStart);

  return `${product.category}:${modelId}`;
};

const getUniqueModels = (sortedProducts: Product[]): Product[] => {
  const seenModels = new Set<string>();

  return sortedProducts.filter(product => {
    const modelKey = getModelKey(product);

    if (seenModels.has(modelKey)) {
      return false;
    }

    seenModels.add(modelKey);

    return true;
  });
};

const getIphoneGeneration = (product: Product): number =>
  Number(product.itemId.match(/iphone-(\d+)/)?.[1] ?? 0);

const getModelPriority = (product: Product): number => {
  if (product.itemId.includes('-pro-max-')) {
    return 3;
  }

  if (product.itemId.includes('-pro-')) {
    return 2;
  }

  if (product.itemId.includes('-plus-')) {
    return 1;
  }

  return 0;
};

export const HomePage: React.FC = () => {
  const { products, isLoading, error } = useProducts();

  const brandNewProducts = useMemo(
    () =>
      getUniqueModels(
        [...products].sort(
          (first, second) =>
            (second.year ?? 0) - (first.year ?? 0) ||
            getIphoneGeneration(second) - getIphoneGeneration(first) ||
            getModelPriority(second) - getModelPriority(first),
        ),
      ).slice(0, SLIDER_LIMIT),
    [products],
  );

  const categoryCounts = useMemo(
    () =>
      products.reduce<Record<ProductCategory, number>>(
        (counts, product) => {
          if (product.category in counts) {
            counts[product.category as ProductCategory] += 1;
          }

          return counts;
        },
        { phones: 0, tablets: 0, accessories: 0 },
      ),
    [products],
  );

  const hotPricesProducts = useMemo(
    () =>
      getUniqueModels(
        [...products].sort(
          (first, second) =>
            (second.fullPrice ?? second.price) -
            second.price -
            ((first.fullPrice ?? first.price) - first.price),
        ),
      ).slice(0, SLIDER_LIMIT),
    [products],
  );

  return (
    <>
      <h1 className={styles.title} aria-label="Welcome to 404 Gadgets store!">
        {TITLE_WORDS.map((word, index) => (
          <span
            key={word.text}
            className={`${styles.word} ${word.accent ? styles.accent : ''}`}
            style={{ animationDelay: `${index * 0.12}s` }}
            aria-hidden="true"
          >
            {word.text}
          </span>
        ))}
      </h1>

      <div className={styles.container}>
        <BannerSlider />

        {error && (
          <p role="alert">Failed to load home page products: {error.message}</p>
        )}

        {!error && (
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
            isLoading={isLoading}
          />
        )}

        <ShopByCategory categoryCounts={categoryCounts} />

        {!error && (
          <ProductsSlider
            title="Hot prices"
            products={hotPricesProducts}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
