import { Product, ProductDetails, ProductCategory  } from './product';

export type Filter = 'all' | ProductCategory;
export type Mark = 'best' | 'worst';
export type Row = { product: Product; details?: ProductDetails };

export type Param = {
  label: string;
  getValue: (details: ProductDetails) => string | undefined;
  getScore?: (details: ProductDetails) => number | undefined;
  better?: 'higher' | 'lower';
};

export type TableParam = {
  param: Param;
  values: string[];
  marks: Map<string, Mark>;
};
