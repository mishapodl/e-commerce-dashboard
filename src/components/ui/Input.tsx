"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string | null;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, ...rest }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block mb-1 font-medium">
          {label}
        </label>
        <input
          id={id}
          {...rest}
          ref={ref}
          className={`w-full px-4 py-2 rounded bg-gray-700 border ${
            error ? "border-red-500" : "border-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
