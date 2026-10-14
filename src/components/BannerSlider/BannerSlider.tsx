import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import styles from './BannerSlider.module.scss';

type Banner = {
  id: string;
  image: string;
  alt: string;
  to: string;
};

const banners: Banner[] = [
  {
    id: 'halloween',
    image: 'img/banner-halloween.png',
    alt: 'Halloween sale',
    to: '/phones',
  },
  {
    id: 'phones',
    image: 'img/banner-phones.png',
    alt: 'Phones',
    to: '/phones',
  },
  {
    id: 'tablets',
    image: 'img/banner-tablets.png',
    alt: 'Tablets',
    to: '/tablets',
  },
  {
    id: 'accessories',
    image: 'img/banner-accessories.png',
    alt: 'Accessories',
    to: '/accessories',
  },
];

export const BannerSlider: React.FC = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.main}>
        <button
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
          {banners.map(banner => (
            <SwiperSlide key={banner.id}>
              <NavLink to={banner.to} className={styles.link}>
                <img
                  className={styles.image}
                  src={banner.image}
                  alt={banner.alt}
                />
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
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
