import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import PathRoute from "../../../components/pathRoute/PathRoute";
import {
  checkAuthenticationAsync,
  checkEmailAsync,
  checkOtpAsync,
  forgotPasswordAsync,
  selectIsAuthenticated,
  userLoginAsync,
} from "../../../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authenticated, setAuthenticated] = useState(false);

  const [formField, setFormField] = useState<boolean>(false);
  const [formStep, setFormStep] = useState<number>(1);

  useEffect(() => {
    dispatch(checkAuthenticationAsync());
  }, [dispatch]);

  const auth = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    setAuthenticated(auth);
    if (auth) {
      navigate("/account");
    }
  }, [auth, navigate]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const resultAction = await dispatch(userLoginAsync(data));

    if (userLoginAsync.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message, {
        position: "bottom-left",
      });
    } else {
      const errorMessage: string =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "An unexpected error occurred";

      toast.error(errorMessage, {
        position: "bottom-left",
      });
    }

    setIsLoading(false);
    reset();
  };

  const checkEmail = async (data: FieldValues) => {
    const resultAction = await dispatch(checkEmailAsync(data));

    if (checkEmailAsync.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message, {
        position: "bottom-left",
      });
      setFormStep(2);
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

  const checkOtp = async (otpData: FieldValues) => {
    const combinedOtp = `${otpData.otp1}${otpData.otp2}${otpData.otp3}${otpData.otp4}`;

    const obj = {
      email: otpData.email,
      otp: combinedOtp,
    };

    const resultAction = await dispatch(checkOtpAsync(obj));

    if (checkOtpAsync.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message, {
        position: "bottom-left",
      });
      setFormStep(3);
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

  const updatePassword = async (data: FieldValues) => {
    const resultAction = await dispatch(forgotPasswordAsync(data));

    if (forgotPasswordAsync.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message, {
        position: "bottom-left",
      });
      setFormField(false);
      setFormStep(1);
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
    <>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Login" />
        {!formField ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl uppercase font-semibold text-primary">
                Login
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="max-w-lg mx-auto space-y-5">
                <div>
                  <Input
                    id="email"
                    name="email"
                    placeholder="email address"
                    register={register}
                    isDisabled={isLoading}
                  />
                </div>
                <div>
                  <Input
                    register={register}
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    isDisabled={isLoading}
                  />
                  <div className="flex items-center justify-end mt-1">
                    <div className="text-sm">
                      <div
                        onClick={() => setFormField(true)}
                        className="cursor-pointer font-medium text-primary hover:text-primary"
                      >
                        Forgot your password?
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    title="Login"
                    type="submit"
                    isDisabled={isLoading}
                    buttonStyles="text-white bg-primary w-full"
                  />
                </div>
                <div className="flex items-center justify-center mt-1">
                  <div className="text-sm font-semibold">
                    New here?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-primary hover:text-primary"
                    >
                      Register here
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl uppercase font-semibold text-primary">
                Forgot Password
              </h2>
            </div>

            {formStep === 1 && (
              <form className="" onSubmit={handleSubmit(checkEmail)}>
                <div className="max-w-lg mx-auto space-y-5">
                  <div>
                    <Input
                      id="email"
                      name="email"
                      placeholder="email address"
                      register={register}
                      isDisabled={isLoading}
                    />
                  </div>

                  <div>
                    <Button
                      title="Send email"
                      type="submit"
                      isDisabled={isLoading}
                      buttonStyles="text-white bg-primary w-full"
                    />
                  </div>
                </div>
              </form>
            )}

            {formStep === 2 && (
              <form className="" onSubmit={handleSubmit(checkOtp)}>
                <div className="max-w-lg mx-auto space-y-5">
                  <p className="text-center font-bold text-sm">OTP</p>
                  <div className="flex justify-center gap-2">
                    <input
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-primary"
                      {...register("otp1", { required: true })}
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-primary"
                      {...register("otp2", { required: true })}
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-primary"
                      {...register("otp3", { required: true })}
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-primary"
                      {...register("otp4", { required: true })}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <Button
                      title="Validate"
                      type="submit"
                      isDisabled={isLoading}
                      buttonStyles="text-white bg-primary w-full"
                    />
                  </div>
                </div>
              </form>
            )}

            {formStep === 3 && (
              <form className="" onSubmit={handleSubmit(updatePassword)}>
                <div className="max-w-lg mx-auto space-y-5">
                  <div>
                    <input
                      id="email"
                      placeholder="Email address"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Enter a valid email address",
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
                      autoComplete="current-password"
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
                      autoComplete="current-password"
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

            <div className="flex items-center justify-center mt-8">
              <div
                className="text-sm font-semibold cursor-pointer text-primary underline"
                onClick={() => setFormField(false)}
              >
                Go back
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
