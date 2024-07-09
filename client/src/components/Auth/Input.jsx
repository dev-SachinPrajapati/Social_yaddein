import React from "react";

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => (
  <div className={`w-full ${half ? "sm:w-1/2" : ""}`}>
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
    </label>
    <div className="relative">
      <input
        className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
        name={name}
        onChange={handleChange}
        autoFocus={autoFocus}
        type={type}
      />
      {name === "password" && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button type="button" onClick={handleShowPassword}>
            {type === "password" ? (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7.009 11.953A15.923 15.923 0 0112 9c2.756 0 5.5.71 7.991 2.021m.102 2.029A15.923 15.923 0 0112 15c-2.756 0-5.5-.71-7.991-2.021M3 12a9 9 0 0114.392-6.821A13.919 13.919 0 0024 12a9 9 0 01-17.608 3.821A13.919 13.919 0 003 12z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 15s1-1.5 4-1.5 4 1.5 4 1.5 1-1.5 4-1.5 4 1.5 4 1.5M5.585 10.414a2 2 0 112.828-2.828m5.657 2.828a2 2 0 112.828 2.828m-2.828-5.656a2 2 0 00-2.828 2.828m2.828 2.828a2 2 0 00-2.828-2.828"
                />
              </svg>
            )}
          </button>
        </span>
      )}
    </div>
  </div>
);

export default Input;
