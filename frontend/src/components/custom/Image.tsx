// components/image.tsx
import React, { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = "rounded-lg",
  ...props
}) => (
  <img src={src} alt={alt} loading="lazy" className={className} {...props} />
);
