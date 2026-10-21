import { useEffect } from 'react';
import './App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import { preloadProductData } from './api/products';
import { MainLayout } from './modules/shared/MainLayout';
import { CartPage } from './modules/CartPage';
import { CatalogPage } from './modules/CatalogPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { HomePage } from './modules/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { TestPage } from './modules/TestPage';
import { ComparePage } from './modules/ComparePage';
import Radio from './modules/Radio/Radio';

export const App = () => {
  useEffect(() => {
    preloadProductData().catch((error: unknown) => {
      console.error('Failed to preload product data:', error);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path=":category" element={<CatalogPage />} />
          <Route path=":category/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="test" element={<TestPage />} />
          <Route path="compare" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Radio />
    </>
  );
};
