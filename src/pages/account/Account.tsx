import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import PathRoute from "../../components/pathRoute/PathRoute";
import {
  changePasswordAsync,
  checkAuthenticationAsync,
  getCurrentUserAsync,
  selectIsAuthenticated,
  selectUser,
  updateUserAsync,
  userLogoutAsync,
} from "../../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getUserOrdersAsync,
  selectUserOrders,
} from "../../redux/order/orderSlice";
import { UserOrdersType, userType } from "../../utils/types";

const Account = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authenticaed, setAuthenticated] = useState(false);
  const [user, setUser] = useState<userType | null>(null);
  const [orders, setOrders] = useState<UserOrdersType[] | null>(null);

  const [formView, setFormView] = useState<boolean>(false);

  const logoutHandler = () => {
    dispatch(userLogoutAsync());
  };

  useEffect(() => {
    dispatch(checkAuthenticationAsync());
    dispatch(getCurrentUserAsync());
    dispatch(getUserOrdersAsync());
  }, [dispatch]);

  const auth = useAppSelector(selectIsAuthenticated);
  const userDetails = useAppSelector(selectUser);
  const userOrders = useAppSelector(selectUserOrders);

  useEffect(() => {
    setAuthenticated(auth);
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    setOrders(userOrders);
  }, [userOrders]);

  const [tab, setTab] = useState<string>("account");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>();

  useEffect(() => {
    setValue("firstName", user ? user.firstName : "");
    setValue("lastName", user ? user.lastName : "");
    setValue("phoneNumber", user ? user.phoneNumber : "");
    setValue("email", user ? user.email : "");
    setValue("username", user ? user.username : "");
    setValue("address", user ? user.address : "");
    setValue("city", user ? user.city : "");
    setValue("state", user ? user.state : "");
    setValue("country", user ? user.country : "");
    setValue("pincode", user ? user.pincode : "");
  }, [user, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(updateUserAsync(data))
      .then((response) => {
        if (response.payload.statusCode === 201) {
          toast.success(response.payload.message, {
            position: "bottom-left",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };

  const changePasswordHandler: SubmitHandler<FieldValues> = async (data) => {
    const resultAction = await dispatch(changePasswordAsync(data));

    if (changePasswordAsync.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message, {
        position: "bottom-left",
      });
      setFormView(false);
    } else {
      const errorMessage: string =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "An unexpected error occurred";

      toast.error(errorMessage, {
        position: "bottom-left",
      });
    }
  };

  const newPassword = watch("newPassword");

  return (
    <div className="sm:mt-5 mb-20">
      <PathRoute path="Account" />

      <div className="grid md:grid-cols-12 gap-6 md:gap-y-0">
        <div className="col-span-6 md:col-span-4 space-y-4">
          <div className="border rounded p-6 ">
            <div className=" flex gap-4 justify-start items-center">
              <div className="bg-primary rounded-full !w-28 h-20 flex items-center justify-center">
                <p className="text-3xl font-bold text-white">
                  {user?.firstName[0]}
                  {user?.lastName[0]}
                </p>
              </div>
              <div className="w-full">
                <h2 className="font-semibold text-lg">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm font-medium text-gray-500">
                  {user?.email}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {user?.address}, {user?.city}, {user?.state}, {user?.country}{" "}
                  {user?.pincode}
                </p>
              </div>
            </div>{" "}
            <div className="mt-5">
              <Button
                onClick={logoutHandler}
                title="Logout"
                buttonStyles="text-white bg-primary w-full"
              />
            </div>
          </div>
          <div className="border rounded flex items-center">
            <div
              className={clsx(
                "p-3 text-center font-medium rounded w-full cursor-pointer",
                tab === "account" && "bg-primary  text-white "
              )}
              onClick={() => setTab("account")}
            >
              Account
            </div>
            <div
              className={clsx(
                "p-3 text-center font-medium rounded w-full cursor-pointer",
                tab === "orders" && "bg-primary text-white "
              )}
              onClick={() => setTab("orders")}
            >
              Orders
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-8 overflow-x-auto">
          {tab === "account" && (
            <>
              <div className="border rounded p-5">
                {!formView ? (
                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-auto gap-y-5 sm:gap-5 grid grid-cols-1 sm:grid-cols-2">
                      <div className="col-span-1">
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Firstname"
                          isDisabled={isLoading}
                          register={register}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Lastname"
                          isDisabled={isLoading}
                          register={register}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          id="username"
                          name="username"
                          placeholder="Username"
                          isDisabled={isLoading}
                          register={register}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Phone number"
                          isDisabled={isLoading}
                          register={register}
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <Input
                          id="address"
                          name="address"
                          placeholder="Address"
                          isDisabled={isLoading}
                          register={register}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          id="city"
                          name="city"
                          placeholder="City"
                          isDisabled={isLoading}
                          register={register}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          id="state"
                          name="state"
                          placeholder="State"
                          register={register}
                          isDisabled={isLoading}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          id="country"
                          name="country"
                          placeholder="Country"
                          register={register}
                          isDisabled={isLoading}
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          id="pincode"
                          name="pincode"
                          placeholder="Pincode"
                          register={register}
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <Input
                          id="email"
                          name="email"
                          placeholder="Email address"
                          isDisabled={isLoading}
                          register={register}
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row justify-center items-center gap-5">
                        <Button
                          title="Update"
                          type="submit"
                          buttonStyles="text-white bg-primary w-full"
                          isDisabled={isLoading}
                        />
                        <Button
                          onClick={() => setFormView(true)}
                          title="Change Password"
                          type="button"
                          buttonStyles="bg-gray-200 w-full"
                          isDisabled={isLoading}
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit(changePasswordHandler)}>
                    <div className="mx-auto gap-5 grid grid-cols-1">
                      <div>
                        <input
                          id="oldPassword"
                          type="password"
                          placeholder="Old Password"
                          {...register("oldPassword", {
                            required: "Old password is required",
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                          })}
                          className="bg-gray-100 px-4 py-2.5 rounded w-full border-none text-secondary focus:outline-none text-sm font-medium"
                        />
                      </div>

                      <div>
                        <input
                          id="newPassword"
                          type="password"
                          placeholder="New password"
                          {...register("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 6,
                              message:
                                "Password must be at least 6 characters long",
                            },
                          })}
                          className="bg-gray-100 px-4 py-2.5 rounded w-full border-none text-secondary focus:outline-none text-sm font-medium"
                        />
                        {errors?.newPassword && (
                          <p className="text-red-500 text-sm font-semibold">
                            {errors?.newPassword.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          id="conPassword"
                          type="password"
                          placeholder="Confirm password"
                          {...register("conPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                              value === newPassword || "Passwords do not match",
                          })}
                          className="bg-gray-100 px-4 py-2.5 rounded w-full border-none text-secondary focus:outline-none text-sm font-medium"
                        />
                        {errors?.conPassword && (
                          <p className="text-red-500 text-sm font-semibold">
                            {errors?.conPassword.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <Button
                          title="Change password"
                          type="submit"
                          buttonStyles="text-white bg-primary w-full"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
          {tab === "orders" && (
            <>
              <div className="border rounded p-5">
                <div>
                  <h2 className="text-xl font-medium border-b pb-2">Orders</h2>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[700px] max-w-full">
                    {orders && orders.length > 0 ? (
                      <>
                        <div className="grid grid-cols-12 border-b pt-5 pb-2 font-semibold">
                          <div className="col-span-2">No.</div>
                          <div className="col-span-2">Order Date</div>
                          <div className="col-span-3">Customer Email</div>
                          <div className="col-span-2">Amount</div>
                          <div className="col-span-2">Status</div>
                          <div className="col-span-1">Actions</div>
                        </div>

                        {orders.map((order, index) => (
                          <div
                            className="grid grid-cols-12 border-b pt-5 pb-2"
                            key={index}
                          >
                            <div className="col-span-2"># {index + 1}</div>
                            <div className="col-span-2">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <div className="col-span-3">
                              <div className="flex flex-col items-start">
                                <h2>{order.user.email}</h2>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <p className="font-semibold text-primary">
                                $ {order.paymentDetails.amount}
                              </p>
                            </div>
                            <div className="col-span-2">
                              <div
                                className={clsx(
                                  order.status === "PENDING" && "bg-yellow-400",
                                  order.status === "PROCESSING" &&
                                    "bg-cyan-400",
                                  order.status === "SHIPPED" && "bg-orange-400",
                                  order.status === "DELIVERED" &&
                                    "bg-green-400",
                                  order.status === "CANCELLED" && "bg-red-400",
                                  "font-medium rounded w-fit uppercase px-2 text-sm py-1"
                                )}
                              >
                                {order.status}
                              </div>
                            </div>
                            <div className="col-span-1 flex items-center justify-start">
                              <Link
                                to={`/order-details/${order._id}`}
                                className="text-primary font-bold text-sm hover:text-primary/70"
                              >
                                <div className="flex justify-center items-center gap-x-1">
                                  <FaEye size={14} />
                                  <p>View</p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="flex flex-col justify-center items-center text-2xl font-semibold my-10">
                        <p>No orders yet</p>
                        <Link
                          to="/shop"
                          className="text-primary text-sm underline mt-2"
                        >
                          Shop Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
