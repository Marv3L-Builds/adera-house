import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_GALLERY_SCALE,
  MIN_GALLERY_SCALE,
  SWIPE_THRESHOLD,
  clampGalleryScale,
  galleryTouchAction,
  panFromPoints,
  positionForScale,
  scaleFromPinch,
  scaleFromWheel,
  shouldConsumeGalleryWheel,
  swipeDirection,
  wrapGalleryIndex,
} from '../lib/room-gallery-state.ts';

test('next and previous navigation advances and wraps through a three-image gallery', () => {
  assert.equal(wrapGalleryIndex(0, 1, 3), 1);
  assert.equal(wrapGalleryIndex(1, 1, 3), 2);
  assert.equal(wrapGalleryIndex(2, 1, 3), 0);
  assert.equal(wrapGalleryIndex(0, -1, 3), 2);
  assert.equal(wrapGalleryIndex(2, -1, 3), 1);
});

test('empty galleries cannot produce an invalid index', () => {
  assert.equal(wrapGalleryIndex(0, 1, 0), 0);
});

test('zoom is clamped between 100% and 400%', () => {
  assert.equal(clampGalleryScale(0.5), MIN_GALLERY_SCALE);
  assert.equal(clampGalleryScale(2.5), 2.5);
  assert.equal(clampGalleryScale(5), MAX_GALLERY_SCALE);
  assert.equal(scaleFromWheel(1, -1), 1.25);
  assert.equal(scaleFromWheel(1, 1), 1);
});

test('pinch zoom uses a stable distance snapshot and respects zoom limits', () => {
  assert.equal(scaleFromPinch(1, 100, 200), 2);
  assert.equal(scaleFromPinch(3, 100, 200), 4);
  assert.equal(scaleFromPinch(2, undefined, 200), 2);
  assert.equal(scaleFromPinch(2, 0, 200), 2);
});

test('mouse and touch pan apply movement relative to the previous point', () => {
  assert.deepEqual(panFromPoints({ x: 10, y: -5 }, { x: 100, y: 80 }, { x: 125, y: 60 }), { x: 35, y: -25 });
});

test('returning to 100% zoom always recenters a previously panned image', () => {
  assert.deepEqual(positionForScale(1, { x: 80, y: -45 }), { x: 0, y: 0 });
  assert.deepEqual(positionForScale(2, { x: 80, y: -45 }), { x: 80, y: -45 });
});

test('horizontal swipe navigates only after the threshold at 100% zoom', () => {
  assert.equal(swipeDirection({ scale: 1, cancelled: false, didPinch: false, startX: 200, endX: 200 - SWIPE_THRESHOLD - 1 }), 1);
  assert.equal(swipeDirection({ scale: 1, cancelled: false, didPinch: false, startX: 100, endX: 100 + SWIPE_THRESHOLD + 1 }), -1);
  assert.equal(swipeDirection({ scale: 1, cancelled: false, didPinch: false, startX: 100, endX: 100 + SWIPE_THRESHOLD }), 0);
});

test('cancelled, pinched, and zoomed gestures never become accidental swipes', () => {
  const base = { startX: 200, endX: 0 };
  assert.equal(swipeDirection({ ...base, scale: 1, cancelled: true, didPinch: false }), 0);
  assert.equal(swipeDirection({ ...base, scale: 1, cancelled: false, didPinch: true }), 0);
  assert.equal(swipeDirection({ ...base, scale: 2, cancelled: false, didPinch: false }), 0);
});

test('normal page scrolling is preserved at 100% zoom', () => {
  assert.equal(shouldConsumeGalleryWheel(1, false, false), false);
  assert.equal(galleryTouchAction(1), 'pan-y');
});

test('wheel and touch input are captured only for an active zoom interaction', () => {
  assert.equal(shouldConsumeGalleryWheel(2, false, false), true);
  assert.equal(shouldConsumeGalleryWheel(1, true, false), true);
  assert.equal(shouldConsumeGalleryWheel(1, false, true), true);
  assert.equal(galleryTouchAction(2), 'none');
});
