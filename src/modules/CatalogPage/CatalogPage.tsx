import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsPage } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductCard } from '../../components/ProductCard';
import { NotFoundPage } from '../NotFoundPage';
import type { Product, ProductCategory } from '../../types/product';
import styles from './CatalogPage.module.scss';

const categories: Record<ProductCategory, { title: string; plural: string }> = {
  phones: { title: 'Phones', plural: 'phones' },
  tablets: { title: 'Tablets', plural: 'tablets' },
  accessories: { title: 'Accessories', plural: 'accessories' },
};

const isProductCategory = (
  category: string | undefined,
): category is ProductCategory =>
  category === 'phones' || category === 'tablets' || category === 'accessories';

const PRODUCTS_PER_PAGE = 16;

export const CatalogPage: React.FC = () => {
  const { category: categoryParam } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const category = isProductCategory(categoryParam) ? categoryParam : null;

  useEffect(() => {
    if (!category) {
      return;
    }

    let isActive = true;

    setIsLoading(true);
    setError('');

    setProducts([]);

    getProductsPage(category, currentPage, PRODUCTS_PER_PAGE)
      .then(({ products: pageProducts, total, totalPages: pages }) => {
        if (isActive) {
          setProducts(pageProducts);
          setTotalProducts(total);
          setTotalPages(pages);
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
  }, [category, currentPage]);

  if (!category) {
    return <NotFoundPage />;
  }

  const { title, plural } = categories[category];

  return (
    <section className={styles.container}>
      <Breadcrumbs items={[{ label: title }]} />

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>
        {isLoading ? 'Loading products...' : `${totalProducts} ${plural}`}
      </p>

      {isLoading && <Loader />}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {!error && !isLoading && products.length === 0 && (
        <p className={styles.empty}>There are no products in this category.</p>
      )}

      <div className={styles.grid} aria-busy={isLoading}>
        {products.map(product => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        disabled={isLoading}
      />
    </section>
  );
};

export default CatalogPage;
