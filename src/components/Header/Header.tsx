// import React, { useEffect, useRef, useState } from 'react';
// import styles from './Header.module.scss';
// import { useCart } from '../../context/CartContext';
// import { useFavorites } from '../../context/FavoritesContext';
// import { HeaderAction } from '../HeaderAction';
// import { Logo } from '../Logo';
// import { Navigation } from '../Navigation';
// import { BurgerButton } from '../BurgerButton';
// import { MobileMenu } from '../MobileMenu';
// import { useSearchParams } from 'react-router-dom';

// export const Header: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [searchBy, setSearchBy] = useState(searchParams.get('query') || '');

//   const { items: cartItems } = useCart();
//   const { items: favoriteItems } = useFavorites();
//   // const location = useLocation();

//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
//   const favoritesCount = favoriteItems.length;

//   const toggleMenu = () => setIsMenuOpen(prev => !prev);
//   const closeMenu = () => setIsMenuOpen(false);

//   const toTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
//     event.preventDefault();
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   useEffect(() => {
//     const currentQuery = searchParams.get('query') || '';
//     if (currentQuery !== searchBy) {
//       setSearchBy(currentQuery);
//     }
//   }, [searchParams]);

//   const delaySearchInp = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (delaySearchInp.current) {
//       clearTimeout(delaySearchInp.current);
//     }

//     delaySearchInp.current = setTimeout(() => {
//       setSearchParams(prev => {
//         const newParams = new URLSearchParams(prev);
//         if (searchBy.trim()) {
//           newParams.set('query', searchBy.trim());
//         } else {
//           newParams.delete('query');
//         }
//         return newParams;
//       });
//     }, 1000);

//     return () => {
//       if (delaySearchInp.current) {
//         clearTimeout(delaySearchInp.current);
//       }
//     };
//   }, [searchBy, setSearchParams]);

//   return (
//     <header className={styles.headerHeader}>
//       <div className={styles.container}>
//         <div className={styles.firstpartHeader}>
//           <a href="#header" onClick={toTop}>
//             <Logo variant="header" />
//           </a>
//           <div className={styles.navWrapper}>
//             <Navigation />
//           </div>
//         </div>

//         <input
//           onChange={event => setSearchBy(event.target.value)}
//           value={searchBy}
//           placeholder="search..."
//           className={styles.headeSearchInp}
//           type="text"
//         />

//         <div>
//           <div className={styles.rightSectionCartAndFav}>
//             <HeaderAction
//               to="/cart"
//               label="Cart"
//               icon={<img src="img/Cart.svg" alt="cartSvg" />}
//               count={cartCount}
//             />
//             <HeaderAction
//               to="/favorites"
//               label="Favorites"
//               icon={<img src="img/Favorites.svg" alt="FavoritedSvg" />}
//               count={favoritesCount}
//             />
//           </div>
//           <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
//         </div>

//         <MobileMenu show={isMenuOpen} closeModal={closeMenu} />
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeaderAction } from '../HeaderAction';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { BurgerButton } from '../BurgerButton';
import { MobileMenu } from '../MobileMenu';
import { SearchInput } from '../SearchInput';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // const toTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
  //   event.preventDefault();

  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  // };

  return (
    <header className={styles.headerHeader}>
      <div className={styles.container}>
        <div className={styles.firstpartHeader}>
          <NavLink to="/home">
            <Logo variant="header" />
          </NavLink>

          <div className={styles.navWrapper}>
            <Navigation />
          </div>
        </div>

        <SearchInput />

        <div>
          <div className={styles.rightSectionCartAndFav}>
            <HeaderAction
              to="/cart"

              label="Cart"

              icon={<img src="img/Cart.svg" alt="cartSvg" />}

              count={cartCount}
            />

            <HeaderAction
              to="/favorites"

              label="Favorites"

              icon={<img src="img/Favorites.svg" alt="FavoritedSvg" />}

              count={favoritesCount}
            />
          </div>

          <BurgerButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        <MobileMenu show={isMenuOpen} closeModal={closeMenu} />
      </div>
    </header>
  );
};

export default Header;
