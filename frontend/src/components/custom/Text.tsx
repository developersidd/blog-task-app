// components/text.tsx
import React, { HTMLAttributes } from "react";

type TextVariant = "h1" | "h2" | "h3" | "body" | "caption";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  children: React.ReactNode;
}

const variantClasses = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-medium",
  body: "text-base",
  caption: "text-sm text-gray-500",
};

export const Text: React.FC<TextProps> = ({
  variant = "body",
  children,
  className = "",
  ...props
}) => {
  const Element = variant.startsWith("h") ? variant : "p";

  return React.createElement(
    Element as keyof JSX.IntrinsicElements,
    {
      className: `${variantClasses[variant]} ${className}`,
      ...props,
    },
    children
  );
};
