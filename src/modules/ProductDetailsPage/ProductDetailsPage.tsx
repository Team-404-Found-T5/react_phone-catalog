import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductDetailsById,
  getRelatedProducts,
  getAvailableColors,
  findProductVariant,
  getAvailableCapacities,
  getProductByItemId,
  getSuggestedProducts,
} from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import type {
  Product,
  ProductCategory,
  ProductDetails,
} from '../../types/product';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';
import { PixelHearts } from '../PixelHearts/PixelHearts';

const colorMap: Record<string, string> = {
  black: '#313237',
  white: '#FFFFFF',
  gold: '#F0E2D0',
  yellow: '#FFE681',
  green: '#AEE1CD',
  midnightgreen: '#53605B',
  silver: '#F5F5F0',
  spacegray: '#4C4C4D',
  red: '#D32132',
  purple: '#D1CDDA',
  coral: '#FF6E5A',
  rosegold: '#E6C7C2',
  'rose gold': '#E6C7C2',
  midnight: '#171E27',
  spaceblack: '#3B3B3C',
  blue: '#6C9BC2',
  pink: '#FADDD7',
  sierrablue: '#A7C1D9',
  graphite: '#5C5B57',
  'space-gray': '#4C4C4D',
  'space gray': '#4C4C4D',
  'sky blue': '#B8C9DC',
  starlight: '#F4E8CE',
};

const isProductCategory = (
  category: string | undefined,
): category is ProductCategory =>
  category === 'phones' || category === 'tablets' || category === 'accessories';

const getCategoryTitle = (category: ProductCategory) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export const ProductDetailsPage: React.FC = () => {
  const { category: categoryParam, productId } = useParams();
  const navigate = useNavigate();
  const { items: cartItems, add, remove } = useCart();
  const { items: favoriteItems, toggle } = useFavorites();
  const [product, setProduct] = useState<ProductDetails>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [loadError, setLoadError] = useState('');
  const [displayId, setDisplayId] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
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

  const availableColors = getAvailableColors(variants);
  const availableCapacities = getAvailableCapacities(variants);

  useEffect(() => {
    if (!category || !productId) {
      setLoadError('Product not found');
      return;
    }

    let isActive = true;

    setProduct(undefined);
    setDisplayId('');
    setSelectedImageIndex(0);
    setVariants([]);
    setSuggestedProducts([]);
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

        return Promise.all([
          getRelatedProducts(result),
          getProductByItemId(result.id),
          getSuggestedProducts(result.id).catch(() => []),
        ]).then(([relatedVariants, catalogProduct, suggestions]) => {
          if (isActive) {
            setVariants(relatedVariants);
            setDisplayId(catalogProduct ? String(catalogProduct.id) : '');
            setSuggestedProducts(suggestions);
          }
        });
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
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product?.images.map((image, index) => {
              return (
                <button
                  key={image}
                  className={styles.thumbBtn}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={image} alt={product?.name}></img>
                </button>
              );
            })}
          </div>
          <div className={styles.mainImageWrapper}>
            <img
              src={product?.images[selectedImageIndex]}
              alt={product?.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        {/* всяка інфа про товар */}
        <div className={styles.options}>
          <div className={styles.headerMeta}>
            <span className={styles.label}>Available colors</span>
            <span className={styles.productId}>ID: {displayId}</span>
          </div>

          <div className={styles.colorSelector}>
            {availableColors.map(color => {
              return (
                <button
                  key={color}
                  className={styles.colorCircle}
                  aria-label={color}
                  style={{ backgroundColor: colorMap[color] }}
                  onClick={() => {
                    if (!product) {
                      return;
                    }
                    const nextVariant = findProductVariant(variants, product, {
                      color,
                    });
                    if (nextVariant) {
                      navigate(`/${nextVariant.category}/${nextVariant.id}`);
                    }
                  }}
                />
              );
            })}
          </div>

          <div className={styles.capacitySection}>
            <span className={styles.label}>Select capacity</span>
            <div className={styles.capacityList}>
              {availableCapacities.map(capacity => {
                return (
                  <button
                    key={capacity}
                    className={styles.capacityBtn}
                    aria-label={capacity}
                    onClick={() => {
                      if (!product) {
                        return;
                      }
                      const nextVariant = findProductVariant(
                        variants,
                        product,
                        {
                          capacity,
                        },
                      );
                      if (nextVariant) {
                        navigate(`/${nextVariant.category}/${nextVariant.id}`);
                      }
                    }}
                  >
                    {capacity}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>
              ${product?.priceDiscount}
            </span>
            <span className={styles.oldPrice}>${product?.priceRegular}</span>
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
              <span className={styles.specValue}>{product?.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>{product?.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>{product?.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{product?.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <section className={styles.aboutSection}>
          <h2>About</h2>
          <hr className={styles.divider} />
          {product?.description.map(block => {
            return (
              <article key={block.title} className={styles.aboutBlock}>
                <h3>{block.title}</h3>
                {block.text.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </article>
            );
          })}
        </section>

        <section className={styles.specsSection}>
          <h2>Tech specs</h2>
          <hr className={styles.divider} />

          <div className={styles.fullSpecsList}>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>{product?.screen}</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>{product?.resolution}</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>{product?.processor}</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{product?.ram}</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Built in memory</span>
              <span className={styles.specValue}>{product?.capacity}</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Camera</span>
              <span className={styles.specValue}>{product?.camera}</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Zoom</span>
              <span className={styles.specValue}>{product?.zoom}</span>
            </div>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Cell</span>
              <span className={styles.specValue}>{product?.cell}</span>
            </div>
          </div>
        </section>
      </div>
      {/*о You may also like */}
      {suggestedProducts.length > 0 && (
        <section className={styles.youMayAlsoLike}>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
