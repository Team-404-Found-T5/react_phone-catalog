import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchInput.module.scss';
import { Product } from '../../types/product';
import { NavLink, useLocation } from 'react-router-dom';
import { getProducts } from '../../api/products';


export const SearchInput: React.FC = () => {

  const inpsearch = useRef<HTMLInputElement>(null);
  const [searchBy, setSearchBy] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const [dataSearched, SetDataSearched] = useState<Product[]>([]);
  const location = useLocation();
  const delaySearchInp = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchBy('');
    inpsearch.current?.blur();
  }, [location.pathname]);

  useEffect(() => {
    let isCancelled = false;

    if (delaySearchInp.current) {
      clearTimeout(delaySearchInp.current);
    }

    delaySearchInp.current = setTimeout(() => {
      getProducts()
        .then(res => {
          if (isCancelled) return;

          const searchTerm = String(searchBy || '')
            .trim()
            .toLowerCase();

          const numericSearch = Number(searchBy);

          const result = res.filter(product => {
            const matchesName =
              product.name && product.name.toLowerCase().includes(searchTerm);

            const matchesId =
              searchBy !== '' &&
              !isNaN(numericSearch) &&
              Number(product.id) === numericSearch;

            return matchesName || matchesId;
          });

          SetDataSearched(result);
        })
        .catch(err => {
          if (!isCancelled) {
            console.error('Ошибка загрузки:', err);
          }
        });
    }, 100);

    return () => {
      if (delaySearchInp.current) {
        clearTimeout(delaySearchInp.current);
      }

      isCancelled = true;
    };
  }, [searchBy]);

  return (
    <div className={styles.searchGroup}>
      <input
        ref={inpsearch}
        onChange={event => setSearchBy(event.target.value)}
        value={searchBy}
        placeholder="search..."
        className={styles.headeSearchInp}
        type="text"
        onFocus={() => setisFocused(true)}
        onBlur={() => setisFocused(false)}
      />
      <ul className={`${styles.listOfSearches} ${isFocused ? styles.listShow : ''}`} >
        {dataSearched.map(product => (
          <li
            className={styles.searchedItem}
            key={product.id}
          >
            <NavLink className={styles.linkToProduct} to={`/${product.category}/${product.itemId}`} onMouseDown={e => e.preventDefault()}>
              <img
                className={styles.SearchedProductImage}
                src={product.image}
                alt={product.name || ''}
              />
              <p>{product.name}</p>

            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
