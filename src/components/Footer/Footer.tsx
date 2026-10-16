import React, { useState } from 'react';
import styles from './Footer.module.scss';
import { Logo } from '../Logo';
import ContactsModal from '../ContactsModal/ContactsModal';
import { RightsModal } from '../RightsModal';

export const Footer: React.FC = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isRightsOpen, setIsRightsOpen] = useState(false);

  const toTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.FooterFooter}>
      <div className={styles.container}>
        <Logo variant="footer" />
        <ul className={styles.footerListLinks}>
          <li>
            <a
              className={styles.footerLinks}
              target="_blank"
              rel="noopener noreferrer"
              href={
                'https://github.com/Team-404-Found-T5/react_phone-catalog/tree/master'
              }
            >
              Github
            </a>
          </li>
          <li>
            <button
              type="button"
              className={styles.footerLinks}
              onClick={() => setIsContactsOpen(true)}
            >
              Contacts
            </button>
          </li>
          <li>
            <button
              type="button"
              className={styles.footerLinks}
              onClick={() => setIsRightsOpen(true)}
            >
              rights
            </button>
          </li>
        </ul>
        <a className={styles.fromFooterToTop} href="#header" onClick={toTop}>
          Back to top
          <div className={styles.arrowBorder}>
            <img src="img/ArrowRight-active.svg" alt="link To top" />
          </div>
        </a>
      </div>

      <ContactsModal
        isOpen={isContactsOpen}
        onClose={() => setIsContactsOpen(false)}
      />

      <RightsModal
        isOpen={isRightsOpen}
        onClose={() => setIsRightsOpen(false)}
      />
    </footer>
  );
};

export default Footer;
