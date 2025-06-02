"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, disabled, color, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`w-full ${
        color ? color : "bg-blue-600 hover:bg-blue-700"
      } p-2 rounded text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
