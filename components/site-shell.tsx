'use client';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export function Brand({
  light = false,
  showLocation = false,
}: {
  light?: boolean;
  showLocation?: boolean;
}) {
  return (
    <a
      href="/"
      className={`grid w-[220px] shrink-0 grid-cols-[40px_minmax(0,1fr)] items-center gap-x-4 sm:w-[250px] ${light ? 'text-white' : ''}`}
      aria-label="Adera House home"
    >
      <span
        className={`grid h-10 w-10 place-items-center border font-serif text-sm leading-none ${light ? 'border-white/55' : 'border-[#18231f]/50'}`}
      >
        VI
      </span>
      <span className="grid min-w-0 gap-y-1.5">
        <span className="text-[12px] font-bold uppercase leading-none tracking-[.2em]">
          Adera House
        </span>
        {showLocation && (
          <span className="text-[9px] uppercase leading-none tracking-[.13em] text-white/70">
            Victoria Island, Lagos
          </span>
        )}
      </span>
    </a>
  );
}

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['Rooms', '/rooms'],
    ['Dining', '/#experiences'],
    ['Experiences', '/#experiences'],
    ['Gallery', '/rooms'],
    ['About', '/#story'],
    ['Contact', '/#footer'],
  ];

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={`${overlay ? 'absolute text-white border-white/20' : 'relative bg-[#f4f0e8] text-[#18231f] border-[#18231f]/15'} z-40 flex h-24 w-full items-center justify-between border-b px-5 sm:px-10 lg:px-10 xl:grid xl:grid-cols-[minmax(260px,1fr)_auto_minmax(260px,1fr)] xl:gap-x-8 xl:px-16`}
    >
      <Brand light={overlay} showLocation={overlay} />
      <nav
        className="hidden items-center gap-5 text-[11px] font-semibold uppercase tracking-[.16em] xl:flex 2xl:gap-7"
        aria-label="Main navigation"
      >
        {links.slice(0, 4).map(([l, h]) => (
          <a key={l} href={h} className="hover:opacity-55">
            {l}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-5 xl:justify-self-end">
        <a
          href="/manage"
          className="hidden text-[11px] uppercase tracking-[.13em] sm:block"
        >
          Manage booking
        </a>
        <a
          href="/booking"
          className={`${overlay ? 'bg-white text-[#18231f]' : 'bg-[#18231f] text-white'} hidden px-5 py-3 text-[11px] font-bold uppercase tracking-[.15em] md:block`}
        >
          Book now
        </a>
        <button
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center xl:hidden"
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-[#18231f] p-5 text-white sm:p-6"
        >
          <div className="flex items-center justify-between">
            <Brand light />
            <button
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center"
              aria-label="Close navigation"
            >
              <X />
            </button>
          </div>
          <nav className="mt-8 flex flex-col font-serif text-[clamp(2rem,10vw,2.75rem)] sm:mt-16 sm:text-5xl">
            {links.map(([l, h]) => (
              <a
                key={l}
                href={h}
                onClick={() => setOpen(false)}
                className="border-b border-white/15 py-3 sm:py-4"
              >
                {l}
              </a>
            ))}
          </nav>
          <a
            href="/booking"
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center justify-between bg-[#a55338] p-5 text-xs uppercase tracking-[.2em] sm:mt-auto"
          >
            Reserve a room <ArrowUpRight />
          </a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer
      id="footer"
      className="bg-[#13201c] px-5 py-16 text-[#f4f0e8] sm:px-10 lg:px-16"
    >
      <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-8 max-w-sm font-serif text-3xl leading-tight">
            A more considered way to stay in Lagos.
          </p>
        </div>
        <div className="grid gap-8 text-sm min-[390px]:grid-cols-2">
          <div className="space-y-3">
            <p className="mb-4 text-[10px] uppercase tracking-[.2em] text-white/50">
              Explore
            </p>
            <a className="block" href="/rooms">
              Rooms & Suites
            </a>
            <a className="block" href="/#experiences">
              Dining
            </a>
            <a className="block" href="/manage">
              Manage booking
            </a>
            <a className="block" href="/admin">
              Demo admin
            </a>
          </div>
          <div className="space-y-3">
            <p className="mb-4 text-[10px] uppercase tracking-[.2em] text-white/50">
              Visit
            </p>
            <p>
              12 Akin Adesola Street
              <br />
              Victoria Island, Lagos
            </p>
            <p>
              +234 1 700 2337
              <br />
              stay@aderahouse.ng
            </p>
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
        >
          <label
            htmlFor="newsletter-email"
            className="text-[10px] uppercase tracking-[.2em] text-white/50"
          >
            Letters from Adera
          </label>
          <div className="mt-5 flex border-b border-white/35">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
              className="h-12 min-w-0 flex-1 bg-transparent outline-none placeholder:text-white/40"
            />
            <button aria-label="Subscribe">
              <ArrowUpRight />
            </button>
          </div>
          <p aria-live="polite" className="mt-3 text-xs text-white/45">
            {subscribed
              ? 'Thank you — this demo subscription was recorded locally.'
              : 'Occasional stories and private offers.'}
          </p>
        </form>
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
        <p>© 2026 Adera House. Fictional portfolio concept.</p>
        <p>Privacy · Terms · Accessibility</p>
      </div>
    </footer>
  );
}
