import './styles/main.scss';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <FavoritesProvider>
      <CartProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </CartProvider>
    </FavoritesProvider>
  </HashRouter>,
);
