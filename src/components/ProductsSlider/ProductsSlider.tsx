import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton';

const PRODUCTS_PER_SLIDE = 4;

type Props = {
  title: string;
  products: Product[];
  isLoading?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  isLoading = false,
}) => {
  const productsListRef = useRef<HTMLDivElement>(null);
  const pendingScrolls = useRef(0);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_SLIDE);
  const [canScrollBack, setCanScrollBack] = useState(false);

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_SLIDE);
    pendingScrolls.current = 0;

    if (productsListRef.current) {
      productsListRef.current.scrollLeft = 0;
    }
  }, [products]);

  useEffect(() => {
    const list = productsListRef.current;
    const scrolls = pendingScrolls.current;

    if (!list || scrolls === 0) {
      return;
    }

    pendingScrolls.current = 0;

    const firstCard = list.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const styles = window.getComputedStyle(list);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

    list.scrollBy({
      left: scrolls * PRODUCTS_PER_SLIDE * (cardWidth + gap),
      behavior: 'smooth',
    });
  }, [visibleCount]);

  const updateScrollState = () => {
    const list = productsListRef.current;

    if (list) {
      setCanScrollBack(list.scrollLeft > 0);
    }
  };

  const showNextProducts = () => {
    if (visibleCount >= products.length) {
      return;
    }

    pendingScrolls.current += 1;
    setVisibleCount(current =>
      Math.min(current + PRODUCTS_PER_SLIDE, products.length),
    );
  };

  const showPreviousProducts = () => {
    const list = productsListRef.current;

    if (!list) {
      return;
    }

    const firstCard = list.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const styles = window.getComputedStyle(list);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;

    list.scrollBy({
      left: -PRODUCTS_PER_SLIDE * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            className={styles.prevButton}
            type="button"
            aria-label="Previous products"
            disabled={!canScrollBack}
            onClick={showPreviousProducts}
          >
            <img
              src="img/ArrowLeft-active.svg"
              alt=""
              className={styles.arrowIcon}
            />
          </button>
          <button
            className={styles.nextButton}
            type="button"
            aria-label="Next products"
            disabled={isLoading || visibleCount >= products.length}
            onClick={showNextProducts}
          >
            <img
              src="img/ArrowRight-active.svg"
              alt=""
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>

      <div
        className={styles.productsList}
        ref={productsListRef}
        onScroll={updateScrollState}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <ProductCardSkeleton count={PRODUCTS_PER_SLIDE} />
        ) : (
          products.slice(0, visibleCount).map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsSlider;
