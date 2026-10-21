import { useEffect, useMemo, useState } from 'react';
import styles from './Comparepage.module.scss';
import { BackButton } from '../../components/BackButton';
import { ClearAllbtn } from '../../components/ClearAllbtn';
import { CompareFilters } from '../../components/CompareFilters';
import { CompareTable } from '../../components/CompareTable';
import { getProductDetailsById } from '../../api/products';
import { MAX_COMPARE, useCompare } from '../../context/CompareContext';
import { ProductCategory, ProductDetails } from '../../types/product';
import { Filter, Row } from '../../types/compare';

export const ComparePage = () => {
  const { comparedProducts, clearCompare, removeFromCompare } = useCompare();

  const [detailsMap, setDetailsMap] = useState<
    Record<string, ProductDetails | undefined>
  >({});
  const [filter, setFilter] = useState<Filter>('all');
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const missing = comparedProducts.filter(
      product => !(product.itemId in detailsMap),
    );

    if (missing.length === 0) {
      setLoading(false);

      return;
    }

    let cancelled = false;

    setLoading(true);
    setError('');

    Promise.all(
      missing.map(
        async product =>
          [
            product.itemId,
            await getProductDetailsById(
              product.category as ProductCategory,
              product.itemId,
              true,
            ),
          ] as const,
      ),
    )
      .then(entries => {
        if (!cancelled) {
          setDetailsMap(prev => ({ ...prev, ...Object.fromEntries(entries) }));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to load comparison data');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [comparedProducts, detailsMap]);

  const counts: Record<Filter, number> = useMemo(
    () => ({
      all: comparedProducts.length,
      phones: comparedProducts.filter(p => p.category === 'phones').length,
      tablets: comparedProducts.filter(p => p.category === 'tablets').length,
      accessories: comparedProducts.filter(p => p.category === 'accessories')
        .length,
    }),
    [comparedProducts],
  );

  useEffect(() => {
    if (filter !== 'all' && counts[filter] === 0) {
      setFilter('all');
    }
  }, [counts, filter]);

  const visibleRows: Row[] = useMemo(
    () =>
      comparedProducts
        .filter(product => filter === 'all' || product.category === filter)
        .map(product => ({ product, details: detailsMap[product.itemId] })),
    [comparedProducts, detailsMap, filter],
  );

  const isEmpty = comparedProducts.length === 0;
  const showTable = !loading && !error && visibleRows.length > 0;

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Compare</h1>

      {isEmpty && <p className={styles.empty}>Your comparison list is empty</p>}

      {!isEmpty && (
        <>
          <ClearAllbtn className={styles.clearBtn} onClear={clearCompare} />

          <p className={styles.hint}>
            {comparedProducts.length} of {MAX_COMPARE} products ·{' '}
            <span className={styles.legendBest}>best</span> /{' '}
            <span className={styles.legendWorst}>worst</span> values are
            highlighted
          </p>

          <CompareFilters
            filter={filter}
            counts={counts}
            onlyDifferences={onlyDifferences}
            canCompareDifferences={visibleRows.length > 1}
            onFilterChange={setFilter}
            onDifferencesChange={setOnlyDifferences}
          />
        </>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {showTable && (
        <CompareTable
          rows={visibleRows}
          onlyDifferences={onlyDifferences}
          onRemove={removeFromCompare}
        />
      )}
    </div>
  );
};
