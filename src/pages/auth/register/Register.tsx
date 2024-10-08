import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import PathRoute from "../../../components/pathRoute/PathRoute";
import { registerUserAsync } from "../../../redux/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";

const Register = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const resultAction = await dispatch(registerUserAsync(data));

    if (registerUserAsync.fulfilled.match(resultAction)) {
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

  return (
    <>
      <div className="sm:mt-5 mb-20">
        <PathRoute path="Register" />

        <div className="text-center mb-10">
          <h2 className="text-3xl uppercase font-semibold text-primary">
            Register
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="max-w-2xl mx-auto gap-5 grid grid-cols-2">
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
            <div className="col-span-2">
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
            <div className="col-span-2">
              <Input
                id="email"
                name="email"
                placeholder="Email address"
                isDisabled={isLoading}
                register={register}
              />
            </div>
            <div className="col-span-2">
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                register={register}
                isDisabled={isLoading}
              />
            </div>
            <div className="col-span-2">
              <Button
                title="Register"
                type="submit"
                buttonStyles="text-white bg-primary w-full"
                isDisabled={isLoading}
              />
            </div>
            <div className="flex items-c justify-center mt-1 col-span-2">
              <div className="text-sm font-semibold">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary"
                >
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
