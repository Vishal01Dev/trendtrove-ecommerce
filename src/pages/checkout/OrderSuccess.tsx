import React, { useEffect, useState } from "react";
import PathRoute from "../../components/pathRoute/PathRoute";
import { useAppSelector } from "../../redux/hooks";
import { selectOrder } from "../../redux/order/orderSlice";
import { OrderType } from "../../utils/types";
import Button from "../../components/common/Button";

const OrderSuccess = () => {
  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null);

  const details = useAppSelector(selectOrder);

  useEffect(() => {
    setOrderDetails(details);
  }, [details]);

  if (!orderDetails) {
    return (
      <div className="text-center text-red-500">
        Order details not available.
      </div>
    );
  }

  const { shippingAddress, billingAddress, items } = orderDetails;

  const handleRedirect = () => {
    window.location.assign("/");
  };

  return (
    <div>
      <div className="sm:mt-5 mb-10">
        <PathRoute path="Checkout" subPath="Order Success" />
      </div>
      <div className="bg-white text-gray-800">
        <div className="w-full border border-gray-300 rounded p-6 mb-10">
          <div className="flex justify-center mb-5">
            <h1 className="text-secondary font-bold text-xl sm:text-3xl">
              TREND <span className="text-primary">TROVE</span>
            </h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Thank you,{" "}
            <span className="text-primary">your payment was Successful!</span>
          </h2>
          <p className="text-lg mb-4">
            Hey{" "}
            <span className="font-semibold text-primary">Vishal Mistry</span>,
            <br />
            ✔️ Your order is confirmed!
          </p>
          <p className="mb-4">
            Thanks for shopping! We will get started on your order right away.
            When we ship your order, we will send an auto-generated notification
            email. In the meantime, if any questions come up, please do not
            hesitate to message us. Any of our customer service agents will
            always be happy to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4">
              <p>
                Order Number:{" "}
                <span className="font-semibold">
                  {orderDetails.paymentDetails.order}
                </span>
              </p>
              <p>
                Order Date:{" "}
                <span className="font-semibold">
                  {new Date().toDateString()}
                </span>
              </p>
            </div>
            <div className="">
              <p className="">
                Delivered To:
                <br />
                <span className="font-semibold">
                  {`${shippingAddress.firstName} ${shippingAddress.lastName}`}{" "}
                  <br />
                  {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.country} ${shippingAddress.pincode}`}
                  <br />
                  {shippingAddress.email}
                  <br />
                  {shippingAddress.phoneNumber}
                </span>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <ul className="divide-y divide-gray-200">
            {items?.map((item, index) => (
              <li
                key={index}
                className="flex  justify-between items-center py-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <span className="font-semibold">{item.product.name}</span>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-3 sm:col-span-2">
              <p className="">
                Billing Details:
                <br />
                <span className="font-semibold">
                  {`${billingAddress.firstName} ${billingAddress.lastName}`}{" "}
                  <br />
                  {`${billingAddress.address}, ${billingAddress.city}, ${billingAddress.state}, ${billingAddress.country} ${billingAddress.pincode}`}
                  <br />
                  {billingAddress.email}
                  <br />
                  {billingAddress.phoneNumber}
                </span>
              </p>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span>
                  $
                  {orderDetails.totalAmount > 500
                    ? orderDetails.totalAmount.toFixed(2)
                    : (orderDetails.totalAmount - 20).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping Charges</span>
                <span>{orderDetails.totalAmount > 500 ? "FREE" : "$ 20"}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Payment</span>
                <span>${orderDetails.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4"></div>
          <Button
            onClick={handleRedirect}
            title="Continue Shopping"
            type="button"
            buttonStyles="bg-primary text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
