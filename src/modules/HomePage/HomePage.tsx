import type { Product } from '../../types/product';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { BannerSlider } from '../../components/BannerSlider/BannerSlider';

import styles from './HomePage.module.scss';

const demoProducts: Product[] = [
  {
    id: '1',
    itemId: 'apple-iphone-14-pro-128gb-silver',
    category: 'phones',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    price: 999,
    image: `${import.meta.env.BASE_URL}img/iphone-14-pro-silver.png`,
    screen: '6.1 OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },

  {
    id: '2',
    itemId: 'apple-iphone-14-pro-128gb-deep-purple',
    category: 'phones',
    name: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
    price: 999,
    image: `${import.meta.env.BASE_URL}img/iphone-14-pro-deep-purple.png`,
    screen: '6.1 OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: '3',
    itemId: 'apple-iphone-14-pro-128gb-gold',
    category: 'phones',
    name: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
    price: 999,
    image: `${import.meta.env.BASE_URL}img/iphone-14-pro-gold.png`,
    screen: '6.1 OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: '4',
    itemId: 'apple-iphone-14-plus-128gb-product-red',
    category: 'phones',
    name: 'Apple iPhone 14 Plus 128GB PRODUCT Red(MQ513)',
    price: 859,
    image: `${import.meta.env.BASE_URL}img/iphone-14-plus-product-red.png`,
    screen: '6.7 OLED',
    capacity: '128 GB',
    ram: '6 GB',
  },
];

const hotPricesProducts: Product[] = [
  {
    id: '5',
    itemId: 'apple-iphone-11-pro-max-512gb-midnight-green',
    category: 'phones',
    name: 'Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)',
    price: 849,
    oldPrice: 1199,
    image: `${import.meta.env.BASE_URL}img/iphone-11-pro-max-midnight-green.png`,
    screen: '6.5 OLED',
    capacity: '512 GB',
    ram: '4 GB',
  },

  {
    id: '6',
    itemId: 'apple-iphone-11-pro-max-64gb-gold',
    category: 'phones',
    name: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    price: 799,
    oldPrice: 999,
    image: `${import.meta.env.BASE_URL}img/iphone-11-pro-max-gold.png`,
    screen: '6.5 OLED',
    capacity: '64 GB',
    ram: '4 GB',
  },
  {
    id: '7',
    itemId: 'apple-iphone-11-256gb-purple',
    category: 'phones',
    name: 'Apple iPhone 11 256GB Purple (iMT9G2FS/A)',
    price: 729,
    oldPrice: 859,
    image: `${import.meta.env.BASE_URL}img/iphone-11-purple.png`,
    screen: '6.2 OLED',
    capacity: '256 GB',
    ram: '4 GB',
  },
  {
    id: '8',
    itemId: 'apple-iphone-11-128gb-product-red',
    category: 'phones',
    name: 'Apple iPhone 11 128GB (Product) Red (iMT9G2FS/A)',
    price: 699,
    oldPrice: 899,
    image: `${import.meta.env.BASE_URL}img/iphone-11-product-red.png`,
    screen: '6.2 IPS',
    capacity: '128 GB',
    ram: '4 GB',
  },
];    

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <BannerSlider />

      <section className={styles.section}>
        <ProductsSlider title="Brand new models" products={demoProducts} />
      </section>

      <section className={styles.section}>
        <ShopByCategory />
      </section>

      <section className={styles.section}>
         <ProductsSlider title="Hot prices" products={hotPricesProducts} />
      </section>
   </div>
  );
};

export default HomePage;
