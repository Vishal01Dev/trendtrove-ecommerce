import React, { useEffect, useState } from "react";
import PathRoute from "../../components/pathRoute/PathRoute";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCheckoutDetails } from "../../redux/checkout/checkoutSlice";
import { CheckoutDetailsType, userType } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUserAsync,
  selectIsAuthenticated,
  selectUser,
} from "../../redux/auth/authSlice";
import { createOrderAsync } from "../../redux/order/orderSlice";
import {
  removeWholeCartAsync,
  removeWholeGuestCart,
} from "../../redux/cart/cartSlice";

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [orderDetails, setOrderDetails] = useState<CheckoutDetailsType | null>(
    null
  );
  const [user, setUser] = useState<userType | null>(null);
  const checkoutDetails = useAppSelector(selectCheckoutDetails);
  const currencyCode = "USD";
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalButtonsRendered, setPaypalButtonsRendered] = useState(false);

  const auth = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (auth) {
      dispatch(getCurrentUserAsync());
    }
  }, [dispatch, auth]);

  const userDetails = useAppSelector(selectUser);

  useEffect(() => {
    if (auth) {
      setUser(userDetails);
    }
  }, [userDetails, auth]);

  useEffect(() => {
    setOrderDetails(checkoutDetails);
  }, [checkoutDetails]);

  useEffect(() => {
    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=${currencyCode}`;
        script.async = true;
        script.onload = () => {
          if (window.paypal && typeof window.paypal.Buttons === "function") {
            setPaypalLoaded(true);
            resolve(true);
          } else {
            reject(new Error("PayPal SDK not loaded correctly"));
          }
        };
        script.onerror = () =>
          reject(new Error("PayPal SDK script could not be loaded"));
        document.body.appendChild(script);
      });
    };

    loadPayPalScript().catch((error) => {
      console.error("Error loading PayPal script:", error.message);
      alert(
        "There was an error loading the PayPal SDK. Please try again later."
      );
    });
  }, []);

  useEffect(() => {
    if (paypalLoaded && orderDetails && !paypalButtonsRendered) {
      window.paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: currencyCode,
                    value: orderDetails.totalAmount.toString(),
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            await actions.order.capture();
            const orderObj = {
              ...(auth && { user: user?._id }),
              ...(!auth && {
                guestUser: {
                  firstName: orderDetails.shippingAddress.firstName,
                  lastName: orderDetails.shippingAddress.lastName,
                  email: orderDetails.shippingAddress.email,
                  phoneNumber: orderDetails.shippingAddress.phoneNumber,
                },
              }),
              totalAmount: orderDetails.totalAmount,
              items: orderDetails.cartItems,
              shippingAddress: orderDetails.shippingAddress,
              billingAddress: orderDetails.billingAddress,
              paymentToken: data.paymentID,
            };

            dispatch(createOrderAsync(orderObj)).then(() => {
              if (auth) {
                dispatch(removeWholeCartAsync());
              }
              dispatch(removeWholeGuestCart());
              navigate("/checkout/order-success");
            });
          },
          onError: (err: any) => {
            console.error("PayPal Payment Error", err);
            navigate("/checkout/order-cancel");
          },
        })
        .render("#paypal-button-container");

      setPaypalButtonsRendered(true);
    }
  }, [
    paypalLoaded,
    orderDetails,
    dispatch,
    navigate,
    user,
    paypalButtonsRendered,
    auth,
  ]);

  if (!orderDetails) {
    return (
      <div className="text-center text-red-500">
        Order details not available.
      </div>
    );
  }

  const { shippingAddress, billingAddress, orderNote, cartItems, totalAmount } =
    orderDetails;

  return (
    <>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Checkout" subPath="Order Summary" />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-10 bg-gray-50 rounded">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Shipping Address
              </h2>
              <div className="mb-4">
                <p>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>
                <p>{shippingAddress.address}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.state}{" "}
                  {shippingAddress.pincode}
                </p>
                <p>{shippingAddress.country}</p>
                <p>
                  Email:{" "}
                  <span className="font-medium">{shippingAddress.email}</span>
                </p>
                <p>
                  Phone:{" "}
                  <span className="font-medium">
                    {shippingAddress.phoneNumber}
                  </span>
                </p>
              </div>

              <h2 className="text-xl font-semibold mb-4 text-primary">
                Billing Address
              </h2>
              <div className="mb-4">
                <p>
                  {billingAddress.firstName} {billingAddress.lastName}
                </p>
                <p>{billingAddress.address}</p>
                <p>
                  {billingAddress.city}, {billingAddress.state}{" "}
                  {billingAddress.pincode}
                </p>
                <p>{billingAddress.country}</p>
                <p>
                  Email:{" "}
                  <span className="font-medium">{billingAddress.email}</span>
                </p>
                <p>
                  Phone:{" "}
                  <span className="font-medium">
                    {billingAddress.phoneNumber}
                  </span>
                </p>
              </div>

              <h2 className="text-xl font-semibold mb-4 text-primary">
                Order Note
              </h2>
              <p className="border p-2 bg-white rounded">{orderNote}</p>
            </div>

            <div className="p-10 bg-gray-100 rounded">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Cart Items
              </h2>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <span className="font-semibold">
                          {item.product.name}
                        </span>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <section className="flex justify-between font-semibold text-lg border-t pt-4 mt-4">
                <span>Total Amount:</span>
                <span className="text-lg text-primary font-bold">
                  ${totalAmount.toFixed(2)}
                </span>
              </section>

              <div className="mt-6">
                <div id="paypal-button-container"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
