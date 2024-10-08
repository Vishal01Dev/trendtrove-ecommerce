import React, { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus, FaStar, FaStarHalf } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useDebounce from "../../hooks/useDebounce";
import { CartItemProps, GuestCartType } from "../../utils/types";

interface CartCardProps {
  cart: CartItemProps | GuestCartType;
  cartItemRemover: (id: string) => void;
  updateCartHandler: (cartId: string, quantity: number) => void;
}

const CartCard: React.FC<CartCardProps> = ({
  cart,
  cartItemRemover,
  updateCartHandler,
}) => {
  const { product, quantity } = cart;

  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 !== 0;

  const [quan, setQuan] = useState<number>(quantity);
  const debouncedQuan = useDebounce(quan, 500);

  const quanHandler = (type: string) => {
    setQuan((prevQuan) => {
      if (type === "minus" && prevQuan > 1) {
        return prevQuan - 1;
      } else if (type === "plus" && prevQuan < 10) {
        return prevQuan + 1;
      }
      return prevQuan;
    });
  };

  const isCartItemProps = (
    cart: CartItemProps | GuestCartType
  ): cart is CartItemProps => {
    return (cart as CartItemProps)._id !== undefined;
  };

  // Using refs to track previous values
  const prevCartRef = useRef(cart);
  const prevDebouncedQuanRef = useRef(debouncedQuan);

  useEffect(() => {
    if (isCartItemProps(cart)) {
      if (
        prevCartRef.current !== cart ||
        prevDebouncedQuanRef.current !== debouncedQuan
      ) {
        updateCartHandler(cart._id, debouncedQuan);
        prevCartRef.current = cart;
        prevDebouncedQuanRef.current = debouncedQuan;
      }
    } else {
      if (
        prevCartRef.current !== cart ||
        prevDebouncedQuanRef.current !== debouncedQuan
      ) {
        updateCartHandler(cart.product._id, debouncedQuan);
        prevCartRef.current = cart;
        prevDebouncedQuanRef.current = debouncedQuan;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuan, updateCartHandler]);

  const handleRemoveClick = () => {
    if (isCartItemProps(cart)) {
      cartItemRemover(cart._id);
    } else {
      cartItemRemover(cart.product._id);
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-12 py-3 gap-y-3 sm:gap-0 ">
        <div className="col-span-12 sm:col-span-6">
          <div className="flex items-center gap-x-6">
            <div className="w-16">
              <img src={product.image} alt="product" />
            </div>
            <div>
              <p className="text-lg font-medium">{product.name}</p>
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
          </div>
        </div>
        <div className="col-span-2 flex items-center">
          <h2 className="uppercase font-medium text-primary text-xl">
            $ {product.price}
          </h2>
        </div>
        <div className="col-span-5 sm:col-span-2 flex items-center">
          <div className="flex justify-start items-center">
            <div className="">
              <button
                disabled={quan === 1}
                className="bg-gray-100 px-2 py-2 disabled:cursor-not-allowed"
                onClick={() => quanHandler("minus")}
              >
                <FaMinus size={14} />
              </button>
            </div>
            <div>
              <input
                type="text"
                value={quan}
                readOnly
                className="text-center w-12 bg-gray-100 px-2 py-1 text-sm font-semibold border-none focus:border-none focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <button
                disabled={quan === 10}
                className="bg-gray-100 px-2 py-2 disabled:cursor-not-allowed"
                onClick={() => quanHandler("plus")}
              >
                <FaPlus size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 sm:col-span-2 flex items-center w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <h2 className="uppercase font-medium text-primary text-xl">
                $ {(product.price * quantity).toFixed(2)}
              </h2>
            </div>
            <div
              className="bg-gray-100 p-2.5 rounded-full w-fit text-xs font-bold text-secondary cursor-pointer"
              onClick={handleRemoveClick}
            >
              <IoClose size={22} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
