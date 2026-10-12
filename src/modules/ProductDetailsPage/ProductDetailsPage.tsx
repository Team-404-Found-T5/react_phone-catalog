import React, { useEffect, useState } from 'react';
import { getProductByItemId } from '../../api/products';
import { Product } from '../../types/product';
import { useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!productId) {
      return;
    }

    getProductByItemId(productId).then(setProduct);
  }, [productId]);

  return (
    <div className={styles.container}>
      {product ? <h1>{product.name}</h1> : <p>Loading...</p>}
    </div>
  );
};

export default ProductDetailsPage;
