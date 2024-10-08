import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import WIshlistCard from "../../components/cards/WIshlistCard";
import PathRoute from "../../components/pathRoute/PathRoute";
import { addToCartAsync, getCartAsync } from "../../redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getWishlistAsync,
  removeFromWishlistAsync,
  selectWishlist,
} from "../../redux/wishlist/wishlistSlice";
import { WishlistItemType, WishlistType } from "../../utils/types";

const Wishlist = () => {
  const dispatch = useAppDispatch();

  const [wishlist, setWishlist] = useState<WishlistType | null>(null);

  useEffect(() => {
    dispatch(getWishlistAsync());
  }, [dispatch]);

  const wishlistItems = useAppSelector(selectWishlist);

  useEffect(() => {
    setWishlist(wishlistItems);
  }, [wishlistItems]);

  const handleWishlistRemover = (itemId: string) => {
    dispatch(removeFromWishlistAsync(itemId)).then((res) => {
      toast.success(res.payload.message, {
        position: "bottom-left",
      });
      dispatch(getWishlistAsync());
      dispatch(getCartAsync());
    });
  };

  const cartHandler = (productId: string, quantity = 1) => {
    dispatch(addToCartAsync({ productId, quantity }))
      .then((response) => {
        if (response.payload.statusCode === 201 || 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Wishlist" />

        {wishlist && wishlist?.items?.length > 0 ? (
          <>
            <div className="hidden sm:grid grid-cols-12 border-b-2 pb-3">
              <div className="col-span-6">
                <h2 className="uppercase font-medium text-xl">Product</h2>
              </div>
              <div className="col-span-2">
                <h2 className="uppercase font-medium text-xl">Price</h2>
              </div>
              <div className="col-span-4">
                <h2 className="uppercase font-medium text-xl">Actions</h2>
              </div>
            </div>
            <div>
              {wishlist &&
                wishlist.items?.map((list: WishlistItemType) => {
                  return (
                    <WIshlistCard
                      wishlist={list}
                      key={list.product._id}
                      handleWishlistRemover={handleWishlistRemover}
                      cartHandler={cartHandler}
                    />
                  );
                })}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center text-2xl font-semibold">
            <p>No products in your wishlist</p>
            <Link to="/shop" className="text-primary text-sm underline mt-2">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
