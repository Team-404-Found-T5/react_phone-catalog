export interface Product {
  id: string;
  itemId: string;
  category: string;
  name: string;
  price: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  oldPrice?: number;
  fullPrice?: number;
  year?: number;
  color?: string;
}

export type ProductCategory = 'phones' | 'tablets' | 'accessories';

export interface ProductDescription {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: ProductCategory;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescription[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}
