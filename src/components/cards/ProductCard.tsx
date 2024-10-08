import React, { useEffect, useState } from "react";
import { FaRegHeart, FaStar, FaStarHalf } from "react-icons/fa";

import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { selectIsAuthenticated } from "../../redux/auth/authSlice";
import {
  addToCartAsync,
  getCartAsync,
  guestAddToCart,
} from "../../redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addTowishlistAsync,
  getWishlistAsync,
} from "../../redux/wishlist/wishlistSlice";
import { ProductType } from "../../utils/types";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 !== 0;

  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  const auth = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (auth) {
      setIsUserLogged(auth);
    }
  }, [auth]);

  const wishlistHandler = (productId: string) => {
    dispatch(addTowishlistAsync(productId))
      .then((response) => {
        if (response.payload.statusCode === 201 || 200) {
          dispatch(getWishlistAsync());
          toast.success(response.payload.message, {
            position: "bottom-left",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("You have to login first to use wishlist", {
          position: "bottom-left",
        });
      });
  };

  const cartHandler = (productId: string, quantity = 1) => {
    if (isUserLogged) {
      dispatch(addToCartAsync({ productId, quantity }))
        .then((response) => {
          if (response.payload.statusCode === 201 || 200) {
            dispatch(getCartAsync());
            toast.success(response.payload.message, {
              position: "bottom-left",
            });
          }
        })
        .catch((err) => {});
    } else {
      const cartObj = {
        product: product,
        quantity: 1,
      };

      dispatch(guestAddToCart(cartObj));
      toast.success("Item added successfully!", {
        position: 'bottom-left'
      })
    }
  };

  return (
    <div className="group z-10">
      <div className="relative">
        <img src={product.image} alt="product" className="w-full"/>
        {product.stock > 0 && (
          <div className="absolute overflow-hidden z-0 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 bottom-0 pb-5 w-full flex justify-center items-center gap-x-4 text-secondary bg-gradient-to-t from-black/40 to-transparent">
            <div
              className="bg-white p-3 rounded-full hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => wishlistHandler(product._id)}
            >
              <FaRegHeart size={22} />
            </div>
            <div
              className="bg-white p-3 rounded-full hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => cartHandler(product._id)}
            >
              <HiOutlineShoppingBag size={22} />
            </div>
          </div>
        )}
        {product.stock === 0 && (
          <div className="bg-secondary px-2 py-1 text-[10px] text-white absolute top-2 left-2 font-semibold">
            OUT OF STOCK
          </div>
        )}
        {/* <div className="bg-green-600 px-2 py-1 text-[10px] text-white absolute top-2 right-2 font-semibold">
          NEW
        </div> */}
      </div>
      <div className="py-2">
        <div className="flex flex-col justify-center gap-y-1 items-start">
          <h2 className="text-secondary text-base sm:text-lg  font-semibold h-10">
            <Link to="/">{product.name}</Link>
          </h2>
          <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-y-2 sm:items-end">
            <div className="space-y-1">
              <div className="flex items-center gap-x-1 justify-start text-[10px] font-semibold uppercase text-gray-500">
                <p>{product.category}</p>
                <p>|</p>
                <p>{product.subCategory}</p>
              </div>
              <div className="flex gap-x-1 items-center text-primary">
                {[...Array(fullStars)].map((_, index) => (
                  <FaStar key={`full-${index}`} size={14} />
                ))}
                {halfStar && <FaStarHalf size={14} />}

                <p className="text-xs font-semibold">
                  {product.rating === 0 ? "No Ratings" : product.rating}
                </p>
              </div>
            </div>
            <p className="font-semibold text-secondary tracking-wider">
              $ <span>{product.price}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
