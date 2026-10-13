import type { Product } from '../../types/product';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
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

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <ProductsSlider title="Brand new models" products={demoProducts} />
    </div>
  );
};

export default HomePage;
