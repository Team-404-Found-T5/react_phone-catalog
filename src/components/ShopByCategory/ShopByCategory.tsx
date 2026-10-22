import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductCategory } from '../../types/product';
import styles from './ShopByCategory.module.scss';
import { playPortalSound } from '../../modules/PixelHearts/sounds';

type Category = {
  id: ProductCategory;
  title: string;
  image: string;
  background: string;
  to: string;
};

const categories: Category[] = [
  {
    id: 'phones',
    title: 'Mobile phones',
    image: 'img/category-phones.webp',
    background: '#6d6474',
    to: '/phones',
  },
  {
    id: 'tablets',
    title: 'Tablets',
    image: 'img/category-tablets.webp',
    background: '#8d8d92',
    to: '/tablets',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: 'img/category-accessories.webp',
    background: '#973d5f',
    to: '/accessories',
  },
];

type Props = {
  categoryCounts: Record<ProductCategory, number>;
};

export const ShopByCategory: React.FC<Props> = ({ categoryCounts }) => {
  const [visibleCategories, setVisibleCategories] = useState<
    Set<ProductCategory>
  >(new Set());
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;

    if (!list || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        setVisibleCategories(current => {
          const next = new Set(current);

          entries.forEach(entry => {
            const category = (entry.target as HTMLElement).dataset.category as
              ProductCategory | undefined;

            if (!category) {
              return;
            }

            if (entry.isIntersecting) {
              next.add(category);
            } else {
              next.delete(category);
            }
          });

          return next;
        });
      },
      { threshold: 0.6 },
    );

    Array.from(list.children).forEach(category => observer.observe(category));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>Shop by category</h2>

      <ul className={styles.list} ref={listRef}>
        {categories.map(category => (
          <li key={category.id} data-category={category.id}>
            <NavLink
              onClick={() => playPortalSound()}
              to={category.to}
              className={`${styles.card} ${
                visibleCategories.has(category.id) ? styles.inView : ''
              }`}
            >
              <div
                className={styles.imageWrapper}
                style={{ backgroundColor: category.background }}
              >
                <img
                  className={styles.image}
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                />
              </div>

              <h3 className={styles.name}>{category.title}</h3>

              <p className={styles.count}>
                {categoryCounts[category.id]} models
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopByCategory;
