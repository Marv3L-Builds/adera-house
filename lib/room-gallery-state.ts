export type Point = { x: number; y: number };
export type Gesture = { point: Point; distance?: number; startX: number; didPinch: boolean };

export const MIN_GALLERY_SCALE = 1;
export const MAX_GALLERY_SCALE = 4;
export const SWIPE_THRESHOLD = 55;

export function wrapGalleryIndex(currentIndex: number, direction: number, imageCount: number) {
  if (imageCount <= 0) return 0;
  return (currentIndex + direction + imageCount) % imageCount;
}

export function clampGalleryScale(scale: number) {
  return Math.min(MAX_GALLERY_SCALE, Math.max(MIN_GALLERY_SCALE, scale));
}

export function scaleFromPinch(scale: number, previousDistance: number | undefined, distance: number) {
  if (!previousDistance || previousDistance <= 0) return scale;
  return clampGalleryScale(scale * distance / previousDistance);
}

export function scaleFromWheel(scale: number, deltaY: number) {
  return clampGalleryScale(scale + (deltaY < 0 ? 0.25 : -0.25));
}

export function panFromPoints(position: Point, previousPoint: Point, nextPoint: Point): Point {
  return {
    x: position.x + nextPoint.x - previousPoint.x,
    y: position.y + nextPoint.y - previousPoint.y,
  };
}

export function positionForScale(scale: number, position: Point): Point {
  if (scale <= MIN_GALLERY_SCALE) return position.x === 0 && position.y === 0 ? position : { x: 0, y: 0 };
  return position;
}

export function swipeDirection({
  scale,
  cancelled,
  didPinch,
  startX,
  endX,
}: {
  scale: number;
  cancelled: boolean;
  didPinch: boolean;
  startX: number;
  endX: number;
}) {
  if (cancelled || scale !== MIN_GALLERY_SCALE || didPinch) return 0;
  const travel = endX - startX;
  if (Math.abs(travel) <= SWIPE_THRESHOLD) return 0;
  return travel < 0 ? 1 : -1;
}

export function shouldConsumeGalleryWheel(scale: number, ctrlKey: boolean, metaKey: boolean) {
  return scale > MIN_GALLERY_SCALE || ctrlKey || metaKey;
}

export function galleryTouchAction(scale: number) {
  return scale > MIN_GALLERY_SCALE ? 'none' : 'pan-y';
}
