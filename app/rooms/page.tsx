'use client';
import { useState } from 'react';
import { Header, Footer } from '@/components/site-shell';
import { RoomCard } from '@/components/room-card';
import { rooms } from '@/lib/hotel-data';
import { useSearchParams } from 'next/navigation';
export default function RoomsPage() {
  const params = useSearchParams();
  const requestedGuests = Number(params.get('guests') ?? 1);
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('featured');
  const [guests, setGuests] = useState(
    requestedGuests >= 1 && requestedGuests <= 4 ? requestedGuests : 1,
  );
  let visible = rooms.filter(
    (r) => (type === 'All' || r.category === type) && r.guests >= guests,
  );
  if (sort === 'low') visible = [...visible].sort((a, b) => a.price - b.price);
  if (sort === 'high') visible = [...visible].sort((a, b) => b.price - a.price);
  return (
    <main>
      <Header />
      <section className="px-5 pb-16 pt-20 sm:px-10 lg:px-16">
        <p className="eyebrow">Thirty-eight individual rooms</p>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="font-serif text-5xl sm:text-8xl">
            Rooms <i>& suites</i>
          </h1>
          <p className="max-w-md leading-7 text-[#62675f]">
            Natural materials, original Nigerian art and the quietest beds in
            Lagos. No two rooms are quite alike.
          </p>
        </div>
      </section>
      <section className="sticky top-0 z-30 border-y border-[#18231f]/15 bg-[#f4f0e8]/95 px-5 py-4 backdrop-blur sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 items-center gap-3 sm:flex sm:flex-wrap">
          <select
            aria-label="Room category"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-11 w-full min-w-0 border border-[#18231f]/20 bg-transparent px-3 text-base sm:w-auto sm:px-4 sm:text-sm"
          >
            <option>All</option>
            {[...new Set(rooms.map((r) => r.category))].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            aria-label="Guest count"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="h-11 w-full min-w-0 border border-[#18231f]/20 bg-transparent px-3 text-base sm:w-auto sm:px-4 sm:text-sm"
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
          </select>
          <select
            aria-label="Sort rooms"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="col-span-2 h-11 w-full min-w-0 border border-[#18231f]/20 bg-transparent px-3 text-base sm:ml-auto sm:w-auto sm:px-4 sm:text-sm"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <span className="col-span-2 text-xs text-[#777] sm:w-auto">
            {visible.length} stays
          </span>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-10 lg:px-16">
        {visible.length ? (
          <div className="grid gap-x-8 gap-y-14 lg:grid-cols-2">
            {visible.map((r) => (
              <RoomCard key={r.slug} room={r} />
            ))}
          </div>
        ) : (
          <div className="border border-[#18231f]/15 py-24 text-center">
            <h2 className="font-serif text-4xl">
              No rooms match these filters.
            </h2>
            <button
              onClick={() => {
                setType('All');
                setGuests(1);
              }}
              className="mt-5 min-h-11 border-b border-black px-3 pb-1 text-xs uppercase tracking-[.15em]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
