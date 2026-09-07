'use client';
import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { rooms, money } from '@/lib/hotel-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HotelImage } from '@/components/hotel-image';

const extras = [
  { id: 'breakfast', name: 'Breakfast at Oro', price: 28000 },
  { id: 'transfer', name: 'Airport pickup', price: 45000 },
  { id: 'spa', name: 'Ayo spa ritual', price: 65000 },
  { id: 'late', name: 'Late checkout', price: 40000 },
];
export function BookingFlow({ initialRoom }: { initialRoom?: string }) {
  const selectedRoom =
    rooms.find((r) => r.slug === initialRoom && r.available)?.slug ??
    rooms[0].slug;
  const [step, setStep] = useState(1);
  const [roomSlug, setRoom] = useState(selectedRoom);
  const [checkin, setIn] = useState('2026-09-04');
  const [checkout, setOut] = useState('2026-09-07');
  const [guests, setGuests] = useState(2);
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState('');
  const room = rooms.find((r) => r.slug === roomSlug)!;
  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000,
    ),
  );
  const extraTotal = extras
    .filter((e) => selected.includes(e.id))
    .reduce((s, e) => s + e.price, 0);
  const subtotal = room.price * nights + extraTotal;
  const total = Math.round(subtotal * 1.125);
  const next = (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    if (
      step === 1 &&
      (new Date(checkout) <= new Date(checkin) ||
        guests < 1 ||
        guests > room.guests)
    ) {
      setErrors(
        new Date(checkout) <= new Date(checkin)
          ? 'Check-out must be after check-in.'
          : `This room accommodates up to ${room.guests} guests.`,
      );
      return;
    }
    setErrors('');
    setStep((s) => Math.min(5, s + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (step === 5)
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#dce6d8] text-[#31503a]">
          <Check size={30} />
        </span>
        <p className="mt-7 text-xs uppercase tracking-[.2em] text-[#a55338]">
          Reservation held
        </p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
          We look forward to welcoming you.
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-[#62675f]">
          Your demo reference is <b>ADH-24112</b>. No payment was taken. A
          production booking would now pass securely to a payment provider and
          hotel reservation system.
        </p>
        <a
          href="/manage"
          className="mt-8 inline-block bg-[#18231f] px-7 py-4 text-xs uppercase tracking-[.15em] text-white"
        >
          Manage this demo stay
        </a>
      </div>
    );
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-10">
      <div className="mb-12 flex gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="min-w-0 flex-1">
            <div
              className={`h-1 ${n <= step ? 'bg-[#a55338]' : 'bg-[#d8d2c6]'}`}
            />
            <p className="mt-2 truncate text-[9px] uppercase tracking-[.1em] text-[#77766e] min-[390px]:text-[10px] min-[390px]:tracking-[.14em]">
              {['Stay', 'Enhance', 'Details', 'Review'][n - 1]}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={next} className="min-h-[480px]">
          <p className="text-xs uppercase tracking-[.2em] text-[#a55338]">
            Step {step} of 4
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            {
              [
                'Choose your stay',
                'Make it your own',
                'Who should we welcome?',
                'Review your stay',
              ][step - 1]
            }
          </h1>
          {step === 1 && (
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <label className="text-xs uppercase tracking-[.14em]">
                Check in
                <Input
                  type="date"
                  value={checkin}
                  onChange={(e) => setIn(e.target.value)}
                  className="mt-2 h-13 rounded-none bg-white"
                />
              </label>
              <label className="text-xs uppercase tracking-[.14em]">
                Check out
                <Input
                  type="date"
                  value={checkout}
                  onChange={(e) => setOut(e.target.value)}
                  className="mt-2 h-13 rounded-none bg-white"
                />
              </label>
              <label className="text-xs uppercase tracking-[.14em]">
                Room
                <select
                  value={roomSlug}
                  onChange={(e) => setRoom(e.target.value)}
                  className="mt-2 h-13 w-full max-w-full border bg-white px-3 text-base normal-case tracking-normal sm:text-sm"
                >
                  {rooms
                    .filter((r) => r.available)
                    .map((r) => (
                      <option key={r.slug} value={r.slug}>
                        {r.name} — {money(r.price)}
                      </option>
                    ))}
                </select>
              </label>
              <label className="text-xs uppercase tracking-[.14em]">
                Guests
                <Input
                  type="number"
                  min={1}
                  max={4}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-2 h-13 rounded-none bg-white"
                />
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="mt-9 space-y-3">
              {extras.map((x) => (
                <label
                  key={x.id}
                  className={`flex min-h-16 cursor-pointer flex-wrap items-center gap-4 border p-5 ${selected.includes(x.id) ? 'border-[#a55338] bg-white' : 'border-[#cfc8bb]'}`}
                >
                  <span className="min-w-0 flex-1">
                    <b>{x.name}</b>
                    <span className="mt-1 block text-sm text-[#6b6c65]">
                      Added once per stay
                    </span>
                  </span>
                  <span className="ml-auto flex shrink-0 items-center gap-4">
                    <b>+{money(x.price)}</b>
                    <input
                      type="checkbox"
                      checked={selected.includes(x.id)}
                      onChange={() =>
                        setSelected((s) =>
                          s.includes(x.id)
                            ? s.filter((i) => i !== x.id)
                            : [...s, x.id],
                        )
                      }
                    />
                  </span>
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <label className="text-xs uppercase tracking-[.14em]">
                First name
                <Input required className="mt-2 h-13 rounded-none bg-white" />
              </label>
              <label className="text-xs uppercase tracking-[.14em]">
                Last name
                <Input required className="mt-2 h-13 rounded-none bg-white" />
              </label>
              <label className="text-xs uppercase tracking-[.14em]">
                Email
                <Input
                  required
                  type="email"
                  className="mt-2 h-13 rounded-none bg-white"
                />
              </label>
              <label className="text-xs uppercase tracking-[.14em]">
                Phone
                <Input
                  required
                  type="tel"
                  className="mt-2 h-13 rounded-none bg-white"
                />
              </label>
              <label className="sm:col-span-2 text-xs uppercase tracking-[.14em]">
                Arrival notes
                <textarea
                  className="mt-2 min-h-28 w-full border bg-white p-3 text-base normal-case tracking-normal sm:text-sm"
                  placeholder="Dietary needs, arrival time or anything we should know"
                />
              </label>
            </div>
          )}
          {step === 4 && (
            <div className="mt-9 space-y-6">
              <div className="border-y border-[#cbc4b7] py-6">
                <p className="text-sm leading-7">
                  <b>{room.name}</b>
                  <br />
                  {checkin} — {checkout} · {nights} nights · {guests} guests
                </p>
              </div>
              <div className="flex gap-3 bg-[#e7e3da] p-4 text-sm leading-6">
                <Info className="shrink-0" size={18} />
                <p>
                  This is a front-end demonstration. Clicking confirm will not
                  charge you or create a real hotel reservation.
                </p>
              </div>
            </div>
          )}
          {errors && (
            <p
              role="alert"
              className="mt-5 border-l-2 border-red-700 bg-red-50 p-3 text-sm text-red-800"
            >
              {errors}
            </p>
          )}
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                className="h-12 w-full rounded-none px-4 sm:w-auto sm:px-5"
              >
                <ChevronLeft /> Back
              </Button>
            ) : (
              <span />
            )}
            <Button
              type="submit"
              className="h-12 w-full rounded-none px-4 sm:w-auto sm:px-6"
            >
              {step === 4 ? 'Confirm demo booking' : 'Continue'}{' '}
              <ChevronRight />
            </Button>
          </div>
        </form>
        <aside className="h-fit bg-[#17221f] p-6 text-white lg:sticky lg:top-8">
          <HotelImage
            key={room.slug}
            src={room.images[0]}
            alt={`${room.name} interior`}
            className="aspect-[16/10] w-full"
            imageClassName="h-full w-full object-cover"
          />
          <h2 className="mt-5 font-serif text-3xl">{room.name}</h2>
          <p className="mt-2 text-sm text-white/65">
            {nights} nights · {guests} guests
          </p>
          <div className="mt-6 space-y-3 border-t border-white/20 pt-5 text-sm">
            <p className="flex justify-between">
              <span>Room</span>
              <span>{money(room.price * nights)}</span>
            </p>
            {extraTotal > 0 && (
              <p className="flex justify-between">
                <span>Add-ons</span>
                <span>{money(extraTotal)}</span>
              </p>
            )}
            <p className="flex justify-between">
              <span>Taxes & service</span>
              <span>{money(total - subtotal)}</span>
            </p>
            <p className="flex justify-between border-t border-white/20 pt-4 text-base">
              <b>Total</b>
              <b>{money(total)}</b>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
