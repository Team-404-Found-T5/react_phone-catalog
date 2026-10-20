import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Product, ProductCategory } from '../../types/product';
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

export const ShopByCategory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const getCount = (category: ProductCategory) =>
    products.filter(product => product.category === category).length;

  return (
    <div>
      <h2 className={styles.title}>Shop by category</h2>

      <ul className={styles.list}>
        {categories.map(category => (
          <li key={category.id}>
            <NavLink onClick={() => playPortalSound()}to={category.to} className={styles.card}>
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

              {products.length > 0 && (
                <p className={styles.count}>{getCount(category.id)} models</p>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopByCategory;
