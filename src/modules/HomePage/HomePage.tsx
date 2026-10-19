import React, { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../api/products';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import type { Product } from '../../types/product';
import styles from './HomePage.module.scss';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    getProducts()
      .then(loadedProducts => {
        if (isActive) {
          setProducts(loadedProducts);
        }
      })
      .catch((loadError: unknown) => {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'Failed to load products',
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const brandNewProducts = useMemo(
    () =>
      getUniqueModels(
        products
          .filter(product => product.category === 'phones')
          .sort(
            (first, second) =>
              (second.year ?? 0) - (first.year ?? 0) ||
              getIphoneGeneration(second) - getIphoneGeneration(first) ||
              getModelPriority(second) - getModelPriority(first),
          ),
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
      ),
    [products],
  );

  return (
    <>
      <h1 className={styles.title}>
        Welcome to <span className={styles.accent}>404</span> Gadgets store!
      </h1>
      <div className={styles.container}>
        <BannerSlider />

        {isLoading && <Loader />}

        {error && (
          <p role="alert">Failed to load home page products: {error}</p>
        )}

        {!isLoading && !error && (
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        )}

        <ShopByCategory />

        {!isLoading && !error && (
          <ProductsSlider title="Hot prices" products={hotPricesProducts} />
        )}
      </div>
    </>
  );
};

export default HomePage;
