"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc('/placeholder-product.jpg');
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
    />
  );
};

export default SafeImage;