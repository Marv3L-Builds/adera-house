'use client';

import { ImageOff } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useState } from 'react';

type ImageStatus = { src: string; state: 'loading' | 'loaded' | 'failed' };

type HotelImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  eager?: boolean;
  sizes?: string;
};

export function HotelImage({ src, alt, className = '', imageClassName = '', imageStyle, eager = false, sizes = '100vw' }: HotelImageProps) {
  const [status, setStatus] = useState<ImageStatus>({ src, state: 'loading' });
  const loaded = status.src === src && status.state === 'loaded';
  const failed = status.src === src && status.state === 'failed';

  return (
    <span className={`relative block overflow-hidden bg-[#d9d2c7] ${className}`}>
      {!failed && (
        <img
          src={src}
          srcSet={src.includes('images.unsplash.com') ? [640, 960, 1400, 2200].map(width => `${src.replace(/w=\d+/, `w=${width}`)} ${width}w`).join(', ') : undefined}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus({ src, state: 'loaded' })}
          onError={() => setStatus({ src, state: 'failed' })}
          style={imageStyle}
          className={`${imageClassName} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        />
      )}
      {!loaded && !failed && <span className="absolute inset-0 animate-pulse bg-[#d9d2c7]" aria-hidden="true" />}
      {failed && (
        <><span className="absolute inset-0 grid place-items-center bg-[#d9d2c7] text-center text-[#5e655e]" aria-hidden="true"><span className="px-5"><ImageOff className="mx-auto" size={24} /><span className="mt-3 block text-[10px] font-bold uppercase tracking-[.16em]">Image unavailable</span></span></span><span className="sr-only">{alt} unavailable</span></>
      )}
    </span>
  );
}
