'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- the focusable gallery canvas intentionally handles pan, pinch, wheel, swipe, and arrow-key input */

import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HotelImage } from '@/components/hotel-image';
import {
  galleryTouchAction,
  panFromPoints,
  positionForScale,
  scaleFromPinch,
  scaleFromWheel,
  shouldConsumeGalleryWheel,
  swipeDirection,
  wrapGalleryIndex,
  type Gesture,
  type Point,
} from '@/lib/room-gallery-state';

export function RoomGallery({
  images,
  name,
  compact = false,
}: {
  images: string[];
  name: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<Gesture | null>(null);
  const triggerId = `room-gallery-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}-${compact ? 'compact' : 'detail'}`;

  useEffect(() => {
    if (scale === 1) setPosition((value) => positionForScale(scale, value));
  }, [scale]);

  const reset = () => {
    pointers.current.clear();
    gesture.current = null;
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  const show = (nextIndex: number) => {
    setIndex((nextIndex + images.length) % images.length);
    reset();
  };
  const move = (direction: number) => {
    setIndex((currentIndex) =>
      wrapGalleryIndex(currentIndex, direction, images.length),
    );
    reset();
  };
  const changeOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    reset();
  };

  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest?.('[data-gallery-control]')) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    const active = [...pointers.current.values()];
    const previousGesture = gesture.current;

    if (active.length >= 2) {
      gesture.current = {
        point: { x: event.clientX, y: event.clientY },
        distance: Math.hypot(
          active[0].x - active[1].x,
          active[0].y - active[1].y,
        ),
        startX: previousGesture?.startX ?? event.clientX,
        didPinch: true,
      };
      return;
    }

    gesture.current = {
      point: active[0],
      startX: event.clientX,
      didPinch: false,
    };
  };

  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    const active = [...pointers.current.values()];
    const currentGesture = gesture.current;

    if (active.length >= 2) {
      const distance = Math.hypot(
        active[0].x - active[1].x,
        active[0].y - active[1].y,
      );
      const previousDistance = currentGesture?.distance;
      if (previousDistance && previousDistance > 0) {
        setScale((value) => scaleFromPinch(value, previousDistance, distance));
      }
      gesture.current = {
        point: { x: event.clientX, y: event.clientY },
        distance,
        startX: currentGesture?.startX ?? event.clientX,
        didPinch: true,
      };
      return;
    }

    if (!currentGesture) {
      gesture.current = {
        point: active[0],
        startX: event.clientX,
        didPinch: false,
      };
      return;
    }

    const previousPoint = currentGesture.point;
    gesture.current = {
      ...currentGesture,
      point: active[0],
      distance: undefined,
    };
    if (scale > 1) {
      setPosition((value) => panFromPoints(value, previousPoint, active[0]));
    }
  };

  const finishPointer = (
    event: React.PointerEvent<HTMLDivElement>,
    cancelled: boolean,
  ) => {
    if (!pointers.current.has(event.pointerId)) return;
    const currentGesture = gesture.current;

    if (currentGesture && pointers.current.size === 1) {
      const direction = swipeDirection({
        scale,
        cancelled,
        didPinch: currentGesture.didPinch,
        startX: currentGesture.startX,
        endX: event.clientX,
      });
      if (direction) move(direction);
    }

    pointers.current.delete(event.pointerId);
    const active = [...pointers.current.values()];

    if (active.length >= 2) {
      gesture.current = {
        point: active[0],
        distance: Math.hypot(
          active[0].x - active[1].x,
          active[0].y - active[1].y,
        ),
        startX: active[0].x,
        didPinch: true,
      };
    } else if (active.length === 1) {
      gesture.current = {
        point: active[0],
        startX: active[0].x,
        didPinch: currentGesture?.didPinch ?? cancelled,
      };
    } else {
      gesture.current = null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen} modal="trap-focus">
      <DialogTrigger
        id={triggerId}
        render={
          <button
            className={`group relative block w-full touch-manipulation overflow-hidden bg-[#ddd5c8] ${compact ? 'aspect-[16/11]' : 'aspect-[16/10]'}`}
            aria-label={`Open immersive gallery for ${name}`}
          />
        }
      >
        <HotelImage
          src={images[0]}
          alt={`${name} main view`}
          className="h-full w-full"
          imageClassName="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-white px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] sm:bottom-5 sm:right-5">
          <Maximize size={15} /> Explore gallery
        </span>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="h-[100dvh] max-h-none w-screen max-w-none rounded-none bg-[#101512] p-0 text-white ring-0 [&_[data-slot=dialog-close]]:z-20 [&_[data-slot=dialog-close]]:size-11 [&_[data-slot=dialog-close]]:rounded-none"
      >
        <DialogTitle className="sr-only">{name} image gallery</DialogTitle>
        <DialogDescription className="sr-only">
          Use arrow keys, swipe, or the controls to navigate. Pinch or use zoom
          controls to inspect each image.
        </DialogDescription>
        <div
          className={`relative h-full overflow-hidden overscroll-contain ${galleryTouchAction(scale) === 'none' ? 'touch-none' : 'touch-pan-y'}`}
          role="application"
          aria-label={`${name} interactive image viewer`}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') move(-1);
            if (event.key === 'ArrowRight') move(1);
            if (event.key === '0') reset();
          }}
          onDoubleClick={() => (scale === 1 ? setScale(2) : reset())}
          onWheel={(event) => {
            if (!shouldConsumeGalleryWheel(scale, event.ctrlKey, event.metaKey))
              return;
            event.preventDefault();
            setScale((value) => scaleFromWheel(value, event.deltaY));
          }}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={(event) => finishPointer(event, false)}
          onPointerCancel={(event) => finishPointer(event, true)}
          onLostPointerCapture={(event) => finishPointer(event, true)}
        >
          <HotelImage
            key={images[index]}
            src={images[index]}
            alt={`${name} view ${index + 1}`}
            eager
            className="h-full w-full"
            imageClassName="h-full w-full select-none object-contain transition-transform duration-100"
            imageStyle={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center bg-gradient-to-b from-black/75 to-transparent p-5 pr-20">
            <p className="text-xs uppercase tracking-[.2em]">
              {name} · {index + 1}/{images.length}
            </p>
          </div>
          <button
            data-gallery-control
            onClick={() => move(-1)}
            className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center bg-black/55 sm:left-4"
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>
          <button
            data-gallery-control
            onClick={() => move(1)}
            className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center bg-black/55 sm:right-4"
            aria-label="Next image"
          >
            <ChevronRight />
          </button>
          <div
            data-gallery-control
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-end gap-3 sm:bottom-5"
          >
            <div
              className="hidden gap-2 bg-black/60 p-2 sm:flex"
              aria-label="Image thumbnails"
            >
              {images.map((image, thumbnailIndex) => (
                <button
                  key={image}
                  onClick={() => show(thumbnailIndex)}
                  aria-label={`Show image ${thumbnailIndex + 1}`}
                  aria-current={thumbnailIndex === index ? 'true' : undefined}
                  className={`h-12 w-16 overflow-hidden border-2 ${thumbnailIndex === index ? 'border-white' : 'border-transparent opacity-65 hover:opacity-100'}`}
                >
                  <HotelImage
                    src={image}
                    alt=""
                    className="h-full w-full"
                    imageClassName="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-black/70 p-1">
              <Button
                variant="ghost"
                size="icon-lg"
                className="size-11 rounded-none"
                onClick={() => setScale((value) => Math.max(1, value - 0.5))}
                aria-label="Zoom out"
              >
                <Minus />
              </Button>
              <span className="w-12 text-center text-xs">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon-lg"
                className="size-11 rounded-none"
                onClick={() => setScale((value) => Math.min(4, value + 0.5))}
                aria-label="Zoom in"
              >
                <Plus />
              </Button>
              <Button
                variant="ghost"
                size="icon-lg"
                className="size-11 rounded-none"
                onClick={reset}
                aria-label="Reset zoom"
              >
                <RotateCcw />
              </Button>
            </div>
          </div>
          <p className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[.15em] text-white/65 sm:hidden">
            Swipe to browse · pinch to zoom
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
