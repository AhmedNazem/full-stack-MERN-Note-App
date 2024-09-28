// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center bg-white border-[1.5px] border-gray-300 px-4 py-2 rounded-md mb-3 focus-within:border-primary">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-2 rounded outline-none"
      />
      {isShowPassword ? (
        <FaRegEye
          size={20}
          className="text-primary cursor-pointer"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={20}
          className="text-gray-500 cursor-pointer"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
}

export default PasswordInput;
