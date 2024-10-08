import React from "react";

import { FaStar, FaStarHalf } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { WishlistItemType } from "../../utils/types";
import Button from "../common/Button";

interface WishlistCardProps {
  wishlist: WishlistItemType;
  handleWishlistRemover: (id: string) => void;
  cartHandler: (id: string) => void;
}

const WIshlistCard: React.FC<WishlistCardProps> = ({
  wishlist,
  handleWishlistRemover,
  cartHandler,
}) => {
  const { product } = wishlist;

  const fullStars = Math.floor(product.rating);
  const halfStar = product.rating % 1 !== 0;

  return (
    <div className="grid grid-cols-12 py-3">
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
      <div className="col-span-4 sm:col-span-2 flex items-center">
        <h2 className="uppercase font-medium text-primary text-xl">
          $ {product.price}
        </h2>
      </div>
      <div className="col-span-8 sm:col-span-4 flex items-center w-full">
        <div className="flex justify-between items-center w-full">
          <div>
            <Button
              title="ADD TO CART"
              type="button"
              buttonStyles="bg-primary text-white"
              onClick={() => {
                cartHandler(product._id);
                handleWishlistRemover(wishlist._id);
              }}
            />
          </div>
          <div className="bg-gray-100 p-2.5 rounded-full w-fit text-xs font-bold text-secondary cursor-pointer">
            <IoClose
              size={22}
              onClick={() => handleWishlistRemover(wishlist._id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WIshlistCard;
