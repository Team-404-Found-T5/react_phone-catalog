import React from 'react';
import styles from './Footer.module.scss';
import { Logo } from '../Logo';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  const toTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <footer className={styles.FooterFooter}>
      <div className={styles.container}>
        <Logo variant='footer'/>
        <ul className={styles.footerListLinks}>
          <li>
            <a
              className={styles.footerLinks} target="_blank" rel="noopener noreferrer"
              href={
                'https://github.com/Team-404-Found-T5/react_phone-catalog/tree/master'
              }
            >
              Github
            </a>
          </li>
          <li>
            <NavLink className={styles.footerLinks} to={'/contacts'}>
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.footerLinks} to={'/right'}>
              rights
            </NavLink>
          </li>
        </ul>
        <a className={styles.fromFooterToTop} href='#header' onClick={toTop}>
          Back to top
          <div className={styles.arrowBorder}>
            <img src="img/ArrowRight-active.svg" alt="link To top" />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
