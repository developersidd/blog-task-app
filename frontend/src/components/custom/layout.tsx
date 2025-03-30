// components/layout.tsx
import React, { HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={className} {...props}>
    {children}
  </div>
);

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: number;
  children: React.ReactNode;
}

export const HStack: React.FC<StackProps> = ({
  children,
  spacing = 4,
  className = "",
  ...props
}) => (
  <div
    className={`flex flex-row items-center justify-center gap-${spacing} ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const VStack: React.FC<StackProps> = ({
  children,
  spacing = 4,
  className = "",
  ...props
}) => (
  <div
    className={`flex flex-col items-center justify-center gap-${spacing} ${className}`}
    {...props}
  >
    {children}
  </div>
);
