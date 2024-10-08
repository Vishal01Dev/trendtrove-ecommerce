import React from "react";
import PathRoute from "../../components/pathRoute/PathRoute";

const OrderCancel = () => {
  return (
    <div>
      <div className="sm:mt-5 mb-10">
        <PathRoute path="Checkout" subPath="Order Cancel" />
      </div>
      <div className="bg-white text-gray-800">
        <div className="w-full border border-gray-300 rounded p-6">
          <div className="flex justify-center mb-5">
            <h1 className="text-secondary font-bold text-xl sm:text-3xl">
              TREND <span className="text-primary">TROVE</span>
            </h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Oh No! , <span className="text-primary">your order failed!</span>
          </h2>

          <p className="text-center my-5 font-semibold">
            I am sorry to let you know that your order failed due to payment
            failure or server issue, please try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCancel;
