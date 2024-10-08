import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartCard from "../../components/cards/CartCard";
import Button from "../../components/common/Button";
import PathRoute from "../../components/pathRoute/PathRoute";
import { selectIsAuthenticated } from "../../redux/auth/authSlice";
import {
  getCartAsync,
  guestRemoveFromCart,
  guestUpdateCart,
  removeFromCartAsync,
  selectCart,
  selectCartTotal,
  selectGuestCart,
  selectGuestCartTotal,
  updateCartAsync
} from "../../redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CartItemsProps, GuestCartType } from "../../utils/types";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [userCart, setUserCart] = useState<CartItemsProps | null>(null);
  const [guestCartState, setGuestCartState] = useState<GuestCartType[]>([]);

  const auth = useAppSelector(selectIsAuthenticated);
  const cartItems = useAppSelector(selectCart);
  const cartTotal = useAppSelector(selectCartTotal);
  const guestCart = useAppSelector(selectGuestCart);
  const guestCartTotal = useAppSelector(selectGuestCartTotal);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true); 
      try {
        if (auth) {
          await dispatch(getCartAsync());
        }
      } finally {
        setIsLoading(false); 
      }
    };
    fetchCart();

  }, [dispatch, auth]);

  useEffect(() => {
    if (auth && cartItems) {
      setUserCart(cartItems);
    } else if (!auth && guestCart) {
      setGuestCartState(guestCart);
    }
  }, [auth, cartItems, guestCart]);

  const cartItemRemover = useCallback(
    async (id: string) => {
      setIsLoading(true); 
      try {
        if (auth) {
          const res = await dispatch(removeFromCartAsync(id));
          toast.success(res.payload.message, {
            position: "bottom-left",
          });
          await dispatch(getCartAsync());
        } else {
          dispatch(guestRemoveFromCart(id));
          toast.success("Item removed successfully!", {
            position: "bottom-left",
          });
        }
      } finally {
        setIsLoading(false); 
      }
    },
    [auth, dispatch]
  );

  const updateCartHandler = useCallback(
    async (cartId: string, quantity: number) => {
      setIsLoading(true); 
      try {
        if (auth) {
          await dispatch(updateCartAsync({ cartId, quantity }));
          await dispatch(getCartAsync());
        } else {
          dispatch(guestUpdateCart({ productId: cartId, quantity }));
        }
      } finally {
        setIsLoading(false); 
      }
    },
    [auth, dispatch]
  );

  return (
    <>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Cart" />
        {isLoading ? (
          <p className="font-semibold text-2xl text-gray-600">Loading...</p>
        ) : (auth ? userCart?.items : guestCartState) &&
          (auth
            ? userCart?.items && userCart?.items?.length > 0 // Optional chaining for `items`
            : guestCartState.length > 0) ? (
          <>
            <div className="hidden sm:grid grid-cols-12 border-b-2 pb-3">
              <div className="col-span-6">
                <h2 className="uppercase font-medium text-xl">Product</h2>
              </div>
              <div className="col-span-2">
                <h2 className="uppercase font-medium text-xl">Price</h2>
              </div>
              <div className="col-span-2">
                <h2 className="uppercase font-medium text-xl">Quantity</h2>
              </div>
              <div className="col-span-2">
                <h2 className="uppercase font-medium text-xl">Total</h2>
              </div>
            </div>
            <div>
              {auth
                ? userCart?.items?.map((item) => (
                    <CartCard
                      cart={item}
                      key={item._id}
                      cartItemRemover={cartItemRemover}
                      updateCartHandler={updateCartHandler}
                    />
                  ))
                : guestCartState.map((item, index) => (
                    <CartCard
                      cart={item}
                      key={index}
                      cartItemRemover={cartItemRemover}
                      updateCartHandler={updateCartHandler}
                    />
                  ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 py-5 gap-x-10">
              <div className="col-span-1">{""}</div>
              <div className="bg-gray-100 rounded p-5 sm:px-10 py-5">
                <h2 className="text-xl font-semibold mb-5">Cart Total</h2>
                <hr />
                <div className="flex justify-between items-center font-bold py-5">
                  <h2 className="text-xl ">Total</h2>
                  <h2 className="text-xl text-primary">
                    $ {auth ? cartTotal : guestCartTotal}
                  </h2>
                </div>
                <div className="py-5">
                  <Button
                    onClick={() => navigate("/checkout")}
                    title="Proceed to Checkout"
                    buttonStyles="!text-lg bg-primary text-white w-full"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center text-2xl font-semibold">
            <p>No products in your Cart</p>
            <Link to="/shop" className="text-primary text-sm underline mt-2">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
