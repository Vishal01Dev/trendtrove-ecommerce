import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PathRoute from "../../components/pathRoute/PathRoute";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getOrderDetailsAsync,
  selectOrderDetails,
} from "../../redux/order/orderSlice";

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { orderId } = useParams<{ orderId: string }>();
  const details = useAppSelector(selectOrderDetails);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetailsAsync(orderId));
    }
  }, [orderId, dispatch]);

  if (!details) {
    return <p>No details found!</p>;
  }

  const { orderDetails, paymentDetails } = details;

  if (!orderDetails || !paymentDetails) {
    return <p>Incomplete order information!</p>;
  }

  const {
    _id,
    items,
    shippingAddress,
    billingAddress,
    status,
    createdAt,
  } = orderDetails;

  const { order, amount, paymentMethod, paymentToken } = paymentDetails;

  return (
    <div>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Account" subPath="Order Details" />

        <div className="p-6 border rounded">
          <h1 className="text-3xl font-semibold mb-5 text-primary">
            Order Summary
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-6">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Shipping Address
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.state}, {shippingAddress.pincode},{" "}
                {shippingAddress.country}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {shippingAddress.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone:</span>{" "}
                {shippingAddress.phoneNumber}
              </p>
            </div>

            {/* Billing Address */}
            <div className="bg-white p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Billing Address
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {billingAddress.firstName} {billingAddress.lastName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {billingAddress.address}, {billingAddress.city},{" "}
                {billingAddress.state}, {billingAddress.pincode},{" "}
                {billingAddress.country}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {billingAddress.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone:</span>{" "}
                {billingAddress.phoneNumber}
              </p>
            </div>
          </div>

          {/* Payment and Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Payment Details */}
            <div className="bg-white p-6 ">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Payment Details
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Order ID:</span> {order}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Amount:</span> ₹{amount}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Payment Method:</span>{" "}
                {paymentMethod}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Payment Token:</span> {paymentToken}
              </p>
            </div>

            {/* Order Status */}
            <div className="bg-white p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Order Status
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Order ID:</span> {_id}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Status:</span> {status}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Ordered On:</span>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Product List */}
          <div className="mt-6 bg-white p-6 ">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Products Ordered
            </h2>
            {items.map((item) => (
              <div key={item._id} className="flex items-center mb-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg mr-6"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.product.name}</h3>
                  <p className="mt-2">
                    <span className="font-semibold">Quantity:</span> {item.quantity}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
