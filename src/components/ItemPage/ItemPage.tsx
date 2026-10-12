import React from 'react';
import styles from './ItemPage.module.scss';

import homeIcon from '../../svgs/Home.svg';
import arrowLeft from '../../svgs/ArrowLeft.svg';
import arrowRight from '../../svgs/ArrowRight.svg';
import Like from '../../svgs/Like.svg';

export const ItemPage = () => {
  return (
    <div className={styles.container}>

      <nav className={styles.breadcrumbs}>

        <a href="/" className={styles.homeIcon}>
          <img src={homeIcon} alt="Home" />
        </a>

        <span className={styles.arrow}><img src={arrowRight} alt="prev" /></span>
        <a href="/phones">Phones</a>
        <span className={styles.arrow}><img src={arrowRight} alt="prev" /></span>
        <span className={styles.current}>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</span>
      </nav>

      <button className={styles.backButton}>
        <img src={arrowLeft} alt="prev" /> Back
      </button>

      <h1 className={styles.title}>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</h1>

      {/* верхній блок */}
      <div className={styles.mainGrid}>
        {/* фртки */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            <button className={`${styles.thumbBtn} ${styles.active}`}>
              <img src="/img/thumb1.png" alt="ФОТКА 1" />
            </button>
            <button className={styles.thumbBtn}>
              <img src="/img/thumb2.png" alt="ФОТКА 2" />
            </button>
            <button className={styles.thumbBtn}>
              <img src="/img/thumb3.png" alt="ФОТКА 3" />
            </button>
            <button className={styles.thumbBtn}>
              <img src="/img/thumb4.png" alt="ФОТКА 4" />
            </button>
            <button className={styles.thumbBtn}>
              <img src="/img/thumb5.png" alt="ФОТКА 5" />
            </button>
          </div>
          <div className={styles.mainImageWrapper}>
            <img src="/img/main-phone.png" alt="ВЕЛИКАФОТКА" className={styles.mainImage} />
          </div>
        </div>

        {/* всяка інфа про товар */}
        <div className={styles.options}>
          <div className={styles.headerMeta}>
            <span className={styles.label}>Available colors</span>
            <span className={styles.productId}>ID: 802390</span>
          </div>

          <div className={styles.colorSelector}>
            <button className={`${styles.colorCircle} ${styles.active}`} style={{ backgroundColor: '#F0E2D0' }} />
            <button className={styles.colorCircle} style={{ backgroundColor: '#53605B' }} />
            <button className={styles.colorCircle} style={{ backgroundColor: '#4C4C4D' }} />
            <button className={styles.colorCircle} style={{ backgroundColor: '#F5F5F0' }} />
          </div>

          <div className={styles.capacitySection}>
            <span className={styles.label}>Select capacity</span>
            <div className={styles.capacityList}>
              <button className={`${styles.capacityBtn} ${styles.active}`}>64 GB</button>
              <button className={styles.capacityBtn}>256 GB</button>
              <button className={styles.capacityBtn}>512 GB</button>
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>$799</span>
            <span className={styles.oldPrice}>$1199</span>
          </div>

          <div className={styles.actions}>
            <button className={styles.addToCartBtn}>Add to cart</button>
            <button className={styles.favoriteBtn} aria-label="Add to favorites">
              <img src={Like} alt="favorite" />
            </button>
          </div>

          <div className={styles.shortSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>6.5" OLED</span>
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
            <p>A transformative triple-camera system that adds tons of capability without complexity.</p>
            <p>An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.</p>
          </article>

          <article className={styles.aboutBlock}>
            <h3>Camera</h3>
            <p>Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You've never shot with anything like it.</p>
          </article>

          <article className={styles.aboutBlock}>
            <h3>Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.</h3>
            <p>iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.</p>
          </article>
        </section>

        <section className={styles.specsSection}>
          <h2>Tech specs</h2>
          <hr className={styles.divider} />

          <div className={styles.fullSpecsList}>
            <div className={styles.fullSpecRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>6.5" OLED</span>
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
              <span className={styles.specValue}>12 Mp + 12 Mp + 12 Mp (Triple)</span>
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
            <button className={styles.arrowBtn} aria-label="Previous">
              <img src={arrowLeft} alt="prev" />
            </button>
            <button className={styles.arrowBtn} aria-label="Next">
              <img src={arrowRight} alt="prev" />
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
}
