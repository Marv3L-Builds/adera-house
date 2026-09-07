import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { rooms } from '../lib/hotel-data.ts';

const gallerySource = await readFile(new URL('../components/room-gallery.tsx', import.meta.url), 'utf8');
const detailSource = await readFile(new URL('../app/rooms/[slug]/page.tsx', import.meta.url), 'utf8');
const roomCardSource = await readFile(new URL('../components/room-card.tsx', import.meta.url), 'utf8');
const shellSource = await readFile(new URL('../components/site-shell.tsx', import.meta.url), 'utf8');
const imageSource = await readFile(new URL('../components/hotel-image.tsx', import.meta.url), 'utf8');

test('every room has a unique route and a complete three-image gallery', () => {
  assert.equal(new Set(rooms.map((room) => room.slug)).size, rooms.length);
  for (const room of rooms) {
    assert.equal(room.images.length, 3, `${room.slug} should have three images`);
    assert.equal(new Set(room.images).size, room.images.length, `${room.slug} images should be unique`);
  }
});

test('room detail pages retain required content and booking navigation', () => {
  for (const phrase of ['RoomGallery', 'Everything in its place', 'Book this room', 'You may also like', 'notFound()']) {
    assert.match(detailSource, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('room cards enter detail routes and ordinary browser history remains available to leave them', () => {
  assert.ok(roomCardSource.includes('href={`/rooms/${room.slug}`}'));
  assert.ok(roomCardSource.includes('<a href={`/rooms/${room.slug}`}'));
  assert.ok(!roomCardSource.includes("from 'next/link'"));
  assert.ok(shellSource.includes('href="/"'));
  assert.ok(!gallerySource.includes('pushState'));
  assert.ok(!gallerySource.includes('replaceState'));
});

test('route-dependent gallery and image state reset when the room changes', () => {
  assert.ok(detailSource.includes('<main key={room.slug}>'));
  assert.ok(detailSource.includes('<RoomGallery key={room.slug}'));
  assert.ok(imageSource.includes('status.src === src'));
  assert.ok(imageSource.includes("setStatus({ src, state: 'loaded' })"));
  assert.ok(imageSource.includes("setStatus({ src, state: 'failed' })"));
});

test('gallery provides accessible open, close, navigation, zoom, reset, and keyboard controls', () => {
  for (const phrase of [
    'Open immersive gallery',
    'Previous image',
    'Next image',
    'Zoom out',
    'Zoom in',
    'Reset zoom',
    "event.key === 'ArrowLeft'",
    "event.key === 'ArrowRight'",
    'showCloseButton',
  ]) {
    assert.ok(gallerySource.includes(phrase), `missing gallery contract: ${phrase}`);
  }
  assert.ok(gallerySource.includes('id={triggerId}'), 'dialog trigger must use a deterministic hydration-safe id');
});

test('pointer controls are isolated from pan capture and unexpected pointer endings are cleaned up', () => {
  assert.ok(gallerySource.includes("closest?.('[data-gallery-control]')"));
  assert.ok(gallerySource.includes('onPointerCancel'));
  assert.ok(gallerySource.includes('onLostPointerCapture'));
  assert.ok(!gallerySource.includes('gesture.current!'));
});

test('opening and closing the gallery cannot write a persistent document scroll lock', () => {
  assert.ok(gallerySource.includes('modal="trap-focus"'));
  assert.ok(gallerySource.includes('open={open}'));
  assert.ok(gallerySource.includes('onOpenChange={changeOpen}'));
  assert.ok(!gallerySource.includes('document.body'));
  assert.ok(!gallerySource.includes('body.style'));
});

test('mobile viewer retains vertical page gestures and hides desktop-only thumbnails', () => {
  assert.ok(gallerySource.includes('touch-pan-y'));
  assert.ok(gallerySource.includes('sm:hidden'));
  assert.ok(gallerySource.includes('hidden gap-2'));
  assert.ok(gallerySource.includes('z-10'));
  assert.ok(gallerySource.includes('size-11 rounded-none'));
});

test('room detail layout keeps mobile padding, stacked content, and desktop-only sticky booking behavior', () => {
  assert.ok(detailSource.includes('px-5'));
  assert.ok(detailSource.includes('sm:px-10'));
  assert.ok(detailSource.includes('lg:grid-cols-[1fr_360px]'));
  assert.ok(detailSource.includes('lg:sticky'));
  assert.ok(!detailSource.includes('h-screen'));
  assert.ok(!detailSource.includes('overflow-y-hidden'));
});
