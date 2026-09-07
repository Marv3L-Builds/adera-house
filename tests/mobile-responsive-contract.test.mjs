import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const homeSource = await readFile(
  new URL('../app/page.tsx', import.meta.url),
  'utf8',
);
const shellSource = await readFile(
  new URL('../components/site-shell.tsx', import.meta.url),
  'utf8',
);
const roomsSource = await readFile(
  new URL('../app/rooms/page.tsx', import.meta.url),
  'utf8',
);
const detailSource = await readFile(
  new URL('../app/rooms/[slug]/page.tsx', import.meta.url),
  'utf8',
);
const gallerySource = await readFile(
  new URL('../components/room-gallery.tsx', import.meta.url),
  'utf8',
);
const bookingSource = await readFile(
  new URL('../components/booking-flow.tsx', import.meta.url),
  'utf8',
);
const adminSource = await readFile(
  new URL('../app/admin/page.tsx', import.meta.url),
  'utf8',
);
const globalStyles = await readFile(
  new URL('../app/globals.css', import.meta.url),
  'utf8',
);

const phoneWidths = [320, 360, 375, 390, 412, 430];
const tabletWidths = [768, 820, 1024];

test('target phone widths retain safe content and touch-control space', () => {
  for (const width of phoneWidths) {
    const pageContentWidth = width - 40;
    const heroBookingCardWidth = width - 40;
    const headerFreeSpace = width - 40 - 220 - 44;

    assert.ok(
      pageContentWidth >= 280,
      `${width}px should retain at least 280px of content`,
    );
    assert.ok(
      heroBookingCardWidth >= 280,
      `${width}px booking card should remain inside 20px gutters`,
    );
    assert.ok(
      headerFreeSpace >= 16,
      `${width}px header should separate brand and menu`,
    );
  }
});

test('tablet widths retain generous content and use responsive breakpoints', () => {
  for (const width of tabletWidths) {
    assert.ok(width - 80 >= 688, `${width}px should retain tablet gutters`);
  }
  assert.match(homeSource, /sm:max-w-4xl/);
  assert.match(shellSource, /xl:hidden/);
  assert.match(roomsSource, /sm:flex sm:flex-wrap/);
});

test('mobile header closes cleanly and restores document scrolling', () => {
  assert.match(shellSource, /aria-controls="mobile-navigation"/);
  assert.match(shellSource, /onClick=\{\(\) => setOpen\(false\)\}/);
  assert.match(shellSource, /document\.documentElement\.style\.overflow/);
  assert.match(shellSource, /previousOverflow/);
  assert.match(shellSource, /h-11 w-11/);
  assert.match(shellSource, /grid gap-8 text-sm min-\[390px\]:grid-cols-2/);
});

test('mobile hero has an intentional crop, controlled type, and bounded booking tracks', () => {
  assert.match(homeSource, /object-\[62%_center\] sm:object-center/);
  assert.match(homeSource, /max-w-\[22rem\] sm:max-w-4xl/);
  assert.match(homeSource, /text-\[clamp\(2\.9rem,13vw,3\.35rem\)\]/);
  assert.match(homeSource, /<span className="block">Lagos, at<\/span>/);
  assert.match(
    homeSource,
    /<i className="block font-normal">your own pace\.<\/i>/,
  );
  assert.match(
    homeSource,
    /w-full min-w-0 max-w-full whitespace-normal break-words.*sm:max-w-md sm:break-normal/,
  );
  assert.match(
    homeSource,
    /mx-auto mb-5 grid w-\[calc\(100%-2\.5rem\)\] min-w-0 max-w-full grid-cols-1/,
  );
  assert.match(homeSource, /sm:absolute sm:inset-x-0 sm:bottom-0/);
  assert.match(homeSource, /sm:mx-0 sm:mb-0 sm:w-full/);
  assert.match(homeSource, /sm:grid-cols-\[minmax\(0,1fr\)_minmax\(0,1fr\)\]/);
  assert.match(homeSource, /min-h-\[30rem\].*pb-8 pt-28.*sm:pb-44/);
  assert.doesNotMatch(homeSource, /min-h-\[94svh\] overflow-hidden/);
  assert.match(homeSource, /min-h-18 min-w-0/);
});

test('room browsing and booking controls use explicit narrow-screen layouts', () => {
  assert.match(roomsSource, /grid grid-cols-2 items-center gap-3 sm:flex/);
  assert.match(roomsSource, /col-span-2 h-11 w-full min-w-0/);
  assert.match(detailSource, /grid grid-cols-2 gap-2 sm:grid-cols-3/);
  assert.match(detailSource, /text-5xl sm:text-8xl/);
  assert.match(bookingSource, /text-4xl sm:text-5xl/);
  assert.match(bookingSource, /min-h-16 cursor-pointer flex-wrap/);
  assert.match(bookingSource, /flex flex-col items-stretch gap-3 sm:flex-row/);
});

test('document overflow is fixed at the source instead of globally hidden', () => {
  assert.doesNotMatch(
    globalStyles,
    /body\s*\{[^}]*overflow-x\s*:\s*(hidden|clip)/s,
  );
  assert.match(homeSource, /overflow-x-auto overscroll-x-contain/);
});

test('admin cards and inventory controls reflow on narrow screens', () => {
  assert.match(adminSource, /flex flex-col gap-1 min-\[420px\]:flex-row/);
  assert.match(
    adminSource,
    /flex flex-wrap items-center justify-between gap-3/,
  );
  assert.match(adminSource, /flex flex-col items-stretch gap-4/);
  assert.match(adminSource, /h-11 w-full min-w-0/);
});

test('mobile gallery keeps large controls, touch scrolling, and contained gestures', () => {
  assert.match(gallerySource, /touch-manipulation/);
  assert.match(gallerySource, /overscroll-contain/);
  assert.match(gallerySource, /touch-pan-y/);
  assert.match(gallerySource, /h-12 w-12/);
  assert.match(gallerySource, /size-11 rounded-none/);
});
