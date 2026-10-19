import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import styles from './BannerSlider.module.scss';

type Banner = {
  id: string;
  image: string;
  mobileImage: string;
  alt: string;
  to: string;
  showUntil?: Date;
};

const banners: Banner[] = [
  {
    id: 'halloween',
    image: 'img/banner-halloween.webp',
    mobileImage: 'img/banner-halloween-square.webp',
    alt: 'Halloween sale',
    to: '/catalog',
    showUntil: new Date(2026, 9, 31, 23, 59, 59),
  },
  {
    id: 'iphone18pro',
    image: 'img/banner-iphone18pro.webp',
    mobileImage: 'img/banner-iphone18pro-square.webp',
    alt: 'iPhone 18 Pro',
    to: '/phones/apple-iphone-18-pro-256gb-burgundy',
  },
  {
    id: 'phones',
    image: 'img/banner-phones.webp',
    mobileImage: 'img/banner-phones-square.webp',
    alt: 'Phones',
    to: '/phones',
  },
  {
    id: 'tablets',
    image: 'img/banner-tablets.webp',
    mobileImage: 'img/banner-tablets-square.webp',
    alt: 'Tablets',
    to: '/tablets',
  },
  {
    id: 'accessories',
    image: 'img/banner-accessories.webp',
    mobileImage: 'img/banner-accessories-square.webp',
    alt: 'Accessories',
    to: '/accessories',
  },
];

export const BannerSlider: React.FC = () => {
  const currentDate = new Date();
  const activeBanners = banners.filter(
    banner => !banner.showUntil || banner.showUntil >= currentDate,
  );

  return (
    <section className={styles.banner}>
      <div className={styles.main}>
        <button
          onClick={e => {
            e.stopPropagation();
          }}
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="Previous banner"
        >
          <img src="img/ArrowLeft-active.svg" alt="" />
        </button>

        <Swiper
          className={styles.swiper}
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          speed={700}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          pagination={{
            el: `.${styles.dashes}`,
            clickable: true,
            bulletClass: styles.dash,
            bulletActiveClass: styles.dashActive,
          }}
        >
          {activeBanners.map(banner => (
            <SwiperSlide key={banner.id}>
              <NavLink to={banner.to} className={styles.link}>
                <picture>
                  <source
                    media="(max-width: 639px)"
                    srcSet={banner.mobileImage}
                  />
                  <img
                    className={styles.image}
                    src={banner.image}
                    alt={banner.alt}
                    loading={banner.id === activeBanners[0]?.id ? 'eager' : 'lazy'}
                  />
                </picture>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={e => {
            e.stopPropagation();
          }}
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          aria-label="Next banner"
        >
          <img src="img/ArrowRight-active.svg" alt="" />
        </button>
      </div>

      <div className={styles.dashes} />
    </section>
  );
};

export default BannerSlider;
