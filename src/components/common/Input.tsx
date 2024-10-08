import clsx from "clsx";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder: string;
  name: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  isDisabled?: boolean;
  type?: "text" | "password";
  errors?: FieldErrors;
}

const Input: FC<InputProps> = ({
  placeholder,
  name,
  id,
  isDisabled,
  type,
  register,
  errors,
}) => {
  return (
    <div>
      <input
        type={type ? type : "text"}
        autoComplete={type === "password" ? "new-password": "off"}
        className={clsx(
          "bg-gray-100 px-4 py-2.5 rounded w-full border-none text-secondary focus:outline-none text-sm font-medium",
          isDisabled && "cursor-not-allowed opacity-75"
        )}
        placeholder={placeholder}
        id={id}
        {...register(name, { required: true })}
        disabled={isDisabled}
      />
      <span className="text-xs text-red-600 mt-1">
        {errors?.name && `${placeholder} is required`}
      </span>
    </div>
  );
};

export default Input;
