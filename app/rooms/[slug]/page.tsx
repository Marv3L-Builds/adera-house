import { notFound } from 'next/navigation';
import { ArrowRight, BedDouble, Check, Maximize2, Users } from 'lucide-react';
import { Footer, Header } from '@/components/site-shell';
import { RoomGallery } from '@/components/room-gallery';
import { RoomCard } from '@/components/room-card';
import { money, rooms } from '@/lib/hotel-data';
import { HotelImage } from '@/components/hotel-image';
export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.description,
    openGraph: {
      title: `${room.name} — Adera House`,
      description: room.description,
      images: [room.images[0]],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${room.name} — Adera House`,
      description: room.description,
      images: [room.images[0]],
    },
  };
}
export default async function RoomDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();
  const related = rooms.filter((r) => r.slug !== room.slug).slice(0, 2);
  return (
    <main key={room.slug}>
      <Header />
      <section className="px-5 py-10 sm:px-10 lg:px-16">
        <RoomGallery key={room.slug} images={room.images} name={room.name} />
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {room.images.slice(1).map((im, i) => (
            <HotelImage
              key={im}
              src={im}
              alt={`${room.name} detail ${i + 2}`}
              className="aspect-[16/10] w-full"
              imageClassName="h-full w-full object-cover"
            />
          ))}
        </div>
      </section>
      <section className="grid gap-12 px-5 pb-24 pt-8 sm:px-10 lg:grid-cols-[1fr_360px] lg:px-16">
        <div>
          <p className="eyebrow">{room.category} · Victoria Island</p>
          <h1 className="mt-4 font-serif text-5xl sm:text-8xl">{room.name}</h1>
          <div className="mt-7 flex flex-wrap gap-6 border-y border-[#18231f]/15 py-5 text-sm">
            <span className="flex gap-2">
              <Users size={18} />
              {room.guests} guests
            </span>
            <span className="flex gap-2">
              <BedDouble size={18} />
              {room.bed}
            </span>
            <span className="flex gap-2">
              <Maximize2 size={18} />
              {room.size} m²
            </span>
          </div>
          <p className="mt-9 max-w-2xl font-serif text-2xl leading-relaxed">
            {room.description}
          </p>
          <h2 className="mt-14 font-serif text-4xl">Everything in its place</h2>
          <div className="mt-6 grid gap-y-4 sm:grid-cols-2">
            {room.amenities
              .concat([
                'Daily housekeeping',
                'High-speed Wi-Fi',
                'Luxury bath amenities',
              ])
              .map((a) => (
                <p key={a} className="flex gap-3 text-sm">
                  <Check size={17} className="text-[#a55338]" />
                  {a}
                </p>
              ))}
          </div>
          <div className="mt-14 border-t border-[#18231f]/15 pt-7">
            <h2 className="font-serif text-3xl">A flexible stay</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#62675f]">
              Cancel without charge until 6pm, two days before arrival. Check-in
              from 3pm; check-out by 12pm. Rates include breakfast and exclude
              statutory taxes.
            </p>
          </div>
        </div>
        <aside className="h-fit border border-[#18231f]/15 bg-white p-6 lg:sticky lg:top-6">
          <p className="text-sm text-[#666]">From</p>
          <p className="mt-1 font-serif text-4xl">
            {money(room.price)}{' '}
            <span className="font-sans text-sm">/ night</span>
          </p>
          <p
            className={`mt-4 text-xs font-bold uppercase tracking-[.14em] ${room.available ? 'text-green-800' : 'text-[#a55338]'}`}
          >
            {room.available
              ? 'Available for selected dates'
              : 'Currently unavailable'}
          </p>
          {room.available ? (
            <a
              href={`/booking?room=${room.slug}`}
              className="mt-6 flex items-center justify-between bg-[#a55338] p-4 text-xs font-bold uppercase tracking-[.15em] text-white"
            >
              Book this room <ArrowRight size={17} />
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="mt-6 flex cursor-not-allowed items-center justify-between bg-[#888] p-4 text-xs font-bold uppercase tracking-[.15em] text-white"
            >
              Room unavailable
            </span>
          )}
          <p className="mt-4 text-xs leading-5 text-[#777]">
            No charge is made in this portfolio demo.
          </p>
        </aside>
      </section>
      <section className="bg-[#e8e1d5] px-5 py-20 sm:px-10 lg:px-16">
        <h2 className="font-serif text-5xl">You may also like</h2>
        <div className="mt-9 grid gap-9 lg:grid-cols-2">
          {related.map((r) => (
            <RoomCard key={r.slug} room={r} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
