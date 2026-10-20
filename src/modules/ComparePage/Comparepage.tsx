import styles from './Comparepage.module.scss';
import { BackButton } from '../../components/BackButton';
import { ProductCard } from '../../components/ProductCard';
import { ClearAllbtn } from '../../components/ClearAllbtn';
import { useCompare } from '../../context/CompareContext';
import { useRef } from 'react';

export const ComparePage = () => {
  const { comparedProducts, clearCompare } = useCompare();
  const listRef = useRef<HTMLUListElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLUListElement>) => {
    if (listRef.current) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        listRef.current.scrollLeft += e.deltaY * 0.6;
      }
    }
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Compare</h1>

      {comparedProducts.length > 0 && (
        <ClearAllbtn
          className={styles.clearBtn}
          onClear={clearCompare}
        />
      )}

      {comparedProducts.length === 0 ? (
        <p className={styles.empty}>Your comparison list is empty</p>
      ) : (
        <ul
          ref={listRef}
          onWheel={handleWheel}
          className={styles.productsCompareList}
        >
          {comparedProducts.map(prod => (
            <li key={prod.id} className={styles.productItem}>
              <ProductCard product={prod} compare={true} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
