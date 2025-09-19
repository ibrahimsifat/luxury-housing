import Image from "next/image";
import { useState } from "react";

interface SEOOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export function SEOOptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  style,
  onLoad,
  onError,
}: SEOOptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={style}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-500 text-sm">صورة غير متاحة</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
          style={style}
        >
          <span className="text-gray-500 text-sm">جاري التحميل...</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          isLoading ? "opacity-0 absolute" : "opacity-100"
        }`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        fill={fill}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
