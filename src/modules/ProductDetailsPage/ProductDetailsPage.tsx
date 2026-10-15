import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetailsById } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import type {
  Product,
  ProductCategory,
  ProductDetails,
} from '../../types/product';
import styles from './ProductDetailsPage.module.scss';
import { PixelHearts } from '../PixelHearts/PixelHearts';

const arrowLeft = 'img/ArrowLeft-disabled.svg';
const arrowRight = 'img/ArrowRight-disabled.svg';
const productImage = 'img/phones/apple-iphone-7/black/00.webp';

const isProductCategory = (
  category: string | undefined,
): category is ProductCategory =>
  category === 'phones' || category === 'tablets' || category === 'accessories';

const getCategoryTitle = (category: ProductCategory) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export const ProductDetailsPage: React.FC = () => {
  const { category: categoryParam, productId } = useParams();
  const { items: cartItems, add, remove } = useCart();
  const { items: favoriteItems, toggle } = useFavorites();
  const [product, setProduct] = useState<ProductDetails>();
  const [loadError, setLoadError] = useState('');
  const category = isProductCategory(categoryParam) ? categoryParam : null;
  const actionProduct: Product | undefined = product
    ? {
        id: product.id,
        itemId: product.id,
        category: product.category,
        name: product.name,
        price: product.priceDiscount,
        oldPrice: product.priceRegular,
        image: product.images[0] ?? '',
        screen: product.screen ?? '',
        capacity: product.capacity,
        ram: product.ram ?? '',
      }
    : undefined;
  const isInCart = Boolean(
    actionProduct &&
    cartItems.some(item => item.product.itemId === actionProduct.itemId),
  );
  const isFavorite = Boolean(
    actionProduct &&
    favoriteItems.some(item => item.itemId === actionProduct.itemId),
  );

  useEffect(() => {
    if (!category || !productId) {
      setLoadError('Product not found');
      return;
    }

    let isActive = true;

    setProduct(undefined);
    setLoadError('');

    getProductDetailsById(category, productId)
      .then(result => {
        if (!isActive) {
          return;
        }

        if (!result) {
          setLoadError('Product not found');
          return;
        }

        setProduct(result);
      })
      .catch((error: unknown) => {
        if (isActive) {
          setLoadError(
            error instanceof Error ? error.message : 'Failed to load product',
          );
        }
      });

    return () => {
      isActive = false;
    };
  }, [category, productId]);

  return (
    <div className={styles.container}>
      {category && (
        <Breadcrumbs
          items={[
            { label: getCategoryTitle(category), to: `/${category}` },
            { label: product?.name ?? productId ?? 'Loading product...' },
          ]}
        />
      )}

      {loadError && (
        <p className={styles.loadError} role="alert">
          {loadError}
        </p>
      )}

      <h1 className={styles.title}>
        {product?.name ??
          (loadError ? 'Product not found' : 'Loading product...')}
      </h1>

      {/* верхній блок */}
      <div className={styles.mainGrid}>
        {/* фотки */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            <button className={`${styles.thumbBtn} ${styles.active}`}>
              <img src={productImage} alt="ФОТКА 1" />
            </button>
            <button className={styles.thumbBtn}>
              <img src={productImage} alt="ФОТКА 2" />
            </button>
            <button className={styles.thumbBtn}>
              <img src={productImage} alt="ФОТКА 3" />
            </button>
            <button className={styles.thumbBtn}>
              <img src={productImage} alt="ФОТКА 4" />
            </button>
            <button className={styles.thumbBtn}>
              <img src={productImage} alt="ФОТКА 5" />
            </button>
          </div>
          <div className={styles.mainImageWrapper}>
            <img
              src={productImage}
              alt="ВЕЛИКАФОТКА"
              className={styles.mainImage}
            />
          </div>
        </div>

        {/* всяка інфа про товар */}
        <div className={styles.options}>
          <div className={styles.headerMeta}>
            <span className={styles.label}>Available colors</span>
            <span className={styles.productId}>ID: 802390</span>
          </div>

          <div className={styles.colorSelector}>
            <button
              className={`${styles.colorCircle} ${styles.active}`}
              style={{ backgroundColor: '#F0E2D0' }}
            />
            <button
              className={styles.colorCircle}
              style={{ backgroundColor: '#53605B' }}
            />
            <button
              className={styles.colorCircle}
              style={{ backgroundColor: '#4C4C4D' }}
            />
            <button
              className={styles.colorCircle}
              style={{ backgroundColor: '#F5F5F0' }}
            />
          </div>

          <div className={styles.capacitySection}>
            <span className={styles.label}>Select capacity</span>
            <div className={styles.capacityList}>
              <button className={`${styles.capacityBtn} ${styles.active}`}>
                64 GB
              </button>
              <button className={styles.capacityBtn}>256 GB</button>
              <button className={styles.capacityBtn}>512 GB</button>
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>$799</span>
            <span className={styles.oldPrice}>$1199</span>
          </div>

          <div className={styles.actions}>
            <div className={styles.cartActions}>
              <button
                className={`${styles.addToCartBtn} ${
                  isInCart ? styles.cartButtonAdded : ''
                }`}
                type="button"
                disabled={!actionProduct || isInCart}
                onClick={() => {
                  if (actionProduct) {
                    add({ product: actionProduct, quantity: 1 });
                  }
                }}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>
              {isInCart && actionProduct && (
                <button
                  className={styles.removeFromCartBtn}
                  type="button"
                  aria-label={`Remove ${actionProduct.name} from cart`}
                  onClick={() => remove(actionProduct.itemId)}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}img/Close.svg`}
                    alt=""
                  />
                </button>
              )}
            </div>
            <button
              className={styles.favoriteBtn}
              type="button"
              disabled={!actionProduct}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              aria-pressed={isFavorite}
              onClick={(e) => {
                PixelHearts(e)
                if (actionProduct) {
                  toggle(actionProduct);
                }
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}img/${
                  isFavorite ? 'Like-active.svg' : 'Like.svg'
                }`}
                alt=""
              />
            </button>
          </div>

          <div className={styles.shortSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>6.5&quot; OLED</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>2688x1242</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>Apple A13 Bionic</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>4 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* нижній блок */}
      <div className={styles.detailsGrid}>
        <section className={styles.aboutSection}>
          <h2>About</h2>
          <hr className={styles.divider} />

          <article className={styles.aboutBlock}>
            <h3>And then there was Pro</h3>
            <p>
              A transformative triple-camera system that adds tons of capability
              without complexity.
            </p>
            <p>
              An unprecedented leap in battery life. And a mind-blowing chip
              that doubles down on machine learning and pushes the boundaries of
              what a smartphone can do. Welcome to the first iPhone powerful
              enough to be called Pro.
            </p>
          </article>

          <article className={styles.aboutBlock}>
            <h3>Camera</h3>
            <p>
              Meet the first triple-camera system to combine cutting-edge
              technology with the legendary simplicity of iPhone. Capture up to
              four times more scene. Get beautiful images in drastically lower
              light. Shoot the highest-quality video in a smartphone — then edit
              with the same tools you love for photos. You&apos;ve never shot
              with anything like it.
            </p>
          </article>

          <article className={styles.aboutBlock}>
            <h3>
              Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
              Love it.
            </h3>
            <p>
              iPhone 11 Pro lets you capture videos that are beautifully true to
              life, with greater detail and smoother motion. Epic processing
              power means it can shoot 4K video with extended dynamic range and
              cinematic video stabilization — all at 60 fps. You get more
              creative control, too, with four times more scene and powerful new
              editing tools to play with.
            </p>
          </article>
        </section>

        <section className={styles.specsSection}>
          <h2>Tech specs</h2>
          <hr className={styles.divider} />

          <div className={styles.fullSpecsList}>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>6.5&quot; OLED</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>2688x1242</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>Apple A13 Bionic</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>4 GB</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Built in memory</span>
              <span className={styles.specValue}>64 GB</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Camera</span>
              <span className={styles.specValue}>
                12 Mp + 12 Mp + 12 Mp (Triple)
              </span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Zoom</span>
              <span className={styles.specValue}>Optical, 2x</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Cell</span>
              <span className={styles.specValue}>GSM, LTE, UMTS</span>
            </div>
          </div>
        </section>
      </div>
      {/*о You may also like */}
      <section className={styles.youMayAlsoLike}>
        <div className={styles.ymalHeader}>
          <h2>You may also like</h2>
          <div className={styles.ymalArrows}>
            <button className={styles.arrowBtn} aria-label="Previous" disabled>
              <img src={arrowLeft} alt="" />
            </button>
            <button className={styles.arrowBtn} aria-label="Next" disabled>
              <img src={arrowRight} alt="" />
            </button>
          </div>
        </div>

        <div className={styles.ymalGrid}>
          {/* голубі квадрати замість card компонента*/}
          <div className={styles.productCardPlaceholder} />
          <div className={styles.productCardPlaceholder} />
          <div className={styles.productCardPlaceholder} />
          <div className={styles.productCardPlaceholder} />
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
