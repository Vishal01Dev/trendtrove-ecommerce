import React, { useEffect, useState } from "react";
import { FaBars, FaRegHeart, FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  checkAuthenticationAsync,
  selectIsAuthenticated,
} from "../../redux/auth/authSlice";
import {
  getCartAsync,
  selectCart,
  selectGuestCart,
} from "../../redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getWishlistAsync,
  selectWishlist,
} from "../../redux/wishlist/wishlistSlice";
import { navigationRoutes } from "../../utils/navigationRoutes";
import MobileNavbar from "./MobileNavbar";



interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();

  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);


  const auth = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (auth) {
      dispatch(getCartAsync());
      dispatch(getWishlistAsync());
    }
   
    dispatch(checkAuthenticationAsync());
  }, [dispatch, auth]);

  const cartItems = useAppSelector(selectCart);
  const guestCartItems = useAppSelector(selectGuestCart);
  const wishlistItems = useAppSelector(selectWishlist);

  useEffect(() => {
    if (auth && cartItems && Array.isArray(cartItems.items)) {
      setCartCount(cartItems.items.length);
    } else if (!auth) {
      setCartCount(guestCartItems.length);
    } else {
      setCartCount(0);
    }

    if (wishlistItems && Array.isArray(wishlistItems.items)) {
      setWishlistCount(wishlistItems.items.length);
    } else {
      setWishlistCount(0);
    }
  }, [cartItems, wishlistItems, guestCartItems, auth]);

  const location = useLocation();

  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <>
      <MobileNavbar
        isOpen={isOpened}
        onClose={() => setIsOpened(false)}
        location={location}
      />
      <div className="px-5 sm:px-10 md:px-16 lg:px-24 flex justify-between items-center shadow py-6 fixed w-full z-40 bg-white">
        <div>
          <Link to="/">
            <h1 className="text-secondary font-bold text-xl sm:text-2xl">
              TREND <span className="text-primary">TROVE</span>
            </h1>
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="flex justify-center items-center gap-x-8 font-medium text-sm tracking-widest uppercase text-secondary">
            {navigationRoutes.map((route) => (
              <li
                key={route.path}
                className={clsx(
                  "hover:text-primary hover:scale-105",
                  location.pathname === route.path &&
                    "text-primary font-black scale-105 "
                )}
              >
                <Link to={route.path}>{route.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex justify-center items-center gap-x-3 sm:gap-x-5 text-secondary">
  

            <Link to="/login" title="login">
              <FaRegUser size={20} />
            </Link>
            <div className="relative">
              <Link to="/wishlist" title="wishlist">
                <FaRegHeart size={20} />
              </Link>
              <span className="w-4 h-4 flex justify-center items-center absolute -top-2 -right-2 bg-secondary rounded-full text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            </div>
            <div className="relative">
              <Link to="/cart" title="cart">
                <HiOutlineShoppingBag size={22} />
              </Link>
              <span className="w-4 h-4 flex justify-center items-center absolute -top-1.5 -right-1.5 bg-secondary rounded-full text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            </div>
            <div
              className="block md:hidden"
              title="menubar"
              onClick={() => setIsOpened(true)}
            >
              <FaBars size={22} />
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Header;
