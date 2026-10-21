import { useMemo, useState } from 'react';
import styles from './CompareTable.module.scss';
import { Mark, Param, Row, TableParam } from '../../types/compare';

const EMPTY = '—';

const parseStorage = (value?: string): number | undefined => {
  const match = value?.match(/^([\d.]+)\s*(TB|GB|MB)$/i);

  if (!match) {
    return undefined;
  }

  const units = { MB: 1, GB: 1024, TB: 1024 * 1024 } as const;
  const unit = match[2].toUpperCase() as keyof typeof units;

  return Number(match[1]) * units[unit];
};

const parseResolution = (value?: string): number | undefined => {
  const match = value?.match(/(\d+)\s*x\s*(\d+)/i);

  return match ? Number(match[1]) * Number(match[2]) : undefined;
};

const parseCamera = (value?: string): number | undefined => {
  const numbers = value?.match(/\d+(?:\.\d+)?/g);

  return numbers
    ? numbers.reduce((sum, num) => sum + Number(num), 0)
    : undefined;
};

const parseZoom = (value?: string): number | undefined => {
  const match = value?.match(/(\d+(?:\.\d+)?)\s*x/i);

  return match ? Number(match[1]) : undefined;
};

const PARAMS: Param[] = [
  {
    label: 'Price',
    getValue: d => `$${d.priceDiscount}`,
    getScore: d => d.priceDiscount,
    better: 'lower',
  },
  {
    label: 'Capacity',
    getValue: d => d.capacity,
    getScore: d => parseStorage(d.capacity),
    better: 'higher',
  },
  { label: 'Color', getValue: d => d.color },
  { label: 'Screen', getValue: d => d.screen },
  {
    label: 'Resolution',
    getValue: d => d.resolution,
    getScore: d => parseResolution(d.resolution),
    better: 'higher',
  },
  { label: 'Processor', getValue: d => d.processor },
  {
    label: 'RAM',
    getValue: d => d.ram,
    getScore: d => parseStorage(d.ram),
    better: 'higher',
  },
  {
    label: 'Camera',
    getValue: d => d.camera,
    getScore: d => parseCamera(d.camera),
    better: 'higher',
  },
  {
    label: 'Zoom',
    getValue: d => d.zoom,
    getScore: d => parseZoom(d.zoom),
    better: 'higher',
  },
  { label: 'Cell', getValue: d => d.cell?.join(', ') },
];

const getMarks = (param: Param, rows: Row[]): Map<string, Mark> => {
  const marks = new Map<string, Mark>();
  const { getScore, better } = param;

  if (!getScore || !better) {
    return marks;
  }

  const scored = rows.flatMap(({ product, details }) => {
    const score = details ? getScore(details) : undefined;

    return score === undefined ? [] : [{ id: product.itemId, score }];
  });

  if (scored.length < 2) {
    return marks;
  }

  const scores = scored.map(item => item.score);
  const max = Math.max(...scores);
  const min = Math.min(...scores);

  if (max === min) {
    return marks;
  }

  const bestScore = better === 'higher' ? max : min;
  const worstScore = better === 'higher' ? min : max;

  scored.forEach(({ id, score }) => {
    if (score === bestScore) {
      marks.set(id, 'best');
    } else if (score === worstScore) {
      marks.set(id, 'worst');
    }
  });

  return marks;
};

const DescriptionRow = ({ rows }: { rows: Row[] }) => {
  const [open, setOpen] = useState(false);

  const hasDescription = rows.some(
    ({ details }) => details && details.description.length > 0,
  );

  if (!hasDescription) {
    return null;
  }

  return (
    <tr>
      <th scope="row" className={styles.labelCell}>
        Description
        <button
          type="button"
          className={styles.moreBtn}
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? 'Show less' : 'Show more'}
        </button>
      </th>

      {rows.map(({ product, details }) => (
        <td
          key={product.itemId}
          className={`${styles.valueCell} ${styles.descriptionCell}`}
        >
          <p className={open ? '' : styles.descriptionClamp}>
            {details
              ? details.description.flatMap(section => section.text).join(' ')
              : EMPTY}
          </p>
        </td>
      ))}
    </tr>
  );
};

type Props = {
  rows: Row[];
  onlyDifferences: boolean;
  onRemove: (productId: string) => void;
};

export const CompareTable = ({ rows, onlyDifferences, onRemove }: Props) => {
  const tableParams: TableParam[] = useMemo(
    () =>
      PARAMS.map(param => ({
        param,
        values: rows.map(
          ({ details }) =>
            (details ? param.getValue(details) : undefined) ?? EMPTY,
        ),
        marks: getMarks(param, rows),
      }))
        .filter(({ values }) => values.some(value => value !== EMPTY))
        .filter(({ values }) => !onlyDifferences || new Set(values).size > 1),
    [rows, onlyDifferences],
  );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.labelCell} />
            {rows.map(({ product }) => (
              <th key={product.itemId} className={styles.productCell}>
                <button
                  type="button"
                  className={styles.removeBtn}
                  aria-label={`Remove ${product.name} from comparison`}
                  onClick={() => onRemove(product.id)}
                >
                  ×
                </button>
                <img
                  className={styles.prodImage}
                  src={product.image}
                  alt={product.name}
                />
                <h3 className={styles.productName}>{product.name}</h3>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {tableParams.map(({ param, values, marks }) => (
            <tr key={param.label}>
              <th scope="row" className={styles.labelCell}>
                {param.label}
              </th>
              {rows.map(({ product }, index) => {
                const mark = marks.get(product.itemId);

                return (
                  <td
                    key={product.itemId}
                    className={`${styles.valueCell} ${
                      mark ? styles[mark] : ''
                    }`}
                  >
                    {values[index]}
                  </td>
                );
              })}
            </tr>
          ))}

          {tableParams.length === 0 && (
            <tr>
              <td className={styles.valueCell} colSpan={rows.length + 1}>
                All parameters are identical
              </td>
            </tr>
          )}

          <DescriptionRow rows={rows} />
        </tbody>
      </table>
    </div>
  );
};
