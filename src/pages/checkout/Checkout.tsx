import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import PathRoute from "../../components/pathRoute/PathRoute";
import Input from "../../components/common/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getCartAsync,
  selectCart,
  selectCartTotal,
  selectGuestCart,
  selectGuestCartTotal,
} from "../../redux/cart/cartSlice";
import Button from "../../components/common/Button";
import { setCheckoutDetails } from "../../redux/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUserAsync,
  selectIsAuthenticated,
  selectUser,
} from "../../redux/auth/authSlice";

const Checkout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shippingCharge = 20;

  const auth = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (auth) {
      dispatch(getCartAsync());
      dispatch(getCurrentUserAsync());
    }
  }, [dispatch, auth]);

  const cartItems = useAppSelector(selectCart);
  const cartTotal = useAppSelector(selectCartTotal);
  const guestCart = useAppSelector(selectGuestCart);
  const guestCartTotal = useAppSelector(selectGuestCartTotal);
  const userDetails = useAppSelector(selectUser);

  const [showBillingForm, setShowBillingForm] = useState<boolean>(true);

  const [finalAmount, setFinalAmount] = useState<number>(0);

  const handleCheckboxChange = () => {
    setShowBillingForm(!showBillingForm);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});



  useEffect(() => {
    setValue("firstname", userDetails?.firstName);
    setValue("lastname", userDetails?.lastName);
    setValue("email", userDetails?.email);
    setValue("phone", userDetails?.phoneNumber);
    setValue("address", userDetails?.address);
    setValue("city", userDetails?.city);
    setValue("state", userDetails?.state);
    setValue("country", userDetails?.country);
    setValue("pincode", userDetails?.pincode);
  }, [userDetails, setValue]);

  useEffect(() => {
    if (auth) {
      if (cartTotal > 500) {
        setFinalAmount(cartTotal);
      } else {
        setFinalAmount(cartTotal + shippingCharge);
      }
    } else {
      if (cartTotal > 500) {
        setFinalAmount(guestCartTotal);
      } else {
        setFinalAmount(guestCartTotal + shippingCharge);
      }
    }
  }, [guestCartTotal, auth, cartTotal]);

  const HandleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    const shippingAddress = {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      phoneNumber: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      pincode: data.pincode,
    };

    let billingAddress;

    if (data.billingInfo) {
      billingAddress = shippingAddress;
    } else {
      billingAddress = {
        firstName: data.bfirstname,
        lastName: data.blastname,
        email: data.bemail,
        phoneNumber: data.bphone,
        address: data.baddress,
        city: data.bcity,
        state: data.bstate,
        country: data.bcountry,
        pincode: data.bpincode,
      };
    }

    const items = auth ? cartItems?.items : guestCart;

    const totalAmount = finalAmount;

    const orderNote = data.orderNote;

    const orderObj = {
      shippingAddress,
      billingAddress,
      orderNote,
      cartItems: items,
      totalAmount,
    };

    dispatch(setCheckoutDetails(orderObj));

    navigate("/checkout/order-summary");
  };

  return (
    <>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Checkout" />

        <form onSubmit={handleSubmit(HandleFormSubmit)}>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-y-10 sm:gap-x-12">
            <div className="col-span-6 md:col-span-7">
              <div>
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-12 gap-5 my-5">
                <div className="col-span-6">
                  <Input
                    id="firstname"
                    name="firstname"
                    placeholder="First name"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Last name"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Phone number"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-12">
                  <Input
                    id="address"
                    name="address"
                    placeholder="Address"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    id="city"
                    name="city"
                    placeholder="City"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    id="state"
                    name="state"
                    placeholder="State"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    id="country"
                    name="country"
                    placeholder="Country"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    id="pincode"
                    name="pincode"
                    placeholder="Pincode"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Billing Address</h2>
              </div>
              <div className="my-5">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 text-primary "
                    {...register("billingInfo")}
                    onChange={handleCheckboxChange}
                    checked={showBillingForm}
                  />
                  <span className="ml-2 font-medium text-sm">
                    Will be same as Shipping Details
                  </span>
                </label>
              </div>

              {!showBillingForm && (
                <div className="grid grid-cols-12 gap-5 my-5">
                  <div className="col-span-6">
                    <Input
                      id="bfirstname"
                      name="bfirstname"
                      placeholder="First name"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      id="blastname"
                      name="blastname"
                      placeholder="Last name"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      id="bemail"
                      name="bemail"
                      placeholder="Email"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      id="bphone"
                      name="bphone"
                      placeholder="Phone number"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-12">
                    <Input
                      id="baddress"
                      name="baddress"
                      placeholder="Address"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      id="bcity"
                      name="bcity"
                      placeholder="City"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      id="bstate"
                      name="bstate"
                      placeholder="State"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      id="bcountry"
                      name="bcountry"
                      placeholder="Country"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      id="bpincode"
                      name="bpincode"
                      placeholder="Pincode"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">Order Notes</h2>
              </div>
              <div className="mt-5">
                <textarea
                  placeholder="Notes"
                  {...register("orderNote")}
                  className="h-20 w-full bg-gray-100 px-4 py-2.5 rounded  border-none text-secondary focus:outline-none text-sm font-medium"
                ></textarea>
              </div>
            </div>

            <div className="col-span-6 md:col-span-5">
              <div className="bg-gray-100 rounded p-5 sm:p-10">
                <div>
                  <h2 className="text-xl font-semibold">Your cart</h2>
                </div>
                <div className="my-5">
                  <ul className="divide-y divide-gray-200">
                    {auth
                      ? cartItems?.items.map((item) => (
                          <li
                            key={item._id}
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
                              <span className="font-semibold">
                                $
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </li>
                        ))
                      : guestCart.map((item, index) => (
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
                              <span className="font-semibold">
                                $
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </li>
                        ))}
                  </ul>
                </div>
                <hr className="bg-gray-500 h-[2px]" />
                <div className="my-5 space-y-2">
                  <div className="flex justify-between items-center font-semibold">
                    <h2>Subtotal</h2>
                    <h2>
                      ${" "}
                      <span>
                        {auth
                          ? cartTotal.toFixed(2)
                          : guestCartTotal.toFixed(2)}
                      </span>
                    </h2>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <div className="flex flex-col">
                      <h2>Shipping Charges </h2>
                      <span className="text-[10px] md:text-xs font-medium">
                        {"( Free shipping for order above $500 )"}
                      </span>
                    </div>

                    <h2>
                      {cartTotal > 500 ? (
                        <>
                          + $ <span>{0}</span>
                        </>
                      ) : (
                        <>
                          + $ <span>{shippingCharge.toFixed(2)}</span>
                        </>
                      )}
                    </h2>
                  </div>
                </div>
                <hr className="bg-primary h-[2px] border border-primary" />
                <div className="flex font-bold  justify-between items-center mt-5 text-primary">
                  <h2 className="text-lg">Total</h2>
                  <h2 className=" text-xl">
                    $ <span>{finalAmount.toFixed(2)}</span>
                  </h2>
                </div>
                <div className="mt-8">
                  <Button
                    type="submit"
                    title="Proceed to pay"
                    buttonStyles="text-white !text-lg bg-primary w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
