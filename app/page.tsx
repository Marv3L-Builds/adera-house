import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react';
import { Footer, Header } from '@/components/site-shell';
import { RoomCard } from '@/components/room-card';
import { RoomGallery } from '@/components/room-gallery';
import { experiences, reviews, rooms } from '@/lib/hotel-data';
import { HotelImage } from '@/components/hotel-image';

const hero = '/images/adera-house-hero.jpg';
export default function Home() {
  return (
    <main>
      <section className="relative min-h-[94svh] bg-[#17221f] text-white">
        <img
          src={hero}
          alt="Warm, crafted Adera House guest room"
          width={2400}
          height={1600}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,19,16,.46)_0%,rgba(9,19,16,.1)_58%,transparent_100%)]" />
        <Header overlay />
        <div className="relative z-10 flex min-h-[30rem] min-w-0 flex-col justify-end px-5 pb-8 pt-28 sm:min-h-[calc(94svh-6rem)] sm:px-10 sm:pb-44 lg:px-16 lg:pb-28">
          <div className="w-full min-w-0 max-w-[22rem] sm:max-w-4xl">
            <h1 className="w-full min-w-0 max-w-full break-words font-serif text-[clamp(2.9rem,13vw,3.35rem)] leading-[.92] tracking-[-.035em] sm:break-normal sm:text-[clamp(3.5rem,8vw,7.8rem)] sm:leading-[.88] sm:tracking-[-.045em]">
              <span className="block">Lagos, at</span>
              <i className="block font-normal">your own pace.</i>
            </h1>
            <p className="mt-6 w-full min-w-0 max-w-full whitespace-normal break-words text-[15px] leading-6 text-white/82 sm:mt-7 sm:max-w-md sm:break-normal sm:text-base sm:leading-7 sm:text-white/78">
              A private waterfront house where contemporary Nigerian craft,
              thoughtful hospitality and the city’s energy meet.
            </p>
          </div>
        </div>
        <form
          action="/rooms"
          className="relative z-20 mx-auto mb-5 grid w-[calc(100%-2.5rem)] min-w-0 max-w-full grid-cols-1 bg-[#f4f0e8] text-[#18231f] sm:absolute sm:inset-x-0 sm:bottom-0 sm:mx-0 sm:mb-0 sm:w-full sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:left-16 lg:right-auto lg:bottom-8 lg:w-[min(880px,calc(100%-8rem))] lg:grid-cols-[1fr_1fr_.75fr_auto]"
        >
          <label className="min-h-18 min-w-0 max-w-full border-b border-black/15 px-4 py-4 sm:border-r sm:px-5 lg:min-h-0 lg:border-b-0">
            <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#786f63]">
              Check in
            </span>
            <input
              required
              type="date"
              name="checkin"
              min="2026-08-31"
              className="mt-2 block box-border w-full min-w-0 max-w-full bg-transparent text-base outline-none sm:text-sm"
            />
          </label>
          <label className="min-h-18 min-w-0 max-w-full border-b border-black/15 px-4 py-4 sm:px-5 lg:min-h-0 lg:border-b-0 lg:border-r">
            <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#786f63]">
              Check out
            </span>
            <input
              required
              type="date"
              name="checkout"
              min="2026-09-01"
              className="mt-2 block box-border w-full min-w-0 max-w-full bg-transparent text-base outline-none sm:text-sm"
            />
          </label>
          <label className="relative flex min-h-16 min-w-0 max-w-full items-center justify-between border-b border-black/15 px-4 py-4 sm:border-b-0 sm:border-r sm:px-5 lg:min-h-0">
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[.18em] text-[#786f63]">
                Guests
              </span>
              <select
                name="guests"
                defaultValue="2"
                className="mt-1 block w-full min-w-0 max-w-full appearance-none bg-transparent pr-6 text-base outline-none sm:text-sm"
              >
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
              </select>
            </span>
            <ChevronDown className="pointer-events-none shrink-0" size={16} />
          </label>
          <button className="flex min-h-16 min-w-0 items-center justify-center gap-2 bg-[#a55338] px-3 py-5 text-[10px] font-bold uppercase tracking-[.14em] text-white hover:bg-[#87422e] sm:px-7 sm:text-xs sm:tracking-[.16em] lg:min-h-0">
            Find a room <ArrowRight size={16} />
          </button>
        </form>
      </section>
      <section
        id="story"
        className="bg-[#f4f0e8] px-5 py-24 sm:px-10 lg:px-16 lg:py-36"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">A house with a point of view</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,6vw,6rem)] leading-[.94]">
              Made in Lagos.
              <br />
              <i>At ease</i> in the world.
            </h2>
            <p className="mt-7 max-w-lg leading-8 text-[#596159]">
              Adera House brings together modern Nigerian architecture, emerging
              West African art and the kind of intuitive service that never
              needs announcing. Thirty-eight rooms keep the experience personal.
            </p>
            <a
              href="#rooms"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#18231f] pb-2 text-xs font-bold uppercase tracking-[.16em]"
            >
              Discover our story <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-[1.35fr_.75fr] items-end gap-4">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
              alt="Sculptural Adera House lounge"
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=800&q=85"
              alt="Locally crafted interior details"
              loading="lazy"
              className="mb-10 aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section
        id="rooms"
        className="bg-[#e8e1d5] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="eyebrow">Rooms & residences</p>
            <h2 className="mt-4 font-serif text-5xl sm:text-7xl">
              Space to exhale.
            </h2>
          </div>
          <a
            href="/rooms"
            className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[.16em] sm:flex"
          >
            View all rooms <ArrowRight size={16} />
          </a>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {rooms.slice(0, 2).map((r) => (
            <RoomCard room={r} key={r.slug} />
          ))}
        </div>
      </section>
      <section className="bg-[#17221f] px-5 py-24 text-white sm:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-[#d0a58e]">
              Look closer
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-none sm:text-7xl">
              The room,
              <br />
              <i>before you arrive.</i>
            </h2>
            <p className="mt-7 max-w-sm leading-7 text-white/60">
              Open the suite to move through each view. Zoom, drag and
              swipe—designed to feel natural on every screen.
            </p>
            <div className="mt-10 flex gap-7 text-xs text-white/55">
              <span>01 Zoom</span>
              <span>02 Pan</span>
              <span>03 Swipe</span>
            </div>
          </div>
          <RoomGallery images={rooms[1].images} name={rooms[1].name} compact />
        </div>
      </section>
      <section id="experiences" className="bg-[#f4f0e8] py-24 lg:py-32">
        <div className="px-5 sm:px-10 lg:px-16">
          <p className="eyebrow">Within the house</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-7xl">
            Stay in, and still go somewhere.
          </h2>
        </div>
        <div className="mt-12 flex snap-x gap-5 overflow-x-auto overscroll-x-contain px-5 pb-5 sm:px-10 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-16">
          {experiences.map((x, i) => (
            <article
              key={x.title}
              className="group min-w-[82vw] snap-center sm:min-w-[55vw] lg:min-w-0"
            >
              <HotelImage
                src={x.image}
                alt={x.title}
                className="aspect-[4/5]"
                imageClassName="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <p className="mt-5 text-[10px] uppercase tracking-[.2em] text-[#a55338]">
                0{i + 1} · {x.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-3xl">{x.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#62675f]">
                {x.copy}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="grid bg-[#d7d9cd] lg:grid-cols-2">
        <div className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
          <p className="eyebrow">Everything considered</p>
          <h2 className="mt-5 font-serif text-5xl">
            Luxury that is felt,
            <br />
            not announced.
          </h2>
          <div className="mt-12 divide-y divide-[#18231f]/20 border-y border-[#18231f]/20">
            {[
              '24-hour house hosts',
              'Daily breakfast at Oro',
              'Airport arrival service',
              'Rooftop pool & Ayo spa',
              'High-speed Wi-Fi throughout',
            ].map((a, i) => (
              <div className="flex items-center gap-5 py-5" key={a}>
                <span className="text-xs text-[#a55338]">0{i + 1}</span>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          id="location"
          className="relative min-h-[520px] overflow-hidden bg-[#31423d]"
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          <div className="absolute left-[58%] top-[43%]">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#a55338] text-white shadow-xl">
              <MapPin />
            </span>
            <span className="absolute left-7 top-7 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
          </div>
          <div className="absolute inset-x-7 bottom-7 bg-[#f4f0e8] p-6 sm:max-w-md">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#a55338]">
              Victoria Island
            </p>
            <h3 className="mt-2 font-serif text-3xl">
              In the city. On the water.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#62675f]">
              35 min from Murtala Muhammed Airport · 8 min to Art X Lagos · 12
              min to Nike Art Gallery.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#a55338] px-5 py-24 text-white sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-white/65">
              Guest notes · fictional demo reviews
            </p>
            <h2 className="mt-5 font-serif text-5xl sm:text-6xl">
              The kind of stay
              <br />
              you keep with you.
            </h2>
          </div>
          <div className="space-y-10">
            {reviews.map((r) => (
              <figure key={r.name} className="border-t border-white/30 pt-7">
                <blockquote className="font-serif text-2xl leading-snug">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 text-xs uppercase tracking-[.15em] text-white/65">
                  {r.name} · {r.stay}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f4f0e8] px-5 py-28 text-center sm:px-10">
        <p className="eyebrow">Your Lagos story begins here</p>
        <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[.9]">
          Come for the city.
          <br />
          <i>Stay for the feeling.</i>
        </h2>
        <a
          href="/booking"
          className="mt-9 inline-flex items-center gap-3 bg-[#18231f] px-8 py-5 text-xs font-bold uppercase tracking-[.18em] text-white"
        >
          Reserve your stay <ArrowRight size={16} />
        </a>
      </section>
      <Footer />
    </main>
  );
}
