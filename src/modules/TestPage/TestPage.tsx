import React, { useEffect, useState } from 'react';
import {
  cacheVisibleProducts,
  getProductByItemId,
  getProducts,
  getProductsPage,
} from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { Product } from '../../types/product';
import styles from './TestPage.module.scss';

export const TestPage: React.FC = () => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [cachedProduct, setCachedProduct] = useState<Product>();
  const [fallbackProduct, setFallbackProduct] = useState<Product>();
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoadingPage(true);

    getProductsPage('phones', currentPage, 8)
      .then(({ products, totalPages: pages }) => {
        setVisibleProducts(products);
        setTotalPages(pages);
      })
      .catch(() => {
        setError('Failed to load products page');
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  }, [currentPage]);

  useEffect(() => {
    getProducts()
      .then(products => {
        const productsOnPage = products.slice(0, 8);

        cacheVisibleProducts(productsOnPage);
        setVisibleProducts(productsOnPage);

        return Promise.all([
          getProductByItemId(productsOnPage[0].itemId),
          getProductByItemId(products[8].itemId),
        ]);
      })
      .then(([productFromCache, productFromServer]) => {
        setCachedProduct(productFromCache);
        setFallbackProduct(productFromServer);
      })
      .catch(() => {
        setError('Failed to load products');
      });
  }, []);

  return (
    <section className={styles.container}>
      <Breadcrumbs items={[{ label: 'Test' }]} />
      <h1>TestPage</h1>
      <h2>1. Visible products and cache</h2>
      <p>
        Eight phones are displayed per page and saved to the page cache.
        {' Page '}
        {currentPage} of {totalPages || '...'}.
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.list}>
        {visibleProducts.map(product => (
          <li key={product.itemId}>{`${product.id}. ${product.name}`}</li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        disabled={isLoadingPage}
      />

      <h2>2. Product lookup</h2>
      <p>Cached product: {cachedProduct?.name || 'Loading...'}</p>
      <p>Product outside the cache: {fallbackProduct?.name || 'Loading...'}</p>
    </section>
  );
};

export default TestPage;
